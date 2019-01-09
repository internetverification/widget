import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PictureComponent } from "./picture.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule, SharedModule],
  exports: [PictureComponent]
})
export class PictureModule {}
