/*
 * File:        DataTablesAccessibilityPlg.js
 * Version:     1.0.0
 * Description: Add accessibility to DataTables jQuery plugin
 * Author:      David Jacquel
 * Created:     Fri 10 Sep 2010 08:15:15 +0200
 * Language:    Javascript
 * License:     LGPL
 * Project:     CTIE Tableaux Dynamiques
 * Contact:     www.eluxembourg.public.lu
 */

/*
 * Function: DataTablesAccessibilityPlg
 * Purpose:  Provide accessibility to DataTables
 * Returns:  void
 * Inputs:   object:oInit - initialisation settings, with the following properties (each optional)
 *             string:interfaceLanguage     - language used for the interface (default to 'fr') available are fr, en, ge
 *             bool:conditionalCreation -  put condition on dataTable creation (default false)
 *             bool:useRowsNumberCondition - do we use number of rows as a condition to create datatable ? (default true)
 *             int:rowsNumberConditionMin  - minimum rows needed to fire datatable creation (default 20)
 *             str:tableId                - table ID to target for datatable creation (default to 'dataTable')
 *             objet: dataTableSettings - settings for dataTable creation (see datatable doc)(deefault empty object)
 */
var DataTablesAccessibilityPlg = function ( oInit ) {

    /* Sanity check - you just know it will happen */
    if ( typeof this.fnInit != 'function' )
    {
        alert( "DataTablesAccessibilityPlg warning: DataTablesAccessibilityPlg must be initialised with the 'new' keyword." );
        return;
    }

    var that = this;

    var oSettings = {
        "interfaceLanguage":      'fr',
        "conditionalCreation":    false,
        "useRowsNumberCondition": true,
        "rowsNumberConditionMin": 20,
        "tableId":                'dataTable',
        "dataTableSettings":      {}
    };

    var interfaceLanguageStrings =
    {
        "fr" : {
                "sProcessing": "En cours...",
                "sLengthMenu": "Afficher _MENU_ enregistrements par page",
                "sZeroRecords": "Pas de résultats",
                "sEmptyTable": "Pas de données dans la table",
                "sInfo": "Affiche _START_ a _END_ sur _TOTAL_ enregistrements",
                "sInfoEmpty": "Affiche 0 a 0 sur 0 enregistrement",
                "sInfoFiltered": "(filtré de _MAX_ enregistrements au total)",
                "sInfoPostFix": "",
				"sSearch": "Recherche:",
				"sUrl": "",
				"oPaginate": {
					"sFirst":    "Première",
					"sPrevious": "Précédente",
					"sNext":     "Suivante",
					"sLast":     "Dernière"
				},
                "sortAscAltText":"Tri ascendant",
                "sortDescAltText":"Tri descendant"
        },

        "en" : {
                "sLengthMenu": "Display _MENU_ records per page",
                "sZeroRecords": "Nothing found - sorry",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ records",
                "sInfoEmpty": "Showing 0 to 0 of 0 records",
                "sInfoFiltered": "(filtered from _MAX_ total records)",
                "sortAscAltText":"Ascending sort",
                "sortDescAltText":"Descending sort"
        }
    }

    /*
    * var: isFirstCall
    * Purpose:  flag used to set focus on datable controls
    */
    var isFirstCall = true;

    /*
    * var: noSortFocus
    * Purpose:  prevent to put focus on a sort column
    * when page length or serach are selected
    */
    var noSortFocus = false;
    // getter
    this.fnGetNoSortFocus = function () { return noSortFocus; };
    // setter
    this.fnSetNoSortFocus = function ( value ) { return noSortFocus =  value; };

    /*
    * Function: fnGetSettings
    * Purpose:  Get the settings for this object
    * Returns:  object: - settings object
    * Inputs:   -
    */
    this.fnGetSettings = function () {
        return oSettings;
    };

    /*
    * Function: fnGetTableTarget
    * Purpose:  Get piginated table Id
    * Returns:  string: #id
    * Inputs:   -
    */
    this.fnGetTableTarget = function()
    {
        var s = this.fnGetSettings();
        return "#" + s.tableId;
    }

    /*
     * Function: setLangSettings
     * Purpose:  add lang strings to datatable settings if not set
     * Returns:  -
     * Inputs:   object:s - the local settings object
     *           object:oInit - the user's settings object
     */
    this.setLangSettings = function( s, oInit )
    {
        if( typeof s.dataTableSettings.oLanguage != 'object' )
        {
            s.dataTableSettings.oLanguage = interfaceLanguageStrings[s.interfaceLanguage];
        }
    }

    /*
    * Function: fnAccessible
    * Purpose:  fire accessibility functions
    * Returns:  -
    * Inputs:   -
    */
    this.fnAccessible = function(){
        _addLinks( that );
        _labelizeFields();
        _fieldFocusProtect();
        _addSortHint( that );
        _setFocus();
        $("html").scrollTop(0);
    }

    /*
    * Function: _addLink
    * Purpose:  add links to interface elements
    * Returns:  -
    * Inputs:   object this plugin object to stay in scope
    * scope:    private
    */
    var _addLinks = function( that )
    {
        var tableTarget = that.fnGetTableTarget();
        var targetList  = tableTarget + ' thead th.sorting, '
            + tableTarget + ' thead th.sorting_asc, ' 
            + tableTarget + ' thead th.sorting_desc, '
            + tableTarget + '_paginate span.paginate_button';
        var targetListLink  = tableTarget + ' thead th a, ' + tableTarget + '_paginate span.paginate_button a';
        $( targetList ).each(
            function(index, element)
            {
                existingLinks = $(element).find('a');
                if( existingLinks.length < 1 )
                {
                    var text = $(element).text();
                    var newText = "<a href='#'>" + text + "</a>";
                    $(element).html(newText);
                    $(targetListLink).click(function(event)
                    {
                        oDataTableAccessible.fnSetNoSortFocus( false );
                        // parent use link text to change page
                        // so on click, we need to propagate the click
                        $(this).parent().html(text).click();
                        // and stop the default action on our link
                        event.stopImmediatePropagation();
                        event.preventDefault();
                    });
                }
            });
    }

    /*
    * Function: _labelizeFields
    * Purpose:  add a label to form fields
    * Returns:  -
    * Inputs:   string of target ids
    * scope:    private
    */
    var _labelizeFields = function( targets )
    {
        var s = that.fnGetSettings();
        notLabelized = $("#dataTable_length label").length < 1;
        if( notLabelized )
        {
            $("#dataTable_length, #dataTable_filter").wrapInner(document.createElement("label"));
            $("#dataTable_filter label").before(s.dataTableSettings.oLanguage.sSearchTitle);
        }
    }


    /*
    * Function: _fieldFocusProtect
    * Purpose:  manage a flag that prevent to put focus on sort links
    * Returns:  -
    * Inputs:   -
    * scope:    private
    */
    var _fieldFocusProtect = function()
    {
        $("#dataTable_length select, #dataTable_filter input")
            .focus(
            function(){
                oDataTableAccessible.fnSetNoSortFocus( true );
            })
            .blur(
            function(){
                oDataTableAccessible.fnSetNoSortFocus( false );
            });
    }


    /*
    * Function: _addSortHint
    * Purpose:  add sort hint on col alt header used to sort datas
    * Returns:  -
    * Inputs:   object this plugin object to stay in scope
    * scope:    private
    */
    var _addSortHint = function( that )
    {
        var s = that.fnGetSettings();
        var tableTarget = that.fnGetTableTarget();

        var sortAscTh = tableTarget + ' thead th.sorting_asc';
        var sortDescTh = tableTarget + ' thead th.sorting_desc';

        var sortAscAltText = s.dataTableSettings.oLanguage["sortAscAltText"];
        var sortDescAltText = s.dataTableSettings.oLanguage["sortDescAltText"];

        _addSortHintAlt( sortAscTh, sortAscAltText );
        _addSortHintAlt( sortDescTh, sortDescAltText );
    }


    /*
    * Function: _addSortHintAlt
    * Purpose:  add sort hint on link alt used to sort datas
    * Returns:  -
    * Inputs:   element DOM element containing link
    *           altText string alt text to be applied to link
    * scope:    private
    */
    var _addSortHintAlt = function( element , altText )
    {
        // first delete former sorting column alt
        $("a[title='" + altText + "']").attr('title', null);
        // add alt on sorting column
        $(element + ' a').attr('title', altText);
    }

    /*
    * Function: _setFocus
    * Purpose:  give focus back to clicked element
    * Returns:  -
    * Inputs:   -
    * scope:    private
    */
    var _setFocus = function()
    {
        if( isFirstCall == true )
        {
            isFirstCall = false;
        }
        else if( oDataTableAccessible.fnGetNoSortFocus() == false )
        {
            $('.sorting_asc a').focus();
            $('.sorting_desc a').focus();
        }
    }

    /* Let's do it */
    this.fnInit( oInit );
};


/*
 * Variable: DataTablesAccessibilityPlg
 * Purpose:  Prototype for DataTablesAccessibilityPlg
 * Scope:    global
 */
DataTablesAccessibilityPlg.prototype = {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     */
    /*
     * Function: fnInit
     * Purpose:  The "constructor"
     * Returns: bool true if table creation succeded / false if we dont create datatable
     * Inputs: object:oInit -  same has constructor function
     */
    fnInit: function ( oInit )
    {
        var s = this.fnGetSettings();
        var that = this;
        var doCreateDataTable = true;

        /* Record the user definable settings */
        this.fnInitSettings( s, oInit );

        /* check if we have to create a datatable */
        if ( s.conditionalCreation == true )
        {
            doCreateDataTable = this.testForCreation();
        }

        if ( doCreateDataTable == true )
        {
            var oTable = this.createDataTable( s.dataTableSettings );
        }
        else
        {
            return false;
        }

        /* set accessibility */
        this.fnAccessible();

        /* DataTables specific stuff */
        if ( typeof oTable == 'object' )
        {
            if ( typeof oTable.fnVersionCheck == 'functon' &&
                oTable.fnVersionCheck( '1.6.0' ) !== true )
                {
                return alert( "DataTablesAccessibilityPlg 1 required DataTables 1.6.0 or later. "+
                    "Please upgrade your DataTables installation" );
            }

            var oDtSettings = oTable.fnSettings();

            s.nTable = oDtSettings.nTable;
            // set fnAccessible as a callback function
            // called at each redraw of the table
            oDtSettings.aoDrawCallback.push( {
                "fn": function () {
                    log("aoDrawCallback");
                    that.fnAccessible.call(that);
                },
                "sName": "DataTablesAccessibilityPlg"
            } );

        }

        return true
    },


    /*
	 * Function: createDataTable
	 * Purpose:  create datatable
	 * Returns:  object datatable object
	 * Inputs: str:tableId - table id to target
	 *         object:dataTableSettings - datatable settings
	 */
    createDataTable: function ( dataTableSettings )
    {
        var tableTarget = this.fnGetTableTarget();
        var dataTable = $( tableTarget ).dataTable( dataTableSettings );
        return dataTable;
    },

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Support functions
	 */

    /*
     * Function: fnInitSettings
     * Purpose:  Take the user's settings and copy them to our local store
     * Returns:  -
     * Inputs:   object:s - the local settings object
     *           object:oInit - the user's settings object
     */
    fnInitSettings: function ( s, oInit )
    {
        if ( typeof oInit != 'undefined' )
        {
           for (var property in oInit)
           {
                if ( typeof oInit[property] != 'undefined' ) {
                s[property] = oInit[property];
                }
           }
        }
        this.setLangSettings( s, oInit );
    },

    /*
     * Function: testForCreation
     * Purpose:  test if datatable creation conditions are met
     * Returns:  bool: true if conditions are met / false if not
     * Inputs:   -
     */
    testForCreation: function ()
    {
        var s            = this.fnGetSettings(),
            doCreate     = false,
            tableToBig   = false,
            toManyRows   = false,

            tableTarget  = this.fnGetTableTarget(),
            rowsTarget   = tableTarget + " tr",

            win        = jQuery(window),
            winHeight  = win.height(),
            table       = jQuery(tableTarget),
            tableHeight = table.outerHeight()
        ;

        /* test for table height */
        tableToBig = tableHeight > winHeight
        doCreate   = doCreate || tableToBig;

        /* test for tr nodes number */
        if( s.useRowsNumberCondition == true )
        {
            var min = s.rowsNumberConditionMin;
            var numRows = jQuery( rowsTarget ).length;
            toManyRows = numRows > min;
        }
        doCreate = doCreate || toManyRows;

        return doCreate;
    }

}

// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
doDebug = true;
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console && doDebug){
    console.log( Array.prototype.slice.call(arguments) );
  }
};


