import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTextComponent } from './custom-text.component';
import { TranslateModule } from '@ngx-translate/core';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';
import { ButtonModule } from '../../components/button/button.module';
import { ThemeModule } from '../../theme/theme.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CustomTextComponent],
  imports: [CommonModule, SharedModule],
  exports: [CustomTextComponent]
})
export class CustomTextModule {}
