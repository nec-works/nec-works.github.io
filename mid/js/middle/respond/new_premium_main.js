$(document).ready(function () {
    
    //슬라이드 UI 이미지우선으로인한 수정
    setTimeout(function(){
        $(".slide").css("height", "auto");
        $(".slide").css("opacity", "1");
    }, 100);

     //메인 대배너 , 모바일 메인 대배너 , 최하단 배너
     function mainBnrCommon(mainBnr) {
        var carousel = $(mainBnr + ' .slide');
        carousel.owlCarousel({
            loop: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplaySpeed: 1000,
            autoplayHoverPause: true,
        });
        var owlDots = $(mainBnr + ' .owl-dots');
        var owlStage = $(mainBnr + ' .owl-stage');
        if (owlDots.hasClass("disabled")) {
            owlStage.addClass('stop');
        } else {
            owlStage.removeClass('stop');
        }
    }
    ['.main_bnr01', '.main_bnr04'].forEach(function (mainBnr) {
        mainBnrCommon(mainBnr);
    });

    //이벤트 배너 PC,MO
    var main_bnr02 = $('.main_bnr02 .slide , .main_bnr02_m .slide');
    main_bnr02.owlCarousel({
        loop: true,
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000000,
    });
    if($(".main_bnr02 .owl-dots ,.main_bnr02_m .owl-dots").hasClass("disabled") === true) {
        $(".main_bnr02 .owl-stage ,.main_bnr02_m .owl-stage").addClass('stop')
        } else {
        $(".main_bnr02 .owl-stage, .main_bnr02_m .owl-stage").removeClass('stop')
    }

    //신규강좌
    var main_bnr03 = $('.main_bnr03 .slide');
    main_bnr03.owlCarousel({
        loop: true,
        items: 1,
        autoplay: false,
        autoplayTimeout: 5000000,// 터치 후 자동오토플레이 지연
        //autoplayTimeout: 5000,
        //autoplaySpeed: 1000,
        //autoplayHoverPause: true,
    });
    if($(".main_bnr03 .owl-dots").hasClass("disabled") === true) {
        $(".main_bnr03 .owl-stage").addClass('stop')
        } else {
        $(".main_bnr03 .owl-stage").removeClass('stop')
    }

    //이달의 선생님
    var month_teacher = $('.month_teacher .slide');
    month_teacher.owlCarousel({
        items: 2.4,
        autoplay: false,
        loop: true,
        autoplayHoverPause: true,
        margin: 11,
        nav: false,
        dots: false,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000,
        responsive: {
            768: {
                items: 5,
                nav: true
            }
        }
    });

    //수강후기
    var lec_review = $('.lec_review .slide');
    lec_review.owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        responsive: {
            768: {
                items: 2,
                nav: true
            },
            1280: {
                items: 2.99,
                nav: true
            }
        }
    });

    //인기 강좌 순위
    $(".rank_tab li").click(function () {
        var rankTabIndex = $(this).index();

        $(".rank_tab li").removeClass("on");
        $(this).addClass("on");

        $(".rank_txt").removeClass("view");
        $(".rank_txt").eq(rankTabIndex).addClass("view");

        if (rankTabIndex === 0) {
            $(".btn_moreview01").css("display", "block");
            $(".btn_moreview02").css("display", "none");
        } else if (rankTabIndex === 1) {
            $(".btn_moreview01").css("display", "none");
            $(".btn_moreview02").css("display", "block");
        }
    });

    // 학년별 추천강좌 ,추천 필수 교재
    $(".recommend_tab li").click(function () {
        var recommend_tab = $(this).index();
        $(".recommend_tab li").removeClass("active");
        $(this).addClass("active");
        $(".recommend_cnt").removeClass("active");
        $(".recommend_cnt").eq(recommend_tab).addClass("active");
    });

    $(".cnt_tab01 dd button").click(function () {
        var cnt_tab01 = $(this).parent().index();
        $(".cnt_tab01 dd button").removeClass("active");
        $(this).addClass("active");
        $(".cnt_inner01").removeClass("active");
        $(".cnt_inner01").eq(cnt_tab01).addClass("active");
    });

    $(".cnt_tab02 dd button").click(function () {
        var cnt_tab02 = $(this).parent().index();
        $(".cnt_tab02 dd button").removeClass("active");
        $(this).addClass("active");
        $(".cnt_inner02").removeClass("active");
        $(".cnt_inner02").eq(cnt_tab02).addClass("active");
    });

    // 강좌,교재 랜덤클릭 추가
    var recommend_click = $('.recommend_tab>li');
    var randomTab = recommend_click.eq(Math.floor(Math.random() * recommend_click.length));
    randomTab.addClass('active').find('a').trigger('click');
    recommend_click.click(function() {
        recommend_click.removeClass('active');
        $(this).addClass('active');
    });

    // 학년설정 레이어 2차내용
    $(".btn_setclass_close").click(function() {
        $(".user_status04").css("display", "none");
    });
    $(".btn_setclass").click(function() {
        $(".user_status04").css("display", "block");
    });

    //모바일 학년설정
    $('.btn_setclass_view,.user_info strong').click(function() {
        $('.select_class_mobile').toggle();
        $('.btn_setclass_view').toggleClass('open');
    });
});

/*
//인기 강좌 순위 순차 롤링 삭제 요청
function startAnimation(rankElement, rankClass) {
    var rankTime;
    rankTime = setInterval(function () {
        var rankList = document.querySelectorAll(rankClass + " li");
        var activeList = document.querySelector(rankClass + " li.active");
        var nextIndex;

        if (activeList) {
            var currentIndex = Array.from(rankList).indexOf(activeList);
            nextIndex = (currentIndex + 1) % rankList.length;
            activeList.classList.remove("active");
        } else {
            nextIndex = 0;
        }

        rankList[nextIndex].classList.add("active");
    }, 3000);
}

var rankElement1 = document.querySelector(".rank_txt01");
startAnimation(rankElement1, ".rank_txt01");

var rankElement2 = document.querySelector(".rank_txt02");
startAnimation(rankElement2, ".rank_txt02");

$(".rank_tab li").click(function () {
    var rankTabIndex = $(this).index();

    $(".rank_tab li").removeClass("on");
    $(this).addClass("on");

    $(".rank_txt").removeClass("view");
    $(".rank_txt").eq(rankTabIndex).addClass("view");

    if (rankTabIndex === 0) {
        $(".btn_moreview01").css("display", "block");
        $(".btn_moreview02").css("display", "none");
    } else if (rankTabIndex === 1) {
        $(".btn_moreview01").css("display", "none");
        $(".btn_moreview02").css("display", "block");
    }

    var rankList1 = document.querySelectorAll(".rank_txt01 li");
    var rankList2 = document.querySelectorAll(".rank_txt02 li");

    rankList1.forEach(function (li, index) {
        if (index === 0) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });

    rankList2.forEach(function (li, index) {
        if (index === 0) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });

    clearInterval(rankTime);
    startAnimation(rankElement1, ".rank_txt01"), startAnimation(rankElement2, ".rank_txt02");
});
*/

