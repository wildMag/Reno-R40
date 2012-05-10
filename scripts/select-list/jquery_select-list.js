/**
 * --------------------------------------------------------------------
 * SearchableSelect - Plugin for JQuery (tested for 1.3.2)
 * Author: Robin Orheden (www.redemption.se) - 2009.04.08
 * Modified by Christophe Dri to follow CTIE accessibility specifications.
 * Url: www.redemption.se/other-means-of-selection/
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
$.fn.select_list = function(settings){
	var o = $.extend({
		expanded: ''
	},settings);
	
    
	return $(this).find('>li').each(function()
    {
      /* Hide list element */
      $(this).css("display", "none");
          
      /* Create new Select-element */
      var year = $(this).find('>a').html();
      var label = $('<label for="y'+year+'">'+$(this).find('>a').eq(0).html()+' : </label>');
      var select = $('<select id="y'+year+'" class="selected-list"><option value="">------------------------</option></select>')

      $(this).after($('<div class="center archiveForm"></div>').append($('<p></p>').append(label).append(select)));
      
      /* Loop-through list and add children to select */
      
      $(this).find("li").each(function()
      {
        /* Setup values */
        var Anchor = $(this).find("a").eq(0), Value = (Anchor.length > 0 ? $(Anchor).attr("href") : '');
        var SelectedElement = (Anchor.hasClass("selected") ? ' selected' : '');
        
        /* Add child to select */
        select.append("<option value='"+Value+"'"+SelectedElement+">"+$(this).html()+"</option>");
      });

      $("select.selected-list").change(function()
      {
        if(this.value.length > 0) window.location.href = this.value;
      });
    
    });
};