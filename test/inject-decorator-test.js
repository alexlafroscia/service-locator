import test from 'ava';
import faker from 'faker';
import { registry, inject, injectLookup } from '../dist';

test.afterEach(() => {
  registry.reset();
});

/** @test {inject} */
test('it can inject registered properties through a decorator', t => {
  registry.register('foo', faker.lorem.word());
  registry.register('bar', faker.lorem.word());

  class SomeClass {
    @inject foo;
  }

  const instance = new SomeClass();

  t.is(instance.foo, registry.lookup('foo'));
  t.is(instance.bar, undefined);
});

/** @test {inject.lookup} */
test('it can inject registered properties with another name', t => {
  registry.register('foo', faker.lorem.word());

  class SomeClass {
    @injectLookup('foo') bar;
  }

  const instance = new SomeClass();

  t.is(instance.bar, registry.lookup('foo'));
  t.is(instance.foo, undefined);
});
