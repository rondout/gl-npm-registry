import axios, { type AxiosRequestConfig } from 'axios'
// import store from '@/store'
import { getToken } from '@lib/tools/auth'
// import { getApiDomain } from '@lib/tools/region'
// import { showErrorMessage } from '@/api/requestError'
import { getEncryptionHex } from '@lib/tools/encryption'
// import { useUserStore } from '@/stores/modules/user'
import message from '@lib/tools/message'
import type { BaseResponse } from '@lib/models/request'

declare module "axios" {
    interface AxiosRequestConfig {
        formData?: boolean;
        apiPrefix?: string;
    }
}

export class HttpService {
    public service = axios.create({
        timeout: 30000,
    })

    constructor(onLogout: ()=> void, private apiPrefix?:string) {
        this.init(onLogout)
    }

    private init(logoutCallback: () => void) {

        // request interceptor
        this.service.interceptors.request.use(
            config => {
                /* 请求头配置token */
                config.headers.token = getToken() || ''
                /* 时间戳签名加密 */
                config.headers.signature = getEncryptionHex(Date.now().toString())

                /**
                 * @describe 统一处理 formData 传参
                 * 前提： post 请求
                 * 定义接口时设置 formData: true； 配置 data 字段
                 * 参考 \src\api\login.js 的 reqLogin 方法
                 */
                if (config.formData) {
                    const formData = new FormData()
                    Object.keys(config.data).forEach(k => {
                        formData.append(k, config.data[k])
                    })
                    config.data = formData
                }

                /* config.baseURL = '/cloud-api' 暂时未处理， 都是在接口里面单个写 */

                /* 设置接口地址 */
                // @ts-ignore
                const { apiPrefix, SHARE_AREA } = config 
                if (apiPrefix) {
                    // config.baseURL = `${getApiDomain(SHARE_AREA)}${apiPrefix}`
                    /* /cloud-basic 直接用当前域名 */
                    config.baseURL = apiPrefix
                } else {
                    /* SHARE_AREA  表示分享设备所在的区域，如果没有值就用当前用户或组织所在的区域 */
                    /* /cloud-api 需要调用对应区域地址 */
                    // config.baseURL = getApiDomain(SHARE_AREA)
                }

                return config
            },
            error => {
                console.log('返回错误', error) // for debug
                Promise.reject(error)
            },
         )

        this.service.interceptors.response.use(
            response => {
                const code = response.data.code

                if (code === -1002 || code === -1010) {
                    /* token 异常; 账号已在其它地方登录 */
                    // useUserStore().actionLogOut('clearToken')
                    logoutCallback()
                    return Promise.reject(response.data)
                }

                if (code !== 0) {
                    // TODO 以下code码待后续处理
                    if (![
                        -1011,
                        -2010, -2012,
                        -3005, -7021, -7022, // -7021,-7022 错误单独处理
                    ].includes(code)) {
                        message({ type: 'error', msg: response.data.msg })
                    }

                    console.error(response.data)

                    return Promise.reject(response.data.msg)
                }

                return response.data
            },

            error => {
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
            },
        )
    }
    /**
     * 
     * @param {AxiosRequestConfig} config 
     * @returns {BaseResponse}
     */
    public async request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<BaseResponse<T>> {
        const result = await this.service.request(config)
        return result as any as BaseResponse<T>
    }

    public async httpApiPrefixCloudBasic<T = any, D = any> (data: AxiosRequestConfig<D>): Promise<BaseResponse<T>> {
        // @ts-ignore
        data.apiPrefix = '/cloud-basic'
        return this.request<T, D>(data)
    }

    public async get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
        const result = await this.service.get(url, config)
        console.log("GET_RESULT", result);
        // @ts-ignore
        return result.info as T
    }

    public async getWithPrefix<T = any, D = any>(url: string, config: AxiosRequestConfig<D> = {}) {
        return this.get<T, D>(url, {...config, apiPrefix: this.apiPrefix})
    }

    public async post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        const result = await this.service.post(url, data, config)
        console.log("POST_RESULT", result);
        // @ts-ignore
        return result.info as T
    }

    public async postWithPrefix<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.post<T, D>(url, data, {...config, apiPrefix: this.apiPrefix})
    }

    
    public async put<T = any, D = any>(url: string, data?:D, config?: AxiosRequestConfig<D>) {
        const result = await this.service.put(url, data, config)
        console.log("GET_RESULT", result);
        // @ts-ignore
        return result.info as T
    }

    public async putWithPrefix<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.put<T, D>(url, data, {...config, apiPrefix: this.apiPrefix})
    }

    
    public async delete<T = any, D = any>(url: string, data?:D, config?: AxiosRequestConfig<D>) {
        const result = await this.service.put(url, data, config)
        console.log("GET_RESULT", result);
        // @ts-ignore
        return result.info as T
    }
}


// export const  httpService = new HttpService(() => {})
// export const 

/* /cloud-basic 前缀请调用该方法  */
// export const httpApiPrefixCloudBasic = function <T = any, D = any> (data: AxiosRequestConfig<D>): Promise<BaseResponse<T>> {
//     // @ts-ignore
//     data.apiPrefix = '/cloud-basic'
//     return request<T, D>(data)
// }

// export default service
