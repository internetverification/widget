import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [CommonModule, ThemeModule],
  exports: [FileUploadComponent]
})
export class FileUploadModule {}
