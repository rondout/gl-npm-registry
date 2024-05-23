/*
 * @Description: 请求数据返回有关的公共接口定义
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-04-09 09:26:35
 * @LastEditTime: 2024-05-23 18:26:49
 */
import { type BaseData } from './base'
/**
* @description 后端返回的统一数据结构 
*/
export interface BaseResponse<T = any> {
    code: number;
    info: T;
    msg: string;
}

/**
* @description 后端返回的列表数据的info字段的统一数据结构
*/
export interface TableDataResponse<T extends BaseData = BaseData> {
    records: T[];
    total: number;
    size: number ;
    current: number;
}

/**
* @description 后端返回的列表数据的数据结构
*/
export interface TableResponse<T extends BaseData = BaseData> extends BaseResponse<TableDataResponse<T>> {}
