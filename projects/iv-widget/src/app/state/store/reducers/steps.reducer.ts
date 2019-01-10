import { ActionTypes, StepAction } from '../actions/steps.actions';

export const initialState = {};

const updateStep = (step, stepUpdate: any) => {
  return Object.assign({}, step, stepUpdate);
};

const addProgress = (step, progress) => {
  const prevLogs = step.progress.logs || [];
  prevLogs.push(progress);
  const newStep = { ...step };
  newStep.progress.logs = prevLogs;
  newStep.progress.state = progress.state;
  return newStep;
};

export function stepsReducer(state = initialState, action: StepAction) {
  switch (action.type) {
    case ActionTypes.PROGRESS_UPDATE:
      const progressUpdateStep = state[action.stepId];
      const uStep = addProgress(progressUpdateStep, action.payload);
      return {
        ...state,
        [action.stepId]: uStep
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
