import axios, {
    AxiosInstance,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
    type AxiosRequestConfig,
} from "axios";
// import store from '@/store'
import { getToken } from "@lib/tools/auth";
// import { getApiDomain } from '@lib/tools/region'
// import { showErrorMessage } from '@/api/requestError'
import { getEncryptionHex } from "@lib/tools/encryption";
// import { useUserStore } from '@/stores/modules/user'
import type { BaseResponse } from "@lib/models/request";

declare module "axios" {
    interface AxiosRequestConfig {
        formData?: boolean;
        apiPrefix?: string;
    }
    interface AxiosResponse<T> {
        info?: T;
    }
}
export class HttpService {
    public instance: AxiosInstance;

    constructor(
        private config: CreateAxiosDefaults = { timeout: 30000 },
        private configRequest?: <T = any>(config: InternalAxiosRequestConfig<T>) => void,
        private configResponse?: (value: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
        private errorHandler?: ((error: any) => any) | null
    ) {
        this.init();
    }

    private init() {
        this.instance = axios.create({...this.config, apiPrefix: undefined});
        this.instance.interceptors.request.use(
            (config) => {
                /* 请求头配置token */
                config.headers.token = getToken() || "";
                /* 时间戳签名加密 */
                config.headers.signature = getEncryptionHex(Date.now().toString());

                /**
                 * @describe 统一处理 formData 传参
                 * 前提： post 请求
                 * 定义接口时设置 formData: true； 配置 data 字段
                 * 参考 \src\api\login.js 的 reqLogin 方法
                 */
                if (config.formData) {
                    const formData = new FormData();
                    Object.keys(config.data).forEach((k) => {
                        formData.append(k, config.data[k]);
                    });
                    config.data = formData;
                }

                /* config.baseURL = '/cloud-api' 暂时未处理， 都是在接口里面单个写 */

                /* 设置接口地址 */
                // @ts-ignore
                const { apiPrefix, SHARE_AREA } = config;
                if (apiPrefix) {
                    // config.baseURL = `${getApiDomain(SHARE_AREA)}${apiPrefix}`
                    /* /cloud-basic 直接用当前域名 */
                    config.baseURL = apiPrefix;
                } else {
                    /* SHARE_AREA  表示分享设备所在的区域，如果没有值就用当前用户或组织所在的区域 */
                    /* /cloud-api 需要调用对应区域地址 */
                    // config.baseURL = getApiDomain(SHARE_AREA)
                }

                this.configRequest(config);

                return config;
            },
            (error) => {
                console.log("返回错误", error); // for debug
                Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                return this.configResponse(response);
            },

            (error) => {
                return this.errorHandler(error)
            }
        );
    }
    /**
     *
     * @param {AxiosRequestConfig} config
     * @returns {BaseResponse}
     */
    public request = async <T = any, D = any>(config: AxiosRequestConfig<D>): Promise<BaseResponse<T>> => {
        const result = await this.instance.request(config);
        return result as any as BaseResponse<T>;
    }

    public httpApiPrefixCloudBasic = async <T = any, D = any>(data: AxiosRequestConfig<D>): Promise<BaseResponse<T>>  =>{
        data.apiPrefix = this.config.apiPrefix;
        return this.request<T, D>(data);
    }

    public get = async <T = any, D = any>(url: string,config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.get<T>(url, config);
        return result.info;
    }

    public getWithPrefix = async <T = any, D = any>(url: string,config: AxiosRequestConfig<D> = {}) => {
        return this.get<T, D>(url, { ...config, apiPrefix: this.config.apiPrefix });
    }

    public post = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.post<T>(url, data, config);
        return result.info as T;
    }

    public postWithPrefix = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        return this.post<T, D>(url, data, { ...config, apiPrefix: this.config.apiPrefix });
    }

    public put = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.put<T>(url, data, config);
        return result.info as T;
    }

    public putWithPrefix = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        return this.put<T, D>(url, data, { ...config, apiPrefix: this.config.apiPrefix });
    }

    public delete = async <T = any, D = any>(url: string,config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.delete<T>(url, config);
        return result.info as T;
    }
}