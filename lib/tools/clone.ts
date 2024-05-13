/*
 * @Description: 工具方法
 * @Author: warren
 * @LastEditors: shufei.han
 * @Date: 2023-07-05 10:03:40
 * @LastEditTime: 2024-05-10 16:38:52
 */

import { AnyObject } from "@lib/models"

/**
 * @description: 拷贝数据
 * @param {*} obj
 * @return {*}
 */
export function deepCopy<T> (obj:T): T {
    const result = <T>(Array.isArray(obj) ? [] : {})
    for (const key in obj) {
        if (obj[key] !== undefined) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepCopy(obj[key]) // 递归复制
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}

// 判断数据是否相等
export const equalArray = function (arr1: any, arr2: any): any {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return false
    }
    return true
}

export function isObject<T> (value: T): boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
}

function equalObject<T extends AnyObject> (obj1: T, obj2: T) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length != keys2.length) {
        return false
    }

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true
}

/**
 * @description: 判断对象数组是否相等
 * @param {*} arr1
 * @param {*} arr2
 * @return {Boolean}
 */
export function equalObjectArray (arr1: any, arr2: any): boolean {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
    if (arr1.length !== arr2.length) return false

    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.some(item => equalObject(item, arr1[i]))) {
            return false
        }
    }

    return true
}
