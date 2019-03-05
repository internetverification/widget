import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, skip, switchMap, take, tap } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import {
  SubmitStepAction,
  ActionTypes
} from '../../state/store/actions/steps.actions';
import { StepState } from '../../types';

@Component({
  selector: 'ivw-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.scss']
})
export class StepPageComponent implements OnInit {
  public stepState$ = this.store.select('steps', String(this.currentStepId));

  public stepError$ = this.store
    .select('steps', String(this.currentStepId), 'progress', 'state')
    .pipe(
      skip(1),
      filter(state => state === 'ERROR')
    );

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public router: Router,
    private store: Store<{}>,
    private actions: Actions
  ) {}

  public waitForAction$ = of({});
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
    this.stepState$
      .pipe(
        switchMap(() => this.waitForAction$),
        take(1)
      )
      .subscribe((steps: StepState[]) => {
        let next = steps[i];
        while (
          !(i < this.router.config.length - 1) &&
          oc(next).progress.state() === 'SUCCESS'
        ) {
          next = steps[++i];
        }
        this.router.navigate([this.router.config[i + 2].path]);
      });
  }

  public submitStep(stepPayload) {
    this.waitForAction$ = this.actions.pipe(
      ofType(ActionTypes.PROGRESS_UPDATE)
    );
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
