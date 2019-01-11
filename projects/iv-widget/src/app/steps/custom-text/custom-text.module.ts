import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTextComponent } from './custom-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  declarations: [CustomTextComponent],
  imports: [CommonModule, TranslateModule, ButtonModule, TrustedHtmlModule],
  exports: [CustomTextComponent]
})
export class CustomTextModule {}
