import axios, {
    AxiosInstance,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
    type AxiosRequestConfig,
} from "axios";
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

/**
 * @description 发送http请求的类
 * @member {AxiosInstance} instance axios实例
 */
export class HttpService {
    public instance: AxiosInstance;

    constructor(
        /** 配置 */
        private config: CreateAxiosDefaults = { timeout: 30000 },
        private configRequest: <T = any>(config: InternalAxiosRequestConfig<T>) => void,
        private configResponse: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
        private errorHandler?: ((error: any) => any) | null
    ) {
        this.init();
    }

    private init() {
        this.instance = axios.create({...this.config, apiPrefix: undefined});
        this.instance.interceptors.request.use(
            (config) => {
                // 这里处理formData 其他的交给业务自己处理
                if (config.formData) {
                    const formData = new FormData();
                    Object.keys(config.data).forEach((k) => {
                        formData.append(k, config.data[k]);
                    });
                    config.data = formData;
                }
                
                // 这里只做formData处理，剩余的各自业务自己处理
                this.configRequest(config);

                return config;
            },
            (error) => {
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
        return result.data as any as BaseResponse<T>;
    }
    // 兼容goodcloud 因为其没有处理data这一层级
    public requestWithData = async <T = any, D = any>(config: AxiosRequestConfig<D>) => {
        const result = await this.instance.request(config);
        return result as any as {data: BaseResponse<T>};
    }
    // 兼容goodcloud 因为其没有处理data这一层级
    public httpApiPrefixCloudBasic = async <T = any, D = any>(data: AxiosRequestConfig<D>): Promise<BaseResponse<T>>  =>{
        data.apiPrefix = this.config.apiPrefix;
        return this.request<T, D>(data);
    }

    public httpApiPrefixCloudBasicWithData = async <T = any, D = any>(data: AxiosRequestConfig<D>) =>{
        data.apiPrefix = this.config.apiPrefix;
        return this.requestWithData<T, D>(data);
    }

    public get = async <T = any, D = any>(url: string,config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.get<T, AxiosResponse<{info: T}>>(url, config);
        return result.data.info;
    }

    public getWithPrefix = async <T = any, D = any>(url: string,config: AxiosRequestConfig<D> = {}) => {
        return this.get<T, D>(url, { ...config, apiPrefix: this.config.apiPrefix });
    }

    public post = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.post<T, AxiosResponse<{info: T}>>(url, data, config);

        return result.data.info as T;
    }

    public postWithPrefix = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        const result = await this.post<T, D>(url, data, { ...config, apiPrefix: this.config.apiPrefix });
        return result
    }

    public put = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.put<T, AxiosResponse<{info: T}>>(url, data, config);
        return result.data.info as T;
    }

    public putWithPrefix = async <T = any, D = any>(url: string,data?: D,
        config?: AxiosRequestConfig<D>) => {
        return this.put<T, D>(url, data, { ...config, apiPrefix: this.config.apiPrefix });
    }

    public delete = async <T = any, D = any>(url: string,config?: AxiosRequestConfig<D>) => {
        const result = await this.instance.delete<T, AxiosResponse<{info: T}>>(url, config);
        return result.data.info as T;
    }
}