import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { StepDataService } from '../../data/step-data.service';
import {
  ActionTypes,
  ProgressUpdateAction,
  SubmitStepAction
} from '../store/actions/steps.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class StepsEffects {
  @Effect()
  submitStep$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.SUBMIT_STEP),
    mergeMap((action: SubmitStepAction) =>
      this.stepData.submitStep(action.payload).pipe(
        map(() => {
          return new ProgressUpdateAction(action.stepId, { state: 'SUCCESS' });
        })
      )
    )
  );

  constructor(private stepData: StepDataService, private actions$: Actions) {}
}
