/*
 * @Description: 请求数据返回有关的公共接口定义
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-04-09 09:26:35
 * @LastEditTime: 2024-04-09 10:16:09
 */
import { type BaseData } from './base'
// 后端返回的统一数据结构
export interface BaseResponse<T = any> {
    code: number;
    info: T;
    msg: string;
}

export interface TableDataResponse<T extends BaseData = BaseData> {
    records: T[];
    total: number;
    size: number ;
    current: number;
}
