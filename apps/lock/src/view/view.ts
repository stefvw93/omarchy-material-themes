// Letters are what has a case; QML's JS engine rejects \p{L} regexes.
const isLetter = (ch: string) => ch.toLowerCase() !== ch.toUpperCase();
const isDigit = (ch: string) => ch >= "0" && ch <= "9";

/** The monogram avatar's letter: the name's first letter or digit, upper-cased; "" when none. */
export const initialOf = (name: string): string => {
  for (const ch of name) if (isLetter(ch) || isDigit(ch)) return ch.toLocaleUpperCase();
  return "";
};

/** Whether the arrow button can submit the password. */
export const canSubmit = (state: {
  readonly inputEnabled: boolean;
  readonly passwordLength: number;
  readonly authenticating: boolean;
}): boolean => state.inputEnabled && state.passwordLength > 0 && !state.authenticating;
