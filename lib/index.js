/* eslint-env node */

const Registry = require('./registry');
const registry = new Registry();

function withAccessTo(Klass, ...properties) {
  if (typeof Klass === 'string') {
    properties.push(Klass);
    Klass = null;
  }

  if (!Klass) {
    Klass = class {};
  }

  return class extends Klass {
    constructor() {
      super();

      for (const property of properties) {
        Object.defineProperty(this, property, {
          get() {
            return registry.lookup(property);
          },
          enumerable: true
        });
      }
    }
  };
}

module.exports = registry;
module.exports.withAccessTo = withAccessTo;
