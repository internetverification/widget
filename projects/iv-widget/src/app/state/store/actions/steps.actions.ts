import { Action } from '@ngrx/store';

export enum ActionTypes {
  SUBMIT_STEP = '[STEPS] Submit step'
}

export class SubmitStepAction implements Action {
  readonly type = ActionTypes.SUBMIT_STEP;

  constructor(public readonly stepId: number, public readonly payload: any) {}
}

export type StepAction = SubmitStepAction;
