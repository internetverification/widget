import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { ModalService } from '../../modal.service';
import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { ModalOutletComponent } from '../modal-outlet/modal-outlet.component';
import { DeviceTypeService } from '../../device-type.service';

@Component({
  selector: 'ivw-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss']
})
export class MobileLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('template')
  template: TemplateRef<any>;

  portal: CdkPortal;

  constructor(
    private modalService: ModalService,
    private deviceTypeService: DeviceTypeService
  ) {}

  shouldRenderModal = this.deviceTypeService.getPlatformType() === 'Mobile';

  ngOnInit() {
    if (this.shouldRenderModal) {
      this.modalService.init(ModalOutletComponent);
      this.modalService.attach(this.template);
    } else {
      this.portal = new TemplatePortal(this.template, null);
    }
  }

  ngOnDestroy(): void {
    if (this.shouldRenderModal) {
      this.modalService.detach();
    }
  }
}
