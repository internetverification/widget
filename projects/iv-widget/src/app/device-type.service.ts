import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {
  constructor() {}

  getPlatformType$() {
    return of(this.getPlatformType());
  }

  getPlatformType() {
    if (navigator.userAgent.match(/mobile/i)) {
      return 'Mobile';
    } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }
}
