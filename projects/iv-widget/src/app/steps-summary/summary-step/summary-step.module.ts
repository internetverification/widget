import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FileModule } from '../file/file.module';
import { InformationModule } from '../information/information.module';
import { PictureModule } from '../picture/picture.module';
import { SummaryStepComponent } from './summary-step.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SummaryStepComponent],
  imports: [
    CommonModule,
    PictureModule,
    InformationModule,
    RouterModule,
    FileModule,
    SharedModule
  ],
  exports: [SummaryStepComponent]
})
export class SummaryStepModule {}
