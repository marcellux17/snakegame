import {checkFood, showFood, createFood} from './food.js';
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const restart = document.querySelector('#restart');
const gameoverDOM = document.querySelector('#gameover');
const points = document.querySelector('#score')

let direction;
//control speed
const fps = 13.5;
//pixels
let directionOfLast;
let score = [1];
points.textContent = score;
const snakeSize = 20;
const snake = [
    {x: 60, y: 40}
];
let snakeCopy = clone(snake);
let [x, y] = createFood(snake, canvas, snakeSize);
const food = { x, y };
showFood(ctx, food, snakeSize);
function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function checkWalls(){
    if(snake[0].x < 0 ||
        snake[0].x + snakeSize > canvas.width ||
        snake[0].y + snakeSize > canvas.height ||
        snake[0].y < 0
    ) return true;
}
function determineDirection(){
    if(snake[snake.length-2].x - snake[snake.length-1].x < 0)return 'left';
    if(snake[snake.length-2].x - snake[snake.length-1].x > 0)return 'right';
    if(snake[snake.length-2].y - snake[snake.length-1].y < 0)return 'up';
    return 'down';
}
function gameOver(){
    gameoverDOM.classList.add('shown');
}
function clone(object){
    return JSON.parse(JSON.stringify(object));
}
function checkHead(){
    return snake.some((cell, i) => {
        if(i !== 0 && cell.x === snake[0].x && snake[0].y === cell.y)return true
    })
}
function main(){
    setTimeout(() => {
        clear();
        update();
        moveSnake();
        showFood(ctx, food, snakeSize);
        checkFood(snake, food, canvas, snakeSize, directionOfLast, points, {score}, direction);
        if(!checkWalls() && !checkHead()){
            requestAnimationFrame(main)
        }else{
            gameOver();
        }
    }, 1000/fps)
}
function moveSnake(){
    ctx.fillStyle = 'rgb(0, 174, 0)';
    for(let i = 0; i < snake.length; i++){
        if(i !== 0){
            snake[i].x = snakeCopy[i-1].x;
            snake[i].y = snakeCopy[i-1].y;
            ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize)
        }else{
            ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize)
        }
    }
    snakeCopy = clone(snake);
    if(snake.length > 1){
        directionOfLast = determineDirection()
    }
}
function update(){
    switch(direction){
        case 'up':
            snake[0].y -= snakeSize;
            break;
        case 'down':
            snake[0].y += snakeSize;
            break;
        case 'right':
            snake[0].x += snakeSize;
            break;
        case 'left':
            snake[0].x -= snakeSize;
            break; 
    }
}
function keyDown(e){
    switch(e.key){
        case 'ArrowLeft':
            if(direction !== 'right'){
                direction = 'left';
            }
            break;
        case 'ArrowRight':
            if(direction !== 'left'){
                direction = 'right';
            }
            break;
        case 'ArrowDown':
            if(direction !== 'up'){
                direction = 'down';
            }
            break;
        case 'ArrowUp':
            if(direction !== 'down'){
                direction = 'up';
            }
            break;
        default:
            break;
    }
}
document.addEventListener('keydown', keyDown);
main();

restart.addEventListener('click', e => {
    window.location.reload();
})