/*
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-15 09:30:08
 * @LastEditTime: 2024-05-17 10:39:49
 */
import { HttpService } from "@lib/api";
import { AnyObject } from "@lib/models";
import { message } from "ant-design-vue";

// const httpService = new HttpService(() => {alert("Log out")}, "/cloud-basic")
export const http = new HttpService(
    {apiPrefix:'/cloud-basic'}, 
     () => {},
     (response) => {
        const code = response.data.code

        if (code === -1002 || code === -1010) {
            /* token 异常; 账号已在其它地方登录 */
            message.error("token 异常; 账号已在其它地方登录");
            
            // useUserStore().actionLogOut('clearToken')
            return Promise.reject(response.data)
        }

        if (code !== 0) {
            // TODO 以下code码待后续处理
            if (![
                -1011,
                -2010, -2012,
                -3005, -7021, -7022, // -7021,-7022 错误单独处理
            ].includes(code)) {
                message.error(response.data.msg )
            }

            console.error(response.data)

            return Promise.reject(response.data.msg)
        }

        return response.data
     },
     (error) => {
        let code = ''
        let msg = 'ERROR!'
        try {
            code = error.code
            msg = error.message
        } catch (err) {
            console.error('error get code: ', '获取 error code 和 message 出错')
        }
        console.error('error server: ', error)
        if (error.code !== 'ERR_CANCELED') {
            // showErrorMessage(message, { translate: false })
        }

        return Promise.reject({ data: { code: -1, info: [] }, msg, code })
     }
)

export const login = (data: AnyObject) => http.postWithPrefix('/cloud/v2/auth/login', data, {formData: true})