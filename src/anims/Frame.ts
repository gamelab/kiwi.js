/// <reference path="../core/Game.ts" />

/**
 *	Kiwi - Animations - Frame
 *
 *	@desc 		A single frame of an animation
 *
 *	@version 	1.0 - 22nd March 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Anims {

    export class Frame {

        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Time.Manager} This Object.
        */
        constructor(x: number, y: number, width: number, height: number) {

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            this.rotated = false;
            this.trimmed = false;

        }

        public objType() {
            return "Frame";
        }

        setRotation(rotated: bool, rotationDirection: string) {

        }

				// "spriteSourceSize": {"x":108,"y":193,"w":86,"h":242},
        setTrim(trimmed: bool, actualWidth, actualHeight, destX, destY, destWidth, destHeight ) {

        }

        //  position within the image file to cut from
        public x;
        public y;
        public width;
        public height;

        //  support?
        public rotated: bool = false;

        //  either cw or ccw, rotation is always 90 degrees
        public rotationDirection: string = 'cw';

        //  was it cropped down?
        public trimmed: bool;

        //  The x coordinate of the trimmed sprite inside the original sprite. int
        private spriteSourceSize;
        
        public sourceSizeX;
        public sourceSizeY;

        /*
				//	Texture Packer JSON format:
				// "frame": {"x":0,"y":284,"w":86,"h":242}, (where you cut it out from the sheet)
				// "trimmed": true,
				// "spriteSourceSize": {"x":108,"y":193,"w":86,"h":242},
				// "sourceSize": {"w":300,"h":480}

				//	sourceSize is the actual dimensions of the animation frame (i.e. an animation may be 320x200 in overall size)
				//	spriteSourceSize are the x/y/w/h coordinates WITHIN the sourceSize to allow you to calculate placement

				if (data.trimmed === true)
				{
					dx += data.spriteSourceSize.x;
					dy += data.spriteSourceSize.y;
				}

        */



        /**
        * 
        * @method update
        */
        public update() {


        }


    }

}