// rollup.config.js
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const themes = [
  {
    file: 'bootstrapTheme',
    module: 'bootstrap'
  },
  {
    file: 'customgreenTheme',
    module: 'customGreen'
  },
  {
    file: 'niceAdminTheme',
    module: 'niceAdmin'
  },
  {
    file: 'defaultTheme',
    module: 'defaultTheme'
  }
];

const scenario = [
  {
    file: 'idverify',
    module: 'idVerify'
  },
  {
    file: 'idverify_address',
    module: 'idVerifyAddress'
  }
];

export default [
  ...scenario.reduce((prev, current) => {
    return [
      ...prev,
      {
        input: `projects/iv-widget/src/assets/scenario/${current.file}.js`,
        output: {
          name: `IvWidget.scenario.${current.module}`,
          format: 'umd',
          file: `public/scenario/${current.module}.js`
        }
      }
    ];
  }, []),
  ...themes.reduce((prev, current) => {
    return [
      ...prev,
      {
        input: `projects/iv-widget/src/assets/themes/${current.file}.js`,
        output: {
          name: `IvWidget.themes.${current.module}`,
          format: 'umd',
          file: `public/themes/${current.module}.js`
        }
      }
    ];
  }, []),
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
  }, []),
  {
    input: 'main.js',
    output: {
      name: 'IvWidget',
      format: 'umd',
      file: 'public/index.js',
      extend: true
    },
    plugins: []
  },
  {
    input: 'plugins/face-cv/face.plugin.ts',
    output: {
      name: 'IvWidget.plugins.face',
      format: 'umd',
      file: 'public/plugins/face-cv.js'
    },
    plugins: [typescript(), resolve(), terser()]
  }
];
