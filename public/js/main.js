$(".gnb").hover(function(){
    $(".menu_hover").stop().slideDown();
}, function(){
    $(".menu_hover").stop().slideUp();
});

$(window).scroll(function(){
	var gap = $("html, body").scrollTop();
	if(gap > 600) {
		if($(".nav").hasClass("nav_fix") == false) {
			$(".nav").css({"top":"-15%"}).addClass("nav_fix");
			$(".nav").stop().animate({"top":"0%"}, 500);
	}
}
	 else {
		 if(gap < 600) {
		$(".nav").removeClass("nav_fix");
		$(".nav").stop().animate({"top":"-10%"}, 500);
	} 
}
});


var n2 = 1;
var interval2;
$(window).resize(function(){
    var banHei = 10000;
	$(".slide").each(function(){
		if($(this).height() < banHei){
			banHei = $(this).height();
		} 
	});
	$(".slides").height(banHei);
}).trigger("resize");
/* $("#slides1").find(".slide").each(function(){
  var name = $(this).data("name"); //data-name을 의미
  var html = '<span class="w3-bar-item w3-button w3-white" onclick="paging2(this);">'+name+'</span>'; //여기서의 this는 span을 의미
  $(this).parent().next().find(".pager").append(html); // this = .slide
}); */
var interval2 = setInterval(slide2, 3000);
function slide2(){
  $("#slides1").stop().animate({"left":-(n2*100)+"%"}, 1000, function(){
    if(n2 == 4) {
      n2 = 0;
      $(this).css({"left":0});
    }
    n2++;
  });
}
function paging2(obj){ 
  n2 = $(obj).index(); 
   clearInterval(interval2); 
   slide2(); 
   interval2 = setInterval(slide2, 3000);
 }
 $("#slides1").hover(function (){
clearInterval(interval2);
 }, function (){
   interval2 = setInterval(slide2, 3000);
 });

 
  var WheelScroll = (function(){
	function WheelScroll(_opt) {
		var obj = this;
		if(_opt) {
			if(_opt.page) this.page = $(_opt.page);
			else this.page = $(".page");
			if(_opt.speed) this.speed = _opt.speed;
			else this.speed = 200;
		}
		else {
			this.page = $(".page");
			this.speed = 200;
			this.nav = null;
		}
		this.scTop = $(window).scrollTop();
		this.gap = [];
		this.oldNow = 0;
		this.now = 0;
		this.dir = 0;
		this.speedGap = 0;
		$(window).resize(function(){
			$(obj.page).each(function (i) {
				obj.gap[i] = $(this).offset().top;
			});
		}).trigger("resize");
		this.init(this);
		if(_opt.nav) this.navAdd(obj, _opt.nav);
	}
	WheelScroll.prototype.init = function(obj){
		$(window).on("mousewheel DOMMouseScroll", wheelFn);
		function wheelFn(e) {
			e.preventDefault();
			e.stopPropagation();
			obj.dir = e.originalEvent.wheelDelta;
			obj.scTop = $(window).scrollTop();
			$(window).off("mousewheel DOMMouseScroll");
			for (var i=0; i<obj.gap.length; i++) {
				if (obj.scTop <= obj.gap[i]) {
					obj.now = i;
					break;
				}
			}
			obj.oldNow = obj.now;
			if (obj.dir > 0) { if (obj.now > 0) obj.now--; } 
			else { if (obj.now < obj.gap.length - 1) obj.now++; }
			obj.animation(obj, function(){
				$(window).on("mousewheel DOMMouseScroll", wheelFn);
			});
		}
	}
	WheelScroll.prototype.navAdd = function(obj, navObj) {
		$(navObj).on("click", function(){
			obj.oldNow = obj.now;
			obj.now = $(this).data("now");
			obj.animation(obj, null);
		});
	}
	WheelScroll.prototype.animation = function(obj, fn) {
		obj.speedGap = Math.abs(obj.now - obj.oldNow);
		$("html, body").stop().animate({"scrollTop":(obj.gap[obj.now])+"px"}, obj.speed*obj.speedGap, fn);
	}
	return WheelScroll;
}()); 

var pages = new WheelScroll({
	page: ".page",
	nav: ".menu", 
	speed: 300
});





var swapImg = ['../img/wine.png', '../img/wine-bottle.png', '../img/filter.png', '../img/wine-glasses.png', '../img/bucket.png', '../img/wine-barrel.png'];
var oriImg = ['../img/wine2.png', '../img/wine-bottle2.png', '../img/filter2.png', '../img/wine-glasses2.png', '../img/bucket2.png', '../img/wine-barrel2.png'];
var n = 0;
$(".menu").mouseenter(function(){
	$(".menu").each(function(i){
		if(n != i) {
			$(this).find(".menu_tit").css({"color":"#222"});
			$(this).find("img").attr("src",oriImg[i]);
			$(this).find(".line").stop().animate({"width":0}, 100);
		}
	});
	$(this).find(".menu_tit").css({"color":"#a22c4d"});
	$(this).find("img").attr("src", swapImg[$(this).index()]);
	$(this).find(".line").stop().animate({"width":"100%"}, 100);
});
$(".menu").mouseleave(function(){
	$(".menu").each(function(i){
		if(n != i) {
			$(this).find(".menu_tit").css({"color":"#222"});
			$(this).find("img").attr("src",oriImg[i]);
			$(this).find(".line").stop().animate({"width":0}, 100);
		}
	});
});
$(".menu").click(function(){
	n = $(this).index();
	$(".menu").each(function(i){
		$(this).find(".menu_tit").css({"color":"#222"});
		$(this).find("img").attr("src",oriImg[i]);
		$(this).find(".line").stop().animate({"width":0}, 100);
	});
	$(this).find(".menu_tit").css({"color":"#a22c4d"});
	$(this).find("img").attr("src", swapImg[n]);
	$(this).find(".line").stop().animate({"width":"100%"}, 100);
});
$(".menu").eq(0).trigger("click");


function swing() {
	$('.circle').animate({'top':'5px', 'opacity':'1'},1000).animate({'top':'20px', 'opacity':'0'},1000, swing);
}
swing();

