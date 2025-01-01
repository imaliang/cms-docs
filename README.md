**CMS简单入门**

# 简介

cloud-media-sync（**CMS**）--- 云端媒体库同步工具

- 监控 115 文件夹，生成 emby 可以识别的 strm 文件，支持增量，支持 emby302。

- 本项目基于 [python-115⁠](https://github.com/ChenyangGao/web-mount-packs)，懂代码的可以看看，非常强大。

> 致谢：``尽贫·禁评`` ``DDSRem`` [TG 反馈群⁠](https://t.me/+v08KwCO7jH0xNjZl)

# 主要功能

1. [全量同步](https://github.com/HuLuXi/cms-docs/blob/master/%E5%88%9D%E5%A7%8B%E5%8C%96.md#%E5%85%A8%E9%87%8F%E5%90%8C%E6%AD%A5)
2. [增量同步](https://github.com/HuLuXi/cms-docs/blob/master/%E5%88%9D%E5%A7%8B%E5%8C%96.md#%E5%A2%9E%E9%87%8F%E5%90%8C%E6%AD%A5)（全自动，依赖 115 生活事件，也就是说你必须打开最近记录）
3. 监控上传（只上传 emby 生成的标准格式的媒体图片）
4. [自动整理](https://github.com/HuLuXi/cms-docs/blob/master/%E5%88%9D%E5%A7%8B%E5%8C%96.md#%E8%87%AA%E5%8A%A8%E6%95%B4%E7%90%86)（依赖 [MoviePilot⁠](https://github.com/jxxghp/MoviePilot) 进行媒体识别，只进行媒体整理和重命名，不会刮削图片和 nfo，这个交给 emby 就行了）
5. emby302（集成 [emby2Alist⁠](https://github.com/bpking1/embyExternalUrl/tree/main/emby2Alist)）
6. [企业微信菜单交互](https://github.com/HuLuXi/cms-docs/blob/master/%E5%88%9D%E5%A7%8B%E5%8C%96.md#%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E9%85%8D%E7%BD%AE)
7. [115 扫码登录](https://github.com/HuLuXi/cms-docs/blob/master/%E5%88%9D%E5%A7%8B%E5%8C%96.md#115-%E7%BD%91%E7%9B%98%E9%85%8D%E7%BD%AE)

**CMS** 目前仅支持使用 Docker 容器配置，可参考说明。
