jQuery.fn.dataTableExt.oSort['date-eu-asc']  = function(a,b) {
    var x = Date.parse(a.split(/[.\/-]/).reverse().join('/'));
    var y = Date.parse(b.split(/[.\/-]/).reverse().join('/'));
    
    if ( isNaN(x) || x==="" )
    {
    x = Date.parse( "01/01/1970 00:00:00" );
    }
    if ( isNaN(y) || y==="" )
    {
        y =	Date.parse( "01/01/1970 00:00:00" );
    }
    
    return x - y;
};

jQuery.fn.dataTableExt.oSort['date-eu-desc'] = function(a,b) {
    var x = Date.parse(a.split(/[.\/-]/).reverse().join('/'));
    var y = Date.parse(b.split(/[.\/-]/).reverse().join('/'));
    
    if ( isNaN(x) || x==="" )
    {
    x = Date.parse( "01/01/1970 00:00:00" );
    }
    if ( isNaN(y) || y==="" )
    {
        y =	Date.parse( "01/01/1970 00:00:00" );
    }
    
    return y - x;
};