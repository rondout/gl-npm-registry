/*
 * @Description: 
 * @Author: shufei.han
 * @LastEditors: shufei.han
 * @Date: 2024-05-10 10:41:15
 * @LastEditTime: 2024-05-10 12:00:35
 */
import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import {commonViteConfig} from "../../vite.config"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "tribiani-npm-registry-docs",
  description: "Tribiani Npm Registry Docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       "@lib":resolve(__dirname, "./lib"),
  //       "@":resolve(__dirname, "./src"),
  //       "@libComponents":resolve(__dirname, "./lib/components"),
  //       "@components":resolve(__dirname, "./src/components"),
  //     }
  //   }
  // }
  vite:commonViteConfig
})
