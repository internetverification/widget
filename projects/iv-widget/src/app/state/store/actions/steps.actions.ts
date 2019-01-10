import { Action } from '@ngrx/store';
import { Step } from '../../../types';

export enum ActionTypes {
  SUBMIT_STEP = '[STEPS] Submit step',
  INIT_STEP = '[STEPS] Init steps',
  PROGRESS_UPDATE = '[STEPS] Progress update'
}

export class SubmitStepAction implements Action {
  readonly type = ActionTypes.SUBMIT_STEP;

  constructor(public readonly stepId: number, public readonly payload: any) {}
}

export class InitStepAction implements Action {
  readonly type = ActionTypes.INIT_STEP;

  constructor(public readonly payload: Step[]) {}
}

export class ProgressUpdateAction implements Action {
  readonly type = ActionTypes.PROGRESS_UPDATE;

  constructor(public readonly stepId: number, public readonly payload: any) {}
}

export type StepAction =
  | SubmitStepAction
  | InitStepAction
  | ProgressUpdateAction;
