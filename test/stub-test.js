import test from 'ava';
import faker from 'faker';
import { registry } from '../dist';

test.afterEach(() => {
  registry.reset();
});

/** @test {Registry.stub} */
test('it fails to stub a string', t => {
  registry.register('value', 'string');
  t.throws(() => {
    registry.stub('value', 'another string');
  });
});

/** @test {Registry.stub} */
test('it fails to stub a number', t => {
  registry.register('value', 42);
  t.throws(() => {
    registry.stub('value', 32);
  });
});

/** @test {Registry.stub} */
test("it can stub an object's values", t => {
  const originalProperty = faker.lorem.word();
  const stubbedProperty = faker.lorem.word();
  const replacementValue = faker.lorem.word();
  registry.register('value', { originalProperty, stubbedProperty });

  const stubbedObject = registry.stub('value', {
    stubbedProperty: replacementValue
  });

  t.not(stubbedProperty, replacementValue);
  t.is(registry.lookup('value').stubbedProperty, replacementValue);
  t.is(registry.lookup('value').originalProperty, originalProperty);
  t.is(stubbedObject.stubbedProperty, replacementValue);
  t.is(stubbedObject.originalProperty, originalProperty);
});

/** @test {Registry.stub} */
test("it can stub an object's methods", t => {
  registry.register('value', {
    property: 'foo',
    foo() {
      return 'foo';
    }
  });
  const stubbedObject = registry.stub('value', {
    foo() {
      return 'bar';
    }
  });

  t.is(stubbedObject.property, 'foo', 'The entire object is not replaced');
  t.is(stubbedObject.foo(), 'bar', 'The replacement method is called');
});
