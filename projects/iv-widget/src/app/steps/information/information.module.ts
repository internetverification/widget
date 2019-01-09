import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, SharedModule],
  exports: [InformationComponent]
})
export class InformationModule {}
