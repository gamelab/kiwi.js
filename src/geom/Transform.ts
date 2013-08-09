/// <reference path="Matrix.ts" />

/**
 *	Kiwi - Geom - Transform
 *
 *	@desc 		Represents position, scale, rotation and registration of an Entity.
 *				- A transform is a component and implements all properties and methods required by components.
 *				- Values can be transformed with a 3x3 affine transformation matrix, which each transform is assigned.
 *				- A tranform can be assigned a parent, which may in turn have it's own parent, thereby creating a tranform inheritence heirarchy
 *				- A concatenated transformation matrix, representing the combined matrices of the transform and its ancestors.
 *
 *	@version 	0.2 - 18th October 2012
 *
 *	@author 	Ross Kettle
 *	@author 	Richard Davey
 *
 *	@url 		http://www.kiwijs.org
 *
 *	@todo 		Check tranforms don't have themselves as ancestors
*/

module Kiwi.Geom {

    export class Transform {

        /** 
        * Constructor
        * @param {Number} x. X position of the transform.
        * @param {Number} y. Y position of the transform.
        * @param {Number} scaleX. X scaling of the transform.
        * @param {Number} scaleY. Y scaling of the transform.
        * @param {Number} rotation. Rotation of the transform in radians.
        * @param {Number} regX. Registration offset on X axis.
        * @param {Number} regY. Registration offset on Y axis.
        * @return {Kiwi.Geom.Transform} This object.
        */
        constructor(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, regX: number = 0, regY: number = 0) {

            this.setTransform(x, y, scaleX, scaleY, rotation, regX, regY);

            this._matrix = new Matrix();

            this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

            this._cachedConcatenatedMatrix = this.getConcatenatedMatrix();

        }

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
        * @method x
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
        * @method y
        * @return {Number} The Y value of the transform.
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
        * @method scaleX
        * @return {Number} The X value of the transform.
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
        * @method scaleY
        * @return {Number} The Y value of the transform.
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
        * @method rotation
        * @return {Number} The rotation value of the transform.
        */
        public set rotation(value: number) {
            this._rotation = value;
        }

        public get rotation():number {
            return this._rotation;
        }

        /** 
        * Registration offset on X axis.
        * @property _regX
        * @type Number
        * @private
        **/
        private _regX: number = 0;

        /** 
        * Return the registration value from the x axis.
        * @method regX
        * @return {Number} The registration value from the x axis.
        */
        public set regX(value: number) {
            this._regX = value;
        }

        public get regX(): number {
            return this._regX;
        }

        /** 
        * Registration offset on Y axis.
        * @property _regY
        * @type Number
        * @private
        **/
        private _regY: number = 0;

        /** 
        * Return the registration value from the y axis.
        * @method regY
        * @return {Number} The registration value from the y axis.
        */
        public set regY(value: number) {
            this._regY = value;
        }

        public get regY(): number {
            return this._regY;
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
        * @method matrix
        * @return {Kiwi.Geom.Matrix} The Matrix being used by this Transform
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
        * @method worldX
        * @return {Number} x coordinate in world space
        */
        public get worldX(): number {

            return this.getConcatenatedMatrix().tx;

        }

        /** 
        * Return the y of this transform translated to world space.
        * @method worldY
        * @return {Number} y coordinate in world space
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
        * @method parent
        * @return {Kiwi.Geom.Transform} The parent Transform, or null.
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
        * @param {Number} x.
        * @param {Number} y.
        * @return {Kiwi.Geom.Transform} This object.
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
        * @param {Kiwi.Geom.Point} point.
        * @return {Kiwi.Geom.Transform} This object.
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
        * @param {Kiwi.Geom.Point} point.
        * @return {Kiwi.Geom.Transform} This object.
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
        */
        public getPositionPoint(output: Point = new Kiwi.Geom.Point): Point {

            return output.setTo(this._x, this._y);

        }

        /** 
	    * Set the X and Y scale value of the transform.
	    * @method scale
	    * @param {Number} scaleX.
	    * @param {Number} scaleY.
        * @return {Kiwi.Geom.Transform} This object.
	    */
        public set scale(value:number) {

            this._scaleX = value;
            this._scaleY = value;
            //this.owner.dirty = true;

        }

        /** 
        * Set the core properties of the transform 
        * @method setTransform
        * @param {Number} x. X position of the transform.
        * @param {Number} y. Y position of the transform.
        * @param {Number} scaleX. X scaling of the transform.
        * @param {Number} scaleY. Y scaling of the transform.
        * @param {Number} rotation. Rotation of the transform in radians.
        * @param {Number} regX. Registration offset on X axis.
        * @param {Number} regY. Registration offset on Y axis.
        * @return {Kiwi.Geom.Transform} This object.
        */
        public setTransform(x: number = 0, y: number = 0, scaleX: number = 1, scaleY: number = 1, rotation: number = 0, regX: number = 0, regY: number = 0): Transform {

            this._x = x;
            this._y = y;
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._rotation = rotation;
            this._regX = regX;
            this._regY = regY;

            //if (this.owner)
            //{
            //    this.owner.dirty = true;
            //}

            return this;

        }

        /** 
        * Return the parent matrix of the transform. If there is no parent then null is returned.
        * @method getParentMatrix
        * @return {Kiwi.Geom.Matrix} The parent transform matrix.
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
        * @return {Kiwi.Geom.Matrix} The concatenated matrix.
        */
        public getConcatenatedMatrix(): Matrix {

            this._matrix.setFromTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation);

            var parentMatrix = this.getParentMatrix();

            if (parentMatrix)
            {
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
        * @param {Object} the camera 
        * @return (Number) x coordinate in the camera space
        
	    public getCameraX ( camera:Camera ):number
	    {
		    var mat = this.getConcatenatedMatrix();
		    mat.prependMatrix(camera.transform.getConcatenatedMatrix());
   		    return mat.tx;
    	}

        /** 
        * Return the y of this transform translated to a camera space
        * @method getCameraY
        * @param {Object} the camera 
        * @return (Number) y coordinate in the camera space
        	
	    public getCameraY ( camera:Camera ):number
	    {
		    var mat = this.getConcatenatedMatrix();
		    mat.prependMatrix(camera.transform.getConcatenatedMatrix());
   		    return mat.ty;
    	}
        */

        /** 
	     * 
	     * @method transformPoint
         * @param {Kiwi.Geom.Point} point
         * @return {Kiwi.Geom.Point}
	     **/
        public transformPoint(point: Point): Point {

            var mat = this.getConcatenatedMatrix();

            return mat.transformPoint(point);

        }

        /** 
        * Copy another transforms data to this transform. A clone of the source matrix is created for the matrix property.
        * @method copyFrom
        * @param {Kiwi.Geom.Transform} transform. The tranform to be copied from.
        * @return {Kiwi.Geom.Transform} This object.
        */
        public copyFrom(source: Transform): Transform {

            this.setTransform(source.x, source.y, source.scaleX, source.scaleY, source.rotation, source.regX, source.regY);

            this.parent = source.parent;

            //this.owner = source.owner;

            this._matrix = source.matrix.clone();

            return this;

        }

        /** 
	     * Copy this transforms data to the destination Transform. A clone of this transforms matrix is created in the destination Transform Matrix.
	     * @method copyTo
	     * @param {Kiwi.Geom.Transform} transform. The tranform to copy to.
         * @return {Kiwi.Geom.Transform} This object.
	     */
        public copyTo(destination: Transform): Transform {

            destination.copyFrom(this);

            return this;

        }

        /** 
	     * Return a clone of this transform.
	     * @method clone
	     * @param {Kiwi.Geom.Transform} A Transform to copy the clone in to. If none is given a new Transform object will be made.
         * @return {Kiwi.Geom.Transform} A clone of this object.
	     */
        public clone(output: Transform = new Transform()): Transform {

            output.copyFrom(this);

            return output;

        }

        /** 
	     * Recursively check that a transform does not appear as its own ancestor
	     * @method checkAncestor
         * @param {Kiwi.Geom.Transform} The Transform to check.
	     * @return {Boolean} Returns true if the given transform is the same as this or an ancestor, otherwise false.
	     */
        public checkAncestor(transform: Transform): bool {
            
            if (transform === this)
            {
                klog.warn("transform cannot be a parent to itself or an ancestor");
                return true
            }

            if (transform.parent !== null)
            {
                return (this.checkAncestor(transform._parent))
            }
        
            return false;

        }

        /** 
        * Return a string represention of this object.
        * @method toString
        * @return (string) A string represention of this object.
        */
        public get toString(): string {

            return "[{Transform (x=" + this._x + " y=" + this._y + " scaleX=" + this._scaleX + " scaleY=" + this._scaleY + " rotation=" + this._rotation + " regX=" + this._regX + " regY=" + this.regY + " matrix=" + this._matrix + ")}]";

        }

    }

}