import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../theme/theme.module';
import { SvgOverlayComponent } from './svg-overlay/svg-overlay.component';

@NgModule({
  declarations: [PictureComponent, SvgOverlayComponent],
  imports: [CommonModule, SharedModule],
  exports: [PictureComponent]
})
export class PictureModule {}
