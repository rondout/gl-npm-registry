<!--
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-13 11:47:09
 * @LastEditTime: 2024-05-23 10:30:00
-->
<template>
  <div>
    <Button type="primary" @click="handleLogin(true)">发送登录请求</Button>
    <Button type="primary" @click="handleLogin(false)">发送失败的登录请求</Button>
  </div>
  <div>
    <Button type="primary" @click="handleLoginOld(true)">发送登录请求Old</Button>
    <Button type="primary" @click="handleLoginOld(false)">发送失败的登录请求Old</Button>
  </div>
</template>

<script setup lang="ts">
import { login, loginOld } from "@/api";
import { Button } from "ant-design-vue";

const getPparams = async () => {
  return {
    name: "hanshufei",
    password:
      "NvomWRcZLRcl2y5AAcVB5uGGuYv3yprldtaKzbk52+qQzSPgd1diLLdDFVf6KUoD1T03irRw7RVhncVSSmOtNg==",
    deviceId: "09a8284328adacf2c5355a1b08d63caf",
  };
};
const handleLogin = async (success: boolean) => {
  try {
    const data = await login((success? await getPparams(): {}));
    console.log("登录成功", data);
  } catch (error) {
    console.log("登录失败", error);
  }
};

const handleLoginOld = async (success: boolean) => {
  try {
    const data = await loginOld((success? await getPparams(): {}));
    console.log("登录成功", data);
  } catch (error) {
    console.log("登录失败", error);
  }
};
</script>

<style lang="scss" scoped></style>
