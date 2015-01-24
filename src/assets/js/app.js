var game = new GAME();
game.initialize();


var a = document.getElementById("gamesvg");
  a.addEventListener("load",function(){
    //var svgDoc = a.contentDocument;
      var els = a.querySelectorAll("polygon");
      for (var i = 0, length = els.length; i < length; i++) {
        els[i].addEventListener("click", function(){ 

          console.log("column:" + this.getAttribute("column") + " row:" + this.getAttribute("row"));
            //game.changeTile(this.getAttribute("row"),this.getAttribute("column"));
            //this.parentNode.removeChild(this);
            this.setAttribute('fill',"yellow");
          });
      }
    });

