

module Kiwi.Components {

    export class Box extends Component {

        /**
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @return {Kiwi.Components.Box}
        */
        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            
            super('Box');

            this.dirty = true;

            this._rawBounds = new Kiwi.Geom.Rectangle(x,y,width,height);
            this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
            this._rawHitbox = new Kiwi.Geom.Rectangle();

            this._hitboxOffset = new Kiwi.Geom.Point();

            this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height); 
            
        }

        /*
        * The type of object that this is.
        * @method objType
        * @return {string}
        */
        public objType() {
            return "Box";
        }

        /*
        * Indicates weither or not this component needs re-rendering/updating or not.
        * @property dirty
        * @type boolean
        */
        public dirty: boolean;

        /*
        * Contains offset point for the hitbox 
        * @property _hitboxOffset
        * @type Kiwi.Geom.Point
        */
        private _hitboxOffset: Kiwi.Geom.Point;
        
        /*
        * Contains the offset rectangle for the raw hitbox.
        * @property _rawHitbox
        * @type Kiwi.Geom.Rectangle
        */
        private _rawHitbox: Kiwi.Geom.Rectangle;
        
        /*
        * Returns the raw hitbox rectangle for the developer to use. 
        * 'Raw' means where it would be without rotation or scaling.
        * @type Kiwi.Geom.Rectangle
        */
        public get rawHitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rawHitbox.x = this._rawBounds.x + this._hitboxOffset.x;
                this._rawHitbox.y = this._rawBounds.y + this._hitboxOffset.y;
                
            }
            
            return this._rawHitbox;
        }
        
        /*
        * The transformed or 'normal' hitbox for the entity. This is its box after rotation/e.t.c.
        * @property _transformedHitbox
        * @type Kiwi.Geom.Rectangle
        */
        private _transformedHitbox: Kiwi.Geom.Rectangle;
        
        /*
        * Returns the 'normal' or transformed hitbox for the entity. This is its box after rotation/e.t.c. 
        * @type Kiwi.Geom.Rectangle
        */
        public get hitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
            }

            return this._transformedHitbox;
        }
        
        /*
        * Sets the hitbox based of a rectangle that you specify.
        * @type Kiwi.Geom.Rectangle
        */
        public set hitbox(value: Kiwi.Geom.Rectangle) {
            
            this._hitboxOffset.x = value.x;
            this._hitboxOffset.y = value.y;

            this._rawHitbox = value;
            
            this._rawHitbox.x += this._rawBounds.x;
            this._rawHitbox.y += this._rawBounds.y;
         
        }

        /*
        * The 'raw' bounds of entity. This is its bounds before rotation/scale.
        * @property _rawBounds
        * @type Kiwi.Geom.Rectangle
        */
        private _rawBounds: Kiwi.Geom.Rectangle;

        /*
        * Returns the 'raw' bounds for this entity.
        * @type Kiwi.Geom.Rectangle
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
    
        /*
        * Contains the 'raw' center point for the bounds.
        * @property Kiwi.Geom.Point
        * @type Kiwi.Geom.Point
        */
        private _rawCenter: Kiwi.Geom.Point;
        
        /*
        * Returns the raw center point of the box.
        * @type Kiwi.Geom.Point
        */
        public get rawCenter(): Kiwi.Geom.Point {
            if (this.dirty) {
                this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2,
                this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;
            }
            return this._rawCenter;
        }
    
        /*
        * Contains the center point after the box has been transformed.
        * @property _transformedCenter
        * @type Kiwi.Geom.Point
        */
        private _transformedCenter: Kiwi.Geom.Point;
            
        /*
        * Returns the center point for the box after it has been transformed.
        * @type Kiwi.Geom.Point
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

        /*
        * Contains the transformed or 'normal' bounds for this entity.
        * @property _transformedBounds
        * @type Kiwi.Geom.Rectangle
        */
        private _transformedBounds: Kiwi.Geom.Rectangle;
        
        /*
        * Returns the 'transformed' or 'normal' bounds for this box. 
        * @type Kiwi.Geom.Rectangle
        */
        public get bounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedBounds = this.rawBounds.clone();
                this._transformedBounds = this._rotateRect(this.rawBounds.clone()); 
            }
            return this._transformedBounds;
        }

        /*
        * Private internal method only. Used to rotate a rectangle but a set about.
        * @method _rotateRect
        * @param {Kiwi.Geom.Rectangle} rect
        * @return {Kiwi.Geom.Rectangle}
        */      
        private _rotateRect(rect: Kiwi.Geom.Rectangle): Kiwi.Geom.Rectangle {
    var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Recta             var t: Kiwi.Ge m Transform = this.entity.tran            var  : Ki i.Ge m.Ma rix = t.getConcate ate M trix();
    m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)


                
            ou  = this.exten
            s(
         .transformPoint({ 
            :   t.rotPointX, y  - t.rotPoi tY }),
                    int({ x: - t.rotPo
            nt  + rect.width   : - t.rotPo nt }),
                m.tran
        for         tPointX + rect.wid
            h, y: - t.rotPoin Y   rect.height  ) 
         
                  n t({ x: - t.rotPointX, y: - t.rotPointY + rect.height })
                );
    
    

    return out;
        }

        /*
        * Rotates the hitbox by an set amount.
        * @method _rotateHitbox
        * @param {Kiwi.Geom.Rectangle}
        * @return {Kiwi.Geom.Rectangle}
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

        /*
        * Draws the various bounds on a context that is passed. Useful for debugging.
        * @method draw
        * @param {CanvasRenderingContext2D} ctx
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
        * ?????
        * 
        */
        public extents(topLeftPoint:Kiwi.Geom.Point,topRightPoint:Kiwi.Geom.Point,bottomRightPoint:Kiwi.Geom.Point,bottomLeftPoint:Kiwi.Geom.Point):Kiwi.Geom.Rectangle {
            var left: number = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var right: number = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var top: number = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            var bottom: number = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

            return new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);


        }

      
	

    }

}


