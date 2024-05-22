import { AnyObject, BaseData } from "@lib/models";
import ClipboardJS from 'clipboard'

/** * 
 * @description: 获取字符串长度
 */
export const getCharRealLength = (str: string) => {
  if (typeof str !== "string") {
    return;
  }
  let [realLength, charCode] = [0, -1];
  if (str) {
    const len = str.length;
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode > 0 && charCode <= 128) {
        realLength += 1;
      } else {
        realLength += 3;
      }
    }
  }
  return realLength;
};

export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;
  setTimeout(() => {
    console.log(new Date());
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

export function debounce(func: Function, wait = 300, immediate = false) {
  let timeout: NodeJS.Timeout, args, context, timestamp: number, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    // @ts-ignore
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export const throttle = (fn: Function, delay: number): Function => {
  let throttleTimer: NodeJS.Timeout
  return (...args: unknown[]) => {
      if (throttleTimer) {
          return
      }
      throttleTimer = setTimeout(() => {
          fn.apply(this, args)
          throttleTimer = null
      }, delay)
  }
}
/**
 * @description: 深拷贝数据
 * @param {T} obj
 * @return {T}
 */
export function deepCopy<T>(obj: T): T {
  const result = <T>(Array.isArray(obj) ? [] : {});
  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        result[key] = deepCopy(obj[key]); // 递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 *
 * @description 判断数组是否相等
 * @param arr1
 * @param arr2
 * @returns
 */
export const equalArray = function <T = any>(
  arr1: Array<T>,
  arr2: Array<T>
): boolean {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) return false;
  }
  return true;
};

/**
 * @description 判断一个数据是否是JS对象
 * @param value
 * @returns
 */
export function isObject<T>(value: T): boolean {
  return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 *
 * @param obj1
 * @param obj2
 * @description 判断两个对象的数据是否一致（只能判断一层，浅比较）
 * @returns
 */
function equalObject<T extends AnyObject>(obj1: T, obj2: T) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) {
    return false;
  }

  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

/**
 * @description: 判断对象数组是否相等
 * @param {*} arr1
 * @param {*} arr2
 * @return {Boolean}
 */
export function equalObjectArray(arr1: any, arr2: any): boolean {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.some((item) => equalObject(item, arr1[i]))) {
      return false;
    }
  }

  return true;
}

/**
 * @description: 找出老数据中被 编辑 或者 删除 的数据项
 */
export function findChangeData<T extends BaseData>(
  oldArray: Array<T>,
  newArray: Array<T>
) {
  if (!(oldArray instanceof Array) || !(newArray instanceof Array))
    return false;

  /* 如果相等 返回空数据 */
  if (equalObjectArray(oldArray, newArray)) {
    return [];
  }

  const changeArray = [];
  const maxLength = Math.max(oldArray.length, newArray.length);

  for (let i = 0; i < maxLength; i++) {
    const oldItem = oldArray[i];

    /* 如果原始数据没有 表示为新增数据 */
    if (!oldItem) {
      changeArray.push(newArray[i]);
      continue;
    }

    const newItem = newArray.find((item) => item.id === oldItem.id);
    if (newItem) {
      if (!equalObject(newItem, oldItem)) {
        /* 新数组中 有找到老数据 表示被编辑 或者 没有改变, 所以加个相等判断 确保是被编辑的数据 */
        changeArray.push(oldItem);
      }
    } else {
      /* 新数组中 没有找到老数据  表示已被删除 */
      changeArray.push(oldItem);
    }
  }

  return changeArray;
}

export function uniqueArr<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}

export function getJsonType<T>(val: T) {
  return Object.prototype.toString.call(val).split(" ")[1].split("]")[0];
}
/**
 * @description: 比较两个版本大小 目前版本格式有 x.x.x | x.x | VB_x.x 三种; VB_是独立的一个系列版本
 * @param {String} version1 版本1
 * @param {String} version2 版本2
 * @return {Number} 0 表示相等 1(表示版本1 > 版本2) 2(版本1 < 版本2) 3 表示版本1为null
 */
export const versionCompare = (version1: string| string[], version2: string| string[]) => {
  if (version1 === null) {
    return 3;
  }

  if (version1 === version2) {
    return 0;
  }

  // 统一处理 默认都做一次删除
  const repStr = (str: string) => str.replace("VB_", "");
  version1 = repStr(version1 as string);
  version2 = repStr(version2 as string);
  
  version1 = version1.split(".");
  version2 = version2.split(".");

  let length = version1.length;
  length = length > version2.length ? length : version2.length;

  for (let i = 0; i < length; i++) {
    if (typeof version1[i] === "undefined") {
      version1[i] = "0";
    }

    if (typeof version2[i] === "undefined") {
      version2[i] = "0";
    }

    if (version1[i] === version2[i]) {
      continue;
    } else if (version1[i] > version2[i]) {
      return 1;
    } else {
      return 2;
    }
  }

  return 0;
};

/**
 * @description: 获取浏览器
 * @return { Array } [浏览器名称, 浏览器版本]
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let M =
    ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
    [];
  let tem: any[];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return ["msie", tem[1] || ""];
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null)
      return tem.slice(1).join(" ").replace("OPR", "opera").split(" ");
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appCodeName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return [M[0].toLocaleLowerCase(), Number(M[1])];
};

// 对modelList进行处理，相同label只保留一项
export const filterModelList = <T extends {label?: string}>(modelList: T[]) => {
  const arr = [];
  modelList.forEach((item) => {
    const isExist = arr.find((i) => i.label === item.label);
    if (!isExist) {
      arr.push(item);
    }
  });
  return arr;
};

export function copyText (text:string) {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => 'copy',
    })
    clipboard.on('success', (e) => {
      resolve(e)
      clipboard.destroy()
    })

    clipboard.on('error', (e) => {
      reject(e)  
      clipboard.destroy()
    })
    fakeElement.click()
  })
}
// 将mac地址转为大写并隔两个加一个冒号
export function macAddrFormatter (mac: string) {
  if (!mac) return ''
  return mac.toUpperCase().replace(/(.{2})/g, '$1:').slice(0, 17)
}