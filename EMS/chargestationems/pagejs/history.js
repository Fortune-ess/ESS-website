






const main = new Vue({
    el: '#main',
    data: {
    },
    methods:
    {
        
        today : function()
        {
            var y = new Date().getFullYear();
            var m = new Date().getMonth() + 1;
            var d = new Date().getDate();
            
            m = m < 10 ? '0' + m : m.toString();
            d = d < 10 ? '0' + d : d.toString();

            return y + "/" + m + "/" + d;
        }
        ,
        thisMonth : function()
        {
            var y = new Date().getFullYear();
            var m = new Date().getMonth() + 1;
            m = m < 10 ? '0' + m : m.toString();
            return y + "/" + m;
        }
        
    }
});





function Edit() {
    $('.hour-box ').addClass('opacity70');
    $('.hour-box .hour ').removeClass('readonly')
    $('.edit-btn').hide();
    $('.save-btn').show();

    $('.hour-box .hour').on('click', function () {
      if ($(this).hasClass('rush-hour')) {
        $(this).removeClass('rush-hour')
        $(this).addClass('off-peak');
      }
      else {
        $(this).removeClass('off-peak')
        $(this).addClass('rush-hour');
      }
    })
  }

  function Save() {
    $('.hour-box ').removeClass('opacity70');
    $('.hour-box .hour ').addClass('readonly')
    $('.save-btn').hide();
    $('.edit-btn').show();
  }

  var Today = new Date();
  var opt1 = {
    startView: 1,
    dateFormat: 'yy/mm/dd',
    changeMonth: true,
    changeYear: true,
    monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    endDate: Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate()
  };
  $("#datepicker-divice").datepicker(opt1);
  $("#datepicker-usestart").datepicker(opt1);
  $("#datepicker-useend").datepicker(opt1);
  $("#abnormal-start").datepicker(opt1);
  $("#abnormal-end").datepicker(opt1);
  //年視圖
  $('#datepicker-chargingset').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy/mm',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 4, //年視圖
    minView: 3,
    monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    startDate: "2020-11-11",
    endDate: Today.getFullYear() + '-' + (Today.getMonth() + 1)
  })
  $('.set-ym').click(function () {
    $('#ui-datepicker-div').hide();
  });

  if (window.innerWidth < 768) {
    $('#TodayUse').attr("height", 400);
    $('#DayUse').attr("height", 400);
    $('#WeekUse').attr("height", 400);
  }
  function Calculate() {


  }
  function deviceSearch() {
    var bool = true; msg = "";
    var date = $('#datepicker-divice').val()
    var selectID = $('.selectID option:selected').val();
    if (date == "") { bool = false; msg += "請選擇日期<br> " }
    if (selectID == "") { bool = false; msg += "請選擇充電樁ID<br> " }
    if (bool) {
      $('#TodayUse').show();
    }
    else {
      Swal.fire({ title: '設備用電查詢', html: msg, icon: 'warning', });
    }


  }

  $('.selectCondition').on('change', function () {
    if (this.value == 'week') {
      $('.dateinputEnd').show();
    } else {
      $('.dateinputEnd').hide();
    }
  });
  function siteSearch() {
    var bool = true; msg = "";
    var datestart = $('#datepicker-usestart').val();
    var dateend = $('#datepicker-useend').val();
    var condition = $('.selectCondition option:selected').val();
    if (condition == 'day') {
      if (datestart == "") { bool = false; msg += "請選擇開始日期<br> " }
    }
    else {
      if (datestart == "") { bool = false; msg += "請選擇開始日期<br> " }
      if (dateend == "") { bool = false; msg += "請選擇結束日期<br> " }
      if (dateend < datestart) { bool = false; msg += "起迄日期設定有誤<br> " }
    }
    if (bool) {
      if (condition == 'day') {
        $('#DayUse').show();
        $('#WeekUse').hide();
      } else {
        $('#WeekUse').show();
        $('#DayUse').hide();
      }
    }
    else {
      Swal.fire({ title: '站點用電資訊查詢', html: msg, icon: 'warning', });
    }
  }
  function chargingRecordSearch() {
    var bool = true; msg = "";
    var dateset = $('#datepicker-chargingset').val();
    var selectID = $('.selectID2 option:selected').val();
    if (dateset == "") { bool = false; msg += "請設定搜尋年月<br> " }
    if (selectID == "") { bool = false; msg += "請選擇充電樁ID<br> " }
    if (bool) {
      $('#charging-table-outter').show();
      $('.footer-bar').show();
    }
    else {
      Swal.fire({ title: '充電紀錄查詢', html: msg, icon: 'warning', });
    }
    ;

  }
  function abnormalSearch() {
    var bool = true; msg = "";
    var datestart = $('#abnormal-start').val();
    var dateend = $('#abnormal-end').val();
    if (datestart == "") { bool = false; msg += "請選擇開始日期<br> " }
    if (dateend == "") { bool = false; msg += "請選擇結束日期<br> " }
    if (dateend < datestart) { bool = false; msg += "起迄日期設定有誤<br> " }
    if (bool) {
      $('.abnormal-table').show();
      $('.footer-bar').show();
      $('#abnormalDownload').attr('href', 'index.html');
    }
    else {
      Swal.fire({ title: '異常紀錄查詢', html: msg, icon: 'warning', });
    };

  }
  // 點擊匯出
  $(".btn-download").click(function () {
    var csvList = [],
      titleList = [],
      memberContent = "",
      csvContent;
    setdate = $('#datepickerelecalc').val();
    tableID = "";
    cardtitle = $(this).parent('.tool-bar').siblings('.page-title').text();
    fileName = ""
    console.log(tableID);
    //檔案名稱
    if (cardtitle == "充電紀錄") {
      var dateset = $('#datepicker-chargingset').val();
      var selectID = $('.selectID2 option:selected').val();
      tableID = "charging-table"
      fileName = dateset + "-" + selectID + "充電紀錄"
    } else if (cardtitle == "異常紀錄") {
      var datestart = $('#abnormal-start').val();
      var dateend = $('#abnormal-end').val();
      fileName = datestart + "-" + dateend + "充電紀錄"
      tableID = "abnormal-table"
    }

    // 取得標題
    $("#" + tableID + " th").each(function () {
      titleList.push(this.innerHTML);
    });
    console.log(titleList);
    csvList.push(titleList);

    // 取得所有資料
    $("." + tableID + " tbody > tr").each(function () {
      var regList = [];
      $(this).children("td").each(function () {
        regList.push(this.innerHTML);
      });
      csvList.push(regList);
    });

    // 產生 csv 內容
    csvList.forEach(function (rowArray) {
      var row = rowArray.join(",");
      memberContent += row + "\r\n";
    });

    // 產生 csv Blob
    csvContent = URL.createObjectURL(new Blob(["\uFEFF" + memberContent], {
      type: 'application/vnd.ms-excel;charset=utf-8;'
    }));
    $(this).attr('download', fileName + '.xlsx')
    console.log(csvList);
    // 產生 csv 連結
    this.href = csvContent;
  });





  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  var ctx = document.getElementById('TodayUse');
  var TodayUse = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00：00', '00：30', '01：00', '01：30', '02：00', '02：30', '03：00', '03：30', '04：00', '04：30', '05：00', '05：30', '06：00', '06：30', '07：00', '07：30', '08：00', '08：30', '09：00', '09：30', '10：00', '10：30', '11：00', '11：30', '12：00',
        "12：30", '13：00', '13：30', '14：00', '14：30', '15：00', '15：30', '16：00', '16：30', '17：00', '17：30', '18：00', '18：30', '19：30', '19：00', '20：00', '20：30', '21：00', '21：30', '22：00', '22：30', '23：00', '23：30'],
      datasets: [
        {
          label: '充電樁1',
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: [7, 8, 4, 6, 8, 4, 6, 8, 3, 5, 3, 4, 8, 3, 7, 5, 4, 3, 8, 7, 8, 4, 6, 8, 4, 6, 8, 3, 5, 3, 4, 8, 3, 7, 5, 4, 3, 8,],
          fill: false,
        },
        {
          label: '充電樁2',
          backgroundColor: window.chartColors.orange,
          borderColor: window.chartColors.orange,
          data: [8, 6, 5, 6, 7, 3, 7, 5, 4, 4, 8, 8, 7, 3, 6, 5, 8, 8, 5, 6, 3, 4, 5, 6, 8, 5, 4, 3, 8, 6, 7, 5, 7, 5, 4, 4, 8, 8, 7,],
          fill: false,
        },
        {
          label: '充電樁3',
          backgroundColor: window.chartColors.yellow,
          borderColor: window.chartColors.yellow,
          data: [4, 3, 8, 5, 8, 4, 7, 3, 6, 8, 4, 6, 7, 3, 6, 7, 3, 8, 7, 8, 5, 4, 3, 4, 5, 8, 6, 7, 8, 6, 3, 8, 5, 8, 4, 7, 3, 6, 8, 4, 6, 7, 3],
          fill: false,
        },
        {
          label: '充電樁4',
          backgroundColor: window.chartColors.green,
          borderColor: window.chartColors.green,
          data: [7, 6, 4, 8, 8, 5, 3, 8, 5, 7, 5, 3, 3, 8, 8, 5, 5, 3, 8, 8, 6, 4, 8, 8, 4, 3, 8, 5, 7, 4, 3, 3, 8, 5, 7, 4, 3, 3, 8, 8,],
          fill: false,
        },
        {
          label: '充電樁5',
          backgroundColor: window.chartColors.blue,
          borderColor: window.chartColors.blue,
          data: [7, 3, 4, 4, 5, 8, 7, 8, 3, 5, 4, 3, 5, 8, 5, 8, 3, 5, 8, 7, 8, 6, 3, 5, 8, 5, 8, 6, 7, 3, 4, 3, 4, 4, 5, 8, 7, 8, 3, 5,],
          fill: false,
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          text: '今日用電狀態',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'index',
          intersect: false
        }
      }
    }
  });

  var ctx2 = document.getElementById('DayUse');
  var DayUse = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '17', '19', '20', '21', '22', '23'],
      datasets: [
        {
          label: '尖峰',
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 8, 6, 6, 7, 0, 0],
          stack: 'Stack 0',
        },
        {
          label: '離峰',
          backgroundColor: window.chartColors.green,
          borderColor: window.chartColors.green,
          data: [9, 10, 1, 6, 7, 2, 7, 5, 1, 4, 9, 8, 7, 3, 6, 5, 5, 0, 0, 0, 0, 0, 0, 4, 4],
          stack: 'Stack 0',
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    }
  });

  var ctx3 = document.getElementById('WeekUse');
  var WeekUse = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['禮拜一', '禮拜二', '禮拜三', '禮拜四', '禮拜五', '禮拜六', '禮拜日'],
      datasets: [
        {
          label: '尖峰',
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: [5, 8, 4, 6, 9, 4, 6],
          stack: 'Stack 0',
        },
        {
          label: '離峰',
          backgroundColor: window.chartColors.green,
          borderColor: window.chartColors.green,
          data: [7, 6, 1, 6, 7, 2, 7,],
          stack: 'Stack 1',
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
        }
      }
    }
  });