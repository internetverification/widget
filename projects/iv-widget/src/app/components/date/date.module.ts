import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../theme/theme.module';
import { DateComponent } from './date.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DateComponent],
  imports: [CommonModule, ThemeModule, TranslateModule, ReactiveFormsModule],
  exports: [DateComponent]
})
export class DateModule {}
