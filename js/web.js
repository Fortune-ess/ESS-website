$(function () {
    $('header').load("header.html");
    $('footer').load("footer.html");
});


$(document).ready(function () {

    var windowsize = $(window).width();
    if (windowsize <= 768) {
        $(".nav-bar").hide();
    } else {
        $(".nav-bar").show()
    }
    var height = $('.swipervideo').height();
    $('.swiper-slide').css('height', height)
})

$(window).resize(function () {
    var windowsize = $(window).width();
    if (windowsize <= 992) {
        $(".nav-bar").hide();
    } else {
        $(".nav-bar").show()
    }
})
$(".hanberger").click(function () {
    $(".nav-bar").slideToggle();
})
$('.hanberger').addClass("act")
$(window).scroll(() => {
    var scrollY = window.scrollY;
    if (scrollY < 100) {

        $('header').addClass("act")
        $('.hanberger').addClass("act")
    } else {

        $('.hanberger').removeClass("act")
        $('header').removeClass('act');
    }
});
$('.gotop').on("click", function () {
    $('html,body').animate({ scrollTop: 0 }, 1000)
})
$(window).scroll(() => {
    var scrollY = window.scrollY;
    if (scrollY > 100) {
        $('header').addClass("act")
    } else {
        $('header').removeClass('act');
    }
});
var swiper = new Swiper('.bannerSwiper', {
    // speed: 600,
    // effect: "fade",
    parallax: true,
    autoplay: {
        delay: 6000, // 3秒切換一次
        stopOnLastSlide: false,
        disableOnInteraction: true
    },
    loop: true,
    effect: "fade",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper2 = new Swiper('.serviceswiper', {

    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: !0,
});
var swiper2 = new Swiper('.parnerSwiper', {

    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: !0,
    loop: true,
    // loopFillGroupWithBlank: true,
    breakpoints: {
        1000: {
            slidesPerView: 2,

        }
    }
});



$('.about_group_txt').hide();
$('.about_group_txt:eq(0)').show();
$('.imgbtn:eq(0)').addClass('act');
$('.imgbtn').click(function () {
    var i = $(this).data('type');
    console.log(i)
    $('.about_group_txt').hide();
    $('.imgbtn').removeClass('act');
    $(this).addClass('act');
    $('.about_group_txt:eq(' + (i - 1) + ')').show()
})

function operation() {
    let sReg = document.getElementById('irrtype_1');
    let dReg = document.getElementById('irrtype_2');
    let eDReg = document.getElementById('irrtype_3');
    let mw = +(document.getElementById('mw').value);
    let ans = document.getElementById('answer');


    if (sReg.checked && mw <= 5) {
        // ans.value = (mw * 5.4 + Math.random()).toFixed(2);
        ans.value = (mw * 5.43.toFixed(2));

    }

    if (dReg.checked && mw <= 5) {
        ans.value = (mw * 5.13 + 4).toFixed(2);

    }

    if (eDReg.checked && (mw >= 10 || mw <= 200)) {
        ans.value = (mw * 0.0998 + 4.8).toFixed(2);

    }

    if (eDReg.checked && (mw < 10 || mw > 200)) {
        ans.value = "";
        alert(`😅 很抱歉~ 請重新輸入，容量需介於10MW~200MW之間。`);
    }

    else if ((sReg.checked || dReg.checked) && mw > 5) {
        ans.value = "";
        alert(`😅 很抱歉~ 請重新輸入，容量需介於1MW~5MW之間。`);
    }

};

// new PV + old PV
let oldMw_input = document.getElementById('old_mw').addEventListener('input', total_mw);
let newMw_input = document.getElementById('new_mw').addEventListener('input', total_mw);
function total_mw() {
    let oldMw = + document.getElementById('old_mw').value;
    let newMw = + document.getElementById('new_mw').value;
    let totalMw = oldMw + newMw;
    if (totalMw) {
        document.getElementById('total_mw').innerText = totalMw;
    } else {
        totalMw.value = ''
    }
};


//display calcuation results
function calculation() {
    let newMw = + document.getElementById('new_mw').value;
    let pv_mw = document.getElementById('pv_mw');
    let pv_mwh = document.getElementById('pv_mwh');
    let pv_irr = document.getElementById('pv_irr');

    pvMw = +(newMw / 1.5).toFixed(2);
    pvMwh = +(pvMw * 3.8).toFixed(2);
    pv_mw.innerText = pvMw;
    pv_mwh.innerText = pvMwh;
    if (pvMw <= 19) {
        pv_irr.innerText = ((pvMw + 11.3) * .929).toFixed(2);
    } else if (pvMw > 19 && pvMw < 19.33) {
        pv_irr.innerText = (pvMw + 11.49).toFixed(2);
    } else if (pvMw >= 19.33) {
        pv_irr.innerText = "31.23";
    } else {
        pv_irr.innerText = "";
    }
}

function resetAll() {
    pv_mw.innerText = "";
    pv_mwh.innerText = "";
    pv_irr.innerText = "";
    document.getElementById("total_mw").innerText = "";
}