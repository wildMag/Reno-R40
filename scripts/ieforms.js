function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be removed");
  }
} 


function prepareTextBoxes(){
 if (!document.getElementsByTagName) return;
 var oi=0;
 var thisObj;
 var objs = document.getElementsByTagName("input");


 for (oi=0;oi<objs.length;oi++) {
  thisObj = objs[oi];
  if(thisObj.getAttribute('type') == 'text'){
   thisObj.className = thisObj.className + ' inputtext';
  }
 }
}

addEvent(window, "load", prepareTextBoxes);