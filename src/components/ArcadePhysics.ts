
/*
 *	Kiwi - Components - ArcadePhysics
 *				
 *	@desc		Basic Arcade Physics - ported from Flixel (www.flixel.org)
 *				Most functions operate identically to the original flixel functions, though some
 *              have been split into multiple functions. Generally where functions originally accepted
 *              either groups or gameobjects within the same argument, the ported functions one or the other.
 *
 *	@version	1.0 - 1st April 2013
 *
 *	@author 	Adam 'Atomic' Saltsman

 *	@author		Ross Kettle (port)
 *
 *	@url		http://www.kiwijs.org
 *              http://www.adamatomic.com/
 *              
 *  @todo       implement camera space
 *              resolve clock issue
 *
*/

module Kiwi.Components {
     
    export class ArcadePhysics extends Kiwi.Component {

        /*
        * The Entity that this physics component belongs to.
        * @property _parent
        * @type Kiwi.Entity
        */
        private _parent: Entity;
        
        /*
        * The transform component.
        * @property transform
        * @type Kiwi.Geom.Transform
        */
        public transform: Kiwi.Geom.Transform;
        
        /*
        * The width component that this physics component uses.
        * @property width
        * @type number
        */
        public width: number;   //convert to hitbox 

        /*
        * The height that this physics component uses.
        * @property height
        * @type number
        */ 
        public height: number;

        /*
        *
        * @constructor
        * @param {Kiwi.Entity} entity 
        * @return {Kiwi.Components.ArcadePhysics}
        */
        constructor(entity:Kiwi.Entity) {
            super('ArcadePhysics');
            
            this._parent = entity;
            this.transform = this._parent.transform;
            this.width = this._parent.width;
            this.height = this._parent.height;

            this.last = new Kiwi.Geom.Point(this.transform.x, this.transform.y);
            this.mass = 1.0;
            this.elasticity = 0.0;

            this.immovable = false;
            this.moves = true;

            this.touching = ArcadePhysics.NONE;
            this.wasTouching = ArcadePhysics.NONE;
            this.allowCollisions = ArcadePhysics.ANY;

            this.velocity = new Kiwi.Geom.Point();
            this.acceleration = new Kiwi.Geom.Point();
            this.drag = new Kiwi.Geom.Point();
            this.maxVelocity = new Kiwi.Geom.Point(10000, 10000);

            this.angle = 0;
            this.angularVelocity = 0;
            this.angularAcceleration = 0;
            this.angularDrag = 0;
            this.maxAngular = 10000;
        }

        /*
        * The type of object that this is.
        * 
        * @method objType
        * @return {string}
        */
        public objType() {
            return "ArcadePhysics";
        }

        /**
         * Generic value for "left" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
         * @property LEFT
         * @type number
         */
        public static LEFT: number = 0x0001;

        /**
         * Generic value for "right" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
         * @property RIGHT
         * @type number
         */
        public static RIGHT: number = 0x0010;

        /**
         * Generic value for "up" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
         * @property UP
         * @type number
         */
        public static UP: number = 0x0100;

        /**
		 * Generic value for "down" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
		 * @property DOWN
         * @type number
         */
        public static DOWN: number = 0x1000;

        /**
         * Special-case constant meaning no collisions, used mainly by <code>allowCollisions</code> and <code>touching</code>.
         * @property NONE
         * @type number
         */
        public static NONE: number = 0;

        /**
         * Special-case constant meaning up, used mainly by <code>allowCollisions</code> and <code>touching</code>.
         * @property CEILING
         * @type number
         */
        public static CEILING: number = ArcadePhysics.UP;

        /**
         * Special-case constant meaning down, used mainly by <code>allowCollisions</code> and <code>touching</code>.
         * @property FLOOR
         * @type number
         */
        public static FLOOR: number = ArcadePhysics.DOWN;

        /**
         * Special-case constant meaning only the left and right sides, used mainly by <code>allowCollisions</code> and <code>touching</code>.
         * @property WALL
         * @type number
         */
        public static WALL: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT;

        /**
		 * Special-case constant meaning any direction, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 * @property ANY
         * @type number
         */
        public static ANY: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT | ArcadePhysics.UP | ArcadePhysics.DOWN;

        /**
		 * Handy constant used during collision resolution (see <code>separateX()</code> and <code>separateY()</code>).
		 * @property OVERLAP_BIAS
         * @type number
         */
        public static OVERLAP_BIAS: number = 4;

        /**
		 * Whether an object will move/alter position after a collision.
         * @property immovable
         * @type bool
		 */
        public immovable: bool;

        /**
         * The basic speed of this object.
         * @property velocity
         * @type Kiwi.Geom.Point
         */
        public velocity: Kiwi.Geom.Point;

        /**
		 * The virtual mass of the object. Default value is 1.
		 * Currently only used with <code>elasticity</code> during collision resolution.
		 * Change at your own risk; effects seem crazy unpredictable so far!
         * @property mass
         * @type number
		 */
        public mass: number;
        
        /**
         * The bounciness of this object.  Only affects collisions.  Default value is 0, or "not bouncy at all."
         * @property elasticity
         * @type number
         */
        public elasticity: number;

        /**
         * How fast the speed of this object is changing.
         * Useful for smooth movement and gravity.
         * @property acceleration
         * @type Kiwi.Geom.Point
         */
        public acceleration: Kiwi.Geom.Point;

        /**
         * This isn't drag exactly, more like deceleration that is only applied
         * when acceleration is not affecting the sprite.
         * @property drag
         * @type Kiwi.Geom.Point
         */
        public drag: Kiwi.Geom.Point;

        /**
         * If you are using <code>acceleration</code>, you can use <code>maxVelocity</code> with it
         * to cap the speed automatically (very useful!).
         * @property maxVelocity
         * @type Kiwi.Geom.Point
         */
        public maxVelocity: Kiwi.Geom.Point;

        /**
         * Set the angle of a sprite to rotate it.
         * WARNING: rotating sprites decreases rendering
         * performance for this sprite by a factor of 10x!
         * @property angle
         * @type number
         */
        public angle: number;

        /**
		 * This is how fast you want this sprite to spin.
		 * @property angularVelocity
         * @type number
         */
        public angularVelocity: number;
        
        /**
		 * How fast the spin speed should change.
         * @property angularAcceleration
         * @type number
		 */
        public angularAcceleration: number;
        
        /**
		 * Like <code>drag</code> but for spinning.
         * @property angularDrag
         * @type number
		 */
        public angularDrag: number;
        
        /**
         * Use in conjunction with <code>angularAcceleration</code> for fluid spin speed control.
         * @property maxAngular
         * @type number
         */
        public maxAngular: number;

        public moves: bool;

        /**
         * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts.
         * Use bitwise operators to check the values stored here, or use touching(), justStartedTouching(), etc.
         * You can even use them broadly as boolean values if you're feeling saucy!
         */
        public touching: number;

        /**
         * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts from the previous game loop step.
         * Use bitwise operators to check the values stored here, or use touching(), justStartedTouching(), etc.
         * You can even use them broadly as boolean values if you're feeling saucy!
         */
        public wasTouching: number;

        /**
		 * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision directions.
		 * Use bitwise operators to check the values stored here.
		 * Useful for things like one-way platforms (e.g. allowCollisions = UP;)
		 * The accessor "solid" just flips this variable between NONE and ANY.
		 */
        public allowCollisions: number;

        /**
		 * Important variable for collision processing.
		 * By default this value is set automatically during <code>preUpdate()</code>.
		 */
        public last: Kiwi.Geom.Point;

        /*
        * A boolean to indicate if this object is solid or not.
        * @private
        */
        private _solid: bool;

        /*
        * A function that is to execute when this object overlaps with another.
        * @private
        */
        private _callbackFunction: any = null;

        /*
        * The context that the callback method should have when it executes.
        * @private
        */
        private _callbackContext: any = null;

        /**
		 * Whether the object collides or not.  For more control over what directions
		 * the object will collide from, use collision constants (like LEFT, FLOOR, etc)
		 * to set the value of allowCollisions directly.
         * @method solid
         * @param {bool} value
         * @return bool
		 */
        public solid(value?: bool): bool {
            if (value !== undefined) {
                if (value)
                    this.allowCollisions = ArcadePhysics.ANY;
                else
                    this.allowCollisions = ArcadePhysics.NONE;
            }

                return (this.allowCollisions & ArcadePhysics.ANY) > ArcadePhysics.NONE;
        }

        ////////Static functions/////////

        /*
        * A Static method to check to see if two objects collide or not. Returns a boolean indicating weither they overlaped or not.
        *
        * @method collide
        * @param {Kiwi.GameObjects.Entity} gameObject1
        * @param {Kiwi.GameObjects.Entity} gameObject2
        * @param {bool} seperate
        * @return {bool}
        */
        public static collide(gameObject1: Entity, gameObject2: Entity, seperate:bool = true): bool {

            return ArcadePhysics.overlaps(gameObject1, gameObject2, seperate);
        }

        /*
        * A Static method to check to see if a single entity collides with a group of entities. Returns a boolean indicating weither they overlaped or not.
        *
        * @method collideGroup
        * @param {Kiwi.GameObjects.Entity} gameObject1
        * @param {Any} group
        * @param {bool} seperate
        * @return {bool}
        */
        public static collideGroup(gameObject: Entity, group: any, seperate:bool = true): bool {

            return ArcadePhysics.overlapsObjectGroup(gameObject, group, seperate);
        }

        /*
        * A Static method to check to see if a group of entities overlap with another group of entities. Returns a boolean indicating weither they overlaped or not.
        *
        * @method collideGroupGroup
        * @param {Kiwi.GameObjects.Entity} gameObject1
        * @param {Any} group
        * @param {bool} seperate
        * @return {bool}
        */
        public static collideGroupGroup(group1: any, group2: any, seperate:bool = true): bool {

            return ArcadePhysics.overlapsGroupGroup(group1, group2, seperate);
        }

        /*
        * A Static method to that checks to see if two objects overlap. Returns a boolean indicating weither they did or not.
        *
        * @method overlaps
        * @param {Kiwi.GameObjects.Entity} gameObject1
        * @param {Kiwi.GameObjects.Entity} gameObject2
        * @param {bool} separate
        * @return {bool}
        */
        public static overlaps(gameObject1: Entity, gameObject2: Entity, separateObjects: bool = true): bool {

            //Flixel uses quadtree here

            //object vs object
            var obj1Physics: ArcadePhysics = gameObject1.components.getComponent("ArcadePhysics");

            return obj1Physics.overlaps(gameObject2, separateObjects);

        }

        /*
        * A Static method to that checks to see if a single object overlaps with a group of entities. Returns a boolean indicating weither they did or not.
        *
        * @method overlaps
        * @param {Kiwi.GameObjects.Entity} gameObject1
        * @param {Any} group
        * @param {bool} separate - If they overlap should the seperate or not
        * @return {bool}
        */
        public static overlapsObjectGroup(gameObject: Entity, group: any, separateObjects: bool = true): bool {

            var objPhysics: ArcadePhysics = gameObject.components.getComponent("ArcadePhysics");
            return objPhysics.overlapsGroup(group, separateObjects);
        }

        /*
        * A Static method that checks to see if any objects in a group overlap with objects in another group.
        *
        * @method overlaps
        * @param {Any} gameObject1
        * @param {Any} gameObject2
        * @param {bool} separate - If they overlap should the seperate or not
        * @return {bool}
        */
        public static overlapsGroupGroup(group1: any, group2: any, separateObjects: bool = true): bool {
            
            var result: bool = false; 

            if (group1.childType !== undefined && group1.childType() === Kiwi.GROUP) {
                //if group1 is a type of group...

                var members: IChild[] = group1.members;
                var i: number = 0;
                
                while (i < group1.members.length) {
                    if (members[i].childType() == Kiwi.GROUP) {
                        if (ArcadePhysics.overlapsGroupGroup(<Kiwi.Group>members[i++], group2, separateObjects)) result = true;
                    } else {
                        if (ArcadePhysics.overlapsObjectGroup(<Kiwi.Entity>members[i++], group2, separateObjects)) result = true;
                    }
                }
            } else if (Object.prototype.toString.call(group1) == '[object Array]') {
                //loop through the array 
                for (var i = 0; i < group1.length; i++) {
                    if (group1[i].childType !== undefined && group1[i].childType() === Kiwi.ENTITY) {
                        if (ArcadePhysics.overlapsObjectGroup(<Kiwi.Entity>group1[i], group2, separateObjects)) 
                            result = true;
                    }
                }

            } 

            return result;
        }

        /*
        * A static method for seperating two objects. Both objects need to have physics, position and size components in order for this to work.
        * 
        * @method seperate
        * @param {Kiwi.Entity} object1
        * @param {Kiwi.Entity} object2
        * @return {bool}
        */
        public static separate(object1:Kiwi.Entity, object2:Kiwi.Entity): bool {
            
            var separatedX: bool = this.separateX(object1, object2);
            var separatedY: bool = this.separateY(object1, object2);
            return separatedX || separatedY;
        }

        /**
		 * The X-axis component of the object separation process.
		 * 
		 * @param	{Kiwi.Entity} object1
		 * @param	{Kiwi.Entity} object2
		 * 
		 * @return	Whether the objects in fact touched and were separated along the X axis.
		 */
        public static separateX(object1, object2): bool {

            var phys1: ArcadePhysics = <ArcadePhysics>object1.components._components["ArcadePhysics"];
            var phys2: ArcadePhysics = <ArcadePhysics>object2.components._components["ArcadePhysics"];

            //can't separate two immovable objects
            var obj1immovable: bool = phys1.immovable;
            var obj2immovable: bool = phys2.immovable;
            if (obj1immovable && obj2immovable)
                return false;

            //First, get the two object deltas
            var overlap: number = 0;
            var obj1delta: number = phys1.transform.x - phys1.last.x;
            var obj2delta: number = phys2.transform.x - phys2.last.x;
            
            if (obj1delta != obj2delta) { //perhaps remove this section.

                //Check if the X hulls actually overlap
                var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
                var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
                //where they were before
                var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys1.transform.x - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y, phys1.width + ((obj1delta > 0) ? obj1delta : -obj1delta), phys1.height);
                var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys2.transform.x - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y, phys2.width + ((obj2delta > 0) ? obj2delta : -obj2delta), phys2.height);
                if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                    var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                    //If they did overlap (and can), figure out by how much and flip the corresponding flags
                    if (obj1delta > obj2delta) {
                        overlap = phys1.transform.x + phys1.width - phys2.transform.x;
                        if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT)) {
                            overlap = 0;
                    } else {
                            phys1.touching |= ArcadePhysics.RIGHT;
                            phys2.touching |= ArcadePhysics.LEFT;
                        }
                    }
                    else if (obj1delta < obj2delta) {
                        overlap = phys1.transform.x - phys2.width - phys2.transform.x;
                        if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(phys2.allowCollisions & ArcadePhysics.RIGHT)) {
                            overlap = 0;
                        } else {
                            phys1.touching |= ArcadePhysics.LEFT;
                            phys2.touching |= ArcadePhysics.RIGHT;
                        }
                    }
                }
            }

            //Then adjust their positions and velocities accordingly (if there was any overlap)
            if (overlap != 0) {
                var obj1v: number = phys1.velocity.x;
                var obj2v: number = phys2.velocity.x;
                
                if (!obj1immovable && !obj2immovable) { //no beans...
                    overlap *= 0.5;
                    phys1.transform.x = phys1.transform.x - overlap;
                    phys2.transform.x = phys2.transform.x + overlap;

                    var obj1velocity: number = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                    var obj2velocity: number = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                    var average: number = (obj1velocity + obj2velocity) * 0.5;
                    obj1velocity -= average;
                    obj2velocity -= average;
                    phys1.velocity.x = average + obj1velocity * phys1.elasticity;
                    phys2.velocity.x = average + obj2velocity * phys2.elasticity;

                }
                else if (!obj1immovable) {
                    phys1.transform.x = phys1.transform.x - overlap;
                    phys1.velocity.x = obj2v - obj1v * phys1.elasticity;
                }
                else if (!obj2immovable) {

                    phys2.transform.x = phys2.transform.x + overlap;
                    phys2.velocity.x = obj1v - obj2v * phys2.elasticity;
                }
                return true;
            }
            else
                return false;
        }

        /**
		 * The Y-axis component of the object separation process.
		 * 
		 * @param	{Kiwi.Entity} object1
		 * @param	{Kiwi.Entity} object2
		 * 
		 * @return	Whether the objects in fact touched and were separated along the Y axis.
		 */
        public static separateY(object1, object2): bool {

            var phys1: ArcadePhysics = <ArcadePhysics>object1.components._components["ArcadePhysics"];
            var phys2: ArcadePhysics = <ArcadePhysics>object2.components._components["ArcadePhysics"];

            //can't separate two immovable objects
            var obj1immovable: bool = phys1.immovable;
            var obj2immovable: bool = phys2.immovable;
            if (obj1immovable && obj2immovable)
                return false;

            //removed tilemaps

            //First, get the two object deltas
            var overlap: number = 0;

            var obj1delta: number = phys1.transform.y - phys1.last.y;

            var obj2delta: number = phys2.transform.y - phys2.last.y;
            if (obj1delta != obj2delta) {
                //Check if the Y hulls actually overlap
                var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
                var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
                var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys1.transform.x, phys1.transform.y - ((obj1delta > 0) ? obj1delta : 0), phys1.width, phys1.height + obj1deltaAbs);
                var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys2.transform.x, phys2.transform.y - ((obj2delta > 0) ? obj2delta : 0), phys2.width, phys2.height + obj2deltaAbs);
                if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                    var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;
                    //If they did overlap (and can), figure out by how much and flip the corresponding flags
                    if (obj1delta > obj2delta) {
                        overlap = phys1.transform.y + phys1.height - phys2.transform.y;
                        if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                            overlap = 0;
                        } else {
                            phys1.touching |= ArcadePhysics.DOWN;
                            phys2.touching |= ArcadePhysics.UP;
                        }
                    }
                    else if (obj1delta < obj2delta) {
                        overlap = phys1.transform.y - phys2.height - phys2.transform.y;
                        if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.UP) || !(phys2.allowCollisions & ArcadePhysics.DOWN)) {
                            overlap = 0;
                        } else {
                            phys1.touching |= ArcadePhysics.UP;
                            phys2.touching |= ArcadePhysics.DOWN;
                        }
                    }
                }
            }

            //Then adjust their positions and velocities accordingly (if there was any overlap)
            if (overlap != 0) {
                var obj1v: number = phys1.velocity.y;
                var obj2v: number = phys2.velocity.y;

                if (!obj1immovable && !obj2immovable) {
                    overlap *= 0.5;
                    phys1.transform.y = phys1.transform.y - overlap;
                    phys2.transform.y = phys2.transform.y + overlap;

                    var obj1velocity: number = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                    var obj2velocity: number = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                    var average: number = (obj1velocity + obj2velocity) * 0.5;
                    obj1velocity -= average;
                    obj2velocity -= average;
                    phys1.velocity.y = average + obj1velocity * phys1.elasticity;
                    phys2.velocity.y = average + obj2velocity * phys2.elasticity;
                }
                else if (!obj1immovable) {
                    phys1.transform.y = phys1.transform.y - overlap;
                    phys1.velocity.y = obj2v - obj1v * phys1.elasticity;
                    //This is special case code that handles cases like horizontal moving platforms you can ride
                    if (object2.active && phys2.moves && (obj1delta > obj2delta))
                        phys1.transform.x = phys1.transform.x + object2.transform.x - phys2.last.x; 
                }
                else if (!obj2immovable) {
                    phys2.transform.y = phys2.transform.y + overlap;
                    phys2.velocity.y = obj1v - obj2v * phys2.elasticity;
                    //This is special case code that handles cases like horizontal moving platforms you can ride
                    if (object1.active && phys1.moves && (obj1delta < obj2delta))
                        phys2.transform.x = phys2.transform.x + object1.transform.x - phys1.last.x; 
                }
                return true;
            }
            else
                return false;

        }

        /*
        * CURRENTLY UNTESTED...
        */
        public static computeVelocity(velocity: number, acceleration: number = 0, drag: number = 0, max: number = 10000): number {

            if (acceleration != 0)
                velocity += acceleration * ArcadePhysics.updateInterval;
            else if (drag != 0) {
                drag = drag * ArcadePhysics.updateInterval;
                if (velocity - drag > 0)
                    velocity = velocity - drag;
                else if (velocity + drag < 0)
                    velocity += drag;
                else
                    velocity = 0;
            }
            if ((velocity != 0) && (max != 10000)) {
                if (velocity > max)
                    velocity = max;
                else if (velocity < -max)
                    velocity = -max;
            }
            return velocity;
        }


        ////////Instance Functions/////////

        /*
        * A method to check to see if the parent of this physics component overlaps with another Kiwi.Entity.
        * 
        * @method overlaps
        * @param { Kiwi.Entity } gameObject
        * @param { bool } seperateObjects
        * @return { bool }
        */
        public overlaps(gameObject:Entity, separateObjects: bool = false): bool {
            
            var objTransform: Kiwi.Geom.Transform = gameObject.transform;

            var result: bool = (objTransform.x + gameObject.width > this.transform.x) && (objTransform.x < this.transform.x + this.width) &&
                (objTransform.y + gameObject.height > this.transform.y) && (objTransform.y < this.transform.y + this.height);

            if (result && separateObjects) {
                ArcadePhysics.separate(this._parent, gameObject);
            }

            if (result && this._callbackFunction !== null && this._callbackContext !== null) {
                this._callbackFunction.call(this._callbackContext, this._parent, gameObject);
            }

            return result;

        }

        /*
        * A method to check to see if the parent of this physics component overlaps with another group of objects
        * 
        * @method overlaps
        * @param { Kiwi.Group } gameObject
        * @param { bool } seperateObjects
        * @return { bool }
        */
        public overlapsGroup(group: any, separateObjects: bool = false): bool {
            
            //if the group is a Kiwi.Group
            var results: bool = false;
            
            if (group.childType !== undefined && group.childType() === Kiwi.GROUP) {

                for (var i = 0; i < group.members.length; i++) {

                    if (group.members[i].childType() === Kiwi.GROUP) {
                        //recursively check overlap
                        this.overlapsGroup(<Kiwi.Group>group.members[i], separateObjects);

                    } else {
                        //otherwise its an entity

                        if (this.overlaps(<Kiwi.Entity>group.members[i], separateObjects)) {
                            if (this._callbackContext !== null && this._callbackFunction !== null)
                                this._callbackFunction.call(this._callbackContext, this._parent, group.members[i]);
                            results = true;
                        }

                    }
                }
            } else if (Object.prototype.toString.call(group) == '[object Array]') {
                //loop through the array

                for (var i = 0; i < group.length; i++) {
                    if (group[i].childType !== undefined && group[i].childType() === Kiwi.ENTITY) {
                        if (this.overlaps(<Kiwi.Entity>group[i], separateObjects)) {
                            this._callbackFunction.call(this._callbackContext, this._parent, group[i]);
                            results = true;
                        }
                    }
                }

            } 

            return results;

        }

        /*
        * Updates the motion...
        * UNTESTED.
        */
        public updateMotion() {
            
            var delta: number;
            var velocityDelta: number;
            
            
            velocityDelta = (ArcadePhysics.computeVelocity(this.angularVelocity, this.angularAcceleration, this.angularDrag, this.maxAngular) - this.angularVelocity) / 2;
            this.angularVelocity += velocityDelta;
            this.angle += this.angularVelocity * ArcadePhysics.updateInterval;
            this.angularVelocity += velocityDelta;
           
            velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.x, this.acceleration.x, this.drag.x, this.maxVelocity.x) - this.velocity.x) / 2;
            this.velocity.x += velocityDelta;
            delta = this.velocity.x * ArcadePhysics.updateInterval;
            this.velocity.x += velocityDelta;
            this.transform.x = this.transform.x + delta;

            velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
            this.velocity.y += velocityDelta;
            delta = this.velocity.y * ArcadePhysics.updateInterval;
            this.velocity.y += velocityDelta;
            this.transform.y = this.transform.y + delta;

        }
    
        /*
        * Sets up a callback function that will run when this object overlaps with another.
        * 
        * @method setCallback
        * @param {function} callbackFunction
        * @param {any} callbackContext
        */
        public setCallback(callbackFunction, callbackContext) {
            
            this._callbackFunction = callbackFunction;
            this._callbackContext = callbackContext;

        }

        /*
        * Returns the parent of this entity. Mainly used for executing callbacks.
        *
        * @method parent
        * @return {Kiwi.Entity}
        */
        public parent() {
            return this._parent;
        }

        /*
        * The Update loop of the physics component
        */
        public update() {

            //Flixel preupdate
            this.last.x = this.transform.x;
            this.last.y = this.transform.y;

            //update width/height. Needs to find better spot
            this.width = this._parent.width;
            this.height = this._parent.height;

            //Flixel postupdate
            if (this.moves)
                this.updateMotion();

            this.wasTouching = this.touching;
            this.touching = ArcadePhysics.NONE;


        }

        

    }

}

