import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationComponent } from './information.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [InformationComponent]
})
export class InformationModule {}
