import test from 'ava';
import registry, { withAccessTo } from '../lib';

test.beforeEach(() => {
  registry.register('foo', 'bar');
});

test('can define a class that looks something up in the registry', t => {
  class Foo extends withAccessTo('foo') {}

  const instance = new Foo();
  t.is(instance.foo, 'bar');
});

test('can extend a base class and provide registry access', t => {
  class Base {
    constructor() {
      this.baseProperty = 'baseProperty';
    }
  }

  class ExtendedBase extends withAccessTo(Base, 'foo') {}

  const instance = new ExtendedBase();
  t.is(instance.foo, 'bar');
  t.is(instance.baseProperty, 'baseProperty');
});
