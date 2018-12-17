$(".gnb").hover(function(){
    $(".menu_hover").stop().slideDown();
}, function(){
    $(".menu_hover").stop().slideUp();
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
		$("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, obj.speed*obj.speedGap, fn);
	}
	return WheelScroll;
}());

var prdNum = 0;

$(".menu").click(function(){ //이벤트 선언
/* 	$(".news_cont").eq(prdNum).stop().animate({"top":"5%", "opacity":0}, 500 , function(){
		$(this).css({"display":"none"});
		
	}); */
 prdNum = $(this).index(); //클릭 된 애 값을 받아올꺼야, index는 값을 가져올때 사용
/*  $(".news_cont").eq(prdNum).css({"display":"block"}).stop().animate({"top":0, "opacity":1}, 500 ); */
 $(this).css({"color":"#222"});
 $(".menu_tit").children(".line").css({"width":"0%"});
$(this).css({"color":"#a22c4d"});
if($(this).index() !=prdNum){
	$(this).find(".menu_img1 > img").attr('src', '../img/wine2.png');
}
else{
	$(this).find(".menu_img1 > img").attr('src', '../img/wine.png');
}

$(".menu_tit").children(".line").css({"width":"100%"});
});

$(".menu").hover(function(){//이벤트 선언
	if($(this).index() !=prdNum){ //현재 선택된 애는 제외 시킨다
		$(this).css({"color":"#a22c4d"});
		$(".menu_tit").children("div").stop().animate({"width":"100%"}, 100);
		$(this).find(".menu_img1 > img").attr('src', '../img/wine.png');
		$(this).find(".menu_img2 > img").attr('src', '../img/wine-bottle.png');
		$(this).find(".menu_img3 > img").attr('src', '../img/filter.png');
		$(this).find(".menu_img4 > img").attr('src', '../img/wine-glasses.png');
		$(this).find(".menu_img5 > img").attr('src', '../img/bucket.png');
		$(this).find(".menu_img6 > img").attr('src', '../img/wine-barrel.png');
	}
},function(){
	if($(this).index() !=prdNum){
		$(this).css({"color":"#222"});
		$(".menu_tit").children("div").stop().animate({"width":"0%"}, 100);
		$(this).find(".menu_img1 > img").attr('src', '../img/wine2.png');
		$(this).find(".menu_img2 > img").attr('src', '../img/wine-bottle2.png');
		$(this).find(".menu_img3 > img").attr('src', '../img/filter2.png');
		$(this).find(".menu_img4 > img").attr('src', '../img/wine-glasses2.png');
		$(this).find(".menu_img5 > img").attr('src', '../img/bucket2.png');
		$(this).find(".menu_img6 > img").attr('src', '../img/wine-barrel2.png');
	}
});
$(".menu").eq(0).trigger("click");