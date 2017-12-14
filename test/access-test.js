import test from 'ava';
import { RegistryAccess, registry } from '../dist';

test.beforeEach(() => {
  registry.register('foo', 'bar');
});

test('can define a class that looks something up in the registry', t => {
  class Foo extends RegistryAccess {}

  const instance = new Foo();
  t.is(instance.foo, 'bar');
  t.pass(instance instanceof Foo);
});

test('can extend a base class and provide registry access', t => {
  class Base {
    constructor() {
      this.baseProperty = 'baseProperty';
    }
  }

  class ExtendedBase extends RegistryAccess.Mixin(Base) {}

  const instance = new ExtendedBase();
  t.is(instance.foo, 'bar');
  t.is(instance.baseProperty, 'baseProperty');
  t.pass(instance instanceof ExtendedBase);
});
