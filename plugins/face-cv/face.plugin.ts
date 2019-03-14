import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'tracking';
import 'tracking/build/data/eye-min.js';
import 'tracking/build/data/face-min.js';
import 'tracking/build/data/mouth-min.js';

declare var tracking;
export class FacePlugin {
  private isValidSub$ = new BehaviorSubject(false);
  private cancelledSub$ = new Subject<boolean>();
  private task;

  isValid$: Observable<boolean> = merge(
    this.isValidSub$.asObservable().pipe(takeUntil(this.cancelledSub$)),
    this.cancelledSub$
  );

  public stop() {
    this.cancelledSub$.next(true);
    if (this.task) {
      this.task.stop();
    }
  }

  public init(videoElement: HTMLVideoElement) {
    const objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    objects.setInitialScale(1);
    objects.setStepSize(2);
    objects.setEdgesDensity(0.1);
    objects.on('track', event => {
      if (event.data.length === 0) {
        this.isValidSub$.next(false);
        // No objects were detected in this frame.
      } else {
        this.isValidSub$.next(true);
      }
    });
    this.task = tracking.track(videoElement, objects);
  }
}
