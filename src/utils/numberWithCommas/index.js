export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const capitalizerFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
