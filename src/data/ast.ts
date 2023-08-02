import { type BinaryOperator, type UnaryOperator } from './constants'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
abstract class Node {}

class StringNode extends Node {
  public constructor(public value: string) {
    super()
  }
}

class TwoPointsNode extends Node {
  public constructor(
    public left: StringNode,
    public right: Node,
  ) {
    super()
  }
}

class BinaryOperatorNode extends Node {
  public constructor(
    public left: Node,
    public operator: BinaryOperator,
    public right: Node,
  ) {
    super()
  }
}

class UnaryOperatorNode extends Node {
  public constructor(
    public operator: UnaryOperator,
    public right: Node,
  ) {
    super()
  }
}

export default Node
export { StringNode, TwoPointsNode, BinaryOperatorNode, UnaryOperatorNode }
