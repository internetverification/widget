import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MobileLayoutModule } from '../../components/mobile-layout/mobile-layout.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomTextModule } from '../custom-text/custom-text.module';
import { FileModule } from '../file/file.module';
import { InformationModule } from '../information/information.module';
import { PictureModule } from '../picture/picture.module';
import { StepComponent } from './step.component';

@NgModule({
  declarations: [StepComponent],
  imports: [
    CommonModule,
    InformationModule,
    PictureModule,
    FileModule,
    CustomTextModule,
    SharedModule,
    MobileLayoutModule
  ],
  exports: [StepComponent]
})
export class StepModule {}
