/*
 * @Description: 常量
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 10:01:23
 * @LastEditTime: 2024-05-11 10:56:23
 */
import { InjectionKey } from "vue";
import { ConfigProviderProps } from "./components";

export const BASE_PROVIDER_INJECTION_KEY = Symbol() as InjectionKey<ConfigProviderProps>