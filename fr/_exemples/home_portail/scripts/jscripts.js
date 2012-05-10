<!--

function alternate(id){
	if(document.getElementById){						//check that browser has capabilities
		var row = document.getElementById(id);		//get just the selected table not all of them
			//manipulate rows	
			doAlternate(row);
	}
}

function doAlternate(row){
	if(!row.className){
		row.className = "select";
	}else if (row.className == "selected") {
	}else{
		row.className = "";
    }
}


function resizeMiddleCol() {
  if (!document.getElementById('navH')) {
	if (document.getElementById('middleCol')) {
		heightLeftCol = document.getElementById('leftCol').offsetHeight;
		heightSubWrap = document.getElementById('middleCol').offsetHeight;
		if (document.getElementById('LMR')) {
			heightRightCol = document.getElementById('rightCol').offsetHeight;
			if (heightRightCol > heightSubWrap ) {
				heightSubWrap = heightRightCol;
			}		
		}
		if (heightLeftCol > heightSubWrap) {
			resizeHeight = heightLeftCol + 25;
	 	}
		if (heightLeftCol < heightSubWrap && document.getElementById('middleCol').style.height != "auto" ) {
			resizeHeight = "auto"; 
		}
	}
	if (resizeHeight != "auto" )
		document.getElementById('subwrap').style.height = resizeHeight + "px";
	else
		document.getElementById('subwrap').style.height = resizeHeight;
  }
}

// Homepage
// Adjust the height of elements in a row
function adjustRowHeight (elements, elementscontent) {
	var height=new Array();
	for (var i = 0; i < elements.length ; i++ ){
		height[i] = document.getElementById(elements[i]).offsetHeight;
	}
	maxHeight=height[0];
	for (var i = 1; i < elements.length ; i++ ){
		if (maxHeight < height[i]) { maxHeight = height[i];	}
	}
	for (var i = 0; i < elements.length ; i++ ){
		document.getElementById(elementscontent[i]).style.height = maxHeight + "px";
	}
}

// Homepage
// define and call adjust height function for navigation elements
function resizeHomePortal() {
  if (document.getElementById('navH')) {
		// 1st line of elements
		var elements=new Array("block_1_ul","block_2_ul","block_3_ul","block_4_ul");
		var elementscontent=new Array("block_1_content","block_2_content","block_3_content","block_4_content");
		// 2nd line of elements
		var elements2=new Array("block_1bis_ul","block_2bis_ul","block_3bis_ul");
		var elementscontent2=new Array("block_1bis_content","block_2bis_content","block_3bis_content");
		adjustRowHeight (elements, elementscontent);
		adjustRowHeight (elements2, elementscontent2);
	}

}

// Homepage
// swapIt navigation home
function swapIt(id, newclass) {
 if (document.getElementById) {
 document.getElementById(id).className = newclass;
 }
}

// Homepage
// random image change on homepage
function randomSwap() {
  if (document.getElementById('navH')) {
		$('#bgimg').available(function(){
			var randomnumber=Math.floor(Math.random()*4);
			randomnumber="illustration0"+randomnumber;
			swapIt('bgimg', randomnumber);
		});	
		$('#bgimg').available(function(){
							$("#bgimg").fadeIn(2000);
		});	
	}
}


function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

// Accessibility links
aFocus = function() {
  if(document.getElementById && document.getElementById("skiplist")) {
    var aEls = document.getElementById("skiplist").getElementsByTagName("a");
    var spanEls = document.getElementById("skiplist").getElementsByTagName("span");
    for (var i=0; i<aEls.length; i++) {
      aEls[i].className="hidden";
      aEls[i].onfocus=function() {
        this.className="show";
	    for (var i=0; i<spanEls.length; i++) {
    	  spanEls[i].className="";
    	}
      }
    }
    for (var i=0; i<spanEls.length; i++) {
      spanEls[i].className="hidden";
    }
  }
}
/* BEGIN accessible select
A select list that works without a submit button but also for keyboard users.
*/
/*
	Written by Jonathan Snook, http://www.snook.ca/jonathan
	Add-ons by Robert Nyman, http://www.robertnyman.com
*/

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
niceSelect=function(myform){    
  var f=getElementsByClassName(document, "form", "niceSelect");;
    for (var i=0;i<f.length;i++){       // Walks all the forms in the document.
    var e=f[i].elements;
    for(var j=0;j<e.length;j++){        // Walks all the elements in the form.
      if(e[j].type=="select-one"){      // Chooses elements that are select 
										// box (that does not allow multiple
										// selections).
        e[j].formnu=i;
        e[j].onclick=function(){        // selection is made with the mouse
          this.onchange=function(){
            f[this.formnu].submit()
          }
        };
        e[j].onblur=function(){         // This "disarms" the onblur function
          this.onchange=function(){return true}  
        };
        e[j].onkeydown=function(e){     // When keys are pressed on the keyboard...
          if (e){theEvent = e} else {theEvent=event};
          if (theEvent.keyCode==13){    // ...only submit when 'enter' is pressed.
            if((this.onchange+"").indexOf("submit")<0){
              f[this.formnu].submit()
            }
          }
        }
      }
    }
  }
}
/* END Nice select */

function selectPeriode(periode) {
	periode.checked=true;
	}
function addLoadEvent(func) {
  if (window.addEventListener) {
    window.addEventListener("load", func, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", func);
  }
}
function addResizeEvent(func) {
	if (window.addEventListener) {
		window.addEventListener("resize", func, false);
	} else if (window.attachEvent) {
		window.attachEvent("onresize", func);
	}
}


addLoadEvent(randomSwap);
addLoadEvent(aFocus);
addLoadEvent(niceSelect);
addLoadEvent(resizeMiddleCol);
addLoadEvent(resizeHomePortal);
addResizeEvent(resizeMiddleCol);
addResizeEvent(resizeHomePortal);

//-->
