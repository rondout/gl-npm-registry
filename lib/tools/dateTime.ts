/*
 * @Description: 时间有关的处理方法
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-16 16:31:11
 * @LastEditTime: 2024-05-22 14:35:56
 */

import dayjs, { ConfigType } from "dayjs";
// import 'dayjs/locale/zh-cn'

/**
 *
 * @param time 时间
 * @param format 格式化格式
 * @description 格式化时间 默认的格式为 'YYYY-MM-DD HH:mm:ss'
 * @returns
 */
export function format(time: ConfigType, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(time).format(format);
}
/**
* @description 将number类型的分钟数转化为mm:ss格式的字符串，比如 12.5 => '12:30'  12.8 => '12:48'  
* @returns 
*/
export function formatMinutesToMMSS(minutes: number) {
  const totalSeconds = Math.round(minutes * 60);
  const minutesPart = Math.floor(totalSeconds / 60);
  const secondsPart = totalSeconds % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(
    secondsPart
  ).padStart(2, "0")}`;
}
/**
* @description 把时间转化为分钟数,只是简单的取分钟，不做四舍五入，比如：15:46 => 15  15:10 => 15
* @returns 
*/
export function convertTimeToMinutes(timeString: string) {
  // const [minutes, seconds] = timeString.split(':').map(Number)
  return timeString.split(":").map(Number)[0];
}
/**
* @description 解析时间为字符串
* @returns 
*/
export function parseTime(time: ConfigType, format = "{y}-{m}-{d} {h}:{i}:{s}" ) {
  if (arguments.length === 0) {
    return null;
  }
  if (time === null) {
    return null;
  }

  let date: any;
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
