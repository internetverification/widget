const alignEnd = `
  width: 100%;
  display: flex;
  justify-content: flex-end;
  `;

const alignCenter = `
  width: 100%;
  display: flex;
  justify-content: flex-end;
  `;

export default {
  widget: {
    container: {
      class: 'bootstrap-theme'
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
          style: alignCenter
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
