<!--
$(document).ready(function(){
		$("#billingAddress").before("<span class=\"floatL\" id=\"billingAddressLegend\">Votre adresse de facturation est la même que votre adresse de livraison?</span><input type=\"checkbox\" name=\"billing_yes\" id=\"billing_yes\" checked=\"checked\" title=\"Afficher la saisie de l'adresse de facturation (si différente de l'adresse de livraison\" /><br class=\"clear\" /><br />");
	});
	
	// hides/shows billing address form depending on user choice
	$(function(){
		$('#billingAddress').hide();
		
		$('#billing_yes').click(function(){
			if($(this).is(':checked')){
				$('#billingAddress').hide("normal");
				$(this).attr('title','Afficher la saisie de l\'adresse de facturation (si différente de l\'adresse de livraison)');
			}
			if(($(this).is(':checked')==false)){
				$('#billingAddress').show("normal");
				$(this).attr('title','Masquer la saisie de l\'adresse de facturation (si identique à l\'adresse de livraison)');	
			}
		});
	});
	
	//-->