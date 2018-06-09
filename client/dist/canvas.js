let edgeLeft = 0, edgeRight = window.innerWidth, edgeTop = 0, edgeBottom = window.innerHeight;

console.log('canvas connected!');

const canvas = document.querySelector('canvas');
canvas.width = edgeRight;
canvas.height = edgeBottom;

const c = canvas.getContext('2d');



const drawCircle = (x, y, ) => {
  c.arc(x, y, radius, 0, Math.PI * 2, false);
}

