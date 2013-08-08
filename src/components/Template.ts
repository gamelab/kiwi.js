/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Title
 *
 *	@desc		Description
 *
 *	@version	1.0 - ? February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Template extends Component {

        //  Default parameters for the component, in this template we've got just x
        constructor(x: number = 0) {

            //  The components name and the layer types it works with: canvas, dom, webgl
            super('Template');

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            x = Math.round(x);

            //  Process the component
            this._processUpdate();

        }

        public objType() {
            return "Template";
        }

        //  This string contains the CSS needed for this component (if any) to avoid constant string re-generation
        public cssExampleProperty: string;

        //  Subscribe to this Signal to receive position updates
        public updated: Kiwi.Signal;

        //  Our example property, usually private
        private _x: number;



        //  If the component deals with setting the style value of a DOM object then use this method to add a style to the update queue
        public addStyleUpdates(entity: Kiwi.Entity) {

            if (entity === null)
            {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D)
            {
                //  Apply the advanced CSS here, if any
                entity.addStyleUpdate('-webkit-super-thingy', this.cssExampleProperty);
            }
            else
            {
                //  Otherwise a normal style update is fine :)
                entity.addStyleUpdate('less-super', this.cssExampleProperty);
            }

        }

        //  Sometimes you need to set the style immediately rather than defering it to the next update loop, if so use this method
        public addStyleImmediately(entity: Kiwi.Entity) {

            if (entity.domElement === null || entity.domElement.element === null)
            {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D)
            {
                //  Apply the advanced CSS here, if any
                entity.domElement.element.style.transform = this.cssExampleProperty;
            }
            else
            {
                //  Otherwise a normal style update is fine :)
                entity.domElement.element.style.left = this.cssExampleProperty;
            }

        }

        //  You should bundle property updates together into a single private method and call it from the getters
        private _processUpdate() {

            //  Process the properties first

            //  Then store the updated css string, if any
            this.cssExampleProperty = 'translate3d(' + this._x + 'px)';

            //  Set the component to be dirty
            this.dirty = true;

            //  And finally dispatch the update signal, passing in as many (or as few) parameters as you wish
            this.updated.dispatch(this._x, this.cssExampleProperty);

        }

        //  An example getter/setter combo
        public x(value: number = null): number {

            //  The null check is important here, as is the comparison to avoid costly style updates if nothing changed
            if (value !== null && value !== this._x)
            {
                //  Store it
                this._x = value;
                //  and Process it
                this._processUpdate();
            }

            //  Finally return the new value
            return this._x;

        }

        //  If you have multiple things they can change, bundle them together into a setTo method
        public setTo(x: number, y: number, z:number = 0) {

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Template (x=' + this._x + ')}]';

        }

    }

}


