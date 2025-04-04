import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "品毅的博客",
  description: "网络日记——唰唰记录，哐哐分享！",

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,
});
