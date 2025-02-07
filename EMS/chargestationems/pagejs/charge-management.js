






const main = new Vue({
    el: '#main',
    data: {
      "充電樁" : [],
      "充電樁show" : []
    },
    methods:
    {
        load : function()
        {
            var total = 12;

            main["充電樁"] = [];

            for(i = 0 ; i < total ; i++)
            {
                var v = {"充電樁ID":1101 + i ,"控制群組": "A-1","保障狀態":"啟用" , "功率設定" : 7};
                main["充電樁"].push(v);                
            }
            main["充電樁show"] = JSON.parse(JSON.stringify( main["充電樁"] ) );
        },
        save:function()
        {
            $('.status-label ').removeClass('opacity70');
            $('td input.form-control ').addClass('readonly')
            $('.save-btn').hide();
            $('.edit-btn').show();
            
        },
        search:function(e)
        {
            
            // console.log( e.key , $('#search-value').val()  );
            
            var v = $('#search-value').val();
            

            main["充電樁show"] = [];
            for(var charg of main["充電樁"])
            {
                var id = charg["充電樁ID"].toString();
                // console.log( charg["充電樁ID"] , id.indexOf(v))

                if(charg["充電樁ID"].toString().indexOf(v) > -1)
                {
                    main["充電樁show"].push( charg );   
                }
            }

            // console.log( JSON.stringify(main["充電樁show"]) )
        },
        
        statusChange: function (charger)
        {
            charger["保障狀態"] = charger["保障狀態"] === '啟用' ? "無保障" : "啟用";
            // if ($(obj).hasClass('status-active')) {
            //     $(obj).removeClass('status-active')
            //     $(obj).addClass('status-unsecured').text('無保障');
            // }
            // else {
            // $(obj).removeClass('status-unsecured')
            // $(obj).addClass('status-active').text('啟用');
            // }
        }
        
    }
});





  //:value="charger['功率設定']"
window.onload = function()
{    
    main.load();
};





function Edit() {
  $('.status-label ').addClass('opacity70');
  $('td input.form-control ').removeClass('readonly')
  $('.edit-btn').hide();
  $('.save-btn').show();
}

