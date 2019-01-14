import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { BaseStepComponent } from '../base-step.class';
import { CameraService } from './camera.service';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import {
  tap,
  switchMap,
  take,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  startWith,
  takeUntil,
  filter
} from 'rxjs/operators';
import { PictureStepState } from '../../types';
import { oc } from 'ts-optchain';

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

  constructor(
    private cameraService: CameraService,
    private _cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.isVideoReady$.subscribe(console.log);
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
        switchMap(({ width, height }) => {
          return this.cameraService
            .getRenderer(this.videoElement.nativeElement, null)
            .pipe(
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
      image: this.canvas.nativeElement.toDataURL('image/png')
    });
    this.nextStep.next();
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }
}
