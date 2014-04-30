/**
* 
* @module Kiwi
* @submodule Input
* 
*/ 

module Kiwi.Input {

    /**
    * Is a generic class that holds the properties/methods that are common across various different methods of inputs from the user, mainly between Touch and Mouse based events. This abstract class and such it is suppose to be extended from for individual implementations. 
    *
    * @class Pointer
    * @constructor
    * @namespace Kiwi.Input
    * @param {Game} game
    * @return Pointer
    *
    */
    export class Pointer {
         
        constructor(game:Kiwi.Game) {
            this._game = game;
            this.point = new Kiwi.Geom.Point();
            this.circle = new Kiwi.Geom.Circle(0, 0, 1);
            this.startPoint = new Kiwi.Geom.Point();
            this.endPoint = new Kiwi.Geom.Point();
        }

        /**
        * The type of object this class is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType():string {
            return 'Pointer';
        }

        /**
        * The game that this pointer belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Get the game that this pointer belongs to.
        * @type Game
        * @public
        */
        public get game(): Kiwi.Game {
            return this._game;
        }

        /**
        * The unique identifier for this pointer.
        * @property _id
        * @type number
        * @private
        */
        public id: number;

        /**
        * The horizontal coordinate of point relative to the game element
        * @property x
        * @type Number
        * @default -1
        * @public
        */
        public x: number = -1;

        /**
        * The vertical coordinate of point relative to the game element
        * @property y
        * @type Number
        * @default -1
        * @public
        */
        public y: number = -1;
        
        /**
        * The horizontal coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientX
        * @type Number
        * @default -1
        * @public
        */
        public clientX: number = -1;

        /**
        * The vertical coordinate of point relative to the viewport in pixels, excluding any scroll offset
        * @property clientY
        * @type Number
        * @default -1
        * @public
        */
        public clientY: number = -1;

        /**
        * The horizontal coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageX
        * @type Number
        * @default -1
        * @public
        */
        public pageX: number = -1;

        /**
        * The vertical coordinate of point relative to the viewport in pixels, including any scroll offset
        * @property pageY
        * @type Number
        * @default -1
        * @public
        */
        public pageY: number = -1;

        /**
        * The horizontal coordinate of point relative to the screen in pixels
        * @property screenX
        * @type Number
        * @default -1
        * @public
        */
        public screenX: number = -1;

        /**
        * The vertical coordinate of point relative to the screen in pixels
        * @property screenY
        * @type Number
        * @default -1
        * @public
        */
        public screenY: number = -1;

        /**
        * The point that this pointer is at. Same c ordina es asX/Y properties.
        * @property point
        * @type Point
        * @public
        */
        public point: Kiwi.Geom.Point;
        
        /**
        * A circle that is representative of the area this point covers.
        * @property circle
        * @type Circle
        * @public
        */
        public circle: Kiwi.Geom.Circle;
         
        /**
        * Indicates if this pointer is currently down.
        * @property isDown
        * @type boolean
        * @default false
        * @public
        */
        public isDown: boolean = false;
        
        /**
        * Indicates if this pointer is currently up.
        * @property isUp
        * @default true
        * @type boolean
        * @public
        */
        public isUp: boolean = true;
         
        /**
        * Indicates if this pointer is currently within the game.
        * @property withinGame
        * @type boolean
        * @default false
        * @public
        */
        public withinGame: boolean = false;
         
        /**
        * Indicates if this pointer is active. Note a mouse is always 'active' where as a finger is only active when it is down.
        * @property active
        * @type boolean
        * @default false
        * @public
        */
        public active: boolean = false;
         
        /**
        * Indicates the time that the pointer was pressed initially.
        * @property timeDown
        * @type number
        * @default 0
        * @public
        */
        public timeDown: number = 0;
        
        /**
        * Indicates the time that the pointer was released initially.
        * @property timeUp
        * @type number
        * @default 0
        * @public
        */
        public timeUp: number = 0;
        
        /**
        * The duration that the pointer has been down for in milliseconds.
        * @property duration
        * @type number
        * @default 0
        * @public
        */
        public duration: number = 0;
        
        /**
        * The duration that the pointer has been down for in frames.
        * @property frameDuration
        * @type number
        * @default 0
        * @public
        */
        public frameDuration: number = 0;
        
        /**
        * A time that is used to calculate if someone justPressed the pointer.
        * @property justPressedRate
        * @type number
        * @defeault 200
        * @public
        */
        public justPressedRate: number = 200;
         
        /**
        * A time that is used to calculate if someone justReleased the pointer.
        * @property justReleasedRate
        * @type number
        * @default 200
        * @public
        */
        public justReleasedRate: number = 200;
        
        /**
        * The points inital coordinates when pressed down.
        * @property startPoint
        * @type Point
        * @public
        */
        public startPoint: Kiwi.Geom.Point;

        /**
        * The coordinates where the user released the pointer.
        * @property endPoint
        * @type Point
        * @public
        */
        public endPoint: Kiwi.Geom.Point;

        /**
        * The method that gets executed when the pointer presses/initially goes down on the screen.
        * From the event passed the coordinates are calculated.
        * @method start
        * @param {event} event
        * @public
        */
        public start(event) {
            this.move(event); 
            this.startPoint.setTo(this.x, this.y);
            this.frameDuration = 0;
            this.withinGame = true;
            this.isDown = true;
            this.isUp = false;
            this.timeDown = this.game.time.now();
        }
        
        /**
        * The stop method is to be called when the pointer gets released initially. 
        * @method stop
        * @param {event} event
        * @public
        */
        public stop(event) {
            this.withinGame = false;
            this.endPoint.setTo(this.x, this.y);
            this.isDown = false;
            this.isUp = true;

            this.timeUp = this.game.time.now();
            this.duration = this.timeUp - this.timeDown;
        }
         
        /**
        * Used to get the cooridnates of a pointer and inputs them to the correct properties.  
        * @method move
        * @param {event} event
        * @public
        */
        public move(event) { 
            this.clientX = event.clientX;
            this.clientY = event.clientY;

            this.pageX = event.pageX;
            this.pageY = event.pageY;

            this.screenX = event.screenX;
            this.screenY = event.screenY;

            this.x = (this.pageX - this.game.stage.offset.x) * this.game.stage.scaleX;
            this.y = (this.pageY - this.game.stage.offset.y) * this.game.stage.scaleY;

            this.point.setTo(this.x, this.y);
            this.circle.x = this.x;
            this.circle.y = this.y;

            this.duration = this.game.time.now() - this.timeDown;
        }
         
        /**
        * Indicates if the pointer was just pressed. This is based of the justPressedRate unless otherwise specifieds.
        * @method justPressed
        * @param {number} duration
        * @return boolean
        * @public
        */
        public justPressed(duration: number = this.justPressedRate): boolean {

            if (this.isDown === true && (this.timeDown + duration) > this._game.time.now()) {
                return true;
            } else {
                return false;
            }

        }
         
        /**
        * Indicates if the pointer was just released. This is based of the justReleasedRate unless otherwise specified.
        * @method justReleased
        * @param {number} duration
        * @return boolean
        * @public
        */
        public justReleased(duration: number = this.justReleasedRate): boolean {

            if (this.isUp === true && (this.timeUp + duration) > this._game.time.now()) {
                return true;
            } else {
                return false;
            }

        }
        
        /**
        * Resets the pointer properties to the default ones. Assumes that the pointer is no longer down.
        * @method reset
        * @public
        */
        public reset() {
            this.isDown = false;
            this.isUp = true;
            this.timeDown = 0;
            this.timeUp = 0;
            this.duration = 0;
            this.frameDuration = 0;
        }
            
        /**
        * The update loop for the pointer. Used only if down to update the duration.
        * @method update.
        * @public
        */
        public update() {
            if (this.isDown === true) {
                this.frameDuration ++;
                this.duration = this._game.time.now() - this.timeDown;
            } 
        }

    }

}