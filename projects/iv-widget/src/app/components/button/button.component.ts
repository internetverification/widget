import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "ivw-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  @Output()
  click = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
