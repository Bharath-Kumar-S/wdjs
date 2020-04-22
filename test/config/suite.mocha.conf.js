//to use debug option run `DEBUG=true followed by your .conf.js`
const defaultTimeoutInterval = process.env.DEBUG ? (60 * 60 * 500) : 90000;
const video = require('wdio-video-reporter');
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const { join } = require('path');

exports.config = {
  runner: 'local',
  // port:4444,
  specs: [
    './test/specs/*.test.js'
    // ,'./test/visualregression/*.spec.js'
  ],
  exclude: [
    // './test/specs/file-to-exclude.js'
  ],
  maxInstances: 1,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // args: ['--headless', '--disable-gpu'],
      }
    },
    // {
    //   maxInstances: 1,
    //   platformName: 'mac',
    //   browserName: 'safari',
    // },

    // {
    //   maxInstances: 5,
    //   browserName: 'internet explorer',
    //   acceptUntrustedCertificates: true,
    //   ignoreProtectedModeSettings: true,    //only applicable to IE browser
    //   ignoreZoomSetting: true,              //only applicable to IE browser
    //   ensureCleanSession: true,
    // },
  ],
  sync: false,
  logLevel: 'silent',               // Level of logging verbosity: silent | verbose | command | data | result | error
  deprecationWarnings: true,        // Warns when a deprecated command is used
  bail: 0,
  waitforTimeout: 10000,            // Default timeout for all waitFor* commands.
  connectionRetryTimeout: 90000,    // Default timeout in milliseconds for request if Selenium Grid doesn't send response
  connectionRetryCount: 3,          // Default request retries count
  services: [
    ['selenium-standalone'],
    [
      'image-comparison',
      {
        baselineFolder: join(process.cwd(), './screenshots/reference/'),
        formatImageName: '{tag}-{logName}-{width}x{height}',
        screenshotPath: join(process.cwd(), './screenshots/'),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
      },
    ],
    [TimelineService]],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
    compilers: ['js:@babel/register'],
  },
  reporters: [
    'dot',
    'spec',
    [
      video, {
        saveAllVideos: true,       // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
      }],
    ['junit', {
      outputDir: './test/reports/junit-results/',
      outputFileFormat: function (opts) { // optional
        return `results-${opts.cid}.${opts.capabilities}.xml`
      }
    }
    ],

    ['allure', {
      outputDir: './test/reports/allure-results/',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false
    }
    ],
    ['timeline', { outputDir: './test/reports/timeline' }],
  ],
  //end @wdio/report

  //
  // =====
  // Hooks
  // =====
  // WedriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function (config, capabilities) {
    console.log('**** let\'s go ****');
  },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
    require('@babel/register');
  },
  /**
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  * @param {Array.<Object>} capabilities list of capabilities details
  * @param {Array.<String>} specs List of spec file paths that are to be run
  */
  before: function (capabilities, specs) {
    // browser.setWindowSize(1920, 1080);
    browser.maximizeWindow();
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
  //
  // Hook that gets executed before the suite starts
  beforeSuite: function (suite) {
  },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  beforeHook: function (each) {
  },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  afterHook: function (currentTest) {
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  beforeTest: function (test) {
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  beforeCommand: function (commandName, args) {
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
  },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: function (test) {
    //console.log(test);
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
  },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {
  },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: function (config, capabilities, specs) {
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. It is not
   * possible to defer the end of the process using a promise.
   * @param {Object} exitCode 0 - success, 1 - fail
   */
  onComplete: (exitCode) => {
    console.log('**** that\'s it ****');
  },

  afterTest: (test) => {
    // if (test.error !== undefined) {
    //   browser.takeScreenshot();
    // }
    browser.takeScreenshot();
  }
}
