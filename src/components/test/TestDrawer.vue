<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 09:22:49
 * @LastEditTime: 2024-05-11 09:27:56
-->
<template>
    <Button @click="handleOpen">开启</Button>
    <BaseDrawer show-footer :open="state.open" :title="state.title" @close="handleClose">123</BaseDrawer>
</template>

<script setup lang="ts">
import BaseDrawer from "@libComponents/baseDrawer/BaseDrawer.vue"
import { Button } from "ant-design-vue";
import { reactive } from "vue";

const state = reactive({
    open: false,
    title: "测试抽屉"
})

const handleOpen = () => {
    state.open = true
}

const handleClose = () => {
    state.open = false
}
</script>

<style lang="scss" scoped></style>