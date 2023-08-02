import {
  KEYWORDS,
  type Keyword,
  QUOTES,
  SYMBOL_TOKEN_MAP,
} from '../data/constants'
import { shiftOrThrow } from '../data/helpers'
import type Token from '../data/tokens'
import { KeywordToken, StringToken } from '../data/tokens'

function tokenize(query: string): Token[] {
  const chars = query.split('')
  const tokens: Token[] = []
  while (chars.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstChar = chars[0]!
    if (firstChar === ' ') {
      chars.shift()
    } else if (firstChar in SYMBOL_TOKEN_MAP) {
      tokens.push(
        SYMBOL_TOKEN_MAP[firstChar as keyof typeof SYMBOL_TOKEN_MAP](),
      )
      chars.shift()
    } else if (QUOTES.includes(firstChar)) {
      const stringIndicator = shiftOrThrow(chars)
      let string = ''
      while (chars[0] !== stringIndicator) {
        if (chars.length === 0) {
          throw new Error('Unexpected end of string')
        }
        string += shiftOrThrow(chars)
      }
      tokens.push(new StringToken(string))
      chars.shift()
    } else if (/[a-zA-Z0-9]/.test(firstChar)) {
      let string = ''
      while (/[a-zA-Z0-9\\]/.test(chars[0] ?? '')) {
        if (chars[0] === '\\') {
          chars.shift()
        }
        string += shiftOrThrow(chars)
      }
      if (KEYWORDS.includes(string)) {
        tokens.push(new KeywordToken(string as Keyword))
      } else {
        tokens.push(new StringToken(string))
      }
    } else {
      throw new Error(`Unexpected character: ${firstChar}`)
    }
  }
  return tokens
}

export default tokenize
