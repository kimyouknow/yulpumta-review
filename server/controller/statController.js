import Day from "../models/Day";

export const getStat = async (req, res) => {
  const {
    user,
    body: { year, month },
  } = req;
  const Y = year;
  const M = month < 10 ? "0" + month : month;
  const data = await Day.find({
    user_id: user._id,
    d_date: { $gt: Number(Y + M + "00"), $lt: Number(Y + M + "40") },
  });
  // 과목이 하나도 없으면 빈 배열 반환
  if (data.length === 0)
    return res.json({
      success: true,
      message: "",
      data: [],
    });
  // 같은 d_date의 d_total을 더하기, 길이가 31인 배열을 만들어서 idx을 날짜 -1로 맞추기
  // 해당 날짜 idx에 d_total을 더하기
  const statData = Array(31).fill(0);
  try {
    data.forEach((element) => {
      const { d_date, d_total } = element;
      // idxDate가 statData의 index번호가 됨.
      const idxDate = d_date - Number(Y + M + "00") - 1;
      statData[idxDate] = statData[idxDate] + d_total;
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      data: [],
    });
  } finally {
    return res.json({
      success: true,
      message: "",
      data: statData,
    });
  }
};
