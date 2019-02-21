import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '../components/input/input.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../components/button/button.module';
import { TrustedHtmlModule } from '../pipes/trusted-html/trusted-html.module';
import { ThemeModule } from '../theme/theme.module';
import { FileUploadModule } from '../components/file-upload/file-upload.module';
import { DateModule } from '../components/date/date.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    InputModule,
    DateModule,
    TranslateModule,
    ButtonModule,
    FileUploadModule,
    TrustedHtmlModule,
    ThemeModule
  ]
})
export class SharedModule {}
