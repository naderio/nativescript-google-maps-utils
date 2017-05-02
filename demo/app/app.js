var application = require("application");

if (application.ios) {
  GMSServices.provideAPIKey("AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs");
}

var debug = require('./debug')(__filename);

application.on(application.uncaughtErrorEvent, function (event) {
  debug('ERROR!');
  var error = event.android || event.ios;
  debug('ERROR!', error.name, error.message, error.stackTrace, error.nativeException);
});


application.start({
  moduleName: "main-page"
});