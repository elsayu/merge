var mapArray,ctx,currentImgMainX,currentImgMainY;
var imgMountain,imgMain,imgEnemy;
const num=3;
var flg=false;//true:get key
//var flg1=false;//true:經過沒鎖的門,需重畫門

$(document).ready(function(){
    mapArray=[0,4,1,0,5,0,3,1,2];//九宮格：0可走,1障礙,2終點,3敵人,4鑰匙,5門(鎖)
    ctx=$("#myCanvas")[0].getContext("2d");
    
    imgMain=new Image();
    imgMain.src="rpg01/images/spritesheet.png"
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function()
    {
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    };
    
    imgMountain=new Image();
    imgMountain.src="rpg01/images/material.png";
    imgMountain1=new Image();//重新畫門
    imgMountain1.src="rpg01/images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="rpg01/images/enemy.png"
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
        for(var x in mapArray)
        {
            if(mapArray[x]==1)
            {
                ctx.drawImage(imgMountain,32,65,32,32,x%num*200,Math.floor(x/num)*200,200,200);
            }else if(mapArray[x]==3)
            {                      
                ctx.drawImage(imgEnemy,7,40,104,135,x%num*200,Math.floor(x/num)*200,200,200);
            }else if(mapArray[x]==4)
            {   
                ctx.drawImage(imgMountain,104,40,14,25,x%num*200,Math.floor(x/num)*200,100,190);
            }
            else if(mapArray[x]==5)
            {   
                ctx.drawImage(imgMountain,96,38,32,25,x%num*200,Math.floor(x/num)*200,200,200);
            }
        }
    };}; 
});

$(document).keydown(function(event){
    var targetImgMainX,targetImgMainY,targetBlock,cutImagePositionX;
    event.preventDefault();
    switch(event.which){
       case 37://左
       case 65://左(A)
            targetImgMainX=currentImgMainX-200;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=175;
            break;
       case 38://上
       case 87://上(W)     
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY-200;
            cutImagePositionX=355;
            break;
       case 39://右
       case 68://右(D)
            targetImgMainX=currentImgMainX+200;
            targetImgMainY=currentImgMainY;
            cutImagePositionX=540;
            break;
       case 40://下
       case 83://下(S)
            targetImgMainX=currentImgMainX;
            targetImgMainY=currentImgMainY+200;
            cutImagePositionX=0;
            break;
       default://其他鍵
            return;
    }
    
    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0)
    {  
        targetBlock=targetImgMainX/200+targetImgMainY/200*3; 
    }else
    {
        targetBlock=-1;//異常，不移動 
    }
    
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
    //alert(targetBlock+"/"+flg1);
    if(flg==true)
    {
        ctx.drawImage(imgMountain1,0,38,32,25,200,200,200,200);//重畫沒鎖的門
        //flg1=false;
    }
    
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3 || (mapArray[targetBlock]==5 && flg==false))//出界,山,敵人,沒有鑰匙的門
    {
        //目標位置異常，在原地
    }
    else if(mapArray[targetBlock]==4) //拿到鑰匙
    {
        flg=true;
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    else
    {
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
    
    x=mapArray[targetBlock];
    if (mapArray[targetBlock]==5 && flg==true)
    {
        x=6;
        //flg1=true;
    }
    switch(x)
    {
       case undefined:
           $("#talkBox").text("邊界");
       break;
       case 1:
           $("#talkBox").text("有山");
       break;
       case 2:
           $("#talkBox").text("抵達終點");
       break;
       case 3:
           $("#talkBox").text("嗨～");
       break;
       case 4:
           $("#talkBox").text("拿到鑰匙");
       break;
       case 5:
           $("#talkBox").text("門鎖住");
       break;
       case 6:
           $("#talkBox").text("門沒鎖，可通過");
       break;        
    }
});