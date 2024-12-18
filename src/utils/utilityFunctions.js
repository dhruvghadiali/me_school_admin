export const indianNumberFormate = (value) => {
  const val = Math.abs(value);
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} C`;
  if (val >= 100000) return `${(value / 100000).toFixed(2)} L`;
  if (val >= 1000) return `${(value / 1000).toFixed(2)} T`;
  return value;
};

export const isUndefinedOrNull = (value) => {
  return value === undefined || value === null;
}
