import { Injectable } from '@angular/core';
import { from, Observable, Observer, Subject } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

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
    flipImage = false
  ) {
    return this.getUserMedia(options).pipe(
      map(mediaStream => {
        return new Renderer(videoElement, mediaStream, shouldMirror, flipImage);
      })
    );
  }
}

export class Renderer {
  constructor(
    private videoElement: HTMLVideoElement,
    private mediaStream: MediaStream,
    private mirror = true,
    private flipCapturedImage = false
  ) {}

  render() {
    this.videoElement.srcObject = this.mediaStream;
  }

  stop() {
    this.mediaStream.getTracks().forEach(track => track.stop());
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
