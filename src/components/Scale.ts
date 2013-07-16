/// <reference path="../core/Component.ts" />
/// <reference path="../geom/Point.ts" />

/*
 *	Kiwi - Components - Scale
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

    export class Scale extends Component {

        /*
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        * @return {Scale}
        */
        constructor(x: number = 1, y: number = 1, z: number = 1) {

            super('Scale', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            //this.setTo(width, height);

            this.setXYZ(x, y, z);

            //  Process the component
            this._processUpdate();

        }

        public objType() {
            return "Scale";
        }

        //  Subscribe to this Signal to receive scale updates

        /*
        * 
        * @property updated
        * @type Kiwi.Signal
        */
        public updated: Kiwi.Signal;

        /*
        * 
        * @property _x
        * @type Number
        * @private
        */
        private _x: number;

        /*
        * 
        * @property _y
        * @type Number
        * @private
        */
        private _y: number;

        /*
        * 
        * @property _z
        * @type Number
        * @private
        */
        private _z: number;

        /*
        * 
        * @property aspectRatio
        * @type Number
        */
        public aspectRatio: number;

        

        /*
        * x
        * @method
        * @param {Number} value
        * @return {Number}
        */
        public x(value: number = null): number {
            
            if (value !== null)
            {
                this._x = value;
            }
            
            this._processUpdate();
            return this._x;

        }

        /*
        * 
        * @method y
        * @param {Number} value
        * @return {Number}
        */
        public y(value: number = null): number {

            if (value !== null)
            {
                this._y = value;
            }
            this._processUpdate();
            return this._y;

        }

        /*
        * 
        * @method setXY
        * @param {Number} x
        * @param {Number} y
        */
        public setXY(x: number = 1, y: number = 1) {

            this._x = x;
            this._y = y;
            this._processUpdate();

        }

        /*
        * 
        * @method setXYZ
        * @param {Number} x
        * @param {Number} y
        * @param {Number} z
        */
        public setXYZ(x: number = 1, y: number = 1, z: number = 1) {

            this._x = x;
            this._y = y;
            this._z = z;
            this._processUpdate();

        }

        //  This string contains the CSS needed for this component (if any) to avoid constant string re-generation
        public cssScale3d: string;



        //  If the component deals with setting the style value of a DOM object then use this method to add a style to the update queue
        public addStyleUpdates(entity: Kiwi.Entity) {
            
            if (entity === null) {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D) {
                
                //  Apply the advanced CSS here, if any
                //entity.addStyleUpdate('transform', this.cssRotate3d);
                //entity.addStyleUpdate('-o-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-ms-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-moz-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-webkit-transform', this.cssRotate3d);

                entity.addStyleTransformUpdate("scale", this.cssScale3d);
            }
            else {
                //  Otherwise a normal style update is fine :)
           //     entity.addStyleUpdate('less-super', this.cssRotate3d);
            }

        }

        /*
        * 
        * @method addStyleImmediately
        * @param {Kiwi.Entity} entity
        */
        public addStyleImmediately(entity: Kiwi.Entity) {
            
            if (entity.domElement === null || entity.domElement.element === null) {
                return;
            }

            if (Kiwi.DEVICE.css3D) {
                this.entity.addStyleTransformUpdate("scale", this.cssScale3d);
                this.entity.applyTransformStyle();

             //   entity.domElement.element.style.transform = this.cssRotate3d;
             //   entity.domElement.element.style['-o-transform'] = this.cssRotate3d;
             //   entity.domElement.element.style['-ms-transform'] = this.cssRotate3d;
             //   entity.domElement.element.style['-moz-transform'] = this.cssRotate3d;
             //   entity.domElement.element.style['-webkit-transform'] = this.cssRotate3d;
            }
            else {
                //entity.domElement.element.style.left = this.cssLeft;
                //entity.domElement.element.style.top = this.cssTop;
            }

        }

        /*
        * 
        * @method _processUpdate
        * @private
        */
        private _processUpdate() {
            
            //this.aspectRatio = this._width / this._height;
            this.dirty = true;
            
            
            //  Then store the updated css string, if any
            this.cssScale3d = 'scale(' + this._x + ',' + this._y + ')';

            this.updated.dispatch(this._x, this._y);

        }

        /*
        * 
        * @method setCSS
        * @param {HTMLElement} element
        * @return {HTMLElement}
        */
        public setCSS(element: HTMLElement): HTMLElement {

            //element.style.width = this._width + 'px';
            //element.style.height = this._height + 'px';

            return element;

        }

        /*
        * 
        * @method invert
        */
        public invert() {

            if (this._x === this._y)
            {
                return;
            }
            else
            {
                this.setXY(this._y, this._x);
            }

        }

        /*
        * 
        * @method setScaleFromPoint
        * @param {Kiwi.Geom.Point} point
        */
        public setScaleFromPoint(point: Kiwi.Geom.Point) {

            this.setXY(point.x, point.y);

        }

        /*
        * 
        * @method getScaleAsPoint
        * @param {Kiwi.Geom.Point} output
        * @return {Kiwi.Geom.Point}
        */
        public getScaleAsPoint(output: Kiwi.Geom.Point = new Kiwi.Geom.Point): Kiwi.Geom.Point {

            return output.setTo(this._x, this._y);

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Scale (x=' + this._x + ' y=' + this._y + ')}]';

        }

    }

}

