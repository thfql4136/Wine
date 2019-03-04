var config = {
    apiKey: "AIzaSyBDEJJwVkb9ojX_DkQUEcrYFfmzXHjeNPQ",
    authDomain: "thfql4136-wine.firebaseapp.com",
    databaseURL: "https://thfql4136-wine.firebaseio.com",
    projectId: "thfql4136-wine",
    storageBucket: "thfql4136-wine.appspot.com",
    messagingSenderId: "178677387199"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
var ref = db.ref("root"); //var ref; 이렇게 선언만 해줘도 됨 어차피 값이 바뀔꺼니깐
var key;

(function initHome() { //(function initHome(){})(); = initHome();
	ref = db.ref("root/home");
	ref.on('child_added', homeAdd); //main에서는 child_added만 넣어주면 됨
	ref.on('child_removed', homeRev);
	ref.on('child_changed', homeChg);
})();

function homeAdd(data) {
	var id = data.key;
	var img = data.val().img; //내용(data.val())중에 img를 가져와라
	var src = '../img/' + img;
	var title = data.val().title;
	var local = data.val().local;
	var star = data.val().star;
	var price = data.val().price;
	var html = '';
	html += '<div class="sell_box" id="'+id+'" >';
	html += '<div class="sellers_prods ">';
	html += '<div class="sell_prod">';
	html += '<img src="'+src+'" alt="img" class="img">';
	html += '</div>';
	html += '<div class="sell_prod_cont">';
	html += '<span class="tit">'+title+' </span>';
	html += '</div>';
	html += '<div class="sell_prod_cont2 clear">';
	html += '<div class="itary it">'+local+'</div>';
	html += '<div class="price">￦'+price+'</div>';
	html += '</div>';
	html += '<div class="sell_prod_cont3 clear">';
	html += '<div><span class="stars-container stars-'+star+'">★★★★★</span></div>';
	html += '</div>';
	html += '<div class="sell_prod_cont4 clear">';
	html += '<div class="more">more</div>';
	html += '<div class="cart">';
	html += '<div class="far fa-heart heart"></div>';
	html += '<div>';
	html += '<div class="fas fa-shopping-cart"></div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '</div>';


	$(".product").append(html);
	$("#home_wrap").append(html);

// 	var w=0;
// 	if($(".sell_prod_cont3 > li").hasClass("gr")){
// 	for(w = 0; w < star; w++){
// 	   $(".sell_prod_cont3 > li").eq(w).removeClass("gr");
// 	   $(".sell_prod_cont3 > li").eq(w).addClass("purple");	
// 	}
// }
$(function() {
	function addScore(score, $domElement) {
	  $("<span class='stars-container'>")
		.addClass("stars-" + score.toString())
		.text("★★★★★")
		.appendTo($domElement);
	}
  
	addScore(star, $("#fixture"));
  });
}

function homeRev(data) {
	var id = data.key;
	$("#" + id).remove();
}

function homeChg(data) {
	var id = data.key;
	var div = $("#" + id);
	$("img", div).attr("src", "../img/" + data.val().img);
	$(".tit", div).html(data.val().title);
	$(".itary", div).html(data.val().local);
	$(".price", div).html(data.val().price);
}

$(".fa-bars").click(function(){
	$(".navs_sub").stop().slideToggle(100);
});

$('body').imagesLoaded()
.done( function( instance ) {
	$(".loader").hide(0);
  console.log('all images successfully loaded');
})
.progress( function( instance, image ) {
  var result = image.isLoaded ? 'loaded' : 'broken';
  console.log( 'image is ' + result + ' for ' + image.img.src );
});

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
		$(".time").removeClass($(".time").data("ani"));
		$(this).find(".menu_tit").css({"color":"#222"});
		$(this).find("img").attr("src",oriImg[i]);
		$(this).find(".line").stop().animate({"width":0}, 100);
	});
	
	$(this).find(".menu_tit").css({"color":"#a22c4d"});
	$(this).find("img").attr("src", swapImg[n]);
	$(this).find(".line").stop().animate({"width":"100%"}, 100);
});
$(".menu").eq(0).trigger("click");

if($(".menu").eq(1).click(function(){
	
	var cls = $(".time").data("ani");
	$(".time").addClass(cls);
	
}));

$(function() {
	function swing() {
		$(".big").animate({'top':'45%', 'opacity':'1'},1000).animate({'top':'47%', 'opacity':'0'},1000, swing);
	}
	swing();
});


var container = document.getElementById('map');
var options = {
	center: new daum.maps.LatLng(37.523511, 127.031188),
	level: 3
};

var map = new daum.maps.Map(container, options);

