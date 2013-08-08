/// <reference path="../core/Component.ts" />
/// <reference path="../utils/GameMath.ts" />

/*
 *	Kiwi - Components - Rotation
 *
 *	@desc		A Rotation component. The rotation is specified in degrees -180 to 180. A value of 0 is right, 90 is down, etc.
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Rotation extends Component {

        /**
        * Creates a new Rotation component. The rotation is specified in degrees -180 to 180. A value of 0 is right, 90 is down, etc.
        * @class Rotation
        * @constructor
        * @param {Number} angle The angle of rotation in degrees (-180 to 180)
        * @return {Rotation} This rotation object
        **/
        constructor(angle: number = 0) {

            super('Rotation');

            //  Signals
            this.updated = new Kiwi.Signal();

            this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(angle);
            this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);

            
            //  Process the component
            this._processUpdate();

        }

        public objType() {
            return "Rotation";
        }

        //  This string contains the CSS needed for this component (if any) to avoid constant string re-generation
        public cssRotate3d: string;

        //  If the component deals with setting the style value of a DOM object then use this method to add a style to the update queue
        public addStyleUpdates(entity: Kiwi.Entity) {
            
            if (entity === null) {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D) {
                //this.cssRotate3d = "rotate(45deg)";
                //  Apply the advanced CSS here, if any
                //entity.addStyleUpdate('transform', this.cssRotate3d);
                //entity.addStyleUpdate('-o-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-ms-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-moz-transform', this.cssRotate3d);
                //entity.addStyleUpdate('-webkit-transform', this.cssRotate3d);
                
                entity.addStyleTransformUpdate("rotate", this.cssRotate3d);
            }
            else {
                //  Otherwise a normal style update is fine :)
                entity.addStyleUpdate('less-super', this.cssRotate3d);
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
                
                this.entity.addStyleTransformUpdate("rotate", this.cssRotate3d);
                this.entity.applyTransformStyle();

            }
            else {
                //entity.domElement.element.style.left = this.cssLeft;
                //entity.domElement.element.style.top = this.cssTop;
            }

        }


           //  You should bundle property updates together into a single private method and call it from the getters
        private _processUpdate() {
            
            //  Process the properties first

            //  Then store the updated css string, if any
            this.cssRotate3d = 'rotate(' + this._angleDegrees + 'deg)';

            //  Set the component to be dirty
            this.dirty = true;

            //  And finally dispatch the update signal, passing in as many (or as few) parameters as you wish
            this.updated.dispatch(this._angleDegrees, this.cssRotate3d);

        }

         //  Subscribe to this Signal to receive position updates
        public updated: Kiwi.Signal;


        /*
        * 
        * @property _angleRadians
        * @type Number
        * @private
        */
        private _angleRadians: number;

        /*
        * 
        * @property _angleDegrees
        * @type Number
        * @private
        */
        private _angleDegrees: number;

        /*
        * 
        * @method angle
        * @param {Number} value
        * @return {Number}
        */
        public angle(value: number = null): number {

            if (value !== null)
            {
                this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(value);
                this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);
            }
            this._processUpdate();
            return this._angleDegrees;

        }

        /*
        * 
        * @method radians
        * @param {Number} value
        * @return {Number}
        */
        public radians(value: number = null): number {

            if (value !== null)
            {
                this._angleDegrees = Kiwi.Utils.GameMath.wrapAngle(Kiwi.Utils.GameMath.radiansToDegrees(value));
                this._angleRadians = Kiwi.Utils.GameMath.degreesToRadians(this._angleDegrees);
            }
            this._processUpdate();
            return this._angleRadians;

        }

        /*
        * 
        * @method roateClockwise
        * @param {Number} value
        */
        public rotateClockwise(value: number) {
            this.angle(this._angleDegrees + value);
            this._processUpdate();
        }

        /*
        * 
        * @method roateCounterClockwise
        * @param {Number} value
        */
        public rotateCounterClockwise(value: number) {
            this.angle(this._angleDegrees - value);
            this._processUpdate();
        }

        /*
        * 
        * @method pointUp
        */
        public pointUp() {
            this.angle(-90);
            this._processUpdate();
        }

        /*
        * 
        * @method pointDown
        */
        public pointDown() {
            this.angle(90);
            this._processUpdate();
        }

        /*
        * 
        * @method pointLeft
        */
        public pointLeft() {
            this.angle(180);
            this._processUpdate();
        }

        /*
        * 
        * @method pointRight
        */
        public pointRight() {
            this.angle(0);
            this._processUpdate();
        }

        /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        public toString(): string {

            return "[{Rotation (angle=" + this._angleDegrees + " radians=" + this._angleRadians + ")}]";

        }

    }

}

