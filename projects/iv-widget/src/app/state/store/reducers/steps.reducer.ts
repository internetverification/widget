import { ActionTypes, StepAction } from '../actions/steps.actions';
import { oc } from 'ts-optchain';

export const initialState = {};

export function stepsReducer(state = initialState, action: StepAction) {
  switch (action.type) {
    case ActionTypes.PROGRESS_UPDATE:
      return {
        ...state,
        [action.stepId]: {
          ...state[action.stepId],
          progress: {
            state: action.payload.progress,
            logs: [
              ...oc(state)[action.stepId].progress.logs([]),
              action.payload.progress
            ]
          }
        }
      };
    case ActionTypes.SUBMIT_STEP_ERROR:
      return {
        ...state,
        [action.stepId]: {
          ...state[action.stepId],
          progress: {
            state: 'ERROR',
            logs: oc(state)[action.stepId].progress.logs([])
          }
        }
      };
    case ActionTypes.SUBMIT_STEP:
      return {
        ...state,
        [action.stepId]: {
          ...state[action.stepId],
          payload: action.payload,
          progress: {
            state: 'PROCESSING'
          }
        }
      };
    case ActionTypes.INIT_STEP:
      return action.payload.reduce(
        (prev, current, i) => ({
          ...prev,
          [i]: { config: current, progress: { state: 'BLANK' } }
        }),
        {}
      );
    default:
      return state;
  }
}
