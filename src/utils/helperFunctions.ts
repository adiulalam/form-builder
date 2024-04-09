export const roundIfNessesary = (input: number | string, maxRound = 1) => {
  const inputToString = input.toString();
  return parseFloat(inputToString).toFixed(maxRound);
};
