import { Action } from '@ngrx/store';
import { ActionTypes, StepAction } from '../actions/steps.actions';

export const initialState = {};

export function stepsReducer(state = initialState, action: StepAction) {
  switch (action.type) {
    case ActionTypes.SUBMIT_STEP:
      return {
        ...state,
        [action.stepId]: {
          payload: action.payload,
          progress: {
            state: 'PROCESSING'
          }
        }
      };
    default:
      return state;
  }
}
