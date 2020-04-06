let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []
let direction = "right"

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let snakeX = snake[0].x
let snakeY = snake[0].y

function criarItem(){
    x = Math.floor(Math.random() * 15 + 1) * box
    y = Math.floor(Math.random() * 15 + 1) * box
    return [x, y]
}
let item = {x: criarItem()[0],
            y: criarItem()[1]}

function criarBG(){
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function cobrinha(){
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function comida(){
    context.fillStyle = "red"
    context.fillRect(item.x, item.y, box, box)

    if(snakeX != item.x || snakeY != item.y){
        snake.pop()
    }
    else{
        item.x = criarItem()[0]
        item.y = criarItem()[1]
    }
}

function moverCobrinha(){
    document.addEventListener("keydown", update)

    function update(event){
            if (event.code == "ArrowLeft" && direction != "right") direction = "left"
            if (event.code == "ArrowUp" && direction != "down") direction = "up"
            if (event.code == "ArrowRight" && direction != "left") direction = "right"
            if (event.code == "ArrowDown" && direction != "up") direction = "down"
    }

    switch (direction){
        case "right": snakeX += box; break
        case "left": snakeX -= box; break
        case "up": snakeY -= box; break
        case "down": snakeY += box; break
    }    
    
    if(snakeX > 15 * box || snakeX * box < 0){
        if (direction == "right") snakeX = 0
        if (direction == "left") snakeX = 16 * box
    }
    if(snakeY > 15 * box || snakeY * box < 0){
        if (direction == "down") snakeY = 0
        if (direction == "up") snakeY = 16 * box
    }

    let head = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(head)
    
}

function fimDeJogo(){
    for(i = 1; i < snake.length; i++){
        if(snakeX == snake[i].x && snakeY == snake[i].y){
            clearInterval(jogo)
            alert("Fim de Jogo :C")
        }
    }
}

function iniciarJogo(){
    criarBG()
    cobrinha()
    moverCobrinha()
    comida()
    fimDeJogo()

}

let jogo = setInterval(iniciarJogo, 100)