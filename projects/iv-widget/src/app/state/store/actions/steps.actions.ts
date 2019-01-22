import { Action } from '@ngrx/store';
import { Step } from '../../../types';

export enum ActionTypes {
  SUBMIT_STEP = '[STEPS] Submit step',
  INIT_STEP = '[STEPS] Init steps',
  PROGRESS_UPDATE = '[STEPS] Progress update',
  SUBMIT_STEP_ERROR = '[STEPS] Submit step errors'
}

export class SubmitStepAction implements Action {
  readonly type = ActionTypes.SUBMIT_STEP;

  constructor(
    public readonly stepId: number,
    public stepType: string,
    public readonly payload: any
  ) {}
}

export class InitStepAction implements Action {
  readonly type = ActionTypes.INIT_STEP;

  constructor(public readonly payload: Step[]) {}
}

export class ProgressUpdateAction implements Action {
  readonly type = ActionTypes.PROGRESS_UPDATE;

  constructor(public readonly stepId: number, public readonly payload: any) {}
}

export class SubmitStepErrorAction implements Action {
  readonly type = ActionTypes.SUBMIT_STEP_ERROR;

  constructor(public readonly stepId: number, public readonly error: any) {}
}

export type StepAction =
  | SubmitStepAction
  | InitStepAction
  | ProgressUpdateAction
  | SubmitStepErrorAction;
