/*
 * @Description: 
 * @Author: warren
 * @LastEditors: warren
 * @Date: 2024-01-29 10:50:45
 * @LastEditTime: 2024-01-29 14:48:12
 */
import { message } from 'ant-design-vue'

let close = true

type keyType = 'success' | 'error' | 'info'

interface MsgObj {
    type: keyType,
    msg: string,
    duration?: number,
}

/**
 * @description: 统一处理消息 可以传对象和字符串  目前只支持 'success' | 'error' | 'info'
 * @param {MsgObj | string} data { type: keyType, msg: string, duration: number, }
 */
export default function (data: MsgObj | string) {
    if (close) {
        close = false
        if (typeof data === 'string') {
            message.info(data, 3, () => {
                close = true
            })
        } else {
            const { type= 'info', msg, duration } = data
            message[type](msg, duration, () => {
                close = true
            })
        }
    }
}