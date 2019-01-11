import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FileComponent],
  imports: [CommonModule, TranslateModule],
  exports: [FileComponent]
})
export class FileModule {}
