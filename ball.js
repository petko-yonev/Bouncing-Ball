const Application = PIXI.Application;

//Creating a canvis with dynamic size
const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight
});
app.renderer.backgroundColor = 0xffffff;
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

//Creating a floor obj
const Graphics = PIXI.Graphics;
const floor = new Graphics();
floor.beginFill(0x32a852);
floor.drawRect(0, window.innerHeight - 50, window.innerWidth, 50);
floor.endFill();
app.stage.addChild(floor);

// a vat to store balls movement
var ballUp = true;

// a vars to position balls`s starting position
var ball_center_x = window.innerWidth / 2;
var ball_center_y = window.innerHeight - 100;

//Creating a new ball obj
const ball = new Graphics();
ball.beginFill(0xa85932);
ball.drawCircle(ball_center_x, ball_center_y, 50);
ball.endFill();
app.stage.addChild(ball);

// Click event listener
ball.interactive = true;
ball.on("pointerdown", function(){
    ballUp = true;
});

// Infinite loop to change the ball`s position
const interval = setInterval(function() {
    
    if(ball.y > -400 && ballUp == true){
        ball.y -= 10;
    }
    if(ball.y <= -400){
        ball.y += 10;
        ballUp = false;
    } 
    if(ball.y < 0 && ballUp == false){
        ball.y += 10;
    }
    if(ball.y == 0){
       ball.y -= 10;
       ballUp = true;
       changeBackground();
   }
}, 10);

// Function to generate a random hex number
function changeBackground(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    app.renderer.backgroundColor = "0x" + randomColor;
}





