<!--
 * @Description: 按钮选择组件，注册等界面用到
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-03-29 18:09:52
 * @LastEditTime: 2024-05-16 16:17:40
-->
<template>
    <div
        :class="{
            'radio-btn-container': true,
            'radio-btn-container-middle': size === 'middle',
        }"
    >
        <div :class="{'radio-btn-left-container': true, 'radio-btn-left-container-animation':animation, 'radio-btn-left-container-multiline':multiLine}">
            <div v-for="(optionTabs, index) of computedTabsList" :key="index" style="position: relative; z-index: 1;">
                <div
                    v-show="showMore || (index === 0)"
                    class="radio-btn-content"
                >
                    <div
                        v-for="item of optionTabs"
                        :key="item.value"
                        :class="{
                            'radio-btn-item': true,
                            'radio-btn-item-uppercase': uppercase,
                            'radio-btn-item-selected': checkSelected(item.value),
                        }"
                        :style="{ maxWidth: radioBtnScrollLabelStyles.width }"
                        @click="handleCheck(item.value)"
                    >
                        <Tooltip
                            v-if="showTooltip"
                            :title="item.label"
                            placement="top"
                        >
                            <div
                                class="radio-btn-item-label"
                            >
                                {{ item.label }}
                            </div>
                        </Tooltip>
                        <div
                            v-else
                            class="radio-btn-item-label"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="radio-btn-item-selected radio-btn-item radio-btn-scroll-label"
                :style="radioBtnScrollLabelStyles"
            >
                &nbsp;
            </div>
        </div>
        <div v-if="multiLine" :class="{'multiline-trigger': true, 'multiline-trigger-open': showMore}" @click="toggleShowMore">
            <GlSvg name="gl-npm-bars-regular" />
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends Id">
import { GlRadioButtonProps, Id } from '@lib/models';
import { computed, ref } from 'vue'
import { GlSvg } from "@lib/components"
import { Tooltip } from 'ant-design-vue';

const props = withDefaults(defineProps<GlRadioButtonProps<T>>(), {
    // 选项options数组，数据类型为 {value: any; label: string}[]
    options:() => [],
    // 是否展示动画效果，默认为true
    animation: true,
    // 是否以大写的方式展示label，默认为true
    showTooltip:false,
    uppercase: true,
    size: 'large'
})

const emits = defineEmits(['input', 'update:value'])
const showMore = ref(false)

// 判断是否选中
const checkSelected = (value) => {
    return value === props.value
}
// 是否展示多排
const multiLine = computed(() => {
    if (typeof props.maxTabCount === 'number') {
        return props.options?.length > props.maxTabCount
    }
    return false
})
// 计算多排的tabs
const computedTabsList = computed(() => {
    const { options = [], maxTabCount } = props
    try {
        if (!multiLine.value) {
            return [options]
        }
        const tabs = []
        const lines = Math.ceil(options.length / maxTabCount)
        for (let i = 0; i < lines; i++) {
            tabs.push(options.slice(i * maxTabCount, (i + 1) * maxTabCount))
        }
        return tabs
    } catch (error) {
        return [options]
    }
})
// 计算滚动的label的样式
const radioBtnScrollLabelStyles = computed(() => {
    try {
        const { maxTabCount, options, value, size } = props
        // 一行最多显示的tabs数量
        const oneLineCount = multiLine?.value ? maxTabCount : options.length
        // 宽度
        const width = (1 / oneLineCount) * 100 + '%'
        // 计算当前被选中的是第几个
        const selectedIndex = options.findIndex(
            (option) => option.value === value
        )
        // 计算出left属性的值
        let left = "0px"
        if (multiLine.value) {
            // 如果是多行显示
            left =
                selectedIndex && ((selectedIndex % props.maxTabCount) / oneLineCount) * 100 + '%'
        } else {
            // 如果单行显示
            left = selectedIndex && ((selectedIndex % options.length) / oneLineCount) * 100 + '%'
        }
        // 计算top的值
        let top = "0px"
        // if()
        // 算出该tab在第几排
        const currentTabRow = Math.ceil((selectedIndex + 1) / maxTabCount)
        if (multiLine.value) {
            // 如果存在多排的情况，算出当前在第几排
            // 计算没排之间的间距
            const rowGutter = size === 'middle' ? 28 : 32
            top = ((currentTabRow - 1) * rowGutter).toString() + 'px'
        }
        // 如果当前不在第一排并且showMore为false，就隐藏
        const display = (!showMore.value && currentTabRow > 1) ? 'none' : undefined
        return { width, left, top, display }
    } catch (error) {
        return {}
    }
})

const toggleShowMore = () => {
    showMore.value = !showMore.value
}

const handleCheck = (value) => {
    emits('input', value)
    emits('update:value', value)
}
</script>

<style lang="scss">
.radio-btn-container {
    // height: 42px;
    box-sizing: border-box;
    border-radius: 20px;
    border: 1px solid #D9D9D9;
    padding: 4px;
    user-select: none;
    display: flex;
    align-items: flex-start;
    .radio-btn-left-container {
        width: 100%;
        position: relative;
        .radio-btn-content {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 32px;
        }
        .radio-btn-item {
            height: 32px;
            border-radius: 17px;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            white-space: nowrap;
            .radio-btn-item-label {
                padding: 0 16px;
                width: 100%;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
            }
        }
        .radio-btn-item-uppercase {
            text-transform: uppercase;
        }
        .radio-btn-item-selected {
            color: #fff;
        }
        .radio-btn-scroll-label {
            background-color: #36a6b3;
            position: absolute;
            left: 0;
        }
    }

    .radio-btn-left-container-multiline {
        width: calc(100% - 48px);
    }
    .radio-btn-left-container-animation {
        .radio-btn-item {
            transition: color 0.3s;
        }
        .radio-btn-scroll-label {
            transition: left,top, 0.3s;
        }
    }
    .multiline-trigger {
        cursor: pointer;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
            color: rgba(0,0,0,0.65);
            &:hover {
                color: rgba(0,0,0,.45);
            }
    }
    .multiline-trigger-open {
        svg {
            color: #36a6b3;
        }
    }
}
.radio-btn-container-middle {
    padding: 3px;
    .multiline-trigger {
        height: 28px;
    }
    .radio-btn-left-container {
        // height: 36px;
        .radio-btn-content {
            height: 28px;
        }
        .radio-btn-item {
            height: 28px;
            border-radius: 14px;
        }
        .multiline-trigger {
            height: 28px;
        }
    }
}
</style>
