/**
*  
* @module Kiwi
* @submodule Geom
*/

module Kiwi.Geom {

    /**
    * Represents a 2d transformation matrix. This can be used to map points between different coordinate spaces. Matrices are used
	* by Transform objects to represent translation, scale and rotation transformations, and to determine where objects are in world space or camera space.
	* Objects such as entities and groups may be nested, and their associated transforms may represent how they are scaled, translated and rotated relative to a parent
    * transform.
    * By concatenating an object's transformatkion matrix with it's ancestors matrices, it is possible to determine the absolute position of the object in world space.
    * See http://en.wikipedia.org/wiki/Transformation_matrix#Examples_in_2D_graphics for an in depth discussion of 2d tranformation matrices.
    * 
    * @class Matrix
    * @namespace Kiwi.Geom
    * @constructor
    * @param [a = 1] {Number}  position 0,0 of the matrix, affects scaling and rotation.
    * @param [b = 0] {Number}  position 0,1 of the matrix, affects scaling and rotation.
    * @param [c = 0] {Number}  position 1,0 of the matrix, affects scaling and rotation.
    * @param [d = 1] {Number}  position 1,1 of the matrix, affects scaling and rotation.
    * @param [tx = 0] {Number}  position 2,0 of the matrix, affects translation on x axis.
    * @param [ty = 0] {Number}  position 2,1 of the matrix, affects translation on y axis.
    * @return (Object) This object.
    * 
    */
    export class Matrix {
         
        constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {

            this.setTo(a, b, c, d, tx, ty);

        }

        public objType() {
            return "Matrix";
        }

        public a: number = 1;
        public b: number = 0;
        public c: number = 0;
        public d: number = 1;
        public tx: number = 0;
        public ty: number = 0;

        /** 
        * Set all matrix values 
        * @method setTo
        * @param [a = 1] {Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b = 0] {Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c = 0] {Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d = 1] {Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx = 0] {Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty = 0] {Number} position 2,1 of the matrix, affects translation on y axis.
        * @return (Object) This object.
        */
        public setTo(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0): Matrix {

            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;

            return this;

        }

        /** 
	    * Set matrix values from transform values
	    * @method setFromTransform
	    * @Param tx {Number} tx. Translation on x axis.
	    * @Param ty {Number} ty. Translation on y axis.
	    * @Param scaleX {Number} scaleX. Scale on x axis.
	    * @Param scaleY {Number} scaleY. Scale on y axis.
	    * @Param rotation {Number} rotation. 
	    * @return {Object} This object.
	    */
          public setFromTransform(tx: number, ty: number, scaleX: number, scaleY: number, rotation: number) {
            this.identity();
            var cos = Math.cos(rotation);
            var sin = Math.sin(rotation);

            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, tx, ty);

            return this;
        }

        /** 
        * Prepend values to this matrix, paramters supplied individually.
        * @method prepend
        * @param [a = 1]{Number} position 0,0 of the matrix, affects scaling and rotation.
        * @param [b = 0]{Number} position 0,1 of the matrix, affects scaling and rotation.
        * @param [c = 0]{Number} position 1,0 of the matrix, affects scaling and rotation.
        * @param [d = 0]{Number} position 1,1 of the matrix, affects scaling and rotation.
        * @param [tx = 0]{Number} position 2,0 of the matrix, affects translation on x axis.
        * @param [ty = 0]{Number} position 2,1 of the matrix, affects translation on y axis.
        * @return {Object} This object.
        */
        public prepend(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0): Matrix {
            var tx1 = this.tx;
            var a1 = this.a;
            var c1 = this.c;

            this.a = a1 * a + this.b * c;
            this.b = a1 * b + this.b * d;
            this.c = c1 * a + this.d * c;
            this.d = c1 * b + this.d * d;

            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
            return this;

        }

        /** 
        * Prepend a matrix to this matrix.
        * @method prependMatrix
        * @param {Object} m. The matrix to prepend.
        * @return {Object} This object.
        */
        public prependMatrix(m: Matrix): Matrix {
            var tx1 = this.tx;
            var a1 = this.a;
            var c1 = this.c;

            this.a = a1 * m.a + this.b * m.c;
            this.b = a1 * m.b + this.b * m.d;
            this.c = c1 * m.a + this.d * m.c;
            this.d = c1 * m.b + this.d * m.d;

            this.tx = tx1 * m.a + this.ty * m.c + m.tx;
            this.ty = tx1 * m.b + this.ty * m.d + m.ty;
            return this;

        }

        /** 
	    * Append values to this matrix, paramters supplied individually.
	    * @method append
	    * @param [a = 1]{Number} position 0,0 of the matrix, affects scaling and rotation.
	    * @param [b = 0]{Number} position 0,1 of the matrix, affects scaling and rotation.
	    * @param [c = 0]{Number} position 1,0 of the matrix, affects scaling and rotation.
	    * @param [d = 1]{Number} position 1,1 of the matrix, affects scaling and rotation.
	    * @param [tx = 0]{Number} position 2,0 of the matrix, affects translation on x axis.
	    * @param [ty = 0]{Number} position 2,1 of the matrix, affects translation on y axis.
	    * @return {Object} This object.
	    */
        public append(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0): Matrix {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;

            this.a = a * a1 + b * c1;
            this.b = a * b1 + b * d1;
            this.c = c * a1 + d * c1;
            this.d = c * b1 + d * d1;
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        }

        /** 
        * Append a matrix to this matrix.
        * @method appendMatrix
        * @param m {Object} The matrix to append.
        * @return {Object} This object.
        */
        public appendMatrix(m: Matrix): Matrix {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;

            this.a = m.a * a1 + m.b * c1;
            this.b = m.a * b1 + m.b * d1;
            this.c = m.c * a1 + m.d * c1;
            this.d = m.c * b1 + m.d * d1;
            this.tx = m.tx * a1 + m.ty * c1 + this.tx;
            this.ty = m.tx * b1 + m.ty * d1 + this.ty;
            return this;
        }

        /** 
        * Set the tx and ty elements of the matrix
        * @method setPosition
        * @param x {Number} Translation on x axis.
        * @param y {Number} Translation on y axis.
        * @return  {Object} This object.
        */
        public setPosition(x: number, y: number): Matrix {
            this.tx = x;
            this.ty = y;
            return this;
        }

        /** 
	    * Set the tx and ty elements of the matrix from an object with x and y properties.
	    * @method setPositionVector
	    * @param p {Number} The object from which to copy the x and y properties from.
	    * @return  {Object} This object.
	    */
        public setPositionPoint(p: any): Matrix {
            this.tx = p.x;
            this.ty = p.y;
            return this
        }

        /** 
	    * Get the x and y position of the matrix as an object with x and y properties
	    * @method setPositionVector
	    * @return {Object} An object constructed from a literal with x and y properties.
	    */
        public getPosition(output: Kiwi.Geom.Point = new Kiwi.Geom.Point): Kiwi.Geom.Point {
            return output.setTo(this.tx, this.ty);
        }

        /** 
	    * Set the matrix to the identity matrix - when appending or prepending this matrix to another there will be no change in the resulting matrix
	    * @method identity
	    * @return {Object} This object.
	    */
        public identity(): Matrix {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;
            return this;
        }

        /** 
	    * Rotate the matrix by "radians" degrees
	    * @method rotate
	    * @param radians{Number} radians. 
	    * @return {Object} This object.
        */
        public rotate(radians: number): Matrix {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);

            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;

            this.a = a1 * cos - this.b * sin;
            this.b = a1 * sin + this.b * cos;
            this.c = c1 * cos - this.d * sin;
            this.d = c1 * sin + this.d * cos;
            this.tx = tx1 * cos - this.ty * sin;
            this.ty = tx1 * sin + this.ty * cos;
            return this;

        }

        /** 
	    * Translate the matrix
	    * @method transalte
	    * @Param tx {Number} tx. The amount to translate on the x axis.
	    * @Param ty {Number} ty. The amount to translate on the y axis.
	    * @return {Object} This object.
	    */
        public translate(tx: number, ty: number): Matrix {
            this.tx += tx;
            this.ty += ty;
            return this;
        }

        /** 
	    * Scale the matrix
	    * @method scale
	    * @Param {Number} scaleX. The amount to scale on the x axis.
	    * @Param {Number} scaleY. The amount to scale on the y axis.
	    * @return {Object} This object.
	    */
        public scale(scaleX: number, scaleY: number): Matrix {
            this.a *= scaleX;
            this.d *= scaleY;
            return this;
        }

        /** 
	    * Apply this matrix to a an object with x and y properties representing a point and return the transformed point.
	    * @method transformPoint
	    * @param pt {Object} The point to be translated.
	    * @return {Object} The translated point.
	    */
        public transformPoint(pt: any) {
            var x = pt.x;
            var y = pt.y
            pt.x = this.a * x + this.c * y + this.tx;
            pt.y = this.b * x + this.d * y + this.ty;
            return pt;
        }

        /** 
	    * Invert this matrix so that it represents the opposite of it's orginal tranformaation.
	    * @method transformPoint
	    * @return {Object} This object.
	    */
        public invert(): Matrix {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;

            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
        }

        /** 
	     * Copy another matrix to this matrix.
	     * @method copyFrom
	     * @param m {Object} The matrixto be copied from.
	     * @return {Object} This object.
	     */
        public copyFrom(m: Matrix): Matrix {
            this.a = m.a;
            this.b = m.b;
            this.c = m.c;
            this.d = m.d;
            this.tx = m.tx;
            this.ty = m.ty;

            return this;
        }

        /** 
        * Copy this matrix to another matrix.
        * @method copyTo
        * @param m {Object} The matrix to copy to.
        * @return {Object} This object.
        */
        public copyTo(m: Matrix): Matrix {
            m.a = this.a;
            m.b = this.b;
            m.c = this.c;
            m.d = this.d;
            m.tx = this.tx;
            m.ty = this.ty;
            return this;
        }

        /** 
	    * Clone this matrix
	    * @method clone
	    * @return {Object} The new clone of this matrix.
	    */
        public clone(): Matrix {
            return new Kiwi.Geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        }

        /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        public get toString(): string {

            return "[{Matrix (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")}]";

        }

    }

}