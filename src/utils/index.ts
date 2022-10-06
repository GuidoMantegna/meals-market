export const utils = {
  stringToInt: (string: string) => {
    const strToArr = string.split("");

    return (strToArr[1].charCodeAt(0) + strToArr.length) / 100;
  },
  customScrollBar: {
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ccc",
      borderRadius: "24px",
    },
  }
};
