/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export const moveElement = (
  [...array]: any[],
  index: number,
  isUp: boolean,
) => {
  if (index < 0 || index >= array.length) return array;

  const temp = array[index];
  if (isUp && index > 0) {
    array[index] = array[index - 1];
    array[index - 1] = temp;
  } else if (!isUp && index < array.length - 1) {
    array[index] = array[index + 1];
    array[index + 1] = temp;
  }

  return array;
};
