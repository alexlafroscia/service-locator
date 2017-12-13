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

test('it throws an error when looking up an unregistered key', t => {
  t.throws(() => {
    registry.lookup('foo');
  });
});

test('it can reset the registry', t => {
  const value = faker.lorem.word();

  registry.register('foo', value);
  registry.reset();

  t.throws(() => {
    registry.lookup('foo');
  });
});
