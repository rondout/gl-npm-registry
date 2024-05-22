<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 09:22:49
 * @LastEditTime: 2024-05-17 10:15:51
-->
<template>
    <Button @click="handleOpen">开启</Button>
    <BaseDrawer show-footer :open="state.open" :title="state.title" @close="handleClose">
        <Input v-model:value="state.username"></Input>
        <Input v-model:value="state.password"></Input>
    </BaseDrawer>
</template>

<script setup lang="ts">
import BaseDrawer from "@libComponents/baseDrawer/BaseDrawer.vue"
import { Button, Input } from "ant-design-vue";
import { reactive } from "vue";

const state = reactive({
    open: false,
    title: "测试抽屉",
    username: 'shufei.han',
    password:'Hsf5898048430'
})

const handleOpen = () => {
    state.open = true
}

const handleClose = () => {
    state.open = false
}
</script>

<style lang="scss" scoped></style>