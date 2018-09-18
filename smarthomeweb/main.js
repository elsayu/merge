const SHEETDB_API_ID = "5b960cd377796";

$(document).ready(function() {
    var flg
    //=false;
    getLightSwitchStatus();
    
    $("input[type=checkbox]").change(function() {
        //alert($( "input[type=checkbox]" ).val());
        if(flg==false){
            $("h1").text("電燈狀態：開");
            $("img").attr("src","smarthomeweb/images/pic_bulbon.gif");
            flg=true;
        }else{
            $("h1").text("電燈狀態：關");
            $("img").attr("src","smarthomeweb/images/pic_bulboff.gif");
            flg=false;
        }
        //alert(flg);
        updateLightSwitchStatus(flg);
    });
});

function getLightSwitchStatus(){
    var url = "https://sheetdb.io/api/v1/"+SHEETDB_API_ID+"/search?";
    var data=$.getJSON(url,{
        light_name:"main"
    })
    .done(
        function(msg){
            //console.log(msg);
            $("h1").text("電燈狀態："+msg[0].light_switch);
            if(msg[0].light_switch=="開"){
                $("img").attr("src","smarthomeweb/images/pic_bulbon.gif");
                //flg=true;
            }else{
                $("img").attr("src","smarthomeweb/images/pic_bulboff.gif");
                //flg=false;
            } 
        }
    )
    .fail(
        function(msg){
            console.log("fail!");
        }
    )
    .always(
        function(msg){
            console.log("complete!");
        }
    );
}
function updateLightSwitchStatus(flg){
    
    var uri = "https://sheetdb.io/api/v1/"+SHEETDB_API_ID+"/light_name/main";
    var thisQs={};
    thisQs.light_name = "main";  
    var switchStatus="";
    (flg)? switchStatus="開" : switchStatus="關";
    thisQs.light_switch = switchStatus;
    $.ajax({
      url: uri,
      type: 'PUT',
      data: {"data":[thisQs]}
    })
    .done(function(data){
        alert("回寫資料庫成功");
        console.log('success update!');
    })
    .fail(
        function(msg){
            console.log("fail!");
        }
    )
    .always(
        function(msg){
            console.log("complete!");
        }
    );
}