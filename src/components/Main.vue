<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-10 10:41:15
 * @LastEditTime: 2024-05-13 14:21:41
-->
<template>
  <h1>Main Layout</h1>
  <TestCounter />
  <TestDrawer />
  <ApiTest />
  <RadioButtonTest />
</template> 

<script setup lang="ts">
import TestCounter from "@/components/test/TestCounter.vue"
import TestDrawer from "@/components/test/TestDrawer.vue"
import ApiTest from "@/components/test/ApiTest.vue";
import RadioButtonTest from "@/components/test/RadioButtonTest.vue";

</script> 

<style lang="scss" scoped></style>