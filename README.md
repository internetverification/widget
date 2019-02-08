# IvWidget

## Installation

The necessary files for the widget can be installed through npm with

`npm install @internetverification/widget`

Then be sure to include the file `./node_modules/@internetverification/widget/index.js` to your page scripts

You can also import

`import IvWidget from "@internetverification/widget"`
or
`var IvWidget = require("@internetverification/widget")`

## Usage

```
var widget = IvWidget.createIvWidget('my-container-id', {
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

### Example html document using the widget

```
<html>
<head>
  <!-- ivWidget.js correspond to ./node_modules/@internetverification/widget/index.js -->
  <script type="text/javascript" src="ivWidget.js" />
<body>
<p>My paragraph</p>
<div id="my-widget-container"></div>
<script>
  IvWidget.createIvWidget("my-widget-container", ...)
</script>
</body>
</html>
```

## Config

The config section defines some parameter used by the Internet Verification api to identify your submission
All the information for this section should be available under your Internet Verification dashboard

## Theming

Theming the widget is achieved using the theme property

The theme configuration can be used to add inline styles or class to almost all elements in the widget.

There is a few predefined theme which add classes according to popular css framework such as bootstrap

[See the list of keys](./THEMING.md)

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

[More detail](./WORKFLOW.md)
