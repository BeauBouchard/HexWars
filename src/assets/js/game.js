/* 
 *  game.js
 *  Houses game logic for HexWars
 */

var game = function () {
	this.gamewindow = document.getElementById("game");
		this.canvas 		= document.createElement("canvas");
		this.context 		= this.canvas.getContext("2d");
		this.canvas.width 	= 512;
		this.canvas.height	= 256;
				this.gamewindow.appendChild(this.canvas);
}

