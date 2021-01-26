export const numberWithCommas = (displayeNumber = '') => {
  let commas = parseFloat(displayeNumber).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  });

  //   const match = displayeNumber.match(/\.\d*?(0*)$/);

  //   if (match) commas += /[1-9]/.test(match[0]) ? match[1] : match[0];
  return commas;
};
