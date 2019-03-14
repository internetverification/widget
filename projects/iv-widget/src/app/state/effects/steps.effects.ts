import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  map,
  mergeMap,
  switchMap
} from 'rxjs/operators';
import { ConfigService } from '../../config.service';
import { StepDataService } from '../../data/step-data.service';
import {
  ActionTypes,
  ErrorAction,
  ProgressUpdateAction,
  SubmitStepAction,
  SubmitStepErrorAction,
  ErrorHandledAction
} from '../store/actions/steps.actions';

@Injectable()
export class StepsEffects {
  constructor(
    private stepData: StepDataService,
    private actions$: Actions,
    private router: Router,
    private config: ConfigService
  ) {}

  @Effect()
  submitStep$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.SUBMIT_STEP),
    debounceTime(50),
    mergeMap((action: SubmitStepAction) =>
      this.stepData
        .submitStep(action.stepId, action.stepType, action.payload)
        .pipe(
          map(() => {
            return new ProgressUpdateAction(action.stepId, {
              state: 'SUCCESS'
            });
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

  @Effect()
  stepErrortoGlobalError$: Observable<ErrorAction> = this.actions$.pipe(
    ofType(ActionTypes.SUBMIT_STEP_ERROR),
    map((action: SubmitStepErrorAction) => {
      return new ErrorAction(action.error);
    })
  );

  @Effect()
  error$: Observable<ErrorHandledAction> = this.actions$.pipe(
    ofType(ActionTypes.GLOBAL_ERROR),
    map((action: ErrorAction) => {
      this.config.onError(action.error);
      return new ErrorHandledAction(action.error);
    })
  );
}
