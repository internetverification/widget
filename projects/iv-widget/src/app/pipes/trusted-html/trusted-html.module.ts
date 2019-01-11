import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedHtmlPipe } from './trusted-html.pipe';

@NgModule({
  declarations: [TrustedHtmlPipe],
  imports: [CommonModule],
  exports: [TrustedHtmlPipe]
})
export class TrustedHtmlModule {}
