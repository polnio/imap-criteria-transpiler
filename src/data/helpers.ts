function shiftOrThrow<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Unexpected end of array')
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return array.shift()!
}

export { shiftOrThrow }
