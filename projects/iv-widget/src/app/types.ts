export interface PictureStep {
  nameTranslateKey: string;
  type: 'picture';
  allow_camera_switch?: string;
  subtitleTranslateKey?: string;
  captureTranslateKey?: string;
  overlay_type: 'card' | 'face';
  hideInSummary?: boolean;
}

export interface FileStep {
  nameTranslateKey: string;
  headerTextTranslateKey?: string;
  footerTextTranslateKey?: string;
  subtitleTranslateKey?: string;
  type: 'file';
  hideInSummary?: boolean;
}

export interface InformationStep {
  nameTranslateKey: string;
  headerTextTranslateKey?: string;
  footerTextTranslateKey?: string;
  subtitleTranslateKey?: string;
  type: 'information';
  hideInSummary?: boolean;
}

export interface CustomTextStep {
  nameTranslateKey: string;
  contentTextTranslateKey?: string;
  subtitleTranslateKey?: string;
  type: 'custom-text';
  hideInSummary?: boolean;
}

export type Step = PictureStep | InformationStep | FileStep | CustomTextStep;

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

export type StepState =
  | InformationStepState
  | PictureStepState
  | FileStepState
  | CustomTextState;

export interface BaseStepState {
  config: Step;
  progress: {
    state: 'BLANK' | 'PROCESSING' | 'SUCCESS' | 'REJECTED';
  };
}

export interface InformationStepState extends BaseStepState {
  config: InformationStep;
  payload?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface FileStepState extends BaseStepState {
  config: FileStep;
  payload?: {
    file: { name: string; content: string };
  };
}

export interface PictureStepState extends BaseStepState {
  config: PictureStep;
  payload?: {
    image: string;
  };
}

export interface CustomTextState extends BaseStepState {
  config: CustomTextStep;
  payload: undefined;
}
