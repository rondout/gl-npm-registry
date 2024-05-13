/*
 * @LastEditTime: 2024-05-13 10:35:08
 */
// import store from '@/store'
// import Vue from 'vue'

export enum GL_ENV_ENUM {
    DEVELOPMENT = 'development',
    DEVELOPMENT_IOT = 'developmentIot',
    TEST = 'test',
    PRODUCTION_CN = 'productionCn',
    PRODUCTION = 'production',
}

export const REGION_URL_MAP = new Map([
    [
        GL_ENV_ENUM.DEVELOPMENT,
        {
            cn: 'cloud-dev2.gl-inet.cn',
            jp: 'cloud-dev2.gl-inet.cn',
            us: 'cloud-dev2.gl-inet.cn',
        },
    ],
    [
        GL_ENV_ENUM.DEVELOPMENT_IOT,
        {
            cn: 'cloud-dev.gl-inet.cn',
            jp: 'cloud-dev.gl-inet.cn',
        },
    ],
    [
        GL_ENV_ENUM.TEST,
        {
            jp: 'cloud-test-jp1.gl-inet.cn',
            eu: 'cloud-test-eu1.gl-inet.cn',
            cn: 'cloud-test-cn.gl-inet.cn',
        },
    ],
    [
        GL_ENV_ENUM.PRODUCTION_CN,
        {
            cn: 'cloud.gl-inet.cn',
        },
    ],
    [
        GL_ENV_ENUM.PRODUCTION,
        {
            jp: 'cloud-jp.goodcloud.xyz',
            eu: 'cloud-eu.goodcloud.xyz',
            us: 'cloud-us.goodcloud.xyz',
        },
    ],
])

/* 当前用于 cookie, 便于区域切换 */
export const DOMAIN_COOKIE_MAP = new Map([
    [GL_ENV_ENUM.DEVELOPMENT, '.gl-inet.cn'],
    [GL_ENV_ENUM.DEVELOPMENT_IOT, '.gl-inet.cn'],
    [GL_ENV_ENUM.TEST, '.gl-inet.cn'],
    [GL_ENV_ENUM.PRODUCTION_CN, '.gl-inet.cn'],
    [GL_ENV_ENUM.PRODUCTION, '.goodcloud.xyz'],
])

/* 区域翻译 */
const REGION_LIST = [
    {
        label: 'regionSelect.global',
        value: 'jp',
    },
    {
        label: 'regionSelect.america',
        value: 'us',
    },
    {
        label: 'regionSelect.europe',
        value: 'eu',
    },
]



export const getRegionUrl = (region: GL_ENV_ENUM) => {
    return REGION_URL_MAP.get(region)
}

/* 判断当前服务情况 */
const judgeHostname = () => {
    const hostname = window.location.hostname
    const domainAddress = {
        ZH_ROOT: 'gl-inet.cn',
        ZH_TARGET_LIST: [
            'cloud',
            'cloud-test',
            'cloud-dev',
            'cloud-sdwan-dev',
            'cloud-test-jp1',
            'cloud-test-eu1',
            'cloud-dev2',
            'cloud-test-cn',
        ],
        EN_ROOT: 'goodcloud.xyz',
        EN_TARGET_LIST: [
            'www',
            'jp',
            'us',
            'eu',
            'dev',
            'test',
            'cloud-jp',
            'cloud-us',
            'cloud-eu',
            'cloud-us-frontend-debug',
        ],
    }

    const enDomainList = domainAddress.EN_TARGET_LIST
    const zhDomainList = domainAddress.ZH_TARGET_LIST
    const isEn = enDomainList.find(
        (v) => hostname === `${v}.${domainAddress.EN_ROOT}`,
    )
    const isZh = zhDomainList.find(
        (v) => hostname === `${v}.${domainAddress.ZH_ROOT}`,
    )
    const isLocalhost = hostname === 'localhost'
    return {
        isEn, // 国外服务
        isZh, // 国内服务
        isLocalhost, // 本地开发
    }
}

/* 判断是否海外服务器 */
const isOverseasArea = function () {
    const { isEn, isZh, isLocalhost } = judgeHostname()
    if (isEn) {
        return true
    } else if (isZh) {
        return false
    } else if (isLocalhost) {
        return false
    } else {
        return true
    }
}

/* 判断是否是云平台 */
const isGLCompany = function () {
    const { isEn, isZh, isLocalhost } = judgeHostname()
    if (isEn || isZh || isLocalhost) {
        return true
    } else {
        return false
    }
}

/* 刷新 重新获取用户信息 */
const skipAreaCheck = function () {
    window.location.replace(window.location.origin)
}

/* 获取当前区域名称 */
const getCurrentRegionName = function (region: string) {
    // const region = getCurrentRegion()

    return REGION_LIST.find((item) => item.value === region).label
}

/* 获取 domain 用于存放 cookie */
const getDomainForCookie = function (env: GL_ENV_ENUM) {
    if (/localhost/.test(location.href)) {
        return 'localhost'
    }

    if (isGLCompany()) {
        return DOMAIN_COOKIE_MAP.get(env)
    } else {
        return location.hostname
    }
}


export {
    REGION_LIST,
    isOverseasArea,
    isGLCompany,
    getCurrentRegionName,
    skipAreaCheck,
    getDomainForCookie
}
