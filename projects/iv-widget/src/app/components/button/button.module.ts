import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, ThemeModule],
  exports: [ButtonComponent]
})
export class ButtonModule {}
