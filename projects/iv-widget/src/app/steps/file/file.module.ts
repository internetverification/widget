import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { FileUploadModule } from '../../components/file-upload/file-upload.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';
import { ButtonModule } from '../../components/button/button.module';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    TrustedHtmlModule,
    ThemeModule
  ],
  exports: [FileComponent]
})
export class FileModule {}
