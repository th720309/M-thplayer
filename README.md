
## M-thplayer ##



> 超级简单好看的音乐播放器




## ScreenShot ##



![screenshot](http://oct3pmpde.bkt.clouddn.com/player.png)

## Usage ##



### html

```
<div id="Thplayer">
    <div id="player-demo">
        <img src="http://p4.music.126.net/gYwk-n_UWAtOfDZBEV04dQ==/7699879929738059.jpg">
        <div id="player-mask"></div>
        <div id="play" class="bg play-bg" data-action="play"></div>
        <div id="pause" class="bg pause-bg" data-action="pause"></div>
        <div id="player-info">
            <strong class="title"></strong>
            <span class="and"> - </span>
            <span class="author"></span>
        </div>
        <div id="player-control">
            <span class="left-time">0:00</span>
            <span class="and">/</span>
            <span class="right-time">3:45</span>
        </div>
        <div id="player-menu">
            <div id="playmode"></div>
        </div>
        <div id="player-lyric">

        </div>
        <div id="player-process">
            <hr/>
            <span></span>
        </div>
    </div>
    <audio id="audio"  loop="loop"></audio>
</div>
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
 - add ajax to get online music
