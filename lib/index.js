/* eslint-env node */

const Registry = require('./registry');
const registry = new Registry();

function registerForAccess(context) {
  return new Proxy(context, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }

      return registry.lookup(prop);
    }
  });
}

class RegistryAccess {
  constructor() {
    return registerForAccess(this);
  }
}

RegistryAccess.extend = function(Klass) {
  return class extends Klass {
    constructor() {
      super();
      return registerForAccess(this);
    }
  };
};

module.exports = {
  RegistryAccess,
  registry
};
