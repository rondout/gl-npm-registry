
/**
 * @description 用户名校验结果
 */
export enum UsernameValidateResult {
    /** 长度校验失败 */
    LENGTH_ERROR = 'length_error',
    /** 第一个字符校验失败 */
    FIRST_CHAR_ERROR = 'firstCharacter_error',
    /** 特殊字符校验失败 */
    SPECIAL_CHAR_ERROR = 'specialCharacter_error',
    /** 校验成功 */
    VALID = 'pass'
}
/**
 * @description 校验密码的类型
 */
export enum PwdCheckType {
    /** 校验字符 */
    CHECK_CHAR,
    /** 校验长度 */
    CHECK_SECURITY
}