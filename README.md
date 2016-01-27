# Postcss-position-alt

<img align="right" width="135" height="95"
  title="Philosopher’s stone, logo of PostCSS"
  src="http://postcss.github.io/postcss/logo-leftp.png">

[![NPM version][npm-image]][npm-url] [![npm license](http://img.shields.io/npm/l/postcss-position-alt.svg)](https://www.npmjs.org/package/postcss-position-alt) [![Build Status][ci-img]][ci] [![Dependency Status][daviddm-image]][daviddm-url]

[![npm](https://nodei.co/npm/postcss-position-alt.svg?)](https://nodei.co/npm/postcss-position-alt/)

[PostCSS] plugin that adds shorthand to position declarations.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sylvainbaronnet/postcss-position-alt.svg
[ci]:      https://travis-ci.org/sylvainbaronnet/postcss-position-alt
[npm-url]: https://www.npmjs.com/package/postcss-position-alt
[npm-image]: https://badge.fury.io/js/postcss-position.svg
[daviddm-image]: https://david-dm.org/sylvainbaronnet/postcss-position-alt.svg
[daviddm-url]: https://david-dm.org/sylvainbaronnet/postcss-position-alt



```css

/* Input example */
.foo {
  absolute: top left;
}
.bar {
  absolute: bottom 10px right z-index 1;
}
.baz {
  fixed: top left 10px;
}
.fab {
  fixed: bottom auto left 10%;
}
.toto {
  fixed: top left bottom right z-index 9999;
}
```

```css
/* Output example */
.foo {
  position: absolute;
  top: 0;
  left: 0;
}
.bar {
  position: absolute;
  bottom: 10px;
  right: 0;
  z-index: 1;
}
.baz {
  position: fixed;
  top: 0;
  left: 10px;
}
.fab {
  position: fixed;
  bottom: auto;
  left: 10%;
}
.toto {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
```

## Usage

```js
postcss([ require('postcss-position-alt') ])
```

See [PostCSS] docs for examples for your environment.


## Alternative 

*See [postcss-position](https://github.com/seaneking/postcss-position) for an alternative shorthand syntax.*