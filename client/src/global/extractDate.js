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

export const displayClock = (date) => {
  return new Date(date).toString().substring(16, 24);
};

export const changeTimeFormat = (time) => {
  let minutes = Math.floor(time / 60);
  let hour = Math.floor(minutes / 60);
  let sec = time % 60;
  let min = minutes % 60;
  return `${hour < 10 ? `0${hour}` : hour} :
                        ${min < 10 ? `0${min}` : min} :
                        ${sec < 10 ? `0${sec}` : sec}`;
};
