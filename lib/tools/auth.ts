/*
 * @Description: 
 * @Author: warren
 * @LastEditors: shufei.han
 * @Date: 2024-01-10 11:00:12
 * @LastEditTime: 2024-05-22 11:02:47
 */
import jsCookie from 'js-cookie'
import { getDomainForCookie, GL_ENV_ENUM, isGLCompany } from '@lib/tools/region'
// import router from '@/router'
import fp from '@fingerprintjs/fingerprintjs'

const FRONT_TOKEN = 'FRONT_TOKEN'
/* 自定义域名 token */
const FRONT_TOKEN_CUSTOM = 'FRONT_TOKEN_CUSTOM'

/**
 * @description 判断用哪个 token名称
 * @returns 
 */
function getTokenName () {
    return isGLCompany() ? FRONT_TOKEN : FRONT_TOKEN_CUSTOM             
}
/**
* @description 获取token
* @returns 
*/
export function getToken () {
    return jsCookie.get(getTokenName())
}
/**
* @description 设置token
* @returns 
*/
export function setToken (token: string, env:GL_ENV_ENUM) {
    jsCookie.set(getTokenName(), token, { domain: getDomainForCookie(env) })
}
/**
* @description 清楚token
* @returns 
*/
export function removeToken (env:GL_ENV_ENUM) {
    jsCookie.remove(getTokenName(), { domain: getDomainForCookie(env) })
}
/**
* @description 获取设备指纹并且通过传入的name来签名 
* @returns 
*/
export async function getFp (name:string) {
    // @ts-ignore
    const fpPromise = fp.load({ monitoring: false })
    const fpp = await fpPromise
    const result = await fpp.get()
    const components = {
        ...result.components,
        browser: { duration: 1, value: navigator.userAgent },
        user: { duration: 1, value: name },
    }
    const visitorId = fp.hashComponents(components)
    localStorage.setItem('deviceId', visitorId)
    return visitorId
}