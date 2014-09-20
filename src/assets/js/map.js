function MAP() {
    this.gamewindow     = document.getElementById("game");
    this.canvas         = document.createElement("canvas");
    this.context        = this.canvas.getContext("2d");
    this.canvas.width   = 400;
    this.canvas.height  = 400;
    this.tileCount      = 10;
    this.size           = (this.canvas.height / this.tileCount) / 2;
    this.tileset        = []; 

    this.gamewindow.appendChild(this.canvas);
}
MAP.prototype = {
    initialize: function() {
            console.log("Initializing map");
            this.initGrid();
    },
    initGrid: function () {
        console.log("initGrid");
        var i, j;
        var width = this.size * 2;
        var height = Math.sqrt(3)/2 * width
        var horiz = 3/4 * width;

        for (var i = 0; i < this.tileCount; i++ ) {
            for (var j = 0; j < this.tileCount; j++) {
                var atile = new TILE();
                atile.initialize(i,j);
                if (i % 2 == 0) {
                    atile.drawTileCenter(this.context,this.size + (i * horiz), this.size + (j * height),this.size);
                } else {
                    atile.drawTileCenter(this.context,this.size + (i * horiz), this.size + (j * height) + (height / 2),this.size);
                }
                this.tileset.push(atile);
            }
        }
    }
}
function TILE() {

}
TILE.prototype = {
    initialize: function( x, y)  {
        this.truex = x;
        this.truey = y;
    },
    drawTileCenter: function(canvasContext,centerX, centerY,size) { 
        canvasContext.fillStyle         = "#FFF";
        canvasContext.strokeStyle       = "#323232";
        canvasContext.lineWidth         = 2;
        canvasContext.beginPath();
        for (var i = 0; i < 6; i++) {
            var angle = 2 * (Math.PI / 6) * i;
            var x = centerX + size * Math.cos(angle);
            var y = centerY + size * Math.sin(angle);
            if (i == 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }
        }
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.stroke();
    }
}
