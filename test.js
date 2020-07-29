import test from 'ava'

import { compareStrings, findMatch } from './index.js'

test('empty strings', (t) => {
  t.is(compareStrings('', ''), 1)
})

test('single character', (t) => {
  t.is(compareStrings('a', 'a'), 1)
  t.is(compareStrings('a', 'b'), 0)
  t.is(compareStrings('b', 'a'), 0)
  t.is(compareStrings('b', 'b'), 1)
})

test('two characters', (t) => {
  t.is(compareStrings('ab', 'ab'), 1)
  t.is(compareStrings('ab', 'ba'), 0)
  t.is(compareStrings('ba', 'ab'), 0)
  t.is(compareStrings('ba', 'ba'), 1)
  t.is(compareStrings('ab', 'a'), 0)
  t.is(compareStrings('ab', 'b'), 0)
  t.is(compareStrings('ba', 'a'), 0)
  t.is(compareStrings('ba', 'b'), 0)
})

test('night vs. nacht', (t) => {
  t.is(compareStrings('night', 'nacht'), 0.25)
})

test('identical strings', (t) => {
  t.is(compareStrings('two identical strings', 'two identical strings'), 1)
  t.is(compareStrings('spider-man', 'spider-man'), 1)
  t.is(compareStrings('marvel', 'marvel'), 1)
  t.is(compareStrings('spotify', 'spotify'), 1)
})

test('same strings, input ends with space', (t) => {
  t.is(compareStrings('foo', 'foo '), 0.8)
  t.is(compareStrings('fly', 'fly '), 0.8)
  t.is(compareStrings('hello', 'hello '), 0.8888888888888888)
  t.is(compareStrings('spider-man', 'spider-man '), 0.9473684210526315)
})

test('similar strings', (t) => {
  t.is(compareStrings('foo', 'zoo'), 0.5)
  t.is(compareStrings('coal', 'coax'), 0.6666666666666666)
  t.is(compareStrings('paris', 'parts'), 0.5)
  t.is(compareStrings('grave', 'grace'), 0.5)
  t.is(compareStrings('accent', 'accept'), 0.6)
  t.is(compareStrings('fabled', 'failed'), 0.6)
  t.is(compareStrings('bazaar', 'bizarre'), 0.36363636363636365)
  t.is(compareStrings('paysage', 'passage'), 0.6666666666666666)
  t.is(compareStrings('ministries', 'miniseries'), 0.7777777777777778)
  t.is(compareStrings('compliment', 'complement'), 0.7777777777777778)
  t.is(compareStrings('all together', 'altogether'), 0.8)
  t.is(
    compareStrings('conservationalists', 'conversationalists'),
    0.7647058823529411
  )
})

test('best match in a list', (t) => {
  const list = ['quality', 'done', 'zone', 'fuelled', 'heal', 'thing']

  t.snapshot(findMatch(list, 'duality'))
  t.snapshot(findMatch(list, 'zone'))
  t.snapshot(findMatch(list, 'healed'))
  t.snapshot(findMatch(list, 'bone'))
  t.snapshot(findMatch(list, 'uncalled'))
})

test('curried compareStrings', (t) => {
  const compareStringsWith = compareStrings('coax')

  t.is(compareStringsWith('fox'), 0)
  t.is(compareStringsWith('coal'), 0.6666666666666666)
  t.is(compareStringsWith('hoax'), 0.6666666666666666)
  t.is(compareStringsWith('coax'), 1)
})

test('curried findMatch', (t) => {
  const findMatchWith = findMatch([
    'quality',
    'done',
    'zone',
    'fuelled',
    'heal',
    'thing',
  ])

  t.snapshot(findMatchWith('throne'))
  t.snapshot(findMatchWith('ideal'))
  t.snapshot(findMatchWith('furnishing'))
  t.snapshot(findMatchWith('calzone'))
})
