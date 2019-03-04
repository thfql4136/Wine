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
var ref; 
var key;

(function initHome() { //(function initHome(){})(); = initHome();
    $(".list:not(#home_wr)").remove(); //등록 form은 항상 있어야 하기때문에 ul은 있어야 함.
    ref = db.ref("root/home");
    ref.on('child_added', homeAdd);
    ref.on('child_removed', homeRev); //웹에서 지워진걸 보여주기 위해 함수 선언?한것, child_removed가 되면 homeRev실행해라
    ref.on('child_changed', homeChg);


})();

function homeAdd(data) { //child_added가 한번 일어날때 그 하나
    var id = data.key;
    var img = data.val().img; //내용(data.val())중에 img를 가져와라
    var src = '../img/' + img;
    var title = data.val().title;
    var local = data.val().local;
    var price = data.val().price;
    var star = data.val().star;
    var html = '';
    html += '<ul class="list clear row" id="' + id + '">';
    html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
    html += '<div>';
    html += '<img src="' + src + '">';
    html += '<input type="text" class="tit_img form-control" placeholder="이미지" value="' + img + '" id="text">';
    html += '</div>';
    html += '</li>';
    html += '<li class="col-xs-4 col-sm-6 col-md-8 col-lg-8">';
    html += '<div >';
    html += '<input type="text" class="title form-control" style="margin-top:5px;" placeholder="타이틀1" value="' + title + '">';
    html += '<input type="text" class="local form-control" style="margin-top:5px;" placeholder="지역" value="' + local + '">';
    html += '<input type="text" class="price form-control" style="margin-top:5px;" placeholder="가격" value="' + price + '">';
    html += '<input type="text" class="star form-control" style="margin-top:5px;" placeholder="추천" value="' + star + '">';
    html += '</div>';
    html += '</li>';
    html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
    html += '<div>';
    html += '<button class="btn btn-warning" style="margin-right:5px;" onClick="homeUp(this);">수정</button>';
    html += '<button class="btn btn-danger" onClick="homeDel(this);">삭제</button>';
    html += '</div>';
    html += '</li>';
    html += '</ul>';
    $("#home_wrap").append(html);
    
}




function homeRev(data) { //data는 저 지워졌워요 하고 알려준다
    var id = data.key; //전달받은 키값을 id에 넣어주세요
    $("#" + id).remove(); //ul이 가지고있는 id 값을 지운다
}

function homeChg(data) {
    var id = data.key;
    var ul = $("#" + id);
    $("img", ul).attr("src", "../img/" + data.val().img);
    alert("수정되었습니다.");
}

function homeUp(obj) {
    var ul = $(obj).parent().parent().parent();
    var id = ul.attr("id");
    var img = $(".tit_img", ul).val();
    var title = $(".title", ul).val(); //title에 접근하는데 누구의 title? ul의 title
    var local = $(".local", ul).val();
    var price = $(".price", ul).val();
    var star = $(".star", ul).val();
    if (title == '' || img == '' || local == '' || price == '' || star == '') {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home/" + id);
        ref.update({ //ref를 업데이트 하겠습니다./ update랑 push는 데이터 값이 있어야 함. remove는 없어도 됨
            img: img,
            title: title,
            local: local,
            price: price,
            star: star
        });
    }
};


$("#home_save").on("click", function () {
    var img = $("#home_wr .tit_img").val();
    var title = $("#home_wr .title").val();
    var local = $("#home_wr .local").val();
    var price = $("#home_wr .price").val();
    var star = $("#home_wr .star").val();

    if (title == '' || img == '' || local == '' || price == '' || star == '' ) {
        alert("내용을 적어주세요.");
    } else {
        ref = db.ref("root/home");
        ref.push({ //ref를 푸시 하겠습니다 
            img: img,
            title: title,
            local: local,
            price: price,
            star: star
        }).key; //key값으로 만들어 붙이고 내용(title, link)을 안에 넣겠습니다.
        alert("등록되었습니다.");
    }

});

function homeDel(obj) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        // var id = obj.parentNode.parenNode.parentNode.id; //ul의 id값, 자바스크립방식
        var id = $(obj).parent().parent().parent().attr("id"); //제이쿼리 방식
        if (id != "") { //id가 빈값이면 모든 정보가 지워지기 때문에 혹시나 하는 사항에 대해 대처
            ref = db.ref("root/home/" + id).remove(); //여기까지 쓰면 DB에서 지워짐., 지울떄는 값을 가져올 필요 없이 지우면 됨.

        }
    }
}