# Postcss position alt [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds shorthand to position declarations.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sylvainbaronnet/postcss-position-alt.svg
[ci]:      https://travis-ci.org/sylvainbaronnet/postcss-position-alt


See [postcss-position](https://github.com/seaneking/postcss-position) for an alternative shorthand syntax.

```css

/* Input example */
.foo {
    absolute: top left;
}
.bar {
    absolute: bottom 10px right;
}
.baz {
    fixed: top left 10px;
}
.fab {
    fixed: bottom auto left 10%;
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
```

## Usage

```js
postcss([ require('postcss-position-alt') ])
```

See [PostCSS] docs for examples for your environment.
