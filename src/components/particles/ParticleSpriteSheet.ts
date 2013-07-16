/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - ParticleSpriteSheet
 *
 *	@desc 		
 *
 *	@version 	0.3 - 7th January 2013
 *
 *	@author 	Ross Kettle
 *	@author 	Richard Davey
 *
 *	@url 		http://www.kiwijs.org
 *
 *	@todo 		
*/

module Kiwi.Particles {

       
    export class ParticleSpriteSheet {
   
        /**
        * 
        * @constructor
        * @param {HTMLImageElement} image
        * @param {Number} frames
        * @param {Number} rows
        * @param {Number} cols
        * @param {Number} frameWidth
        * @param {Number} frameHeight
        * @return {Kiwi.Particle.ParticleSpriteSheet} This Object.
        */
        constructor (image:HTMLImageElement, frames:number, rows:number, cols:number, frameWidth:number, frameHeight:number) {
             this.image = image;
             this.frames = frames;
             this.rows = rows;
             this.cols = cols;
             this.frameWidth = frameWidth;
             this.frameHeight = frameHeight;
             this._currentFrameIndex = -1;
        }

        public objType() {
            return "ParticleSpriteSheet";
        }

        /**
        * 
        * @property _currentFrameIndex
        * @type Number
        * @private
        */
         private _currentFrameIndex: number;

         /**
        * 
        * @property image
        * @type HTMLElement
        */
         public image: HTMLImageElement;

        /**
        * 
        * @property frames
        * @type Number
        */
         public frames: number;

        /**
        * 
        * @property rows
        * @type Number
        */
         public rows: number;

        /**
        * 
        * @property cols
        * @type Number
        */
         public cols: number;

        /**
        * 
        * @property frameWidth
        * @type Number
        */
         public frameWidth: number;

        /**
        * 
        * @property frameHeight
        * @type Number
        */
         public frameHeight: number;

        /**
        * 
        * @method currentFrameIndex
        * @param {Number} val
        */
         public currentFrameIndex(value: number): number {
             if (value !== undefined) {
                 this._currentFrameIndex = value;
                 if (this._currentFrameIndex >= this.frames) this._currentFrameIndex = 0;
             }
             
             return this._currentFrameIndex;
         }

        

        /**
        * 
        * @method getFramePos
        * @param {Number} frameNumber
        * @return {Geom.Vector2}
        */
         public getFramePos(frameNumber: number):Geom.Vector2 {
             
             var col = frameNumber % this.cols;
             var row = Math.floor(frameNumber / this.cols);
             
             return new Geom.Vector2(col * this.frameWidth, row * this.frameHeight);
         }
         
    }

}
