import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { InformationComponent } from './information.component';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, SharedModule],
  exports: [InformationComponent]
})
export class InformationModule {}
