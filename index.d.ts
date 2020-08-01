/**
 * A function that accepts `input` as an argument and compares it with the _pre-loaded_ `reference` argument of the creator function.
 * Returns the similarity coefficient between the two strings.
 *
 * @param input The string to compare with the `reference` argument of the creator function.
 */
export declare type CurriedInput = (input: string) => number

export declare const compareStrings: {
  /**
   * Compare `input` with `reference`.
   * Returns the similarity coefficient between `reference` and `input`.
   *
   * This is a [curried](https://en.wikipedia.org/wiki/Currying) function. If `input` is not provided a function that accepts `input` as an argument is returned.
   *
   * @param reference The string used as reference.
   * @param input The string to compare with `reference`.
   *
   * @returns The Sørensen–Dice coefficient between `reference` and `input`.
   */
  (reference: string, input: string): number
  /**
   * Create a function that accepts `input` as an argument and compares it with `reference`.
   *
   * @param reference The string used as reference.
   *
   * @returns A function that accepts `input` as an argument, compares it with `reference` and returns the Sørensen–Dice coefficient.
   */
  (reference: string): CurriedInput
}

export interface match {
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

/**
 * A function that accepts `input` as an argument and finds the best match for its argument given the _pre-loaded_ `references` argument of the creator function.
 *
 * @param references A list of strings used as references.
 * @param input The string to compare with the elements inside `references`.
 *
 * @returns An object with `bestMatch` and `matches` as properties, `matches` is an array of objects containing `reference` and the `score` between it and `input`, `bestMatch` is the element with the highest `score` from `matches` and its `index`.
 */
export type CurriedMatch = (input: string) => match

export declare const findMatch: {
  /**
   * Find the best match for `input` given a list of strings as `references`, it also returns the full list of calculated scores.
   *
   * This is a [curried](https://en.wikipedia.org/wiki/Currying) function. If `input` is not provided a function that accepts `input` as an argument is returned.
   *
   * @param references A list of strings used as references.
   * @param input The string to compare with the elements inside `references`.
   *
   * @returns An object with `bestMatch` and `matches` as properties. `matches` is an array of objects containing `reference` and the `score` between it and `input`. `bestMatch` is the element with the highest `score` from `matches` and its `index`.
   */
  (references: string[], input: string): number
  /**
   * Create a function that accepts `input` as an argument and compares it with `references`.
   *
   * @param references A list of strings used as references.
   *
   * @returns A function that accepts `input` as an argument, compares it with every element of `references` and returns an object with `bestMatch` and `matches` as properties. `matches` is an array of objects containing `reference` and the `score` between it and `input`. `bestMatch` is the element with the highest `score` from `matches` and its `index`.
   */
  (references: string[]): CurriedMatch
}
