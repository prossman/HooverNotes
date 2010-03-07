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

$(".sheet_container_annotation").livequery("dblclick", function(e){
  var target = $(e.target);
  alert("FC Bayern, forever number... " + target.id);
  var sheetId = $(target).children("input").attr("id");
  alert("...one! " + sheetId);
  hnView.makeSheetActive(sheetId);    
});