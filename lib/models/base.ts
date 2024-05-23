/*
 * @Description: 基础的类型定义
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 09:15:29
 * @LastEditTime: 2024-05-23 12:15:34
 */
import type { Rule } from 'ant-design-vue/es/form'

/**
* @description 基本的任意对象类型
*/
export interface AnyObject<T = any> {
    [prop:string]: T
}

/** Id类型，暂定只有number和string两种可能 */
export type Id = number | string
/**基础的带有Id的数据 */
export interface BaseData<T extends Id = string> {
    id: T;
    [propName: string]: any;
}
/**
 * @description 选择项生成器
 */
export class SelectOptions<T> {
    constructor (public value: T, public label: string) { }
}
/**
 * @template T form表单的数据的类型
* @description form表单的rules的类型
*/
export type FormRules<T extends Record<string, any> = Record<string, any>> = {
    [propName in keyof T]: Rule | Rule[];
};