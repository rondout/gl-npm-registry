<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-10 10:41:15
 * @LastEditTime: 2024-05-22 10:04:50
-->
<script setup lang="ts">
import Main from '@components/Main.vue'
import { Button } from "ant-design-vue"
import { Languages } from "@lib/main"
import { ConfigProvider as BaseProvider } from "@libComponents/index"
import { ref } from 'vue';


const locale = ref(Languages.ZH)

const changeLocale = () => {
  if (locale.value === Languages.EN) {
    locale.value = Languages.ZH
    return
  }
  locale.value = Languages.EN
}

// const theme = computed(() => {
//   return { token: { colorPrimary: '#3f51b5' } }
// })
</script>

<template>
  <!-- <ConfigProvider :theme="theme"> -->
  <BaseProvider :locale="locale" :ant-config-provider-props='{ theme: { token: { colorPrimary:"#36a6b3"}}}'>
    <Button type="primary" @click="changeLocale">{{ locale }}</Button>
    <Main></Main>
  </BaseProvider>
  <!-- </ConfigProvider> -->
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
