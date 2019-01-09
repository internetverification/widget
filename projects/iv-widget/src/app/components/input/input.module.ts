import { NgModule, Input, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputComponent } from "./input.component";
import { ThemeDirective } from "../../directives/theme.directive";

@NgModule({
  declarations: [InputComponent, ThemeDirective],
  imports: [CommonModule],
  exports: [InputComponent]
})
export class InputModule {}
