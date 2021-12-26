export const currencyFormat = (transaction_amount: number) => {
  return `$ ${transaction_amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};
