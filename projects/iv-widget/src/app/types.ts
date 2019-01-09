export interface PictureStep {
  type: 'picture';
}

export interface InformationStep {
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
