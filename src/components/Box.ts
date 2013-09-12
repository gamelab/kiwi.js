/**
* Kiwi - Components
* @module Kiwi
* @submodule Components 
* 
*/ 

module Kiwi.Components {

    /**
    *  
    *
    * @class Box
    * @extends Component
    */

    export class Box extends Component {

        /**
        * 
        * @constructor
        * @param parent {Entity} The entity that this box belongs to.
        * @param [x=0] {Number} Its position on the x axis
        * @param [y=0] {Number} Its position on the y axis
        * @param [width=0] {Number} The width of the box.
        * @param [height=0] {Number} The height of the box.
        * @return {Box}
        */
        constructor(parent: Entity, x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            
            super(parent, 'Box');
            
            this.entity = parent;
            this.dirty = true;

            this._rawBounds = new Kiwi.Geom.Rectangle(x,y,width,height);
            this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
            this._rawHitbox = new Kiwi.Geom.Rectangle();

            this._hitboxOffset = new Kiwi.Geom.Point();

            this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height); 
            
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
        * Contains the offset rectangle for the raw hitbox.
        * @property _rawHitbox
        * @type Rectangle
        * @private
        */
        private _rawHitbox: Kiwi.Geom.Rectangle;
        
        /**
        * Returns the raw hitbox rectangle for the developer to use. 
        * 'Raw' means where it would be without rotation or scaling.
        * @type Rectangle
        * @public
        */
        public get rawHitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rawHitbox.x = this._rawBounds.x + this._hitboxOffset.x;
                this._rawHitbox.y = this._rawBounds.y + this._hitboxOffset.y;
                
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
        * Returns the 'normal' or transformed hitbox for the entity. This is its box after rotation/e.t.c. 
        * @type Rectangle
        * @public
        */
        public get hitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
            }

            return this._transformedHitbox;
        }
        
        /**
        * Sets the hitbox based of a rectangle that you specify.
        * @type Rectangle
        * @public
        */
        public set hitbox(value: Kiwi.Geom.Rectangle) {
            
            this._hitboxOffset.x = value.x;
            this._hitboxOffset.y = value.y;

            this._rawHitbox = value;
            
            this._rawHitbox.x += this._rawBounds.x;
            this._rawHitbox.y += this._rawBounds.y;
         
        }

        /**
        * The 'raw' bounds of entity. This is its bounds before rotation/scale.
        * @property _rawBounds
        * @type Rectangle
        * @private
        */
        private _rawBounds: Kiwi.Geom.Rectangle;

        /**
        * Returns the 'raw' bounds for this entity.
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
        * Returns the 'transformed' or 'normal' bounds for this box. 
        * @type Rectangle
        * @public
        */
        public get bounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedBounds = this.rawBounds.clone();
                this._transformedBounds = this._rotateRect(this.rawBounds.clone()); 
            }
            return this._transformedBounds;
        }

        /**
        * Private internal method only. Used to rotate a rectangle but a set about.
        * @method _rotateRect
        * @param rect {Rectangle}
        * @return {Rectangle}
        * @private
        */      
        private _rotateRect(rect: Kiwi.Geom.Rectangle): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)


            out = this.extents(
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY + rect.height }),
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY + rect.height })
                );
            return out;
        }

        /**
        * Rotates the hitbox by an set amount.
        * @method _rotateHitbox
        * @param {Rectangle} rect
        * @return {Rectangle}
        * @private
        */
        private _rotateHitbox(rect: Kiwi.Geom.Rectangle): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)

            out = this.extents(
                m.transformPoint({ x: - t.rotPointX + this._hitboxOffset.x,              y: - t.rotPointY + this._hitboxOffset.y }),
                m.transformPoint({ x: - t.rotPointX + rect.width + this._hitboxOffset.x, y: - t.rotPointY +  this._hitboxOffset.y }),
                m.transformPoint({ x: - t.rotPointX + rect.width + this._hitboxOffset.x, y: - t.rotPointY + rect.height + this._hitboxOffset.y}),
                m.transformPoint({ x: - t.rotPointX + this._hitboxOffset.x,              y: - t.rotPointY + rect.height + this._hitboxOffset.y })
                );
           
            return out;
        }

        /**
        * Draws the various bounds on a context that is passed. Useful for debugging.
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

        /*
        * [REQUIRES COMMENTING]
        * 
        */
        public extents(topLeftPoint:Kiwi.Geom.Point,topRightPoint:Kiwi.Geom.Point,bottomRightPoint:Kiwi.Geom.Point,bottomLeftPoint:Kiwi.Geom.Point):Kiwi.Geom.Rectangle {
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


