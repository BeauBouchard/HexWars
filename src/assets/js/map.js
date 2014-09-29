function MAP() {
    this.gamewindow     = document.getElementById("game");
    this.canvas         = document.createElement("canvas");
    this.context        = this.canvas.getContext("2d");
    this.canvas.width   = 1000;
    this.canvas.height  = 1008;
    this.tileCount      = 6;
    this.size           = (this.canvas.width / this.tileCount) / 3.646464;
    this.tileset        = []; 

    this.gamewindow.appendChild(this.canvas);
}

MAP.prototype = {
    initialize: function() {
            console.log("Initializing map");
            this.initGrid();
    },
    initGrid: function () {
        console.log("MAP.initGrid");
        var height = this.size * 2;
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
                var x = this.size * Math.sqrt(3) * (q + r/2);
                var y = this.size * 3/2 * r;
                var atile = new TILE();
                atile.initialize(x + xCenter, y + yCenter,this.size);
                this.tileset.push(atile);
            }
        }
        this.drawGrid();
        return; 
    },
    drawGrid: function() {
        console.log("MAP.drawGrid");
        for(x in this.tileset) {
                this.tileset[x].drawTileCenter(this.context);
            }
    },
    reDrawGrid: function () {
        this.clearMap();
        this.drawGrid();
    },
    clearMap: function () {
        this.context.clearRect (0, 0, this.canvas.width, this.canvas.height);
        console.log("MAP.clearMap");
    }
}

function TILE() {
    this.fillStyle         = "#FFF";
    this.strokeStyle       = "#323232";
    this.size              = 50;
    this.lineWidth         = 1;
    this.truex             = 0;
    this.truey             = 0;
}

TILE.prototype = {
    initialize: function( x,y ,size)  {
        this.centerX = x;
        this.centerY = y;
        this.size    = size;
    },
    drawTileCenter: function(canvasContext) { 
        canvasContext.fillStyle         = this.fillStyle;
        canvasContext.strokeStyle       = this.strokeStyle;
        canvasContext.lineWidth         = this.lineWidth;
        canvasContext.beginPath();
        for (var i = 0; i < 6; i++) {
            var angle = 2 * (Math.PI / 6) * (i + 0.5);
            var x = this.centerX + this.size * Math.cos(angle);
            var y = this.centerY + this.size * Math.sin(angle);
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

TILE.prototype.setCenterX      = function(newX) {
    this.centerX           = newX;
}

TILE.prototype.setCenterY      = function(newY) {
    this.centerY           = newY;
}

TILE.prototype.setFillStyle    = function(newFill) {
    this.fillStyle         = newFill;
}

TILE.prototype.setStrokeStyle  = function(newStroke) {
    this.strokeStyle       = newStroke;
}

TILE.prototype.setLineWidth    = function(newWidth) {
    this.lineWidth         = newWidth;
}

TILE.prototype.setTrueX        = function(newtX) {
    this.truex             = newtX;
}

TILE.prototype.setTrueY        = function(newtY) {
    this.truey             = newtY;
}

TILE.prototype.getCenterX      = function() {
    return this.centerX;
}

TILE.prototype.getCenterY      = function() {
    return this.centerY;
}

TILE.prototype.getfillStyle     = function() {
    return this.fillStyle;
}

TILE.prototype.getstrokeStyle   = function() {
    return this.strokeStyle;
}

TILE.prototype.getlineWidth     = function() {
    return this.lineWidth;
}

TILE.prototype.getTrueX      = function() {
    return this.truex;
}

TILE.prototype.getTrueY      = function() {
    return this.truey;
}
