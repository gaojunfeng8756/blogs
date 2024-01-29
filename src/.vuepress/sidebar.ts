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
      prefix: "游戏相关",
      link:"游戏相关",
      children: [
          { text: "cocosCreator2.x", icon: "pen-to-square", link: "cocosCreator2.x" },
          { text: "cocosCreator3.x", icon: "pen-to-square", link: "cocosCreator3.x" },
        ]
    },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
