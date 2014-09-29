function MAP() {
    this.gamewindow     = document.getElementById("game");
    this.canvas         = document.createElement("canvas");
    this.context        = this.canvas.getContext("2d");
    this.canvas.width   = 1000;
    this.canvas.height  = 1008;
    this.tileCount      = 6;
    this.size           = (this.canvas.width / this.tileCount) / 2;
    this.tileset        = []; 

    this.gamewindow.appendChild(this.canvas);
}
MAP.prototype = {
    initialize: function() {
            console.log("Initializing map");
            this.initGrid();
    },
    initGrid: function () {
        var size = 50;
        var height = size * 2;
        var vert = 3/4 * height
        var width = Math.sqrt(3)/2 * height
        var horiz = width;
        var xCenter = this.canvas.width / 2;
        var yCenter = this.canvas.height / 2;
        for (var q = -5; q <= 5; q++) {
            for (var r = -5; r <= 5; r++) {
                if ((q < 0 && r < 0) || (q > 0 && r > 0)) {
                    if ((Math.abs(q) + Math.abs(r)) > 5) {
                        continue;
                    }
                }
                var x = size * Math.sqrt(3) * (q + r/2);
                var y = size * 3/2 * r;
                var atile = new TILE();
                atile.drawTileCenter(this.context,x + xCenter, y + yCenter,size);
            }
        }

        return;
        console.log("initGrid");
        var i, j;
        var width = this.size * 2;
        var height = Math.sqrt(3)/2 * width
        var horiz = 3/4 * width;

        for (var i = 0; i < this.tileCount; i++ ) {
            for (var j = 0; j < this.tileCount; j++) {
                x = i
                z = j - (i - (i&1)) / 2
                y = -x-z
                console.log(x, z);
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
        canvasContext.lineWidth         = 1;
        canvasContext.beginPath();
        for (var i = 0; i < 6; i++) {
            var angle = 2 * (Math.PI / 6) * (i + 0.5);
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
