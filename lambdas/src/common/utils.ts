const everyNthElement = <T>(array: T[], n: number): T[] => {
  const result: T[] = [];

  for (let i = 0; i < array.length; i += n) {
    result.push(array[i]);
  }

  return result;
};

export {
  everyNthElement
};