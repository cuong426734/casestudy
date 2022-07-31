const canvas = document.getElementById("canvas")
const game_width = 600
const UNIT = 20
const SNAKE_COLOR ='white'
canvas.width = canvas.height = game_width
const ctx = canvas.getContext('2d')
const BACKGROUND_COLOR  = 'black'
ctx.fillStyle = BACKGROUND_COLOR
ctx.fillRect(0, 0, game_width, game_width)
const game_delay = 100

const left= 37
const up = 38
const right = 39
const down = 40



class Vector2d{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

let currenDirection = new Vector2d(-1, 0)


class Snake {
    constructor() {
        this.body = [
            new Vector2d(UNIT * 6, UNIT * 3),
            new Vector2d(UNIT * 7, UNIT * 3),
            new Vector2d(UNIT * 8, UNIT * 3),
        ]
        this.head = this.body[0]
        this.speed = new Vector2d(-1, 0)
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT)
        ctx.fillStyle = SNAKE_COLOR
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
        }
    }

    clear() {
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT)
        ctx.fillStyle = BACKGROUND_COLOR
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
        }
    }

    handleBound(){
        if(this.head.x <0){
            this.head.x = game_width -UNIT
        }
        if(this.head.x > game_width -UNIT){
          this.head.x = 0
        }

        if(this.head.y <0){
            this.head.y = game_width -UNIT
        }
        if(this.head.y > game_width -UNIT){
            this.head.y = 0
        }
    }

    move(){
        this.clear()
        for (let i = this.body.length -1; i>=1 ; i--) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }

        this.body[0].x += this.speed.x * UNIT
        this.body[0].y += this.speed.y * UNIT
        this.handleBound()

        this.draw()
    }

    checkEat(food){
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }

    grow(){
        this.clear()
        let snakeLength = this.body.length
        let mountX = this.body[snakeLength -1].x - this.body[snakeLength - 2].x
        let mountY = this.body[snakeLength -1].y - this.body[snakeLength - 2].y

        let newPart = new Vector2d(
            this.body[snakeLength - 1].x + mountX,
            this.body[snakeLength - 1].y + mountY,
        )
        this.body.push(newPart)
        this.draw()

    }
}

class Food{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }

    clear(){
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }

    getRandomNumber(){
        let randomNumber = Math.floor(Math.random() * game_width)
        randomNumber -= randomNumber % UNIT
        return randomNumber
    }
    spawn (){
        this.clear()
        this.x = this.getRandomNumber()
        this.y = this.getRandomNumber()
        this.draw()
    }
}

let player = new Snake()
player.draw()
let food = new Food()
food.spawn()

setInterval(() => {
    player.move()
    if (player.checkEat(food)){
        food.spawn()
    }
},game_delay);

document.onkeydown = function(e){
    switch(e.keyCode){
        case left:
            if(currenDirection.x === 1) break
            player.speed = new Vector2d(-1, 0)
            currenDirection = new Vector2d(-1, 0)
            break;
        case right:
            if(currenDirection.x === -1) break
            player.speed = new Vector2d(1, 0)
            currenDirection = new Vector2d(1, 0)
            break;
        case up:
            if(currenDirection.y === 1) break
            player.speed = new Vector2d(0, -1)
            currenDirection = new Vector2d(0, -1)
            break;
        case down:
            if(currenDirection.y === -1) break
            player.speed = new Vector2d(0, 1)
            currenDirection = new Vector2d(0, 1)
            break;

        default:
            break;
    }
}