/**
* 
* @module Kiwi
* @submodule Components 
* 
*/ 

module Kiwi.Components {
     
    /**
    * Arcade Physics is an Optional Component that can be used when you are wanting to do basic physics collisions. 
    * These have been ported from Flixel, so most function operate identically to the original flixel functions, though some
    * have been split into multiple functions. Generally where functions originally accepted
    * either groups or gameobjects within the same argument, the ported functions one or the other.
    * http://www.flixel.org/
    * http://www.adamatomic.com/
    *
    * @class ArcadePhysics
    * @constructor
    * @namespace Kiwi.Components
    * @param entity {Entity} The entity that this ArcadePhysics should be used on.
    * @param box {Box} The box component that holds the hitbox that should be used when resolving and calculating collisions.
    * @return {ArcadePhysics}
    * @extends Component
    *
    * @author Adam 'Atomic' Saltsman, Flixel
    *
    */
    export class ArcadePhysics extends Kiwi.Component {

        constructor(entity:Kiwi.Entity, box?: Kiwi.Components.Box) {
            super(entity,'ArcadePhysics');

            this.parent = entity;
            this.box = box;
            this.transform = this.parent.transform;

            this.last = new Kiwi.Geom.Point(this.transform.worldX, this.transform.worldY);
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

            this.angularVelocity = 0;
            this.angularAcceleration = 0;
            this.angularDrag = 0;
            this.maxAngular = 10000;
        }


        /**
        * The transform component.
        * @property transform
        * @type Transform
        * @public
        */
        public transform: Kiwi.Geom.Transform;


        /**
        * The bounding box component that the collisions are going to be based off.
        * @property box
        * @type Box
        * @public
        */
        public box: Kiwi.Components.Box;


        /**
		* Whether an object will move/alter position after a collision.
        * @property immovable
        * @type boolean
        * @public
		*/
        public immovable: boolean;


        /**
        * The basic speed of this object.
        * @property velocity
        * @type Point
        * @public
        */
        public velocity: Kiwi.Geom.Point;


        /**
		* The virtual mass of the object. Default value is 1.
		* Currently only used with <code>elasticity</code> during collision resolution.
		* Change at your own risk; effects seem crazy unpredictable so far!
        * @property mass
        * @type number
        * @public
		*/
        public mass: number;
        

        /**
        * The bounciness of this object.  Only affects collisions.  Default value is 0, or "not bouncy at all."
        * @property elasticity
        * @type number
        * @public
        */
        public elasticity: number;


        /**
        * How fast the speed of this object is changing.
        * Useful for smooth movement and gravity.
        * @property acceleration
        * @type Point
        * @public
        */
        public acceleration: Kiwi.Geom.Point;


        /**
        * This isn't drag exactly, more like deceleration that is only applied
        * when acceleration is not affecting the sprite.
        * @property drag
        * @type Point
        * @public
        */
        public drag: Kiwi.Geom.Point;


        /**
        * If you are using <code>acceleration</code>, you can use <code>maxVelocity</code> with it
        * to cap the speed automatically (very useful!).
        * @property maxVelocity
        * @type Point
        * @public
        */
        public maxVelocity: Kiwi.Geom.Point;


        /**
		* This is how fast you want this sprite to spin.
		* @property angularVelocity
        * @type number
        * @public
        */
        public angularVelocity: number;
        

        /**
		* How fast the spin speed should change.
        * @property angularAcceleration
        * @type number
        * @public
		*/
        public angularAcceleration: number;
        

        /**
		* Like <code>drag</code> but for spinning.
        * @property angularDrag
        * @type number
        * @public
		*/
        public angularDrag: number;
        

        /**
        * Use in conjunction with <code>angularAcceleration</code> for fluid spin speed control.
        * @property maxAngular
        * @type number
        * @public
        */
        public maxAngular: number;


        /**
        * If the Entity that this component is a part of 'moves' or not, and thus if the physics should update the motion should update each frame.
        * @property moves
        * @type boolean
        * @default true
        * @public
        */
        public moves: boolean;


        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts.
        * Use bitwise operators to check the values stored here, or use touching(), justStartedTouching(), etc.
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property touching
        * @type number
        * @public
        */
        public touching: number;


        /**
        * Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating surface contacts from the previous game loop step.
        * Use bitwise operators to check the values stored here, or use isTouching().
        * You can even use them broadly as boolean values if you're feeling saucy!
        * @property wasTouching
        * @type number
        * @public
        */
        public wasTouching: number;


        /**
		* Bit field of flags (use with UP, DOWN, LEFT, RIGHT, etc) indicating collision directions.
		* Use bitwise operators to check the values stored here.
		* Useful for things like one-way platforms (e.g. allowCollisions = UP)
		* The accessor "solid" just flips this variable between NONE and ANY.
		* @property allowCollisions
        * @type number
        * @public
        */
        public allowCollisions: number;


        /**
		* Important variable for collision processing.
		* By default this value is set automatically during 'preUpdate()'.
		* @property last
        * @type Point
        * @public
        */
        public last: Kiwi.Geom.Point;


        /**
        * A boolean to indicate if this object is solid or not.
        * @property _solid
        * @type boolean
        * @private
        */
        private _solid: boolean;


        /**
        * A function that is to execute when this object overlaps with another.
        * @property _callbackFunction
        * @type Function
        * @default null
        * @private
        */
        private _callbackFunction: any = null;


        /**
        * The context that the callback method should have when it executes.
        * @property _callbackContext
        * @type Any
        * @private
        */
        private _callbackContext: any = null;


        /**
        * Returns a boolean indicating whether the or not the object is currently colliding on a particular side that is passed.
        * Use the collision constants (like LEFT, FLOOR, e.t.c) when passing sides.
        * @method touching
        * @param value [number] The collision constant of the side you want to check against.
        * @return boolean 
        * @public
        */
        public isTouching(value: number): boolean {
            return (this.touching & value) == value;
        }


        /**
		* Whether the object should collide with other objects or not.  
        * For more control over what directions the object will collide from, use collision constants (like LEFT, FLOOR, etc)
		* and set the value of allowCollisions directly.
        * @method solid
        * @param [value] {boolean} If left empty, this will then just toggle between ANY and NONE.
        * @return boolean
        * @public
		*/
        public solid(value?: boolean): boolean {
            if (value !== undefined) {
                if (value)
                    this.allowCollisions = ArcadePhysics.ANY;
                else
                    this.allowCollisions = ArcadePhysics.NONE;
            }

             return (this.allowCollisions & ArcadePhysics.ANY) > ArcadePhysics.NONE;
        }


        /**
        * Sets up a callback function that will run when this object overlaps with another.
        * 
        * @method setCallback
        * @param callbackFunction {Function}
        * @param callbackContext {Any} 
        * @public
        */
        public setCallback(callbackFunction, callbackContext) {
            this._callbackFunction = callbackFunction;
            this._callbackContext = callbackContext;
        }


        /**
        * Returns the parent of this entity. Mainly used for executing callbacks.
        * @property parent
        * @type Entity
        * @public
        */
        public parent: Kiwi.Entity;


        /*
        *---------------
        * Seperation Code
        *---------------
        */


        /**
        * A static method for seperating two normal GameObjects on both the X and Y Axis's. 
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        * 
        * @method seperate
        * @static
        * @param object1 {Entity} The first GameObject you would like to seperate.
        * @param object2 {Entity} The second GameObject you would like to seperate from the first. 
        * @return {boolean}
        * @public
        */
        public static separate(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean {
            
            var separatedX: boolean = this.separateX(object1, object2);
            var separatedY: boolean = this.separateY(object1, object2);
            return separatedX || separatedY;
        }


        /**
		* Separates two passed GameObjects on the x-axis.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
        *
        * @method seperateX
		* @param object1 {Entity} The first GameObject.
		* @param object2 {Entity} The second GameObject.
		* @return {boolean} Whether the objects in fact touched and were separated along the X axis.
        * @static
        * @public
		*/
        public static separateX(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean {

            //Get the Physics Components.
            var phys1: ArcadePhysics = <ArcadePhysics>object1.components.getComponent("ArcadePhysics");
            var phys2: ArcadePhysics = <ArcadePhysics>object2.components.getComponent("ArcadePhysics");


            //Can they even be sseparatated? two immovable objects
            if (phys1.immovable && phys2.immovable)
                return false;


            //First, get the two object deltas
            var overlap: number = 0;
            var obj1delta: number = phys1.transform.worldX - phys1.last.x;
            var obj2delta: number = phys2.transform.worldX - phys2.last.x;


            //Are they the same?
            if (obj1delta == obj2delta) return false;


            //Check if the X hulls actually overlap
            var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
            var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
                

            //Get the world hitboxes.
            var box1 = phys1.box.worldHitbox;
            var box2 = phys2.box.worldHitbox;


            //Where they are now using previous y axis's.
            var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box1.x - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y + phys1.box.hitboxOffset.y, box1.width + ((obj1delta > 0) ? obj1delta : -obj1delta), box1.height);
            var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box2.x - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y + phys2.box.hitboxOffset.y, box2.width + ((obj2delta > 0) ? obj2delta : -obj2delta), box2.height);


            //Could also use Kiwi.Geom.Intersect.rectangleToRectangle here...
            if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {


                var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;


                if (obj1delta > obj2delta) {

                    overlap = box1.x + box1.width - box2.x;
                    if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(phys2.allowCollisions & ArcadePhysics.LEFT)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.RIGHT;
                        phys2.touching |= ArcadePhysics.LEFT;
                    }

                } else {

                    overlap = box1.x - box2.width - box2.x;
                    if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(phys2.allowCollisions & ArcadePhysics.RIGHT)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.LEFT;
                        phys2.touching |= ArcadePhysics.RIGHT;
                    }

                }


            }


            if (overlap != 0) {


                //Get the average velocity
                var obj1v: number = phys1.velocity.x;
                var obj2v: number = phys2.velocity.x;


                if (!phys1.immovable && !phys2.immovable) { 
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


                } else if (!phys1.immovable) {
                    phys1.transform.x = phys1.transform.x - overlap;
                    phys1.velocity.x = obj2v - obj1v * phys1.elasticity;


                } else if (!phys2.immovable) {
                    phys2.transform.x = phys2.transform.x + overlap;
                    phys2.velocity.x = obj1v - obj2v * phys2.elasticity;

                }
                return true;

            }

            return false;
        }


        /**
		* Separated two GameObject on the y-axis. This method is executed from the 'separate' method.
        * Both objects need to have both an ArcadePhysics Component and a Box component in order for the separate process to succeed.
        * This method is not recommended to be directly used but instead use a 'collide/overlaps' method instead.
		*
        * @method seperateY 
		* @param object1 {Entity} The first GameObject.
		* @param object2 {Entity} The second GameObject.
		* @return {boolean} Whether the objects in fact touched and were separated along the Y axis.
		* @static
        * @public
        */
        public static separateY(object1: Kiwi.Entity, object2: Kiwi.Entity): boolean {


            //Get the Arcade Physics Components
            var phys1: ArcadePhysics = <ArcadePhysics>object1.components.getComponent("ArcadePhysics");
            var phys2: ArcadePhysics = <ArcadePhysics>object2.components.getComponent("ArcadePhysics"); 


            //Can't separate two immovable objects
            if (phys1.immovable && phys2.immovable) return false;


            var overlap: number = 0;
            var obj1delta: number = phys1.transform.worldY - phys1.last.y;
            var obj2delta: number = phys2.transform.worldY - phys2.last.y;


            //Do the deltas match?
            if (obj1delta == obj2delta) return false;


            //Absolute Deltas
            var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
            var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;


            //Hitboxes
            var box1 = phys1.box.worldHitbox;
            var box2 = phys2.box.worldHitbox;


            //Rectangles
            var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box1.x, box1.y - ((obj1delta > 0) ? obj1delta : 0), box1.width, box1.height + obj1deltaAbs);
            var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box2.x, box2.y - ((obj2delta > 0) ? obj2delta : 0), box2.width, box2.height + obj2deltaAbs);


            //Check for overlap
            if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {

                var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

                if (obj1delta > obj2delta) {

                    overlap = box1.y + box1.height - box2.y;
                    if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(phys2.allowCollisions & ArcadePhysics.UP)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.DOWN;
                        phys2.touching |= ArcadePhysics.UP;
                    }

                } else {

                    overlap = box1.y - box2.height - box2.y;
                    if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.UP) || !(phys2.allowCollisions & ArcadePhysics.DOWN)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.UP;
                        phys2.touching |= ArcadePhysics.DOWN;
                    }

                }


                //Then adjust their positions and velocities accordingly (if there was any overlap)
                if (overlap != 0) {

                    var obj1v: number = phys1.velocity.y;
                    var obj2v: number = phys2.velocity.y;

                    if (!phys1.immovable && !phys2.immovable) {

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
                    else if (!phys1.immovable) {
                        phys1.transform.y = phys1.transform.y - overlap;
                        phys1.velocity.y = obj2v - obj1v * phys1.elasticity;

                        //This is special case code that handles cases like horizontal moving platforms you can ride
                        if (object2.active && phys2.moves && (obj1delta > obj2delta))
                            phys1.transform.x = phys1.transform.worldX + object2.transform.worldX - phys2.last.x;

                    } else if (!phys2.immovable) {
                        phys2.transform.y = phys2.transform.y + overlap;
                        phys2.velocity.y = obj1v - obj2v * phys2.elasticity;

                        //This is special case code that handles cases like horizontal moving platforms you can ride
                        if (object1.active && phys1.moves && (obj1delta < obj2delta))
                            phys2.transform.x = phys2.transform.worldX + object1.transform.worldX - phys1.last.x;

                    }

                    return true;
                }


            }


            return false;
        }


        /*
        *---------------
        * Seperation of Tiles Methods
        *---------------
        */


        /**
        * Separates a GameObject from a series of passed Tiles that lie on a TileMapLayer. 
        * The gameobject needs to have a Box Component and an ArcadePhysics Component. 
        * This method is not recommended to be directly used but instead use the 'overlapsTiles' method instead.
        *
        * @method separateTiles
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Object[]} 
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        public static separateTiles(object:Entity, layer:Kiwi.GameObjects.Tilemap.TileMapLayer, tiles:any):boolean {

            //Physics Component Found?
            if (object.components.hasComponent("ArcadePhysics") == false) return false;


            //Immovable?
            if (object.components.getComponent("ArcadePhysics").immovable) return false;

            
            var sepX = false;
            var sepY = false;

            for (var i = 0; i < tiles.length; i++) {

                var tile = tiles[i];

                if(!sepX) sepX = this.separateTilesX(object, layer, tile);
                if(!sepY) sepY = this.separateTilesY(object, layer, tile);
            }
            
            return  sepX || sepY;
            
        }


        /**
        * Separates a GameObjects from an Array of Tiles on the x-axis. 
        * @method separateTilesX
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tile {Object}.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        public static separateTilesX(object:Entity, layer:Kiwi.GameObjects.Tilemap.TileMapLayer, tile):boolean {


            //Get Physics
            var phys1: ArcadePhysics = <ArcadePhysics>object.components.getComponent("ArcadePhysics");
            var phys2: ArcadePhysics = <ArcadePhysics>layer.components.getComponent("ArcadePhysics");


            //First, get the two object deltas
            var obj1delta: number = phys1.transform.worldX - phys1.last.x;
            var obj2delta: number = phys2.transform.worldX - phys2.last.x;


            //If they moved the same amount.
            if (obj1delta == obj2delta) return false;
            

            //Absolute Delta and Overlap
            var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
            var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
            var overlap = 0;
            var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;


            //Quick References
            var box1 = phys1.box.worldHitbox;
            var tileTypes = layer.tilemap.tileTypes;
            var tData = layer.tileData;


            //Box of the GameObject
            var x = phys2.transform.worldX + tile.x;
            var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box1.x - ((obj1delta > 0) ? obj1delta : 0), phys1.last.y + phys1.box.hitboxOffset.y, box1.width + ((obj1delta > 0) ? obj1delta : -obj1delta), box1.height);
            var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(x - ((obj2delta > 0) ? obj2delta : 0), phys2.last.y + tile.y, layer.tileWidth + ((obj2delta > 0) ? obj2delta : -obj2delta), layer.tileHeight);


            //Check to see if they overlap
            if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {

                //Which way the delta is going
                if (obj1delta > obj2delta) {

                    overlap = box1.x + box1.width - x;
                    if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.RIGHT) || !(tileTypes[tData[tile.index]].allowCollisions & ArcadePhysics.LEFT)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.RIGHT;
                    }

                } else {

                    overlap = box1.x - layer.tileWidth - x;
                    if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.LEFT) || !(tileTypes[tData[tile.index]].allowCollisions & ArcadePhysics.RIGHT)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.LEFT;
                    }

                }

                //Resolve the Collision
                if (overlap != 0) {

                    var obj1v: number = phys1.velocity.x;
                    var obj2v: number = phys2.velocity.x;

                    phys1.transform.x = phys1.transform.x - overlap;
                    phys1.velocity.x = obj2v - obj1v * phys1.elasticity;

                    return true;
                }

            }

            return false;
        }


        /**
        * Separates a GameObjects from an Array of Tiles on the y-axis. 
        * @method separateTilesY
        * @param object {Entity} The GameObject you are wanting to separate from a tile.
        * @param layer {TileMapLayer} The TileMapLayer that the tiles belong on.
        * @param tiles {Object[]} The tiles which are overlapping with the GameObject.
        * @return {Boolean} If any separation occured.
        * @public
        * @static
        */
        public static separateTilesY(object:Entity, layer, tile):boolean {

            //Get the physics.
            var phys1: ArcadePhysics = <ArcadePhysics>object.components.getComponent("ArcadePhysics");
            var phys2: ArcadePhysics = <ArcadePhysics>layer.components.getComponent("ArcadePhysics");


            //First, get the two object deltas
            var obj1delta: number = phys1.transform.worldY - phys1.last.y;
            var obj2delta: number = phys2.transform.worldY - phys2.last.y;


            //Have they moved the same amount?
            if (obj1delta == obj2delta) return false;


            //Absolute Delta and Max Overlap
            var obj1deltaAbs: number = (obj1delta > 0) ? obj1delta : -obj1delta;
            var obj2deltaAbs: number = (obj2delta > 0) ? obj2delta : -obj2delta;
            var overlap: number = 0;
            var maxOverlap: number = obj1deltaAbs + obj2deltaAbs + ArcadePhysics.OVERLAP_BIAS;

            
            var box1 = phys1.box.worldHitbox;
            var tileTypes = layer.tilemap.tileTypes;
            var tData = layer.tileData;
            var y = layer.transform.worldY + tile.y;


            //Rectangles 
            var obj1rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(box1.x, box1.y - ((obj1delta > 0) ? obj1delta : 0), box1.width, box1.height + obj1deltaAbs);
            var obj2rect: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle(phys2.transform.worldX + tile.x, y - ((obj2delta > 0) ? obj2delta : 0), layer.tileWidth, layer.tileHeight + obj2deltaAbs);


            //Check if they overlap
            if ((obj1rect.x + obj1rect.width > obj2rect.x) && (obj1rect.x < obj2rect.x + obj2rect.width) && (obj1rect.y + obj1rect.height > obj2rect.y) && (obj1rect.y < obj2rect.y + obj2rect.height)) {
                
                if (obj1delta > obj2delta) {

                    overlap = box1.y + box1.height - y;
                    if ((overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.DOWN) || !(tileTypes[tData[tile.index]].allowCollisions & ArcadePhysics.UP)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.DOWN;
                    }

                } else {

                    overlap = box1.y - layer.tileHeight - y;
                    if ((-overlap > maxOverlap) || !(phys1.allowCollisions & ArcadePhysics.UP) || !(tileTypes[tData[tile.index]].allowCollisions & ArcadePhysics.DOWN)) {
                        overlap = 0;
                    } else {
                        phys1.touching |= ArcadePhysics.UP;
                    }

                }


                //Resolve the Collision
                if (overlap != 0) {

                    var obj1v: number = phys1.velocity.y;
                    var obj2v: number = phys2.velocity.y;

                    phys1.transform.y = phys1.transform.y - overlap;
                    phys1.velocity.y = obj2v - obj1v * phys1.elasticity;

                    return true;
                }

            }

            return false;
        }


        /* 
        *---------------
        * Instance Functions
        *---------------
        */


        /**
        * A method to check to see if any Tiles with in this parent TileMapLayer overlaps with a GameObject passed.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * ONLY works if parent of the ArcadePhysics component which is calling this method is a TileMapLayer.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component.
        *
        * @method overlapsTile
        * @param gameObject {Entity} The GameObject you would like to separate with this one.
        * @param [separateObjects=false] {Boolean} If you want the GameObject to be separated from any tile it collides with.
        * @param [collisionType=ANY] {Number} If you want the GameObject to only check for collisions from a particular side of tiles. ANY by default.
        * @return {Boolean} If any gameobject overlapped.
        * @public
        */
        public overlapsTiles(gameObject:Entity, separateObjects:boolean = false, collisionType:number = Kiwi.Components.ArcadePhysics.ANY):boolean {

            //Are we a tilemaplayer?
            if (this.parent.childType() !== Kiwi.TILE_LAYER) return false; 

            var tiles = (<Kiwi.GameObjects.Tilemap.TileMapLayer>this.parent).getOverlappingTiles(gameObject, collisionType);

            if (tiles.length > 0) {
                if (separateObjects) ArcadePhysics.separateTiles(gameObject, <Kiwi.GameObjects.Tilemap.TileMapLayer>this.parent, tiles);

                return true;
            } else {
                return false;
            }
        }


        /**
        * A method to check to see if the parent of this physics component overlaps with another Kiwi.Entity.
        * If seperateObjects is true it will seperate the two entities based on their bounding box.
        * Note: The GameObject passed must contain a box component and only if you want to separate the two objects must is ALSO contain an ArcadePhysics component. 
        * Also: Not to be used for separation from tiles.
        * 
        * @method overlaps
        * @param gameObject {Entity}
        * @param [seperateObjects=false] {boolean}
        * @return {boolean}
        * @public
        */
        public overlaps(gameObject: Entity, separateObjects: boolean = false): boolean {

            if (gameObject.components.hasComponent('Box') == false) return;

            var box: Kiwi.Components.Box = gameObject.components.getComponent('Box');

            var result: boolean = (box.worldHitbox.x + box.worldHitbox.width > this.box.worldHitbox.x) && (box.worldHitbox.x < this.box.worldHitbox.x + this.box.worldHitbox.width) &&
                (box.worldHitbox.y + box.worldHitbox.height > this.box.worldHitbox.y) && (box.worldHitbox.y < this.box.worldHitbox.y + this.box.worldHitbox.height);

            if (result) {
                if (separateObjects)
                    ArcadePhysics.separate(<Kiwi.Entity>this.owner, gameObject);

                if (this._callbackFunction !== null && this._callbackContext !== null) {
                    this._callbackFunction.call(this._callbackContext, this.owner, gameObject);
                }
            }

            return result;

        }


        /**
        * A method to check to see if the parent of this physics component overlaps with another individual in a Kiwi Group.
        * 
        * @method overlapsGroup
        * @param group {Group}
        * @param [seperateObjects=false] {boolean} 
        * @return { boolean }
        * @public
        */
        public overlapsGroup(group: Kiwi.Group, separateObjects: boolean = false): boolean {

            var results: boolean = false;

            for (var i = 0; i < group.members.length; i++) {

                if (group.members[i].childType() === Kiwi.GROUP) {
                    //recursively check overlap
                    this.overlapsGroup(<Kiwi.Group>group.members[i], separateObjects);

                } else {
                    //otherwise its an entity

                    if (this.overlaps(<Kiwi.Entity>group.members[i], separateObjects)) {
                        if (this._callbackContext !== null && this._callbackFunction !== null)
                            this._callbackFunction.call(this._callbackContext, this.owner, group.members[i]);
                        results = true;
                    }

                }
            }

            return results;
        }


        /**
        * A method to check to see if the parent of this physics component overlaps with a Entity that is held in an array.
        * @method overlapsArray
        * @param array {Array} The array of GameObjects you want to check.
        * @param [separateObjects=false] {boolean} If when the objects collide you want them to seperate outwards.
        * @return {boolean} If a collision was detected or not.
        * @public
        */ 
        public overlapsArray(array: Array<any>, separateObjects: boolean = false): boolean {
            
            var results: boolean = false;

            for (var i = 0; i < array.length; i++) {

                if (typeof array[i].childType !== "undefined") {

                    if (array[i].childType() == Kiwi.GROUP) {

                        this.overlapsGroup(<Kiwi.Group>array[i], separateObjects);
                        
                    } else {

                        if (this.overlaps(<Kiwi.Entity>array[i], separateObjects)) {
                            if (this._callbackFunction !== null && this._callbackContext !== null) {
                                this._callbackFunction.call(this._callbackContext, this.owner, array[i]);
                            }
                            results = true;
                        }

                    }

                }

            }
            
            return results;
        }


        /*
        *-------------
        * Motion Methods
        *-------------
        */


        /**
        * Computes the velocity based on the parameters passed.  
        * @method computeVelocity
        * @static
        * @param velocity {number}
        * @param [acceleration=0] {number}
        * @param [drag=0] {number}
        * @param [max=10000] {number}
        * @return {Number} The new velocity
        * @public
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


        /**
        * Updates the position of this object. Automatically called if the 'moves' parameter is true.  
        * @method updateMotion
        * @public
        */
        public updateMotion() {
            
            var delta: number;
            var velocityDelta: number;
            
            //Update the motion calculated from rotation.
            velocityDelta = (ArcadePhysics.computeVelocity(this.angularVelocity, this.angularAcceleration, this.angularDrag, this.maxAngular) - this.angularVelocity) / 2;
            this.angularVelocity += velocityDelta;
            this.transform.rotation += this.angularVelocity * ArcadePhysics.updateInterval;
            this.angularVelocity += velocityDelta;
           
            //Update the motion on the x-axis.
            velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.x, this.acceleration.x, this.drag.x, this.maxVelocity.x) - this.velocity.x) / 2;
            this.velocity.x += velocityDelta;
            delta = this.velocity.x * ArcadePhysics.updateInterval;
            this.velocity.x += velocityDelta;
            this.transform.x = this.transform.x + delta;

            //Update the motion on the y-axis.
            velocityDelta = (ArcadePhysics.computeVelocity(this.velocity.y, this.acceleration.y, this.drag.y, this.maxVelocity.y) - this.velocity.y) / 2;
            this.velocity.y += velocityDelta;
            delta = this.velocity.y * ArcadePhysics.updateInterval;
            this.velocity.y += velocityDelta;
            this.transform.y = this.transform.y + delta;
        
        }
    

        /**
        * The Update loop of the physics component
        * @method update
        * @public
        */
        public update() {

            //Flixel preupdate
            this.last.x = this.transform.worldX;
            this.last.y = this.transform.worldY;

            //Flixel postupdate
            if (this.moves)
                this.updateMotion();

            this.wasTouching = this.touching;
            this.touching = ArcadePhysics.NONE;


        }


        /**
        * Removes all properties that refer to other objects or outside of this class in order to flag this object for garbage collection.
        * @method destroy
        * @public
        */
        public destroy() {
            super.destroy();

            delete this.transform;
            delete this.owner;
            delete this._callbackContext;
            delete this._callbackFunction;
        }


        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType() {
            return "ArcadePhysics";
        }


        /*
        *----------------
        * Static Functions
        *----------------
        */


        /*
        *----------------
        * Collide Functions - Maps to Overlaps
        *----------------
        */


        /**
        * A Static method to check to see if two objects collide or not. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collide
        * @static
        * @public
        * @param gameObject1 {Kiwi.GameObjects.Entity} The first game object.
        * @param gameObject2 {Kiwi.GameObjects.Entity} The second game object.
        * @param [seperate=true] {boolean} If the two gameobjects should seperated when they collide.
        * @return {boolean}
        */
        public static collide(gameObject1: Entity, gameObject2: Entity, seperate: boolean = true): boolean {
            return ArcadePhysics.overlaps(gameObject1, gameObject2, seperate);
        }


        /**
        * A Static method to check to see if a single entity collides with a group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroup
        * @static
        * @public
        * @param gameObject {Kiwi.GameObjects.Entity} 
        * @param group {Any} This could be either an Array of GameObjects or a Group containing members. 
        * @param [seperate=true] {boolean} 
        * @return {boolean}
        * @public
        */
        public static collideGroup(gameObject: Entity, group: Kiwi.Group, seperate: boolean = true): boolean {

            return ArcadePhysics.overlapsObjectGroup(gameObject, group, seperate);
        }


        /**
        * A Static method to check to see if a group of entities overlap with another group of entities. Returns a boolean indicating whether they overlaped or not.
        *
        * @method collideGroupGroup
        * @static
        * @public
        * @param group1 {Any} This can either be an array or a Group.
        * @param group2 {Any} Also could either be an array or a Group.
        * @param [seperate=true] {boolean}
        * @return {boolean}
        */
        public static collideGroupGroup(group1: Kiwi.Group, group2: Kiwi.Group, seperate: boolean = true): boolean {

            return ArcadePhysics.overlapsGroupGroup(group1, group2, seperate);
        }


        /*
        *-------------
        * Overlap Static Method - Use's the Arcade Physics of one of the gameobjects passed.
        *-------------
        */


        /**
        * A Static method to that checks to see if two objects overlap. Returns a boolean indicating whether they did or not.
        *
        * @method overlaps
        * @static
        * @public
        * @param gameObject1 {Kiwi.GameObjects.Entity} 
        * @param gameObject2 {Kiwi.GameObjects.Entity} 
        * @param [separateObjects=true] {boolean} 
        * @return {boolean}
        */
        public static overlaps(gameObject1: Entity, gameObject2: Entity, separateObjects: boolean = true): boolean {

            var obj1Physics: ArcadePhysics = gameObject1.components.getComponent("ArcadePhysics");
            return obj1Physics.overlaps(gameObject2, separateObjects);
        }


        /**
        * A Static method to that checks to see if a single object overlaps with a group of entities. Returns a boolean indicating whether they did or not.
        *
        * @method overlapsObjectGroup
        * @static
        * @param gameObject {Entity}
        * @param group {Group} 
        * @param [seperateObjects=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        public static overlapsObjectGroup(gameObject: Entity, group: Kiwi.Group, separateObjects: boolean = true): boolean {

            var objPhysics: ArcadePhysics = gameObject.components.getComponent("ArcadePhysics");
            return objPhysics.overlapsGroup(group, separateObjects);
        }


        /**
        * A Static method that checks to see if any objects in a group overlap with objects in another group.
        *
        * @method overlaps
        * @static
        * @param group1 {Group} The first 
        * @param group2 {Any}
        * @param [seperate=true] {boolean} If they overlap should the seperate or not
        * @return {boolean}
        * @public
        */
        public static overlapsGroupGroup(group1: Kiwi.Group, group2: Kiwi.Group, separateObjects: boolean = true): boolean {

            var result: boolean = false;

            var members: IChild[] = group1.members;
            var i: number = 0;

            while (i < group1.members.length) {
                if (members[i].childType() == Kiwi.GROUP) {
                    if (ArcadePhysics.overlapsGroupGroup(<Kiwi.Group>members[i++], group2, separateObjects)) result = true;

                } else {
                    if (ArcadePhysics.overlapsObjectGroup(<Kiwi.Entity>members[i++], group2, separateObjects)) result = true;

                }
            }

            return result;
        }


        /**
        * A Statuc method that checks to see if any objects from an Array collide with a Kiwi Group members.
        * 
        * @method overlapsArrayGroup
        * @param array {Array} An array you want to check collide.
        * @param group {Group} A group of objects you want to check overlaps.
        * @param [seperateObjects=true] {Boolean} If when a collision is found the objects should seperate out.
        * @return {Boolean} 
        * @static
        */
        public static overlapsArrayGroup(array: Array<any>, group: Kiwi.Group, separateObjects: boolean = true) {

            var result: boolean = false;

            //loop through the array 
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i].childType !== "undefined") {

                    if (array[i].childType() === Kiwi.GROUP) {
                        if (ArcadePhysics.overlapsGroupGroup(<Kiwi.Group>array[i], group, separateObjects))
                            result = true;

                    } else {
                        if (ArcadePhysics.overlapsObjectGroup(<Kiwi.Entity>array[i], group, separateObjects))
                            result = true;
                    }

                }
            }

            return result;
        }


        /*
        *---------------
        * Static Constants 
        *---------------
        */


        /**
        * How often the motion should be updated.
        * @property updateInterval
        * @static
        * @default 1 / 10
        * @type number
        * @public
        */
        public static updateInterval: number = 1 / 10;


        /**
        * Generic value for "left" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property LEFT
        * @type number
        * @default 0x0001
        * @public
        * @static
        */
        public static LEFT: number = 0x0001;


        /**
        * Generic value for "right" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property RIGHT
        * @type number
        * @default 0x0010
        * @public
        * @static
        */
        public static RIGHT: number = 0x0010;


        /**
        * Generic value for "up" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property UP
        * @type number
        * @default 0x0100
        * @public
        * @static
        */
        public static UP: number = 0x0100;


        /**
        * Generic value for "down" Used by <code>facing</code>, <code>allowCollisions</code>, and <code>touching</code>.
        * @property DOWN
        * @type number
        * @default 0x1000
        * @public
        * @static
        */
        public static DOWN: number = 0x1000;


        /**
        * Special-case constant meaning no collisions, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property NONE
        * @type number
        * @default 0
        * @public
        * @static
        */
        public static NONE: number = 0;


        /**
        * Special-case constant meaning up, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property CEILING
        * @type number
        * @default 0x0100
        * @public
        * @static
        */
        public static CEILING: number = ArcadePhysics.UP;


        /**
        * Special-case constant meaning down, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property FLOOR
        * @type number
        * @default 0x1000
        * @public
        * @static
        */
        public static FLOOR: number = ArcadePhysics.DOWN;


        /**
        * Special-case constant meaning only the left and right sides, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property WALL
        * @type number
        * @default 0x0011
        * @public
        * @static
        */
        public static WALL: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT;


        /**
        * Special-case constant meaning any direction, used mainly by <code>allowCollisions</code> and <code>touching</code>.
        * @property ANY
        * @type number
        * @default 0x1111
        * @public
        * @static
        */
        public static ANY: number = ArcadePhysics.LEFT | ArcadePhysics.RIGHT | ArcadePhysics.UP | ArcadePhysics.DOWN;


        /**
        * Handy constant used during collision resolution (see <code>separateX()</code> and <code>separateY()</code>).
        * @property OVERLAP_BIAS
        * @type number
        * @default 4
        * @public
        * @static
        */
        public static OVERLAP_BIAS: number = 4;


    }

}

