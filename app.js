import { Snake } from "./Snake.js";
import { Map } from "./Map.js";
import { Level } from "./Level.js";
import {Game } from "./Game.js";


var canvas = document.getElementById('thegame'),
context = canvas.getContext('2d');
// command listener
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    console.log(key);
    if( (key == 37 || key == 65) && direct != "RIGHT"){
        direct = "LEFT";
    }else if( ( key == 38 || key == 87) && direct != "DOWN"){
        direct = "UP";
    }else if( (key == 39 || key == 68) && direct != "LEFT"){
        direct = "RIGHT";
    }else if( ( key == 40 || key == 83) && direct != "UP"){
        direct = "DOWN";
    }
    game.snake.direct = direct;
    console.log(direct);
}
document.getElementById("start-button").addEventListener("click", function(){
    game.start();
})
document.getElementById("stop-button").addEventListener("click", function(){
    game.end();
})
document.getElementById("stop-button").addEventListener("click", function(){
    game.end();
})


var highScore = 0;
var direct = "";
var game = new Game({ctx:context, tick:10});
console.log(game)