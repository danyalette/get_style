
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.checking == "true"){
		var result = checkForExtension();
	} else {
		
	}
      sendResponse({result:result});
	chrome.runtime.onMessage.removeListener(arguments.callee);
  });

function checkForExtension(){
	var result = ""; 
	var elem = document.getElementById('menu-ext');
	if (elem){
		elem.style.display == "none"? result = "hidden" : result = "visible";
	}
	else result = "none";
	return result;
}