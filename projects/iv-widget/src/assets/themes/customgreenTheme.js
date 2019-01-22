var IvWidget = IvWidget || {};

(function(ivWidget) {
  var themes = ivWidget.themes || {};
  ivWidget.themes = themes;

  const alignEnd = `
  width: 100%;
  display: flex;
  justify-content: flex-end;
  `;

  const alignCenter = `
  width: 100%;
  display: flex;
  justify-content: center;
  `;

  themes.customGreen = {
    global: {
      title: {
        style: `
        text-transform: uppercase;
        `,
        class: 'text-primary text-center'
      }
    },
    widget: {
      container: {
        class: 'customgreen'
      }
    },
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
    steps: {
      subtitle: {
        class: 'text-center subtitle'
      },
      information: {
        buttons: {
          container: {
            style: alignEnd
          }
        }
      },
      customText: {
        buttons: {
          container: {
            style: alignCenter,
            class: 'button-container'
          }
        }
      },
      picture: {
        switchCamera: {
          button: {
            class: 'btn btn-primary'
          }
        },
        topButtons: {
          container: {
            class: 'top-button-container'
          }
        },
        buttons: {
          container: {
            style: alignCenter,
            class: 'button-container'
          }
        }
      },
      file: {
        buttons: {
          container: {
            style: alignEnd
          }
        }
      }
    },
    summary: {
      buttonContainer: {
        style: `
        margin-top: 10px;
        ${alignCenter}
        `
      },
      step: {
        icon: {
          class: 'icon'
        },
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
        barError: {
          class: 'bg-danger text-white'
        },
        details: {
          file: {
            style: `
            width: 100%;
            display: flex;
            justify-content: space-between;
            `
          },
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
