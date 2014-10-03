var mapgenerator = window.mapgenerator = function(canvas, tileSize) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.tileSize = tileSize;

    this.grid = new hexgrid(this.width, this.height, tileSize);
};

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

mapgenerator.prototype.generate = function(numRegions, fillValue) {
    var numTiles = this.grid.maxRows * this.grid.maxColumns;
    var growthStages = Math.floor((numTiles * fillValue) / numRegions);
    var i, j, startingHex, regions = [];

    for (i = 0; i < numRegions; i++) {
        regions.push(new region('region-' + i));

        do {
            startingHex = this.grid.getRandomHex();
        } while (startingHex.tag != '');

        regions[i].addCell(startingHex);
    }

    for (i = 0; i < growthStages; i++) {
        for (j = 0; j < numRegions; j++) {
            regions[j].grow();
        }
    }

    this.regions = regions;
};

var region = window.region = function(tag) {
    this.tag = tag;
    this.cells = {};
};

region.prototype.getCells = function() {
    return Object.keys(this.cells).map(function(key) {
        return this.cells[key];
    }, this);
};

region.prototype.addCell = function(hex) {
    hex.tag = this.tag;
    this.cells[hex] = hex;
};

region.prototype.grow = function() {
    var self = this;
    var emptyNeighbors = this.getCells().map(
        function(cell) {
            return cell.getNeighbors();
        }
    ).reduce(
        function(carry, neighbors) {
            var i, neighbor;

            for (i = 0; i < neighbors.length; i++) {
                neighbor = neighbors[i];

                if (!carry[neighbor] &&
                    !self.cells[neighbor]&&
                    !neighbor.tag) {

                    carry[neighbor] = neighbor;
                }
            }

            return carry;
        },
    {});

    var emptyNeighborKeys = Object.keys(emptyNeighbors);
    var randomNeighborKeyIndex = getRandomInt(0, emptyNeighborKeys.length);
    var randomNeighborKey = emptyNeighborKeys[randomNeighborKeyIndex];

    if (randomNeighborKey) {
        this.addCell(emptyNeighbors[randomNeighborKey]);
    }
};

region.prototype.getPerimeter = function() {
    var cells = this.getCells();
    var visitedSides = {};
    var perimeter = [];
    var i, side, cell, neighbor, perimeterCell, node, offset;

    for (i = 0; i < cells.length && !perimeterCell; i++) {
        cell = cells[i];

        for (side = 0; side < 6; side++) {
            neighbor = cell.getNeighbor(side);

            if (!neighbor || neighbor.tag != this.tag) {
                perimeterCell = cell;
                offset = side;
                break;
            }
        }
    }
    while (perimeterCell) {
        node = perimeterCell;
        perimeterCell = null;

        if (!visitedSides[node]) {
            visitedSides[node] = {};
        }

        for (side = offset; !visitedSides[node][side]; side = (side + 1) % 6) {
            visitedSides[node][side] = side;
            neighbor = node.getNeighbor(side);

            if (!neighbor || neighbor.tag != this.tag) {
                perimeter.push(node.getCoordinatesForSide(side));
            } else if (neighbor && neighbor.tag == this.tag) {
                perimeterCell = neighbor;
                offset = (side + 4) % 6;
                break;
            }
        }
    }

    return perimeter;
};

gamewindow     = document.getElementById("game");
canvas         = document.createElement("canvas");
canvas.width   = 1000;
canvas.height  = 600;
gamewindow.appendChild(this.canvas);
var tilesize = 10;
var regionCount = 6;

a = new mapgenerator(canvas, tilesize);
a.generate(regionCount, .75);

var colors = ['#f5f5f5', '#ffffff', '#dff0d8', '#d9edf7', '#fcf8e3', '#f2dede']

for (var i = 0; i < regionCount; i++) {
    var region = a.regions[i];
    var cells = region.getCells();
    var cellIndex = region.cells;

    var canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle         = colors[i];
    canvasContext.strokeStyle       = "#323232";
    canvasContext.lineWidth         = 1;
    canvasContext.beginPath();

    var perimeter = region.getPerimeter();
    for (var j = 0; j < perimeter.length; j++) {
        var coordinates = perimeter[j];
        var x = coordinates[0];
        var y = coordinates[1];

        if (j == 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }
    }

    canvasContext.closePath();
    canvasContext.stroke();
    canvasContext.fill();
}
