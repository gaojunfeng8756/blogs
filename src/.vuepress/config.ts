import { defineUserConfig } from "vuepress";
import theme from "./theme.js";



export default defineUserConfig({
  base: "/blogs",
  lang: "zh-CN",
  title: "高乐高加奶",
  description: "高乐高加奶的个人博客",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
