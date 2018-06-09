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

// let bacon = new Food(60, 60, 'assets/food_icons/bacon.png', 100, 500);
function init() {
  let bacon = new Food('bacon', 'assets/food_icons/bacon.png', 60, 60, 100, 200, 1, 1);
  let pizza = new Food('pizza', 'assets/food_icons/pizza.png', 60, 60, 300, 200, 1, 1);
  setInterval(() => bacon.draw(2), 100);
  // bacon.draw();
}

function drawImageRot(img,x,y,width,height,deg){
  var rad = deg * Math.PI / 180;   //Convert degrees to radian 
  ctx.translate(x + width / 2, y + height / 2);  //Set the origin to the center of the image
  ctx.rotate(rad);   //Rotate the canvas around the origin  
  ctx.drawImage(img, width/2*(-1), height/2*(-1),width,height); //draw the image  
  ctx.rotate(rad * ( -1 ) );   //reset the canvas  
  ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

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
  this.image.onload = () => this.draw();
  this.draw = function(deg = 0) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.rotate(deg);
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    c.rotate(-deg);
    this.y += this.dy;
    console.log('this y', this.name, this.y);
    // setInterval(() => this.draw(deg++), 1000);
  }
  this.draw = this.draw.bind(this);

}

init();

// setTimeout(init, 5000);