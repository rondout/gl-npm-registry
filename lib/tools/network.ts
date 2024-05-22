/*
 * @Description: ip 相关的运算
 * @Author: warren
 * @LastEditors: warren
 * @Date: 2023-03-10 11:12:27
 * @LastEditTime: 2023-04-11 10:49:28
 */
import {
  validateIP,
  validateNetmask,
  validatePositiveInteger,
} from "@lib/tools/validate";

/**
 * @description: ip 转为 数字
 */
export function ipToNumber(ip: string) {
  let num = 0;
  const ipArr = ip.split(".");
  num =
    Number(ipArr[0]) * 256 ** 3 +
    Number(ipArr[1]) * 256 ** 2 +
    Number(ipArr[2]) * 256 +
    Number(ipArr[3]);
  num = num >>> 0;
  return num;
}

/**
 * @description: 数字转 ip
 */
export function numberToIp(num: number) {
  let str: string;
  const tt = [];
  tt[0] = (num >>> 24) >>> 0;
  tt[1] = ((num << 8) >>> 24) >>> 0;
  tt[2] = (num << 16) >>> 24;
  tt[3] = (num << 24) >>> 24;
  str = tt.join(".");
  return str;
}

/**
 * @description: 获取起始ip地址
 * @param {string} ip 网络地址
 * @param {number} start 起始位  如 100
 * @param {number} limit ip个数限制 如：50
 * @return {array} 返回 [开始ip, 结束ip]
 */
export const getStartEndIp = (ip: string, start: number, limit: number): [string?, string?] => {
  start = +start;
  limit = +limit;
  const isNum = (n: number) => validatePositiveInteger(n);
  if (validateIP(ip) && isNum(start) && isNum(limit)) {
    const ipNumber = ipToNumber(ip);
    const startIp = numberToIp(ipNumber + start);
    const endIp = numberToIp(ipNumber + start + limit);
    return [startIp, endIp];
  } else {
    console.error("数据类型不合法");
    return [];
  }
};

/**
 * @description: 根据 ip 获取 start 和 limit
 * @param {string} ip 当前ip
 * @param {string} startIp 起始ip
 * @param {string} endIp 结束ip
 * @return {array} 数组 [start, limit]
 */
export const getStartAndLimit = (ip: string, startIp: string, endIp: string): [number?, number?] => {
  if (validateIP(ip) && validateIP(startIp) && validateIP(endIp)) {
    const ipNumber = ipToNumber(ip);
    const startIpNumber = ipToNumber(startIp);
    const endIpNumber = ipToNumber(endIp);
    const start = startIpNumber - ipNumber;
    const limit = endIpNumber - startIpNumber;
    return [start, limit];
  } else {
    console.error("获取start-limit: 数据类型不合法");
    return [];
  }
};

/**
 * @description: 获取子网掩码的 1 的个数
 * @param {string} netmask 子网掩码
 * @return {number} 返回个数
 */
export const getNetmaskLength = (netmask: string): number => {
  if (!validateNetmask(netmask)) {
    return 0;
  }
  const array = netmask.split(".");
  let binaryStr = "";
  let len = 0;
  for (let i = 0; i < array.length; i++) {
    binaryStr += Number.parseInt(array[i]).toString(2);
  }
  for (let j = 0; j < binaryStr.length; j++) {
    if (binaryStr[j] === "1") len++;
  }
  return len;
};

/**
 * @description: 获取网络号
 * @param {string} ipAddress  网关地址
 * @param {string} subnetMask 子网掩码
 * @return {string} 网络号
 */
export function calculateNetworkAddress(ipAddress: string, subnetMask: string): string {
  if (!validateIP(ipAddress) || !validateIP(subnetMask)) return;
  const ipArray = ipAddress
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");
  const subnetMaskArray = subnetMask
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");

  const networkAddressArray = ipArray.map(
    // @ts-ignore
    (digit, index) => digit & subnetMaskArray[index]
  );

  const networkAddress = networkAddressArray
    .join("")
    .match(/.{8}/g)
    .map((byte) => parseInt(byte, 2))
    .join(".");

  return networkAddress;
}

/**
 * @description: 判断两个地址是否在同一个网段内
 * @param {string} ipAddress1
 * @param {string} ipAddress2
 * @param {string} subnetMask
 * @return {string}  是否在网段内
 */
export function isSameSubnet(ipAddress1: string, ipAddress2: string, subnetMask: string): boolean {
  // 将ip和子网掩码转换为数组
  const ipArray1 = ipAddress1
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");
  const ipArray2 = ipAddress2
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");
  const subnetMaskArray = subnetMask
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");

  // 将两个ip和子网掩码进行与操作
  const networkAddressArray1 = ipArray1.map(
    // @ts-ignore
    (digit, index) => digit & subnetMaskArray[index]
  );
  const networkAddressArray2 = ipArray2.map(
    // @ts-ignore
    (digit, index) => digit & subnetMaskArray[index]
  );

  // 相与结果相同表示在同一个网段内
  return networkAddressArray1.join("") === networkAddressArray2.join("");
}

/**
 * @description: 可以提供多少个 子网 ip
 * @param {String} subnetMask  子网掩码
 * @return {Number} 子网ip个数
 */
export function calculateAvailableIpCount(subnetMask: string): number {
  if (!validateNetmask(subnetMask)) {
    return 0;
  }
  // 将子网掩码转换为二进制数组
  const subnetMaskArray = subnetMask
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join("")
    .split("");

  // 计算子网掩码中 0 的个数
  const numberOfZeros = subnetMaskArray.reduce(
    (acc, bit) => acc + (bit === "0" ? 1 : 0),
    0
  );

  // 计算子网ip个数 去掉 网络号和广播地址
  const availableIpCount = Math.pow(2, numberOfZeros) - 2;

  return availableIpCount;
}
