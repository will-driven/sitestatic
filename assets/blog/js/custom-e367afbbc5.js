var main={bigImgEl:null,numImgs:null,init:function(){$(window).scroll(function(){$(this).scrollTop()>160&&"block"==$("header").css("display")?($(".navbar").addClass("fixed-top"),$(".navbar").addClass("sticky-nav"),$(".navbar-brand").show()):"none"==$("header").css("display")?($(".navbar").addClass("fixed-top"),$(".navbar").addClass("sticky-nav"),$(".navbar-brand").show()):($(".navbar").removeClass("fixed-top"),$(".navbar").removeClass("sticky-nav"),$(".navbar-brand").hide())})}};