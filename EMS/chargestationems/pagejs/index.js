






const main = new Vue({
    el: '#main',
    data: {
        "即時容量警示" : {
            "contract" : 100,
            "now" : 50
        },
        "本日最高輸出" : {
            "t" : "PM 08:15",
            "p" : 93
        },
        "本日用電" : 30.4,
        "本日充電次數" : 53,
        "總樁數" : 36,
        "充電樁" : [
            {"充電樁ID":1101 ,"輸出(kW)": 7.12,"狀態":"使用中"},
            {"充電樁ID":1101 ,"輸出(kW)": 7.12,"狀態":"使用中"},
            {"充電樁ID":1101 ,"輸出(kW)": 7.12,"狀態":"故障中"},
            {"充電樁ID":1101 ,"輸出(kW)": 7.12,"狀態":"使用中"},
            {"充電樁ID":1101 ,"輸出(kW)": 7.12,"狀態":"待機中"}
        ],
        "環境資訊" : {
            "A-1" : {"溫度":22.1 , "濕度":35.8},
            "A-2" : {"溫度":22.1 , "濕度":35.8}
        }
    },
    methods:
    {
        update: function()
        {            
            var now = main["即時容量警示"]["now"];
            var contract = main["即時容量警示"]["contract"];
            var percent = now / contract;

            $('.now-num').text(now + " kW")
            if (0.79 > percent) {
                $('#status-bar').css({ width: (percent * 100) + "%", backgroundColor: "#89B030" })
                $('.now-num').css({ color: "#89B030" })
                $('.status-lable').hide();
                $('.adequate').show();
            }
            else if (percent > 0.99) {
                $('#status-bar').css({ width: (percent * 100) + "%", backgroundColor: "#d62d43" })
                $('.now-num').css({ color: "#d62d43" })
                $('.status-lable').hide();
                $('.full').show();
            }
            else {
                $('#status-bar').css({ width: (percent * 100) + "%", backgroundColor: "#ea6e03" })
                $('.now-num').css({ color: "#ea6e03" })
                $('.status-lable').hide();
                $('.almost-full').show();
            }    
        },

        getChrageStatus : function(sta)
        {
            switch( sta )
            {
            case "使用中":  return "text-bg-success";
            case "待機中":  return "text-bg-warning";
            case "故障中":  return "text-bg-danger";
            }
        }
    }
});







  if (window.innerWidth < 768) {
    $('#myChart').attr("height", 400);
  }
  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  var ctx = document.getElementById('myChart');
  
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['00點', '01點', '02點', '03點', '04點', '05點', '06點', '07點', '08點', '09點', '10點', '11點', '12點', '13點', '14點', '15點', '16點', '17點', '18點', '19點', '20點', '21點', '22點', '23點'],
      datasets: [{
        label: '總輸出',
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: [100, 0, 0, 0, 0, 0, 100, 0, 0, 0, 100, 500, 0, 0, 19900, 12550, 32500, 37000, 43750, 35000, 17500, 5000, 200, 100],
        fill: false,
      }]
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
          text: 'Chart.js Line Chart'
        }
      }
    }
  });


/*
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        //'2022-11-25','2022-11-26'
      ],
      datasets: [{
        label: '總輸出',
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: [100, 0, 0, 0, 0, 0, 100, 0, 0, 0, 100, 500, 0, 0, 19900, 12550, 32500, 37000, 43750, 35000, 17500, 5000, 200, 100],
        fill: false,
      }]
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
          text: 'Chart.js Line Chart'
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            //parser: 'YYYY-MM-DD HH:mm:ss',
            //unit: 'hour',
            displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH:mm:ss',
                day: 'MMM DD',
                week: 'MMM DD',
                month: 'MMM DD',
                quarter: 'MMM DD',
                year: 'MMM DD',
            },
            //tooltipFormat: 'D MMM YYYY - HH:mm:ss'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'value'
          }
        }
      }
    }
  });

*/


  
  
  
window.onload = function()
{    
    main.update();    
};




//DEMO
function SSEevent()
{
    var source = new EventSource("ajax/index.jhp");
    source.onmessage = function(event) 
    {        
        try
        {
            let val = JSON.parse( event.data );
            if( val !== undefined )
            {
                for(var item in main)
                {
                    if( val[item] !== undefined )
                    {
                        main[item] = val[item];
                    }
                }   
                main.update();  
    
                if( val["myChart"] !== undefined )
                {
                    myChart["data"]["datasets"][0]["data"] = val["myChart"];
                    //myChart["data"]["labels"] = val["myLabels"];
                    myChart.update();   
                }
                
            }
        }
        catch(e)
        {

        }
    };
    source.onopen = function() {
    };
    source.onerror = function(err) {        
        // source.close(); //NO CLOSE WILL AUTO RELINK
    };  
}
SSEevent();



// function Frontdemo()
// {
//     main["即時容量警示"]["now"] = parseInt(Math.random() * 150);//main["即時容量警示"]["contract"]);
//     main["本日最高輸出"]["p"] = parseInt(Math.random() * main["即時容量警示"]["contract"]);
//     main["本日用電"] = Math.random() * 300;

//     // main["總樁數"] = parseInt(Math.random() * 20);
//     main["本日充電次數"] = parseInt(Math.random() * 20);

//     main["充電樁"] = [];
//     for( var i = 0 ; i < main["總樁數"] ; i++)
//     {
//         var v =  {"充電樁ID":1100 ,"輸出(kW)": 0,"狀態":"使用中"};
//         v["充電樁ID"] += i;
//         v["輸出(kW)"] = Math.random() * 15; 
//         var s = Math.random();
//         v["狀態"] = s < 0.33 ? "待機中" : ( s < 0.9 ? "使用中" : "故障中");       
//         main["充電樁"].push(v);    
//     }
    

//     for(var item in main["環境資訊"])
//     {
//         main["環境資訊"][item]["溫度"] = Math.random() * 15 + 20; 
//         main["環境資訊"][item]["濕度"] = Math.random() * 60 + 30;
//     }    

    
//     for(var i = 0 ; i < myChart["data"]["datasets"][0]["data"].length ; i++ )
//     {
//         myChart["data"]["datasets"][0]["data"][i] = parseInt(Math.random() * 150);
//     }


//     myChart.update();   
//     main.update();    
//     setTimeout(demo , 867);
// }
