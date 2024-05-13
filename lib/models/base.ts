/*
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 09:15:29
 * @LastEditTime: 2024-05-11 09:24:26
 */
import type { Rule } from 'ant-design-vue/es/form'

export interface AnyObject<T = any> {
    [prop:string]: T
}

// Id类型，暂定只有number和string两种可能
export type Id = number | string
// 基础的带有Id的数据
export interface BaseData<T extends Id = string> {
    id: T;
    [propName: string]: any;
}
// 选择项生成器
export class SelectOptions<T> {
    constructor (public value: T, public label: string) { }
}
// form表单的rules的类型
// form表单的rules的类型
export type FormRules<T extends Record<string, any> = Record<string, any>> = {
    [propName in keyof T]: Rule | Rule[];
};