import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { DAY } from "../constants/utils";

export default function getDate(time) {
  const targetTime = dayjs(time);
  const currentTime = dayjs(new Date());

  const difference = currentTime.diff(targetTime);

  if (difference >= DAY) {
    return false;
  }

  return dayjs.duration(difference).format(`HH시간mm분ss초`);
}
