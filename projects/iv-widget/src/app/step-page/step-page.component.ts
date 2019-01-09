import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Step } from "../types";

@Component({
  selector: "ivw-step-page",
  templateUrl: "./step-page.component.html",
  styleUrls: ["./step-page.component.scss"]
})
export class StepPageComponent implements OnInit {
  public step$ = this.activatedRoute.data;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {}

  public previousStep() {
    this.location.back();
  }

  public nextStep() {
    const i = this.router.config.indexOf(this.activatedRoute.routeConfig);
    const next = this.router.config[i + 1];
    this.router.navigate([next.path]);
  }
}
