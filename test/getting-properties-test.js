import test from 'ava';
import { RegistryAccess, registry } from '../dist';

test.beforeEach(t => {
  t.context.instance = new RegistryAccess();

  registry.register('config', {
    loggedIn: true
  });
});

test.afterEach(() => {
  registry.reset();
});

/** @test {RegistryAccess} */
test('it can access nested properties in a registered value', t => {
  const { instance } = t.context;

  t.is(instance.config.loggedIn, true);
});

/** @test {RegistryAccess} */
test('it can access properties by building a string', t => {
  const { instance } = t.context;

  t.deepEqual(instance['config'], {
    loggedIn: true
  });
});

/** @test {RegistryAccess} */
test('it ignores non-string property access', t => {
  const { instance } = t.context;

  t.is(instance[0], undefined);
});
