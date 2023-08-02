import { expect, it } from 'vitest'
import tokenize from '../src/runtime/tokenize'
import {
  CloseParenthesisToken,
  KeywordToken,
  OpenParenthesisToken,
  StringToken,
  TwoPointsToken,
} from '../src/data/tokens'

it('should tokenize a single string', () => {
  expect(tokenize('test')).toEqual([new StringToken('test')])
})

it('should tokenize multiple strings', () => {
  expect(tokenize('test1 test2')).toEqual([
    new StringToken('test1'),
    new StringToken('test2'),
  ])
})

it('should tokenize multiple strings separated by two points', () => {
  expect(tokenize('test1:test2')).toEqual([
    new StringToken('test1'),
    new TwoPointsToken(),
    new StringToken('test2'),
  ])
})

it('should tokenize a single string with quotes', () => {
  expect(tokenize('"test with spaces"')).toEqual([
    new StringToken('test with spaces'),
  ])
  expect(tokenize("'test with spaces'")).toEqual([
    new StringToken('test with spaces'),
  ])
})

it('should tokenize single string with spaces escaping', () => {
  expect(tokenize('test\\ with\\ spaces')).toEqual([
    new StringToken('test with spaces'),
  ])
})

it('should tokenize logical doors', () => {
  expect(tokenize('a and b')).toEqual([
    new StringToken('a'),
    new KeywordToken('and'),
    new StringToken('b'),
  ])
  expect(tokenize('a or b')).toEqual([
    new StringToken('a'),
    new KeywordToken('or'),
    new StringToken('b'),
  ])
})

it('should tokenize parenthesis', () => {
  expect(tokenize('(test)')).toEqual([
    new OpenParenthesisToken(),
    new StringToken('test'),
    new CloseParenthesisToken(),
  ])
})
