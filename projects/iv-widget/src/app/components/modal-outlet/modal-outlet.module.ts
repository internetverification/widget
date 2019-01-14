import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOutletComponent } from './modal-outlet.component';
import { PortalModule } from '@angular/cdk/portal';
import { ModalService } from '../../modal.service';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [ModalOutletComponent],
  imports: [CommonModule, PortalModule, ThemeModule],
  exports: [ModalOutletComponent],
  entryComponents: [ModalOutletComponent]
})
export class ModalOutletModule {}
