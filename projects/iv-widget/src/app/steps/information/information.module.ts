import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TrustedHtmlModule } from '../../pipes/trusted-html/trusted-html.module';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TrustedHtmlModule],
  exports: [InformationComponent]
})
export class InformationModule {}
