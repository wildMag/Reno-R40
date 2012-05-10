var hs_design = 'hs-luxembourg';
var elementFocus = null;
/* workaround for NPS provided path */
hs.graphicsDir = hs.graphicsDir.replace("index.html","");
hs.showCredits = false;
// cet offset correspond au left et right négatif pour l'image et les controls droit
hs.imgLeftRightOffset = 16; 
// define this margin so the modale-box doesn't disapear out of client viewport on top
hs.marginTop = 45;
/* Fixed pox size poses problems in IE due to zIndex Bug
hs.useBox = true;
hs.width = 500;
hs.height = 300;
 */

/* language setup
 * possible values are hs.langSetupFr, hs.langSetupEn and hs.langSetupGe  */
//hs.lang = hs.langSetupFr;


ajaxPopupSetup = {
    objectType: 'ajax',
    cacheAjax: false,
    // alignement de la modale dans l'écran
    align:       "center",
    // styles de bordures de la modale et nom du fichier image utilisé
    outlineType: hs_design,
    // hauteur minimale de la popup
//    minHeight:   500,
    wrapperClassName: 'draggable-header',
    showCredits: false
};

gallerySetup = {
    slideshowGroup: 'gallery',
    // alignement de la modale dans l'écran
    align: 'center',
    // effet à l'ouverture de la modale
    transitions: ["expand", "crossfade"],
    // styles de bordures de la modale et nom du fichier image utilisé
    outlineType: hs_design,
    // styles de l'image, des boutons et du thumbstrip dans la modale
    wrapperClassName: hs_design + ' ' + hs_mode,
    // largeur de la modale en pixels
    maxWidth: 500,
//    minWidth: 250,
		allowSizeReduction:true,
    //suppression de preload
    numberOfImagesToPreload: 0,
    expandCursor: null,
    restoreCursor: null,
    //suppression de l'effet de transition (bug)
    transitionDuration: 0,
    fadeInOut: true,
    dimmingOpacity: 0.5,
    blockRightClick: true,
    showCredits: false
};

if (hs_mode=='hs_slideshow')
{
	hs.numberPosition= 'caption';
  // boutons du slideshow
  hs.skin.controls = '<div class="highslide-slideshow"><ul>'+
    '<li class="highslide-previous">'+
    '<a href="#" title="{hs.lang.previousTitle}" id="hs_prev" accesskey="p">'+
    '<img src="'+hs.graphicsDir+'prev-off.png" class="pngfix" width="29" height="37" alt="{hs.lang.previousText}" /></a>'+
    '</li>'+
    '<li class="highslide-play">'+
    '<a href="#" title="{hs.lang.playTitle}" id="hs_play">'+
    '<img src="'+hs.graphicsDir+'slideshow-off.png" class="pngfix" width="40" height="37" alt="{hs.lang.playText}" /></a>'+
    '</li>'+
    '<li class="highslide-pause">'+
    '<a href="#" title="{hs.lang.pauseTitle}" id="hs_pause">'+
    '<img src="'+hs.graphicsDir+'pause-off.png" class="pngfix" width="40" height="37" alt="{hs.lang.pauseText}" /></a>'+
    '</li>'+
    '<li class="highslide-next">'+
    '<a href="#" title="{hs.lang.nextTitle}"  id="hs_next" accesskey="n">'+
    '<img src="'+hs.graphicsDir+'next-off.png" class="pngfix" width="29" height="37" alt="{hs.lang.nextText}" /></a>'+
    '</li>'+
    '<li class="highslide-move"><a href="#" title="{hs.lang.moveTitle}"></a></li>'+
    '<li class="highslide-full-expand"><a href="#" title="{hs.lang.fullExpandTitle}"></a></li>'+
    '<li class="highslide-close"><a href="#" title="{hs.lang.closeTitle}" ></a></li>'+
    '</ul></div>'
} else {
	hs.numberPosition= null;
}

if (hs_mode=='hs_slideshow')
{
  // Ajout du slideshow et du thumbstrip
  if (hs.addSlideshow) hs.addSlideshow({
    slideshowGroup: 'gallery',
    interval: 3000,
    repeat: true,
    useControls: true,
		numberPosition: 'caption',
    fixedControls: 'true',
    overlayOptions: {
        opacity: 1,
        position: 'top center',
        hideOnMouseOut: false
    },
		thumbstrip: {
			mode: 'horizontal',
			position: 'above',
			relativeTo: 'image'
		}
  });
	hs.numberPosition= 'caption';
}

/*
 * HIGHSLIDE INIT LISTENERS
 * You can hook here to modify highslide beaviour
 */
    // hs container created
//    hs.onActivate = function() {
//        log( "onActivate", arguments );
//    };

    // clicking on dimmer close viewer -> return true
    //             doesnt close viewer -> return false
//    hs.onDimmerClick = function() {
//        log( "onDimmerClick", arguments );
//    };

    // Fires when at least one expander is open and a key is pressed
    // return false to cancel keydown event
    hs.onKeyDown = function(sender, e){
        log( "onKeyDown", arguments );
        log( "pressed keyCode = " + e.keyCode )
        if (!e) e = window.event;

        /*
         * enter default action in highslide is to close the viewer
         * for accessibility concerns, we want it to do the normal job :
         * say make a click on a focused link
         * so we change highslide behavior
         */
        if( e.keyCode == 13 )
        {
            return false;
        }
        return true;
    };

    /* set onclick envent on link */
    hs.onSetClickEvent = function(sender, e){
        log( "onSetClickEvent", arguments );
        // set the onclick for the element
        e.element.onclick = function () {
          return hs.expand(this, gallerySetup );
        }
        // return false to prevent the onclick being set once again
        return false;
    };

/* EXPANDER LISTENERS */
    // Fires after the expander has closed, right before the hs.Expander object is deleted.
    hs.Expander.prototype.onAfterClose = function(){
        log( "onAfterClose", arguments );

        // tabindex on every 'tabable' element in the page
        $("a, area, button, input, object, select, textarea")
            .attr('tabindex', 1);

        // tabindex for elements in the gallery viewer and thumbstrip
        $(".hs-luxembourg a, .hs-luxembourg area, .hs-luxembourg button,"
         + " .hs-luxembourg input, .hs-luxembourg object, .hs-luxembourg select,"
         + " .hs-luxembourg textarea,"
         + " .highslide-thumbstrip a")
            .attr('tabindex', -1);
				if (elementFocus!=null) $(elementFocus).focus();
			
    };

    // Fires after the image or HTML has fully expanded and the optional caption is in place.
    hs.Expander.prototype.onAfterExpand = function( sender ){
        log( "onAfterExpand", arguments );
			
				// ajout de art="" sur l'image principate : accessibilité
				$(".highslide-image").attr('alt','');

        // specific setup for image gallery
        if( sender.objectType == undefined )
        {
            //contrôle accessible du focus clavier
            if (hs_mode=='hs_simple' )
            {
                // document.getElementById('hs_close').focus();
                // Ajout de l'alternative nulle de l'image
                var foo = hs.getElementByClass(document, 'IMG', 'highslide-image');
                foo.alt='';
            }
						/*
            else if ( hs_mode=='hs_slideshow'
                      && sender.objectType == undefined
                      && hs.selectedControl == undefined)
            {
                document.getElementById('hs_prev').focus();
            }
						*/

            // removing hidden nav buttons
            // they canot be removed from the template
            $(".highslide-move a, .highslide-close a").remove();
        }
				
				// Listens to hover on slideshow, thumbstrip and controls and rolls the images
				$(".highslide-slideshow img, .highslide-scroll-up img, .highslide-scroll-down img, .hs_controls img").hover(
				 function() {this.src = this.src.replace("-off","-on");},
				 function() {this.src = this.src.replace("-on","-off");}
				);
				$(".highslide-slideshow a, .hs_controls a").focus(
				 function() {$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-off","-on"));}
				);
				$(".highslide-slideshow a, .hs_controls a").blur(
				 function() {$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-on","-off"));}
				);
    };

    // Fires after the caption is grabbed.
//    hs.Expander.prototype.onAfterGetCaption = function(){
//        log( "onAfterGetCaption", arguments );
//    };

    // Fires after the HTML content is grabbed.
//    hs.Expander.prototype.onAfterGetContent = function(){
//        log( "onAfterGetContent", arguments );
//    };

    // Fires after the heading is grabbed.
//    hs.Expander.prototype.onAfterGetHeading = function(){
//        log( "onAfterGetHeading", arguments );
//    };

    // Fires before the expander closes.
    // Returning false prevents the expanding from closing.
//    hs.Expander.prototype.onBeforeClose = function(){
//        log( "onBeforeClose", arguments );
//        // return confirm("Do you really want to close this nice image?");
//    };

    // Fires just before the expanding animation starts.
    hs.Expander.prototype.onBeforeExpand = function( sender, e ){
        log( "onBeforeExpand", arguments );
				$(sender).attr('style','border:5px solid #f00')
            // si slideshow
             if ( hs_mode=='hs_slideshow'
                      && sender.objectType == undefined 
											&& $(".highslide-scroll-up div img").length == 0
											&& $(".highslide-scroll-down div img").length == 0)
            {
                $(".highslide-scroll-up div").append('<img src="'+hs.graphicsDir+'scroll-prev-off.png" class="pngfix" width="20" height="75" alt="'+hs.lang.scrollLeft+'" />');
                $(".highslide-scroll-down div").append('<img src="'+hs.graphicsDir+'scroll-next-off.png" class="pngfix" width="20" height="75" alt="'+hs.lang.scrollRight+'" />');
            }
						
					 // create a new DOM element to position under image
					 var div = document.createElement('div');
					 // add a class name to allow CSS styling
					 div.className = "highslide-pannel fullHeight";
					 // attatch it to this hs.Expander instance and add some options
					 // zindex bug in IE places the div over the image and not under
					 sender.createOverlay( { overlayId: div, position: "top left", 
							zIndex:1, opacity: 1, width: '100%' } );
				

        // boutons close, save, agrandir
        if(sender.objectType == undefined){
            var div = document.createElement('ul');
            div.className = "hs_controls fullHeight";
            var foo = "";
            foo += '<li><a href="#" onclick="return hs.close(this)" class="hs_close" id="hs_close" title="'+hs.lang.closeTitle+'"><img src="'+hs.graphicsDir+'close-off.png" width="26" height="26" alt="'+hs.lang.closeTitle+'" class="pngfix" /></a></li>';
            if (this.isImage && this.x.full > (this.x.imgSize || this.x.size)) {
                foo += '<li><a href="javascript:hs.expanders['+ this.key +'].doFullExpand();" class="hs_expand" id="hs_expand" title="'+hs.lang.fullExpandText+'"><img src="'+hs.graphicsDir+'zoomin-off.png"  width="27" height="21" alt="'+hs.lang.fullExpandText+'" class="pngfix" /></a></li>';
            }
            foo += '<li><a href="'+this.src+'" class="hs_save" id="hs_save" title="'+hs.lang.saveTitle+'"><img src="'+hs.graphicsDir+'save-off.png" width="27" height="21" alt="'+hs.lang.saveText+'" class="pngfix" /></a></li>';
            foo += '<li><a href="#" class="hs_mosaic" id="hs_mosaic" title="'+hs.lang.saveTitle+'"><img src="'+hs.graphicsDir+'mosaic-off.png" width="27" height="21" alt="'+hs.lang.saveText+'" class="pngfix" /></a></li>';
            div.innerHTML = foo;
            sender.createOverlay( {overlayId: div, position: "top right", width:'32px'} );
						
        }

        // unbind previously bind events on hs namespace
        $("#hs_prev, #hs_next, #hs_play, #hs_pause")
            .unbind('.hs');

        // manage focus on navigation buttons
        // when clicked 'next' and 'previous' buttons must keep focus
        // when clicked 'play' button must give the focus to 'pause' button
        // when clicked 'pause' button must give the focus to 'play' button
        $("#hs_prev, #hs_next")
            .bind('focus.hs', function(){
                hs.selectedControl = this;
							 	$("#hs_play img").attr('src',$("#hs_play img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " focused");
            })
            .bind('blur.hs', function(){
                $(this).css('border', 'none');
                log( hs.selectedControl + " blured");
            })
            .bind('click.hs', function(){
                $(this).css('border', 'none');
							 	$("#hs_play img").attr('src',$("#hs_play img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " clicked");
            });

            $("#hs_play")
            .bind('click.hs', function(){
                hs.selectedControl = "#hs_pause";
							 	$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " clicked");
            })
            .bind('focus.hs', function(){
                hs.selectedControl = "#hs_pause";
							 	$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " focused");
            });

            $("#hs_pause")
            .bind('click.hs', function(){
                hs.selectedControl = "#hs_play";
							 	$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " clicked");
            })
            .bind('focus.hs', function(){
                hs.selectedControl = "#hs_play";
							 	$(this).children("img").attr('src',$(this).children("img").attr('src').replace("-on","-off"));
                log( hs.selectedControl + " focused");
            });
    };

    // Fires before the caption is grabbed.
//    hs.Expander.prototype.onBeforeGetCaption = function(){
//        log( "onBeforeGetCaption", arguments );
//    };

    // Fires before the HTML content is grabbed.
//    hs.Expander.prototype.onBeforeGetContent = function(){
//        log( "onBeforeGetContent", arguments );
//    };

    // Fires before the heading is grabbed.
//    hs.Expander.prototype.onBeforeGetHeading = function(){
//        log( "onBeforeGetHeading", arguments );
//    };

    // Fires when another expander is brought to the front and the current expander looses focus.
//    hs.Expander.prototype.onBlur = function(){
//        log( "onBlur", arguments );
//    };

    // Fires after the full-expand label is created, but before it is made visible.
//    hs.Expander.prototype.onCreateFullExpand = function(){
//        log( "onCreateFullExpand", arguments );
//    };

    // Fires before the overlay is added to a single hs.Expander obect.
    // Returning false prevents the overlay from being connected to the expander.
    // The overlay div can be accessed through e.overlay.
//    hs.Expander.prototype.onCreateOverlay = function( sender, e ){
//        log( "onCreateOverlay", arguments );
//    };

    // Fires after the full-expand icon is clicked, but before any actions are taken.
    hs.Expander.prototype.onDoFullExpand = function(){
        log( "onDoFullExpand", arguments );
				 if (this.isFullyExpanded) {
						try {		
							this.focus();
							var xSize = this.x.size;
							this.resizeTo(this.origXsize, this.origYsize);
							var xpos = this.x.pos - (this.x.size - xSize) / 2;
							if (xpos < hs.marginLeft) xpos = hs.marginLeft;
							this.moveTo(xpos, this.y.pos);
							this.doShowHide('hidden');						
							// change icon to original state
						  this.isFullyExpanded = false;
							 $("a.hs_expand").attr('title', this.origText);
							 $("a.hs_expand img").attr({
									src: this.origSrc,
									title: this.origText
								});
						} catch (e) {
							this.error(e);
						}
						return false;
				 } else {
						// set original state
					 this.isFullyExpanded = true;
					 this.origXsize = this.x.size;
					 this.origYsize = this.y.size;
					 this.origText = $("a.hs_expand").attr('title');
					 this.origSrc = $("a.hs_expand img").attr('src');
						// change icon and text of magnifyer
					 $("a.hs_expand").attr('title', hs.lang.restoreExpandText);
					 $("a.hs_expand img").attr({
							src: hs.graphicsDir+'zoomout-off.png',
							title: hs.lang.restoreExpandText
						});
				};
            $("a.hs_expand").focus();
    };

    // Fires repeatedly during move and resize.
//    hs.Expander.prototype.onDrag = function( sender, e ){
//        log( "onDrag", arguments );
//    };

    // Fires after move or resize.
//    hs.Expander.prototype.onDrop = function( sender, e ){
//        log( "onDrop", arguments );
//    };

    // Fires when an expander is brought to the front.
    hs.Expander.prototype.onFocus = function( sender ){
        log( "onFocus", arguments );
        // tabindex on every 'tabable' element in the page
        $("a, area, button, input, object, select, textarea")
            .attr('tabindex', -1);

        // tabindex for elements in the gallery viewer
        $(".hs-luxembourg a, .hs-luxembourg area, .hs-luxembourg button,"
         + " .hs-luxembourg input, .hs-luxembourg object, .hs-luxembourg select,"
         + " .hs-luxembourg textarea")
            .attr('tabindex', 1);

        // tabindex for elements in the thumbstrip
        $(".highslide-thumbstrip a")
            .attr('tabindex', 2);

        if( hs.selectedControl != undefined )
        {
            $(hs.selectedControl).focus();
        }
    };

    // Fires when an expander is brought to the front.
//    hs.Expander.prototype.onHideLoading = function(){
//        log( "onHideLoading", arguments );
//    };

    // Fires when the user clicks the full size image.
    // Returning false prevents the default close action.
    hs.Expander.prototype.onImageClick = function( sender ){
        log( "onImageClick", arguments );
        // return confirm("Do you really want to close this nice image?");
        return false;
    };

    // Fires when the thumbnail is clicked and the primary properties of the expander are set.
    // Returning false cancels the expander.
    hs.Expander.prototype.onInit = function( sender ){
	       log( "onInit", arguments );
			   elementFocus = $(sender['thumb']).parent('a');
   	};

    // Returning false cancels the expander.
//    hs.Expander.prototype.onMouseOut = function( sender, e ){
//        log( "onMouseOut", arguments );
//    };

    // Fires when the mouse cursor enters the image or HMTL popup.
//    hs.Expander.prototype.onMouseOver = function( sender, e ){
//        log( "onMouseOver", arguments );
//    };

    // Fires after the loading label is created, but before it is made visible.
//    hs.Expander.prototype.onShowLoading = function( sender ){
//        log( "onShowLoading", arguments );
//    };

	/**
	* debug function
	*/
	doDebug = false;
    doPrintArgs = false;
	log = function ( msg, args )
	{
        if(!doDebug)return;

        var listenerPrefix =     "###>>>> ";

        if ( typeof console != 'undefined' && typeof console.log != 'undefined' )
        {
            console.log( listenerPrefix + msg );

            if( args != null && doPrintArgs )
            {
                console.log( "args length = " + args.length );

                for(var i=0; i<args.length; i++)
                {
                    console.log(" - arg " + i + "(" +  typeof args[i] + ")= " + args[i] );
                }
            }
        }
	}