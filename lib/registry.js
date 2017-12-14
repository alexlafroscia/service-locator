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
