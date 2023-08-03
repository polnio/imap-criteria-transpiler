import type Token from './tokens'
import {
  TwoPointsToken,
  OpenParenthesisToken,
  CloseParenthesisToken,
} from './tokens'

const QUOTES = ['"', "'"] as const

const KEYWORDS = ['and', 'or', 'not'] as const
type Keyword = (typeof KEYWORDS)[number]

const BINARY_OPERATORS = ['and', 'or'] as const
type BinaryOperator = (typeof BINARY_OPERATORS)[number]

const UNARY_OPERATORS = ['not'] as const
type UnaryOperator = (typeof UNARY_OPERATORS)[number]

const SYMBOL_TOKEN_MAP = {
  ':': () => new TwoPointsToken(),
  '(': () => new OpenParenthesisToken(),
  ')': () => new CloseParenthesisToken(),
} as const satisfies Record<string, () => Token>

const HEADERS = ['FROM', 'TO', 'SUBJECT'] as const
const FLAGS = [
  'ALL',
  'ANSWERED',
  'DELETED',
  'DRAFT',
  'FLAGGED',
  'NEW',
  'SEEN',
  'RECENT',
  'OLD',
  'UNANSWERED',
  'UNDRAFT',
  'UNFLAGGED',
  'UNSEEN',
] as const

export {
  QUOTES,
  KEYWORDS,
  SYMBOL_TOKEN_MAP,
  BINARY_OPERATORS,
  UNARY_OPERATORS,
  HEADERS,
  FLAGS,
}
export type { Keyword, BinaryOperator, UnaryOperator }
