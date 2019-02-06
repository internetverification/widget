# IvWidget

## Installation

The necessary files for the widget can be installed through npm with

`npm install @iv/iv-widget`

Then be sure to include the file `./node_modules/@iv/iv-widget/dist/iv-widget.js` to your page scripts

You can also import

`import "@iv/iv-widget/dist/iv-widget"`
or
`require("@iv/iv-widget/dist/iv-widget")`

## Usage

```
var widget = createIvWidget('my-container-id', {
  steps: myStepConfig,
  lang: myLangConfig,
  theme: myThemeConfig
  config: {
    tenantId: 'your_tenant_id',
    serviceId: 'your_service_id',
    submissionId: 'your_submission_id'
  }
});
```

## Config

The config section defines some parameter used by the Internet Verification api to identify your submission
All the information for this section should be available under your Internet Verification dashboard

## Theming

Theming the widget is achieved using the theme property

The theme configuration can be used to add inline styles or class to almost all elements in the widget.

There is a few predefined theme which add classes according to popular css framework such as bootstrap

## Lang

The lang configuration is used to define languages that can be used by the widget

The language configuration takes the form of

```
{
  'en': {
    'MY_KEY': 'MY_TRANSLATION'
  },
  'fr': {
    'MY_KEY': 'MA_TRADUCTION'
  }
}
```

If you use only one language in your app there is no need to define multiple language here

The current language can be switched dynamically using the following

```
var widget = createIvWidget('my-container-id', ...)

// Assuming there is a en key defined in lang config
widget.currentLang = 'en'
```

To see what are the supported keys please look at a [predfined language](./projects/iv-widget/src/assets/lang/en.js)

### Template capabilties

Some translation string support html in order allow better customization and richer message

## Workflow configuration

By default the widget will pickup the configuration using the Internet Verification api, but it is also possible to configure them yourself

There is 4 possbile steps type

- Custom Text
- File
- Information
- Picture

# IvWidget Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
