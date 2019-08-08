var rewire = require('rewire');

switch(process.argv[2]) {
  // The "start" script is run during development mode
  case 'start':
    rewireModule('react-scripts/scripts/start.js', loadCustomizer('../config-overrides.dev'));
    break;
  // The "build" script is run to produce a production bundle
  case 'build':
    rewireModule('react-scripts/scripts/build.js', loadCustomizer('../config-overrides.prod'));
    break;
  default:
    console.log('customized-config only supports "start", "build", and "test" options.');
    process.exit(-1);
}

// Attempt to load the given module and return null if it fails.
function loadCustomizer(module) {
  try {
    return require(module);
  } catch(e) {
    if(e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }

  // If the module doesn't exist, return a
  // noop that simply returns the config it's given.
  return config => config;
}

function rewireModule(modulePath, customizer) {
  // Load the module with `rewire`, which allows modifying the
  // script's internal variables.
  let defaults = rewire(modulePath);

  // Reach into the module, grab its global 'config' variable,
  // and pass it through the customizer function.
  // The customizer should *mutate* the config object, because
  // react-scripts imports the config as a `const` and we can't
  // modify that reference.
  let config = defaults.__get__('config');
  customizer(config);
}