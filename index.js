const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let play
let ballMove

const gameState = {
  leftScore: 0,
  rightScore: 0
}

const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  dx: 2,
  dy: -2,
  move: () => {
    ball.x += ball.dx
    ball.y += ball.dy
  }
}

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

function win () {
  return gameState.leftScore == 5 || gameState.rightScore == 5
}

function endGame () {
  clearInterval(play)
  clearInterval(ballMove)
}

function drawPaddle (paddle) {
  ctx.beginPath()
  ctx.fillStyle = 'white'
  ctx.fillRect(paddle.x, paddle.y, 20, 100)
  ctx.closePath()
  movePaddle(paddle)
}

function drawBall () {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.closePath()
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPaddle(leftPaddle)
  drawPaddle(rightPaddle)
  drawBall()
  checkWallCollision()
  checkRightPaddleCollision()
  checkLeftPaddleCollision()
}

function ballReset () {
  ball.x = canvas.width/2,
  ball.y = canvas.height/2
  clearInterval(ballMove)
  draw()
  setTimeout(startBall, 1000)
}

function startBall() {
  ballMove = setInterval(ball.move, 10)
}

function startPlay () {
  play = setInterval(draw, 10)
  startBall()
}

startPlay()
