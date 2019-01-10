export interface PictureStep {
  nameTranslateKey: string;
  type: 'picture';
  overlay_type: 'card' | 'face';
}

export interface InformationStep {
  nameTranslateKey: string;
  type: 'information';
}

export type Step = PictureStep | InformationStep;

export type Theme = any;
export type LangMap = any;
export interface IvWidgetConfig {
  idToken: string;
  steps: Step[];
  theme?: Theme;
  lang?: {
    [key: string]: LangMap;
  };
}

export type StepState = InformationStepState | PictureStepState;

export interface BaseStepState {
  config: Step;
  progress: {
    state: 'BLANK' | 'PROCESSING';
  };
}

export interface InformationStepState extends BaseStepState {
  payload?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface PictureStepState extends BaseStepState {
  payload?: {
    image: string;
  };
}
