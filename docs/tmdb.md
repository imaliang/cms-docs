## tmdb代理

创建一个tmdb代理，直接替代api.themoviedb.org和image.tmdb.org去访问tmdb，从而达到不需要开代理就可以流畅刮削emby的目的。


## 简介
[tmdb-proxy](https://github.com/imaliang/tmdb-proxy)

这是一个利用Vercel代理tmdb接口的仓库。

完全免费，但是每月有100GB流量限制，自用的话是完全够用的。


## 部署
[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaliang/tmdb-proxy)


## 使用方法

1. 部署。部署有两种方法：
    + 一是直接点击上方按钮一键部署。
    + 二是先fork本项目，再登录 [Vercel](https://vercel.com/) 选择自己的仓库新建。


2. 绑定自己的域名(必须，因为自带的域名vercel.app在国内基本不可用，这个域名最好托管在国内dns上) 
    + 如果你没有域名，可以去 [腾讯云活动域名](https://curl.qcloud.com/ScJY3Hev) 注册一个，新用户1元1年。

3. 你自己绑定的域名就是tmdb的代理域名，会代理 api.themoviedb.org 和 image.tmdb.org
