# Workflow configuration

You have the possibility to customize the verification experience by configurating steps that you user will go through

There is 4 possible steps type:

- Custom Text
- File
- Information
- Picture

By default each step has 3 configurable properties

- `nameTranslateKey` is the translation key used to show the title of the step in the summary page
- `type` is the step type this defines which template the widget will display to collect your customers information
- `hideInSummary` false by default this field will prevent the steps from being shown on the summary page (custom text often will set this to true)

## Custom Text

This step type can be used to show custom text to your user (a disclaimer for example)

```
{
  nameTranslateKey: 'INFORMATION_STEP_TITLE',
  contentTextTranslateKey: 'ENTER_YOUR_INFORMATION',
  type: 'custom-text',
  hideInSummary: true
}
```

This step support the contentTextTranslateKey which refer to a particular key in your translation file (see lang configuration)

This key can refer to an html template and can be used to display rich content

## Information

Used to display a form that collect information

```
{
nameTranslateKey: 'INFORMATION_STEP_TITLE',
type: 'information'
}
```

## Picture

```
{
nameTranslateKey: 'ID_PICTURE_STEP_TITLE',
overlay_type: 'face',
type: 'picture'
}
```

### Custom properies:

overlay_type: can be either 'face' or 'card. Correspond to the overlay shape over the user camera

## File

```
{
nameTranslateKey: 'FILE_STEP_TITLE',
type: 'file'
}
```
