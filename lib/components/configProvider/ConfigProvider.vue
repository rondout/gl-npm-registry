<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-11 09:50:42
 * @LastEditTime: 2024-05-17 14:16:52
-->
<template>
    <AntConfigProvider v-bind="props.antConfigProviderProps">
        <slot />
    </AntConfigProvider>
</template> 

<script setup lang="ts">
import {ConfigProviderProps, Languages} from "@lib/models"
import { BASE_PROVIDER_INJECTION_KEY } from "@lib/models/constants";
import { provide } from "vue";
import { ConfigProvider as AntConfigProvider } from "ant-design-vue";
const props = withDefaults(defineProps<ConfigProviderProps>(), {locale: Languages.EN})

provide(BASE_PROVIDER_INJECTION_KEY, props)
</script> 

<style lang="scss" scoped></style>