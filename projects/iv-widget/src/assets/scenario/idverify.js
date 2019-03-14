export default [
  {
    nameTranslateKey: 'INFORMATION_STEP_TITLE',
    contentTextTranslateKey: 'INTRO_CONTENT',
    type: 'custom-text',
    hideInSummary: true
  },
  {
    nameTranslateKey: 'INFORMATION_STEP_TITLE',
    type: 'information',
    stepName: 'information',
    fields: [
      {
        labelTranslateKey: 'EMAIL',
        name: 'email',
        type: 'email'
      },
      {
        labelTranslateKey: 'FIRST_NAME',
        name: 'first_name',
        type: 'text'
      },
      {
        labelTranslateKey: 'LAST_NAME',
        name: 'last_name',
        type: 'text'
      },
      {
        labelTranslateKey: 'DATE_OF_BIRTH',
        name: 'dob',
        type: 'date'
      }
    ]
  },
  {
    nameTranslateKey: 'FACE_PICTURE_STEP_TITLE',
    overlay_type: 'face',
    stepName: '1',
    descriptiveTextTranslateKey: 'SEFLIE_PRE_TEXT',
    type: 'picture'
  },
  {
    nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
    overlay_type: 'card',
    type: 'picture',
    stepName: '2',
    allow_camera_switch: true,
    descriptiveTextTranslateKey: 'ID_PRE_TEXT',
    flipCapturedImage: true,
    flipCapturedImageMobile: true
  }
];
