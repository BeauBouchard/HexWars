/**
 * given a canvas, hexagon orientation and tile size
 * calculate the maximum number or rows and columns
 * initialize an array of r * c entries set to true
 * pick M-number random row, column pairs to start
 * store each pair in a respective 'region' object
 * try N times to grow a region:
 *     - generate a list of adjacent cells
 *     - filter out non-empty cells (look at r * entry array for true value)
 *     - pick a random one and add it to the region
 *
 * to draw a region:
 * create a canvas context
 * for each cell:
 *     draw a hexagon, ignoring sides that have a neighbor that is also in the region
 * save the context
 *
 * grid object:
 * given a width, height, and tile size
 * calculate the maximum number or rows and columns
 * initialize a 2-dimensional array of row x column to x,y coordinates
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


function MAP(mapwidth,mapheight,tilesize) { 
    this.tileset            = [];
    this.mapwidth           = mapwidth;
    this.mapheight          = mapheight;
    this.tilesize           = tilesize;
    this.tileWidth          = this.tilesize * 2;
    this.tileHeight         = Math.sqrt(3)/2 * this.tileWidth; 
    this.verticalSpacing    = this.tileHeight;
    this.horizontalSpacing  = 3/4 * this.tileWidth;
    this.maxRows            = Math.floor((this.mapheight / this.verticalSpacing)) - 1;
    this.maxColumns         = Math.floor((this.mapwidth / this.horizontalSpacing)) - 1;
    //console.log(this.height);
    this.tileSet= new Array(this.maxRows);
    var row, column;
    for (row = 0; row < this.maxRows; row++) {
        this.tileSet[row] = new Array(this.maxColumns);
        for (column = 0; column < this.maxColumns; column++) {
            this.tileSet[row][column] = new TILE(this.tilesize, row, column);
        }
    }
}

MAP.prototype = { 
    generate: function () {
        console.log("MAP.generate");
        for(var tileid = 0; tileid<=((this.maxRows)*(this.maxColumns));tileid++){
            var row = tileid%this.maxRows;
            var column = tileid%this.maxColumns;
            console.log("Row:"+row+" Column:"+column+"");
            this.tileSet[row][column].draw();
        }
    },
    initCircle: function () {
        this.tileCount          = 6;
        console.log("MAP.initCircle");
        console.log("generating: " + this.tileCount + " rings of tiles");
        // size is the size of the hex from corner to another corner across. 
        var xCenter     = this.mapwidth / 2;
        var yCenter     = this.mapheight / 2;
        var tileid = 0;
        console.log("MaxRows:"+this.maxRows+" MaxColumns:"+this.maxColumns+ " "+yCenter );
        for (var q = -this.tileCount; q <= this.tileCount; q++) {
            for (var r = -this.tileCount; r <= this.tileCount; r++) {
                if ((q < 0 && r < 0) || (q > 0 && r > 0)) {
                    if ((Math.abs(q) + Math.abs(r)) > this.tileCount) {
                        continue;
                    }
                }
                //console.log("MAP.newtile");
                var x = this.tilesize * 3/2 * r;
                var y = this.tilesize * Math.sqrt(3) * (q + r/2);

                var row = tileid%this.maxRows;
                var column = tileid%this.maxColumns;
                console.log("Row:"+row+" Column:"+column+" X:"+(x + xCenter) + " Y:" + (y + yCenter));
                alert("");
                this.tileSet[row][column].initialize(tileid,x + xCenter, y + yCenter);
                this.tileSet[row][column].draw();
                //this.tileset.push(atile);
                tileid++;
            }
        }
        this.drawMap();
        return;
    },
    drawMap: function() {
        console.log("MAP.drawMap");
    },
    reDrawGrid: function () {
        console.log("MAP.reDrawGrid");
        this.clearMap();
        this.drawGrid();
    },
    clearMap: function () {
        console.log("MAP.clearMap");
    }
}



function TILE(tilesize, row, column) {
    this.row = row;
    this.column = column;
    this.tag = '';
    this.data = {};
    this.nSides  = 6; // ma sides
    this.size    = tilesize; //size corner to corner
    this.centerX = 0;
    this.centerY = 0;
    this.display = false;
    this.id      = 0;
    this.region;
    this.x = this.size * 3/2 * (1 + column);
    this.y = this.size * Math.sqrt(3) * (1 + row + 0.5 * (column&1));
    this.strokeStyle = "black";
    this.fillStyle = 'white';
    this.lineWidth = 1;
}

TILE.prototype = {
    initialize: function(id,centerX,centerY)  {
        this.id = id;
        this.x = centerX;
        this.y = centerY;
    },
    draw: function() {
        if(this.display === true) {
            //clear tile, then redraw
            this.clear();
        } else {
            var xmlns = "http://www.w3.org/2000/svg";
            var svgspace = document.getElementById("gamesvg");
            var polygon = document.createElementNS(xmlns,'polygon');
                polygon.setAttributeNS(null, 'id', 'polygon'+this.id);
                polygon.setAttributeNS(null, 'row', this.row);
                polygon.setAttributeNS(null, 'column', this.column);
                polygon.setAttributeNS(null, 'stroke-width', this.lineWidth );
                polygon.setAttributeNS(null, 'fill',this.fillStyle);
                polygon.setAttributeNS(null, 'stroke',this.strokeStyle);
                polygon.setAttributeNS(null, 'opacity', 1); 
            
            var pointString = "";
            //draws the element based on how many sides
            for( var i = 0; i <= this.nSides; i++) {
                var angle = 2 * Math.PI / this.nSides * i;
                //Corner x and y, draws each side/cornerpoint
                var cornX = this.x + this.size * Math.cos(angle);
                var cornY = this.y + this.size * Math.sin(angle);
                if( i == 0) {
                    pointString = " " + cornX + "," + cornY;
                } else {
                    pointString += " " + cornX + "," + cornY;
                }
            }
            polygon.setAttributeNS(null, 'points', pointString);
            
            var gTile = document.createElementNS(xmlns,'g');
                gTile.setAttributeNS(null, 'class','tile');
                gTile.appendChild(polygon);
            svgspace.appendChild(gTile);
            this.display = true;

        }
    }, 
    clear: function() {
        if(this.display === true) {
            this.display = false;
            this.draw();
        }
    }
}

TILE.prototype.setX      = function(newX)     { this.x     = newX;};
TILE.prototype.setY      = function(newY)     { this.y     = newY;};
TILE.prototype.setFillStyle    = function(newFill)  { this.fillStyle   = newFill;};
TILE.prototype.setStrokeStyle  = function(newStroke){ this.strokeStyle = newStroke;};
TILE.prototype.setLineWidth    = function(newWidth) { this.lineWidth   = newWidth;};
TILE.prototype.getX      = function() { return this.x;};
TILE.prototype.getY      = function() { return this.y;};
TILE.prototype.getfillStyle    = function() { return this.fillStyle;};
TILE.prototype.getstrokeStyle  = function() { return this.strokeStyle;};
TILE.prototype.getlineWidth    = function() { return this.lineWidth;};



function HUD () {
    this.width = 300;
    this.height = 200;
};

HUD.prototype = {
    initialize: function() {

    }
};


function REGION(){

}

REGION.prototype.grow = function () {
    /*
    var self = this;
    var emptyNeighbors = this.getCells().map(
        function(cell) {
            return cell.getNeighbors();
        }
    */
}
REGION.prototype.reduce = function (carry, neighbors) {
    /*var i, neighbor;
    for (i = 0; i < neighbors.length; i++) {
        neighbor = neighbors[i];

        if (!carry[neighbor] &&
            !self.cells[neighbor]&&
            !neighbor.tag) {

            carry[neighbor] = neighbor;
        }
    }
    return carry;
    */
}
