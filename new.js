const body = document.querySelector('body')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function renderCanvas () {
  canvas.height = '500'
  canvas.width = '1000'
  canvas.id = 'canvas'
  body.innerHTML = ''
  body.append(canvas)
}

function play () {
  renderCanvas()
}
