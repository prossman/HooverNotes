$("p").livequery("click", function(e){
  var str = "( " + e.pageX + ", " + e.pageY + " )";
  $("span").text("Click happened! " + str);
});
$("p").livequery("dblclick", function(){
  $("span").text("Double-click happened in " + this.tagName);
  $("#suputa").append("<p class='over'>hola</p>");    
});
$("p").livequery("mouseenter mouseleave", function(e){
    $(this).toggleClass("over");
});