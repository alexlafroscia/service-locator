import { registry } from './index';

function lookup(key) {
  return {
    get() {
      return registry.lookup(key);
    }
  };
}

/**
 * Injects something off the registry, using the name of the property
 *
 * To be used as a property decorator
 * Requires `babel-plugin-transform-decorators-legacy`.
 *
 * @experimental It depends on a Babel transform that is not yet stage 4
 * @example <caption>Injecting registry access into a class</caption>
 * import { registry, inject } from '@alexlafroscia/service-locator';
 *
 * registry.register('config', {
 *   loggedIn: true
 * });
 *
 * class Foo {
 *   \@inject config;
 * }
 *
 * const instance = new Foo();
 * instance.config.loggedIn; // true
 */
export default function inject(target, key) {
  return lookup(key);
}

/**
 * Injects something off the registry, using an alternate name
 *
 * To be used as a property decorator.
 * Requires `babel-plugin-transform-decorators-legacy`.
 *
 * @experimental It depends on a Babel transform that is not yet stage 4
 * @example <caption>Injecting registry access into a class</caption>
 * import { registry, injectLookup } from '@alexlafroscia/service-locator';
 *
 * registry.register('config', {
 *   loggedIn: true
 * });
 *
 * class Foo {
 *   \@inject.lookup('config') userSessionConfig
 * }
 *
 * const instance = new Foo();
 * instance.userSessionConfig.loggedIn; // true
 */
export function injectLookup(registryKey) {
  return function() {
    return lookup(registryKey);
  };
}
