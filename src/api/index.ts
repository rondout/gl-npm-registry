/*
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-15 09:30:08
 * @LastEditTime: 2024-05-23 10:28:18
 */
import { HttpService } from "@lib/api";
import { AnyObject } from "@lib/models";
// import { message } from "ant-design-vue";

// const httpService = new HttpService(() => {alert("Log out")}, "/cloud-basic")
export const http = new HttpService(
    // 基础配置
    { timeout: 30000, apiPrefix: '/cloud-basic' },
    // 配置请求config (request interceptor)
    (config) => {
        /* 请求头配置token */
        // config.headers.token = getToken() || ''
        // /* 时间戳签名加密 */
        // config.headers.signature = getEncryptionHex(Date.now().toString())
        /* 设置接口地址 */
        console.log({config});
        
        const { apiPrefix } = config
        if (apiPrefix) {
            // config.baseURL = `${getApiDomain(SHARE_AREA)}${apiPrefix}`
            /* /cloud-basic 直接用当前域名 */
            config.baseURL = apiPrefix
        } else {
            /* SHARE_AREA  表示分享设备所在的区域，如果没有值就用当前用户或组织所在的区域 */
            /* /cloud-api 需要直接调用对应区域地址 */
            // config.baseURL = getApiDomain(SHARE_AREA)
        }
    },
    // 配置返回体 (response interceptor)
    (response) => {
        const code = response.data.code
        if (code === -1002 || code === -1010) {
            /* token 异常; 账号已在其它地方登录 */
            // handleToken()
            console.log('token 异常; 账号已在其它地方登录');
            
        }

        if (code !== 0) {
            // TODO 以下code码待后续处理
            if (code === -1023) {
                // initSecurityPage(response.data)
                console.log('initSecurityPage(response.data)');
                
            } else if (
                ![
                    -2010,
                    -2012,
                    -1011,
                    -3005,
                    -7021,
                    -7022, // -7021,-7022 错误单独处理
                ].includes(code)
            ) {
                // showErrorMessage(response.data)
                console.log("ERROR", response.data);
                
            }

            console.error(response.data)

            return Promise.reject(response.data)
        }
        console.log(response)

        return response
    },
    // 错误处理
    (error) => {
        let code = ''
        let message = 'ERROR!'
        try {
            code = error.code
            message = error.message
        } catch (err) {
            console.error(
                'error get code: ',
                '获取 error code 和 message 出错'
            )
        }
        console.error('error server: ', error)
        if (error.code !== 'ERR_CANCELED') {
            // showErrorMessage(message, { translate: false })
        }

        return Promise.reject({
            data: { code: -999, info: [] },
            message,
            code,
        })
    }
)
export const login = (data: AnyObject) => http.postWithPrefix<string>('/cloud/v2/auth/login', data, {formData: true})
export const loginOld = (data: AnyObject) => http.httpApiPrefixCloudBasic<string>({
    url:'/cloud/v2/auth/login',data,formData: true, method:'post'
})