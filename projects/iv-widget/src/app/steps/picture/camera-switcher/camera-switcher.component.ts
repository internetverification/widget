import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraService } from '../camera.service';
import { DeviceTypeService } from '../../../device-type.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivw-camera-switcher',
  templateUrl: './camera-switcher.component.html',
  styleUrls: ['./camera-switcher.component.scss']
})
export class CameraSwitcherComponent implements OnInit {
  constructor(private deviceType: DeviceTypeService) {}

  @Output()
  cameraSwitched = new EventEmitter();

  isMobile$ = this.deviceType.getPlatformType$().pipe(
    map(type => {
      return type === 'Mobile';
    })
  );

  ngOnInit() {}
}
