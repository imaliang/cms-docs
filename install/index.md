# CMS 快速安装

> [!WARNING]
> 本项目仅用于个人测试使用，请部署在局域网内使用，禁止放在公网使用，禁止任何商业行为。

> [!WARNING]
> 假设你已经已安装好 docker 和 docker-compose

## 1. 配置启动参数

创建`cms`文件夹，并在 cms 文件夹下创建`cms.yml`文件，内容如下

选择一个网络模式进行安装，建议使用`bridge`网络模式

::: code-group

```yaml [bridge网络模式]
services:
  cloud-media-sync:
    privileged: true
    container_name: cloud-media-sync
    image: imaliang/cloud-media-sync:latest
    restart: always
    network_mode: bridge
    volumes:
      - "./config:/config"
      - "./logs:/logs"
      - "./cache:/var/cache/nginx/emby"
      - "/data/media:/media"
    ports:
      - "9527:9527"
      - "9096:9096"
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
      - TZ=Asia/Shanghai
      - RUN_ENV=online
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=admin
      - CMS_API_TOKEN=cloud_media_sync
      - EMBY_HOST_PORT=http://172.17.0.1:8096
      - EMBY_API_KEY=xxx
      - DONATE_CODE=CMS_XXX_XXX
```

```yaml [host网络模式]
services:
  cloud-media-sync:
    privileged: true
    container_name: cloud-media-sync
    image: imaliang/cloud-media-sync:latest
    restart: always
    network_mode: host
    volumes:
      - "./config:/config"
      - "./logs:/logs"
      - "./cache:/var/cache/nginx/emby"
      - "/data/media:/media"
    environment:
      - PUID=0
      - PGID=0
      - UMASK=022
      - TZ=Asia/Shanghai
      - RUN_ENV=online
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=admin
      - CMS_API_TOKEN=cloud_media_sync
      - EMBY_HOST_PORT=http://172.17.0.1:8096
      - EMBY_API_KEY=xxx
      - DONATE_CODE=CMS_XXX_XXX
```

:::

| 环境变量             | 示例值                 | 必填 | 描述                                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ---------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADMIN_USERNAME`     | admin                  | 是   | 账号                                                                                                                                                                                                                                                                                                                                                              |
| `ADMIN_PASSWORD`     | admin                  | 是   | 密码                                                                                                                                                                                                                                                                                                                                                              |
| `CMS_API_TOKEN`      | cloud_media_sync       | 否   | cms 的 api token                                                                                                                                                                                                                                                                                                                                                  |
| `EMBY_HOST_PORT`     | http://172.17.0.1:8096 | 是   | EMBY 地址                                                                                                                                                                                                                                                                                                                                                         |
| `EMBY_API_KEY`       | xxxx                   | 是   | EMBY_API_KEY                                                                                                                                                                                                                                                                                                                                                      |
| `IMAGE_CACHE_POLICY` | 3                      | 否   | EMBY 图片缓存策略,包括主页、详情页、图片库的原图 <br> 0: 不同尺寸设备共用一份缓存,先访问先缓存,空间占用最小但存在小屏先缓存大屏看的图片模糊问题 <br>1: 不同尺寸设备分开缓存,空间占用适中,命中率低下,但契合 emby 的图片缩放处理 <br> 2: 不同尺寸设备共用一份缓存,空间占用最大,移除 emby 的缩放参数,直接原图高清显示 <br> 3: 关闭 nginx 缓存功能,已缓存文件不做处理 |
| `DONATE_CODE`        | CMS_XXX_XXX            | 是   | CMS 捐赠码，捐赠后私聊机器人 @cms_ticket_bot 获得                                                                                                                                                                                                                                                                                                                 |

> [!TIP]
> 如果你熟悉`emby2Alist`，可以创建 `config/constant.js` 进行高级配置，小白请忽略。

## 2. 启动容器

使用 ssh 连接到你的服务器（记得使用 root 用户），并进入到前面创建的 cms 文件夹下，使用以下命令启动 CMS 容器，等待部署完成

```sh
docker-compose -f cms.yml up -d
```

部署成功后，启动日志如下：

```sh
INFO:     2025-03-02 21:33:51,091 - main      :  85 ➜ cms starting success...
INFO:     2025-03-02 21:33:51,091 - main      :  86 ➜ Version: v0.3.5 - PRO
```

## 3. 熟悉界面

启动成功后，访问 http://127.0.0.1:9527 ，使用 默认的账号密码`admin`登录 webui，先别急着配置，从上到下，从左到右，先把页面过一遍，知道都有啥东西。（很重要！很重要！很重要！）界面里的提示都很重要，务必仔细阅读。

## 4. 核心配置

> [!IMPORTANT]
> 开始配置前先去 115APP 里清空下生活事件（就是最近操作记录），不然会有很多无用的同步

访问 http://127.0.0.1:9527 进入 `核心配置` -> `115账号` ，选择一个你不使用的设备，使用手机扫码登录 115

接着完成 `STRM配置`，需要把 strm 直连域名 改为一个能访问你的 cms 访问地址

以下为常用的 strm 直连域名示例

```sh
http://172.17.0.1:9527 （如果可用，推荐用这个，这个只有你的cms和emby都是bridge网络模式才可用）
http://192.168.2.158:9527 （局域网IP示例）
https://cms.com （你已经反代了9527端口）
```

## 5. 全量同步

进入全量同步页面，进行配置

![全量同步配置示例](/install/full-sync.png)

> 文件后缀没有时，可以先输入，再选

配置完成后点击保存，然后点击全量同步，观察日志，等待全量同步完成。

> [!NOTE]
> 如果你的媒体库不在一个文件夹里，就执行多次全量同步，一定要第一个文件夹同步完成后再执行下一个。
> 建议先测试一个小库，彻底搞懂怎么玩后再同步大库

**一个文件夹只需要执行全量同步成功一次即可**

## 6. 增量同步

全量同步完后，之后关于`你同步的文件夹`里的变动由增量同步完成

增量同步依赖 115 生活事件，所以你必须打开 115 的生活事件

![115生活事件](/install/lift-1.png){width="400"}
![115生活事件](/install/lift-2.png){width="400"}

> 由于 115 的文件重命名无法产生生活事件，所以无法增量同步文件重命名；不过文件重命名后并不影响直连的获取，所以影响不大。

## 7. 扫描入库

在你的 emby 里配置媒体库，扫描 cms 全量同步生成的 strm 文件，等待 emby 刮削入库完毕

**之后访问 cms 的`9096`端口，就可以 302 观影 emby 了**

## 8. 如何更新到最新版

同样使用 ssh 连接到你的服务器，并进入到前面创建的 cms 文件夹下

先停止并删除旧的 CMS 容器

```sh
docker-compose -f cms.yml down
```

再运行以下命令来拉取最新的 `imaliang/cloud-media-sync` 镜像

```sh
docker pull imaliang/cloud-media-sync:latest
```

最后重新启动 CMS 容器

```sh
docker-compose -f cms.yml up -d
```

## 9. 完成

> [!TIP]
> 至此，最简单的玩法已经部署完成，进阶玩法可以参考其它教程。
