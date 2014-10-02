/* 
 *  game.js
 *  Houses game logic for HexWars
 */



function GAME() {
    this.map;
	this.gamestate   = 0; 
	this.players     = [];
    this.mapheight   = 600;
    this.mapwidth    = 600;
    this.regionCount = 20;
    this.tilesize = Math.sqrt((this.mapwidth^2)+(this.mapheight^2))/(this.regionCount/5)
    this.playerCount = 2;
}

GAME.prototype = {
    initialize: function() {
    	console.log("Initializing Game");
    	this.map = new MAP(this.mapwidth,this.mapheight,this.tilesize,this.regionCount);
    	this.map.generate();
        //this.map.initCircle();
    },
    start: function() {
    	console.log("Starting Game");
    	this.setupPlayers(this.playerCount);
    },
    restart: function() {

    },
    setupPlayers: function (numPlayers) {
    	console.log("Setting up game with "+numPlayers+" Players");
    	for(var i = 1; i <= numPlayers; i++){
    		var player = new PLAYER(i);
    		this.players.push(player);
    	}
    }
}

function PLAYER(playernum) {
	this.id = playernum;
    this.colorchart = ['#f5f5f5', '#ffffff', '#dff0d8', '#d9edf7', '#fcf8e3', '#f2dede'];
    this.color = this.colorchart[this.id];
    console.log("Player" + this.id + "'s color is "+this.color );
}

PLAYER.prototype = {
    initialize: function() {

    },
    getColor: function() {
    	return this.getColor();
    }
}
