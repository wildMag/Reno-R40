function addElement(listeDep,idListe){
    var existe = 0;
   	if (listeDep.selectedIndex >= 0)
   	{	
	  	for(i=1;i< document.getElementById(idListe + "_myList").length ;i++){
	    	if(document.getElementById(idListe + "_myList").options[i].text ==
				listeDep.options[listeDep.selectedIndex].text){
	         	existe = 1;
	      	}
	       	else{
	           	if(existe == 1){
	            	existe = 1;
	           	}
	           	else{
	              	existe = 0;
	            }
	      	}
	   	}
	
	  	if(existe == 0){
	       	var option = new Option(listeDep.options[listeDep.selectedIndex].
					text,listeDep.options[listeDep.selectedIndex].value);
	      	document.getElementById(idListe + "_myList").options[0].value = 0;
	       	document.getElementById(idListe + "_myList").options[(document.
			getElementById(idListe + "_myList").length)] = option;
	   	}
	}
}

function removeElement(listeArr){
	if(listeArr.selectedIndex > 0)
	{
	 	listeArr.options[listeArr.selectedIndex] = null;
	 
	}	    
}

function checkRadio(idRadio,value) {
	alert("testRadio" +idRadio);
}


