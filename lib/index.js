import Registry from './registry';

export const registry = new Registry();

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

export class RegistryAccess {
  constructor() {
    return registerForAccess(this);
  }
}

RegistryAccess.Mixin = Klass =>
  class extends Klass {
    constructor() {
      super();
      return registerForAccess(this);
    }
  };
