import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule, ThemeModule],
  exports: [PictureComponent]
})
export class PictureModule {}
