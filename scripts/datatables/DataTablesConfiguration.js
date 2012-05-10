/*
 * Justice specific setup
 * var: oTable
 * Purpose:  datable global object
 */
var oDataTableAccessible = {};

$(document).ready(function()
{
    oDataTableAccessible = new DataTablesAccessibilityPlg(
    {
        // datatable interface language - can be "fr" or "en" for now
        "interfaceLanguage":      'fr',
        // indicate if pagination creation is conditional
        // set to true : will paginate if window height < table height
        // set to false (default) : will paginate anytime
        "conditionalCreation": false,
        // indicate if we have to use row number as a paginate condition
        "useRowsNumberCondition": true,
        // min rows to create pagination
        "rowsNumberConditionMin": 10,
        // datatable specific setting
        "dataTableSettings":  {
            // type of pagination - eLuxembourg type is item_numbers
            "sPaginationType": "item_numbers",  //two_button (default), full_numbers or item_numbers
            "iDisplayLength": 10,
            // custom page length menu first array are values, second are display options
            "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tout"]],
            // default sorted column and sort direct 'asc' / 'desc
            "aaSorting": [[ 0, "desc" ]],
            // automatic width calculation
            "bAutoWidth": false,
            // datatable interface element position
            // # 'l' - Length changing
            // # 'f' - Filtering input
            // # 't' - The table!
            // # 'i' - Information
            // # 'p' - Pagination
            // # 'r' - pRocessing
            "sDom": '<<"datableHead"lfir><"datableBody"t><"datableFooter"p>>',
            // language string
            "oLanguage" : {
                    "sProcessing": "En cours...",
                    "sLengthMenu": "Afficher _MENU_ documents par page",
                    "sZeroRecords": "Pas de résultats",
                    "sEmptyTable": "Pas de données dans la table",
                    "sInfo": "Affiche résultats <strong>_START_ à _END_ </strong>sur un total de <strong> _TOTAL_ documents</strong>",
                    "sInfoEmpty": "Affiche 0 a 0 sur 0 jurisprudence",
                    "sInfoFiltered": "(filtrés de _MAX_ documents au total)",
                    "sInfoPostFix": "",
                    "sSearchTitle": "",
                    "sSearch": "Rechercher un numéro de rôle :",
                    "sFilter": "Filtrer sur :",
                    "sFilterAll": "Tous les sujets",                          
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst":    "Première",
                        "sPrevious": "Précédente",
                        "sNext":     "Suivante",
                        "sLast":     "Dernière"
                    },
                    "sortAscAltText":"Trier par ordre croissant",
                    "sortDescAltText":"Trier par ordre décroissant"
            },
            // table columns properties using column index ** starting at 0 **
            // @see : http://www.datatables.net/usage/columns
            "aoColumnDefs": [
                // columns width
                //{ "sWidth": "50%", "aTargets": [ 0, 1 ] }
                { "sType": "date-eu", "aTargets": [ 0 ]  },
                { "sType": "date-eu", "aTargets": [ 1 ]  }                

                // column searchability
//                { "bSearchable": false, "aTargets": [ 1, 2 ] },

            ]

        }
    });

});
