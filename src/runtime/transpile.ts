import { HEADERS } from '../data/constants'
import parse from './parse'
import tokenize from './tokenize'
import type Node from '../data/ast'
import { BinaryOperatorNode, StringNode, TwoPointsNode } from '../data/ast'

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

  return [transpileNode(node)]
}

function transpileNode(node: Node, keys: string[] = HEADERS.slice()): Criteria {
  if (node instanceof StringNode) {
    const firstKey = keys[0]
    if (firstKey === undefined) {
      throw new Error('First key is undefined')
    }
    if (keys.length === 1) {
      return ['HEADER', firstKey, node.value]
    }
    return [
      'OR',
      ['HEADER', firstKey, node.value],
      transpileNode(node, keys.slice(1)),
    ]
  }

  if (node instanceof TwoPointsNode) {
    const leftValue = node.left.value.toUpperCase()
    if (!HEADERS.includes(leftValue)) {
      throw new Error(`${leftValue} is not a header`)
    }
    return transpileNode(node.right, [leftValue])
  }

  if (node instanceof BinaryOperatorNode) {
    switch (node.operator) {
      case 'and':
        return [transpileNode(node.left, keys), transpileNode(node.right, keys)]
      case 'or':
        return [
          'OR',
          transpileNode(node.left, keys),
          transpileNode(node.right, keys),
        ]
    }
  }

  return []
}

export default transpile
