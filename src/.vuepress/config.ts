import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";


export default defineUserConfig({
  base: "/blogs",
  lang: "zh-CN",
  title: "高乐高加奶",
  description: "高乐高加奶的个人博客",

  theme: hopeTheme({
    pure: false,
  }),

  // Enable it with pwa
  // shouldPrefetch: false,
});
