# [ksdc](https://github.com/macarie/ksdc) [![Release Version](https://img.shields.io/npm/v/ksdc.svg?label=&color=0080FF)](https://www.npmjs.com/package/ksdc)

> Measure how similar two strings are using the [Sørensen–Dice Coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)

[![Test Results](https://github.com/macarie/ksdc/workflows/test/badge.svg?branch=next)](https://github.com/macarie/ksdc/actions?query=workflow%3Atest) [![Coverage Status](https://codecov.io/gh/macarie/ksdc/branch/next/graph/badge.svg)](https://codecov.io/gh/macarie/ksdc) [![GitHub](https://img.shields.io/github/license/macarie/ksdc?color=42cdad)](https://github.com/macarie/ksdc/blob/master/license)

## Install

```console
$ npm install ksdc
```

Or if you prefer using Yarn:

```console
$ yarn add ksdc
```

## Usage

```javascript
import { compareStrings, findMatch } from "ksdc"

compareStrings("night", "nacht")
// => 0.25

const compareNightWith = compareStrings("night")

compareNightWith("nacht")
compareNightWith("night")

findMatch(["heal", "thing"], "ideal")
// => {
// =>   bestMatch: { score: 0.5714285714285714, index: 0, reference: 'heal' },
// =>   matches: [
// =>     { score: 0.5714285714285714, reference: 'heal' },
// =>     { score: 0, reference: 'thing' }
// =>   ]
// => }

const findMatchFromList = findMatch(["heal", "thing"])

findMatchFromList("ideal")
findMatchFromList("zeal")
```

## API

### compareStrings(reference, input)

Compare `input` against `reference`, returns the Sørensen–Dice coefficient between the two strings.

This is a [curried](https://en.wikipedia.org/wiki/Currying) function. If `input` is not provided a function that accepts `input` as an argument is returned.

#### reference

Type: `string`

#### input

Type: `string`

### findMatch(references, input)

Compare `input` against a list of strings, `references`, returns an object that has the following properties:

```typescript
interface match {
  bestMatch: {
    score: number
    index: number
    reference: string
  }
  matches: Array<{
    score: number
    reference: string
  }>
}
```

This is a [curried](https://en.wikipedia.org/wiki/Currying) function. If `input` is not provided a function that accepts `input` as an argument is returned.

#### references

Type: `string[]`

#### input

Type: `string`

## Browser support

The latest version of Chrome, Firefox, Safari, and Edge.

## Node.js support

Node.js 12 or later.
