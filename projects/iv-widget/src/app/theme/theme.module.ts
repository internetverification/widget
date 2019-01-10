import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from '../directives/theme.directive';
import { HiddenDirective } from '../directives/hidden.directive';
import { ResizeDirective } from '../directives/resize.directive';

@NgModule({
  declarations: [ThemeDirective, HiddenDirective, ResizeDirective],
  imports: [CommonModule],
  exports: [ThemeDirective, HiddenDirective, ResizeDirective]
})
export class ThemeModule {}
