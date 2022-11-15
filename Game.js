import { Map } from "./Map.js";
import { Snake } from "./Snake.js";
import {Food } from "./Food.js";
import { SnakeCell } from "./SnakeCell.js";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

// the point will be given like  {x: 0, y: 0}
// the rect will be given like {x:0, y:0, w:1, h:1}
function checkColision(point, rect){
    let {x, y} = point;
    if(x >= rect.x && y >= rect.y && x <= rect.x + rect.w-1 && y <= rect.y + rect.h-1)
        return true;
    return false;
}
function getFoodCleanCoords(game){
    let snake = game.snake;
    let map = game.map;
    let coords = {
        x:getRandomInt(1, game.width / game.blockSize-1),
        y:getRandomInt(1, game.height / game.blockSize-1)
    }
    // check if they colide with the snake
    let snakeBody = snake.body;
    for (let i = 0; i <snakeBody.length; i++){
        let snakeCell =snakeBody[i];
        if(coords.x == snakeCell.x && coords.y == snakeCell.y){
            console.log("I'm blind")
            return getFoodCleanCoords(game);
        }
    }

    // check if they colide with the map
    let colision = false;
    for (var i = 0; i <map.rectangles.length; i++){
        let rect = map.rectangles[i];
        colision = checkColision(
            {x:coords.x, y:coords.y},
            rect
            )
        if (colision){
            return getFoodCleanCoords(game);
        }
    }
    // no need to check the border because we already generate a random number from 1
    return coords;
}
function getSnakeCleanCoords(game) {
    let map = game.map;
    let coords = {
        x:getRandomInt(1, game.width / game.blockSize-1),
        y:getRandomInt(1, game.height / game.blockSize-1)
    }

    // check if they colide with the map
    let colision = false;
    for (var i = 0; i <map.rectangles.length; i++){
        let rect = map.rectangles[i];
        colision = checkColision(
            {x:coords.x, y:coords.y},
            rect
            )
        if (colision){
            return getSnakeCleanCoords(game);
        }
    }
    return coords;
}

export class Game{
    constructor(args){
        let { ctx, tick, map, snake, blockSize } = args;
        this.time = 0;
        this.gameTick = tick?tick:100; // milliseconds
        this.score = 0;
        this.resetScore();
        this.gameRunning = false;
        this.ctx = ctx;
        this.width = 800;
        this.height = 600;
        this.blockSize = blockSize;
        this.map = new Map({
            name:"Border",
            ctx:this.ctx, 
            border:false,
            cellWidth:blockSize,
            cellHeight:blockSize,
        });
        if (map != undefined){
            this.map = map
            console.log("setting the map")
        }
        let snakeCoords = getSnakeCleanCoords(this);
        this.snake = new Snake({
            ctx:this.ctx, 
            x:snakeCoords.x, 
            y:snakeCoords.y,
            cellWidth:blockSize,
            cellHeight:blockSize
        });
        if(snake != undefined){
            this.snake = snake
        }
        let foodCoords = getFoodCleanCoords(this)
        this.food = new Food(this.ctx, foodCoords.x, foodCoords.y, this.blockSize, this.blockSize, "#D70040");
        this.map.render();
        this.food.render();
        this.resetMap = this.map;
    }
    tick(){
        console.log(this.snake.getHead().x, this.snake.getHead().y)
        if(this.gameRunning){
            var snake  = this.snake;
            var map = this.map;
            var food = this.food;
            var snakeHead = snake.getHead();
            // this will check if the snake had eaten an apple
            if (snakeHead.x == food.x && snakeHead.y == food.y){
                this.addScore();
                snake.move(false);
                let foodCoords = getFoodCleanCoords(this)
                this.food = new Food(this.ctx, foodCoords.x, foodCoords.y, this.blockSize, this.blockSize, "#D70040");
            }else if(this.snakeHeadCrashed()){ // check if the snake head crashed 
                this.gameRunning = false;
            }else{
                snake.move(true);
            }

            // rendering the game
            this.render();
            var that = this;
            let handler = function(){
                that.tick()
            }
            let timout = setTimeout(handler, this.gameTick);
        }
    }
    render(){
        this.map.render();
        this.food.render();
        this.snake.render();
    }
    snakeHeadCrashed(){
        let snake = this.snake;
        let map = this.map;
        let snakeHead = snake.getHead();
        if(map.border && (snakeHead.x == 0 || snakeHead.x == this.width/snake.cellWidth-1 || snakeHead.y == 0 || snakeHead.y == this.height/snake.cellHeight-1)){
            console.log("I'm blind")
            return true;
        }else if (!map.border && (snakeHead.x < 0 || snakeHead.x > parseInt(this.width/snake.cellWidth) || snakeHead.y < 0 || snakeHead.y > parseInt(this.height/snake.cellHeight) )){
            if(snakeHead.x < 0){
                snakeHead.x = parseInt(this.width/snake.cellWidth);
            }if(snakeHead.x > parseInt(this.width/snake.cellWidth)){
                snakeHead.x = 0;
            }if(snakeHead.y > parseInt(this.height/snake.cellHeight)){
                snakeHead.y = 0;
            }if(snakeHead.y < 0){
                snakeHead.y = parseInt(this.height/snake.cellHeight);
            }

        }
        // here we should check if the snake hit any on one of the game's rectangles
        let colision = false;
        for (var i = 0; i <map.rectangles.length; i++){
            let rect = map.rectangles[i];
            colision = checkColision(
                {x:snakeHead.x, y:snakeHead.y},
                rect
                )
            if (colision){
                return true;
            }
        }
        // check if the snake hit it self
        let snakeBody = snake.body;
        for (let i = 1; i <snakeBody.length; i++){
            let snakeCell =snakeBody[i];
            if(snakeHead.x == snakeCell.x && snakeHead.y == snakeCell.y){
                console.log("I'm blind")
                return true;
            }
        }
        return false;
    }

    timer(){
        var that = this;
        if(this.gameRunning){
            this.time+=1;
            document.getElementById("time").innerHTML = this.time;
            setTimeout(function(){
                that.timer();
            }, 1000);
        }
    }
    addScore(){
        this.score = parseInt(document.getElementById("score").innerHTML);
        this.score+=1;
        document.getElementById("score").innerHTML = this.score;
        let high_score = parseInt(document.getElementById("high-score").innerHTML);
        if (this.score > high_score){
            high_score = this.score;
        }
        document.getElementById("high-score").innerHTML = high_score;
        this.score +=1;
    }
    resetScore(){
        this.score = 0;
        document.getElementById("score").innerHTML = this.score;
    }
    start(){
        this.gameRunning = true;
        this.timer();
        this.tick();
    }
    stop(){
        this.gameRunning = false;
    }
    resume(){
        this.gameRunning = true;
        this.timer();
        this.tick();
    }
    reset(){
        this.map = this.resetMap;
        this.map.render();
        this.gameRunning = false;
        this.snake = new Snake({
            ctx:this.ctx, 
            x:getRandomInt(1, this.width/this.blockSize -1), 
            y:getRandomInt(1, this.height/this.blockSize -1),
            cellWidth:this.blockSize,
            cellHeight:this.blockSize
        });
        this.food = new Food(this.ctx, getRandomInt(1, this.width/this.blockSize -1), getRandomInt(1, this.height/this.blockSize -1), this.blockSize, this.blockSize, "#D70040");
    }

}