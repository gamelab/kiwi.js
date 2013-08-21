

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
           
            
            //  Signals

            //  Properties
           

        }

        public objType() {
            return "Box";
        }

        public dirty: boolean;

        private _bounds: Kiwi.Geom.Rectangle;

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

            var angle: number = t.rotation;
            var rx = t.rotPointX; 
            var ry = t.rotPointY;

            var m: Kiwi.Geom.Matrix = this.entity.transform.matrix;
            //m.translate(this.center.x, this.center.y);
            
            out = this.extents(
                m.transformPoint({ x: rect.x, y: rect.y }),
                m.transformPoint({ x: rect.x + rect.width, y: rect.y }),
                m.transformPoint({ x: rect.x + rect.width, y: rect.y + rect.height }),
                m.transformPoint({ x: rect.x, y: rect.y + rect.height })
                );
            
            return out;
        }


        public draw(ctx: CanvasRenderingContext2D) {
            var t: Kiwi.Geom.Transform = this.entity.transform;
            ctx.strokeStyle = "red";
           //ctx.fillStyle = "red";
            //ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
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

        //needs updating.
        public calculateBounds(transform: Kiwi.Geom.Transform, width:number, height:number) {
            /*
            var centerPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(width / 2, height / 2);
            var topLeftPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(0, 0);
            var bottomLeftPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(0, height);
            var topRightPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(width, 0);
            var bottomRightPoint: Kiwi.Geom.Point = new Kiwi.Geom.Point(width, height);
            
            var posx = transform.x;
            var posy = transform.y;
            var ox = transform.transformPoint(transform.getPositionPoint()).x;
            var oy = transform.transformPoint(transform.getPositionPoint()).y;
            
            this._transformPoint(centerPoint, transform, posx, posy, ox, oy);
            this._transformPoint(topLeftPoint, transform, posx, posy, ox, oy);
            this._transformPoint(bottomLeftPoint, transform, posx, posy, ox, oy);
            this._transformPoint(topRightPoint, transform, posx, posy, ox, oy);
            this._transformPoint(bottomRightPoint, transform, posx, posy, ox, oy);
                     
            var left:number = Math.min(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var right:number = Math.max(topLeftPoint.x, topRightPoint.x, bottomRightPoint.x, bottomLeftPoint.x);
            var top:number = Math.min(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
            var bottom:number = Math.max(topLeftPoint.y, topRightPoint.y, bottomRightPoint.y, bottomLeftPoint.y);
               
            this._AABB = new Kiwi.Geom.Rectangle(left, top, right - left, bottom - top);

            var sx: number = Math.abs(transform.scaleX);
            var sy: number = Math.abs(transform.scaleY);

            

            var ubW = (width - this.offsetWidth) * sx;
            var ubH = (height - this.offsetHeight) * sy;
            var ubX = (centerPoint.x - this.offsetX * sx) - ubW / 2;
            var ubY = (centerPoint.y - this.offsetY * sy) - ubH / 2;

            this._rect = new Kiwi.Geom.Rectangle(ubX, ubY, ubW, ubH);
            */
        }

        private _transformPoint(point:Kiwi.Geom.Point,trans:Kiwi.Geom.Transform,x,y,ox,oy) {
         /*   // translate origin inverse
        
            point.x -= ox;
            point.y -= oy;

            // apply transform
            point = trans.transformPoint(point);

            //translate back again
            point.x += ox + x;
            point.y += oy + y;
        */
            
        }

	

    }

}


