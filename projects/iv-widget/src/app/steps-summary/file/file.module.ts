import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FileComponent } from './file.component';

@NgModule({
  declarations: [FileComponent],
  imports: [CommonModule, SharedModule],
  exports: [FileComponent]
})
export class FileModule {}
