// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var browserstack = require('browserstack-local');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  commonCapabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USER,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserstack.local': true
  },
  getMultiCapabilities: async () => {
    return [
      {
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserstack.local': true,
        os: 'Windows',
        os_version: '10',
        browserName: 'Chrome',
        browser_version: '72.0 beta',
        resolution: '1024x768',
        chromeOptions: {
          args: [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream'
          ]
        }
      },
      {
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserstack.local': true,
        'browserstack.console': 'errors',
        'moz:firefoxOptions': {
          prefs: {
            'media.navigator.permission.disabled': true,
            'media.navigator.streams.fake': true
          }
        },
        os: 'Windows',
        os_version: '10',
        browserName: 'Firefox',
        browser_version: '56.0',
        resolution: '1024x768'
      }
    ];
  },
  // directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  // Code to start browserstack local before start of test
  beforeLaunch: function() {
    console.log('Connecting local');
    return new Promise(function(resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        { key: exports.config.commonCapabilities['browserstack.key'] },
        function(error) {
          if (error) return reject(error);
          console.log('Connected. Now testing...');

          resolve();
        }
      );
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function() {
    return new Promise(function(resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
