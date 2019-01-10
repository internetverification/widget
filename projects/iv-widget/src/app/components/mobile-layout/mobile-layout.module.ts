import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLayoutComponent } from './mobile-layout.component';
import { ModalOutletModule } from '../modal-outlet/modal-outlet.module';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [MobileLayoutComponent],
  imports: [CommonModule, ModalOutletModule, PortalModule],
  exports: [ModalOutletModule, MobileLayoutComponent]
})
export class MobileLayoutModule {}
