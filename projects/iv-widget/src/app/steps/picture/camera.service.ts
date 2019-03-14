import { Injectable } from '@angular/core';
import { from, Observable, Observer, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { Renderer } from './renderer.class';
import { ValidationPlugin } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor() {}

  public getCameraOptions() {
    return from(navigator.mediaDevices.enumerateDevices()).pipe(
      map(mediaDevices => {
        return mediaDevices.filter(device => device.kind === 'videoinput');
      })
    );
  }

  private getUserMedia(options) {
    const mediaStreams = [];
    const obs: Subject<MediaStream> = Observable.create(
      (observer: Observer<MediaStream>) => {
        window.navigator.mediaDevices
          .getUserMedia({
            video: options,
            audio: false
          })
          .then(stream => observer.next(stream))
          .catch(err => observer.error(err));
      }
    );

    return obs.pipe(
      tap(stream => {
        mediaStreams.push(stream);
      }),
      finalize(() => {
        mediaStreams.forEach(mediaStream => {
          mediaStream.getTracks().forEach(track => track.stop());
        });
      })
    );
  }

  shouldMirror(facingMode: { exact: string } | string | undefined) {
    if (!facingMode) {
      return true;
    }

    let value = facingMode;
    if (typeof facingMode === 'object') {
      value = facingMode.exact;
    }
    return value !== 'environment';
  }

  public getRenderer(
    videoElement: HTMLVideoElement,
    options: {
      width?: number;
      height?: number;
      facingMode?: { exact: string };
    },
    shouldMirror = false,
    flipImage = false,
    validationPlugins?: ValidationPlugin[]
  ) {
    return this.getUserMedia(options).pipe(
      map(mediaStream => {
        return new Renderer(
          videoElement,
          mediaStream,
          shouldMirror,
          flipImage,
          validationPlugins
        );
      })
    );
  }
}
