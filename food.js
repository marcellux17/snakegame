function createFood(snake, board, snakeSize){
    let x = (Math.floor(Math.random()*(board.width/snakeSize-2))+1)*snakeSize;
    let y = (Math.floor(Math.random()*(board.height/snakeSize-2))+1)*snakeSize;
    while(snake.some(cell => cell.x === x && cell.y === y )){
        x = (Math.floor(Math.random()*(board.width/snakeSize-2))+1)*snakeSize;
        y = (Math.floor(Math.random()*(board.height/snakeSize-2))+1)*snakeSize;
    }
    return [x, y];
}
function showFood(ctx, food, snakeSize){
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize)
}
class SnakeCell{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const gulpSound = new Audio('gulp.mp3');
function expandSnake(directionOfLast, snake, snakeSize, direction){
    let lastSnakeCell = snake[snake.length - 1];
    switch (directionOfLast || direction) {
        case 'down':
            snake.push(new SnakeCell(lastSnakeCell.x, lastSnakeCell.y - snakeSize))
            break;
        case 'up':
            snake.push(new SnakeCell(lastSnakeCell.x, lastSnakeCell.y + snakeSize))
            break;
        case 'right':
            snake.push(new SnakeCell(lastSnakeCell.x - snakeSize, lastSnakeCell.y))
            break;
        case 'left':
            snake.push(new SnakeCell(lastSnakeCell.x + snakeSize, lastSnakeCell.y - snakeSize))
            break;
    }
}
function checkFood(snake, food, canvas, snakeSize, directionOfLast, pointsDOM, {score}, direction){
    if(snake[0].x === food.x && snake[0].y === food.y){
        gulpSound.play();
        let [x, y] = createFood(snake, canvas, snakeSize);
        food.x = x;
        food.y = y;
        expandSnake(directionOfLast, snake, snakeSize, direction)
        score[0]++;
        pointsDOM.textContent = score;
    }
}
export {createFood ,showFood, checkFood, expandSnake};
