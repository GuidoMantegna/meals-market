export const utils = {
  stringToInt: (string: string) => {
    const strToArr = string.split("");

    return (strToArr[1].charCodeAt(0) + strToArr.length) / 100;
  },
};
