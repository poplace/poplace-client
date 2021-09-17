import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { DAY } from "../constants";

export default function getDate(time) {
  const targetTime = dayjs(time);
  const currentTime = dayjs(new Date());
  const difference = currentTime.diff(targetTime);
  const remainTime = DAY - difference;

  if (remainTime <= 0) {
    return false;
  }

  return dayjs.duration(remainTime).format(`HH시간mm분ss초`);
}
