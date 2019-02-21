var IvWidget = IvWidget || {};

(function(ivWidget) {
  var config = ivWidget.config || {};
  ivWidget.config = config;
  config.scenario1 = [
    {
      nameTranslateKey: 'INFORMATION_STEP_TITLE',
      contentTextTranslateKey: 'ENTER_YOUR_INFORMATION',
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
          name: 'firstName',
          type: 'text'
        },
        {
          labelTranslateKey: 'LAST_NAME',
          name: 'lastName',
          type: 'text'
        }
      ]
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
