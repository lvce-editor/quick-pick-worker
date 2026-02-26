const RE_ALPHA_NUMERIC = /[a-z\d]/i

export const isAlphaNumeric = (character: string): boolean => {
  return RE_ALPHA_NUMERIC.test(character)
}
