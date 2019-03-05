const alignCenter = `
  width: 100%;
  display: flex;
  justify-content: center;
  `;

export default {
  widget: {
    container: {
      class: 'nice-admin'
    }
  },
  global: {
    title: { class: 'h1' }
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
  date: {
    group: {
      class: 'form-group'
    },
    day: {
      style: 'width: 4em'
    },
    month: {
      style: 'width: 4em'
    },
    year: {
      style: 'width: 8em'
    },
    inputs: {
      class: 'form-inline'
    },
    input: {
      class: 'form-control',
      style: 'margin: 0 5px'
    },
    inputErrorText: {
      class: 'text-danger'
    }
  },
  button: {
    inner: {
      class: 'btn btn-primary'
    }
  },
  steps: {
    information: {
      title: {
        class: 'h2'
      },
      buttons: {
        container: {
          style: alignCenter
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
          style: alignCenter
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
