/**
 * Created by tianhao on 17-3-23.
 */
;(function ($) {
    $.fn.extend({

        "thplayer":function (options) {
            options = $.extend({
                title: "燕归巢",
                author: "张杰＆张靓颖",
                cover: "http://p4.music.126.net/gYwk-n_UWAtOfDZBEV04dQ==/7699879929738059.jpg",
                music: "http://p2.music.126.net/bunDefkBnWf_XekMxxdLNA==/19147994997736977.mp3",
            }, options);
            thplayer_init();
            var myaudio=document.getElementById("thaudio");
            function thplayer_init(){
                document.getElementById("Thplayer").innerHTML='' +
                    '<div id="player-demo">' +
                    '   <img id="player-album" src="http://p4.music.126.net/gYwk-n_UWAtOfDZBEV04dQ==/7699879929738059.jpg">' +
                    '   <div id="player-mask"></div>' +
                    '   <div id="play" class="bg play-bg" data-action="play"></div>' +
                    '   <div id="pause" class="bg pause-bg" data-action="pause"></div>' +
                    '   <div id="player-info">' +
                    '       <strong class="title"></strong>' +
                    '       <span class="and">-</span> ' +
                    '       <span class="author"></span>' +
                    '   </div>' +
                    '   <div id="player-control">' +
                    '       <span class="left-time">0:00</span>' +
                    '       <span class="and">/</span> ' +
                    '       <span class="right-time">3:45</span>' +
                    '   </div>' +
                    '   <div class="player-listbox">' +
                    '       <div style="width:100%;text-align:center;position:relative">' +
                    '           <input type="text" id="txtSong" placeholder="请输入歌曲名称，例如：好久不见 陈奕迅..."> ' +
                    '           <img src="./img/search.png" id="btnSearch">' +
                    '       </div>' +
                    '       <table class="th-list-table">' +
                    '           <thead style="display:block;height:30px">' +
                    '               <tr style="display:block;padding:0 20px;color:#999">' +
                    '                   <th style="padding-right:160px">歌名</th>' +
                    '                   <th>歌手</th>' +
                    '               </tr>' +
                    '           </thead>' +
                    '           <tbody id="UserList" style="display:block;height:280px;width:330px;overflow:auto;margin-top:10px">' +
                    '           </tbody>' +
                    '           <tr id="LoadMore" style="display:none;cursor:pointer;text-align:center;font-size:10px;color:#565454" offset="0" search="0">' +
                    '               <td colspan="8"></td>' +
                    '           </tr>' +
                    '       </table>' +
                    '   </div>' +
                    '   <div id="player-list-icon"></div>' +
                    '   <div id="player-process">' +
                    '   <div id="player-current"></div>' +
                    '       <span></span>' +
                    '   </div>' +
                    '</div>' +
                    '<div id="player-flex">' +
                    '   <span id="player-show"></span>' +
                    '</div>' +
                    '<audio id="thaudio" loop></audio>';
                var myaudio=document.getElementById("thaudio");
                $("#player-info .title").text(options.title);
                $("#player-info .author").text(options.author);
                $("audio").attr("src", options.music);
                $("#player-album").attr("src",options.cover);
                setInterval(function (){
                    if(parseInt(myaudio.currentTime%60)<10){
                        var seconds = "0"+parseInt(myaudio.currentTime%60);
                    }
                    else{
                        var seconds = parseInt(myaudio.currentTime%60);
                    }
                    $("#player-control .left-time").text(parseInt(myaudio.currentTime/60)+":"+seconds);
                    $("#player-process span").css("left",(myaudio.currentTime/myaudio.duration)*200+"px");
                    $("#player-process #player-current").css("width",(myaudio.currentTime/myaudio.duration)*200+"px");
                },1000);
            }


            function getSongTime(){
                setTimeout(function (){
                    if(parseInt(myaudio.duration%60)<10.0){
                        var seconds = "0"+parseInt(myaudio.duration%60);
                    }
                    else{
                        var seconds = parseInt(myaudio.duration%60);
                    }
                    $("#player-control .right-time").text(parseInt(myaudio.duration/60)+":"+seconds);
                },3000);
            }

            function getAjax(){
                if ($("#LoadMore").attr("Search") == "0") {
                    $("#UserList").html("");
                    $("#LoadMore").attr("offset", "0")
                }
                /*
                 * Ajax请求获得歌曲歌手专辑信息
                 * */
                var Song = $("#txtSong").val();
                $.ajax({
                    url: "https://fm.aakuan.cn/GetMusic.ashx",
                    data: {SongName: Song, OffSet: $("#LoadMore").attr("offset")},
                    type: "get",
                    success: function (msg) {
                        var SongJson = JSON.parse(msg);
                        if (typeof SongJson.result.songs == undefined || typeof SongJson.result.songs == "undefined") {
                            $("#LoadMore").show();
                            $("#LoadMore td").text("对不起，没有更多数据了")
                        } else {
                            for (var i = 0; i < SongJson.result.songs.length; i++) {
                                $("#UserList").append("<tr class='am-btn am-btn-primary am-radius BeginPlay'  url='" + SongJson.result.songs[i].mp3Url + "'   aid='" + SongJson.result.songs[i].album.id + "' mid='" + SongJson.result.songs[i].id + "' img='" + SongJson.result.songs[i].album.blurPicUrl + "' singer='" + SongJson.result.songs[i].artists[0].name + "' name='" + SongJson.result.songs[i].name.substring(0, 20) + "'><td style='width:200px;'>" + SongJson.result.songs[i].name.substring(0, 20) + "</td><td>" + SongJson.result.songs[i].artists[0].name + "</td></tr>");
                                $("#LoadMore").show();
                                $("#LoadMore td").text("点击加载更多数据")
                            }
                        }
                        $("#LoadMore").attr("Search", "0");
                        $("#LoadMore").click(function () {
                            var Tr_Length = $("#UserList tr").length;
                            $(this).attr("offset", Tr_Length);
                            $("#LoadMore").attr("Search", "1");
                            $("#btnSearch").click();
                            $("#LoadMore").unbind("click")
                        });
                        $(".BeginPlay").each(function () {
                            if ($(this).attr("url") == "http://p2.music.126.net/hmZoNQaqzZALvVp0rE7faA==/0.mp3") {
                                var aid = $(this).attr("aid");
                                var mid = $(this).attr("mid");
                                $.ajax({
                                    url: "GetAddress.ashx",
                                    data: {id: aid},
                                    type: "get",
                                    success: function (json) {
                                        json = JSON.parse(json);
                                        for (var k = 0; k < json.album.songs.length; k++) {
                                            if (json.album.songs[k].id == mid) {
                                                $("button[mid='" + mid + "']").attr("url", json.album.songs[k].mp3Url);
                                                $("td[mid='" + mid + "']").text(json.album.songs[k].mp3Url);
                                                $("a[mid='" + mid + "']").attr("href", json.album.songs[k].mp3Url);
                                                break
                                            }
                                        }
                                    }
                                })
                            }
                        });
                        /*
                         * 播放网易云音源
                         * */

                        $(".BeginPlay").click(function () {
                            var url = $(this).attr("url");
                            var img = $(this).attr("img");
                            var singer = $(this).attr("singer");
                            var name = $(this).attr("name");
                            var myaudio =document.getElementById("audio");
                            $("audio").attr("src",url);
                            $("#player-album").attr("src",img);
                            $("#player-info .title").html(name);
                            $("#player-info .author").html(singer);
                            getSongTime();
                            thplay();
                        });
                    }
                });
            }

            function thplay(){
                myaudio.play();
                $("#player-mask").css("display","none");
                $("#play").css("display","none");
                $("#player-album").css("animation","10s linear infinite CDturn");
                $(".play-bg").css("display","none");
                $(".pause-bg").css("display","block");
            }

            function thpause(){
                myaudio.pause();
                $(".pause-bg").css("display","none");
                $("#player-mask").css("display","block");
                $("#play").css("display","block");
                $("img").css("animation","null");
                $(".play-bg").css("display","block");
            }

            $("#player-list-icon").click(function () {

                $(".player-listbox").toggleClass("playerbox-show");
            })

            $("#play").click(function () {
                thplay();
            })

            $("#pause").click(function () {
                thpause();
            })

            $("#player-flex").click(function () {
                if($("#Thplayer").css("left")==0+"px"){
                    $("#Thplayer").css("left",-330+"px");
                }else{
                    $("#Thplayer").css("left",0+"px");
                }
            })

            $("#btnSearch").click(function () {
                getAjax();
            });

            $("#txtSong").keydown(function(event){
                if(event.keyCode==13){
                    getAjax();
                }
            });

            return this;
        }
    });
})(jQuery);
