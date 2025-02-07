






const main = new Vue({
    el: '#main',
    data: {
        "尖峰電價" : 9.5,
        "離峰電價" : 2.5,
        "電價" : [
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,    //07
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,    //16
            false,
            false,
            false,
            true,
            false,
            false,
            false
        ],
        renderComponent : true
    },
    methods:
    {
        load : function()
        {
        },
        save:function()
        {
            
        },
        change:function(index)
        {
            var EditMode = $('.save-btn').is(":visible");

            if(EditMode === false )     return;

            main.電價[index] = !main.電價[index];
            // console.log( main.電價);

            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            });

        },
        Edit:function()
        {
            $('.hour-box ').addClass('opacity70');
            $('.hour-box .hour ,input.form-control').removeClass('readonly')
            $('.edit-btn').hide();
            $('.save-btn').show();
        },
        Save:function()
        {
            var bool = true; msg = "";
            var peak = $('#peakBill').val();
            var off = $('#offBill').val();
            if (peak == "" || peak == "0") { bool = false; msg += "尖峰電價必須是介於0.1~99.9的數字<br>" }
            if (off == "" || off === "0") { bool = false; msg += "離峰電價必須是介於0.1~99.9的數字<br>" }
            if (bool) {
                $('.hour-box ').removeClass('opacity70');
                $('.hour-box .hour ,.ele-bill.input.form-control').addClass('readonly')
                $('.save-btn').hide();
                $('.edit-btn').show();
                // location.href = location.href
            }
            else {
                Swal.fire({ icon: 'warning', title: '電價設定', html: msg });
            };
        },
        thisMonth : function()
        {
            var y = new Date().getFullYear();
            var m = new Date().getMonth() + 1;
            m = m < 10 ? '0' + m : m.toString();
            return y + "/" + m;
        }
    }
});





  //:value="charger['功率設定']"
window.onload = function()
{    
    main.load();

    // setInterval(function(){
    //     main.change( parseInt(Math.random() * 23));


    // } , 2000);
};





var Today = new Date();
//年視圖
$('#datepickerelecalc').datetimepicker({
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
function clearNoNum(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, "");  //清除除了“數字”和“.”以外的字元
  obj.value = obj.value.replace(/^(\-)*(\d)\.(\d).*$/, '$1$2.$3');//只能輸入1個小數
  function split(num) {
    num.split('');
    return num = num[0] + num[1];
  }
  if (obj.value.indexOf(".") < 0 && obj.value != "") {
    //以上已經過濾，此處控制的是如果沒有小數點，首位不能為類似於 01、02的金額
    obj.value = parseFloat(obj.value);
  }
  if (obj.value.length = 3 && obj.value > 99) {
    obj.value = obj.value.replace(/^(\-)*(\d)(\d)*$/, split);//小於100
  }

}





function Calculate() {
  var bool = true; msg = "";
  var setdate = $('#datepickerelecalc').val()
  if (setdate == "") { bool = false; msg += "請選年/月<br>" }
  if (bool) {
    $('.ele-info').show();
  }
  else {
    Swal.fire({ icon: 'warning', title: '電價計算', html: msg });
  };

}
// 點擊匯出
$("#elecalcDownload").click(function () {
  var csvList = [],
    titleList = [],
    memberContent = "",
    csvContent;
  setdate = $('#datepickerelecalc').val()


  // 取得標題
  $(".elecalc-table th").each(function () {
    titleList.push(this.innerHTML);
  });
  csvList.push(titleList);

  // 取得所有資料
  $(".elecalc-table tbody > tr").each(function () {
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
    type: 'text/csv;charset=utf-8;'
  }));
  $(this).attr('download', setdate + '電費試算表.csv')
  // 產生 csv 連結
  this.href = csvContent;
});



//chart
if (window.innerWidth < 768) {
  $('#myChart').attr("height", 400);
}
var chartColors = {
  red: 'rgb(255, 99, 132,0.5)',
  orange: 'rgb(255, 159, 64,0.5)',
  yellow: 'rgb(255, 205, 86,0.5)',
  green: 'rgb(75, 192, 192,0.5)',
  blue: 'rgb(54, 162, 235,0.5)',
  purple: 'rgb(153, 102, 255,0.5)',
  grey: 'rgb(201, 203, 207,0.5)'
};
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
      {
        label: '尖峰',
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        data: [10, 0, 0, 0, 0, 0, 10, 0, 0, 0, 10, 50, 0, 0, 19, 12, 20, 30, 43, 30, 10, 50, 20, 10, 10, 50, 0, 0, 19, 10, 50,],
        fill: false,
        stack: 'Stack 0',

      },
      {
        label: '離峰',
        backgroundColor: window.chartColors.green,
        borderColor: window.chartColors.green,
        data: [5, 0, 0, 0, 0, 0, 30, 0, 0, 0, 25, 50, 0, 0, 99, 12, 32, 37, 47, 35, 17, 5, 20, 14, 0, 0, 0, 0, 0, 10, 0, 0, 0, 10, 50,],
        fill: false,
        stack: 'Stack 0',
      },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: ''
      }
    }
  }
});

