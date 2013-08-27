/// <reference path="../core/Game.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../geom/Circle.ts" />

module Kiwi.Input {

    export class Pointer {

        constructor(game:Kiwi.Game) {
            this._game = game;
            this.point = new Kiwi.Geom.Point();
            this.circle = new Kiwi.Geom.Circle(0, 0, 1);
        }

        /*
        * The game that this pointer belongs to.
        */
        private _game: Kiwi.Game;

        public get game(): Kiwi.Game {
            return this._game;
        }

        /*
        * The unique identifier for this pointer.
        * @property _id
        * @type number
        */
        public id: number;

        /**
        * The horizontal coordinate of point relative to the game element
        * @property x
        * @type Number
        */
        public x: number = -1;

        /**
        * The vertical coordinate of point relative to the game element
        * @property y
        * @type Number
        */
        public y: number = -1;
        
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientX
        * @type Number
        */
        public clientX: number = -1;

        /**
        * The vertical coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientY
        * @type Number
        */
        public clientY: number = -1;

        /**
        * The horizontal coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageX
        * @type Number
        */
        public pageX: number = -1;

        /**
        * The vertical coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageY
        * @type Number
        */
        public pageY: number = -1;

        /**
        * The horizontal coordinate of point relative to the screen in pixels
        * @property screenX
        * @type Number
        */
        public screenX: number = -1;

        /**
        * The vertical coordinate of point relative to the screen in pixels
        * @property screenY
        * @type Number
        */
        public screenY: number = -1;

        public point: Kiwi.Geom.Point;

        public circle: Kiwi.Geom.Circle;
         
        public isDown: boolean = false;
        
        public isUp: boolean = true;
         
        public withinGame: bool = false;
         
        public active: bool = false;
         
        public timeDown: number = 0;

        public timeUp: number = 0;

        public duration: number = 0;
         
        public justPressedRate: number = 200;
         
        public justReleasedRate: number = 200;

        public start(event) {
            this.move(event); 

            this.active = true;
            this.withinGame = true;
            this.isDown = true;
            this.isUp = false;
            this.timeDown = this.game.time.now();
        }

        public stop(event) {
            this.active = false;
            this.withinGame = false;

            this.isDown = false;
            this.isUp = true;

            this.timeUp = this.game.time.now();
            this.duration = this.timeUp - this.timeDown;
        }
         
        public move(event) { 
            this.clientX = event.clientX;
            this.clientY = event.clientY;

            this.pageX = event.pageX;
            this.pageY = event.pageY;

            this.screenX = event.screenX;
            this.screenY = event.screenY;

            this.x = this.pageX - this.game.stage.offset.x;
            this.y = this.pageY - this.game.stage.offset.y;

            this.point.setTo(this.x, this.y);
            this.circle.x = this.x;
            this.circle.y = this.y;

            this.duration = this.game.time.now() - this.timeDown;
        }
         

        public justPressed(duration: number = this.justPressedRate): bool {

            if (this.isDown === true && (this.timeDown + duration) > this._game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }
         
        public justReleased(duration: number = this.justReleasedRate): bool {

            if (this.isUp === true && (this.timeUp + duration) > this._game.time.now())
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        
        public reset() {
            this.isDown = false;
            this.isUp = false;
            this.timeDown = 0;
            this.timeUp = 0;
        }

        public update() {
            if (this.isDown === true) {
                this.duration = this._game.time.now() - this.timeDown;
            } 
        }

    }

}