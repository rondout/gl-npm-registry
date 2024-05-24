<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-23 15:19:22
 * @LastEditTime: 2024-05-23 18:11:31
-->
# @gl/main工具库使用说明

## 安装

需要配置包的镜像地址，在项目根目录下创建 `.npmrc` 文件，并按照如下配置:
```bash
@gl:registry=https://repository.gl-inet.net/repository/npm-releases/
```
这样配置后，以后 `gl` 这个组织下的所有包都会从这个镜像源拉取。
然后使用包管理工具直接安装即可：
::: code-group

```bash [npm]
npm install @gl/main --save
```

```bash [yarn]
yarn add @gl/main
```

```bash [pnpm]
pnpm add @gl/main
```
:::

## 依赖说明
这里讲的依赖是外部依赖，即你的项目需要提供的一些包（ `@gl/main` 不会打包的外部依赖），该组件库依赖以下第三方依赖：

|名称|版本|描述|
|---|---|---|
|vue|3.4及以上|vue3作为项目基础，该组件库不会打包，需要项目支持|
|ant-design-vue|4.2及以上|vue3作为项目和组件库的基础，该组件库不会打包，需要项目支持|
|axios|1.6.8及以上|暂时需要项目安装该包，后续可能会考虑完全替换（组件库自己安装，当组件库提供的能力完全足够项目使用。就会考虑直接平替。）|

**注意：其中 `vue` 和 `ant-design-vue`**只在你需要使用组件库的时候才是必须的，如果你只是使用这里面的一些工具，这两个依赖是不必要的。**
另外，这里的工具值得并不全是函数，也包括一些通用的TS类型或者类的封装。

## 使用

安装好后直接引入即可，我们的工具库严格按照TS标准编写，并遵循 `JSDoc注释规范`，通常情况你不管是在 `TS` 项目还是 `JS` 项目中使用，都会给到你对应的语法提示以及文字注释说明。比如在 `goodcloud` 这个 `JS` 项目中：
<img src="../../../assets/code-tip.png" />
尽管我们的项目不是 `TS` 项目，但我们的包是遵循了 `TS` 和 `JSDoc` 规范的，因此编辑器可以正常解析相关提示，给到我们更好的开发体验。
下面是使用举例：

```ts
import { deepCopy } from "@gl/main"
```

## TS Models列表

|名称|描述|类型|泛型参数|继承自|
|---|---|---|---|---|
|AnyObject|基本的任意对象类型|interface|`T = any`| |
|Id | Id类型，暂定只有number和string两种可能 |type| | |
|BaseData | 基础的带有Id的数据 |interface| `T extends Id = string` | |
|SelectOptions | 选择项生成器 |class| T | |
|FormRules | form表单的rules的类型 |type| `T extends Record<string, any> = Record<string, any>` | |
| FormFieldTips |表单tooltip组件的tip数据类型 |interface| | |
| GlInputProps |输入框的props |interface| | `InputProps` |
| CustomPasswordProps |密码框的props |interface| | `InputProps`|
| GlRadioButtonProps |自定义单选按钮props |interface| `T = any`| |
| FormValidateInfo |表单组件的验证信息 |type| `T extends AnyObject = AnyObject`| |
| BaseDrawerProps |公共组件 |interface| | |
| ConfigProviderProps |全局的configProvider的props |interface| | |
|BaseResponse|后端返回的统一数据结构|interface|`T = any`||
|TableDataResponse|后端返回的列表数据的info字段的统一数据结构|interface|`T extends BaseData = BaseData`||
|TableResponse|后端返回的列表数据的数据结构|interface|`T extends BaseData = BaseData`|`BaseResponse<TableDataResponse<T>>`|
|Languages|系统支持的语言枚举|enum|||
|languageLabelMap|语言对应的label映射|`Map<Languages, string>`|||
|languageOptions|语言选择options|`SelectOptions<Languages>[]`|||
|UsernameValidateResult|用户名校验结果|enum|||
|PwdCheckType|校验密码的类型|enum|||


## 工具列表

|名称|描述|类型|其他说明|
|---|---|---|---|
|getFp|获取设备指纹（唯一标识）|(name: string): Promise\<string>||
|format|格式化时间 默认的格式为 'YYYY-MM-DD HH:mm:ss'|(time: ConfigType, format?: string): string||
|formatMinutesToMMSS|将number类型的分钟数转化为mm:ss格式的字符串，比如 12.5 => '12:30'  12.8 => '12:48'  |(minutes: number): string||
|convertTimeToMinutes|把时间转化为分钟数,只是简单的取分钟，不做四舍五入，比如：15:46 => 15  15:10 => 15|(timeString: string): number||
|parseTime|解析时间为字符串|(time: ConfigType, format?: string): string||
|getEncryptionHex|加密数据（字符串） | (value: string, publicKey?: string) => string| 默认秘钥为之前项目中的默认秘钥 |
|getCharRealLength| 获取字符串真实的长度| (str: string) => number||
|debounce|防抖函数|Function|(func: Function, wait?: number, immediate?: boolean): (...args: any[]) => any|
|throttle|节流函数| (fn: Function, delay: number) => Function||
|deepCopy| 深拷贝数据|\<T>(obj: T): T|返回和入参一样的类型|
|equalArray|判断数组是否相等|\<T = any>(arr1: Array\<T>, arr2: Array\<T>) => boolean||
|isObject|判断一个数据是否是JS对象|\<T>(value: T): boolean||
|equalObject|判断两个对象的数据是否一致（只能判断一层，浅比较）|\<T extends AnyObject\<any>>(obj1: T, obj2: T): boolean||
|equalObjectArray| 判断对象数组是否相等|\<T = any>(arr1: Array\<T>, arr2: Array\<T>): boolean||
|findChangeData| 找出老数据中被 编辑 或者 删除 的数据项|\<T extends BaseData\<string>>(oldArray: Array\<T>, newArray: Array\<T>): false | T[]||
|uniqueArr|数组去重（简单的利用Set去重）|\<T>(arr: Array\<T>): Array\<T>||
|getJsonType|获取这个数据的类型 比如 getJsonType(new Array()) => 'Array'|\<T>(val: T): string||
|versionCompare| 比较两个版本大小 目前版本格式有 x.x.x \| x.x \| VB_x.x 三种; VB_是独立的一个系列版本|(version1: string | string[], version2: string | string[]) => 1 | 2 | 0 | 3||
|getBatchApi|获取 配置下发时 需要的 api|(version: any) => "set_batch_config" | "/cloud/goodcloud/batch_set"||
|getBrowserInfo| 获取浏览器基本信息|() => [string, number]||
|filterModelList|对modelList进行处理，相同label只保留一项 |\<T extends {label?: string;}>(modelList: T[]) => any[]||
|copyText|复制字符串到粘贴板|(text: string): Promise\<void>||
|macAddrFormatter|将mac地址转为大写并隔两个加一个冒号 |(mac: string): string||
|ipToNumber| ip 转为 数字|(ip: string): number||
|numberToIp| 数字转 ip|(num: number): string||
|getStartEndIp| 获取起始ip地址|(ip: string, start: number, limit: number) => [string?, string?]||
|getStartAndLimit| 根据 ip 获取 start 和 limit|(ip: string, startIp: string, endIp: string) => [number?, number?]||
|getNetmaskLength| 获取子网掩码的 1 的个数| (netmask: string) => number||
|calculateNetworkAddress| 获取网络号|(ipAddress: string, subnetMask: string): string||
|isSameSubnet| 判断两个地址是否在同一个网段内|(ipAddress1: string, ipAddress2: string, subnetMask: string): boolean||
|calculateAvailableIpCount| 可以提供多少个 子网 ip|(subnetMask: string): number||
|getTimezoneList|获取格式化后的时区列表| () => {value:string;label: string;}[]||
|getZoneNameAndTimezone|将时区按固定字符拆分为数组|(value: string) => string[]||
|joinZoneNameAndTimezone|拼接时区|(zonename: string, timezone: string) => string||
|isValidUsername| 返回true或者字符串（i18n索引），如果返回true则代表校验成功| (name: string): UsernameValidateResult| 请在TS类型表中查看UsernameValidateResult枚举的具体定义 |
|validateURL| 合法url 必须带 http 或 https |(text: string): boolean | |
|validateLowerCase| 小写字母 | (str: string): boolean | |
|validateUpperCase| 大写字母 | (str: string): boolean | |
|validateAlphabets| 大小写字母 | (str: string): boolean | |
|isValidateEmail| 校验邮箱地址|(str: string): boolean | |
|validateMailTo| 校验 mail to|(str: string): boolean | |
|isValidPhoneNumber| 校验电话号码|(str: string): boolean | |
|isValidateEmailCode|校验邮箱验证码 |(str: string): boolean | |
|validateIPSubnetMask|validate ip with subnet mask eg: 192.168.1.0/24 |(str: string): boolean | |
|validatePortS2S|验证端口1 - 65535 不能有 65530 |(str: string): boolean | |
|validatePort|验证端口1 - 65535  |(str: string): boolean | |
|isValidTwoFACode|validate two factor Authenticator code |(str: string): boolean | |
|validateLanIP|validate LAN ip |(str: string): boolean | |
|checkAllowCharacter|验证是否为允许的字符 |(value: string, index?: number) => boolean | |
|checkPasswordSecurity| 验证是否符合字符种类 | (value: string, index?: number) => boolean | |
|checkPassword|校验密码 |(type: PwdCheckType, value: any) => boolean |请在TS类型表中查看PwdCheckType枚举的具体定义 |
|validateNetmask|校验子网掩码 | (ip: string) => boolean| |
|validateIP|校验IP地址方法 | (ip: string) => boolean| |
|validateIPV6CIDR|ipv6 CIDR 正则 | (ip: string) => boolean| |
|validateIPV6|校验IPV6地址方法 | (ip: string) => boolean| |
|validateDomain|校验域名方法 | (domain: string) => boolean| |
|validateZh|校验是否包含中文和中文字符 | (str: string) => boolean| |
|validatePositiveInteger|校验正整数 | (str: string | number) => boolean | |