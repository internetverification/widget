export default [
  {
    nameTranslateKey: 'INFORMATION_STEP_TITLE',
    contentTextTranslateKey: 'ID_VERIFY_CUSTOM_TEXT',
    type: 'custom-text',
    hideInSummary: true
  },
  {
    nameTranslateKey: 'INFORMATION_STEP_TITLE',
    type: 'information',
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
    descriptiveTextTranslateKey: 'SEFLIE_PRE_TEXT',
    type: 'picture'
  },
  {
    nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
    overlay_type: 'card',
    type: 'picture',
    allow_camera_switch: true,
    descriptiveTextTranslateKey: 'ID_PRE_TEXT',
    flipCapturedImage: true,
    flipCapturedImageMobile: true
  }
];
