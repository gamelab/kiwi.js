/**
* 
* @module Kiwi
* @submodule Components 
* 
*/ 

module Kiwi.Components {

    /**
    * The Box Component is used to handle the various 'bounds' that each GameObject has. 
    * There are two main different types of bounds (Bounds and Hitbox) with each one having three variants (each one is a rectangle) on each box depending on what you are wanting:
    * RawBounds: The bounding box of the GameObject before rotation.
    * RawHitbox: The hitbox of the GameObject before rotation. This can be modified to be different than the normal bounds but if not specified it will be the same as the raw bounds.
    * Bounds: The bounding box of the GameObject after rotation.
    * Hitbox: The hitbox of the GameObject after rotation. If you modified the raw hitbox then this one will be modified as well, otherwise it will be the same as the normal bounds.
    * WorldBounds: The bounding box of the Entity using its world coordinates.
    * WorldHitbox: The hitbox of the Entity using its world coordinates.
    *
    * @class Box
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Entity} The entity that this box belongs to.
    * @param [x=0] {Number} Its position on the x axis
    * @param [y=0] {Number} Its position on the y axis
    * @param [width=0] {Number} The width of the box.
    * @param [height=0] {Number} The height of the box.
    * @return {Box}
    */
    export class Box extends Component {
 
        constructor(parent: Entity, x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            
            super(parent, 'Box');
            
            this.entity = parent;
            this.dirty = true;

            this._rawBounds = new Kiwi.Geom.Rectangle(x,y,width,height);
            this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
            this._rawHitbox = new Kiwi.Geom.Rectangle();

            this._hitboxOffset = new Kiwi.Geom.Point();

            this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height); 
            this.autoUpdate = true;
        }


        /**
        * The entity that this box belongs to.
        * @property entity
        * @type Entity
        * @public
        */
        public entity: Kiwi.Entity;


        /**
        * The type of object that this is.
        * @method objType
        * @return {string}
        * @public
        */
        public objType() {
            return "Box";
        }


        /**
        * Controls whether the hitbox should update automatically to match the hitbox of the current cell on the entity this Box component is attached to (default behaviour).
        * Or if the hitbox shouldn't auto update 
        * This property is automatically set to 'false' when you override the hitboxes width/height, but you can set this to true afterwards. 
        * 
        * @property autoUpdate
        * @type boolean
        * @default true
        * @private
        */
        public autoUpdate: boolean = true;


        /**
        * Indicates whether or not this component needs re-rendering/updating or not.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty: boolean;



        /**
        * Contains offset point for the hitbox 
        * @property _hitboxOffset
        * @type Point
        * @private
        */
        private _hitboxOffset: Kiwi.Geom.Point;
        


        /**
        * Returns the offset value of the hitbox as a point for the X/Y axis for the developer to use.
        * This is without rotation or scaling.
        * @property hitboxOffset
        * @type Point
        * @public
        */
        public get hitboxOffset(): Kiwi.Geom.Point {

            if (this.dirty && this.autoUpdate == true && this.entity.atlas !== null) {
                this._hitboxOffset.x = this.entity.atlas.cells[this.entity.cellIndex].hitboxes[0].x;
                this._hitboxOffset.y = this.entity.atlas.cells[this.entity.cellIndex].hitboxes[0].y;

            }

            return this._hitboxOffset;
        }



        /**
        * Contains the offset rectangle for the raw hitbox. 
        * @property _rawHitbox
        * @type Rectangle
        * @private
        */
        private _rawHitbox: Kiwi.Geom.Rectangle;
        

        /**
        * Returns the raw hitbox rectangle for the developer to use. 
        * 'Raw' means where it would be without rotation or scaling.
        * This is READ ONLY.
        * @property rawHitbox
        * @type Rectangle
        * @public
        */
        public get rawHitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {

                this._rawHitbox.x = this.rawBounds.x + this.hitboxOffset.x;
                this._rawHitbox.y = this.rawBounds.y + this.hitboxOffset.y;


                //If the hitbox has not already been set, then update the width/height based upon the current cell that the entity has.
                if (this.autoUpdate == true) {
                    var atlas = this.entity.atlas;

                    if (atlas !== null) {
                        this._rawHitbox.width = atlas.cells[this.entity.cellIndex].hitboxes[0].w;
                        this._rawHitbox.height = atlas.cells[this.entity.cellIndex].hitboxes[0].h;

                    }
                }

            }
            
            return this._rawHitbox;
        }
        


        /**
        * The transformed or 'normal' hitbox for the entity. This is its box after rotation/e.t.c.
        * @property _transformedHitbox
        * @type Rectangle
        * @private
        */
        private _transformedHitbox: Kiwi.Geom.Rectangle;
        

        /** 
        * The transformed 'world' hitbox for the entity. This is its box after rotation/e.t.c.
        * @property _worldHitbox
        * @type Rectangle
        * @private
        */
        private _worldHitbox: Kiwi.Geom.Rectangle;


        /**
        * The 'normal' or transformed hitbox for the entity. This is its box after rotation/e.t.c. 
        * @property hitbox
        * @type Rectangle
        * @public
        */
        public get hitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
            }

            return this._transformedHitbox;
        }
        public set hitbox(value: Kiwi.Geom.Rectangle) {
            
            //Use custom hitbox defined by user.

            this._hitboxOffset.x = value.x;
            this._hitboxOffset.y = value.y;

            this._rawHitbox = value;
            
            this._rawHitbox.x += this._rawBounds.x;
            this._rawHitbox.y += this._rawBounds.y;

            this.autoUpdate = false;

        }



        /**
        * Returns the transformed hitbox for the entity using its 'world' coordinates.
        * This is READ ONLY.
        * @property worldHitbox
        * @type Rectangle
        * @public
        */
        public get worldHitbox(): Kiwi.Geom.Rectangle {
            
            if (this.dirty) {
                this._worldHitbox = this._rotateHitbox(this.rawHitbox.clone(), true);
            }

            return this._worldHitbox;
        }



        /**
        * The 'raw' bounds of entity. This is its bounds before rotation/scale.
        * This for property is only for storage of the values and should be accessed via the getter 'rawBounds' so that it can update.
        * 
        * @property _rawBounds
        * @type Rectangle
        * @private
        */
        private _rawBounds: Kiwi.Geom.Rectangle;



        /**
        * Returns the 'raw' bounds for this entity.
        * This is READ ONLY.
        * @property rawBounds
        * @type Rectangle
        * @public
        */
        public get rawBounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rawBounds.x = this.entity.x;
                this._rawBounds.y = this.entity.y;
                this._rawBounds.width = this.entity.width;
                this._rawBounds.height = this.entity.height;
            }
            return this._rawBounds;
        }
    


        /**
        * Contains the 'raw' center point for the bounds.
        * @property Kiwi.Geom.Point
        * @type Point
        * @private
        */
        private _rawCenter: Kiwi.Geom.Point;
        


        /**
        * Returns the raw center point of the box.
        * This is READ ONLY.
        * @property rawCenter
        * @type Point
        * @public
        */
        public get rawCenter(): Kiwi.Geom.Point {
            if (this.dirty) {
                this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2,
                this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;
            }
            return this._rawCenter;
        }
    


        /**
        * Contains the center point after the box has been transformed.
        * @property _transformedCenter
        * @type Point
        * @private
        */
        private _transformedCenter: Kiwi.Geom.Point;
           
        
         
        /**
        * Returns the center point for the box after it has been transformed.
        * This is READ ONLY.
        * @property center
        * @type Point
        * @public
        */
        public get center(): Kiwi.Geom.Point {
            if (this.dirty) {
                var t: Kiwi.Geom.Transform = this.entity.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)
                this._transformedCenter = m.transformPoint(new Kiwi.Geom.Point(this.entity.width / 2 - t.rotPointX, this.entity.height / 2 - t.rotPointY));

            }
            return this._transformedCenter;
        }



        /**
        * Contains the transformed or 'normal' bounds for this entity.
        * @property _transformedBounds
        * @type Rectangle
        * @private
        */
        private _transformedBounds: Kiwi.Geom.Rectangle;
        

        /**
        * The 'world' transformed bounds for this entity. 
        * @property _worldBounds
        * @type Rectangle
        * @private
        */
        private _worldBounds: Kiwi.Geom.Rectangle;


        /**
        * Returns the 'transformed' or 'normal' bounds for this box. 
        * This is READ ONLY.
        * @property bounds
        * @type Rectangle
        * @public
        */
        public get bounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedBounds = this._rotateRect(this.rawBounds.clone()); 
            }
            return this._transformedBounds;
        }

        /**
        * Returns the 'transformed' bounds for this entity using the world coodinates.
        * This is READ ONLY.
        * @property worldBounds
        * @type Rectangle
        * @public
        */
        public get worldBounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._worldBounds = this._rotateRect(this.rawBounds.clone(), true);
            }
            return this._worldBounds;
        }

        /**
        * Private internal method only. Used to calculate the transformed bounds after rotation.
        * @method _rotateRect
        * @param rect {Rectangle}
        * @param [useWorldCoords=false] {Boolean}
        * @return {Rectangle}
        * @private
        */
        private _rotateRect(rect: Kiwi.Geom.Rectangle, useWorldCoords: boolean=false): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            
            //Use world coordinates?
            if (useWorldCoords) {
                m.setTo(m.a, m.b, m.c, m.d, t.worldX + t.rotPointX, t.worldY + t.rotPointY);
            } else {
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);
            }

            out = this.extents(
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY + rect.height }),
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY + rect.height })
                );
            return out;
        }



        /**
        * A private method that is used to calculate the transformed hitbox's coordinates after rotation. 
        * @method _rotateHitbox
        * @param rect {Rectangle} 
        * @param [useWorldCoords=false] {Boolean}
        * @return {Rectangle}
        * @private
        */
        private _rotateHitbox(rect: Kiwi.Geom.Rectangle, useWorldCoords: boolean=false): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

            //Use world coordinates?
            if (useWorldCoords) {
                m.setTo(m.a, m.b, m.c, m.d, t.worldX + t.rotPointX, t.worldY + t.rotPointY);
            } else {
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY);
            }

            out = this.extents(
                m.transformPoint({ x: - t.rotPointX + this._hitboxOffset.x,              y: - t.rotPointY + this._hitboxOffset.y }),
                m.transformPoint({ x: - t.rotPointX + rect.width + this._hitboxOffset.x, y: - t.rotPointY +  this._hitboxOffset.y }),
                m.transformPoint({ x: - t.rotPointX + rect.width + this._hitboxOffset.x, y: - t.rotPointY + rect.height + this._hitboxOffset.y}),
                m.transformPoint({ x: - t.rotPointX + this._hitboxOffset.x,              y: - t.rotPointY + rect.height + this._hitboxOffset.y })
                );
           
            return out;
        }



        /**
        * Draws the various bounds on a context that is passed. Useful for debugging and using in combination with the debug canvas.
        * @method draw
        * @param {CanvasRenderingContext2D} ctx
        * @public
        */
        public draw(ctx: CanvasRenderingContext2D) {
            var t: Kiwi.Geom.Transform = this.entity.transform;
            ctx.strokeStyle = "red";
           
            ctx.strokeRect(this.rawBounds.x, this.rawBounds.y, this.rawBounds.width, this.rawBounds.height);
            ctx.fillRect(this.rawCenter.x - 1, this.rawCenter.y - 1, 3, 3);
            ctx.strokeRect(t.x + t.rotPointX - 3 , t.y + t.rotPointY - 3, 7, 7);
            ctx.strokeStyle = "blue";
            ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            ctx.strokeStyle = "green";
            ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.rawHitbox.x, this.rawHitbox.y, this.rawHitbox.width, this.rawHitbox.height);

        }



        /** 
        * [REQUIRES COMMENTING]
        * @method extents
        * @param topLeftPoint {Point} 
        * @param topRightPoint {Point} 
        * @param bottomRightPoint {Point} 
        * @param bottomLeftPoint {Point} 
        * @return Rectangle
        */
        public extents(topLeftPoint:Kiwi.Geom.Point, topRightPoint:Kiwi.Geom.Point, bottomRightPoint:Kiwi.Geom.Point, bottomLeftPoint:Kiwi.Geom.Point):Kiwi.Geom.Rectangle {
            var left: number = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var right: number = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var top: number = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            var bottom: number = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

            return new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);

        }



        /**
        * Destroys this component and all of the links it may have to other objects.
        * @method destroy
        * @public
        */
        public destroy() {
            super.destroy();
            delete this.entity;
        }
	

    }

}


