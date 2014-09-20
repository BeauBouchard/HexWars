	
	
var map = function () {
	this.gamewindow = document.getElementById("game");
  	this.canvas 		= document.createElement("canvas");
  	this.context 		= this.canvas.getContext("2d");
  	this.canvas.width 	= 512;
  	this.canvas.height	= 256;
  	
  	this.tileset = []; 

  this.gamewindow.appendChild(this.canvas);
    this.context.fillStyle = "#000000";
    this.context.strokeStyle = "#FFFFFF";
    this.context.lineWidth = 1;
    
    initGrid(this.context, this.canvas.width, this.canvas.height);
}

map.prototype.initGrid = function (canvasContext, width, height) {
        var i, j; // counting variables
 
        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
            	var atile = new Tile(canvasContext, 
                    i * hexRectangleWidth + ((j % 2) * hexRadius), 
                    j * (sideLength + hexHeight), 
                    false);
                this.tileset[] += atile; 
            }
        }
}

var Tile = function (canvasContext, x, y, fill) {
  var hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    sideLength = 36,
    boardWidth = 10,
    boardHeight = 10;
    
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    
    this.drawTile(canvasContext, x, y, fill);
}

Tile.prototype.drawTile = function(canvasContext, x, y, fill) { 
        var fill = fill || false;
 
        canvasContext.beginPath();
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();
 
        if(fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }
}

	
	
