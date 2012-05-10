/*<![CDATA[*/
// Load a CSS file only if javascript is active
function doloadCSS(url){
    $("head").append("<link>");
		var baseCssElement = $('script[src$="jquery.loadCSS.js"]');
    css = $("head").children(":last");
    css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: baseCssElement.attr('src').replace("scripts/jquery.loadCSS.js",url)
    });
}
/*]]>*/