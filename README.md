# @pkasila/react-katex

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> ReactKatex is a React component which allows to render LaTeX formulas and in plain text using KaTeX

## Install

```bash
npm install @pkasila/react-katex
```

### KaTeX stylesheets

**Remember** to include KaTeX's stylesheets:

```html
<link rel="stylesheet" href="https://unpkg.com/katex@0.16.0/dist/katex.min.css">
```

## Usage

```tsx
import ReactKatex from '@pkasila/react-katex';

function Home() {
  return <ReactKatex>Example: $$v = 2$$</ReactKatex>
}

const latex = 'Example: $$v = 2$$';

function UseChildrenProp() {
  return <ReactKatex children={latex}></ReactKatex>
}

function EnforceDisplayMode() {
  return <ReactKatex displayMode={true}>Example: $v = 2$</ReactKatex>
}

function DifferentModes() {
  return <ReactKatex displayMode={true}>Example $\textbf{inline}$: $$v = 2$$</ReactKatex>
}
```

### ReactKatex's MathML fallback mechanism

> While Safari and Firefox support MathML, Chrome will support MathML Core by default
> only in **mid-September 2022** with version 106, more details on the
> [Chrome Platform Status](https://chromestatus.com/feature/5240822173794304).
> Right now MathML core is available in Chrome with a flag
> [chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)

By default, ReactKatex uses `htmlAndMathml` output. It's done that way because still, some browsers don't
support MathML at the moment. For these browsers, ReactKatex implements a fallback mechanism: if the browser
doesn't support MathML but `output` is set to `mathml`, then ReactKatex will automatically switch to `html`
output when passing options to KaTeX.

You can disable this behavior by passing the `enforceOutput` option set to `true`.

## API

### ReactKatex

#### custom `output` behavior

By default, it's set to `htmlAndMathml`. If you choose `mathml` then ReactKatex will run checks to validate
that the client's browser supports MathML. If not, then it will switch to default `htmlAndMathml` renderer.

When using SSR, ReactKatex will consider that MathML is supported, so what you pass into `output` will stay
as it is. But on the client-side while rendering the second time it **may** run check and switch from `mathml`
to `htmlAndMathml`.

If you use Remix.JS and ReactKatex has `mathml` output and have user without MathML support, then it will behave
like that:

1. Server will render MathML
2. Client will display MathML
3. User interacts with the app (switches pages, or somehow causes component to rerender)
4. Client rerenders ReactKatex with `htmlAndMathml` output

#### `enforceOutput`

`enforceOutput` option disables ReactKatex's MathML check. So, if you pass this property, then it won't switch
to `htmlAndMathml` if you specified output as `mathml` in any possible case.

#### `breakLine`

By default, `breakLine` is set to `false`. But if you set it to `true`, then it will replace `\n\n` in your string
with `<br />` HTML tag. It may be useful in some cases.

### KaTeX's options and format

ReactKatex renders formulas inside `$` (inline-mode)  or `$$` (block-mode).

ReactKatex's options (props) are basically KaTeX's options [here](https://katex.org/docs/options.html).
All (or almost) are available.

[build-img]:https://github.com/pkasila/ReactKatex/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/pkasila/ReactKatex/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@pkasila/react-katex
[downloads-url]:https://www.npmtrends.com/@pkasila/react-katex
[npm-img]:https://img.shields.io/npm/v/@pkasila/react-katex
[npm-url]:https://www.npmjs.com/package/@pkasila/react-katex
[issues-img]:https://img.shields.io/github/issues/pkasila/ReactKatex
[issues-url]:https://github.com/pkasila/ReactKatex/issues
[codecov-img]:https://codecov.io/gh/pkasila/ReactKatex/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/pkasila/ReactKatex
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
