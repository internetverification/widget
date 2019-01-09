import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InformationComponent } from "./information.component";
import { InputModule } from "../../components/input/input.module";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "../../components/button/button.module";

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, InputModule, TranslateModule, ButtonModule],
  exports: [InformationComponent]
})
export class InformationModule {}
