function init() {

  //var something = db.getSong("Tavern");
  var something = db.getSoundscapes();
  $("#json").html(something);
}

$(document).ready(init);
