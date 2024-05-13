<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-13 11:47:09
 * @LastEditTime: 2024-05-13 12:24:35
-->
<template>
<Button type="primary" @click="handleLogin">发送登录请求</Button>
</template> 

<script setup lang="ts">
  import { login } from "@/api";
import {Button} from "ant-design-vue"

const getPparams = async () => {

    return {
        name: 'lihengtong',
        password: 'D3nhj3Q4PRkhChjnqQjpOkAfFSYHgp6abTxhUq/zwQA9VW1cuIGE625eq6cSz65QpPFo2SWO/lV7VxVaXnns8g==',
        deviceId: '17291ed36c4c939e384cfa88fc6ccc68'
    
    }
} 
  const handleLogin = async () => {
    login(await getPparams() )
  }
</script> 

<style lang="scss" scoped></style>