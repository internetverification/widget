var IvWidget = IvWidget || {};

(function(ivWidget) {
  var config = ivWidget.config || {};
  ivWidget.config = config;
  config.customGreen = [
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
          name: 'firstName',
          type: 'text'
        },
        {
          labelTranslateKey: 'LAST_NAME',
          name: 'lastName',
          type: 'text'
        },
        {
          labelTranslateKey: 'DATE_OF_BIRTH',
          name: 'dob',
          type: 'date'
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
          labelTranslateKey: 'SUBADMINISTRATIVE_AREA',
          name: 'address_subadministrative_area',
          text: 'text',
          optional: true
        },
        {
          labelTranslateKey: 'POSTAL_CODE',
          name: 'address_postal_code',
          text: 'text',
          pattern: /^[^d,f,i,o,q,u,w,z]\d[^d,f,i,o,q,u,w,z]\s?\d[^d,f,i,o,q,u,w,z]\d$/i
        },
        {
          labelTranslateKey: 'COUNTRY',
          name: 'address_country',
          text: 'text'
        }
      ]
    },
    {
      nameTranslateKey: 'INFORMATION_STEP_TITLE',
      contentTextTranslateKey: 'CUSTOM_GREEN_CONTENT',
      type: 'custom-text',
      hideInSummary: true
    },
    {
      nameTranslateKey: 'FACE_PICTURE_STEP_TITLE',
      subtitleTranslateKey: 'SELFIE_PICTURE_SUBTITLE',
      captureTranslateKey: 'SELFIE_PICTURE_CAPTURE',
      overlay_type: 'face',
      type: 'picture'
    },
    {
      nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
      subtitleTranslateKey: 'ID_PICTURE_SUBTITLE',
      captureTranslateKey: 'ID_PICTURE_CAPTURE',
      overlay_type: 'card',
      allow_camera_switch: true,
      type: 'picture'
    }
  ];
})(IvWidget);
