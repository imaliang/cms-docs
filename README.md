**CMS简单入门**

# 简介

cloud-media-sync（**CMS**）--- 云端媒体库同步工具

- 监控 115 文件夹，生成 emby 可以识别的 strm 文件，支持增量，支持 emby302。

- 本项目基于 [python-115⁠](https://github.com/ChenyangGao/web-mount-packs)，懂代码的可以看看，非常强大。

> 致谢：``尽贫·禁评`` ``DDSRem`` [TG 反馈群⁠](https://t.me/+v08KwCO7jH0xNjZl)

# 主要功能

1. 全量同步
2. 增量同步（全自动，依赖 115 生活事件，也就是说你必须打开最近记录）
3. 监控上传（只上传 emby 生成的标准格式的媒体图片）
4. 自动整理（依赖 [MoviePilot⁠](https://github.com/jxxghp/MoviePilot) 进行媒体识别，只进行媒体整理和重命名，不会刮削图片和 nfo，这个交给 emby 就行了）
5. emby302（集成 [emby2Alist⁠](https://github.com/bpking1/embyExternalUrl/tree/main/emby2Alist)）
6. 企业微信菜单交互
7. 115 扫码登录

**CMS** 目前仅支持使用 Docker 容器配置，可参考说明。
