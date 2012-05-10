<!--

/* -------------------------------------------------- 
	Script collection specific to gallery visualisation
	 -------------------------------------------------- */

/* Load this css files only if javascript is anabled */

	doloadCSS("scripts/highslide/highslide.css");
	doloadCSS("scripts/highslide/gallery-css.css");
	

/* Load this css files only if javascript is anabled */
function resizeThumbnails(thumbHeight) {
	if(!thumbHeight) { //The mandatory argument is not present - set it
		var thumbHeight=0;
	}
	var t;
	t = setInterval(function() {
	/* Check height of elements every 3 seconds 
		 and adjust height of all boxes if nececary.
		 Interval is necessary if font size or browser zoom changes
	*/
		var thumbHeightIn = 0;
		var thisThumbHeight = 0;
	/* Loop trought all LI elements	*/
		$('#gallery .inside ul').first().children().each(function(index) {
				/* get the "inner" height of the current element	*/
				thisThumbHeight=$(this).find('.thumbnail .contentB').outerHeight();
				/* if it's higher than the highest height set it to current height	*/
				if(thumbHeightIn < thisThumbHeight){
					thumbHeightIn=thisThumbHeight;
				}
		});
		/* Loop trought all LI elements and set identical height to all	*/
		$('#gallery .inside ul').first().children().each(function(index) {
				$(this).find('.thumbnail .contentA').height(thumbHeightIn);
		});
	}, 3000);
}
	
$(document).ready(function() 
{
	/* Javascript is used so set withJS class 
	   and add extra content elements for highslide	*/
	$('#gallery .inside').addClass('withJS');
	$('#gallery .inside .thumbnail').wrapInner('<div class="contentB" />');
	$('#gallery .inside .thumbnail').wrapInner('<div class="contentA" />');
	var thumbHeight = 0;
	$('#gallery .inside ul').first().children().each(function(index) {
			/* create the specific highslide caption element for every image */
			var copyrightSpace = $(this).find('.imageLegend');
			var legendSpace = $(this).find('.caption .imageCopyright');
			var descriptionText = $(this).find('.caption h2').text();
			var captionSpace = $(this).find('.thumbnail a');
			$(this).find('ul.tools').remove();
			$(this).find('.caption h2').remove();
			$(this).find('.imageCopyright').clone().insertBefore(copyrightSpace);
			$(this).find('.thumbnail a').attr('rel','highslide').append('<span class="magnify"/>');
			$(this).find('.imageLegend').clone().insertBefore(legendSpace);
			$('<p class="imageTitle">'+descriptionText+'</p>').insertBefore(legendSpace);
			$(this).find('.caption .imageLegend').wrap('<div class="legendWrapper" />');
			var captionText = $(this).find('.caption').removeClass('caption').addClass('highslide-caption').detach();
			$(captionText).insertAfter(captionSpace);
	});
			/* execute thumbnail height adjustment script */
			resizeThumbnails();
});
-->
