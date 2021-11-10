export function extractDate(date) {
  const targetDate = new Date(date);
  const Y = targetDate.getFullYear();
  const M = targetDate.getMonth();
  const D = targetDate.getDate();
  return { Y, M, D };
}

export function extractTargetDate(timeArr, date) {
  return timeArr[date.getDate() - 1];
}
