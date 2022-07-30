const canvas = document.getElementById("canvas")
const game_width = 600
const UNIT = 20
const SNAKE_COLOR ='white'
canvas.width = canvas.height = game_width
const ctx = canvas.getContext('2d')
const BACKGROUND_COLOR  = 'black'
ctx.fillStyle = BACKGROUND_COLOR
ctx.fillRect(0, 0, game_width, game_width)

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
class Snake {
    constructor() {
        this.body = [
            new Vector2d(UNIT * 6, UNIT * 3),
            new Vector2d(UNIT * 7, UNIT * 3),
            new Vector2d(UNIT * 8, UNIT * 3),
        ]
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
    move(){
        this.clear()
        for (let i = this.body.length -1; i>=1 ; i--) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }

        this.body[0].x += this.speed.x * UNIT
        this.body[0].y += this.speed.y * UNIT

        this.draw()
    }
}

let player = new Snake()
player.draw()

setInterval(() => {
    player.move()
},200);

document.onkeydown = function(e){
    switch(e.keyCode){
        case left:
            player.speed = new Vector2d(-1, 0)
            break;
        case right:
            player.speed = new Vector2d(1, 0)
            break;
        case up:
            player.speed = new Vector2d(0, -1)
            break;
        case down:
            player.speed = new Vector2d(0, 1)
            break;

        default:
            break;
    }
}


