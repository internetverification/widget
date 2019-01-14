import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TrustedHtmlModule,
    ThemeModule
  ],
  exports: [InformationComponent]
})
export class InformationModule {}
