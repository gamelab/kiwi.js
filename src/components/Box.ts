

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

            this._bounds = new Kiwi.Geom.Rectangle(x,y,width,height);
            this._rotatedBounds = new Kiwi.Geom.Rectangle();
            this._center = new Kiwi.Geom.Point(x + width / 2, y + height / 2);
            this._hitbox = this._bounds.clone();
            
            //  Signals

            //  Properties
           

        }

        public objType() {
            return "Box";
        }

        public dirty: boolean;

        private _bounds: Kiwi.Geom.Rectangle;
        private _hitbox: Kiwi.Geom.Rectangle;
        

        public get bounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._bounds.x = this.entity.x;
                this._bounds.y = this.entity.y;
                this._bounds.width = this.entity.width;
                this._bounds.height = this.entity.height;
            }
            return this._bounds;
        }

        private _center: Kiwi.Geom.Point;

        public get center(): Kiwi.Geom.Point {
            if (this.dirty) {
                this._center.x = this.bounds.x + this.bounds.width / 2,
                this._center.y = this.bounds.y + this.bounds.height / 2;
            }
            return this._center;
        }

        private _rotatedBounds: Kiwi.Geom.Rectangle;

        public get rotatedBounds(): Kiwi.Geom.Rectangle {
            if (this.dirty) {
                this._rotatedBounds = this.bounds.clone();
                this._rotatedBounds = this._rotateRect(this.bounds.clone()); 
            }
            return this._rotatedBounds;
        }

        
        
        

       
        private _rotateRect(rect: Kiwi.Geom.Rectangle): Kiwi.Geom.Rectangle {
            var out: Kiwi.Geom.Rectangle = new Kiwi.Geom.Rectangle();
            var t: Kiwi.Geom.Transform = this.entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            
            
            m.setTo(m.a,m.b, m.c, m.d, t.x+t.rotPointX, t.y +t.rotPointY)
            var rotatedCenter: Kiwi.Geom.Point = m.transformPoint(new Kiwi.Geom.Point(this.entity.width / 2 - t.rotPointX, this.entity.height / 2 - t.rotPointY));

            out = this.extents(
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY }),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY}),
                m.transformPoint({ x: - t.rotPointX + rect.width, y: - t.rotPointY + rect.height }),
                m.transformPoint({ x: - t.rotPointX, y: - t.rotPointY + rect.height })
                );
            
         

            return out;
        }


        public draw(ctx: CanvasRenderingContext2D) {
            var t: Kiwi.Geom.Transform = this.entity.transform;
            ctx.strokeStyle = "red";
           /
            ctx.strokeRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            ctx.fillRect(this.center.x - 1, this.center.y - 1, 3, 3);
            ctx.strokeRect(t.x + t.rotPointX - 3 , t.y + t.rotPointY - 3, 7, 7);
            ctx.strokeStyle = "blue";
            ctx.strokeRect(this.rotatedBounds.x, this.rotatedBounds.y, this.rotatedBounds.width, this.rotatedBounds.height);
           

           

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


