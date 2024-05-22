<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-10 11:37:33
 * @LastEditTime: 2024-05-17 16:36:52
-->
<template>
    <h1>This is Counter component test page</h1>
    <HCounter :default-value="5" />
    <h2>{{ anyObj.title }}</h2>
</template> 

<script setup lang="ts">
import { HCounter } from '@lib/components';
import { type AnyObject } from '@lib/models';
import { deepCopy } from '@lib/tools';
// import {} from "../"
deepCopy
const anyObj:AnyObject = {title: "anyObj"}
// import { deepCopy, isObject } from "@lib/tools";
// isObject

</script> 

<style lang="scss" scoped></style>