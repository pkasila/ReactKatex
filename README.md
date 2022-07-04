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

## API

### ReactKatex

Just follow KaTeX's options [here](https://katex.org/docs/options.html). All (or almost) are available.

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
