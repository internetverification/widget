// rollup.config.js
import json from 'rollup-plugin-json';

export default [
  ...['en', 'fr', 'ko', 'ar'].reduce((prev, current) => {
    return [
      ...prev,
      {
        input: `projects/iv-widget/src/assets/lang/${current}/${current}.idverify.js`,
        output: {
          name: `IvWidget.lang.${current}IdVerify`,
          format: 'umd',
          file: `public/lang/${current}.idverify.js`
        },
        plugins: [json()]
      },
      {
        input: `projects/iv-widget/src/assets/lang/${current}/${current}.idverify_address.js`,
        output: {
          name: `IvWidget.lang.${current}IdVerifyAddress`,
          format: 'umd',
          file: `public/lang/${current}.idverify_address.js`
        },
        plugins: [json()]
      }
    ];
  }, [])
  // {
  //   input: 'projects/iv-widget/src/assets/lang/en.idverify.js',
  //   output: {
  //     name: 'IvWidget.lang.enIdVerify',
  //     format: 'umd',
  //     file: 'public/lang/en.idverify.js'
  //   },
  //   plugins: [json()]
  // },
  // {
  //   input: 'projects/iv-widget/src/assets/lang/en.idverify_address.js',
  //   output: {
  //     name: 'IvWidget.lang.enIdVerifyAddress',
  //     format: 'umd',
  //     file: 'public/lang/en.idverify_address.js'
  //   },
  //   plugins: [json()]
  // },
  // {
  //   input: 'projects/iv-widget/src/assets/lang/fr.idverify.js',
  //   output: {
  //     name: 'IvWidget.lang.frIdVerify',
  //     format: 'umd',
  //     file: 'public/lang/fr.idverify.js'
  //   },
  //   plugins: [json()]
  // },
  // {
  //   input: 'projects/iv-widget/src/assets/lang/fr.idverify_address.js',
  //   output: {
  //     name: 'IvWidget.lang.frIdVerifyAddress',
  //     format: 'umd',
  //     file: 'public/lang/fr.idverify_address.js'
  //   },
  //   plugins: [json()]
  // }
];
