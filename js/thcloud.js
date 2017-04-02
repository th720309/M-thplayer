/**
 * Created by tianhao on 17-2-16.
 */
$(document).ready(function () {
    $("#btnSearch").click(function () {
        getAjax();
    });

    $('input').keydown(function(event){
        if(event.keyCode==13){
            getAjax();
        }
    });

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
            url: "http://fm.aakuan.cn/GetMusic.ashx",
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
                    //   console.log(url+img+singer+name);
                    $("audio").attr("src",url);
                    $("#player-album").attr("src",img);
                    $(".player-info .title").html(name);
                    $(".player-info .author").html(singer);
                    setTimeout(function (){
                        if(parseInt(myaudio.duration%60)<10.0){
                            var seconds = "0"+parseInt(myaudio.duration%60);
                        }
                        else{
                            var seconds = parseInt(myaudio.duration%60);
                        }
                        $("#player-control .right-time").text(parseInt(myaudio.duration/60)+":"+seconds);
                    },5000);
                    myaudio.play();
                    $("#player-mask").css("display","none");
                    $("#play").css("display","none");
                    $("#player-album").css("animation","10s linear infinite CDturn");
                    $(".play-bg").css("display","none");
                    $(".pause-bg").css("display","block");

                });
            }
        });
    }
});
