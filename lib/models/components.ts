/*
 * @Description: 存放组件的有关类型和数据
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-04-09 16:39:21
 * @LastEditTime: 2024-05-11 09:09:54
 */
import type { AnyObject, SelectOptions } from './base'
import type { InputProps } from 'ant-design-vue'
import type { SizeType } from 'ant-design-vue/es/config-provider'
import { Languages } from './settings';

// 表单tooltip组件的tip数据类型
export interface FormFieldTips {
  valid: boolean;
  tip: string;
}
// 输入框的props
export interface GlInputProps extends InputProps {
  value: string;
  size?: SizeType;
  validate?: boolean;
  tips?: FormFieldTips[];
}
// 密码框的props
export interface CustomPasswordProps extends InputProps {
  value: string;
  tips?: FormFieldTips[];
  width?: string;
  maxWidth?: string;
  autoComplete?: 'on' | 'off';
  validate?: boolean;
}
// 自定义单选按钮props
export interface GlRadioButtonProps<T = any> {
  options: SelectOptions<T>[],
  // v-model绑定的value
  value: T,
  // 是否展示动画效果，默认为true
  animation?: boolean;
  // 是否以大写的方式展示label，默认为true
  uppercase?: boolean;
  // 尺寸
  size?: SizeType;
  // 是否展示tooltip
  showTooltip?: boolean;
  // 一行最多展示多少个tab
  maxTabCount?: number;
}
// 表单组件的验证信息
export type FormValidateInfo<T extends AnyObject = AnyObject> = Map<
  keyof T,
  FormFieldTips[]
>;

// ***************************************公共组件**************************************
export interface BaseDrawerProps {
  open: boolean;
  title: string;
  // content padding
  contentPadding?:string | number;
  // 是否显示遮罩层
  modal?: boolean;
  // 是否点击遮罩可关闭（准确说是出发关闭操作）
  maskCloseable?: boolean;
  // 是否是第二层抽屉，默认为false，需要使用者控制这个参数
  isSecondLevel?: boolean;
  // 是否被第二层抽屉罩住了，默认false，需要使用者控制这个参数
  wrapped?: boolean;
  // 是否展示默认footer
  showFooter?: boolean;
  // 如果展示默认footer，是否展示确认按钮
  showOkButton?: boolean;
  // 如果展示默认footer，是否展示取消按钮
  showCancelButton?: boolean;
  // 如果展示默认footer，是否自定义确认按钮的文字
  okText?: string;
  // 如果展示默认footer，是否自定义取消按钮的文字
  cancelText?: string;
  // 尺寸
  size?: SizeType;
  // 二级抽屉的大小
  secondSize?: SizeType;
  // 在Ok完成前
  beforeOk?: (done: (result: boolean) => void) => void;
}

export interface ConfigProviderProps {
  locale: Languages
}