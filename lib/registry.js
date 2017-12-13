/* eslint-env node */

module.exports = class Registry {
  constructor() {
    this.reset();
  }

  register(key, value) {
    this._registry.set(key, value);
  }

  lookup(key) {
    if (this._registry.has(key)) {
      return this._registry.get(key);
    } else {
      throw new Error(`${key} has not been registered`);
    }
  }

  reset() {
    this._registry = new Map();
  }
};
