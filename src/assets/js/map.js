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
            this.tileset[i] = [];
            for (var j = 0; j < this.tileCount; j++) {
                var atile = new TILE();
                atile.initialize(i,j);
                if (i % 2 == 0) {
                    atile.drawTileCenter(this.context,this.size + (i * horiz), this.size + (j * height),this.size);
                } else {
                    atile.drawTileCenter(this.context,this.size + (i * horiz), this.size + (j * height) + (height / 2),this.size);
                }
                this.tileset[i][j] = atile;
            }
        }
    },
    setTileColor: function (x,y,newcolor) {
        this.tileset[x][y].changeColor(newcolor,newcolor);
        this.tileset[x][y].redrawTile();
    }
}
function TILE() {
    this.fillStyle; 
    this.strokeStyle; 
    this.lineWidth; 
    this.centerX; 
    this.centerY; 
    this.size;
    this.Group;
}
TILE.prototype = {
    initialize: function( x, y)  {
        this.truex = x;
        this.truey = y;
    },
    drawTileCenter: function(canvasContext,centerX, centerY,size) { 
        this.canvasContext              = canvasContext;
        this.canvasContext.fillStyle    = "#FFF";
        this.canvasContext.strokeStyle  = "#323232";
        this.canvasContext.lineWidth    = 2;
        this.fillStyle                  = "#FFF";
        this.strokeStyle                = "#323232";
        this.lineWidth                  = 2;
        this.centerX                    = centerX;
        this.centerY                    = centerY;
        this.size                       = size;
        
        this.canvasContext.beginPath();
        for (var i = 0; i < 6; i++) {
            var angle = 2 * (Math.PI / 6) * i;
            var x = this.centerX + this.size * Math.cos(angle);
            var y = this.centerY + this.size * Math.sin(angle);
            if (i == 0) {
                this.canvasContext.moveTo(x, y);
            } else {
                this.canvasContext.lineTo(x, y);
            }
        }
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();

    },
    changeColor: function(fillStyle,strokeStyle) {
        this.canvasContext.fillStyle    = fillStyle;
        this.canvasContext.strokeStyle  = strokeStyle;
    },
    redrawTile: function() {
        this.canvasContext.beginPath();
        for (var i = 0; i < 6; i++) {
            var angle = 2 * (Math.PI / 6) * i;
            var x = this.centerX + this.size * Math.cos(angle);
            var y = this.centerY + this.size * Math.sin(angle);
            if (i == 0) {
                this.canvasContext.moveTo(x, y);
            } else {
                this.canvasContext.lineTo(x, y);
            }
        }
        this.canvasContext.closePath();
        this.canvasContext.fill();
        this.canvasContext.stroke();
    }
}
