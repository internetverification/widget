import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryStepComponent } from './summary-step.component';
import { PictureModule } from '../picture/picture.module';
import { InformationModule } from '../information/information.module';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../theme/theme.module';
import { FileModule } from '../file/file.module';

@NgModule({
  declarations: [SummaryStepComponent],
  imports: [
    CommonModule,
    PictureModule,
    InformationModule,
    TranslateModule,
    FileModule,
    ThemeModule
  ],
  exports: [SummaryStepComponent]
})
export class SummaryStepModule {}
