const body = document.querySelector('body')

const canvas = document.createElement('canvas')
canvas.height = '500'
canvas.width = '1000'
canvas.id = 'canvas'
const ctx = canvas.getContext('2d')

const gameState = {
  leftScore: 0,
  rightScore: 0
}

// RENDER PAGE

function renderCanvas () {
  body.innerHTML = ''
  body.append(canvas)
}

function createScore () {
  scoreEl = document.createElement('div')
  scoreEl.id = 'score'
  scoreEl.innerText = '0 - 0'
}

function createPlayerCard (arguments) {
  // body...
}

function renderPlayerBar () {
  playerBarEl = document.createElement('div')
}

// OBJECTS

class Ball {
  constructor () {
    this.x = canvas.width/2
    this.y = canvas.height/2
    this.radius = 10
    this.dx = 2
    this.dy = -2
  }

  move () {
    ball.x += ball.dx
    ball.y += ball.dy
  }
}

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

ball = new Ball
leftPaddle = new Paddle (20, canvas.height/2 - 50)
rightPaddle = new Paddle (canvas.width - 40, canvas.height/2 - 50)

// CONTROLS

function movePaddle(paddle){
  if (paddle.upPressed && paddle.y > 0){
    paddle.moveUp()
  } else if (paddle.downPressed && paddle.y < canvas.height - paddle.height) {
    paddle.moveDown()
  }
}

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

// COLLISION DETECTION

function checkWallCollision () {
  if (ball.y + ball.dy < ball.radius || ball.y + ball.dy > canvas.height - ball.radius) {
    ball.dy = -ball.dy
  }
  if (ball.x + ball.dx < ball.radius) {
    gameState.leftScore ++
    if (win()) {
      endGame()
    } else {
      ballReset()
    }
  } else if (ball.x + ball.dx > canvas.width - ball.radius) {
    gameState.rightScore ++
    if (win()) {
      endGame()
    } else {
      ballReset()
    }
  }
}

function checkRightPaddleCollision(){
if (ball.x === rightPaddle.x - ball.radius &&
  ball.y > rightPaddle.y &&
  ball.y < rightPaddle.y + rightPaddle.height){
    ball.dx = -ball.dx
  }
}

function checkLeftPaddleCollision(){
if (ball.x === leftPaddle.x + leftPaddle.width + ball.radius &&
  ball.y > leftPaddle.y &&
  ball.y < leftPaddle.y + leftPaddle.height){
    ball.dx = -ball.dx
  }
}

// END GAME

function win () {
  return gameState.leftScore == 5 || gameState.rightScore == 5
}

function endGame () {
  clearInterval(play)
  clearInterval(moveBall)
}

// DRAW

function drawBall () {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.closePath()
}

function ballReset() {
  ball.x = canvas.width/2,
  ball.y = canvas.height/2
  clearInterval(moveBall)
  draw()
  setTimeout(startBall, 1000)
}

function drawPaddle (paddle) {
  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.fillRect(paddle.x, paddle.y, 20, 100)
  ctx.closePath()
  movePaddle(paddle)
}

function drawPaddles (...paddles) {
  paddles.forEach(drawPaddle)
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPaddles(leftPaddle, rightPaddle)
  drawBall()
  checkWallCollision()
  checkLeftPaddleCollision()
  checkRightPaddleCollision()
}

// INITIATE GAME

function startBall() {
  moveBall = setInterval(ball.move, 10)
}

function init () {
  play = setInterval(draw, 10)
  startBall()
}

function setupGame () {
  renderCanvas()
  draw()
  init()
}
