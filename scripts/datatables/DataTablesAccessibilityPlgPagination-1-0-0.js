/*
 * File:        DataTablesAccessibilityPlgPagination.js
 * Version:     1.0.0
 * Description: Add new pagination style to datatables
 * Author:      David Jacquel (lusis.lu)
 * Created:     Fri 10 Sep 2010 08:15:15 +0200
 * Language:    Javascript
 * License:     LGPL
 * Project:     CTIE Tableaux Dynamiques
 * Contact:     www.eluxembourg.public.lu
 */

/*
 * pagination class
 * Version:     1.0.0
 * Description: Add new pagination style to datatables
 */
$.fn.dataTableExt.oPagination.item_numbers = {
    /*
     * Function: oPagination.item_numbers.fnInit
     * Purpose:  Initalise dom elements required for pagination with a list of item number groups
     * Returns:  -
     * Inputs:   object:oSettings - dataTables settings object
     *           node:nPaging - the DIV which contains this pagination control
     *           function:fnCallbackDraw - draw function which must be called on update
     */
    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
    {
        log("pagination : fnInit");
        var nList = document.createElement( 'span' );

        nPaging.appendChild( nList );

        /* Take the brutal approach to cancelling text selection */
        $('span', nPaging)
        .bind( 'mousedown', function () {
            return false;
        } )
        .bind( 'selectstart', function () {
            return false;
        } );

        /* ID the first elements only */
        if ( oSettings.sTableId !== '' && typeof oSettings.aanFeatures.p == "undefined" )
        {
            nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
        }
    },

    /*
     * Function: oPagination.item_numbers.fnUpdate
     * Purpose:  Update the list of item numbers groups
     * Returns:  -
     * Inputs:   object:oSettings - dataTables settings object
     *           function:fnCallbackDraw - draw function to call on page change
     */
    "fnUpdate": function ( oSettings, fnCallbackDraw )
    {
        log("pagination : fnUpdate");

        // resize reno template when table is redrawn
        if(typeof resizeMiddleCol == 'function')
        {
            resizeMiddleCol();
        }

        if ( !oSettings.aanFeatures.p ){ return; }

        var recordsTotal = oSettings.fnRecordsDisplay();
        var displayStart = oSettings._iDisplayStart;
        var displayLength = oSettings._iDisplayLength;
        var totalPage = Math.ceil(recordsTotal / displayLength);
        var currentPage = Math.ceil(displayStart / displayLength) + 1;

        var sList = "";
        var i, iLen;
        var oClasses = oSettings.oClasses;
        var firstRecordId, lastRecordId, linkText;

        /* Build the dynamic list */
        for ( i=1 ; i<=totalPage ; i++ )
        {
            firstRecordId = ((i-1) * displayLength) + 1;
            if( i != totalPage )
            {
                lastRecordId = firstRecordId + displayLength - 1;
            }
            else
            {
                lastRecordId = recordsTotal;
            }

            linkText = "[&nbsp;" + firstRecordId + "&nbsp;-&nbsp;" + lastRecordId +"&nbsp;]";

            if ( currentPage != i )
            {
                sList += '<a href="#wrapper" class="'
                       + oClasses.sPageButton
                       + '" title="pages ' + firstRecordId
                       + ' - ' + lastRecordId + '"'
                       + '" targetPage=' + i + '>'
                       + linkText + '</a> ';
            }
            else
            {
                sList += '<span class="'
                       + oClasses.sPageButtonActive
                       + '">' + linkText + '</span> ';
            }
        }

//        log("link list = " + sList);

        /* Loop over each instance of the pager */
        var an = oSettings.aanFeatures.p;
        for ( i=0, iLen=an.length ; i<iLen ; i++ )
        {
            if ( an[i].childNodes.length === 0 )
            {
                continue;
            }
            /* Build up the dynamic list forst - html and listeners */
            $('span', an[i]).html( sList );
            $('a', an[i]).click(
                 function() {
                    /* Use the information in the element to jump to the required page */
                    var iTarget = $(this).attr('targetPage') - 1;
                    oSettings._iDisplayStart = iTarget * oSettings._iDisplayLength;
                    fnCallbackDraw( oSettings );
                    //$("a:focus").blur();
                    return false;
                }
             );
        }
    }
};


$.fn.dataTableExt.oPagination.four_button = {
	/*
	 * Function: oPagination.four_button.fnInit
	 * Purpose:  Initalise dom elements required for pagination with a list of the pages
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           node:nPaging - the DIV which contains this pagination control
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	{

        log("pagination four_button: fnInit");

		nFirst = document.createElement( 'span' );
		nPrevious = document.createElement( 'span' );
		nNext = document.createElement( 'span' );
		nLast = document.createElement( 'span' );

		nFirst.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sFirst ) );
		nPrevious.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sPrevious ) );
		nNext.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sNext ) );
		nLast.appendChild( document.createTextNode( oSettings.oLanguage.oPaginate.sLast ) );

		nFirst.className = "paginate_button first";
		nPrevious.className = "paginate_button previous";
		nNext.className="paginate_button next";
		nLast.className = "paginate_button last";

		nPaging.appendChild( nFirst );
		nPaging.appendChild( nPrevious );
		nPaging.appendChild( nNext );
		nPaging.appendChild( nLast );

		$(nFirst).click( function () {
			oSettings.oApi._fnPageChange( oSettings, "first" );
			fnCallbackDraw( oSettings );
		} );

		$(nPrevious).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "previous" );
			fnCallbackDraw( oSettings );
		} );

		$(nNext).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "next" );
			fnCallbackDraw( oSettings );
		} );

		$(nLast).click( function() {
			oSettings.oApi._fnPageChange( oSettings, "last" );
			fnCallbackDraw( oSettings );
		} );

		/* Disallow text selection */
		$(nFirst).bind( 'selectstart', function () { return false; } );
		$(nPrevious).bind( 'selectstart', function () { return false; } );
		$(nNext).bind( 'selectstart', function () { return false; } );
		$(nLast).bind( 'selectstart', function () { return false; } );
	},

	/*
	 * Function: oPagination.four_button.fnUpdate
	 * Purpose:  Update the list of page buttons shows
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *           function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
        log("pagination four_button: fnUpdate");

		if ( !oSettings.aanFeatures.p )
		{
			return;
		}

		/* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		{
			var buttons = an[i].getElementsByTagName('span');
			if ( oSettings._iDisplayStart === 0 )
			{
				buttons[0].className = "paginate_disabled_previous";
				buttons[1].className = "paginate_disabled_previous";
			}
			else
			{
				buttons[0].className = "paginate_enabled_previous";
				buttons[1].className = "paginate_enabled_previous";
			}

			if ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() )
			{
				buttons[2].className = "paginate_disabled_next";
				buttons[3].className = "paginate_disabled_next";
			}
			else
			{
				buttons[2].className = "paginate_enabled_next";
				buttons[3].className = "paginate_enabled_next";
			}
		}
	}
};

