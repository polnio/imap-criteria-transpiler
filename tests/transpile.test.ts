import { expect, it } from 'vitest'
import transpile from '../src/runtime/transpile'

it('should transpile a single string', () => {
  expect(transpile('test')).toStrictEqual([
    'OR',
    ['HEADER', 'FROM', 'test'],
    ['OR', ['HEADER', 'TO', 'test'], ['HEADER', 'SUBJECT', 'test']],
  ])
})

it('should transpile multiple strings separated by two points', () => {
  expect(transpile('from:test')).toStrictEqual(['HEADER', 'FROM', 'test'])
})

it('should transpile logical doors', () => {
  expect(transpile('from:a and to:b')).toStrictEqual([
    ['HEADER', 'FROM', 'a'],
    ['HEADER', 'TO', 'b'],
  ])
  expect(transpile('from:a or to:b')).toStrictEqual([
    'OR',
    ['HEADER', 'FROM', 'a'],
    ['HEADER', 'TO', 'b'],
  ])
})

it('should transpile parenthesis', () => {
  expect(transpile('from:(test or thing)')).toStrictEqual([
    'OR',
    ['HEADER', 'FROM', 'test'],
    ['HEADER', 'FROM', 'thing'],
  ])
})
