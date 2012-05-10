/*
 * Tabify: convert panes into tabbed modules
 *
 * Copyright 2011 Government of the Grand-Duchy of Luxembourg
 */

(function($) {

    $.fn.tabify = function(options) {

        //Defaults to extend options
        var defaults = {
          paneSelector: '.pane',
          titleSelector: 'h1',
          tabs: true
     	};  
        
        //Extend those options
        var options = $.extend({}, defaults, options); 
	
        return this.each(function() {
        
// ==============
// ! SETUP   
// ==============
        
            //Global Variables
            var activePane = 0,
            	numberPanes = 0;
            
            //Initialize
            var tab = $(this).addClass('tabify'),         
            	tabWrapper = tab.wrap('<div class="tabify-wrapper" />').parent();
	    	            
            //Collect all panes and set slider size of largest image
            var panes = tab.children(options.paneSelector);
            panes.each(function() {
                var _pane = $(this);
                _pane.find('a[href^="#"]').click(function(e) { e.preventDefault(); tabs.find('a[href="'+ $(this).prop('hash') +'"]').click(); });
                numberPanes++;
            });
            
            //Set initial front pane
            panes.eq(activePane)
            	.css({"display" : 'block'});
            
// ==================
// ! TABS   
// ==================
            
            //Tab Nav Setup
            if(options.tabs) { 
            	var tabHTML = '<ul class="tabify-tabs"></ul>';
            	tabWrapper.prepend(tabHTML);
            	var tabs = tabWrapper.children('.tabify-tabs');
            	for(i=0; i<numberPanes; i++) {
            		var liMarkup = $('<a />')
                                .attr('href', '#' + panes.eq(i).attr('id'))
                                .text(panes.eq(i).find(options.titleSelector).text())
                                .data('index', i)
                                .click(function(e) {
									e.preventDefault();
									shift($(this).data('index'));
								});
					var liWrap = liMarkup.wrap("<li/>").parent();
            		tabs.append(liWrap);
                    panes.eq(i).find(options.titleSelector).addClass('hidden');
            	}
            	setActiveTab();
            }
            
            //Bullet Nav Execution
            function setActiveTab() { 
				if(!options.tabs) 
				{ 
					return false; 
				} else {
					tabs.find('li').removeClass('active').eq(activePane).addClass('active');
				}
            }

// ====================
// ! SHIFT ANIMATIONS   
// ====================
            
            //Animating the shift!
            function shift(direction) {
        	    //remember previous activePane
                var prevActivePane = activePane,
                	paneDirection = direction;
                //exit function if bullet clicked is same as the current image
                if(prevActivePane == paneDirection) { return false; }

                if(panes.length == "1") { return false; }

		 //deduce the proper activeImage
                if(direction == "next") {
                    activePane++
                    if(activePane == numberPanes) {
                        activePane = 0;
                    }
                } else if(direction == "prev") {
                    activePane--
                    if(activePane < 0) {
                        activePane = numberPanes-1;
                    }
                } else {
                    activePane = direction;
                    if (prevActivePane < activePane) { 
                        paneDirection = "next";
                    } else if (prevActivePane > activePane) { 
                        paneDirection = "prev"
                    }
                }

                //set to correct bullet
                setActiveTab();  
                     
                //hide previously active pane
                panes.eq(prevActivePane).css({"display" : ''});    
                    
                panes.eq(activePane).css({"display" : 'block'});
            }//shift function
        });//each call
    }//tabify plugin call
})(jQuery);
