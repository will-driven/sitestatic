var main = {

    bigImgEl : null,
    numImgs : null,
  
    init : function() {
        $(window).scroll(function() {
            if( $(this).scrollTop() > 160 && $("header").css("display") == "block" ) {
                $(".navbar").addClass("fixed-top");
                $(".navbar").addClass("sticky-nav");
                // $(".navbar-dark .navbar-nav .nav-link").css({"color": "#fff"});
                $('.navbar-brand').show();
                // $(".top-nav li a").css({"border-bottom": "#094654"});
            } else if( $("header").css("display") == "none" ) {
                $(".navbar").addClass("fixed-top");
                $(".navbar").addClass("sticky-nav");
                // $(".navbar-dark .navbar-nav .nav-link").css({"color": "#fff"});
                $('.navbar-brand').show();
                // $(".top-nav li a").css({"border-bottom": "#fff"});
    
            } else {
                $(".navbar").removeClass("fixed-top");
                $(".navbar").removeClass("sticky-nav");
                // $(".navbar-dark .navbar-nav .nav-link").css({"color": "#094654"});
                $('.navbar-brand').hide();
                // $(".top-nav li a").css({"border-bottom": "#fff"});
    
            }
        });
    }      
};
  
  