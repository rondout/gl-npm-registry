<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-13 15:34:37
 * @LastEditTime: 2024-05-16 15:42:55
-->
<template>
    <!-- <GlSvg name="gl-icon-bars-regular" /> -->
    <!-- <GlRadioButtons v-model:value="state.selectedTab" :options="btnConfigListComputed" :max-tab-count="4" /> -->
    <RadioButtons v-model:value="state.selectedTab" :options="btnConfigListComputed" :max-tab-count="4" />
</template> 

<script setup lang="ts">
import RadioButtons from "@libComponents/formFields/glRadioButtons.vue"
import { reactive } from "vue"

const state = reactive({
    selectedTab: JSON.stringify({ size: 'large', secondSize: 'large' })
})

const btnConfigList = [
    { label: '两层一样大(large)', value: { size: 'large', secondSize: 'large' } },
    { label: '两层一样大(middle)', value: { size: 'middle', secondSize: 'middle' } },
    { label: '两层一样大(small)', value: { size: 'small', secondSize: 'small' } },
    { label: '第一层更大(1-large, 2-middle)', value: { size: 'large', secondSize: 'middle' } },
    { label: '第一层更大(1-large, 2-small)', value: { size: 'large', secondSize: 'small' } },
    { label: '第一层更大(1-middle, 2-small)', value: { size: 'middle', secondSize: 'small' } },
    { label: '第二层更大(1-small, 2-middle)', value: { size: 'small', secondSize: 'middle' } },
    { label: '第二层更大(1-small, 2-large)', value: { size: 'small', secondSize: 'large' } },
    { label: '第二层更大(1-middle, 2-large)', value: { size: 'middle', secondSize: 'large' } },
]

const btnConfigListComputed = btnConfigList.map(v => ({ label: v.label, value: JSON.stringify(v.value) }))
</script> 

<style lang="scss" scoped></style>