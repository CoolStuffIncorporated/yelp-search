let edgeLeft = 0, edgeRight = window.innerWidth, edgeTop = 0, edgeBottom = window.innerHeight;


const canvas = document.querySelector('canvas');
canvas.width = edgeRight;
canvas.height = edgeBottom;

// console.log(window.innerHeight); === TODO: resize canvas whenever window gets resized
// console.log(window.innerWidth);
console.log('canvas connected!');
const c = canvas.getContext('2d');

// let bacon = new Image;
// bacon.onload = () => {
//   c.drawImage(bacon,100,500, 60, 60);
// };
// bacon.src = 'assets/food_icons/bacon.png';

///////////

// class Food {
//   constructor(width, height, imageUrl, x, y) {
//     super();
//     this.width = width;
//     this.height = height;
//     this.image = new Image();
//     this.image.onload = () => c.drawImage(this.image,100,500, 60, 60);
//     this.image.src = imageUrl;
//   }
//   update() {

//   }
// }



function init() {
  const randV = () => {
    let v = Math.random() * 10 + 5;
    return Math.random() > 0.5 ? v : -v;
  }
  const randX = () => Math.random() * canvas.width;
  const randY = () => Math.random() * 200 - 200;
  const foodMaker = foods => {
    return foods.map(food => new Food(`${food}`, `assets/food_icons/${food}.png`, 80, 80, randX(), randY(), randV(), randV()))
  }
  let foodItems = foodMaker(['bacon', 'pizza', 'hamburger', 'hotdog', 'taco', 'mushroom', 'milkshake', 'toast', 'cookie', 'ketchup']);
  setInterval(() => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    foodItems.forEach(item => item.draw())
  }, 20);
}

function drawImageRot(img, x, y, width, height, deg){
  var rad = deg * Math.PI / 180;
  c.translate(x + width / 2, y + height / 2);
  c.rotate(rad);
  c.drawImage(img, -width/2, -height/2, width, height);
  c.rotate(-rad);
  c.translate(-(x + width / 2), -(y + height / 2));
}

let dampening = .9;

function Food(name, imgSrc, width, height, x, y, dx, dy) {
  this.name = name;
  this.image = new Image();
  this.image.src = imgSrc;
  this.width = width;
  this.height = height;
  this.dx = dx;
  this.dy = dy;
  this.x = x;
  this.y = y;
  this.gravity = 1;
  this.deg = Math.random() * 360;
  this.torque = .05;
  this.image.onload = () => this.draw();
  this.draw = function(deg = 0) {
    // c.clearRect(0, 0, canvas.width, canvas.height);
    if (this.height < 30) return;
    drawImageRot(this.image, this.x, this.y, this.width, this.height, this.deg);
    this.dy += this.gravity;
    if (this.y + this.height > canvas.height) {
      this.dy = -this.dy * dampening;
      this.height *= .9;
      this.width *= .9;
    }
    if (this.x + this.width > canvas.width || this.x < -this.width) {
      this.dx = -this.dx * dampening;
      this.height *= .9;
      this.width *= .9;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.torque = this.torque > 0.5 ? this.torque: this.torque + 0.1;
    this.deg += this.torque;
  }
  this.draw = this.draw.bind(this);

}

init();

// setTimeout(init, 5000);