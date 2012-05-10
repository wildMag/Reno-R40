/*<![CDATA[*/
// Load a CSS file only if javascript is active
	doloadCSS("scripts/highslide/gallery-css.css");
	doloadCSS("scripts/highslide/highslide.css");
		
$(document).ready(function() 
{
	$('.thumbnailL').addClass('withJS');
	$('.thumbnailR').addClass('withJS');
	/**/

	$('.withJS').each(function(index) {
			var copyrightSpace = $(this).find('.imageTitle');
			var captionSpace = $(this).find('.thumbnail a');
			$(this).find('ul.tools').remove();
			var copyrightText = '<p class="imageCopyright">'+$(this).find('.imageCopyright').text()+'</p>';
			$(copyrightText).insertAfter(copyrightSpace);
			// $(this).find('.imageCopyright').clone().insertAfter(copyrightSpace);
			$(this).find('.thumbnail a').attr('rel','highslide').append('<span class="magnify"/>');
			$(this).find('.imageCopyright .text').css({ paddingRight: $(this).find('.magnify').width() + 5 + 'px'  });
			$(this).find('.caption .imageLegend').wrap('<div class="legendWrapper" />');
			var captionText = $(this).find('.caption').removeClass('caption').addClass('highslide-caption').detach();
			$(captionText).insertAfter(captionSpace);
	});
});
/*]]>*/