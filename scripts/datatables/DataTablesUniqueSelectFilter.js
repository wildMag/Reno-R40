(function($) {
$.fn.dataTableExt.oApi.fnGetColumnData = function ( oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty ) {
	// check that we have a column id
	if ( typeof iColumn == "undefined" ) return new Array();
	
	// by default we only wany unique data
	if ( typeof bUnique == "undefined" ) bUnique = true;
	
	// by default we do want to only look at filtered data
	if ( typeof bFiltered == "undefined" ) bFiltered = true;
	
	// by default we do not wany to include empty values
	if ( typeof bIgnoreEmpty == "undefined" ) bIgnoreEmpty = true;
	
	// list of rows which we're going to loop through
	var aiRows;
	
	// use only filtered rows
	if (bFiltered == true) aiRows = oSettings.aiDisplay; 
	// use all rows
	else aiRows = oSettings.aiDisplayMaster; // all row numbers

	// set up data array	
	var asResultData = new Array();
	
	for (var i=0,c=aiRows.length; i<c; i++) {
		iRow = aiRows[i];
		var aData = this.fnGetData(iRow);
		var sValue = aData[iColumn];
		
		// ignore empty values?
		if (bIgnoreEmpty == true && sValue.length == 0) continue;

		// ignore unique values?
		else if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;
		
		// else push the value onto the result data array
		else asResultData.push(sValue);
	}
	
	return asResultData;
}}(jQuery));


function fnCreateSelect( aData )
{
	var r='<label> '+oDataTableAccessible.fnGetSettings().dataTableSettings.oLanguage.sFilter+' <select><option value="">'+oDataTableAccessible.fnGetSettings().dataTableSettings.oLanguage.sFilterAll+'</option>';
	for ( i in aData ) 
    {
        r += '<optgroup label="'+i+'">';
        for ( var j = 0 ; j < aData[i].length ; j++ )
        {
            r += '<option value="'+aData[i][j]+'">'+aData[i][j]+'</option>';
        }
        r += '</optgroup>';
    }
    return r+'</select></label>';
}


$(document).ready(function() {
	/* Initialise the DataTable */
	var oTable = $('#dataTable').dataTable();
    var data_to = new Array();
	
	/* Add a select menu for each TH element in the table footer */
    $('#dataTable_filter').html('');
	$("thead th").each( function ( i, element ) {
        if($(element).hasClass('selectable')) {
            var index = $(this).text();
            data_to[index] = new Array();
            // Creating Select data
            var data_from = oTable.fnGetColumnData(i);
            for(i in data_from){
                var splitted = data_from[i].split(',');
                for(j in splitted) {
                    if($.inArray($.trim(splitted[j]), data_to[index]) == -1)
                        data_to[index].push($.trim(splitted[j]));
                    }
            }
        }
    });
    
    var select = $(fnCreateSelect( data_to ));
    select.find('select').change( function () {
        oTable.fnFilter( $(this).val());
    } );
    // Creating Select input
    $('#dataTable_filter').append(select);

} );