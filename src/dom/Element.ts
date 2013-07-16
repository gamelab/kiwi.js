/// <reference path="../core/Game.ts" />

/**
 *  Kiwi - DOM - Element
 *
 *  @desc       A DOM element linked to an Entity or Group
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

    export class Element {

        /** 
        * 
        * @constructor
        * @param {String} id
        * @param {Kiwi.DOM.Cache} cache
        * @param {String} type
        * @return {Kiwi.DOM.Element}
        **/
        constructor(id: string, cache: Kiwi.DOM.Cache, type: string = 'div') {

            this._cache = cache;

            this.id = id;
            this.entity = null;
            this.type = type;
            this.available = true;

            this.element = <HTMLElement> document.createElement(this.type);
            this.element.id = this.id;
            this.element.style.display = 'block';
            this.element.style.position = 'absolute';

        }

        public objType() {
            return "Element";
        }

        /** 
        * 
        * @property _cache
        * @type Kiwi.DOM.Cache
        * @private
        **/
        private _cache: Kiwi.DOM.Cache;

        /** 
        * 
        * @property id
        * @type String
        **/
        public id: string;

        /** 
        * 
        * @property available
        * @type Boolean
        **/
        public available: bool;

        /** 
        * 
        * @property element
        * @type HTMLElement
        **/
        public element: HTMLElement;

        /** 
        * 
        * @property type
        * @type String
        **/
        public type: string;

        /** 
        * 
        * @property entity
        * @type Any
        **/
        public entity;

        /** 
        * 
        * @method link
        * @param {Any} entity
        * @return {Kiwi.DOM.Element}
        **/
        public link(entity): Kiwi.DOM.Element {

            this.entity = entity;
            this.entity.domElement = this;
            this.available = false;

            if (this.entity.isGroup() === true)
            {
                klog.info('DOM.Element ' + this.id + ' linking with Group');
                this._cache.domContainer.appendChild(this.element);
            }
            else
            {
                if (this.entity.parent !== null)
                {
                    klog.info('DOM.Element ' + this.id + ' linking with Group Member');
                    this.entity.parent.domElement.element.appendChild(this.element);
                }
                else
                {
                    klog.info('DOM.Element ' + this.id + ' linking with Entity');
                    this._cache.domContainer.appendChild(this.element);
                }
            }

            return this;

        }

        /** 
        * 
        * @method unlink
        **/
        public unlink() {

            this.available = true;
            //this.element['style'] = '';
            //this.element.innerText = '';
            //this.element.innerHTML = '';
            this.element.parentNode.removeChild(this.element);

            this.element = <HTMLElement> document.createElement(this.type);
            this.element.id = this.id;
            this.element.style.display = 'block';
            this.element.style.position = 'absolute';


        }

    }

}