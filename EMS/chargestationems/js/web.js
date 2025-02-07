










// 日曆1-格式範例:2018/06
$('.datepicker-year-month').datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'yy/mm',
    showMonthAfterYear: true,
    yearRange: new Date().getFullYear() - 100 + ':' + new Date().getFullYear(),    
    showButtonPanel: true,    
    closeText: '確定選擇',
    monthNamesShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    onClose: function(dateText, inst) { 
        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    },    
    // beforeShow: function (input, inst) {
    //     var rect = input.getBoundingClientRect();
    //     setTimeout(function () {
	//         inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
    //     }, 0);
    // }
});
// 日曆1-隱藏日曆與今天按鈕
$(".datepicker-year-month").on('focus', function(){
    $(".ui-datepicker-calendar, button.ui-datepicker-current").hide();    
});

// 日曆2-格式範例:2018/06/20
$('.datepicker-fulldate').datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: 'yy/mm/dd',
    showMonthAfterYear: true,
    yearRange: new Date().getFullYear() - 100 + ':' + new Date().getFullYear(),        
    monthNamesShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],        
});

// 日曆3-格式範例:2018/07/18 13:24
// http://trentrichardson.com/examples/timepicker/
$('.datepicker-fulldate-time').datetimepicker({
    dateFormat: 'yy/mm/dd',
    changeMonth: true,
    changeYear: true,
    monthNamesShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],        
    timeFormat: "HH:mm",
    controlType: 'select',
    oneLine: true,
});

$(".pickDate" ).datepicker({
    dateFormat: 'yy/mm/dd',
    changeMonth: true,
    changeYear: true,
    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

  });

$('#menu-btn').on('click', function(){
    //側邊選單收合
    $('.sidebar').toggleClass('active');
    $('main').toggleClass('active');
});

//全螢幕
// (function () {
    var viewFullScreen = document.getElementById("view-fullscreen");
    if (viewFullScreen) {
        viewFullScreen.addEventListener("click", function () {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm = document.body; //overwrite the element (for IE)
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }, false);
    }

    var cancelFullScreen = document.getElementById("cancel-fullscreen");
    if (cancelFullScreen) {
        cancelFullScreen.addEventListener("click", function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
   
            }
        }, false);
    }


    var fullscreenState = document.getElementById("fullscreen-state");
    if (fullscreenState) {
        document.addEventListener("fullscreenchange", function () {
            fullscreenState.innerHTML = (document.fullscreenElement)? "" : "not ";
        }, false);
        
        document.addEventListener("msfullscreenchange", function () {
            fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";
        }, false);
        document.addEventListener("mozfullscreenchange", function () {
            fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
        }, false);
        
        document.addEventListener("webkitfullscreenchange", function () {
            fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";;
        }, false);
    }

// })();
// 全螢幕要求事件(包括進入及退出)
$(document).on("mozfullscreenchange webkitfullscreenchange fullscreenchange", fullscreenChange);
 
 
// 針對全螢幕狀態處理
function fullscreenChange(){
 var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
 
 // 目前非全螢幕狀態 icon切換
 if( !isFullScreen ){
    $('#view-fullscreen').show();
    $('#cancel-fullscreen').hide();
 }
 else{
    $('#view-fullscreen').hide();
    $('#cancel-fullscreen').show();
 }
}



