const easing = 0.08;
let obj;
let pos = {};
let socket;
let flag = {
  start: false,
};

function preload() {
  obj = createSprite(0, 0, 0, 0);
  obj.position.x = 0;
  obj.position.y = 0;
  obj.addAnimation(
    "normal",
    "assets/ghost_standing0001.png",
    "assets/ghost_standing0002.png",
    "assets/ghost_standing0003.png",
    "assets/ghost_standing0004.png",
    "assets/ghost_standing0005.png",
    "assets/ghost_standing0006.png",
    "assets/ghost_standing0007.png"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io("http://localhost:3000");
  socket.on("detect", (msg) => {
    msg.forEach((el) => {
      if (el) {
        flag.start = true;
        pos.x = width - map(el.landmarks._positions[31]._x, 0, 720, 0, width);
        pos.y =  map(el.landmarks._positions[31]._y, 0, 560, 0, height);
      }
      // console.log(pos);
    });
  });
  background(200);
}

function draw() {
  background(200);
  if (flag.start) {
    print(pos.x);
    obj.position.x += (pos.x - obj.position.x) * easing;
    obj.position.y += (pos.y - obj.position.y) * easing;

    // print(obj.position);
    ellipse(pos.x, pos.y, 20, 20);
    drawSprites();
  }
}
