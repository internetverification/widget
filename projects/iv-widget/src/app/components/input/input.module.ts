import { NgModule, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { ThemeModule } from '../../theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, ThemeModule, TranslateModule],
  exports: [InputComponent]
})
export class InputModule {}
