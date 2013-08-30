

module Kiwi.Components {

    export class Box extends Component {

        /**
        * 
        * @constructor
        * @param {Number} x
        * @param {Number} y
        * @param {Number} width
        * @param {Number} height
        * @return {Bounds}
        */
        constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
            
  
            super('Box');

            this.dirty = true;

            this._rawBounds = new Kiwi.Geom.Rectangle(x,y,width,height);
            this._rawCenter = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
            this._rawHitbox = new Kiwi.Geom.Rectangle();

            this._hitboxOffset = new Kiwi.Geom.Point();

            this.hitbox = new Kiwi.Geom.Rectangle(0, 0, width, height); 
            
         
              
            
            //  Signals

            //  Properties
           

        }

        public objType() {
            return "Box";
        }

        public dirty: boolean;

        //contains offset rect
        private _hitboxOffset: Kiwi.Geom.Point;

        private _rawHitbox: Kiwi.Geom.Rectangle;
        


        public get rawHitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rawHitbox.x = this._rawBounds.x + this._hitboxOffset.x;
                this._rawHitbox.y = this._rawBounds.y + this._hitboxOffset.y;
                
            }
            
            return this._rawHitbox;
        }

        private _transformedHitbox: Kiwi.Geom.Rectangle;
        
        public get hitbox(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedHitbox = this._rotateHitbox(this.rawHitbox.clone());
            }
            return this._transformedHitbox;

        }

        public set hitbox(value: Kiwi.Geom.Rectangle) {
            
            this._hitboxOffset.x = value.x;
            this._hitboxOffset.y = value.y;

            this._rawHitbox = value;
            
            this._rawHitbox.x += this._rawBounds.x;
            this._rawHitbox.y += this._rawBounds.y;
         
        }

        private _rawBounds: Kiwi.Geom.Rectangle;
        public get rawBounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rawBounds.x = this.entity.x;
                this._rawBounds.y = this.entity.y;
                this._rawBounds.width = this.entity.width;
                this._rawBounds.height = this.entity.height;
            }
            return this._rawBounds;
        }

        private _rawCenter: Kiwi.Geom.Point;

        public get rawCenter(): Kiwi.Geom.Point {
            if (this.dirty) {
                this._rawCenter.x = this.rawBounds.x + this.rawBounds.width / 2,
                this._rawCenter.y = this.rawBounds.y + this.rawBounds.height / 2;
            }
            return this._rawCenter;
        }

        private _transformedCenter: Kiwi.Geom.Point;

        public get center(): Kiwi.Geom.Point {
            if (this.dirty) {
                var t: Kiwi.Geom.Transform = this.entity.transform;
                var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
                m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)
                this._transformedCenter = m.transformPoint(new Kiwi.Geom.Point(this.entity.width / 2 - t.rotPointX, this.entity.height / 2 - t.rotPointY));

            }
            return this._transformedCenter;
        }


        private _transformedBounds: Kiwi.Geom.Rectangle;

        public get bounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._transformedBounds = this.rawBounds.clone();
                this._transformedBounds = this._rotateRect(this.rawBounds.clone()); 
            }
            return this._transformedBounds;
        }
               
        private _rotateRect(rect: Kiwi.Geom.Rectangle): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            m.setTo(m.a, m.b, m.c, m.d, t.x + t.rotPointX, t.y + t.rotPointY)
            
           
            out = this.extents(
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY}),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY + rect.height }),
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY + rect.height })
                );
            
         

            return out;
        }

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

        
        public extents(topLeftPoint:Kiwi.Geom.Point,topRightPoint:Kiwi.Geom.Point,bottomRightPoint:Kiwi.Geom.Point,bottomLeftPoint:Kiwi.Geom.Point):Kiwi.Geom.Rectangle {
            var left: number = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var right: number = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var top: number = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            var bottom: number = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);

            return new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);


        }

      
	

    }

}


