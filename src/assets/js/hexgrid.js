var hexgrid = window.hexgrid = function(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.tileHeight = tileSize * 2;
    this.tileWidth = Math.sqrt(3)/2 * this.tileHeight;
    this.verticalSpacing = 3/4 * this.tileHeight;
    this.horizontalSpacing = this.tileWidth;

    this.maxRows = Math.floor((this.height / this.verticalSpacing)) - 1;
    this.maxColumns = Math.floor((this.width / this.horizontalSpacing)) - 1;
    this.tileSet = new Array(this.maxRows);

    var row, column;
    for (row = 0; row < this.maxRows; row++) {
        this.tileSet[row] = new Array(this.maxColumns);
        for (column = 0; column < this.maxColumns; column++) {
            this.tileSet[row][column] = new hex(this, row, column);
        }
    }
};

hexgrid.prototype.getRandomHex = function() {
    var row = getRandomInt(0, this.maxRows);
    var column = getRandomInt(0, this.maxColumns);

    return this.tileSet[row][column];
};

hexgrid.prototype.getHex = function(row, column) {
    if (row < 0 || row >= this.maxRows) {
        return null;
    } else if (column < 0 || column >= this.maxColumns) {
        return null;
    } else {
        return this.tileSet[row][column];
    }
};

var hex = window.hex = function(grid, row, column) {
    this.grid = grid;
    this.row = row;
    this.column = column;
    this.tag = '';
    this.data = {};

    this.x = grid.tileSize * Math.sqrt(3) * (1 + column + 0.5 * (row&1));
    this.y = grid.tileSize * 3/2 * (1 + row);
};

var neighborDelta = {
    even: [[1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [0, 1]],
    odd: [[1, 1], [1, 0], [0, -1], [-1, 0], [-1, 1], [0, 1]]
}

hex.prototype.getNeighbors = function() {
    var parity = this.row & 1 ? 'odd' : 'even';
    var delta;

    return [0, 1, 2, 3, 4, 5].map(function(direction) {
        delta = neighborDelta[parity][direction];

        return [this.row + delta[0], this.column + delta[1]];
    }, this).map(function(coordinates) {
        return this.grid.getHex.apply(this.grid, coordinates);
    }, this).filter(function(hex) {
        return hex;
    });
};

hex.prototype.getNeighbor = function(direction) {
    var parity = this.row & 1 ? 'odd' : 'even';
    var delta = neighborDelta[parity][direction];

    return this.grid.getHex(this.row + delta[0], this.column + delta[1]);
};

hex.prototype.toString = function() {
    return this.row + ', ' + this.column;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
