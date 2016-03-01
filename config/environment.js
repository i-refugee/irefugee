/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'front-end',
    podModulePrefix: 'front-end/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

 ENV.contentSecurityPolicy = {
    'style-src': "'self' 'unsafe-inline'",
    'connect-src': "'self' http://server.test2.beenotes.eu http://server.test2.beenotes.eu",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline'  https://*.google.com http://*.gstatic.com http://*.googleapis.com https://*.googleapis.com https://*.gstatic.com",
    'img-src': "'self' data: http://*.google.com https://*.googleapis.com https://*.gstatic.com",
    'font-src': "'self' https://*.gstatic.com",
    'style-src': "'self' 'unsafe-inline' https://*.googleapis.com https://*.google.com",
    'media-src': "'self' 'unsafe-inline' http://server.test2.beenotes.eu"
}

ENV['ember-simple-auth'] = {
  authenticationRoute: 'login',
  routeAfterAuthentication: '/',
  routeIfAlreadyAuthenticated: '/'
};

  return ENV;
};
