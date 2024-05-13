<!--
 * @Description: 使用 icon-font 的 svg
    可以开启 悬浮提示， 用法： 首先组件设置 tooltip 属性为true， 然后配置 tooltip 属性
    示例：<gl-svg name="gl-icon-search" tooltip >提示框的文字</gl-svg>
 * @Author: warren
 * @LastEditors: shufei.han
 * @Date: 2023-04-26 17:19:42
 * @LastEditTime: 2024-04-09 11:19:52
-->
<template>
    <span>
        <Tooltip v-if="Props.tooltip" v-bind="$attrs">
            <template #title>
                <slot></slot>
            </template>
            <svg class="gl-icon" aria-hidden="true">
                <use :xlink:href="`#${Props.name}`" />
            </svg>
        </Tooltip>
        <svg v-else class="gl-icon" aria-hidden="true" :color="color">
            <use :xlink:href="`#${Props.name}`" />
        </svg>
    </span>
</template>

<script setup lang="ts">
import {Tooltip} from "ant-design-vue"
const Props = defineProps({
    name: { type: String, default: '' },
    color: { type: String, default: '' },
    tooltip: {
        type: Boolean, default: false,
    },
})

</script>

<style lang="scss" scoped>
.gl-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
