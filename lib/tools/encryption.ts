/*
 * @Description: 加密
 * @Author: warren
 * @LastEditors: warren
 * @Date: 2024-01-10 11:40:21
 * @LastEditTime: 2024-01-10 11:42:29
 */
import JsEncrypt from 'jsencrypt'

/* 加密数据 */
const getEncryptionHex = function (value: string, publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAItoR8lrBZ/ZaJZ3XvvgP8I31ImaTwbEPzPElmIZAasWoAzw3InqMVyeL7rTlFS3TFz3HMKBnrFlr463Bu19Tz0CAwEAAQ==' ): string {
    /* eslint-disable */
    const encrypt = new JsEncrypt()
    encrypt.setPublicKey(publicKey)

    return encrypt.encrypt(value) || ''
}

export {
    getEncryptionHex,
}
