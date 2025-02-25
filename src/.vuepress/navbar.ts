import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "笔记",
    icon: "mdi:notebook",
    prefix: "/笔记/",
    children: [
      {
        text: "大数据技术",
        icon: "fa6-solid:chart-simple",
        prefix: "大数据技术/",
        children: [
          {
            text: "大数据分析",
            icon: "fa6-solid:magnifying-glass-chart",
            link: "大数据分析",
          },
        ],
      },
      {
        text: "公务员",
        icon: "fa:briefcase",
        prefix: "公务员/",
        children: [
          {
            text: "判断推理",
            icon: "fa6-brands:think-peaks",
            link: "判断推理/",
          },
        ],
      },
      {
        text: "英语",
        icon: "icon-park-solid:english",
        prefix: "英语/",
        children: [
          {
            text: "单词本",
            icon: "streamline:dictionary-language-book-solid",
            link: "单词本/",
          },
        ],
      },
    ],
  },
  {
    text: "攻略",
    icon: "material-symbols:strategy",
    prefix: "/攻略/",
    children: [
      {
        text: "游戏",
        icon: "token:game",
        prefix: "游戏/",
        children: [
          { text: "原神", icon: "arcticons:genshin-impact", link: "原神/" },
        ],
      },
    ],
  },
  {
    text: "教程",
    icon: "hugeicons:course",
    prefix: "/教程/",
    children: [
      {
        text: "操作系统",
        icon: "grommet-icons:system",
        prefix: "操作系统/",
        children: [
          { text: "Linux", icon: "mingcute:linux-fill", link: "Linux/" },
        ],
      },
      {
        text: "应用程序",
        icon: "streamline:application-add-solid",
        prefix: "应用程序/",
        children: [
          { text: "云崽", icon: "fluent:bot-sparkle-28-filled", link: "云崽/" },
          { text: "Ja-Netfilter", icon: "solar:filter-bold-duotone", link: "Ja-Netfilter/" },
          { text: "Termux", icon: "arcticons:termux", link: "Termux/" },
        ],
      },
    ],
  },
]);
