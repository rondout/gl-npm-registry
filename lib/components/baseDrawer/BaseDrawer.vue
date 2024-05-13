<!--
 * @Description: 公共的抽屉组件
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-04-11 09:38:44
 * @LastEditTime: 2024-05-11 10:08:52
-->
<template>
    <Drawer :rootClassName="customClass"
              :closable="false"
              :open="props.open"
              :maskClosable="props.maskCloseable"
              :modal="props.modal"
              @close="handleClose"
              style="width: unset">
        <!-- title -->
        <template #title>
            <div class="base-drawer-header">
                <slot name="title">
                    <div class="base-drawer-title">
                        {{ props.title }}
                    </div>
                </slot>
                <div class="base-drawer-close" @click="handleClose">
                    <GlSvg name="gl-icon-wrong" class="base-drawer-close-icon" />
                </div>
            </div>
        </template>
        <div :class="{'base-drawer-content': true, 'base-drawer-content-with-padding': !props.contentPadding}" :style="{padding: props.contentPadding}">
            <!-- content -->
            <slot />
        </div>
        <!-- footer -->
        <div v-if="props.showFooter" class="base-drawer-footer">
            <div class="base-drawer-footer-content">
                <slot name="footer">
                    <div class="base-drawer-footer-btns">
                        <Button v-if="footerBtnConfig.cancel.show"
                                  round
                                  class="drawer-btn drawer-btn-cancel"
                                  :disabled="confirmLoading"
                                  @click="handleClose">
                            {{ footerBtnConfig.cancel.text }}
                        </Button>
                        <Button v-if="footerBtnConfig.ok.show"
                                  round
                                  class="drawer-btn drawer-btn-ok"
                                  type="primary"
                                  :loading="confirmLoading"
                                  @click="handleConfirm">
                            {{ footerBtnConfig.ok.text }}
                        </Button>
                    </div>
                </slot>
            </div>
        </div>
    </Drawer>
</template>

<script setup lang="ts">
// import i18n from '@/lang'
import type { BaseDrawerProps } from '@lib/models/components'
import type { SizeType } from 'ant-design-vue/es/config-provider'
import { computed, ref } from 'vue'
import { Drawer, Button } from 'ant-design-vue';
import useGlobalConfigInject from '@lib/hooks/useGlobalConfig';
// const { t } = i18n.global
const {t} = useGlobalConfigInject()

const props = withDefaults(defineProps<BaseDrawerProps>(), {
    // open
    open: false,
    // 标题
    title: '',
    // 是否显示遮罩层
    modal: true,
    // 是否点击遮罩可关闭（准确说是出发关闭操作）
    maskCloseable: false,
    // 是否是第二层抽屉，默认为false，需要使用者控制这个参数
    isSecondLevel: false,
    // 是否被第二层抽屉罩住了，默认false，需要使用者控制这个参数
    wrapped: false,
    // 是否展示默认footer
    showFooter: false,
    // 如果展示默认footer，是否展示确认按钮
    showOkButton: true,
    // 如果展示默认footer，是否展示取消按钮
    showCancelButton: true,
    // 如果展示默认footer，是否自定义确认按钮的文字
    okText: '',
    // 如果展示默认footer，是否自定义取消按钮的文字
    cancelText: '',
    // 尺寸
    size: 'large' as SizeType,
    // 二级抽屉的大小
    secondSize: 'large' as SizeType,
    // 在Ok完成前
    beforeOk: null,
})

const sizeToClassMap = new Map([
    ['large', { className: 'base-drawer-large', sort: 2 }],
    ['middle', { className: 'base-drawer-middle', sort: 1 }],
    ['small', { className: 'base-drawer-small', sort: 0 }],
])
// 自定义事件
const emits = defineEmits<{ (e: 'close'): void; (e: 'ok'): void }>()
// 确认按钮的loading状态，同时用来控制取消按钮是否disabled（确认按钮加载中，则不能点击取消按钮）
const confirmLoading = ref(false)
// 计算类名，需要根据各种不同的场景给我具体的类名，然后根据类名写样式
const customClass = computed(() => {
    console.log(props.size)

    const sizeSort = sizeToClassMap.get(props.size).sort
    const secondSizeSort = sizeToClassMap.get(props.secondSize).sort
    // 注：之所以写成对象是为了看得更清楚每个类名的来源，因为这里情况比较复杂，UI要求有几种情况：一二层宽度一样、一层宽于二层、二层宽于一层
    const classObject = {
        'base-drawer': true,
        [sizeToClassMap.get(props.size).className]: true,
        // 是否是二层
        'base-drawer-second': props.isSecondLevel,
        // 是否被罩住
        'base-drawer-wrapped': props.wrapped,
        // 一样宽
        'same-size-wrapped': props.wrapped && props.size === props.secondSize,
        // 一层更宽
        'bigger-size-wrapped': props.wrapped && (sizeSort > secondSizeSort),
        // // 二层更宽
        // 'smaller-size-wrapped': props.wrapped && (sizeSort < secondSizeSort),
        // 第一层middle，第二层large
        'current-middle-second-large': props.wrapped && props.size === 'middle' && props.secondSize === 'large',
        // 第一层small，第二层large
        'current-small-second-large': props.wrapped && props.size === 'small' && props.secondSize === 'large',
        // 第一层small，第二层middle
        'current-small-second-middle': props.wrapped && props.size === 'small' && props.secondSize === 'middle',
    }
    return Object.entries(classObject).filter(([_, value]) => !!value).map(([key]) => key).join(' ')
})

// 底部按钮有关的配置
const footerBtnConfig = computed(() => {
    return {
        ok: { show: props.showOkButton, text: props.okText || t('confirm') },
        cancel: { show: props.showCancelButton, text: props.cancelText || t('cancel') },
    }
})
// 触发关闭操作
const handleClose = () => {
    emits('close')
}
// 点击确认触发
const handleConfirm = async () => {
    // 判断有没有传入beforeOk
    const beforeOkRegistered = props.beforeOk && props.beforeOk instanceof Function
    if (!beforeOkRegistered) {
        emits('ok')
        return
    }
    confirmLoading.value = true
    // 如果有自定义beforeOk
    props.beforeOk((result: boolean) => {
        confirmLoading.value = false
        if (result) {
            // 如果回调传回来的是true，则认为这次操作完成，关闭弹窗
            handleClose()
        }
    })
}
</script>

<style lang="scss">
.base-drawer {
    .ant-drawer-content-wrapper {
        width: 60vw !important;
    }

    transition: height,
    top,
    0.3s;

    .ant-drawer-header {
        min-height: 64px;
        box-sizing: border-box;
        padding: 0 20px;
        margin: 0;
        border-bottom: none;

        .base-drawer-close {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            height: 32px;
            width: 32px;

            .base-drawer-close-icon {
                color: var(--gl-text-3);
            }
        }

        .base-drawer-header {
            height: 64px;
            border-bottom: 1px solid #0f141414;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;

            .base-drawer-title {
                font-size: 20px;
            }
        }
    }

    .base-drawer-content {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
    }
    
    .base-drawer-content-with-padding {
        padding: 24px 40px;
    }

    .base-drawer-footer {
        height: 84px;
        min-height: 84px;
        padding: 0 20px;

        .base-drawer-footer-content {
            border-top: 1px solid #0f141414;
            height: 100%;

            .base-drawer-footer-btns {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 20px;

                .drawer-btn {
                    font-size: 14px;
                }

                .drawer-btn-ok {
                    font-size: 14px;
                    height: 32px;
                    padding: 0 16px;
                    margin-left: 8px;
                }
            }
        }
    }

    .ant-drawer-body {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 0;
    }
}

.base-drawer-middle {
    .ant-drawer-content-wrapper {
        width: 760px !important;
    }
}

.base-drawer-small {
    .ant-drawer-content-wrapper {
        width: 320px !important;
    }
}

.same-size-wrapped,
.bigger-size-wrapped {
    // 在一二层大小相同或者第一层更大的时候需要一层向左推出去
    right: 24px
}

.current-middle-second-large {
    // 760 - 24 = 736
    right: calc(60vw - 736px);
}

.current-small-second-large {
    // 320 - 24 = 296
    right: calc(60vw - 296px);
}

.current-small-second-middle {
    // 760 - 320 + 24 = 464
    right: 464px;
}

// 当百分之60已经小于720的时候（720 / 0.6 = 1266），就保持720的宽度
@media screen and (max-width: 1266px) {
    .base-drawer {
        .ant-drawer-content-wrapper {
            width: 760px !important;
        }
    }

    .base-drawer-small {
        .ant-drawer-content-wrapper {
            width: 320px !important;
        }
    }

    .current-middle-second-large {
        // 760 - 24 = 736
        right: 24px;
    }

    .current-small-second-large {
        // 760 - 320 + 24 = 416
        right: 464px;
    }
}

@media screen and (max-width: 784px) {
    .base-drawer {
        .ant-drawer-content-wrapper {
            width: calc(100% - 24px) !important;
        }
    }

    .base-drawer-small {
        .ant-drawer-content-wrapper {
            width: 320px !important;
        }
    }

    .current-small-second-large {
        // 320 - 24 = 296
        right: calc(100% - 296px);
    }

    .current-small-second-middle {
        // 320 - 24 = 296
        right: calc(100% - 296px);
    }
}

.custom-drawer-wrapper+.v-modal {
    // background-color: red;
    opacity: 0.3;
}
</style>
