/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Color
 *
 *	@desc		
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Color extends Component {

        //  RGB are 0 to 255, Alpha is 0 to 1

        /**
        * 
        * @constructor
        * @param {Number} red
        * @param {Number} green
        * @param {Number} blue
        * @param {Number} alpha
        * @return {Color}
        */
        constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {

            super('Color');

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            this._skipUpdate = true;

            this.red(red);
            this.green(green);
            this.blue(blue);
            this.alpha(alpha);
          this._skipUpdate = false;

            this._processUpdate();

        }

        public objType() {
            return "Color";
        }

        /*
        * 
        * @property _red
        * @type {Number}
        * @private
        */
        private _red: number;

        /*
        * 
        * @property _green
        * @type {Number}
        * @private
        */
        private _green: number;

        /*
        * 
        * @property _blue
        * @type {Number}
        * @private
        */
        private _blue: number;

        /*
        * 
        * @property _alpha
        * @type {Number}
        * @private
        */
        private _alpha: number;

        /*
        * 
        * @property _color
        * @type {Number}
        * @private
        */
        private _color: number;

        /*
        * 
        * @property _skipUpdate
        * @type {Boolean}
        * @private
        */
        private _skipUpdate: bool = false;

        //  Subscribe to this Signal to receive updates

        /*
        * 
        * @property updated
        * @type {Kiwi.Signal}
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property cssColorHex
        * @type {String}
        */
        public cssColorHex: string;

        /*
        * 
        * @property cssColorRGB
        * @type {String}
        */
        public cssColorRGB: string;

        /*
        * 
        * @property cssColorRGBA
        * @type {String}
        */
        public cssColorRGBA: string;

        /*
        * 
        * @method addStyleUpdates
        * @param {Kiwi.Entity} entity
        */
        public addStyleUpdates(entity: Kiwi.Entity) {

            if (entity === null)
            {
                return;
            }
            
            /*
            if (Kiwi.DEVICE.ieVersion < 9)
            {
                entity.addStyleUpdate('backgroundColor', this.cssColorHex);
            }
            else
            {
                entity.addStyleUpdate('backgroundColor', this.cssColorRGBA);
            }*/

        }

        /*
        * 
        * @method addStyleImmediately
        * @param {Kiwi.Entity} entity
        */
        public addStyleImmediately(entity: Kiwi.Entity) {
/*
            if (entity.domElement === null || entity.domElement.element === null)
            {
                return;
            }
            
            if (Kiwi.DEVICE.ieVersion < 9)
            {
                entity.domElement.element.style.backgroundColor = this.cssColorHex;
            }
            else
            {
                entity.domElement.element.style.backgroundColor = this.cssColorRGBA;
            }
        */
        }

        /*
        * 
        * @method _processUpdate
        * @private
        */
        private _processUpdate() {

            this.cssColorHex = '#' + this._colorToHexstring(this._red) + this._colorToHexstring(this._green) + this._colorToHexstring(this._blue);
            this.cssColorRGB = 'rgb(' + this._red + ',' + this._green + ',' + this._blue + ')';
            this.cssColorRGBA = 'rgba(' + this._red + ',' + this._green + ',' + this._blue + ',' + this._alpha + ')';
            this.dirty = true;

            this.updated.dispatch(this._red, this._green, this._blue, this._alpha, this.cssColorHex, this.cssColorRGB, this.cssColorRGBA);

        }

        /*
        * 
        * @method setRGBA
        * @param {Number} red
        * @param {Number} green
        * @param {Number} blue
        * @param {Number} alpha
        */
        public setRGBA(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {

            this._skipUpdate = true;

            this.red(red);
            this.green(green);
            this.blue(blue);
            this.alpha(alpha);

            this._skipUpdate = false;

            this._processUpdate();

        }

        /*
        * 
        * @method setColor
        * @param {Number} value
        */
        public setColor(value: number) {

            this._skipUpdate = true;

            this._color = value;
            this.alpha((value >>> 24) / 255);
            this.red(value >> 16 & 0xFF);
            this.green(value >> 8 & 0xFF);
            this.blue(value & 0xFF);

            this._skipUpdate = false;

            this._processUpdate();

        }

        /*
        * 
        * @method getColor
        * @return {Number}
        */
        public getColor(): number {

            return this._color;

        }

        /*
        * 
        * @method red
        * @param {Number} value
        * @return {Number}
        */
        public red(value: number = null): number {

            if (value !== null && value !== this._red)
            {
                if (value >= 0 && value <= 255)
                {
                    this._red = value;

                    if (this._skipUpdate === false)
                    {
                        this._processUpdate();
                    }
                }
            }

            return this._red;

        }

        /*
        * 
        * @method green
        * @param {Number} value
        * @return {Number}
        */
        public green(value: number = null): number {

            if (value !== null && value !== this._green)
            {
                if (value >= 0 && value <= 255)
                {
                    this._green = value;

                    if (this._skipUpdate === false)
                    {
                        this._processUpdate();
                    }
                }
            }

            return this._green;

        }

        /*
        * 
        * @method blue
        * @param {Number} value
        * @return {Number}
        */
        public blue(value: number = null): number {

            if (value !== null && value !== this._blue)
            {
                if (value >= 0 && value <= 255)
                {
                    this._blue = value;

                    if (this._skipUpdate === false)
                    {
                        this._processUpdate();
                    }
                }
            }

            return this._blue;

        }

        /*
        * 
        * @method alpha
        * @param {Number} value
        * @return {Number}
        */
        public alpha(value: number = null): number {

            if (value !== null && value !== this._alpha)
            {
                if (value >= 0 && value <= 1)
                {
                    this._alpha = value;

                    if (this._skipUpdate === false)
                    {
                        this._processUpdate();
                    }
                }
            }

            return this._alpha;

        }

        //  These probably ought to be in the Utils package actually

        /**
		 * Returns a random color value between black and white
		 * <p>Set the min value to start each channel from the given offset.</p>
		 * <p>Set the max value to restrict the maximum color used per channel</p>
		 * 
		 * @param	min		The lowest value to use for the color (range is 0 to 255)
		 * @param	max 	The highest value to use for the color (range is 0 to 255)
		 * @param	alpha	The alpha value of the returning color, between 0 and 1 (default 1 = fully opaque)
		 * 
		 * @return 32-bit color value with alpha
		 */
        public setRandomColor(min: number = 0, max: number = 255, alpha: number = 1) {

            //	Sanity checks
            if (max > 255)
            {
                klog.info("Color Warning: getRandomColor - max value too high");
                this.setRGBA(255, 255, 255);
            }

            if (min > max)
            {
                klog.info("Color Warning: getRandomColor - min value higher than max");
                this.setRGBA(255, 255, 255);
            }

            var red: number = min + Math.round(Math.random() * (max - min));
            var green: number = min + Math.round(Math.random() * (max - min));
            var blue: number = min + Math.round(Math.random() * (max - min));

            this.setRGBA(red, green, blue, alpha);

        }

        /**
		 * Return a string containing a hex representation of the given color
		 * @param	color The color channel to get the hex value for, must be a value between 0 and 255)
		 * @return	A string of length 2 characters, i.e. 255 = FF, 0 = 00
		 */
        private _colorToHexstring(color: number): string {

            var digits: string = "0123456789ABCDEF";

            var lsd: number = color % 16;
            var msd: number = (color - lsd) / 16;

            var hexified: string = digits.charAt(msd) + digits.charAt(lsd);

            return hexified;

        }

    }

}