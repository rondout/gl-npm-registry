/*
 * @Author: shufei.han shufei.han@gl-inet.com
 * @Date: 2024-03-25 11:30:51
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-05-23 11:28:07
 * @FilePath: \gl-cloud-sd-wan\src\models\settings.ts
 * @Description: 
 */
import { SelectOptions } from './base'

/**
* @description 系统支持的语言枚举
* @returns 
*/
export enum Languages {
    /** 中文 */
    ZH = 'zh',
    /** 英语 */
    EN = 'en',
}
/** 语言对应的label映射 */ 
export const languageLabelMap = new Map<Languages, string>([
    [Languages.ZH, '中文'],
    [Languages.EN, 'English'],
])
/** 语言选择options */
export const languageOptions = Object.values(Languages).map(lang => new SelectOptions(lang, languageLabelMap.get(lang)))