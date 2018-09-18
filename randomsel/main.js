$(document).ready(function() {
    $("input").click(function()
     {  
        var numberOfListItem=$("#choices li").length;
        var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
        var randomChildNumber1=Math.floor(Math.random()*numberOfListItem);
        $("H1").text($("#choices li").eq(randomChildNumber).text()+" and "+$("#choices li").eq(randomChildNumber1).text());
     });
});