const commaSeparatedNumericValues = num => {
  const numToString = num.toString();
  let newString = '';
  let count = 0;
  for (let i = numToString.length - 1; i >= 0; i -= 1) {
    newString = `${numToString[i]}${newString}`;
    count += 1;
    if (count === 3 && i !== 0) {
      newString = `,${newString}`;
      count = 0;
    }
  }
  return newString.trim();
};

const roundTo = (x, precision) => {
  const y = +x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : +precision));
};

export { commaSeparatedNumericValues, roundTo };
