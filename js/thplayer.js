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

            $(".player-info .title").text(options.title);
            $(".player-info .author").text(options.author);
            $("audio").attr("src", options.music);
            $("#player-album").attr("src",options.cover);
            var myaudio=document.getElementById("audio");

            //溢出

            setTimeout(function (){
                if(parseInt(myaudio.duration%60)<10.0){
                    var seconds = "0"+parseInt(myaudio.duration%60);
                }
                else{
                    var seconds = parseInt(myaudio.duration%60);
                }
                $("#player-control .right-time").text(parseInt(myaudio.duration/60)+":"+seconds);
            },5000);

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

            $("#player-list-icon").click(function () {

                $(".player-listbox").toggleClass("playerbox-show");
            })

            $("#play").click(function () {
                myaudio.play();
                $("#player-mask").css("display","none");
                $("#play").css("display","none");
                $("img").css("animation","10s linear infinite CDturn");
                $(".play-bg").css("display","none");
                $(".pause-bg").css("display","block");
            })

            $("#pause").click(function () {
                myaudio.pause();
                $(".pause-bg").css("display","none");
                $("#player-mask").css("display","block");
                $("#play").css("display","block");
                $("img").css("animation","null");
                $(".play-bg").css("display","block");

            })

            $("#player-flex").click(function () {
                if($("#Thplayer").css("left")==0+"px"){
                    $("#Thplayer").css("left",-330+"px");
                }else{
                    $("#Thplayer").css("left",0+"px");
                }
            })

            return this;
        }
    });
})(jQuery);