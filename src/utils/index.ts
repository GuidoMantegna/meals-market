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
  },
  turnPage: (direction: string, page: {start: number, end: number}, totalResults: number) => {
    const { start, end } = page;
    // const { totalResults } = searchedItem;
    const firstPage = start - 10 === 0;

    if (direction === "next") {
      return{
        start: start + 10,
        end: end + 10 > totalResults ? totalResults : end + 10,
      };
    } else
      return{
        start: start - 10,
        end: !firstPage ? end - 10 : end - (end % 10),
      };
  },
};

// const setItem = (newIng: Ingredient, action: string) => {
//   const exists = items.some(
//     (ing) => ing.idIngredient === newIng.idIngredient
//   );
//   if (action === "add") {
//     setTotals({
//       qty: totals.qty + 1,
//       price: totals.price + utils.stringToInt(newIng.strIngredient),
//     });
//     if (exists) {
//       setItems(
//         items.map((item) => {
//           if (item.idIngredient === newIng.idIngredient) {
//             return { ...item, qty: item.qty + 1 };
//           } else {
//             return item;
//           }
//         })
//       );
//     } else {
//       setItems(items.concat({ ...newIng, qty: 1 }));
//     }
//   } else {
//     setItems(
//       items.filter((item) => item.idIngredient !== newIng.idIngredient)
//     );
//     setTotals({
//       qty: totals.qty - newIng.qty,
//       price:
//         totals.price - newIng.qty * utils.stringToInt(newIng.strIngredient),
//     });
//   }
// };