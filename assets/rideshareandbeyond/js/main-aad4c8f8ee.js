var main={bigImgEl:null,numImgs:null,init:function(){$(window).scroll(function(){$(this).scrollTop()>160?($(".navbar").addClass("top-nav-fixed"),$("section.banner-sec").css({padding:"75px"}),$(".top-nav").css({background:"#094654"}),$(".top-nav li a").css({color:"#fff"}),$("#sticky-logo").show()):($(".navbar").removeClass("top-nav-fixed"),$("section.banner-sec").css({padding:"30px"}),$(".top-nav").css({background:"#fff"}),$(".top-nav li a").css({color:"#000"}),$("#sticky-logo").hide())}),$("#main-navbar").on("show.bs.collapse",function(){$(".navbar").addClass("top-nav-expanded")}),$("#main-navbar").on("hidden.bs.collapse",function(){$(".navbar").removeClass("top-nav-expanded")}),$("#main-navbar").on("click",".navlinks-parent",function(n){var a=n.target;$.each($(".navlinks-parent"),function(n,i){i==a?$(i).parent().toggleClass("show-children"):$(i).parent().removeClass("show-children")})});var n=$(".navlinks-container");if(n.length>0){$("#main-navbar ul").append("<li class='fake-menu' style='display:none;'><a></a></li>");var a=$(".fake-menu");$.each(n,function(i){$(n[i]).find(".navlinks-parent");var s=$(n[i]).find(".navlinks-children a"),e=[];$.each(s,function(n,a){e=e.concat($(a).text().trim().split(/\s+/))});var t=0;$.each(e,function(n,i){a.html("<a>"+i+"</a>");var s=a.width();s>t&&(t=s)}),$(n[i]).css("min-width",t+"px")}),a.remove()}main.initImgs()},initImgs:function(){if($("#header-big-imgs").length>0){main.bigImgEl=$("#header-big-imgs"),main.numImgs=main.bigImgEl.attr("data-num-img");var n=main.getImgInfo(),a=n.src,i=n.desc;main.setImg(a,i);var s=function(){var n=main.getImgInfo(),a=n.src,i=n.desc;(new Image).src=a,setTimeout(function(){var n=$("<div></div>").addClass("big-img-transition").css("background-image","url("+a+")");$(".intro-header.big-img").prepend(n),setTimeout(function(){n.css("opacity","1")},50),setTimeout(function(){main.setImg(a,i),n.remove(),s()},1e3)},6e3)};main.numImgs>1&&s()}},getImgInfo:function(){var n=Math.floor(Math.random()*main.numImgs+1);return{src:main.bigImgEl.attr("data-img-src-"+n),desc:main.bigImgEl.attr("data-img-desc-"+n)}},setImg:function(n,a){$(".intro-header.big-img").css("background-image","url("+n+")"),void 0!==a&&!1!==a?$(".img-desc").text(a).show():$(".img-desc").hide()}};