import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputModule } from "../components/input/input.module";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "../components/button/button.module";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [InputModule, TranslateModule, ButtonModule]
})
export class SharedModule {}
