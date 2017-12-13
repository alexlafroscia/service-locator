export default class Registry {
  constructor() {
    this.reset();
  }

  register(key, value) {
    this._registry.set(key, value);
  }

  lookup(key) {
    return this._registry.get(key);
  }

  reset() {
    this._registry = new Map();
  }
}
