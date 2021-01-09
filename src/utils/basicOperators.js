export const basicOperators = {
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '=': (prevValue, nextValue) => nextValue,
};
