import { type Keyword } from './constants'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
abstract class Token {}

class TwoPointsToken extends Token {}

class OpenParenthesisToken extends Token {}
class CloseParenthesisToken extends Token {}

class StringToken extends Token {
  public constructor(public readonly value: string) {
    super()
  }
}

class LogicalDoorToken extends Token {
  public constructor(public readonly value: Keyword) {
    super()
  }
}

export default Token
export {
  CloseParenthesisToken,
  LogicalDoorToken as KeywordToken,
  OpenParenthesisToken,
  StringToken,
  TwoPointsToken,
}
