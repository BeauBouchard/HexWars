
	
function MAP() {
	this.gamewindow = document.getElementById("game");
  	this.canvas 		= document.createElement("canvas");
  	this.context 		= this.canvas.getContext("2d");
  	this.canvas.width 	= 1024;
  	this.canvas.height	= 762;
  	
  	this.tileset = []; 

  this.gamewindow.appendChild(this.canvas);
    this.context.fillStyle = "#212121";
    this.context.strokeStyle = "#FFFFFF";
    this.context.lineWidth = 1;
    
    this.initGrid(this.context, this.canvas.width, this.canvas.height);
}

MAP.prototype = {
    initialize: function() {

    }
}
MAP.prototype.initGrid = function (canvasContext, width, height) {
        var i, j; // counting variables
 
        for(i = 0; i < width; ++i) {
            for(j = 0; j < height; ++j) {
            	var atile = new TILE();
                //    this.drawTile(canvasContext, x, y, fill);
                    atile.drawTile(canvasContext, 
                    i * atile.hexRectangleWidth + ((j % 2) * atile.hexRadius), 
                    j * (atile.sideLength + atile.hexHeight), 
                    true);
                this.tileset.push(atile); 
            }
        }
}

var TILE = function (canvasContext, x, y, fill) {
  this.hexHeight,
    this.hexRadius,
    this.hexRectangleHeight,
    this.hexRectangleWidth,
    this.hexagonAngle = 0.523598776, // 30 degrees in radians
    this.sideLength = 36,
    this.boardWidth = 10,
    this.boardHeight = 10;
    
    this.hexHeight = Math.sin(this.hexagonAngle) * this.sideLength;
    this.hexRadius = Math.cos(this.hexagonAngle) * this.sideLength;
    this.hexRectangleHeight = this.sideLength + 2 * this.hexHeight;
    this.hexRectangleWidth = 2 * this.hexRadius;
    

}

TILE.prototype.drawTile = function(canvasContext, x, y, fill) { 
    var fill = fill || false;

    canvasContext.beginPath();
    canvasContext.moveTo(x + this.hexRadius, y);
    canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight);
    canvasContext.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength);
    canvasContext.lineTo(x + this.hexRadius, y + this.hexRectangleHeight);
    canvasContext.lineTo(x, y + this.sideLength + this.hexHeight);
    canvasContext.lineTo(x, y + this.hexHeight);
    canvasContext.closePath();

    if(fill) {
        canvasContext.fill();
    } else {
        canvasContext.stroke();
    }
}

	
	
