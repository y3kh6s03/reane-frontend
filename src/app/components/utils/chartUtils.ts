/* eslint-disable import/prefer-default-export */
export const splitString = (str: string, char: string) => {
  const index = str.indexOf(char);
  const result = index !== -1
    ? str.substring(0, index)
    : str
  return result;;
}

export const calcCreatedAt = (createdAt: string) => {
  const dispCreatedAt = splitString(createdAt, 'T');
  return dispCreatedAt;
}

export const calcElapsedDays = (createdAt: string) => {
  const dateCreatedAt = new Date(createdAt);
  const currentDate = new Date();
  const elapsedDays = Math.floor((currentDate.getTime() - dateCreatedAt.getTime()) / (1000 * 60 * 60 * 24));
  return elapsedDays;
}