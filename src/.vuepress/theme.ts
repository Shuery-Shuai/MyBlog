import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

import { cut } from "nodejs-jieba";

export default hopeTheme({
  hostname: "https://life.shuery.lssa.fun",

  author: {
    name: "品毅",
    url: "https://shuery.lssa.fun",
  },

  logo: "/logo.svg",

  repo: "Shuery-Shuai/My_Blog",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer:
    "唰唰记录，哐哐分享！<br />博客内容遵循 <a href='/LICENSE'>CC-BY-SA-4.0</a> 知识共享许可协议。",
  displayFooter: true,

  // 打印
  // print: true,

  // 全屏
  fullscreen: true,

  // 专注模式
  focus: true,

  // 博客相关
  blog: {
    description: "平凡之人不平凡",
    intro: "/关于.html",
    medias: {
      BiliBili: "https://bilibili.com",
      Email: "https://outlook.com",
      Gitee: "https://gitee.com",
      GitHub: "https://github.com",
      Gitlab: "https://gitlab.com",
      Gmail: "https://gmail.com",
      QQ: "https://im.qq.com",
      Steam: "https://steampowered.com",
    },
  },

  // 加密配置
  encrypt: {
    config: {
      "/笔记/公务员/": {
        password: ["159753"],
        hint: "！！！暂未完成！！！",
      },
      "/笔记/英语": {
        password: "753951",
        hint: "！！！暂未完成！！！",
      },
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "编辑此页",
  },

  // 文章信息展示 。
  pageInfo: [
    "Author",
    "Date",
    "Original",
    "Category",
    "Tag",
    "ReadingTime",
    "Word",
    "PageView",
  ],

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    math: {
      // 启用前安装 katex
      type: "katex",
      // 或者安装 mathjax-full
      // type: "mathjax",
    },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: {
      excerptLength: 0,
    },

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    comment: {
      provider: "Waline",
      serverURL: "https://waline.blog.shuery.lssa.fun/",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      // prefix: "iconify-",
      assets: "iconify",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },

    slimsearch: {
      // 索引全部内容
      indexContent: true,
      indexOptions: {
        // 使用 nodejs-jieba 进行分词
        tokenize: (text, fieldName) =>
          fieldName === "id" ? [text] : cut(text, true),
      },
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "分类：$content",
          },
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "标签：$content",
          },
        },
      ],
    },
  },
});
