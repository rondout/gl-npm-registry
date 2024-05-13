import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Provider from "./Provider.vue";


const theme: Theme = {
    // Layout,
    enhanceApp(ctx) {
        ctx.app.component("Provider", Provider)
    },
}

export default {
    ...DefaultTheme, 
    ...theme
}