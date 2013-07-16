/// <reference path="../components/Position.ts" />
/// <reference path="../components/Color.ts" />

/**
 *	Kiwi - GameObjects - LinkedGroup
 *				
 *	@desc		A Group with Position
 *
 *	@version	1.0 - 19th March 2013
 *
 *	@author 	Richard Davey
 *
 *	@url		http://www.kiwijs.org
 *
 **/

module Kiwi.GameObjects {

    export class LinkedGroup extends Kiwi.Group {

        /*
        * 
        * @constructor
        * @param {String} name
        * @return {Kiwi.Group}
        */
        constructor(name: string = '', x: number = 0, y: number = 0, z: number = 0) {

            super(name);

            this.position = this.components.add(new Kiwi.Components.Position(x, y, z));

            this.position.updated.add(this._updatedPosition, this);

        }

        public objType() {
            return "LinkedGroup";
        }

        public position: Kiwi.Components.Position;

        private _updatedPosition(x, y, z) {

            this.forEach(this, this._updateChild, x, y);

        }

        private _updateChild(child: Kiwi.Entity, x, y) {

            if (child.components.hasActiveComponent('Position'))
            {
                //  Type-safe access to the component with code-insight, but creates a new temp var
                //var p: Kiwi.Components.Position = child.components.getComponent('Position');
                //p.addTo(this.position.differenceX, this.position.differenceY);

                //  Type un-safe access (but saves creating a new temporary var)
                child.components.getComponent('Position').addTo(this.position.differenceX, this.position.differenceY);
            }

        }

    }

}
