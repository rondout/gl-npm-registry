/*
 * @Description: 时间有关的处理方法
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-16 16:31:11
 * @LastEditTime: 2024-05-16 16:57:43
 */

import dayjs, { ConfigType } from "dayjs";
// import 'dayjs/locale/zh-cn'

/**
 *
 * @param time
 * @description 格式化时间
 * @returns
 */
export function format(time: ConfigType) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}
export function formatMinutesToMMSS(minutes) {
  const totalSeconds = Math.round(minutes * 60);
  const minutesPart = Math.floor(totalSeconds / 60);
  const secondsPart = totalSeconds % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(
    secondsPart
  ).padStart(2, "0")}`;
}
export function convertTimeToMinutes(timeString) {
  // const [minutes, seconds] = timeString.split(':').map(Number)
  return timeString.split(":").map(Number)[0];
}

export function parseTime(time: ConfigType, cFormat: string) {
  if (arguments.length === 0) {
    return null;
  }
  if (time === null) {
    // if this device never login in, its online/office time is 'null' 如果有设备从来没有上线过，其online/office time 是 null
    return null;
  }

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time.toString()) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  if (formatObj.y === 1970) {
    // online first time, its offline time is '1970-01-01 08:00:00.0'
    return "";
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a")
      return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
}

export { type ConfigType };
