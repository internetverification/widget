import { Injectable } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';
import { map, finalize, tap } from 'rxjs/operators';

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
    const obs: Observable<MediaStream> = Observable.create(
      (observer: Observer<MediaStream>) => {
        window.navigator.getUserMedia(
          {
            video: options,
            audio: false
          },
          stream => observer.next(stream),
          error => observer.error(error)
        );
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

  public getRenderer(
    videoElement: HTMLVideoElement,
    options: { width?: number; height?: number; facingMode?: { exact: string } }
  ) {
    return this.getUserMedia(options).pipe(
      map(mediaStream => {
        return new Renderer(videoElement, mediaStream);
      })
    );
  }
}

export class Renderer {
  constructor(
    private videoElement: HTMLVideoElement,
    private mediaStream: MediaStream
  ) {}

  render() {
    this.videoElement.srcObject = this.mediaStream;
  }

  stop() {
    this.mediaStream.getTracks().forEach(track => track.stop());
  }

  draw(canvasElement?: HTMLCanvasElement) {
    let canvas = canvasElement;
    if (!canvasElement) {
      canvas = document.createElement('canvas');
    }
    const ctx = canvas.getContext('2d');
    canvas.width = this.videoElement.clientWidth;
    canvas.height = this.videoElement.clientHeight;
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
