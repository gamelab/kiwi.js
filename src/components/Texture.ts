/// <reference path="../core/Cache.ts" />
/// <reference path="../core/Component.ts" />
/// <reference path="../core/File.ts" />
/// <reference path="Position.ts" />
/// <reference path="Size.ts" />

/*
 *	Kiwi - Components - Texture
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

    export class Texture extends Component {

        /*
        * 
        * @constructor
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @return {Texture}
        */
        constructor(cacheID:string, cache:Kiwi.Cache) {

            super('Texture');

            if (!this._setTexture(cacheID, cache)) return;
            
            //  Properties

            this.position = new Kiwi.Components.Position();
            this.size = new Kiwi.Components.Size(this.file.data.width, this.file.data.height);
            this._repeat = Kiwi.Components.Texture.REPEAT_NONE;
            this.ready = true;

            //  Signals
            this.updatedRepeat = new Kiwi.Signal();
            this.updated = new Kiwi.Signal();
        }

        /*
        *
        * @method changeTexture
        * @param {String} cacheID
        * @param {cache}
        */
        public changeTexture(cacheID: string, cache) {
            if (!this._setTexture(cacheID, cache)) return;

            this.size.setTo(this.file.data.width, this.file.data.height);
            this.ready = true;

            this.updated.dispatch( this.getURL(), this.file.data.width, this.file.data.height ); //modify
        }

        /*
        *
        * @method _setTexture
        * @param {String} cacheID
        * @param {Kiwi.Cache} cache
        * @return {Boolean} 
        */
        private _setTexture(cacheID: string, cache: Kiwi.Cache):boolean {
            if (cacheID == '' || cache === null || cache.images === null || cache.images.exists(cacheID) === false)
            {
                klog.warn('Texture cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                this.ready = false;
                return;
            }
            this.cacheID = cacheID;
            this.file = cache.images.getFile(cacheID);
            this.image = this.file.data;

            return true;
        }

        public objType() {
            return "Texture";
        }

        public ready: bool;

        /*
        * 
        * @property _repeat
        * @type String
        */
        private _repeat: string;
        
        /*
        * 
        * @property file
        * @type Kiwi.File
        */
        public file: Kiwi.File = null;

        /*
        * 
        * @property image
        */
        public image;

        /*
        * 
        * @property updatedRepeat
        * @type Kiwi.Signal
        */
        public updatedRepeat: Kiwi.Signal;
        
        /*
        *
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property position
        * @type Kiwi.Components.Position
        */
        public position: Kiwi.Components.Position;

        /*
        * 
        * @property size
        * @type Kiwi.Componenets.Size
        */
        public size: Kiwi.Components.Size;

        /*
        * 
        * @property cacheID
        * @type String
        */
        public cacheID: string;

        /*
        * 
        * @property REPEAR_NONE
        * @type String
        * @static
        */
        public static REPEAT_NONE: string = 'no-repeat';

        /*
        * 
        * @property REPEAT_X
        * @type String
        * @static
        */
        public static REPEAT_X: string = 'repeat-x';

        /*
        * 
        * @property REPEAT_Y
        * @type String
        * @static
        */
        public static REPEAT_Y: string = 'repeat-y';

        /*
        * 
        * @property REPEAT_BOTH
        * @type String
        * @static
        */
        public static REPEAT_BOTH: string = 'repeat';

        /*
        * 
        * @method repeat
        * @param {String} value
        * @return String
        */
        public repeat(value: string = null): string {

            if (value !== null && this._repeat !== value)
            {
                this._repeat = value;
                this.updatedRepeat.dispatch(value);
            }

            return this._repeat;

        }

        /*
        *
        * @method setCSS
        * @param {HTMLElement} element
        */
        public setCSS(element: HTMLElement) {
            element.style.backgroundImage = 'url("' + this.getURL() + '")';
            element.style.backgroundRepeat = this._repeat;
        }

        /*
        * 
        * @method getURL
        * @return String
        */
        public getURL(): string {
            return this.file.fileURL;
        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Texture (cacheID=' + this.cacheID + ' url=' + this.getURL() + ' repeat=' + this._repeat + ')}]';

        }

    }

}

