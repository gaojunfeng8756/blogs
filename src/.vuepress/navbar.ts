import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text:"游戏相关",
    icon:"book",
    link: "游戏相关",
  },
  // {
  //   text: "博文超链接",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "分帧加载",
  //       icon: "pen-to-square",
  //       prefix: "cocosCreator2.x/",
  //       children: [
  //         { text: "分帧加载", icon: "pen-to-square", link: "分帧加载" },
  //       ],
  //     }
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
