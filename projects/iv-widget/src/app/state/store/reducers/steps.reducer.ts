import { ActionTypes, StepAction } from '../actions/steps.actions';

export const initialState = {};

function cloneObject<T>(obj: T) {
  const clone: T = {} as T;
  for (const i in obj) {
    if (obj[i] !== null && typeof obj[i] === 'object') {
      clone[i] = cloneObject(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }
  return clone as T;
}

const updateStep = (step, stepUpdate: any) => {
  return Object.assign({}, step, stepUpdate);
};

const addProgress = (step, progress) => {
  const prevLogs = step.progress.logs || [];
  prevLogs.push(progress);
  const newStep = cloneObject(step);
  newStep.progress.logs = prevLogs;
  newStep.progress.state = progress.state;
  return newStep;
};

const addStepError = (step, error) => {
  const newStep = cloneObject(step);
  newStep.progress.state = 'ERROR';
  return newStep;
};

export function stepsReducer(state = initialState, action: StepAction) {
  switch (action.type) {
    case ActionTypes.PROGRESS_UPDATE:
      return {
        ...state,
        [action.stepId]: addProgress(state[action.stepId], action.payload)
      };
    case ActionTypes.SUBMIT_STEP_ERROR:
      return {
        ...state,
        [action.stepId]: addStepError(state[action.stepId], action.error)
      };
    case ActionTypes.SUBMIT_STEP:
      const step = state[action.stepId];
      const updatedStep = updateStep(step, {
        payload: action.payload,
        progress: {
          state: 'PROCESSING'
        }
      });
      return {
        ...state,
        [action.stepId]: updatedStep
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
