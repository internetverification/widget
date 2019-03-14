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
        labelTranslateKey: 'CIVIC_ADDRESS',
        name: 'address_civic_address',
        text: 'text'
      },
      {
        labelTranslateKey: 'MUNICIPALITY',
        name: 'address_municipality',
        text: 'text'
      },
      {
        labelTranslateKey: 'ADMINISTRATIVE_AREA',
        name: 'address_administrative_area',
        text: 'text'
      },
      {
        labelTranslateKey: 'POSTAL_CODE',
        name: 'address_postal_code',
        text: 'text',
        pattern: /^[0-9]{5}$|^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/i
      },
      {
        labelTranslateKey: 'COUNTRY',
        name: 'address_country',
        text: 'text'
      }
    ]
  },
  {
    nameTranslateKey: 'FACE_PICTURE_STEP_TITLE',
    overlay_type: 'face',
    type: 'picture',
    descriptiveTextTranslateKey: 'SEFLIE_PRE_TEXT'
  },
  {
    nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
    overlay_type: 'card',
    descriptiveTextTranslateKey: 'ID_PRE_TEXT',
    type: 'picture',
    allow_camera_switch: true,
    flipCapturedImage: true,
    flipCapturedImageMobile: true
  },
  {
    nameTranslateKey: 'POA_STEP_TITLE',
    type: 'file'
  }
];
