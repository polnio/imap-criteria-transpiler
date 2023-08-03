import { FLAGS, FLAGS_INVERSION, type Flag, HEADERS } from '../data/constants'
import parse from './parse'
import tokenize from './tokenize'
import type Node from '../data/ast'
import {
  BinaryOperatorNode,
  StringNode,
  TwoPointsNode,
  UnaryOperatorNode,
} from '../data/ast'

type Criteria = Array<string | Criteria>

function transpile(source: string): Criteria {
  if (source.length === 0) {
    return ['All']
  }
  const tokens = tokenize(source)
  const node = parse(tokens)

  if (node instanceof BinaryOperatorNode && node.operator === 'and') {
    return [transpileNode(node.left), transpileNode(node.right)]
  }

  if (node instanceof UnaryOperatorNode && node.operator === 'not') {
    console.log(node.right)
    return [transpileNode(node.right, HEADERS.slice(), true)]
  }

  return [transpileNode(node)]
}

function transpileNode(
  node: Node,
  keys: string[] = HEADERS.slice(),
  inverted = false,
): Criteria[number] {
  if (node instanceof StringNode) {
    if (FLAGS.includes(node.value.toUpperCase())) {
      if (inverted) {
        return FLAGS_INVERSION[node.value.toUpperCase() as Flag]
      }
      return node.value.toUpperCase()
    }
    const firstKey = keys[0]
    if (firstKey === undefined) {
      throw new Error('First key is undefined')
    }
    const headerKey = inverted ? '!HEADER' : 'HEADER'
    if (keys.length === 1) {
      return [headerKey, firstKey, node.value]
    }
    return [
      'OR',
      [headerKey, firstKey, node.value],
      transpileNode(node, keys.slice(1), inverted),
    ]
  }

  if (node instanceof TwoPointsNode) {
    const leftValue = node.left.value
    if (!HEADERS.includes(leftValue.toUpperCase())) {
      throw new Error(`${leftValue} is not a header`)
    }
    return transpileNode(node.right, [leftValue.toUpperCase()], inverted)
  }

  if (node instanceof BinaryOperatorNode) {
    switch (node.operator) {
      case 'and':
        return [
          transpileNode(node.left, keys, inverted),
          transpileNode(node.right, keys, inverted),
        ]
      case 'or':
        return [
          'OR',
          transpileNode(node.left, keys, inverted),
          transpileNode(node.right, keys, inverted),
        ]
    }
  }

  if (node instanceof UnaryOperatorNode) {
    switch (node.operator) {
      case 'not':
        return transpileNode(node.right, keys, !inverted)
    }
  }

  return []
}

export default transpile
