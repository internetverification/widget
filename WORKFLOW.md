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

You can specify a list of fields which will be displayed in a form on the widget

**Different field type are:**

- email
- date
- text

Field are `required` by default, if you want to make a field optional set the the property `optional` to true

If you need a field to match a specific pattern you can specify a RegEx in the `pattern` property

**Example config**

```
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
    },
    {
      labelTranslateKey: 'DATE_OF_BIRTH',
      name: 'dob',
      type: 'date'
    },
    {
      labelTranslateKey: 'CIVIC_ADDRESS',
      name: 'address_civic_address',
      text: 'text'
    },
    {
      labelTranslateKey: 'MUNICIPALITY',
      name: 'address_municipality',
      text: 'text'
    },
    {
      labelTranslateKey: 'ADMINISTRATIVE_AREA',
      name: 'address_administrative_area',
      text: 'text'
    },
    {
      labelTranslateKey: 'SUBADMINISTRATIVE_AREA',
      name: 'address_subadministrative_area',
      text: 'text',
      // This field is not required
      optional: true
    },
    {
      labelTranslateKey: 'POSTAL_CODE',
      name: 'address_postal_code',
      text: 'text',
      // Canadian postal code
      pattern: /^[^d,f,i,o,q,u,w,z]\d[^d,f,i,o,q,u,w,z]\s?\d[^d,f,i,o,q,u,w,z]\d$/i
    },
    {
      labelTranslateKey: 'COUNTRY',
      name: 'address_country',
      text: 'text'
    }]
  },
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
