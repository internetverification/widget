var IvWidget = IvWidget || {};

(function(ivWidget) {
  var config = ivWidget.config || {};
  ivWidget.config = config;
  config.customGreen = [
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
