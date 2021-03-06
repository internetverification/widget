export interface PictureStep {
  nameTranslateKey: string;
  type: 'picture';
  allow_camera_switch?: string;
  subtitleTranslateKey?: string;
  captureTranslateKey?: string;
  enablePermissionTranslateKey?: string;
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
  fields: InformationStepField[];
}

export interface InformationStepField {
  type: 'text' | 'date' | 'email';
  labelTranslateKey: string;
  name: string;
  optional?: boolean;
  pattern?: RegExp | string;
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
  config?: {
    apiUrl: string;
    tenantId: string;
    serviceId: string;
    submissionId: string;
  };
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
  config: WithRoute<Step>;
  progress: {
    state: 'BLANK' | 'PROCESSING' | 'SUCCESS' | 'REJECTED';
  };
}

export type WithRoute<T> = T & { id: number; route: string };

export interface InformationStepState extends BaseStepState {
  config: WithRoute<InformationStep>;
  payload?: {
    [key: string]: string;
  };
}

export interface FileStepState extends BaseStepState {
  config: WithRoute<FileStep>;
  payload?: {
    file: { name: string; content: string };
  };
}

export interface PictureStepState extends BaseStepState {
  config: WithRoute<PictureStep>;
  payload?: {
    image: string;
  };
}

export interface CustomTextState extends BaseStepState {
  config: WithRoute<CustomTextStep>;
  payload: undefined;
}
