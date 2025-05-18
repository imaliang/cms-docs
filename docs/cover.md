# 媒体库封面自动生成插件

> [!TIP]
> 自动获取媒体库里的海报，然后使用这些海报生成精美的媒体库封面

## 高级配置

> [!WARNING]
> 必须是 JSON 格式的语法

高级配置示例（全部都是非必填）

```json
{
  "ch_font_name": "霞鹜文楷.ttf",
  "ch_font_size": 180,
  "eng_font_name": "霞鹜文楷.ttf",
  "eng_font_size": 80,
  "background_color_rgb_left": "139,0,0",
  "background_color_rgb_right": "255,69,0",
  "poster_position": "315426987",
  "template_mapping": [
    {
      "library_name": "动漫-大电影",
      "library_ch_name": "动漫电影",
      "library_eng_name": "ANIME MOVIE"
    },
    {
      "library_name": "动漫-剧集",
      "library_ch_name": "动漫剧集",
      "library_eng_name": "ANIME TV",
      "background_color_rgb_left": "139,0,0",
      "background_color_rgb_right": "255,69,0"
    }
  ]
}
```

| 环境变量                   | 示例值                                                                     |
| -------------------------- | -------------------------------------------------------------------------- |
| ch_font_name               | 自定义中文字体文件名（使用此配置时必须把字体文件放到你的 config 文件夹下） |
| ch_font_size               | 自定义中文字体大小                                                         |
| eng_font_name              | 自定义英文字体文件名（使用此配置时必须把字体文件放到你的 config 文件夹下） |
| eng_font_size              | 自定义英文字体大小                                                         |
| background_color_rgb_left  | 封面背景颜色左边（RGB 格式）                                               |
| background_color_rgb_right | 封面背景颜色右边（RGB 格式）                                               |
| poster_position            | 海报在封面的位置，每三个一组，分别对应每列从上到下的位置取第几个封面       |
| color_block_rgb            | 色块颜色（RGB 格式）                                                       |
| ch_position                | 中文位置（默认 73.32,427.34）                                              |
| eng_position               | 英文位置（默认 124.68,635.55）                                             |
| color_block_position       | 色块位置（默认 84.38,620.06）                                              |
| library_name               | 实际的媒体库名称                                                           |
| library_ch_name            | 封面中文名                                                                 |
| library_eng_name           | 封面英文名                                                                 |

注意：`template_mapping` 里面的 `background_color_rgb_left` 优先级大于最外层的 `background_color_rgb_left`

[在线取色器](https://www.jyshare.com/front-end/6210)

[JSON 格式在线检测](https://www.jyshare.com/front-end/53/)
