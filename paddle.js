class Paddle {
  constructor (x, y){
    this.x = x
    this.y = y
    this.width = 20
    this.height = 100
    this.downPressed = false
    this.upPressed = false
  }

  moveUp () {
    this.y -= 7
  }

  moveDown () {
    this.y += 7
  }
}

const leftPaddle = new Paddle(20, 40)
leftPaddle.collision = leftPaddle.y+leftPaddle.width

const rightPaddle = new Paddle (canvas.width - 40, canvas.height/2 - 50)
rightPaddle.collision = rightPaddle.x

function checkRightPaddleCollision(){
if (ball.x === rightPaddle.x - ball.radius &&
  ball.y > rightPaddle.y &&
  ball.y < rightPaddle.y + rightPaddle.height){
    ball.dx = -ball.dx
  }
}

function checkLeftPaddleCollision(){
if (ball.x === leftPaddle.y + leftPaddle.width - ball.radius &&
  ball.y > leftPaddle.y &&
  ball.y < leftPaddle.y + leftPaddle.height){
    ball.dx = -ball.dx
  }
}

function movePaddle(paddle){
  if (paddle.upPressed && paddle.y > 0){
    paddle.moveUp()
  } else if (paddle.downPressed && paddle.y < canvas.height - paddle.height) {
    paddle.moveDown()
  }
}

// event listeners
document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e){
  if (e.key == "ArrowUp"){
    rightPaddle.upPressed = true
  } else if (e.key == "ArrowDown"){
    rightPaddle.downPressed = true
  } else if (e.key == "w"){
    leftPaddle.upPressed = true
  } else if (e.key == "s"){
    leftPaddle.downPressed = true
  }
}

function keyUpHandler(e){
  if (e.key == "ArrowUp"){
    rightPaddle.upPressed = false
  } else if (e.key == "ArrowDown"){
    rightPaddle.downPressed = false
  } else if (e.key == "w"){
    leftPaddle.upPressed = false
  } else if (e.key == "s"){
    leftPaddle.downPressed = false
  }
}
