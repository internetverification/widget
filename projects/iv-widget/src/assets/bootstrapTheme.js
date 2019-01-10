var IvWidget = IvWidget || {};

(function(ivWidget) {
  var themes = ivWidget.themes || {};
  ivWidget.themes = themes;
  themes.bootstrap = {
    input: {
      group: {
        class: 'form-group'
      },
      input: {
        class: 'form-control'
      },
      inputErrorText: {
        class: 'text-danger'
      }
    },
    button: {
      class: 'btn btn-primary'
    },
    summary: {
      step: {
        container: {
          class: 'card'
        },
        bar: {
          class: 'card-header',
          style: `
            display: flex;
            justify-content: space-between;
          `
        },
        barSuccess: {
          class: 'bg-success text-white'
        },
        details: {
          container: {
            class: 'card-body'
          },
          picture: {
            style: `
              max-width: 100%;
            `
          }
        }
      }
    }
  };
})(IvWidget);
