# WIKI

## 简介

cloud-media-sync（**CMS**）--- 云端媒体库同步工具

- 监控 115 文件夹，生成 emby 可以识别的 strm 文件，支持增量，支持 emby302。

- 本项目基于 [python-115⁠](https://github.com/ChenyangGao/web-mount-packs)，懂代码的可以看看，非常强大。

> 致谢：``尽贫·禁评`` ``DDSRem`` [TG 反馈群⁠](https://t.me/+v08KwCO7jH0xNjZl)

## 主要功能

1. 全量同步
2. 增量同步（全自动，依赖 115 生活事件，也就是说你必须打开最近记录）
3. 监控上传（只上传 emby 生成的标准格式的媒体图片）
4. 自动整理（依赖 [MoviePilot⁠](https://github.com/jxxghp/MoviePilot) 进行媒体识别，只进行媒体整理和重命名，不会刮削图片和 nfo，这个交给 emby 就行了）
5. emby302（集成 [emby2Alist⁠](https://github.com/bpking1/embyExternalUrl/tree/main/emby2Alist)）
6. 企业微信菜单交互
7. 115 扫码登录

**CMS** 目前仅支持使用 Docker 容器配置，可参考下述说明（老司机可直接跳过）。

## 新手入门

###  数据持久化

基于 docker 的特性，可以在固定位置创建文件夹作为配置文件(`/config`)的目录，并设置权限(方法如下)，在正常映射了 `/config` 目录的前提下，重置/重建容器不会导致配置丢失。

记得配置好文件夹的权限，避免容器出错，媒体文件夹最好也配置一下权限。（此处操作与 `puid`  `pgid` 两项环境变量有关，）

命令行直接输入一下内容, 其中 `./config` 修改为你的配置文件夹路径。

```bash
chmod -R 777 ./config
```



### 网络

- **CMS** 推荐使用 `tmdb代理`，配置后可加速微信通知图片加载速度，tg 通知需要配置网络服务后，将其填入对应环境变量中才可使用。

- 目前 docker 镜像拉取也需要特殊操作，此部分不详细介绍，可以自行搜索。。

### 环境变量

关键环境变量说明

| 环境变量             | 示例值                 |    必填     | 描述                                                         |
| -------------------- | ---------------------- | :---------: | ------------------------------------------------------------ |
| `ADMIN_USERNAME`     | admin                  |     是      | cms 后台管理账号                                              |
| `ADMIN_PASSWORD`     | admin                  |     是      | cms 后台管理管理密码                                          |
| `EMBY_HOST_PORT`     | http://172.17.0.1:8096⁠ | emby302 必填 | EMBY 地址                                                     |
| `EMBY_API_KEY`       |                        | emby302 必填 | EMBY_API_KEY                                                 |
| `IMAGE_CACHE_POLICY` | 3                      | emby302 必填 | EMBY 图片缓存策略, 包括主页、详情页、图片库的原图 <br />0: 不同尺寸设备共用一份缓存, 先访问先缓存, 空间占用最小但存在小屏先缓存大屏看的图片模糊问题 <br />1: 不同尺寸设备分开缓存, 空间占用适中, 命中率低下, 但契合 emby 的图片缩放处理 <br />2: 不同尺寸设备共用一份缓存, 空间占用最大, 移除 emby 的缩放参数, 直接原图高清显示 <br />3: 关闭 nginx 缓存功能, 已缓存文件不做处理 |

### 安装指引

目前基于 docker 有两种安装方式，推荐使用 compose（或 [portainer](https://github.com/portainer/portainer)）来简化安装步骤，方便后续更新镜像。

除此之外，还有群晖、威联通等第三方界面安装，此处以群晖及 `1Panel` 为例，大家可参考后自行安装。

关键环境变量，请根据前文描述配置后使用，以免安装后影响使用。

#### 命令行安装

**-p** 内容对应容器端口设置，请修改 **: 左边** 内容，**-v** 后的内容为需要映射的 **容器目录**，**-e** 则为 **环境变量** 设置，请根据需求自行修改！！

命令行比较简单，**修改参数后** 复制以下命令到 ssh 工具就行。

```yaml
docker run -itd \
    --name cloud-media-sync \
    --hostname moviepilot-v2 \
    -p 9527:9527 \
    -p 9096:9096 \
    -v ./config:/config \
    -v ./logs:/logs \
    -v ./cache:/var/cache/nginx/emby \
    -v /data/media:/media \
    -e 'PUID=0' \
    -e 'PGID=0' \
    -e 'UMASK=000' \
    -e 'TZ=Asia/Shanghai' \
    -e 'RUN_ENV=online' \
    -e 'ADMIN_USERNAME=admin' \
    -e 'ADMIN_PASSWORD=admin' \
    -e 'EMBY_HOST_PORT=http://172.17.0.1:8096' \
    -e 'EMBY_API_KEY=' \
    -e 'IMAGE_CACHE_POLICY=3' \
    --restart always \
    imaliang/cloud-media-sync:latest
```

#### compose 安装

此处与 dockerhub 界面的介绍本质上是一样的，以下命令中 ports、volumes、及 environment 三处内容，分别对应端口、文件映射以及环境变量。需要编辑这些内容后，复制到 potainer 界面，或者创建 compose 文件进行配置。此处以 potainer 为例进行描述。

```yaml
version: '3.5'
services:
  cloud-media-sync:
    privileged: true
    container_name: cloud-media-sync
    image: imaliang/cloud-media-sync:latest
    net_mode: bridge
    restart: always
    volumes:
      - './config:/config' # 配置文件路径，自行修改！！
      - './logs:/logs' # 日志文件路径，可修改
      - './cache:/var/cache/nginx/emby' # 配置文件路径，自行修改！！
      - '/data/media:/media'
    ports:
      - '9527:9527' # 此端口为CMS访问端口，可修改，不冲突就行
      - '9096:9096' # 此端口为emby302代理端口，可修改，不冲突就行
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022 #以上三项关系到CMS配置文件以及strm文件的权限设置，可以设置为对应账户id，方便操作
      - TZ=Asia/Shanghai #时区设置
      - RUN_ENV=online 
      - ADMIN_USERNAME=admin 
      - ADMIN_PASSWORD=admin 
      - EMBY_HOST_PORT=http://172.17.0.1:8096
      - EMBY_API_KEY=
      - IMAGE_CACHE_POLICY=3
```

首先打开要配置的环境，点击 `堆栈` 页面，`添加堆栈`。

<img src="C:\Users\Administrator\桌面\wiki\assets\堆栈初始化-1735319667482-44.png" style="zoom:60%;" />

然后出现等待部署堆栈的页面，将以上代码复制到网络编辑文本框，如下图，按情况修改参数（端口、环境、文件夹映射）后点击 `部署堆栈` 即可。

随后等待容器初始化完成后，访问对应地址即可进行后续的初始化配置。

<img src="C:\Users\Administrator\桌面\wiki\assets\部署堆栈-1735319914443-47.png" style="zoom: 50%;" />

#### docker 管理界面安装

目前以群晖以及 `1panel` 管理面板为例，讲述 nas 及远程服务器安装方法，大家可举一反三，后续按需求补充其他部署方式。

**群晖**

------

目前手头物理机只有刷入 openwrt 的路由器跟黑裙，所以先以群晖的部署流程进行讲解，极空间、威联通、飞牛这些 nas 系统与群晖布置流程应该差不多，有朋友有兴趣的话可以补充进来。openwrt 目前还没想好要不要用，如有需要可以补充。

群晖可以直接用官方 Container Manager 套件来配置，一般情况下都需要先拉取镜像后才能正确部署容器，此处先讲述群晖如何拉取镜像。

由于特殊原因，目前群晖拉取镜像需要特殊网络，关于网络搭建此处不做展开。

参照图片步骤，点击注册表，搜索 `imaliang/cloud-media-sync`, 双击对应镜像，然后弹出标签选择端口，此处标签代表容器镜像的版本，直接 latest 然后应用就行。

<img src="C:\Users\Administrator\桌面\wiki\assets\群晖镜像-1735318030904-21.png" alt="镜像拉取" style="zoom:60%;" />

拉取完毕，等待群晖下载

<img src="C:\Users\Administrator\桌面\wiki\assets\镜像下载-1735318176139-24-1735318183768-26.png" alt="镜像下载" style="zoom:67%;" />

镜像下载完成后，参照图片步骤创建容器，点击 `容器` 界面，然后点击 `新增`，选择 `imaliang/cloud-media-sync` 镜像，修改容器名称，可选启动自动重新启动，这样群晖每次重启后都可以自动打开 cms 容器，最后点击 `下一步`。

<img src="C:\Users\Administrator\桌面\wiki\assets\创建容器-1735318394436-29.png" alt="创建容器" style="zoom: 67%;" />

端口配置，如图，自行修改服务端口

<img src="C:\Users\Administrator\桌面\wiki\assets\群晖端口-1735318683557-32.png" alt="端口" style="zoom:67%;" />

文件夹映射，如图，点击新增后按照情况选择后修改容器内映射文件夹

<img src="C:\Users\Administrator\桌面\wiki\assets\群晖映射-1735318829879-35.png" alt="文件夹" style="zoom:60%;" />

环境变量配置，如图，需要修改红框内的几个环境变量，各位按照情况修改一下，然后点击 `下一步`

<img src="C:\Users\Administrator\桌面\wiki\assets\环境配置-1735318992245-38.png" style="zoom:60%;" />

随后就到了这样的界面，检查各项配置后点击完成，等待容器初始化即可开始后续配置。

<img src="C:\Users\Administrator\桌面\wiki\assets\确认-1735319058266-41.png" style="zoom:60%;" />



**1Panel**

------

1Panel 跟宝塔面板一样都是 linux 服务器第三方管理工具，个人比较喜欢使用 1Panel，这里就以 1Panel 为例讲述配置过程。

​	1Panel 部署完成后，打开容器页面，点击创建容器，可以看到如下界面：

<img src="C:\Users\Administrator\桌面\wiki\assets\界面介绍-1735311571306-2.png" alt="界面" style="zoom: 50%;" />

​	名称可以随意修改，后续维护时认识就行。镜像如提前拉取过可以直接选择，没有拉取的话，点击手动输入，可以自动拉取。

<img src="C:\Users\Administrator\桌面\wiki\assets\镜像拉取-1735311891390-5.png" alt="镜像拉取" style="zoom: 67%;" />

​	端口直接点击添加就可以配置端口，此处映射关系界面有介绍，与命令行相同，参考图片配置自行就好。

<img src="C:\Users\Administrator\桌面\wiki\assets\端口映射-1735311990541-8.png" alt="端口映射" style="zoom: 67%;" />

​	网络直接桥接就好，点击 bridge。

<img src="C:\Users\Administrator\桌面\wiki\assets\网络-1735312214167-11.png" alt="网络" style="zoom: 67%;" />

​	挂载即为目录映射，点击添加后按照服务器情况自行编辑，`/media` 可以映射到容器内其他目录，请自行修改。

<img src="C:\Users\Administrator\桌面\wiki\assets\挂载映射-1735312365353-14.png" alt="目录" style="zoom: 67%;" />

​	因为 cms 占用并不是很高，容器资源一般不做配置，各位可以自行修改

<img src="C:\Users\Administrator\桌面\wiki\assets\用量配置.png" alt="占用配置" style="zoom:67%;" />

​	环境变量复制粘贴以下内容，按情况修改后，点击确认等待容器初始化完成后即可进行后续配置。

```bash
PUID=0
PGID=0
UMASK=022
TZ=Asia/Shanghai
RUN_ENV=online
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
EMBY_HOST_PORT=http://172.17.0.1:8096
EMBY_API_KEY=
IMAGE_CACHE_POLICY=3
```

<img src="C:\Users\Administrator\桌面\wiki\assets\env.png" alt="环境变量" style="zoom: 67%;" />



### 容器更新

更新时，各代码中 `latset` 标签可根据需要更换为对应的版本标签，一般情况下 latest 即为最新版本，可以不用修改。

- 使用 docker-compose 时，使用以下命令更新到最新境像:

```bash
docker-compose pull imaliang/cloud-media-sync:latest
docker-compose up --force-recreate -d
```

- 手动更新镜像到最新版本，**更新完成后需要重置容器才能应用最新镜像**。

```bash
docker pull imaliang/cloud-media-sync:latest
```

不同的 docker 管理器重置容器的操作方式不同，`群晖docker` 可直接在右键菜单中找到 `重置` 选项；`portainer` 为在容器详情中点击 `重建`；在正常映射了 `/config` 目录的前提下，重置/重建容器不会导致配置丢失。

## 初始化

安装完成后，可以根据设定的端口进入 web 界面，可看到如下界面

<img src="C:\Users\Administrator\桌面\wiki\assets\登陆-1735321219799-49.png" alt="登陆" style="zoom: 40%;" />

然后按照设置的帐密登陆后逐项设置。

### 核心配置

#### 基本设置

- 115网盘配置

如图，需要先配置115cookies之后才能正常使用cms各项功能，此处提供两种方法：

​	抓取cookies后复制到配置文件夹内115-cookies.txt文档内

​	直接网页选择对应设备类型后扫码登陆

配置完成后，检测可用性，提示有效后保存配置即可。

<img src="C:\Users\Administrator\桌面\wiki\assets\115配置-1735321883863-52.png" alt="115" style="zoom: 50%;" />

- strm 相关

这里的配置关系到cms与emby302后公网（外网）能否访问，如有公网访问需求的话请修改为公网ip或自定义域名后保存配置。

<img src="C:\Users\Administrator\桌面\wiki\assets\strm.png" style="zoom:60%;" />

- 企业微信配置

此项配置非必须项，企业微信配置涉及企业微信小程序通知以及远程操作，有需要可以配置。值得注意的是，目前由于企业微信政策要求，企业微信api需要绑定一台固定ip服务器做[消息中转服务器](https://wiki.movie-pilot.org/zh/notification#消息代理服务器)，或者在有动态公网ip的情况下，利用mp插件实现api绑定。

此项配置参考[MP wiki](https://wiki.movie-pilot.org/zh/notification#微信)给出的配置流程，需要先填写好api代理后，在企业微信对应位置填写api才能被企业微信服务器正确识别。cms的[api接收消息url](https://wiki.movie-pilot.org/zh/notification#%E5%BE%AE%E4%BF%A1%E6%B6%88%E6%81%AF%E5%9B%9E%E8%B0%83)与mp不同（web页面有给出，即图中蓝色标框），需要在企业微信对应位置填写正确。

有其他问题可以提需求，酌情补充。

<img src="C:\Users\Administrator\桌面\wiki\assets\企业微信-1735322356408-58.png" alt="企业" style="zoom:60%;" />



- TMDB

此项配置中，`TMDB api`必须配置，否则影响自动整理功能的正常使用。api申请需要注册tmdb账号，待后续补充。

api域名以及图片域名可以使用虎哥推荐的vercel代理应用加速访问，使用企业微信的用户可以配置代理来加速企业微信整理通知的图片加载速度。

<img src="C:\Users\Administrator\桌面\wiki\assets\tmdb-1735323016549-61.png" style="zoom:60%;" />

### 全量同步

该项配置为你要同步到本地的媒体库文件夹，要想实现增量同步，需要正确配置全量同步后才能正常运行。

这里cid为你要同步的115云端文件夹，单击`点击输入`后在对话框输入你需要的目录cid，cid即为浏览器访问115网盘对应文件夹后地址栏内容。

视频文件后缀、媒体文件后缀以及媒体数据文件后缀为要同步的文件后缀名，配置后cms会将包含对应后缀的文件同步到strm文件夹，一般情况下只配置视频文件后缀即可，根据自身情况配置就好。

<img src="C:\Users\Administrator\桌面\wiki\assets\全量-1735323386766-64.png" style="zoom:60%;" />

### 增量同步

增量同步没有过多配置项，只有一个cron表达式，即增量任务执行的时间设置。

cms使用五位cron表达式，从左至右分别对应**秒**、分钟、小时、日期、月份。一般只需配置分秒两位即可，此两项内容可配置为5-59的整数对应不同的时间点，还可以使用*、,、-、/等特殊字符。

`*`表示任意时间点，`,`分割多个时间点，`-`表示时间段，`/`表示间隔一段时间执行。

推荐：

<img src="C:\Users\Administrator\桌面\wiki\assets\增量-1735323847938-70.png" style="zoom:60%;" />

### 自动整理

自动整理基于moviepoliot的识别服务，因此需要配置mp的域名及令牌使cms能够完成操作。

#### 基础配置

mp域名及令牌此处不做赘述，另外三项文件夹cid：

待整理文件夹即你需要整理的文件夹，此处可与订阅文件夹设置相同，达到订阅后自动整理的效果。

已存在文件夹为cms识别后发现媒体库已存在视频后转移的目的文件夹，是否判定为已存在依赖**重命名规则**设置，并非根据视频文件的hd5，sha1等信息比对，请知悉。

冗余数据文件夹，除了常见的视频文件（mp4，mkv等）之外的其他各种文件，包括但不限于媒体及媒体信息文件、字幕文件、媒体信息，注意全量同步的媒体图片与数据文件配置并不适用于自动整理，请待cms整理完成后，根据自身情况选择删除或者自行整理。

<img src="C:\Users\Administrator\桌面\wiki\assets\mp基础-1735324504655-73.png" style="zoom:60%;" />



#### 二级分类策略

此处配置与mp策略相同，但是配置目的地是115文件夹，需要各位根据情况自行配置115文件夹cid。

这里以电影为例，配置动画电影cid为100..1,则当mp识别媒体文件为动画电影后，cms会将其移动cid为到100..1的文件夹。cms分类策略语法与[mp的二级分类语法](https://wiki.movie-pilot.org/zh/advanced#%E4%BA%8C%E7%BA%A7%E5%88%86%E7%B1%BB%E7%AD%96%E7%95%A5)相同，可以根据需要补充内容自定义次级分类。没有识别到类别的内容，都会被整理至未分类文件夹。

另外，这里的cid最好配置在你全量同步设置的媒体库文件夹内，否则将导致整理后同步不到本地媒体库。

```yaml
# 配置电影的分类策略

movie:

  # 分类名仅为标识 不起任何作用

  动画电影:
    ###### cid为115文件夹的cid 必须有 ######
    cid: 1000000000000000001
    # 匹配 genre_ids 内容类型，16是动漫
    genre_ids: '16'
  华语电影:
    cid: 1000000000000000002
    # 匹配语种
    original_language: 'zh,cn,bo,za'

  # 未匹配以上条件时，返回最后一个

  外语电影:
    cid: 1000000000000000003
  tv:
  国漫:
    cid: 1000000000000000004
    genre_ids: '16'
    # 匹配 origin_country 国家，CN是中国大陆，TW是中国台湾，HK是中国香港
    origin_country: 'CN,TW,HK'
  日番:
    cid: 1000000000000000005
    genre_ids: '16'
    # 匹配 origin_country 国家，JP是日本
    origin_country: 'JP'
  # 未匹配以上分类，则命名为未分类

  未分类:
    cid: 1000000000000000012


```

#### 重命名规则

重命名规则即cms整理后的视频文件命名规则，参考变量及语法说明配置即可。

注意这里的配置关系到cms自动整理时判定视频文件是否已存在，需要整理多版本媒体库的用户请根据情况配置。



## 进阶

### 订阅管理



### 神医助手





### 自建 tmdb 代理

可以让 emby 免魔法刮削, 只需要一个域名和 github 账号
https://github.com/imaliang/tmdb-proxy

### mdcx 大姐姐

### 路由器媒体库

### vps