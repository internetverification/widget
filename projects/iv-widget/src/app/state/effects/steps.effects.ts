import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { StepDataService } from '../../data/step-data.service';
import {
  ActionTypes,
  ProgressUpdateAction,
  SubmitStepAction,
  SubmitStepErrorAction
} from '../store/actions/steps.actions';

@Injectable()
export class StepsEffects {
  constructor(
    private stepData: StepDataService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  submitStep$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.SUBMIT_STEP),
    mergeMap((action: SubmitStepAction) =>
      this.stepData.submitStep(action.stepType, action.payload).pipe(
        map(() => {
          return new ProgressUpdateAction(action.stepId, { state: 'SUCCESS' });
        }),
        catchError(error => {
          return of(new SubmitStepErrorAction(action.stepId, { error }));
        })
      )
    )
  );

  @Effect()
  initStepsNavigatio$: Observable<void> = this.actions$.pipe(
    ofType(ActionTypes.INIT_STEP),
    delay(10),
    switchMap(() => {
      this.router.navigate([this.router.config[1].path]);
      return of();
    })
  );
}
