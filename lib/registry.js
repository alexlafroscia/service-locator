const PRIMITIVE_TYPES = ['string', 'number'];

/**
 * Holds onto references to the items in the registry
 *
 * Also stores metadata about the things stored
 *
 * @class Registry
 */
export default class Registry {
  constructor() {
    this.reset();
  }

  /**
   * Set some value with the given identifier in the registry
   *
   * @method register
   * @param {string} key the identifier
   * @param {*} value the value to set there
   */
  register(key, value) {
    this._registry.set(key, value);
  }

  /**
   * Partially replace a value in the registry
   *
   * One of the nice features of using the registry is that it allows easy
   * injection of test stubs. However, it's often annoying to make sure that
   * the stub has all of the properties and methods that the code may require
   * when you really only want to replace one thing.
   *
   * This method allows you to supply a replacement that _only_ replaces the
   * provided properties and methods, leaving everything else in tact.
   *
   * @method stub
   * @param {string} key the identifier
   * @param {object} config the properties and methods to replace
   * @return {*} the stubbed version of the original object
   * @example <caption>Replacing a property on an object</caption>
   * registry.register('session', {
   *   loggedIn: true
   * });
   * registry.stub('session', { loggedIn: false });
   * registry.lookup('session').loggedIn; // false
   *
   * @example <caption>Stubbed a method that fetches data</caption>
   * registry.register('userService', {
   *   userName() {
   *     return this.fetch().then(res => res.name);
   *   },
   *   fetch() {
   *     return fetch(...).then(res => res.json());
   *   }
   * });
   * registry.stub('userService', {
   *   async fetch() {
   *     return { name: 'Alex' };
   *   }
   * });
   *
   * registry.lookup('userService').userName(); // Resolves to `Alex`
   */
  stub(key, config) {
    const value = this.lookup(key);

    if (PRIMITIVE_TYPES.includes(typeof value)) {
      throw new Error(
        `You cannot stub a value of type ${typeof value}. Register an alternate value instead`
      );
    }

    const stubbedValue = new Proxy(value, {
      get(target, prop) {
        if (prop in config) {
          return config[prop];
        }

        return target[prop];
      }
    });

    this.register(key, stubbedValue);

    return stubbedValue;
  }

  /**
   * Returns the value for a given registered key
   *
   * @method lookup
   * @param {string} key
   * @return {*} the thing that was registered
   */
  lookup(key) {
    return this._registry.get(key);
  }

  /**
   * Resets the registry back to an empty state
   *
   * @method reset
   */
  reset() {
    this._registry = new Map();
  }
}
