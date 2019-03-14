import { BehaviorSubject, combineLatest, Observer, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationPlugin } from '../../types';

export class Renderer {
  private readonly DEFAULT_VALIDATOR = {
    init: () => {},
    isValid$: new BehaviorSubject(true),
    stop: () => {}
  };
  private readonly DEFAULT_TIMEOUT = 10000;
  constructor(
    private videoElement: HTMLVideoElement,
    private mediaStream: MediaStream,
    private mirror = true,
    private flipCapturedImage = false,
    private validationPlugins: ValidationPlugin[] = [],
    private errorObserver?: Observer<Error>
  ) {}

  isValid$ = combineLatest(
    ...[this.DEFAULT_VALIDATOR, ...this.validationPlugins].map(x => x.isValid$)
  ).pipe(
    map(results => {
      return results.every(x => x);
    })
  );

  isTimedout$ = new BehaviorSubject(this.validationPlugins.length === 0);

  render() {
    this.videoElement.srcObject = this.mediaStream;
    this.validationPlugins.forEach(validator => {
      try {
        validator.init(this.videoElement);
      } catch (ex) {
        this.emitError(ex);
      }
    });
    const sub = timer(this.DEFAULT_TIMEOUT).subscribe(() => {
      this.stopPlugins();
      this.isTimedout$.next(true);
      sub.unsubscribe();
    });
  }

  stop() {
    this.mediaStream.getTracks().forEach(track => track.stop());
    this.stopPlugins();
  }

  private stopPlugins() {
    this.validationPlugins.forEach(plugin => {
      try {
        plugin.stop();
      } catch (ex) {
        this.emitError(ex);
      }
    });
  }

  private emitError(err: Error) {
    if (this.errorObserver) {
      this.errorObserver.next(err);
    }
  }

  private xor(val1, val2) {
    return (val1 && !val2) || (!val1 && val2);
  }

  draw(canvasElement?: HTMLCanvasElement) {
    let canvas = canvasElement;
    if (!canvasElement) {
      canvas = document.createElement('canvas');
    }
    const ctx = canvas.getContext('2d');
    canvas.width = this.videoElement.clientWidth;
    canvas.height = this.videoElement.clientHeight;
    if (this.xor(this.mirror, this.flipCapturedImage)) {
      ctx.translate(this.videoElement.clientWidth, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(
      this.videoElement,
      0,
      0,
      this.videoElement.clientWidth,
      this.videoElement.clientHeight
    );
    return canvas.toDataURL('image/jpeg');
  }
}
