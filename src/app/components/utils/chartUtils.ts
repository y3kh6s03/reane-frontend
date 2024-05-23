/* eslint-disable import/prefer-default-export */
export const splitString = (str: string, char: string) => {
  const index = str.indexOf(char);
  const result = index !== -1
    ? str.substring(0, index)
    : str

  return result;;
}