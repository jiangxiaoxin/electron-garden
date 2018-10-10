const stage = document.getElementById("heart")
const context = stage.getContext("2d")

function Point(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}
const rect = stage.getBoundingClientRect()
console.log(rect);

const size = new Point(stage.clientWidth, stage.clientHeight)
const center = new Point(size.x / 2, size.y / 2)

const scale = 2
const points = []
const count = 50
for (let index = 0; index < count; index++) {
  let angle = index * Math.PI * 2 / count
  let x = 16 * Math.pow(Math.sin(angle), 3)
  let y =  13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)
  let p = new Point(x * scale, y * scale)
  points.push(p)
}

context.beginPath()
context.fillStyle = "red"
let p = points[0]
context.translate(center.x, center.y)
context.rotate(Math.PI)
context.moveTo(p.x, p.y)
for (let index = 1; index < points.length; index++) {
  p = points[index]
  context.lineTo(p.x, p.y)
}
context.fill()
