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
type Flag = (typeof FLAGS)[number]

const FLAGS_INVERSION = {
  ALL: 'ALL',
  ANSWERED: 'UNANSWERED',
  DELETED: '!DELETED',
  DRAFT: 'UNDRAFT',
  FLAGGED: 'UNFLAGGED',
  NEW: '!NEW',
  SEEN: 'UNSEEN',
  RECENT: 'OLD',
  OLD: 'RECENT',
  UNANSWERED: 'ANSWERED',
  UNDRAFT: 'UNDELETED',
  UNFLAGGED: 'FLAGGED',
  UNSEEN: 'SEEN',
  // eslint-disable-next-line @typescript-eslint/ban-types
} as const satisfies Record<Flag, Flag | (string & {})>

export {
  QUOTES,
  KEYWORDS,
  SYMBOL_TOKEN_MAP,
  BINARY_OPERATORS,
  UNARY_OPERATORS,
  HEADERS,
  FLAGS,
  FLAGS_INVERSION,
}
export type { Keyword, BinaryOperator, UnaryOperator, Flag }
