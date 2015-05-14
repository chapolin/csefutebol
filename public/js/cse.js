
function menuEvents() {

  $(".menu-toggle").on("click", function() {
    $(".menu-list").toggle();
  });

}



$(document).ready(function(){
  menuEvents();
});

