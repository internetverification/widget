import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { SubmitStepAction } from '../../state/store/actions/steps.actions';
import { StepState } from '../../types';
import { take } from 'rxjs/operators';

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
    return Math.max(
      this.router.config.indexOf(this.activatedRoute.routeConfig) - 1,
      0
    );
  }

  public nextStep() {
    let i = this.currentStepId;
    this.stepState$.pipe(take(1)).subscribe((steps: StepState[]) => {
      let next = steps[i];
      while (
        !(i < this.router.config.length - 1) &&
        next.progress.state === 'SUCCESS'
      ) {
        next = steps[++i];
      }
      this.router.navigate([this.router.config[i + 1].path]);
    });
  }

  public submitStep(stepPayload) {
    this.stepState$.pipe(take(1)).subscribe((stepState: StepState) => {
      this.store.dispatch(
        new SubmitStepAction(
          this.currentStepId,
          stepState.config.type,
          stepPayload
        )
      );
    });
  }
}
