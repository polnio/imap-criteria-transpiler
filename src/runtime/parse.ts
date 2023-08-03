import { shiftOrThrow } from '../data/helpers'
import type Node from '../data/ast'
import {
  BinaryOperatorNode,
  StringNode,
  TwoPointsNode,
  UnaryOperatorNode,
} from '../data/ast'
import type Token from '../data/tokens'
import {
  CloseParenthesisToken,
  KeywordToken,
  OpenParenthesisToken,
  StringToken,
  TwoPointsToken,
} from '../data/tokens'
import { UNARY_OPERATORS, type UnaryOperator } from '../data/constants'

function parse(tokens: Token[]): Node {
  const nodes: Node[] = []
  while (tokens.length > 0) {
    nodes.push(parseSingle(tokens))
  }
  let left = shiftOrThrow(nodes)
  while (nodes.length > 0) {
    left = new BinaryOperatorNode(left, 'and', shiftOrThrow(nodes))
  }
  return left
}

function parseSingle(tokens: Token[]): Node {
  return parsePotentialOrOperator(tokens)
}

function parsePotentialOrOperator(tokens: Token[]): Node {
  let left = parsePotentialAndOperator(tokens)
  while (tokens[0] instanceof KeywordToken && tokens[0].value === 'or') {
    tokens.shift()
    left = new BinaryOperatorNode(left, 'or', parsePotentialAndOperator(tokens))
  }
  return left
}

function parsePotentialAndOperator(tokens: Token[]): Node {
  let left = parsePotentialTwoPoints(tokens)
  while (tokens[0] instanceof KeywordToken && tokens[0].value === 'and') {
    tokens.shift()
    left = new BinaryOperatorNode(left, 'and', parsePotentialTwoPoints(tokens))
  }
  return left
}

function parsePotentialTwoPoints(tokens: Token[]): Node {
  let left = parsePrimary(tokens)
  if (tokens[0] instanceof TwoPointsToken) {
    if (!(left instanceof StringNode)) {
      throw new Error('Left node is not a string')
    }
    tokens.shift()
    left = new TwoPointsNode(left, parsePrimary(tokens))
  }
  return left
}

function parsePrimary(tokens: Token[]): Node {
  if (tokens[0] instanceof OpenParenthesisToken) {
    tokens.shift()
    const innerTokens: Token[] = []
    while (!(tokens[0] instanceof CloseParenthesisToken)) {
      innerTokens.push(shiftOrThrow(tokens))
    }
    tokens.shift()
    return parse(innerTokens)
  }
  if (tokens[0] instanceof KeywordToken) {
    const keywordToken = shiftOrThrow(tokens) as KeywordToken
    if (UNARY_OPERATORS.includes(keywordToken.value)) {
      return new UnaryOperatorNode(
        keywordToken.value as UnaryOperator,
        parse(tokens),
      )
    }
  }
  if (tokens[0] instanceof StringToken) {
    const stringToken = shiftOrThrow(tokens) as StringToken
    return new StringNode(stringToken.value)
  }
  throw new Error(
    `Unexpected token: ${tokens[0]?.constructor.name ?? 'undefined'}`,
  )
}

export default parse
