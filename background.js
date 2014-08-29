chrome.browserAction.onClicked.addListener(function(tab) {

		chrome.tabs.executeScript(null, {file: "getStyleChecker.js"});
		
		
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {	
	  	chrome.tabs.sendMessage(tabs[0].id, {checking: "true"}, function(response) { // problem: this function never runs if there isn't a listneing script 
			if (response.result == "none") {
				chrome.tabs.executeScript(null, {file: "getStyle.js"});
			} else if (response.result == "hidden") {
				chrome.tabs.sendMessage(tabs[0].id, {state: "show", fav_prop: fav_prop}, function(response) {});
			} else if (response.result == "visible") {
				chrome.tabs.sendMessage(tabs[0].id, {state: "hide", fav_prop: fav_prop}, function(response) {});
			}
	  		});
		});
	
});