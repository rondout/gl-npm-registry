<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-07 10:58:06
 * @LastEditTime: 2024-05-10 12:02:49
-->
<template>
    <Button type="primary" @click="add">+</Button>
    <h1>
        HCounter: {{count}}
    </h1>
    <Button @click="minus">-</Button>
</template> 

<script setup lang="ts">
import { ref } from 'vue';
import {Button} from "ant-design-vue"

const props = defineProps<{defaultValue:number}>()

const count = ref(props.defaultValue || 0)

const add = () => count.value++

const minus = () => count.value--
</script> 

<style lang="scss" scoped></style>