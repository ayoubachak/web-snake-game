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
}
document.getElementById("start-button").addEventListener("click", function(){
    if(!game.gameRunning){
        let level = document.getElementById("level-select").value
        switch (level) {
            case "level1":
                game = new Game({ctx:context, tick:gameTick, blockSize:blockSize});
                break;
            case "level2":
                game = new Game({
                    ctx:context, 
                    tick:gameTick,
                    blockSize:blockSize,
                    map:new Map({
                        name:"Border",
                        ctx:context, 
                        border:true,
                        cellHeight:blockSize,
                        cellWidth:blockSize
                    })
                });
                break;
            case "level3":
                game= new Game({
                    ctx:context, 
                    tick:gameTick,
                    blockSize:blockSize,
                    map:Maps[0]
                })
            default:
                break;
        }
        game.start();
    }
})
document.getElementById("stop-button").addEventListener("click", function(){
    game.end();
})
document.getElementById("reset-button").addEventListener("click", function(){
    game.reset();
})
document.getElementById("level-select").addEventListener("click", function(){
    // still no idea what to put here
})

var rectangles1 = [
    {
        x:3,
        y:3,
        w:10,
        h:1
    },
    {
        x:15,
        y:3,
        w:1,
        h:10
    }
];

var Maps =[
    new Map({
        ctx:context,
        name:"Test",
        rectangles:rectangles1,
        border:true,
        cellHeight:blockSize,
        cellWidth:blockSize
    })
]

var highScore = 0;
var blockSize = 20;
var gameTick = 100;
var direct = "";
var game = new Game({
    ctx:context, 
    tick:gameTick,
    blockSize:blockSize
});
console.log(game)