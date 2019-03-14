import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  MonoTypeOperatorFunction,
  of,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilKeyChanged,
  filter,
  first,
  map,
  retryWhen,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { DeviceTypeService } from '../../device-type.service';
import { PictureStepState } from '../../types';
import { BaseStepComponent } from '../base-step.class';
import { CameraService } from './camera.service';
import { Renderer } from './renderer.class';

@Component({
  selector: 'ivw-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent extends BaseStepComponent
  implements OnInit, OnDestroy {
  private readonly PERMISSION_DENIED = 'NotAllowedError';
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
  private _startSubject = new ReplaySubject(1);

  public resize = new ReplaySubject<{ width: number; height: number }>(1);

  public isVideoReady$ = new BehaviorSubject(false);
  public cameraDisabled$ = new BehaviorSubject(false);

  public isMobile$ = this.deviceType
    .getPlatformType$()
    .pipe(map(type => type === 'Mobile'));

  public shouldMirror$ = this.deviceType.getPlatformType$().pipe(
    startWith(true),
    switchMap(type => {
      if (type === 'Mobile') {
        return this.cameraOrientation$.pipe(
          map(orientation => {
            // On mobile we only want to disable mirroring on user facing
            return (
              orientation === 'user' && !this.step.config.disableMirroringMobile
            );
          })
        );
      } else {
        return of(!this.step.config.disableMirroring);
      }
    })
  );

  get image() {
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
    return image;
  }

  public renderer$ = new ReplaySubject<Renderer>(1);

  public isValid$ = this.renderer$.pipe(
    switchMap(renderer => {
      return renderer.isValid$;
    })
  );

  public showValidColor$ = this.renderer$.pipe(
    switchMap(renderer => {
      return combineLatest(renderer.isTimedout$, renderer.isValid$);
    }),
    map(([timedout, valid]) => {
      return !timedout && valid;
    })
  );

  public shouldMirror(orientation) {
    if (this.deviceType.getPlatformType() === 'Mobile') {
      // On mobile we only want to disable mirroring on user facing
      return orientation === 'user' && !this.step.config.disableMirroringMobile;
    } else {
      return !this.step.config.disableMirroring;
    }
  }

  public shoulFlipImage(orientation) {
    if (this.deviceType.getPlatformType() === 'Mobile') {
      // On mobile we only want to disable mirroring on user facing
      return orientation === 'user' && this.step.config.flipCapturedImageMobile;
    } else {
      return this.step.config.flipCapturedImage;
    }
  }

  constructor(
    private cameraService: CameraService,
    private deviceType: DeviceTypeService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this._startSubject
      .pipe(
        startWith(!!this.image),
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
          const orientation = (options as any).facingMode || 'user';
          return this.cameraService
            .getRenderer(
              this.videoElement.nativeElement,
              options,
              this.shouldMirror(orientation),
              this.shoulFlipImage(orientation),
              oc(this.step.config.plugins)([])
            )
            .pipe(
              // Permission was denied
              // Retry each second until the user gives access in case of a permission denied error
              this.handlePermissionsDenied(),
              tap(() => this.cameraDisabled$.next(false)),
              tap(renderer => renderer.render()),
              tap(() => this.isVideoReady$.next(true)),
              tap(() => this._cd.detectChanges()),
              switchMap(renderer => {
                this.renderer$.next(renderer);
                return this._captureSubject.pipe(
                  map(() => {
                    renderer.draw(this.canvas.nativeElement);
                    this.state = this.PREVIEW_STATE;
                  })
                );
              }),
              // We stop the media stream after the picture is taken
              first(),
              tap(() => this.isVideoReady$.next(false)),
              catchError(e => {
                console.error(e);
                this.error.next(e);
                return of({});
              })
            );
        }),
        takeUntil(this.destroySubject$),
        shareReplay(1)
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

  // tslint:disable-next-line: member-ordering
  public handlePermissionsDenied(): MonoTypeOperatorFunction<Renderer> {
    return retryWhen(errors => {
      return errors.pipe(
        tap(e => {
          if (e.name !== this.PERMISSION_DENIED) {
            throw e;
          } else {
            this.cameraDisabled$.next(true);
          }
        }),
        // retry to get the camera each second until the user activate it
        delay(1000)
      );
    });
  }
}
