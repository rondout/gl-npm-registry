/*
 * @Description: 
 * @Author: warren
 * @LastEditors: shufei.han
 * @Date: 2024-01-10 11:00:12
 * @LastEditTime: 2024-05-22 11:02:47
 */
import fp from '@fingerprintjs/fingerprintjs'
/**
* @description 获取设备指纹（唯一标识）
* @returns 返回唯一标识
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