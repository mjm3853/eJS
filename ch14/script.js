/*
addEventListener("click", function(){
	console.log("You clicked the document.");
});
*/

//------------------

var simpleButton = document.querySelector("#simpleButton");

simpleButton.addEventListener("click", function(){
	console.log("Button clicked.");
});

//-------------------

var complexButton = document.querySelector("#complexButton");

complexButton.addEventListener("mousedown", function(event){
	if (event.which == 1)
		console.log("Left button");
	else if (event.which == 2)
		console.log("Middle button");
	else if (event.which == 3)
		console.log("Right button");
});

//-------------------------

var containerPara = document.querySelector("#containerPara");
var propButton = document.querySelector("#propButton");

containerPara.addEventListener("mousedown", function(){
	console.log("Handler for paragraph.");
});

propButton.addEventListener("mousedown", function(event){
	console.log("Handler for prop button.");
	if (event.which == 3)
		event.stopPropagation();
});

//--------------------------

var mdnLink = document.querySelector("#mdnLink");
mdnLink.addEventListener("click", function(event){
	console.log("Nope.");
	event.preventDefault();
});

//---------------------------------

addEventListener("keydown", function(event){
	if (event.keyCode == 86)
		document.body.style.background = "violet";	
});

addEventListener("keyup", function(event){
	if (event.keyCode == 86)
		document.body.style.background = "";
});

//--------------------------------

addEventListener("click", function(event) {
	var dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = (event.pageX - 4) + "px";
	dot.style.top = (event.pageY - 4) + "px";
	document.body.appendChild(dot);
});

//--------------------

var lastX;
var rect = document.querySelector("#dragBar");
rect.addEventListener("mousedown", function(event){
	if (event.which == 1){
		lastX = event.pageX;
		addEventListener("mousemove", moved);
		event.preventDefault(); //Prevent Selection
	}
});

function buttonPressed(event) {
	if (event.buttons == null)
		return event.which != 0;
	else
		return event.buttons !=0;
}

function moved(event) {
	if (!buttonPressed(event)){
		removeEventListener("mousemove", moved);
	} else {
		var dist = event.pageX - lastX;
		var newWidth = Math.max(10, rect.offsetWidth + dist);
		rect.style.width = newWidth + "px";
	}
}

//--------------------------

var hoverPara = document.querySelector("#hoverPara");

function isInside(node, target){
	for (; node != null; node = node.parentNode)
		if (node == target) return true;
}

hoverPara.addEventListener("mouseover", function(event){
	if (!isInside(event.relatedTarget, hoverPara))
		hoverPara.style.color = "red";
});

hoverPara.addEventListener("mouseout", function(event){
	if (!isInside(event.relatedTarget, hoverPara))
		hoverPara.style.color = "";
});

//----------------------------------

var bar = document.querySelector(".progress div");
addEventListener("scroll", function(){
	var max = document.body.scrollHeight - innerHeight;
	var percent = (pageYOffset / max) * 100;
	bar.style.width = percent + "%";
});

//---------------------------------

var help = document.querySelector("#help");
var fields = document.querySelectorAll("input");

for (var i=0; i < fields.length; i++){
	fields[i].addEventListener("focus", function(event){
		var text = event.target.getAttribute("data-help");
		help.textContent = text;
	});
	fields[i].addEventListener("blur", function(event){
		help.textContent = "";
	});
}

//------------------------------------------

var squareWorker = new Worker("code/squareWorker.js");
squareWorker.addEventListener("message", function(event){
	console.log("The worker responded:", event.data);
});

squareWorker.postMessage(10);
squareWorker.postMessage(24);

//------------------------------

document.body.style.background = "blue";

setTimeout(function(){
	document.body.style.background = "yellow";
}, 2000);

//----------------------------

var textArea = document.querySelector("textarea");
var timeout;

textArea.addEventListener("keydown", function(){
	clearTimeout(timeout);
	timeout = setTimeout(function(){
		console.log("You stopped typing.");
	},500);
});

//-----------------------------

function displayCoords(event){
	console.log("Mouse at " + event.pageX + ", " + event.pageY);
}

var scheduled = false, lastEvent;

addEventListener("mousemove", function(event){
	lastEvent = event;
	if (!scheduled){
		scheduled = true;
		setTimeout(function(){
			scheduled = false;
			displayCoords(lastEvent);
		}, 250);
	}
});

// @TODO Chapter 14 Exercises 
