/* 
 *  game.js
 *  Houses game logic for HexWars
 */



function GAME() {
	this.gamestate = 0; 
	this.map;
	this.players = [];
}
GAME.prototype = {
    initialize: function() {
    	console.log("Initializing Game");
    	this.map = new MAP();
        this.hud = new HUD();
    	this.map.initialize();
        this.hud.initialize();
    },
    start: function() {
    	console.log("Starting Game");
    	this.setupPlayers(2);
    },
    getGameState: function() {
    	return this.gamestate;
    },
    restart: function() {

    },
    setupPlayers: function (numPlayers) {
    	console.log("Setting up game with "+numPlayers+" Players");
    	for(var i = 1; i <= numPlayers; i++){
    		var player = new PLAYER(i);
    		this.players.push(player);
    	}
    	this.setPlayerColor();
    },
    setPlayerColor: function() {
    	//console.log(this.players.pop().getColor());
    	//this.map.setTileColor(1,1,this.players[0].getColor());
        //this.map.setTileFill(1,1,"#000032");
        //this.map.setTileStroke(1,1,"#3333CC");

    }
}

function PLAYER(playernum) {
	this.number = playernum;
	this.team = new TEAM(this.number);
}

PLAYER.prototype = {
    initialize: function() {

    },
    getColor: function() {
    	return this.team.getColor();
    }
}

function GROUP(){

}

GROUP.prototype = {
	initialize: function() {

	}
}

function TEAM( id ){
	this.id = id;
	this.colorchart = ["#FF0000","#00FF00","#0000FF"];
	this.color = this.colorchart[this.id];
	console.log("the team color: " + this.color);
}

TEAM.prototype = {
	initialize: function() {

	},
	getColor: function() {
		return this.color;
	}
}

function HUD (){
    this.width = 300;
    this.height = 200;
}

HUD.prototype = {
    initialize: function() {

    }
}








