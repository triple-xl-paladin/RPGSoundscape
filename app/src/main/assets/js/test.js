function init() {

  //var something = db.getSong("Tavern");
  //var something = db.getSoundscapes();
  var something = db.getSoundschemes("Fantasy");
  $("#json").html(something);
}

$(document).ready(init);
