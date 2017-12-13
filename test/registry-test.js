import test from 'ava';
import faker from 'faker';
import registry from '../lib';

test.afterEach(() => {
  registry.reset();
});

test('it can register a value at a key', t => {
  const value = faker.lorem.word();
  registry.register('foo', value);

  t.is(registry.lookup('foo'), value);
});

test('it can overwrite a value at a key', t => {
  const original = faker.lorem.word();
  const newValue = faker.lorem.word();

  registry.register('foo', original);
  registry.register('foo', newValue);

  t.is(registry.lookup('foo'), newValue);
});

test('it returns `undefined` when a key has not been registered', t => {
  t.is(registry.lookup('foo'), undefined);
});

test('it can reset the registry', t => {
  const value = faker.lorem.word();

  registry.register('foo', value);
  registry.reset();

  t.is(registry.lookup('foo'), undefined);
});
