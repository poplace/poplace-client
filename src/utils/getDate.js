import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { DAY } from "../constants/utils";

export default function getDate(time) {
  const targetTime = dayjs(time);
  const currentTime = dayjs(new Date());

  const difference = currentTime.diff(targetTime);
  const remainTime = 86400000 - difference;

  if (remainTime <= 0) {
    return false;
  }

  return dayjs.duration(86400000 - difference).format(`HH시간mm분ss초`);
}
