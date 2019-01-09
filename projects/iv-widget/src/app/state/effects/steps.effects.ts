import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from '../store/actions/steps.actions';
import { StepDataService } from '../../data/step-data.service';

@Injectable()
export class StepsEffects {
  // Listen for the 'LOGIN' action
  @Effect()
  submitStep$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.SUBMIT_STEP),
    mergeMap((action: any) => this.stepData.submitStep(action.payload))
  );

  constructor(private stepData: StepDataService, private actions$: Actions) {}
}
