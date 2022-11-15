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
    if(x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h)
        return true;
    return false;
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
        this.snake = new Snake({
            ctx:this.ctx, 
            x:getRandomInt(50, 10), 
            y:getRandomInt(50, 10),
            cellWidth:blockSize,
            cellHeight:blockSize
        });
        if(snake != undefined){
            this.snake = snake
        }
        this.map = new Map({
            name:"Border",
            ctx:this.ctx, 
            border:false,
            cellWidth:blockSize,
            cellHeight:blockSize,
        });
        if (map != undefined){
            this.map = map
        }
        this.food = new Food(this.ctx, getRandomInt(1, this.width/10 -1), getRandomInt(1, this.height/10 -1), 10, 10, "#D70040");
        this.map.render();
        this.food.render();
    }
    tick(){
        if(this.gameRunning){
            var snake  = this.snake;
            var map = this.map;
            var food = this.food;
            var snakeHead = snake.getHead();
            // this will check if the snake had eaten an apple
            if (snakeHead.x == food.x && snakeHead.y == food.y){
                this.addScore();
                snake.move(false);
                this.food = new Food(this.ctx, getRandomInt(1, this.width/10 -1), getRandomInt(1, this.height/10 -1), 10, 10, "#D70040");
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
        if(map.border && (snakeHead.x == 0 || snakeHead.x == this.width || snakeHead.y == 0 || snakeHead.y == this.height)){
            console.log("I'm blind")
            return true;
        }else if (!map.border && (snakeHead.x < 0 || snakeHead.x > parseInt(this.width/snake.cellWidth) || snakeHead.y < 0 || snakeHead.y > parseInt(this.height/snake.cellHeight))){
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
    end(){
        this.gameRunning = false;
    }
    reset(){
        this.map.render();
        this.gameRunning = false;
        this.snake = new Snake({
            ctx:this.ctx, 
            x:getRandomInt(50, 10), 
            y:getRandomInt(50, 10)
        });
        this.food = new Food(this.ctx, getRandomInt(1, this.width/10 -1), getRandomInt(1, this.height/10 -1), 10, 10, "#D70040");
    }

}