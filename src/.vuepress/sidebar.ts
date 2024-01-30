import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "游戏相关",
      icon: "book",
      prefix: "游戏相关/",
      link: "游戏相关/",
      children: "structure",
      // children: [
      //   { text: "cocosCreator2.x", link: "cocosCreator2.x",  },
      //   { text: "cocosCreator3.x", link: "cocosCreator3.x", },
      //   { text: "ccc_shader学习", link: "ccc_shader学习", },
      // ]
    },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
