/**
* 
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * Represents position, scale, rotation and rotationPoint of an Entity.
    * - Values can be transformed with a 3x3 affine transformation matrix, which each transform is assigned.
    * - A tranform can be assigned a parent, which may in turn have it's own parent, thereby creating a tranform inheritence heirarchy
    * - A concatenated transformation matrix, representing the combined matrices of the transform and its ancestors.
    *
    * @class Transform
    * @namespace Kiwi.Geom
    * @constructor
    * @param x {Number} x. X position of the transform.
    * @param y {Number} y. Y position of the transform.
    * @param scaleX {Number} scaleX. X scaling of the transform.
    * @param scaleY {Number} scaleY. Y scaling of the transform.
    * @param rotation {Number} rotation. Rotation of the transform in radians.
    * @param rotX {Number} rotX. rotationPoint offset on X axis.
    * @param rotY {Number} rotY. rotationPoint offset on Y axis.
    * @return {Transform} This object.
    *
    */
    export class Transform {

        constructor(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, rotPointX: number = 0, rotPointY: number = 0) {

            this.setTransform(x, y, scaleX, scaleY, rotation, rotPointX, rotPointY);

            this._matrix = new Matrix();

            this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

            this._cachedConcatenatedMatrix = this.getConcatenatedMatrix();

        }
        /**
        * The type of this object.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Transform";
        }

        /** 
        * X position of the transform
        * @property _x
        * @type Number
        * @private
        **/
        private _x: number = 0;

        /** 
        * Return the X value of the transform.
        * @property x
        * @type Number
        * @return {Number} The X value of the transform.
        */
        public set x(value: number) {
            
            this._x = value;

        }
        public get x():number {
            return this._x;
        }

        /** 
        * Y position of the transform
        * @property _y
        * @type Number
        * @private
        **/
        private _y: number = 0;

        /** 
        * Return the Y value of the transform.
        * @property y
        * @type Number
        * @return {Number} The Y value of the transform.
        * @public
        */
        public set y(value: number) {
            this._y = value;
        }
        public get y(): number {
            return this._y;
        }


        /** 
        * X scaleof the transform
        * @property _scaleX
        * @type Number
        * @private
        **/
        private _scaleX: number = 1;

        /** 
        * Return the X scale value of the transform.
        * @property scaleX
        * @type Number
        * @return {Number} The X value of the transform.
        * @public
        */
        public set scaleX(value: number) {
            this._scaleX = value;
        }

        public get scaleX(): number {
            return this._scaleX;
        }

        /** 
        * Y scale of the transform
        * @property _scaleY
        * @type Number
        * @private
        **/
        private _scaleY: number = 1;

        /** 
        * Return the Y scale value of the transform.
        * @property scaleY
        * @type Number
        * @return {Number} The Y value of the transform.
        * @public
        */
        public set scaleY(value: number) {
            this._scaleY = value;
        }
        public get scaleY():number {
            return this._scaleY;
        }

        /** 
        * Rotation of the transform in radians.
        * @property _rotation
        * @type Number
        * @private
        **/
        private _rotation: number = 0;

        /** 
        * Return the rotation value of the transform in radians.
        * @property rotation
        * @return {Number} The rotation value of the transform.
        * @public
        */
        public set rotation(value: number) {
            this._rotation = value;
        }

        public get rotation():number {
            return this._rotation;
        }

        /** 
        * Rotation offset on X axis.
        * @property _rotPointX
        * @type Number
        * @private
        **/
        private _rotPointX: number = 0;

        /** 
        * Return the Rotation value from the x axis.
        * @property rotPointX
        * @return {Number} The registration value from the x axis.
        * @public
        */
        public set rotPointX(value: number) {
            this._rotPointX = value;
        }

        public get rotPointX(): number {
            return this._rotPointX;
        }

        /** 
        * Rotation offset on Y axis.
        * @property _rotY
        * @type Number
        * @private
        **/
        private _rotPointY: number = 0;

        /** 
        * Return the rotation value from the y axis.
        * @public rotY
        * @return {Number} The rotation value from the y axis.
        * @public
        */
        public set rotPointY(value: number) {
            this._rotPointY = value;
        }

        public get rotPointY(): number {
            return this._rotPointY;
        }

        /** 
        * A 3x3 transformation matrix object that can be use this tranform to manipulate points or the context transformation.
        * @property _matrix
        * @type Object
        * @protected
        **/
        private _matrix: Matrix;

        /** 
        * Return the Matrix being used by this Transform
        * @property matrix
        * @return {Matrix} The Matrix being used by this Transform
        */
        public get matrix(): Matrix {

            return this._matrix;

        }

        /** 
        * The most recently calculated matrix from getConcatenatedMatrix.
        * @property _cachedConcatenatedMatrix
        * @type Kiwi.Geom.Matrix
        * @private
        **/
        private _cachedConcatenatedMatrix: Matrix;

        /** 
        * Return the x of this transform translated to world space.
        * @property worldX
        * @return {Number} x coordinate in world space
        * @public
        */
        public get worldX(): number {

            return this.getConcatenatedMatrix().tx;

        }

        /** 
        * Return the y of this transform translated to world space.
        * @property worldY
        * @return {Number} y coordinate in world space
        * @public
        */
        public get worldY(): number {

            return this.getConcatenatedMatrix().ty;

        }


        /** 
        * The parent transform. If set to null there is no parent. Otherwise this is used by getConcatenatedMatrix to offset the current transforms by the another matrix
        * @property _parent
        * @type Kiwi.Geom.Transform
        * @private
        **/
        private _parent: Transform;

        /** 
        * Return the parent Transform, if any.
        * @property parent
        * @return {Transform} The parent Transform, or null.
        * @public
        */
        
        public set parent(value: Transform) {
            if(!this.checkAncestor(value)) {
                this._parent = value;
            }
        }

        public get parent(): Transform {
            return this._parent;
        }

        /** 
        * Set the X and Y values of the transform.
        * @method setPosition
        * @param x {Number} x.
        * @param y {Number} y.
        * @return {Transform} This object.
        * @public
        */
        public setPosition(x: number, y: number): Transform {

            this._x = x;
            this._y = y;
            //this.owner.dirty = true;

            return this;
        }

        /** 
        * Set the X and Y values of the transform from a point.
        * @method setPositionPoint
        * @param point {Kiwi.Geom.Point} point.
        * @return {Transform} This object.
        * @public
        */
        public setPositionFromPoint(point: Point): Transform {

            this._x = point.x;
            this._y = point.y;
            //this.owner.dirty = true;

            return this;

        }

        /** 
        * Translate the X and Y value of the transform by point components.
        * @method translatePositionFromPoint
        * @param point {Point} point.
        * @return {Transform} This object.
        */
        public translatePositionFromPoint(point: Point): Transform {

            this._x += point.x;
            this._y += point.y;
            //this.owner.dirty = true;

            return this;

        }

        /** 
        * Return a Point representing the X and Y values of the transform. If none is given a new Point objected will be created.
        * @method getPostionPoint
        * @return {Kiwi.Geom.Point} A point representing the X and Y values of the transform.
        * @public
        */
        public getPositionPoint(output: Point = new Kiwi.Geom.Point): Point {

            return output.setTo(this._x, this._y);

        }

        /** 
	    * Set the X and Y scale value of the transform.
	    * @method scale
	    * @param value {Number} 
        * @return {Transform} This object.
        * @public
	    */
        public set scale(value:number) {

            this._scaleX = value;
            this._scaleY = value;
            //this.owner.dirty = true;

        }

        /** 
        * Set the core properties of the transform 
        * @method setTransform
        * @param x {Number} x. X position of the transform.
        * @param y {Number} y. Y position of the transform.
        * @param scaleX {Number} scaleX. X scaling of the transform.
        * @param scaleY {Number} scaleY. Y scaling of the transform.
        * @param rotation {Number} rotation. Rotation of the transform in radians.
        * @param rotX{Number} rotX. Rotation offset on X axis.
        * @param rotY{Number} rotY. Rotation offset on Y axis.
        * @return {Transform} This object.
        * @public
        */
        public setTransform(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, rotPointX: number = 0, rotPointY: number = 0): Transform {

            this._x = x;
            this._y = y;
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._rotation = rotation;
            this._rotPointX = rotPointX;
            this._rotPointY = rotPointY;

            //if (this.owner)
            //{
            //    this.owner.dirty = true;
            //}

            return this;

        }

        /** 
        * Return the parent matrix of the transform. If there is no parent then null is returned.
        * @method getParentMatrix
        * @return {Matrix} The parent transform matrix.
        * @public
        */
        public getParentMatrix(): Matrix {

            if (this._parent)
            {
                return this._parent.getConcatenatedMatrix();
            }

            return null
        }

        /** 
        * Return the transformation matrix that concatenates this transform with all ancestor transforms.
        * If there is no parent then this will return a matrix the same as this transforms matrix.
        * @method getConcatenatedMatrix
        * @return {Matrix} The concatenated matrix.
        * @public
        */
        public getConcatenatedMatrix(): Matrix {

            this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

            var parentMatrix = this.getParentMatrix();

            if (parentMatrix) {
                var matrix = this._matrix.clone();
                matrix.prependMatrix(parentMatrix);
                this._cachedConcatenatedMatrix.copyFrom(matrix);
                return matrix;
            }

            return this._matrix;

        }

        /** 
        * Return the x of this transform translated to a camera space
        * @method getCameraX
        * @param camera {Object} the camera 
        * @return {Number} x coordinate in the camera space
        
	    public getCameraX ( camera:Camera ):number
	    {
		    var mat = this.getConcatenatedMatrix();
		    mat.prependMatrix(camera.transform.getConcatenatedMatrix());
   		    return mat.tx;
    	}

        /** 
        * Return the y of this transform translated to a camera space
        * @method getCameraY
        * @param camera {Object} the camera 
        * @return {Number} y coordinate in the camera space
        	
	    public getCameraY ( camera:Camera ):number
	    {
		    var mat = this.getConcatenatedMatrix();
		    mat.prependMatrix(camera.transform.getConcatenatedMatrix());
   		    return mat.ty;
    	}
        */

        /** 
	    * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
	    * @method transformPoint
        * @param point {Point} point
        * @return {Point}
        * @public
	    */
        public transformPoint(point: Point): Point {

            var mat = this.getConcatenatedMatrix();

            return mat.transformPoint(point);

        }

        /** 
        * Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
        * @method copyFrom
        * @param transform {Transform} transform. The tranform to be copied from.
        * @return {Transform} This object.
        * @public
        */
        public copyFrom(source: Transform): Transform {

            this.setTransform(source.x, source.y, source.scaleX, source.scaleY, source.rotation, source.rotPointX, source.rotPointY);

            this.parent = source.parent;

            //this.owner = source.owner;

            this._matrix = source.matrix.clone();

            return this;

        }

        /** 
	     * Copy this transforms data to the destination Transform. A clone of this transforms matrix is created in the destination Transform Matrix.
	     * @method copyTo
	     * @param destination {Transform} The tranform to copy to.
         * @return {Transform} This object.
         * @public
	     */
        public copyTo(destination: Transform): Transform {

            destination.copyFrom(this);

            return this;

        }

        /** 
	     * Return a clone of this transform.
	     * @method clone
	     * @param output {Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
         * @return {Transform} A clone of this object.
         * @public
	     */
        public clone(output: Transform = new Transform()): Transform {

            output.copyFrom(this);

            return output;

        }

        /** 
	     * Recursively check that a transform does not appear as its own ancestor
	     * @method checkAncestor
         * @param transform{Transform} The Transform to check.
	     * @return {boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
         * @public
	     */
        public checkAncestor(transform: Transform): boolean {
            
            /*if (transform === this)
            {
                return true
            }

            if (transform.parent !== null)
            {
                return (this.checkAncestor(transform._parent))
            }*/
        
            return false;

        }

        /** 
        * Return a string represention of this object.
        * @method toString
        * @return {string} A string represention of this object.
        * @public
        */
        public get toString(): string {

            return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._rotPointX + " regY=" + this.rotPointY + " matrix=" + this._matrix + ")}]";

        }

    }

}