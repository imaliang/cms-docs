import { defineConfigWithTheme } from 'vitepress';
import { usePosts } from '../src/composables/usePosts';
import type { ThemeConfig } from '../src/types';
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

const { posts, rewrites } = await usePosts({
  pageSize: 10,
  homepage: false,
  srcDir: 'posts',
  autoExcerpt: 150
});

export default defineConfigWithTheme<ThemeConfig>({
  lang: 'zh-CN',
  title: 'CloudMediaSynC',
  titleTemplate: '云端媒体库同步工具',
  description: '云端媒体库同步工具',
  rewrites,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: '/',
  
  themeConfig: {
    posts,
    page: {
      max: 5
    },
    logo: '/profile.png',
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '摘要'
    },

    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/imaliang/cms-docs/edit/master/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },
    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '安装', link: '/install' },
      { text: '图解', link: '/flow' },
      {
        text: '进阶',
        items: [
          { text: '进阶教程', link: '/docs/full-sync' },
          { text: 'CMSHelp', link: 'https://github.com/guyue2005/CMSHelp/wiki' },
        ]
      },
      { text: '捐赠', link: '/donate' },
      { text: 'FAQ', link: '/faq' },

    ],
    sidebar: {
      '/docs': [
        {
          text: 'CMS进阶文档',
          items: [
            { text: '全量同步', link: '/docs/full-sync' },
            { text: '自动整理', link: '/docs/auto-organize' },
            { text: '转存下载', link: '/docs/save-download' },
            { text: '扩展教程', link: '/docs/extend' },
          ]
        },
        {
          text: '插件扩展',
          items: [
            { text: '115分享同步', link: '/docs/share-sync' },
            { text: '媒体库封面生成', link: '/docs/cover' },
          ]
        },
        {
          text: '扩展推荐',
          items: [
            { text: 'tmdb代理', link: '/docs/tmdb' },
            { text: 'vps推荐', link: '/docs/vps' },
          ]
        }
      ]
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1741006546275" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="879" width="200" height="200"><path d="M512 11.37777813A495.616 495.616 0 0 0 11.37777813 501.5324448 491.06488853 491.06488853 0 0 0 353.62133333 967.11111147c25.03111147 4.55111147 34.13333333-10.4675552 34.13333334-23.66577814v-83.28533333c-139.264 29.58222187-168.84622187-65.536-168.84622187-65.536a130.16177813 130.16177813 0 0 0-55.52355627-71.9075552c-45.51111147-30.03733333 3.64088853-29.58222187 3.6408896-29.58222293a105.13066667 105.13066667 0 0 1 76.45866667 50.51733333 107.86133333 107.86133333 0 0 0 145.6355552 40.5048896 106.04088853 106.04088853 0 0 1 31.85777813-65.536c-111.04711147-12.288-227.5555552-54.15822187-227.55555626-242.11911147a188.87111147 188.87111147 0 0 1 50.51733333-132.43733333 172.032 172.032 0 0 1 5.00622293-129.2515552s42.32533333-13.19822187 136.53333334 50.06222187a486.05866667 486.05866667 0 0 1 250.3111104 0c95.57333333-63.2604448 136.53333333-50.06222187 136.53333333-50.06222187a172.032 172.032 0 0 1 5.00622293 129.2515552A188.87111147 188.87111147 0 0 1 830.57777813 475.59111147c0 188.416-117.41866667 229.83111147-227.55555626 242.1191104a113.77777813 113.77777813 0 0 1 34.13333333 91.02222293v134.25777707c0 15.92888853 9.10222187 28.672 34.13333333 23.66577813A491.52 491.52 0 0 0 1012.62222187 501.5324448 495.616 495.616 0 0 0 512 11.37777813" fill="#515151" p-id="880"></path></svg>'
        },
        link: 'https://github.com/imaliang/cms-docs',
      },
      {
        icon: {
          svg: '<svg t="1741006560920" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1030" width="200" height="200"><path d="M205.8432 737.152c-29.184 0-55.68-23.872-55.68-52.992 0-29.12 23.872-52.992 55.68-52.992 31.744 0 55.68 23.872 55.68 52.992 0 29.12-26.56 52.992-55.68 52.992z m683.328-288.64c-5.76-42.432-32-76.8-66.56-103.36l-13.44-10.624-10.88 13.248c-21.12 23.872-29.44 66.24-26.88 97.92 2.56 23.936 10.24 47.744 23.68 66.304-10.88 5.312-24.32 10.624-34.56 15.872-24.32 7.936-48 10.624-71.68 10.624H4.1152l-2.56 15.872a297.6 297.6 0 0 0 24 151.04l10.624 18.56v2.56c64 105.984 177.92 153.6 302.08 153.6 238.72 0 434.56-103.232 527.36-325.76 60.8 2.688 122.24-13.248 151.04-71.488l7.68-13.248-12.8-7.936c-34.56-21.12-81.92-23.872-121.6-13.248z m-341.76-42.432H443.7952V509.44h103.68V406.016z m0-129.792H443.7952V379.52h103.68V276.352z m0-132.48H443.7952V247.04h103.68V143.872z m126.72 262.272H571.1552V509.44h103.296V406.016z m-384 0H187.1552V509.44h103.296V406.016z m129.28 0h-102.4V509.44h103.04V406.016z m-257.28 0H59.7952V509.44h103.68V406.016z m257.28-129.792h-102.4V379.52h103.04V276.352z m-129.92 0h-102.4V379.52h103.04V276.352z" fill="#515151" p-id="1031"></path></svg>'
        },
        link: 'https://hub.docker.com/r/imaliang/cloud-media-sync',
      },
      {
        icon: {
          svg: '<svg t="1741006575829" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1177" width="200" height="200"><path d="M512 16C238 16 16 238 16 512s222 496 496 496 496-222 496-496S786 16 512 16z m243.6 339.8l-81.4 383.6c-6 27.2-22.2 33.8-44.8 21l-124-91.4-59.8 57.6c-6.6 6.6-12.2 12.2-25 12.2l8.8-126.2 229.8-207.6c10-8.8-2.2-13.8-15.4-5l-284 178.8-122.4-38.2c-26.6-8.4-27.2-26.6 5.6-39.4l478.2-184.4c22.2-8 41.6 5.4 34.4 39z" fill="#515151" p-id="1178"></path></svg>'
        },
        link: 'https://t.me/cloud_media_sync',
      }
    ],
    footer: {
      message: '<a href="https://hub.docker.com/r/imaliang/cloud-media-sync" target="_blank" style="display: flex; justify-content: center;"><img src="https://img.shields.io/docker/v/imaliang/cloud-media-sync/latest?label=Version&logo=docker&color=8A2BE2" alt="Docker Version" style="margin-right: 4px;"/><img src="https://img.shields.io/docker/pulls/imaliang/cloud-media-sync?color=ffc107" alt="Docker Pulls"/><img src="https://img.shields.io/github/deployments/imaliang/cms-docs/production?label=Vercel&logo=vercel" alt="Vercel Status" style="margin-left: 4px;"/></a>',
      copyright: `Copyright © 2024-${new Date().getFullYear()} <a href="https://t.me/cloud_media_sync" target="_blank">今晚打老虎</a>`
    },

    search: {
      provider: 'algolia',
      // provider: 'local',
      options: {
        appId: 'RBF5FKZU8U',
        apiKey: '0813f40a2e6a4add25ed8083d89a738c',
        indexName: 'cms-docs',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },
  },


  //markdown配置
  markdown: {
    theme: 'one-dark-pro',
    //行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: { level: [1, 2, 3] },

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    // 组件插入h1标题下
    config: (md) => {
      md.use(MermaidMarkdown);
    }

  },

  vite: {
    plugins: [
      [MermaidPlugin()]
    ],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

  srcExclude: ['README.md', 'note.md']
});
