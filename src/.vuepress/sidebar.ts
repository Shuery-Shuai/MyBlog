import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "/",
    {
      text: "笔记",
      icon: "mdi:notebook",
      prefix: "笔记",
      children: "structure",
    },
    {
      text: "攻略",
      icon: "material-symbols:strategy",
      prefix: "攻略",
      children: "structure",
    },
    {
      text: "教程",
      icon: "hugeicons:course",
      prefix: "教程",
      children: "structure",
    },
    "关于",
  ],
});
