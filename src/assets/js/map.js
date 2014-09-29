function MAP() {
    this.gamewindow     = document.getElementById("game");
    this.canvas         = document.createElement("canvas");
    this.context        = this.canvas.getContext("2d");
    this.tileCount      = 20;
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    this.canvas.width   = x;
    this.canvas.height  = y;
    this.size           = Math.sqrt((this.canvas.width^2)+(this.canvas.height^2))/(this.tileCount/5);
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
        var height      = this.size * 2;
        var vert        = 3/4 * height
        var width       = Math.sqrt(3)/2 * height
        var horiz       = width;
        var xCenter     = this.canvas.width / 2;
        var yCenter     = this.canvas.height / 2;
        var tileid   = 0;

        for (var q = -this.tileCount; q <= this.tileCount; q++) {
            for (var r = -this.tileCount; r <= this.tileCount; r++) {
                if ((q < 0 && r < 0) || (q > 0 && r > 0)) {
                    if ((Math.abs(q) + Math.abs(r)) > this.tileCount) {
                        continue;
                    }
                }
                var x = this.size * Math.sqrt(3) * (q + r/2);
                var y = this.size * 3/2 * r;
                var atile = new TILE();

                atile.initialize(tileid,x + xCenter, y + yCenter,this.size);
                this.tileset.push(atile);
                tileid++;
            }
        }
        this.drawGrid();
        return; 
    },
    drawGrid: function() {
        console.log("MAP.drawGrid");


        this.tileset[45].setFillStyle("#000032"); // test
        this.tileset[45].setStrokeStyle("#202099"); // test
        for(x in this.tileset) {
                this.tileset[x].drawTileCenter(this.context);
            }
        for(x in this.tileset) {
             this.tileset[x].drawTileNum(this.context);
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
    this.id                = -1;
}

TILE.prototype = {
    initialize: function(id, x,y ,size)  {
        this.id = id;
        this.centerX = x;
        this.centerY = y;
        this.size    = size;
        this.font   = "8px Georgia";
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
        console.log("TILE.drawTileCenter");
    },
    drawTileNum: function(canvasContext) {
        canvasContext.fillStyle         = "#323232";
        canvasContext.strokeStyle       = this.strokeStyle;
        canvasContext.lineWidth         = this.lineWidth;
        canvasContext.font              = this.font;
        canvasContext.fillText(this.id,this.centerX,this.centerY);
        console.log("TILE.drawTileNum");
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

function HUD () {
    this.width = 300;
    this.height = 200;
    this.tileCount = 0;
}

HUD.prototype = {
    initialize: function() {

    }
}

HUD.prototype.addTile =function () {
    this.tileCount++;
}
