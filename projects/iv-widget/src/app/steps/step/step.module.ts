import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step.component';
import { InformationModule } from '../information/information.module';
import { PictureModule } from '../picture/picture.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileLayoutModule } from '../../components/mobile-layout/mobile-layout.module';
import { FileModule } from '../file/file.module';
import { CustomTextModule } from '../custom-text/custom-text.module';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [StepComponent],
  imports: [
    CommonModule,
    InformationModule,
    PictureModule,
    FileModule,
    CustomTextModule,
    TranslateModule,
    TrustedHtmlModule,
    ThemeModule,
    MobileLayoutModule
  ],
  exports: [StepComponent]
})
export class StepModule {}
