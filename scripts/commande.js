$(document).ready(function(){
	$(".orderBoxContent input:text").numeric({ decimal: false, negative: false });
	
	//$(".orderBoxContent").find(".basket_btn").attr("disabled","disabled").addClass("disabled");
	$(".orderBoxContent input:text, .orderBoxContent select").change(function(event){ 
		if(($(this).val()!=0)){
			$(this).parents(".orderBoxContent").find(".basket_btn").removeAttr("disabled").removeClass("disabled");
			$(this).parents(".orderBoxContent").find(".error").remove();
		}		
		if(($(this).val()==0)){
			var tracker="disable";
			$(this).parents(".orderBoxContent").find("input:text, select").not($(this)).each(function(){
				if(($(this).val())!=0){
					tracker = "enable";	
				}				
			});
			if(tracker=="disable"){			
				$(this).parents(".orderBoxContent").find(".basket_btn").attr("disabled", "disabled").addClass("disabled").before("<p class=\"langRow error\">Veuillez saisir un nombre d'exemplaires</p>");
			}
		}
	});	
});	