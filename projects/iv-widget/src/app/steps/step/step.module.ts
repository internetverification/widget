import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step.component';
import { InformationModule } from '../information/information.module';
import { PictureModule } from '../picture/picture.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [StepComponent],
  imports: [CommonModule, InformationModule, PictureModule, TranslateModule],
  exports: [StepComponent]
})
export class StepModule {}
