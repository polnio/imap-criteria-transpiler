import { expect, it } from 'vitest'
import parse from '../src/runtime/parse'
import tokenize from '../src/runtime/tokenize'
import {
  BinaryOperatorNode,
  StringNode,
  TwoPointsNode,
  UnaryOperatorNode,
} from '../src/data/ast'

it('should parse a single string', () => {
  expect(parse(tokenize('test'))).toEqual(new StringNode('test'))
})

it('should parse multiple strings', () => {
  expect(parse(tokenize('test1 test2'))).toEqual(
    new BinaryOperatorNode(
      new StringNode('test1'),
      'and',
      new StringNode('test2'),
    ),
  )
})

it('should parse multiple strings separated by two points', () => {
  expect(parse(tokenize('test1:test2'))).toEqual(
    new TwoPointsNode(new StringNode('test1'), new StringNode('test2')),
  )
})

it('should parse binary logical doors', () => {
  expect(parse(tokenize('a and b'))).toEqual(
    new BinaryOperatorNode(new StringNode('a'), 'and', new StringNode('b')),
  )
  expect(parse(tokenize('a or b'))).toEqual(
    new BinaryOperatorNode(new StringNode('a'), 'or', new StringNode('b')),
  )
})

it('should parse unary logical doors', () => {
  expect(parse(tokenize('not a'))).toEqual(
    new UnaryOperatorNode('not', new StringNode('a')),
  )
})

it('should parse parenthesis', () => {
  expect(parse(tokenize('test:(test or thing)'))).toEqual(
    new TwoPointsNode(
      new StringNode('test'),
      new BinaryOperatorNode(
        new StringNode('test'),
        'or',
        new StringNode('thing'),
      ),
    ),
  )
})

it('should take care of priority', () => {
  expect(parse(tokenize('a or b and c'))).toEqual(
    new BinaryOperatorNode(
      new StringNode('a'),
      'or',
      new BinaryOperatorNode(new StringNode('b'), 'and', new StringNode('c')),
    ),
  )
  expect(parse(tokenize('a and b or c'))).toEqual(
    new BinaryOperatorNode(
      new BinaryOperatorNode(new StringNode('a'), 'and', new StringNode('b')),
      'or',
      new StringNode('c'),
    ),
  )
  expect(parse(tokenize('not from:a'))).toEqual(
    new UnaryOperatorNode(
      'not',
      new TwoPointsNode(new StringNode('from'), new StringNode('a')),
    ),
  )
})
