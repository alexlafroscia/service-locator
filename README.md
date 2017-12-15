# @alexlafroscia/service-locator

[![Build Status](https://travis-ci.org/alexlafroscia/service-locator.svg?branch=master)](https://travis-ci.org/alexlafroscia/service-locator)

A JS implementation of the [Service Locator pattern][service locator pattern] for ES6 classes.

## Features

- Store commonly-needed values in a single place, allowing easy access to shared state
- Inject registry access into any ES6 class through a mixin, or extend the provided ES6 class
- Easily provide stubs for objects in the registry to simplify testing

## A quick example

Imagine we have a component that should check if the user is logged in and either prompt for login, or greet the user. We have two parts: fetching the user data, and the component itself.

Note: The cleanest way to use this library uses [decorators][decorators] as implemented by the [`babel-plugin-transform-decorators-legacy`][decorators-babel-transform].

```javascript
// user-service.js
import { registry } from '@alexlafroscia/service-locator';

class UserService {
  fetchUserInfo() {
    return fetch('...').then(res => res.json());
  }

  async isLoggedIn() {
    const { isLoggedIn } = await this.fetch('...');

    return isLoggedin;
  }
};

registry.register('userService', new UserService());
```

```javascript
// user-greeter-component.js
import { Component } from 'some-react-ish-component-library';
import { inject } from '@alexlafroscia/service-locator';

export default class UserGreeterComponent extends Component {
  @inject userService;

  async getInitialState() {
    const isLoggedIn = this.userService.isLoggedIn();
    this.setState({ isLoggedIn });
  }

  render({ isLoggedIn }) {
    return isLoggedIn ? 'Hello!' : 'Please log in!';
  }
}
```

What's the benefit here? For one, we've separated out the thing that fetches the data from the thing that displays it, which is always a good idea. Additionally, we made it easy to stub the data fetching in a test:

```javascript
test('shows the right thing when the user is logged in', () => {
  registry.stub('userService', {
    async fetchUserInfo() {
      return { isLoggedIn: true };
    }
  });

  const result = render(<UserGreeterComponent />);
  expect(result).to.contain('Hello!');
});

test('shows the right thing when the user is not logged in', () => {
  registry.stub('userService', {
    async fetch() {
      return { isLoggedIn: false };
    }
  });

  const result = render(<UserGreeterComponent />);
  expect(result).to.contain('Please log in!');
});
```

## Decorators? That isn't supported yet!

This is true. A proposal was made for them a few years ago and it still is yet to mature.

However, they are really cool and allow you do write super clean code like I have above. Additionally, languages like TypeScript have introduced them to great effect, and they have already seen widespread adoption in Angular.js and ES6-class-based Ember. It's more of a question of when they land in the language, not whether.

If it's not possible for you to use them, there is also an ES6 class and mixin bundled as part of this package, which you can extend from or mix into your own ES6 classes. Note that _every_ name in the registry gets mapped from the instance of one of those classes to the registry value, rather than just the ones that are explicitly used.  You may notice performance issues with this approach, since it relies on ES6 proxies which are incure a somewhat serious performance cost. Check out the tests or documentation for example usage.

## Why?

I've struggled with making a complex set of components using [Skate.js][skate] where all components needed access to some shared state. I didn't want to have to pass the properties to every component explicitly, and wished I had an easy way of using service injection the way that I'm used to with [Ember.js][ember]. So, I started messing around with this.

## Should I use this?

Maybe. In reality, it's not that different than just accessing everything off the `window`, and we all know that's a bad idea (although this works in a Node environment where `window` isn't available, and is built for use with JavaScript modules where there isn't a shared global context). At the end of the day, I'm not your Mom, and you should understand the implications of any libraries that you depend on.

## Compatibility Notes

This package is meant to be consumed in an ES6 environment. It relies on [Proxy][proxy] and is built with ES6 classes in mind. Make sure your environment can handle this.

## Prior Art

- [Ember.js service injection][ember service injection]
- [`ember-decorators`][ember-decorators]

[service locator pattern]: https://martinfowler.com/articles/injection.html
[skate]: https://github.com/skatejs/skatejs
[ember]: https://www.emberjs.com/api/ember/2.17/classes/@ember%2Fservice/methods/inject?anchor=inject
[ember service injection]: https://www.emberjs.com/api/ember/2.17/classes/@ember%2Fservice/methods/inject?anchor=inject
[proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[decorators]: https://github.com/tc39/proposal-decorators
[decorators-babel-transform]: https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy
[ember-decorators]: https://github.com/ember-decorators/ember-decorators
