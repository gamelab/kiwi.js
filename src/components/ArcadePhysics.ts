
/// <reference path="../Kiwi.ts" />

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

        private _parent: Entity;
        public position: Kiwi.Components.Position;
        public size: Kiwi.Components.Size;


        constructor(entity:Kiwi.Entity,position:Kiwi.Components.Position,size:Kiwi.Components.Size) {
            super('ArcadePhysics',true,true,true);
            
            this._parent = entity;
            this.position = position;
            this.size = size;

            this.last = new Kiwi.Geom.Point(this.position.x(), this.position.y());
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

        public objType() {
            return "ArcadePhysics";
        }

        //************* needs replacing with clock implementation ************
        public static updateInterval: number = 1 / 10;

        /**
		 * Generic value for "left" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
		 */
        public static LEFT: number = 0x0001;
        /**
		 * Generic value for "right" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
		 */
        public static RIGHT: number = 0x0010;
        /**
		 * Generic value for "up" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
		 */
        public static UP: number = 0x0100;
        /**
		 * Generic value for "down" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
		 */
        public static DOWN: number = 0x1000;

        /**
		 * Special-case constant meaning no collisions, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 */
        public static NONE: number = 0;
        /**
		 * Special-case constant meaning up, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 */
        public static CEILING: number = ArcadePhysics.UP;
        /**
		 * Special-case constant meaning down, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 */
        public static FLOOR: number = ArcadePhysics.DOWN;
        /**
		 * Special-case constant meaning only the left and right sides, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 */
        public static WALL: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT;
        /**
		 * Special-case constant meaning any direction, used mainly by <code>allowCollisions</code> and <code>touching</code>.
		 */
        public static ANY: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT | ArcadePhysics.UP | ArcadePhysics.DOWN;

        /**
		 * Handy constant used during collision resolution (see <code>separateX()</code> and <code>separateY()</code>).
		 */
        public static OVERLAP_BIAS: number = 4;

        /**
		 * Whether an object will move/alter position after a collision.
		 */
        public immovable: bool;

        /**
		 * The basic speed of this object.
		 */
        public velocity: Kiwi.Geom.Point;
        /**
		 * The virtual mass of the object. Default value is 1.
		 * Currently only used with <code>elasticity</code> during collision resolution.
		 * Change at your own risk; effects seem crazy unpredictable so far!
		 */
        public mass: number;
        /**
		 * The bounciness of this object.  Only affects collisions.  Default value is 0, or "not bouncy at all."
		 */
        public elasticity: number;
        /**
		 * How fast the speed of this object is changing.
		 * Useful for smooth movement and gravity.
		 */
        public acceleration: Kiwi.Geom.Point;
        /**
		 * This isn't drag exactly, more like deceleration that is only applied
		 * when acceleration is not affecting the sprite.
		 */
        public drag: Kiwi.Geom.Point;
        /**
		 * If you are using <code>acceleration</code>, you can use <code>maxVelocity</code> with it
		 * to cap the speed automatically (very useful!).
		 */
        public maxVelocity: Kiwi.Geom.Point;
        /**
		 * Set the angle of a sprite to rotate it.
		 * WARNING: rotating sprites decreases rendering
		 * performance for this sprite by a factor of 10x!
		 */
        public angle: number;
        /**
		 * This is how fast you want this sprite to spin.
		 */
        public angularVelocity: number;
        /**
		 * How fast the spin speed should change.
		 */
        public angularAcceleration: number;
        /**
		 * Like <code>drag</code> but for spinning.
		 */
        public angularDrag: number;
        /**
		 * Use in conjunction with <code>angularAcceleration</code> for fluid spin speed control.
		 */
        public maxAngular: number;
        /**
		 * Should always represent (0,0) - useful for different things, for avoiding unnecessary <code>new</code> calls.
		 */
        //static _pZero: Kiwi.Geom.Point = new Kiwi.Geom.Point();

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


        private _solid: bool;

        /**
		 * Whether the object collides or not.  For more control over what directions
		 * the object will collide from, use collision constants (like LEFT, FLOOR, etc)
		 * to set the value of allowCollisions directly.
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

        


        public static collide(gameObject1: Entity, gameObject2: Entity, notifyCallback: Function = null): bool {

            return ArcadePhysics.overlaps(gameObject1, gameObject2, notifyCallback, true);
        }

        public static collideGroup(gameObject: Entity, group: Group, notifyCallback: Function = null): bool {

            return ArcadePhysics.overlapsObjectGroup(gameObject, group, notifyCallback, true);
        }

        public static collideGroupGroup(group1: Group, group2: Group, notifyCallback: Function = null): bool {

            return ArcadePhysics.overlapsGroupGroup(group1, group2, notifyCallback, true);
        }

        public static overlaps(gameObject1: Entity, gameObject2: Entity, notifyCallback: Function = null, separateObjects: bool = true): bool {

            //check if there is an overlap
            //Flixel uses quadtree here

            //object vs object
            var obj1Physics: ArcadePhysics = gameObject1.components.getComponent("ArcadePhysics");

            return obj1Physics.overlaps(gameObject2, separateObjects);

        }


        //notify callbacks not currently set up - should use signals?
        public static overlapsObjectGroup(gameObject: Entity, group: Group, notifyCallback: Function = null, separateObjects: bool = true): bool {

            var objPhysics: ArcadePhysics = gameObject.components.getComponent("ArcadePhysics");
            return objPhysics.overlapsGroup(group, separateObjects);
        }

        public static overlapsGroupGroup(group1: Group, group2: Group, notifyCallback: Function = null, separateObjects: bool = true): bool {
            var result: bool = false;
            var members: Entity[] = group1.members;
            var i: number = 0;
            while (i < group1.members.length) {
                result = ArcadePhysics.overlapsObjectGroup(members[i++], group2, notifyCallback, separateObjects);
            }
            return result;

        }

        public static separate(object1, object2): Boolean {

            var separatedX: bool = this.separateX(object1, object2);
            var separatedY: bool = this.separateY(object1, object2);
            return separatedX || separatedY;
        }

        /**
		 * The X-axis component of the object separation process.
		 * 
		 * @param	Object1 	Any <code>FlxObject</code>.
		 * @param	Object2		Any other <code>FlxObject</code>.
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

            //removed tilemaps

            //First, get the two object deltas
            var overlap: number = 0;
            var obj1delta: number = phys1.position.x() - phys1.last.x;
            var obj2delta: number = phys2.position.x() - phys2.last.x;
            
            if (obj1delta != obj2delta) {
                //Check if the X hulls actually overlap
                var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
                var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
                //where they were before
                var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys1.position.x() - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y, phys1.size.width() + ((obj1delta > 0) ? obj1delta : -obj1delta), phys1.size.height());
                var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys2.position.x() - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y, phys2.size.width() + ((obj2delta > 0) ? obj2delta : -obj2delta), phys2.size.height());
                if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                    var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                    //If they did overlap (and can), figure out by how much and flip the corresponding flags
                    if (obj1delta > obj2delta) {
                        overlap = phys1.position.x() + phys1.size.width() - phys2.position.x();
                        if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT)) {
                            overlap = 0;
                    } else {
                            phys1.touching |= ArcadePhysics.RIGHT;
                            phys2.touching |= ArcadePhysics.LEFT;
                        }
                    }
                    else if (obj1delta < obj2delta) {
                        overlap = phys1.position.x() - phys2.size.width() - phys2.position.x();
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
                    phys1.position.x(phys1.position.x() - overlap);
                    phys2.position.x(phys2.position.x() + overlap);

                    var obj1velocity: number = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                    var obj2velocity: number = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                    var average: number = (obj1velocity + obj2velocity) * 0.5;
                    obj1velocity -= average;
                    obj2velocity -= average;
                    phys1.velocity.x = average + obj1velocity * phys1.elasticity;
                    phys2.velocity.x = average + obj2velocity * phys2.elasticity;

                }
                else if (!obj1immovable) {
                    phys1.position.x(phys1.position.x() - overlap);
                    phys1.velocity.x = obj2v - obj1v * phys1.elasticity;
                }
                else if (!obj2immovable) {

                    phys2.position.x(phys2.position.x() + overlap);
                    phys2.velocity.x = obj1v - obj2v * phys2.elasticity;
                }
                return true;
            }
            else
                return false;
        }


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

            var obj1delta: number = phys1.position.y() - phys1.last.y;

            var obj2delta: number = phys2.position.y() - phys2.last.y;
            if (obj1delta != obj2delta) {
                //Check if the Y hulls actually overlap
                var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
                var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
                var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys1.position.x(), phys1.position.y() - ((obj1delta > 0) ? obj1delta : 0), phys1.size.width(), phys1.size.height() + obj1deltaAbs);
                var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys2.position.x(), phys2.position.y() - ((obj2delta > 0) ? obj2delta : 0), phys2.size.width(), phys2.size.height() + obj2deltaAbs);
                if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                    var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;
                    //If they did overlap (and can), figure out by how much and flip the corresponding flags
                    if (obj1delta > obj2delta) {
                        overlap = phys1.position.y() + phys1.size.height() - phys2.position.y();
                        if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                            overlap = 0;
                        } else {
                            phys1.touching |= ArcadePhysics.DOWN;
                            phys2.touching |= ArcadePhysics.UP;
                        }
                    }
                    else if (obj1delta < obj2delta) {
                        overlap = phys1.position.y() - phys2.size.height() - phys2.position.y();
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
                    phys1.position.y(phys1.position.y() - overlap);
                    phys2.position.y(phys2.position.y() + overlap);

                    var obj1velocity: number = Math.sqrt((obj2v * obj2v * phys2.mass) / phys1.mass) * ((obj2v > 0) ? 1 : -1);
                    var obj2velocity: number = Math.sqrt((obj1v * obj1v * phys1.mass) / phys2.mass) * ((obj1v > 0) ? 1 : -1);
                    var average: number = (obj1velocity + obj2velocity) * 0.5;
                    obj1velocity -= average;
                    obj2velocity -= average;
                    phys1.velocity.y = average + obj1velocity * phys1.elasticity;
                    phys2.velocity.y = average + obj2velocity * phys2.elasticity;
                }
                else if (!obj1immovable) {
                    phys1.position.y(phys1.position.y() - overlap);
                    phys1.velocity.y = obj2v - obj1v * phys1.elasticity;
                    //This is special case code that handles cases like horizontal moving platforms you can ride
                    if (object2.active && phys2.moves && (obj1delta > obj2delta))
                        phys1.position.x(phys1.position.x() + object2.position.x() - phys2.last.x); 
                }
                else if (!obj2immovable) {
                    phys2.position.y(phys2.position.y() + overlap);
                    phys2.velocity.y = obj1v - obj2v * phys2.elasticity;
                    //This is special case code that handles cases like horizontal moving platforms you can ride
                    if (object1.active && phys1.moves && (obj1delta < obj2delta))
                        phys2.position.x(phys2.position.x() + object1.position.x() - phys1.last.x); 
                }
                return true;
            }
            else
                return false;

        }


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

        public overlaps(gameObject:Entity, separateObjects: bool = false): bool {
            if (!gameObject.components.hasComponent("Size") || !gameObject.components.hasComponent("Position")) {
                
                return false;
            }
            var objPosition: Kiwi.Components.Position = gameObject.components.getComponent("Position");
            var objSize: Kiwi.Components.Size = gameObject.components.getComponent("Size");

            
            var result: bool = (objPosition.x() + objSize.width() > this.position.x()) && (objPosition.x() < this.position.x() + this.size.width()) &&
                    (objPosition.y() + objSize.height() > this.position.y()) && (objPosition.y() < this.position.y() + this.size.height());

          
            if (result && separateObjects) {
                ArcadePhysics.separate(this._parent, gameObject);
            }

            return result;

        }

        public overlapsGroup(group: Kiwi.Group, separateObjects: bool = false): bool {
            
            var results: bool = false;
                        
            var childPhysics: ArcadePhysics;
            for (var i = 0; i < group.members.length; i++) {
                childPhysics = <ArcadePhysics>group.members[i].components._components["ArcadePhysics"];
                if (childPhysics.overlaps(this._parent, true)) results = true;
            }

            return results;

        }

        
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
            this.position.x(this.position.x() + delta);

            velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
            this.velocity.y += velocityDelta;
            delta = this.velocity.y * ArcadePhysics.updateInterval;
            this.velocity.y += velocityDelta;
            this.position.y(this.position.y() + delta);

        }

        public update() {

            //Flixel preupdate
            this.last.x = this.position.x();
            this.last.y = this.position.y();


            //Flixel postupdate
            if (this.moves)
                this.updateMotion();

            this.wasTouching = this.touching;
            this.touching = ArcadePhysics.NONE;


        }

        

    }

}

