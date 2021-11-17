import { getMonthData } from '../middleware/getMonthData';
import Lapse from '../models/Lapse';

export const getStat = async (req, res) => {
  const {
    user,
    body: { year, month },
  } = req;
  const { rawMonthData, Y, M } = await getMonthData(user, year, month, false);
  if (rawMonthData.length === 0)
    return res.json({
      success: true,
      message: '',
      dailyTotalTimes: [],
    });
  // console.log(rawMonthData);
  // 같은 d_date의 d_total을 더하기, 길이가 31인 배열을 만들어서 idx을 날짜 -1로 맞추기
  // 해당 날짜 idx에 d_total을 더하기
  const dailyTotalTimes = Array(31).fill(0);
  try {
    rawMonthData.map((element) => {
      const { d_date, d_total } = element;
      // idxDate가 dailyTotalTimes의 index번호가 됨.
      const idxDate = d_date - Number(Y + M + '00') - 1;
      dailyTotalTimes[idxDate] = dailyTotalTimes[idxDate] + d_total;
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      dailyTotalTimes: [],
    });
  } finally {
    return res.json({
      success: true,
      message: '',
      dailyTotalTimes,
    });
  }
};

export const getDailyLapses = async (req, res) => {
  const {
    user,
    body: { Y, M, D },
  } = req;
  console.log(Number(String(Y) + String(M) + String(D)));
  let dailyLapses;
  try {
    dailyLapses = await Lapse.find({
      user_id: user._id,
      date: Number(String(Y) + String(M) + String(D)),
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      dailyLapses,
    });
  } finally {
    return res.json({
      success: true,
      message: '',
      dailyLapses,
    });
  }
};
