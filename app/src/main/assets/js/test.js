$(document).click(function(event) {
    var el = $(event.target);
    var content = el.text(); // Gets the content of the element
    var id = el.attr("id"); // Gets the id of the element. id can be replaced with any other attribute within the element, such as class, src, href etc.
    
    //var cls = el.attr("class");
    //var href = el.attr("href");
    //var atts = el.attributes;
    //var n = event.target.nodeName;
    //var n = event.target.parentNode;
    
    // MDL creates a <span> tag after the <a href..> tag. Thus the parent is <a href..> tag.
    // How do I catch the event?
    var n = el.parent().prop("nodeName");
    var o = el.parent().attr("href");
    var p = el.prop("nodeName");
    var q = el.attr("id");
    //alert(content+" "+id+" "+cls+" "+n);
    //alert("n:"+n+" o:"+o+" p:"+p+" q:"+q);
    var a = $('a[href]');
    a.on('click',function(){alert(a.attr("href"));});

    
}); 
