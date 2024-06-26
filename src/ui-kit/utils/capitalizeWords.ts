export const capitalizeWords = (value: string) => {
  const words = value.split(' ');

  const result = words
    .map((word) => {
      if (word.match(/^[A-Za-z]/)) {
        return word[0].toUpperCase() + word.substring(1);
      }

      return word;
    })
    .join(' ');

  return result;
};
