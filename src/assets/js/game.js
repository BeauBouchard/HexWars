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
    this.regionCount = 27;
    this.tilesize    = Math.sqrt((this.mapwidth^2)+(this.mapheight^2))/(this.regionCount/5)
    this.playerCount = 5;
 }

GAME.prototype = {
    initialize: function() {
    	console.log("Initializing Game");
    	this.map = new MAP(this.mapwidth,this.mapheight,this.tilesize,this.regionCount);
    	this.map.generate();

        this.setupPlayers(this.playerCount);
        this.map.setupRegions();
        this.setupButtons();
        //this.map.initCircle();
    },
    start: function() {
        console.log("Starting Game");
        this.map.colorRegion();

    },
    restart: function() {

    },
    /*  setupPlayers
     *      Sets up the game with a number of players selected. (4-7 players only)
     *  @param numPlayers int - the incoming total number of players
     */
    setupPlayers: function (numPlayers) {
    	console.log("Setting up game with "+numPlayers+" Players");
    	for(var i = 0; i <= numPlayers; i++){
            this.addPlayer(i+1);
    	}

    },
    /*  addPlayer
     *      Used to create new players, there are only colour codes for players 0-6 (7 total)
     *  @param playerNum int - the incoming player number
     */
    addPlayer: function (playerNum){
        var player = new PLAYER(playerNum);
        this.players.push(player); // adding player to player stack
    },
    setupButtons: function () {
        var start = document.getElementById("Start");
        var end = document.getElementById("End");

        start.onclick = function(){ game.start(); };
        end.onclick = function(){ game.end(); }
    },
    /*  changeTile
     *      
     *  @param numRow int - Number of Row (Y)
     *  @param numCol int - Number of Column (X)
     */
    changeTile: function (numRow, numCol){
        //this.map.tileset[numRow][numCol].setFillStyle("blue");
        this.map.tileset[numRow][numCol].clear();
    },
    getMap: function () {
        return this.map;
    },
    getPlayerCount: function () {
        return this.playerCount;
    },
    getPlayerColor: function (id) {
        return this.players[id].getColor();
    }

}

function PLAYER(playernum) {
	this.id = playernum;

    /*color scheme explained:
     * #86B564   http://www.colourlovers.com/color/86B564/glow_green
     * #00FFAA   http://www.colourlovers.com/color/00FFAA/Hue_160_Degrees
     * #AAFF00   http://www.colourlovers.com/color/AAFF00/Hue_80_Degrees
     * #FFAA00   http://www.colourlovers.com/color/FFAA00/Norad_Orange
     * #FF00AA   http://www.colourlovers.com/color/FF00AA/Hue_320_Degrees
     * #AA00FF   http://www.colourlovers.com/color/AA00FF/Hue_280_Degrees
     * #00AAFF   http://www.colourlovers.com/color/00AAFF/Hue_200_Degrees
     */
    this.colorchart = ['#86B564', '#00FFAA', '#AAFF00', '#FFAA00', '#FF00AA', '#AA00FF', '#00AAFF'];
    this.color      = this.colorchart[this.id];
    console.log("Player" + this.id + "'s color is "+this.color );
}

PLAYER.prototype = {
    initialize: function() {

    },
    getColor: function() {
    	return this.getColor();
    }
}


