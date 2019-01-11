var IvWidget = IvWidget || {};

(function(ivWidget) {
  var config = ivWidget.config || {};
  ivWidget.config = config;
  config.default = [
    {
      nameTranslateKey: 'INFORMATION_STEP_TITLE',
      contentTextTranslateKey: 'ENTER_YOUR_INFORMATION',
      type: 'custom-text',
      hideInSummary: true
    },
    {
      nameTranslateKey: 'INFORMATION_STEP_TITLE',
      headerTextTranslateKey: 'ENTER_YOUR_INFORMATION',
      type: 'file'
    },
    {
      nameTranslateKey: 'INFORMATION_STEP_TITLE',
      type: 'information'
    },
    {
      nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
      overlay_type: 'face',
      type: 'picture'
    },
    {
      nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
      overlay_type: 'card',
      type: 'picture'
    }
  ];
})(IvWidget);
