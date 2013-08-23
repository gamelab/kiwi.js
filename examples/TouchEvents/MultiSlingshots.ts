/// <reference path="../../src/Kiwi.ts" />

class MultiSlingshots extends Kiwi.State {

    constructor() {
        super('MultiSlingshots');
    }

    preload() {
        this.addSpriteSheet('explosion', 'assets/explosion.png', 64, 64);
        this.addImage('shiny', 'assets/shinyball.png');
    }

    public shinys: shiny[];

    create() {
        if (Kiwi.DEVICE.touch) {
            
            this.shinys = [];

            for (var i = 0; i < 5; i++) {
                //generate a x/y
                var x = Math.random() * this.game.stage.width;
                var y = Math.random() * this.game.stage.height;

                //add the shiny and its ghost
                var shinyObject = new shiny(this.textures.shiny, x, y);
                //add the shinys.
                this.shinys.push(shinyObject);
                this.addChild(shinyObject);
            }

            //touch events 
            this.game.input.touch.fingerDown.add(this.pressedFinger, this);
            this.game.input.touch.fingerUp.add(this.released, this);
        }
    }

    /*
    * When someone presses their finger down. 
    */
    pressedFinger(finger) { 
        for (var i = 0; i < 5; i++) {
            if (this.shinys[i].fingerOverlap(finger)) {
                break;
            }
        }

    }

    /*
    * When someone releases the finger
    */
    released(finger) {
        
        for (var i = 0; i < 5; i++) {
            this.shinys[i].release(finger);
        }

    }


}

class shiny extends Kiwi.GameObjects.Sprite {

    constructor(atlas, x, y) {
        super(atlas, x, y);
    }

    public moving: bool = false;
    public onBall: bool = false;
    public finger: Kiwi.Input.Finger;

    public iteration: number;
    public iterationCount: number = 45;
    public maxDistance:number = 150;

    public b4x: number;
    public b4y: number;

    public nx: number;
    public ny: number;
    
    public fingerOne: Kiwi.Input.Finger;

    public fingerOverlap(finger):bool {

        if (this.moving == false && this.onBall == false) {
            if (finger.x > this.x && this.x + this.width > finger.x && finger.y > this.y && this.y + this.height > finger.y) {
                this.fingerOne = finger;
                this.b4x = this.x;
                this.b4y = this.y;
                this.onBall = true;
                console.log('Overlapping');
                return true;
            }
        }

        return false;

    }

    public release(finger): bool {

        if (this.onBall && this.fingerOne.identifier == finger.identifier) {
            this.onBall = false;
            
            this.nx = (this.x - this.b4x) * 3;
            this.ny = (this.y - this.b4y) * 3;

            this.iteration = 0;
            this.moving = true;

            return true;
        }
        return false;
    }

    public doneMoving() {
        this.moving = false;
        //boom boom
    }

    public update() {
        super.update();

        if (this.onBall) {

            this.nx = (this.fingerOne.x - this.b4x);
            this.ny = (this.fingerOne.y - this.b4y);

            var h = Math.sqrt(Math.abs(Math.pow(this.nx, 2) + Math.pow(this.ny, 2)));

            if (h < this.maxDistance) {
                var x = this.fingerOne.x;
                var y = this.fingerOne.y;
            } else {
                var ang = Math.atan2(this.ny, this.nx);
                var h = this.maxDistance;

                var x = this.b4x + (Math.cos(ang) * h);
                var y = this.b4y + (Math.sin(ang) * h);

            }

            this.x = x;
            this.y = y;

            if ((this.x + 20) < 0) this.x = 0;
            if (this.x > 800) this.x = 800;
            if (this.y + 20 < 0) this.y = 0;
            if (this.y > 600) this.y = 600;
        }

        if (this.moving) {

            if (this.iteration >= this.iterationCount) {
                this.doneMoving();
            }

            this.x -= (this.nx * ((this.iterationCount - this.iteration) / this.iterationCount)) / (this.iterationCount / 2);
            this.y -= (this.ny * ((this.iterationCount - this.iteration) / this.iterationCount)) / (this.iterationCount / 2);

            if ((this.x + 20) < 0) {
                this.x = 795;
            } else if (this.x > 800) {
                this.x = 5;
            }

            if ((this.y + 20) < 0) {
                this.y = 595;
            } else if (this.y > 600) {
                this.y = 5;
            }

            this.iteration++;
        }

    }

}