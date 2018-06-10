setTimeout(() => {
let edgeLeft = 0, edgeRight = window.innerWidth, edgeTop = 0, edgeBottom = window.innerHeight;
const canvas = document.querySelector('canvas');
canvas.width = edgeRight, canvas.height = edgeBottom;

const c = canvas.getContext('2d');
console.log('canvas connected!');

const init = () => {
  const randV = () => {
    let v = Math.random() * 10 + 5;
    return Math.random() > 0.5 ? v : -v;
  }
  const randX = () => Math.random() * canvas.width;
  const randY = () => Math.random() * 200 - 400;
  const randS = () => Math.random() * 50 + 60;
  const foodMaker = foods => foods.map(food => new Food(`${food}`, `assets/food_icons/${food}.png`, randS(), randX(), randY(), randV(), randV()));
  const foodItems = foodMaker(['bacon', 'pizza', 'hamburger', 'hotdog', 'taco', 'mushroom', 'milkshake', 'toast', 'cookie', 'ketchup', 'radish', 'donut', 'onigiri', 'soda', 'scallion', 'cupcake', 'croissant']);
  setInterval(() => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    foodItems.forEach(item => item.draw());
  }, 20);
}

const drawImageRot = (img, x, y, width, height, deg) => {
  var rad = deg * Math.PI / 180;
  c.translate(x + width/2, y + height/2);
  c.rotate(rad);
  c.drawImage(img, -width/2, -height/2, width, height);
  c.rotate(-rad);
  c.translate(-(x + width/2), -(y + height/2));
}

let dampeningX = .9, dampeningY = .85, shrinkage = .9;

function Food(name, imgSrc, size, x, y, dx, dy) {
  this.name = name;
  this.image = new Image();
  this.image.src = imgSrc;
  this.width = size;
  this.height = size;
  this.dx = dx;
  this.dy = dy;
  this.x = x;
  this.y = y;
  this.gravity = 1;
  this.deg = Math.random() * 360;
  this.torque = .05;
  this.image.onload = () => this.draw();
  this.draw = (deg = 0) => {
    if (this.height < 30) return;
    drawImageRot(this.image, this.x, this.y, this.width, this.height, this.deg);
    this.dy += this.gravity;
    if (this.y + this.height > canvas.height) {
      this.dy = -this.dy * dampeningY;
      this.height *= shrinkage;
      this.width *= shrinkage;
    }
    if (this.x + this.width > canvas.width || this.x < 0) {
      this.dx = -this.dx * dampeningX;
      this.height *= shrinkage;
      this.width *= shrinkage;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.torque = this.torque > 0.5 ? this.torque: this.torque + 0.1;
    this.deg += this.torque;
  }
}
  init(); // window.init = init;  // don't export init yet; issues with refiring animation
}, 3000);