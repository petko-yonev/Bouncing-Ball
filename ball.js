const Application = PIXI.Application;

//Creating a canvis with dynamic size
const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
});
app.renderer.backgroundColor = 0x665e48;
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

//Creating a floor obj
const Graphics = PIXI.Graphics;
const floor = new Graphics();
floor.beginFill(0x32a852);
floor.drawRect(0, window.innerHeight - 50, window.innerWidth, 50);
floor.endFill();
app.stage.addChild(floor);

const loader = PIXI.Loader.shared;
loader.add("Ball_Spritesheet", "images/Ball_Spritesheet.json");

loader.load(setup);

function setup(loader, resources){

    const textures = [];
    for(let i = 0; i < 8; i++){
        const pic = PIXI.Texture.from('Ball_'+ i +'.png');
        textures.push(pic)
    }

    ball = new PIXI.AnimatedSprite(textures);
    ball.position.set( window.innerWidth / 2, window.innerHeight - 600);
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
    app.stage.addChild(ball);

    app.ticker.add(delta => loop(delta));

    var accelerationY = 0.05;
    var accelerationX = 0;

    ball.animationSpeed = 1.5;
    function loop(delta) {
        if(ball.y  <  window.innerHeight - 100){
            ball.y += accelerationY;
            ball.x += accelerationX;
            if (ball.y + accelerationY > window.innerHeight - 100){
                accelerationY =  -8;
                ball.play();
                ball.onComplete = function () {
                    ball.gotoAndStop(0);
                  };
                ball.loop = false;
            } else {
                accelerationY += 0.1;
            }

            if (ball.x + accelerationX < 50){
                accelerationX = 3.5;
            }
            if (ball.x + accelerationX > window.innerWidth - 50){
                accelerationX = -3.5;
            }
        }
    }

    ball.interactive = true;
    ball.on("pointerdown", function(){
        accelerationY = -8;
        if(event.clientX > ball.x) {
            accelerationX -= 3;
        } else {
            accelerationX += 3;
        }
        ball.gotoAndPlay(5);
        ball.onFrameChange = function () {
            if(ball.currentFrame == 7) {
                ball.gotoAndPlay(0);
                ball.stop();
            }
        };
        ball.animationSpeed = 0.4;
    });
}










