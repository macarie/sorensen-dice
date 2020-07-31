const totalBigrams = Symbol('totalBigrams')

const createBigrams = (word) =>
  Object.defineProperty(
    Array.from({ length: word.length - 1 }).reduce((bigrams, _, index) => {
      const bigram = word.slice(index, index + 2)

      return bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1)
    }, new Map()),
    totalBigrams,
    { value: word.length - 1 }
  )

const calculateScore = (reference, referenceString, input, inputString) => {
  if (Math.min(referenceString.length, inputString.length) <= 2) {
    return Number(Object.is(referenceString, inputString))
  }

  const expendableReference = new Map(reference)
  let overlaps = 0

  for (const [bigram, timesFound] of input) {
    for (let times = 0; times < timesFound; times += 1) {
      const referenceBigramCount = expendableReference.get(bigram) || 0

      if (referenceBigramCount > 0) {
        overlaps += 1

        expendableReference.set(bigram, referenceBigramCount - 1)
      }
    }
  }

  return (2 * overlaps) / (reference[totalBigrams] + input[totalBigrams])
}

const findMatchCurried = (references, referenceStrings) => (inputString) => {
  const input = createBigrams(inputString)
  const matches = []
  const bestMatch = {
    score: -Infinity,
  }
  let index = 0

  for (const reference of references) {
    const score = calculateScore(
      reference,
      referenceStrings[index],
      input,
      inputString
    )

    const match = {
      score,
      reference: referenceStrings[index],
    }

    if (score > bestMatch.score) {
      Object.assign(bestMatch, match, { index })
    }

    matches.push(match)
    index += 1
  }

  return { bestMatch, matches }
}

export const findMatch = (references, input) => {
  const referencesBigrams = references.map(createBigrams)

  if (input !== undefined) {
    return findMatchCurried(referencesBigrams, references)(input)
  }

  return findMatchCurried(referencesBigrams, references)
}

const compareStringsCurried = (reference, referenceString) => (inputString) =>
  calculateScore(
    reference,
    referenceString,
    createBigrams(inputString),
    inputString
  )

export const compareStrings = (reference, input) => {
  const referenceBigrams = createBigrams(reference)

  if (input !== undefined) {
    return compareStringsCurried(referenceBigrams, reference)(input)
  }

  return compareStringsCurried(referenceBigrams, reference)
}
