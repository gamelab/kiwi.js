/// <reference path="../../src/Kiwi.ts" />

class Slingshot extends Kiwi.State {

    constructor() {
        super('Slingshot');
    }

    preload() {
        this.addSpriteSheet('explosion', 'assets/explosion.png', 64, 64);
        this.addImage('shiny', 'assets/shinyball.png');

    }

    public shiny: Kiwi.GameObjects.Sprite;
    public shinyGhost: Kiwi.GameObjects.Sprite;
    public explosion: Kiwi.GameObjects.Sprite;

    public onBall: bool = false;
    public moving: bool = false;
    public finger: Kiwi.Input.Finger;

    public nx: number;
    public ny: number;

    public iteration: number;
    public iterationCount: number = 45;

    public maxDistance: number = 150;

    create() {

            //generate a x/y
            var x = Math.random() * this.game.stage.width;
            var y = Math.random() * this.game.stage.height;

            //add the shiny and its ghost
            this.shiny = new Kiwi.GameObjects.Sprite(this.textures.shiny, x, y);
            this.shinyGhost = new Kiwi.GameObjects.Sprite(this.textures.shiny, x, y);
            this.shinyGhost.alpha = 0;

            //add the shinys.
            this.addChild(this.shiny);
            this.addChild(this.shinyGhost);

            //explosion.
            this.explosion = new Kiwi.GameObjects.Sprite(this.textures.explosion, 0, 0);
            this.addChild(this.explosion);
            this.explosion.animation.getAnimation('default').loop = false;  //stop looping of explosion by default.
            this.explosion.animation.getAnimation('default').speed = 0.01;
            this.explosion.alpha = 0;


            //touch events 
            this.game.input.onDown.add(this.pressedFinger, this);
            this.game.input.onUp.add(this.released, this);
        
    }

    update() {
        super.update();

        if (this.onBall) {

            this.nx = (this.finger.x - this.shinyGhost.x);
            this.ny = (this.finger.y - this.shinyGhost.y);

            var h = Math.sqrt(Math.abs(Math.pow(this.nx, 2) + Math.pow(this.ny, 2)));

            if (h < this.maxDistance) {
                var x = this.finger.x;
                var y = this.finger.y;
            } else {
                var ang = Math.atan2(this.ny, this.nx);
                var h = this.maxDistance;

                var x = this.shinyGhost.x + (Math.cos(ang) * h);
                var y = this.shinyGhost.y + (Math.sin(ang) * h);

            }

            this.shiny.x = x;
            this.shiny.y = y;

            if ((this.shiny.x + 20) < 0) this.shiny.x = 0;
            if (this.shiny.x > 800) this.shiny.x = 800;
            if (this.shiny.y + 20 < 0) this.shiny.y = 0;
            if (this.shiny.y > 600) this.shiny.y = 600;
        }

        if (this.moving) {

            if (this.iteration >= this.iterationCount) {
                this.doneMoving();
            }

            this.shiny.x -= (this.nx * ((this.iterationCount - this.iteration) / this.iterationCount)) / (this.iterationCount / 2);
            this.shiny.y -= (this.ny * ((this.iterationCount - this.iteration) / this.iterationCount)) / (this.iterationCount / 2);

            if ((this.shiny.x + 20) < 0) {
                this.shiny.x = 795;
            } else if (this.shiny.x > 800) {
                this.shiny.x = 5;
            }

            if ((this.shiny.y + 20) < 0) {
                this.shiny.y = 595;
            } else if (this.shiny.y > 600) {
                this.shiny.y = 5;
            }

            this.iteration++;
        }
    }
    
    /*
    * When someone presses their finger down. 
    */
    pressedFinger(x,y,timeDown,timeUp, duration, finger) {

        if (this.moving == false && finger.x > this.shiny.x && this.shiny.x + this.shiny.width > finger.x && finger.y > this.shiny.y && this.shiny.y + this.shiny.height > finger.y) {
            this.onBall = true;
            this.finger = finger;
            this.shinyGhost.x = this.shiny.x;
            this.shinyGhost.y = this.shiny.y;
            this.shinyGhost.alpha = 0.25;
        }

    }

    /*
    * When someone releases the finger
    */
    released(x,y,tiemDown,timeUp,duration,finger) {
        if (this.onBall && this.finger.id  == finger.id ) {
            this.shinyGhost.alpha = 0;
            this.onBall = false;

            this.nx = (this.shiny.x - this.shinyGhost.x) * 3;
            this.ny = (this.shiny.y - this.shinyGhost.y) * 3;

            this.iteration = 0;
            this.moving = true;

        }
    }

    /*
    * Stops all of the animations stuff
    */
    doneMoving() {
        this.moving = false;
        this.explosion.alpha = 1;
        this.explosion.x = this.shiny.x - this.explosion.width / 3;
        this.explosion.y = this.shiny.y - this.explosion.height / 3;
        this.explosion.animation.play('default');
    }

}
