function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


function MAP(mapwidth,mapheight,tilesize,regioncount) { 
    /**
     * There are 6 neighbors for every tile, the direction input is below:
     *      __
     *   __/  \__
     *  /  \_3/  \
     *  \_2/  \4_/
     *  / 1\__/5 \
     *  \__/0 \__/
     *     \__/
     */
    this.nDelta = {
        even: [ [1,  0], [ 0, -1], [-1, -1],
                [-1,  0], [-1, 1], [ 0, 1] ],
        odd: [ [1,  0], [1, -1], [ 0, -1],
               [-1,  0], [ 0, 1], [1, 1] ]
    }
    this.mapwidth           = mapwidth;
    this.mapheight          = mapheight;
    this.tilesize           = tilesize;
    this.tileWidth          = this.tilesize * 2;
    this.tileHeight         = Math.sqrt(3)/2 * this.tileWidth; 
    this.verticalSpacing    = this.tileHeight;
    this.horizontalSpacing  = 3/4 * this.tileWidth;
    this.maxRows            = Math.floor((this.mapheight / this.verticalSpacing)) - 1;
    this.maxColumns         = Math.floor((this.mapwidth / this.horizontalSpacing)) - 1;
    this.tileSet            = new Array(this.maxRows);
    this.regionSet          = new Array();
    this.regionCount        = regioncount;
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
            this.tileSet[row][column].setid(tileid);
            this.tileSet[row][column].draw();
        }
    },
    setupRegions: function (){ 
        console.log("MAP.setupRegions");
        for(var i = 1; i <= this.regionCount; i++){
            this.seedRegion(getRandomInt(0, this.getMaxRows()),getRandomInt(0, this.getMaxColumns()),i);
        }
        for(var i = 1; i <= this.regionCount/3; i++){
            this.regionSet.forEach(function(region) {
                region.grow(region);
            });
        }
        /*
*/

    },
    seedRegion: function (row,col,regionid) {
        if(this.tileSet[row][col].getOccupied()){
            //already filled with a region
            console.log("MAP.seedRegion: already filled with a region");
        } else {

            ///////////////////////////////////

            var tile = this.getTile(row,col);
            var region = new REGION(regionid, tile);
            
            this.regionSet.push(region); // 
             console.log("MAP.seedRegion: " + regionid);

            ///////////////////////////////////
        }

    },
    colorRegion: function () {
        this.regionSet.forEach(function(region) {
            var playercount= game.getPlayerCount();
            var playernum = region.getid()%playercount;
            var playercolor = game.getPlayerColor(playernum);
            console.log("Map.setupRegions.playernum = " + playercolor);
            region.changeRegionColor(playercolor);
        });
    },
    initCircle: function () {
        this.tileCount          = this.tilesize;
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
                this.tileSet[row][column].initialize(tileid,x + xCenter, y + yCenter);
                this.tileSet[row][column].draw();
                tileid++;
            }
        }
        this.drawMap();
        return;
    },
    getTile: function(row,col) {
        return this.tileSet[row][col];
    },
    getMaxRows: function() {
        return this.maxRows;
    },
    getMaxColumns: function() {
        return this.maxColumns;
    },
    setTile: function(row,col, tile) {
        this.tileSet[row][col] = tile;
    },
    /*  getNeighbor
     *  Descriotion: Selects a neighbor from a tile based on input direction
     *      @param tile TILE - a tile which to select neighbor from based on direction
     *      @param direction int - a number 0-5 selects which side to return tile from
     *      @return tile - returns the tile selected
     */ 
    getNeighbor: function(tile,direction) {
        var parity = tile.getColumn() & 1 ? 'odd' : 'even'; //checks if row is even or odd, assigns
        var delta  = this.nDelta[parity][direction]; // returns a array, with 0 being row delta, and 1 column delta
        var newRow = tile.getRow() + delta[0];
        var newCol = tile.getColumn() + delta[1];
        if(newRow < 0){
            newRow = this.maxRows -1;
        } 
        if (newCol < 0){
            newCol = this.maxColumns -1;
        } 
        if (newRow >= this.maxRows ){
            newRow = 1;
        }
        if ( newCol >= this.maxColumns){
            newCol = 1;
        } 
            return this.tileSet[newRow][ newCol];
    },
    /*  getNeighbor
     *  Descriotion: Returns number of living neighbors, 0-6 at most
     *      @param tile TILE - a tile which to get neighbor count from
     *      @return int - returns the number of neighbors from a tile
     */ 
    getLivingNeighbors: function(tile) {
        var count = 0; //living Neighbor count
        var parity = tile.getColumn() & 1 ? 'odd' : 'even';
        for(var i = 0; i <6; i++){
            var delta = this.nDelta[parity][i];
            //console.log("Delta: "+delta + " Parity:" + parity);
            var newRow = tile.getRow() + delta[0];
            var newCol = tile.getColumn() + delta[1];
            //console.log("newRow: "+newRow + " newCol:" + newCol);
            if(newRow < 0 || newCol < 0 || newRow >= this.maxRows || newCol >= this.maxColumns)         {
                //skip
            } else  {
                var tiletocheck = this.tileSet[newRow][newCol].getOccupied();
                if(tiletocheck){
                    count++;
                }
            }
        
        }
        return count;
    },
    checkOccupied: function (row,col) {
        return this.tileSet[row][col].getOccupied();
    }
}

/*
 *   _______ _ _      
 *  |__   __(_) |     
 *     | |   _| | ___ 
 *     | |  | | |/ _ \
 *     | |  | | |  __/
 *     |_|  |_|_|\___|
 */

function TILE(tilesize, row, column) {
    this.row            = row;
    this.column         = column;
    this.size           = tilesize; //size corner to corner
    this.id             = 0;
    this.x              = this.size * 3/2 * (1 + column);
    this.y              = this.size * Math.sqrt(3) * (1 + row + 0.5 * (column&1));
    this.display        = false;
    this.occupied       = false;
    this.data           = {};
    this.nSides         = 6; // ma sides
    this.centerX        = 0;
    this.centerY        = 0;
    this.lineWidth      = 1;
    this.tag            = '';
    this.strokeStyle    = "black";
    this.fillStyle      = '#383A3D';
    this.region;
    this.polygon;
}

TILE.prototype = {
    initialize: function(id) {
        this.id         = id;
    },
    initialize: function(id,centerX,centerY)  {
        this.id         = id;
        this.x          = centerX;
        this.y          = centerY;
    },
    draw: function() {
        if(this.display === true) {
            //clear tile, then redraw
            //console.log("TILE.draw: clear tile, then redraw" );
            this.clear();
            this.draw();
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
                // if(checkneighbor) {
                if( i == 0) {
                    pointString = " " + cornX + "," + cornY;
                } else {
                    pointString += " " + cornX + "," + cornY;
                }
                // }
            }
            polygon.setAttributeNS(null, 'points', pointString);
             
            var gTile = document.createElementNS(xmlns,'g');
                gTile.setAttributeNS(null, 'id','tile' + this.id);
                gTile.appendChild(polygon);
                this.polygon = gTile;
            svgspace.appendChild(gTile);
            this.display = true;

        }
    }, 
    clear: function() {
        if(this.display === true) {
            var svgspace = document.getElementById("gamesvg");

            //var tile = document.querySelectorAll("tile"+this.id);
            this.polygon.parentNode.removeChild(this.polygon);
            //var tile = svgspace.querySelectorAll("polygon"+this.id);
            //tile.parentNode.removeChild(tile);
            //console.log("TILE.clear: " + tile.getAttribute(id) );
                
            //svgspace.parentNode.removeChild(element);(polylist);
            //var polygon  = polylist.getElementById("polygon"+this.id)
           // polylist

            //svgspace.removeChild(polylist.getElementById("polygon"+this.id));
            //polylist.getElementById("polygon"+this.id);
            //this.destroyland(row,column)
            this.display = false;
        }
    },
    reset: function () {
        //set to default starting white tile

        this.strokeStyle = "black";
        this.fillStyle = '#323232';
        this.lineWidth = 1;
        this.occupied = false;
        this.tile = false;
        this.clear();
        this.draw();

    }, 
    occupy: function (tile) {
        this.setOccupied(true);
        this.tile = tile;
    },
    toString: function() {
        return this.row + ', ' + this.column;
    }
}


/* 
 *      ## Sets
 */
TILE.prototype.setid            = function(newid)     { this.id     = newid;};
TILE.prototype.setX             = function(newX)     { this.x     = newX;};
TILE.prototype.setY             = function(newY)     { this.y     = newY;};
TILE.prototype.setFillStyle     = function(newFill)  { this.fillStyle   = newFill;};
TILE.prototype.setStrokeStyle   = function(newStroke){ this.strokeStyle = newStroke;};
TILE.prototype.setLineWidth     = function(newWidth) { this.lineWidth   = newWidth;};
TILE.prototype.setOccupied      = function(newOccupied) {this.occupied = newOccupied; };
TILE.prototype.setRegion        = function(newRegionid) {this.region = newRegionid;};
TILE.prototype.setDisplay       = function(newDisplay) { this.display = newDisplay; };

/* 
 *      ## Gets
 */
TILE.prototype.getid            = function() { return this.id;};
TILE.prototype.getX             = function() { return this.x;};
TILE.prototype.getY             = function() { return this.y;};
TILE.prototype.getColumn        = function() { return this.column;};
TILE.prototype.getRow           = function() { return this.row;};
TILE.prototype.getfillStyle     = function() { return this.fillStyle;};
TILE.prototype.getstrokeStyle   = function() { return this.strokeStyle;};
TILE.prototype.getlineWidth     = function() { return this.lineWidth;};
TILE.prototype.getOccupied      = function() { return this.occupied; };
TILE.prototype.getRegion        = function() { return this.region;};


function HUD () {
    this.width = 300;
    this.height = 200;
};

HUD.prototype = {
    initialize: function() {

    }
};


/*
 *   _____            _             
 *  |  __ \          (_)            
 *  | |__) |___  __ _ _  ___  _ __  
 *  |  _  // _ \/ _` | |/ _ \| '_ \ 
 *  | | \ \  __/ (_| | | (_) | | | |
 *  |_|  \_\___|\__, |_|\___/|_| |_|
 *               __/ |              
 *              |___/               
 */

function REGION(id,tile){
    this.id         = id;
    this.color      = '#DB0148';
    //seed xy
    this.x;
    this.y;
    this.tileList   = new Array();;
    this.initialize(tile);
}

REGION.prototype = {
    initialize: function(tile) {
        this.addTile(tile);
    },
    /*  addTile
     *  @param tile tile - the incoming tile 
     */
    addTile: function (tile){
        //var tile = this.game.tileSet[row][column];
        tile.setFillStyle(this.color);
        tile.setOccupied(true);
        tile.setDisplay(true);
        tile.setRegion(this.id);
        tile.draw();
        //console.log("REGION.addTile: " + tile.getfillStyle() );
        this.tileList.push(tile); // 
        //console.log("REGION.addTile: " + this.id );

    },
    grow: function (callback) {
        
           ///////
            //var livingcount = tile.getLivingNeighbors(tile);
            //get neighbors, 
            //getNeighbor: function(tile,direction) 
            // loop neighbors assigning each one to be part of this region 
            // if they are not already in a region
        this.tileList.forEach(function(tile) {
            for ( var i = 0; i<=5; i++){
                var canidateTile = game.getMap().getNeighbor(tile,i);
                //console.log("max row: "+game.getMap().getMaxRows() + " max col:" + game.getMap().getMaxColumns());
                //    console.log(" x: " +canidateTile.getColumn() + " Y: " +canidateTile.getRow());
                if(!canidateTile.getOccupied()){
                    //if tile is not occupied, fill it
                    callback.addTile(canidateTile);
                } else { 
                    // tile is filled with something else, or error
                }
            }
        });
    },
    changeRegionColor: function (newColor){
        this.color = newColor;
        this.tileList.forEach(function(tile) {
            tile.setFillStyle(this.color);
            tile.draw();
        });
    }

}
  

REGION.prototype.setColor   = function(newColor) { this.color = newColor; };
REGION.prototype.getColor   = function() { return this.color; };
REGION.prototype.getid = function() { return this.id; };

REGION.prototype.reduce = function (carry, neighbors) {
}