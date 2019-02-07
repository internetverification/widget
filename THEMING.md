# Available key

## Global theming key

- `widget.container` Correspond to the root container of the widget
- `global.title` Style applied to the title of the widget
- `button` Style for buttons through the widget
- `input.group` Style applied to the container of an input and its label
- `input.label` Style for the default label through the widget
- `input.input` Style for the default input through the widget
- `input.inputError` Style to add to inputs in error

## Summary page keys

- `summary.buttonContainer` Style applied to the container of buttons on the summary page
- `summary.step.container` Style applied to the container of each steps in the summary page
- `summary.step.details.file` Style applied to file step in the summary page
- `summary.step.details.picture` Style applied to picture step in the summary page
- `summary.step.details.container` Style applied to container of information steps in the summary page

## Steps page keys

- `steps.subtitle` Style to apply to the subtitle of each step

### Custom Text Step

- `steps.customText.buttons.container` Applied to the container of the buttons in a customText step

### File Step

- `steps.file.buttons.container` Applied to the container of the buttons in a file step

### Information Step

- `steps.information.buttons.container` Applied to the container of the buttons in a file

### Picture Step

- `steps.picture.switchCamera.button` Applied to switch camera buttons
- `steps.picture.switchCamera.icon` Applied to switch camera button icon
- `steps.picture.switchcamera.text` Applied to switch camera button text
- `steps.picture.topButtons.container` Applied to top buttons container
- `steps.picture.buttons.container` Applied top and bottom buttons container

# Example of extending an existing theme

```
const bootstrapTheme = IvWidget.themes.bootstap;
let myTheme = {
  widget: {
    container: {
      class: 'my-widget-container-class',
      style: 'display: block;'
    }
  },
  steps: {
    information: {
      buttons: {
        container: {
          class: 'my-information-button'
        }
      }
    }
  }
}

const myExtendedTheme = deepMerge(myTheme, bootstrapTheme)

var widget = createIvWidget('my-container-id', {
  steps: myStepConfig,
  lang: myLangConfig,
  theme: bootstrapTheme // Default theme could also be myExtendedTheme
  config: {
    tenantId: 'your_tenant_id',
    serviceId: 'your_service_id',
    submissionId: 'your_submission_id'
  }
});

widget.theme = myExtendedTheme
```
