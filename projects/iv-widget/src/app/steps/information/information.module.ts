import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { InformationComponent } from './information.component';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [InformationComponent]
})
export class InformationModule {}
