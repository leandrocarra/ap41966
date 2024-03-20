module.exports = function (config) {
  require('ts-node').register({
    compilerOptions: {
      module: 'commonjs'
    }
  });
  require('./karma.conf.ts');

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: [
      'src/**/*.js',
      'spec/**/*.js',
    ],
    exclude: [
      '**/*.js'
    ],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      type: 'lcov',
      dir: require('path').join(__dirname, '../src/coverage'),
    },

    reporters: ['progress', 'kjhtml'],
    sonarqubeReporter: {
      basePath: 'src/app',
      filePattern: '**/*spec.ts', // test files glob pattern
      encoding: 'utf-8', // test files encoding
      outputFolder: 'reports', // report destination
      legacyMode: false, // report for Sonarqube < 6.2 (disabled)
      reportName: function (metadata) {
        return 'sonarqube_report.xml';
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
