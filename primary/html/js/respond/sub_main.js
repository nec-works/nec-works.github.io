$(document).ready(function () {
    creLectureTab();
    line_bnr();
    cate_bnr();
    book_bnr();
    myteacher_bnr();
    //bookmainTab();
    myteacherTab();
    recomend_lecuture();
    recomend_book();
});

//창의체험 - 상단 배너 영역
function creLectureTab() {
    var creLectureList = new Swiper(".cre_lecture_bnr", {
        slidesPerView: 3,
        loop: false,
        spaceBetween: 10,
        speed: 600,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".cre_button_next",
            prevEl: ".cre_button_prev",
        },
        breakpoints: {
            //PC defult
            1280: {
                slidesPerView: 5,
                spaceBetween: 23,
            },
            //pc 981px - 1279
            981: {
                slidesPerView: 4,
                spaceBetween: 23,
            },
            //tablet 768 ~ 980 
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
    //태그별 이벤트
    $('.cre_tag_btn').on("click", function () {

        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }

        var creSlideWrap = $(".cre_lecture_bnr");
        var creIndex = $(this).attr('data-index');
        var creCont = $("." + creIndex);

        creSlideWrap.addClass("off");

        if ($(this).hasClass("on")) {
            creCont.addClass("on");
        } else {
            creCont.removeClass("on");
        }

        if ($('.cre_tag_btn').hasClass("on")) {
            $(".cre_tag_all").addClass("off");
        } else {
            $(".cre_tag_all").removeClass("off");
            creSlideWrap.removeClass("off");
        }

        creLectureList.update();
        creLectureList.slideTo(0);

        return false;
    });
    //전체 클릭 이벤트
    $('.cre_tag_all').on("click", function () {

        $(".cre_lecture_bnr .swiper-slide").removeClass("on");

        if ($(this).hasClass("off")) {
            $(this).removeClass("off");
        }
        if ($(".cre_tag_btn").hasClass("on")) {
            $(".cre_tag_btn").removeClass("on");
            $(".cre_lecture_bnr").removeClass("off");
        }

        creLectureList.update();
        creLectureList.slideTo(0);

        return false;

    });
}
//창의체험 - 카테고리별 배너
function cate_bnr() {
    var cate_bnr = new Swiper('.cre_main .cate_bnr .swiper_box', {
        slidesPerView: 2,
        spaceBetween: 11,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },
        breakpoints: {
            1280: {
                spaceBetween: 15,
            },
        },
    });
}

//창의체험 & 강좌교재 - 띠배너
function line_bnr() {
    var line_bnr = new Swiper('.cre_main .line_bnr,.lectbook_main .line_bnr', {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
}

//강좌교재 - 학년별,교재별 추천강좌 탭
/* function bookmainTab() {
    $('.tab_lecture ul li a').first().addClass('on');
    $('.cnt_lecture_box').hide().first().show();
    $('.tab_lecture ul li a').click(function (e) {
        e.preventDefault();
        var idxLecture = $(this).parent().index();
        $('.tab_lecture ul li a').removeClass('on');
        $(this).addClass('on');
        $('.cnt_lecture_box').hide().eq(idxLecture).show();
    });
    $('.tab_book ul li a').first().addClass('on');
    $('.cnt_book_box').hide().first().show();
    $('.tab_book ul li a').click(function (e) {
        e.preventDefault();
        var idxBook = $(this).parent().index();
        $('.tab_book ul li a').removeClass('on');
        $(this).addClass('on');
        $('.cnt_book_box').hide().eq(idxBook).show();
    });
} */

//강좌교재 - 학년별추천강좌 배너
function recomend_lecuture() {
    var recomend_lecuture = new Swiper('.lectbook_main .recomend_lecuture .swiper_box', {
        slidesPerView: 2.4,
        spaceBetween: 11,
        slidesOffsetAfter:10,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },
        breakpoints: {
            //PC defult
            1280: {
                spaceBetween: 20,
                slidesPerView: 5,
            },
            //pc 981px - 1279
            981: {
                spaceBetween: 15,
                slidesPerView: 4,
            },
            //tablet 768 ~ 980 
            768: {
                slidesPerView: 4,
            },
        },
    });
}

//강좌교재 - 학년별추천교재 배너
function recomend_book() {
    var recomend_book = new Swiper('.lectbook_main .recomend_book .swiper_box', {
        slidesPerView: 3.3,
        spaceBetween:20,
        slidesOffsetAfter:10,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },
        breakpoints: {
            //PC defult
            1280: {
                slidesPerView: 6,
            },
            //pc 981px - 1279
            981: {
                spaceBetween: 15,
                slidesPerView: 5,
            },
            //tablet 768 ~ 980 
            768: {
                spaceBetween: 0,
                slidesPerView: 4,
            },
        },
    });
}

//강좌교재 - 우리선생님 탭 랜덤노출
function myteacherTab() {
    var teacherTabs = $('.myteacher_bnr .tab_green ul li a');
    var teacherBox = $('.cnt_teacher_box');
    var idxTeacher = Math.floor(Math.random() * teacherTabs.length);

    teacherTabs.removeClass('on').eq(idxTeacher).addClass('on');
    teacherBox.hide().eq(idxTeacher).show();

    teacherTabs.click(function (e) {
        e.preventDefault();
        var i = $(this).parent().index();
        teacherTabs.removeClass('on').eq(i).addClass('on');
        teacherBox.hide().eq(i).show();
    });
}

//강좌교재 - 우리선생님 배너
function myteacher_bnr() {
    var myteacher_bnr = new Swiper('.lectbook_main .myteacher_bnr .swiper_box', {
        slidesPerView: 2.7,
        spaceBetween: 11,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },
        breakpoints: {
            //PC defult
            1280: {
                slidesPerView: 6,
            },
            //pc 981px - 1279
            981: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
            //tablet 768 ~ 980 
            768: {
                slidesPerView: 4,
            },
        },
    });
}

//강좌교재 - 교재 시리즈 배너
function book_bnr() {
    var book_bnr = new Swiper('.lectbook_main .book_bnr .swiper_box', {
        slidesPerView: 1,
        spaceBetween: 11,
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.btn_next',
            prevEl: '.btn_prev',
        },
        breakpoints: {
            //pc 981px 이상
            981: {
                slidesPerView: 3,
            },
            //tablet 768 ~ 980 
            768: {
                slidesPerView: 2,
            },
            
        },

    });
}




