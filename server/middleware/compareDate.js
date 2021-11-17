export const setDateFormat = (Y, M, D) => {
  return String(Y) + String(M < 10 ? '0' + M : M) + String(D < 10 ? '0' + D : D);
};
export const setToday = () => {
  const today = new Date();
  const Y = today.getFullYear();
  const M = today.getMonth();
  const D = today.getDate();
  const date = setDateFormat(Y, M, D);
  return date;
};
