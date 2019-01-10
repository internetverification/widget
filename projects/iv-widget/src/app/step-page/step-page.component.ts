import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { SubmitStepAction } from '../state/store/actions/steps.actions';

@Component({
  selector: 'ivw-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.scss']
})
export class StepPageComponent implements OnInit {
  public stepState$ = this.store.select('steps', String(this.currentStepId));

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public router: Router,
    private store: Store<{}>
  ) {}

  ngOnInit() {}

  public previousStep() {
    this.location.back();
  }

  public get currentStepId() {
    return this.router.config.indexOf(this.activatedRoute.routeConfig);
  }

  public nextStep() {
    const i = this.currentStepId;
    const next = this.router.config[i + 1];
    this.router.navigate([next.path]);
  }

  public submitStep(stepPayload) {
    this.store.dispatch(new SubmitStepAction(this.currentStepId, stepPayload));
  }
}
