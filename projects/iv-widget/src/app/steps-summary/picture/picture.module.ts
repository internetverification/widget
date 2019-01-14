import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PictureComponent } from './picture.component';

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule, SharedModule],
  exports: [PictureComponent]
})
export class PictureModule {}
