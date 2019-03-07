// rollup.config.js
import json from 'rollup-plugin-json';

export default [
  {
    input: 'projects/iv-widget/src/assets/lang/en.scenario1.js',
    output: {
      name: 'IvWidget.lang.en1',
      format: 'umd',
      file: 'public/lang/en.scenario1.js'
    },
    plugins: [json()]
  },
  {
    input: 'projects/iv-widget/src/assets/lang/en.scenario2.js',
    output: {
      name: 'IvWidget.lang.en2',
      format: 'umd',
      file: 'public/lang/en.scenario2.js'
    },
    plugins: [json()]
  },
  {
    input: 'projects/iv-widget/src/assets/lang/fr.scenario1.js',
    output: {
      name: 'IvWidget.lang.fr1',
      format: 'umd',
      file: 'public/lang/fr.scenario1.js'
    },
    plugins: [json()]
  },
  {
    input: 'projects/iv-widget/src/assets/lang/fr.scenario2.js',
    output: {
      name: 'IvWidget.lang.fr2',
      format: 'umd',
      file: 'public/lang/fr.scenario2.js'
    },
    plugins: [json()]
  }
];
