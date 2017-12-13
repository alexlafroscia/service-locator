/* eslint-env node */

const Registry = require('./registry');
const registry = new Registry();

function RegistryAccess(Klass) {
  if (typeof Klass === 'string') {
    Klass = null;
  }

  if (!Klass) {
    Klass = class {};
  }

  return class extends Klass {
    constructor() {
      super();

      return new Proxy(this, {
        get(target, prop) {
          if (prop in target) {
            return target[prop];
          }

          return registry.lookup(prop);
        }
      });
    }
  };
}

module.exports = registry;
module.exports.RegistryAccess = RegistryAccess;
