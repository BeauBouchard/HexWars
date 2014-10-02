var game = new GAME();
game.initialize();
game.start();


var a = document.getElementById("gamesvg");
	a.addEventListener("load",function(){
		//var svgDoc = a.contentDocument;
  		var els = a.querySelectorAll("polygon");
  		for (var i = 0, length = els.length; i < length; i++) {
    		els[i].addEventListener("click", function(){ 

    			console.log("column:" + this.getAttribute("column") + " row:" + this.getAttribute("row"));
    			
    			});
    	}
  	});
