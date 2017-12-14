import Registry from './registry';

/**
 * The instance of the registry to share between classes that inject it
 *
 * @example <caption>Getting access to the registry</caption>
 * import { registry } from 'service-locator';
 *
 * @example <caption>Registering a static value</caption>
 * registry.register('config', {
 *   loggedIn: true
 * });
 *
 * @example <caption>Setting a value out of the registry</caption>
 * const config = registry.lookup('config');
 */
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

/**
 * @class RegistryAccess
 * @example <caption>A class that accesses the registry</caption>
 * import { registry, RegistryAccess } from 'service-locator';
 *
 * registry.register('config', {
 *   loggedIn: true
 * });
 *
 * class SomethingWithRegistryAccess extends RegistryAccess {
 *   get shouldShowAccount() {
 *     return this.config.loggedIn;
 *   }
 * }
 */
export class RegistryAccess {
  constructor() {
    return registerForAccess(this);
  }

  /**
   * Allows registry access to be mixed into some other class
   *
   * @param {T} Klass the base class to extend
   * @return {RegistryAccess<T>} the base class with the registry access mixed in
   * @example <caption>Extending a base class and gaining registry access</caption>
   * import { RegistryAccess } from 'service-locator';
   *
   * class Foo {
   *   constructor() {
   *     ...
   *   }
   * }
   *
   * class FooWithRegistryAccess extends RegistryAccess.Mixin(Foo) {}
   */
  static Mixin(Klass) {
    return class extends Klass {
      constructor() {
        super();
        return registerForAccess(this);
      }
    };
  }
}
