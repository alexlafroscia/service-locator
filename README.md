# @alexlafroscia/service-locator

A JS implementation of the [Service Locator pattern][service locator pattern] for ES6 classes.

## Why?

I've struggled with making a complex set of components using [Skate.js][skate] where all components needed access to some state. I didn't want to have pass the properties to every component explicitly, and wished I had an easy way of using service injection the way that I'm used to with [Ember.js][ember]. So, I started messing around with this.

## Should I use this?

Probably not. In reality, it's not that different than just accessing everything off the `window`, and we all know that's a bad idea (although this works in a Node environment where `window` isn't available, and is built for use with JavaScript modules where there isn't a shared global context). It's more just an idea that I'm messing around with.

## Compatibility Notes

This package is meant to be consumed in an ES6 environment. It relies on [Proxy][proxy] and is built with ES6 classes in mind. Make sure your environment can handle this.

## Prior Art

- [Ember.js service injection][ember service injection]

[service locator pattern]: https://martinfowler.com/articles/injection.html
[skate]: https://github.com/skatejs/skatejs
[ember]: https://www.emberjs.com/api/ember/2.17/classes/@ember%2Fservice/methods/inject?anchor=inject
[ember service injection]: https://www.emberjs.com/api/ember/2.17/classes/@ember%2Fservice/methods/inject?anchor=inject
[proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
