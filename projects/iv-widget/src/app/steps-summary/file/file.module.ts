import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [FileComponent],
  imports: [CommonModule, TranslateModule, ThemeModule],
  exports: [FileComponent]
})
export class FileModule {}
