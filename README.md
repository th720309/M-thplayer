## M-thplayer ##



> 超级简单好看的浮窗音乐播放器，支持在线收听。


## [DEMO](http://www.tianhao.site/M-thplayer/) ##

## ScreenShot ##



![screenshot](http://oct3pmpde.bkt.clouddn.com/thplayer2.jpg)

![screenshot](http://oct3pmpde.bkt.clouddn.com/thplayer1.jpg)

## Usage ##



### html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thplayer</title>
    <link href="css/thplayer.css" rel="stylesheet">
</head>
<body>
<div id="Thplayer"></div>
<script type="application/javascript" src="http://oct3pmpde.bkt.clouddn.com/jquery.js"></script>
<script type="application/javascript" src="js/thplayer.min.js"></script>
<script>
    $("#Thplayer").thplayer({
        title: "因为爱所以爱",
        author: "谢霆锋",
        cover: "http://p3.music.126.net/fmnoVwth7L4SojzwmYUkHw==/691592813882957.jpg",
        music: "http://p2.music.126.net/hXWOiIMjCjSrkknWpqRX1w==/1200666697537999.mp3"
    });
</script>
</body>
</html>
```

### options

```
    $("#Thplayer").thplayer({
        title: "因为爱所以爱",     //歌名
        author: "谢霆锋",　　　　　//歌手
        cover: "http://p3.music.126.net/fmnoVwth7L4SojzwmYUkHw==/691592813882957.jpg",　　//封面url
        music: "http://p2.music.126.net/hXWOiIMjCjSrkknWpqRX1w==/1200666697537999.mp3"  //歌曲url
    });
```

## 后续 ##

 - add lylic


## 说明 ##

 - 该项目仅供个人学习使用，，没有商业利益
 - 项目使用网易云音源。
