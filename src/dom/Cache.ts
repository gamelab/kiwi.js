/// <reference path="../core/Game.ts" />
/// <reference path="../core/FileCache.ts" />

/**
 *  Kiwi - DOM - Cache
 *
 *  @desc       The DOM Cache manages the pool of DOM objects in existence across a single Layer in the game
 *
 *	@version 	1.0 - March 5th 2013
 *
 *	@author 	Richard Davey
 *
 *  @url        http://www.kiwijs.org
 *
 *  @todo       
 *
 */

module Kiwi.DOM {

    export class Cache {

        /**
        * 
        * @constructor
        * @param {Kiwi.Layer} parent
        * @param {Kiwi.Game} game
        * @param {Number} size
        * @return {Kiwi.Cache}
        */
        constructor(parent: Kiwi.Layer, game: Kiwi.Game, size: number) {

            this._parent = parent;
            this._game = game;
            this.domContainer = this._parent.domContainer;

            //  We can do this here because a DOM Cache isn't created until a Layer is created, which doesn't happen until after DOM boot
            this._cache = [];

            this._swapperA = <HTMLElement> document.createElement('div');
            this._swapperA.id = 'KiwiDOMSwapperA';

            this._swapperB = <HTMLElement> document.createElement('div');
            this._swapperB.id = 'KiwiDOMSwapperB';

            this._parent.domContainer.appendChild(this._swapperA);
            this._parent.domContainer.appendChild(this._swapperB);

            //  Seed our pool with dom nodes
            for (var i = 0; i < size; i++)
            {
                this._cache.push(new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + i, this));
            }

        }

        public objType() {
            return "Cache";
        }

        /** 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /** 
        * @property _parent
        * @type Kiwi.Layer
        * @private
        **/
        private _parent: Kiwi.Layer;

        /** 
        * @property _cache
        * @type Array
        * @private
        **/
        private _cache: Kiwi.DOM.Element[];

        /** 
        * @property _swapperA
        * @type HTMLElement
        * @private
        **/
        private _swapperA: HTMLElement;

        /** 
        * @property _swapperB
        * @type HTMLElement
        * @private
        **/
        private _swapperB: HTMLElement;

        /**
        * The dom element into which all child elements are added (a reference to the parent Layers domContainer)
        * @property domContainer
        * @type HTMLElement
	    */
        public domContainer: HTMLElement;

         
        /** 
        * Increases the size of this dom cache by adding the given value to the current total, returns new cache size
        * @method increasesCacheSize
        * @param {Number} value
        * @return {Number}
        **/
        public increaseCacheSize(value: number): number {

            for (var i = this._cache.length; i < this._cache.length + value; i++)
            {
                this._cache.push(new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + i, this));
            }

            return this._cache.length;

        }

        /** 
        * 
        * @method assignElement
        * @param {Anty} parent
        * @return {Kiwi.DOM.Element}
        **/
        public assignElement(parent): Kiwi.DOM.Element {

            for (var i = 0; i < this._cache.length; i++)
            {
                if (this._cache[i].available === true && this._cache[i].type === parent.domElementType)
                {
                    return this._cache[i].link(parent);
                }
            }

            //  If we got this far then all of the current elements are in use or of the wrong type, so let's expand the cache size by 1
            klog.info("If we got this far then all of the current elements are in use or of the wrong type, so let's expand the cache size by 1");

            var index:number = this._cache.length;
            var newElement: Kiwi.DOM.Element = new Kiwi.DOM.Element('KiwiLayer_' + this._parent.id + 'Element_' + index, this, parent.domElementType);

            this._cache.push(newElement);

            return newElement.link(parent);

        }

        //public swapEntities(first: Kiwi.Entity, second: Kiwi.Entity) {

        //    this.swapElements(first.domElement, second.domElement);

        //}

        /** 
        * 
        * @method swapElements
        * @param {Kiwi.DOM.Element} first
        * @param {Kiwi.DOM.Element} second 
        * @return {Boolean}
        **/
        public swapElements(first: Kiwi.DOM.Element, second: Kiwi.DOM.Element): bool {

            klog.info('DOM Swapping Test 8');

            first.element = <HTMLElement>first.element.parentElement['replaceChild'](this._swapperA, first.element);
            second.element = <HTMLElement>second.element.parentElement['replaceChild'](this._swapperB, second.element);

            this._swapperA = <HTMLElement>this._swapperA.parentElement['replaceChild'](second.element, this._swapperA);
            this._swapperB = <HTMLElement>this._swapperB.parentElement['replaceChild'](first.element, this._swapperB);

            return true;

        }

    }

}