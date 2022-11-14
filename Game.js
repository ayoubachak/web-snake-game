import { Map } from "./Map.js";
import { Snake } from "./Snake.js";
import {Food } from "./Food.js";
import { SnakeCell } from "./SnakeCell.js";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

export class Game{
    constructor(args){
        let { ctx, tick, map, snake } = args;
        this.time = 0;
        this.gameTick = tick?tick:100; // milliseconds
        this.score = 0;
        this.gameRunning = false;
        this.ctx = ctx;
        this.width = 800;
        this.height = 600;
        this.snake = snake?snake:new Snake({
            ctx:this.ctx, 
            x:getRandomInt(50, 10), 
            y:getRandomInt(50, 10)
        });
        this.map = map?map:new Map({
            name:"Border",
            ctx:this.ctx, 
            border:true
        })
        this.food = new Food(this.ctx, getRandomInt(1, this.width/10 -1), getRandomInt(1, this.height/10 -1), 10, 10, "#D70040");
        this.map.render();
        this.food.render();
    }
    tick(){
        if(this.gameRunning){
            var snake  = this.snake;
            var map = this.map;
            var food = this.food;
            if (snake.getHead().x == food.x && snake.getHead().y == food.y){
                snake.move(false);
                this.food = new Food(this.ctx, getRandomInt(1, this.width/10 -1), getRandomInt(1, this.height/10 -1), 10, 10, "#D70040");
            }else{
                snake.move(true);
            }

            // rendering the game
            this.render();
            var that = this;
            setTimeout(function(){
                let now = Date.now();
                that.tick()
                console.log(Date.now() - now);
            }, this.gameTick);
        }
    }
    render(){
        this.map.render();
        this.food.render();
        this.snake.render();
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
    start(){
        this.gameRunning = true;
        // this.timer();
        this.tick();
    }
    end(){
        this.gameRunning = false;
    }
}