var main={bigImgEl:null,numImgs:null,init:function(){$(window).scroll(function(){$(".navbar").offset().top>150?$(".navbar").addClass("top-nav-fixed"):$(".navbar").removeClass("top-nav-fixed")}),$("#main-navbar").on("show.bs.collapse",function(){$(".navbar").addClass("top-nav-expanded")}),$("#main-navbar").on("hidden.bs.collapse",function(){$(".navbar").removeClass("top-nav-expanded")}),$("#main-navbar").on("click",".navlinks-parent",function(n){var a=n.target;$.each($(".navlinks-parent"),function(n,i){i==a?$(i).parent().toggleClass("show-children"):$(i).parent().removeClass("show-children")})});var n=$(".navlinks-container");if(n.length>0){$("#main-navbar ul").append("<li class='fake-menu' style='display:none;'><a></a></li>");var a=$(".fake-menu");$.each(n,function(i){$(n[i]).find(".navlinks-parent");var e=$(n[i]).find(".navlinks-children a"),t=[];$.each(e,function(n,a){t=t.concat($(a).text().trim().split(/\s+/))});var s=0;$.each(t,function(n,i){a.html("<a>"+i+"</a>");var e=a.width();e>s&&(s=e)}),$(n[i]).css("min-width",s+"px")}),a.remove()}main.initImgs()},initImgs:function(){if($("#header-big-imgs").length>0){main.bigImgEl=$("#header-big-imgs"),main.numImgs=main.bigImgEl.attr("data-num-img");var n=main.getImgInfo(),a=n.src,i=n.desc;main.setImg(a,i);var e=function(){var n=main.getImgInfo(),a=n.src,i=n.desc;(new Image).src=a,setTimeout(function(){var n=$("<div></div>").addClass("big-img-transition").css("background-image","url("+a+")");$(".intro-header.big-img").prepend(n),setTimeout(function(){n.css("opacity","1")},50),setTimeout(function(){main.setImg(a,i),n.remove(),e()},1e3)},6e3)};main.numImgs>1&&e()}},getImgInfo:function(){var n=Math.floor(Math.random()*main.numImgs+1);return{src:main.bigImgEl.attr("data-img-src-"+n),desc:main.bigImgEl.attr("data-img-desc-"+n)}},setImg:function(n,a){$(".intro-header.big-img").css("background-image","url("+n+")"),void 0!==a&&!1!==a?$(".img-desc").text(a).show():$(".img-desc").hide()}};