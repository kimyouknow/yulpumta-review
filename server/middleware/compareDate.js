export const setToday = () => {
  const today = new Date();
  const Y = today.getFullYear();
  const M = today.getMonth();
  const D = today.getDate();
  return String(Y) + String(M < 10 ? '0' + M : M) + String(D < 10 ? '0' + D : D);
};
export const setDateToNumber = (date) => {
  console.log(date);
};
