export const setToday = () => {
  const today = new Date();
  const Y = today.getFullYear();
  const M = today.getMonth();
  const D = today.getDate();
  return Number(Y + (M < 10 ? "0" + M : M) + (D < 10 ? "0" + D : D));
};
