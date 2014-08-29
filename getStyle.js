var cssProp = ["font-family", "font-size", "color", "background-color", "border-radius", "padding", "position", "opacity", "floater", "z-index", "height", "width", "text-align", "background-image", "border", "box-shadow"]; 
var selectedP = 0; 
var menuElems = []; 

var menu = null;
var floater = null;

var visible = false; 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	
	if (visible){
		hideMenu();
		hideFloater();
		visible = false; 
	} else {
		showMenu();
		showFloater();
		visible = true;
	}
	
      sendResponse({confirm: confirm});
  });

init(); 

function init(){
	makeMenu(); 
	makeFloater();
	visible = true; 
}

function makeMenu(){
	
	var menu = document.createElement('div'); 
	menu.className = "menu-ext";
	menu.id = "menu-ext";
	
	cssProp.forEach(function(item){
		var p = document.createElement('p');
		p.innerHTML = item;
		p.onmouseover = function(e){
			var num = menuElems.indexOf(e.target);
			setMenuSelection(num);
		}; 
		p.onclick = function(e){
			selectedP = menuElems.indexOf(e.target);
		}; 
		menu.appendChild(p); 
		menuElems.push(p);
	});
	menu.onmouseout = function(){ setMenuSelection(selectedP); };
	document.body.appendChild(menu);
	setMenuSelection(selectedP); 
	
}

function makeFloater(){
	floater = document.createElement('div');
	floater.className = "floater"; 
	floater.setAttribute("id", "floater-ext");
	document.body.appendChild(floater);
	document.body.onmousemove = setFloaterText;
}


function setMenuSelection(num){
	menuElems.forEach(function(item){
		item.className = "";
	});
	menuElems[num].className = "selected-ext";
}

function setFloaterText(e){
	var style = cssProp[selectedP]; 
	var elem = e.target; 
	
	var elemStyle = getStyle({style: style, elem: elem});
	
	var x = e.pageX; 
	var y = e.pageY - 55;
	floater.style.top = y + "px";
	floater.style.left = x + "px"; 
 
	switch(style){
		case "font-size": elemStyle = formatNumber(elemStyle); break;
	}
		
	
	
	floater.innerHTML = elemStyle; 
}

function getStyle(obj){
	var style = obj.style;
	var elem = obj.elem;
	
	if ((elem == menu)||(menuElems.indexOf(elem)>-1)) hideFloater();
	else showFloater(); 
	var elemStyle = document.defaultView.getComputedStyle(elem)[style]; 
	return elemStyle;
}

function hideFloater(){
	floater = document.getElementById('floater-ext');
	floater.style.display = "none";
}

function showFloater(){
	floater.style.display = "block";
}

function formatNumber(style){
	var elemStyle = parseFloat(style);  
	elemStyle = elemStyle % 1 === 0? elemStyle + "px" : elemStyle.toFixed(3) + "px";
	return elemStyle; 
}
function showMenu(){
	document.body.onmousemove = setFloaterText;
	menu.style.display = "block";	
}

function hideMenu(){
	menu = document.getElementById('menu-ext');
	document.body.onmousemove = null;
	menu.style.display = "none";
}