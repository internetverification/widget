import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { StepDataService } from '../../data/step-data.service';
import {
  ActionTypes,
  ProgressUpdateAction,
  SubmitStepAction,
  SubmitStepErrorAction
} from '../store/actions/steps.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class StepsEffects {
  constructor(private stepData: StepDataService, private actions$: Actions) {}

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
}
