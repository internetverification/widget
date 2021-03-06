import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilKeyChanged,
  filter,
  map,
  retryWhen,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { DeviceTypeService } from '../../device-type.service';
import { PictureStepState } from '../../types';
import { BaseStepComponent } from '../base-step.class';
import { CameraService } from './camera.service';

@Component({
  selector: 'ivw-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent extends BaseStepComponent
  implements OnInit, OnDestroy {
  public readonly CAPTURE_STATE = 'capture';
  public readonly PREVIEW_STATE = 'preview';
  public state = this.CAPTURE_STATE;

  private cameraOrientation$ = new BehaviorSubject('user');

  private destroySubject$ = new Subject();

  @ViewChild('videoElement')
  videoElement: ElementRef;

  @ViewChild('canvas')
  canvas: ElementRef;

  @Input()
  step: PictureStepState;

  private _captureSubject = new Subject();
  private _startSubject = new ReplaySubject();

  public resize = new ReplaySubject<{ width: number; height: number }>();

  public isVideoReady$ = new BehaviorSubject(false);
  public cameraDisabled$ = new BehaviorSubject(false);

  public isMobile$ = this.deviceType
    .getPlatformType$()
    .pipe(map(type => type === 'Mobile'));

  public shouldMirror$ = this.isMobile$.pipe(
    startWith(true),
    switchMap(() => {
      return this.cameraOrientation$.pipe(
        map(orientation => {
          return orientation !== 'environment';
        })
      );
    })
  );

  private readonly PERMISSION_DENIED = 'NotAllowedError';

  constructor(
    private cameraService: CameraService,
    private deviceType: DeviceTypeService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    const image = oc(this.step).payload.image();
    if (image) {
      this.state = this.PREVIEW_STATE;
      const ctx = this.canvas.nativeElement.getContext('2d');
      const img = new Image();
      img.onload = () => {
        this.canvas.nativeElement.width = img.width;
        this.canvas.nativeElement.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = image;
    }

    this._startSubject
      .pipe(
        startWith(!!image),
        tap(
          hasImage =>
            (this.state = hasImage ? this.PREVIEW_STATE : this.CAPTURE_STATE)
        ),
        filter(hasImage => !hasImage),
        switchMap(() => {
          return this.resize.pipe(
            debounceTime(300),
            distinctUntilKeyChanged('width'),
            distinctUntilKeyChanged('height')
          );
        }),
        switchMap(() => {
          return this.isMobile$.pipe(
            switchMap(isMobile => {
              if (isMobile) {
                return this.cameraOrientation$.pipe(
                  map(facingMode => {
                    return {
                      facingMode
                    };
                  })
                );
              } else {
                return of({});
              }
            })
          );
        }),
        switchMap(options => {
          return this.cameraService
            .getRenderer(this.videoElement.nativeElement, options)
            .pipe(
              // Permission was denied
              // Retry each second until the user gives access in case of a permission denied error
              retryWhen(errors => {
                return errors.pipe(
                  tap(e => {
                    if (e.name !== this.PERMISSION_DENIED) {
                      throw e;
                    } else {
                      this.cameraDisabled$.next(true);
                    }
                  }),
                  delay(1000)
                );
              }),
              tap(() => this.cameraDisabled$.next(false)),
              tap(renderer => renderer.render()),
              tap(() => this.isVideoReady$.next(true)),
              tap(() => this._cd.detectChanges()),
              switchMap(renderer => {
                return this._captureSubject.pipe(
                  tap(() => {
                    renderer.draw(this.canvas.nativeElement);
                    this.state = this.PREVIEW_STATE;
                  })
                );
              }),
              // We stop the media stream after the picture is taken
              take(1),
              tap(() => this.isVideoReady$.next(false))
            );
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe();
  }

  capture() {
    this._captureSubject.next();
  }

  restart() {
    this._startSubject.next(false);
  }

  submit() {
    this.submitStep.next({
      image: this.canvas.nativeElement.toDataURL('image/jpeg')
    });
    this.nextStep.next();
  }

  switchCamera() {
    this.cameraOrientation$.next(
      this.cameraOrientation$.value === 'user' ? 'environment' : 'user'
    );
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
