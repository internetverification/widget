import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './picture.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../theme/theme.module';
import { SvgOverlayComponent } from './svg-overlay/svg-overlay.component';
import { CameraSwitcherComponent } from './camera-switcher/camera-switcher.component';

@NgModule({
  declarations: [PictureComponent, SvgOverlayComponent, CameraSwitcherComponent],
  imports: [CommonModule, SharedModule],
  exports: [PictureComponent]
})
export class PictureModule {}
