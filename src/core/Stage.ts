/// <reference path="Game.ts" />
/// <reference path="../geom/Rectangle.ts" />

/**
 *  Kiwi - Core - Stage
 *
 *  @desc       A game contains one single Stage which controls the size of the game, frame rate, position, etc
 *
 *	@version 	1.0 - March 5th 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */


module Kiwi {

    export class Stage {

        /**
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Settings} This Object
        */
        constructor(game: Kiwi.Game, name: string) {

            this._game = game;

            this.name = name;

            this.domReady = false;

           

            //  Properties

            this.alpha = new Kiwi.Components.Alpha();
            this.color = new Kiwi.Components.Color();
            this.position = new Kiwi.Components.Position();
            this.size = new Kiwi.Components.Size();

        }

        /**
        * Returns the type of this object.
        */
        public objType():string {
            return "Stage";
        }

        /**
		* The Alpha component of this Stage
        * @property alpha
        * @type Kiwi.Components.Alpha
    	*/
        public alpha: Kiwi.Components.Alpha;

        /**
		* The Color component of this Stage
        * @property color
        * @type Kiwi.Components.Color
    	*/
        public color: Kiwi.Components.Color;

        /**
		* The Position component of this Stage
        * @property position
        * @type Kiwi.Components.Position
    	*/
        public position: Kiwi.Components.Position;

        /**
		* A point which determines the offset of this Stage
        * @property offset
        * @type Kiwi.Geom.Point
    	*/
        public offset: Kiwi.Geom.Point = new Kiwi.Geom.Point();

        /**
		* The Size component of this Stage
        * @property size
        * @type Kiwi.Components.Size
    	*/
        public size: Kiwi.Components.Size;

        /**
        * The game this Stage belongs to
        * @property _game
        * @type Kiwi.Game
        * @private 
        */
        private _game: Kiwi.Game;

        /**
        * The title of your stage
        * @property name
        * @type string
        */
        public name: string;

        /**
		* Whether or not this Stage is DOM ready.
        * @property domReady
        * @type Boolean
    	*/
        public domReady: bool;

        public ctx: CanvasRenderingContext2D;
        public canvas: HTMLCanvasElement;

        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        */
        public container:HTMLDivElement = null;

        
        /**
        * The DOM is ready, so if we have things to do we can set them now
        * @method boot
        * @param {HTMLElement} container
        */
        public boot(dom: Kiwi.DOM.Bootstrap) {

            klog.info('Stage DOM boot');

            //  Properties

            this.domReady = true;

            this.container = dom.container;
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                this.offset = this._game.browser.getOffsetPoint(this.container);
                this.position.setTo(this.offset.x, this.offset.y);
                this.size.setTo(parseInt(this.container.style.width), parseInt(this.container.style.height));
            }
           

            //  Signals
            this.alpha.updated.add(this._updatedAlpha, this);
            this.color.updated.add(this._updatedColor, this);
            this.position.updated.add(this._updatedPosition, this);
            this.size.updated.add(this._updatedSize, this);
            this._createCompositeCanvas();
        }


        private _createCompositeCanvas() {
            this.canvas = <HTMLCanvasElement>document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.ctx.fillStyle = this.color.cssColorHex;

            this.canvas.id = this._game.id + "compositeCanvas";
            this.canvas.style.position = "absolute";

            this.canvas.width = 800;
            this.canvas.height = 600;
            
            if (Kiwi.TARGET === Kiwi.TARGET_BROWSER) {
                this.container.appendChild(this.canvas);
            } else {
                document.body.appendChild(this.canvas);
            }
            

        }

        

        
        

        


        /**
		* 
        * @method _updatedPosition
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        * @param {String} cssTranslate3d
        * @param {String} cssLeft
        * @param {String} cssTop
        * @private
    	*/
        private _updatedPosition(x: number, y: number, z: number, cssTranslate3d: string, cssLeft: string, cssTop: string) {

            this.container.style.left = cssLeft;
            this.container.style.top = cssTop;

        }

        /**
		* 
        * @method _updatedColor
        * @param {Number} red
        * @param {Number} green
        * @param {Number} blue
        * @param {Number} alpha
        * @param {String} cssColorHex
        * @param {String} cssColorRGB
        * @param {String} cssColorRGBA
        * @private
    	*/
        private _updatedColor(red: number, green: number, blue:number, alpha:number, cssColorHex:string, cssColorRGB:string, cssColorRGBA:string) {
            
            if (Kiwi.DEVICE.ieVersion < 10)
            {
               this.container.style.backgroundColor = cssColorHex;
            }
            else
            {
               this.container.style.backgroundColor = cssColorRGBA;
            }

        }

        /**
        * 
        * @method _updatedAlpha
        * @private
        */
        private _updatedAlpha() {

            this.alpha.setCSS(this.container);

        }

        /**
        * 
        * @method _updatedSize
        * @private
        */
        private _updatedSize() {

         

        }

        /**
        * The framerate at which the game will update at.
        * @property _framerate
        * @type Number
        * @private
        */
        private _framerate: number = 3;

        /**
		* Returns the frameRate of this Stage. If a value is given the framerate is set and then returned.
        * @method frameRate
        * @param {Number} value. If a value is present, the framerate is set to this.
        * @return {Number} The current frameRate.
    	*/
        public frameRate(value?: number): number {

            if (value)
            {
                this._framerate = value;
            }

            return this._framerate;

        }

    }

}
