import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [InformationComponent]
})
export class InformationModule {}
