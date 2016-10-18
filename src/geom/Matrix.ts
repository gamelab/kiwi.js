/**
@module Kiwi
@submodule Geom
**/

module Kiwi.Geom {

	/**
	Represents a 2d transformation matrix. This can be used to map points
	between different coordinate spaces. Matrices are used by Transform
	objects to represent translation, scale and rotation transformations,
	and to determine where objects are in world space or camera space.
	Objects such as entities and groups may be nested, and their associated
	transforms may represent how they are scaled, translated and rotated
	relative to a parent transform. By concatenating an object's
	transformation matrix with its ancestors matrices, it is possible to
	determine the absolute position of the object in world space.
	See
	http://en.wikipedia.org/wiki/Transformation_matrix#Examples_in_2D_graphics
	for an in depth discussion of 2d transformation matrices.

	@class Matrix
	@namespace Kiwi.Geom
	@constructor
	@param [a=1] {number} Position 0,0 of the matrix;
		affects scaling and rotation
	@param [b=0] {number} Position 0,1 of the matrix;
		affects scaling and rotation
	@param [c=0] {number} Position 1,0 of the matrix;
		affects scaling and rotation
	@param [d=1] {number} Position 1,1 of the matrix;
		affects scaling and rotation
	@param [tx=0] {number} Position 2,0 of the matrix;
		affects translation on x axis
	@param [ty=0] {number} Position 2,1 of the matrix;
		affects translation on y axis
	**/
	export class Matrix {

		constructor( a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0 ) {

			this.setTo( a, b, c, d, tx, ty );

		}

		public objType() {

			/**
			Return the type of object this is.

			@method objType
			@return {String} "Matrix"
			@public
			**/

			return "Matrix";
		}

		/**
		Position 0,0 of the matrix; affects scaling and rotation

		@property a
		@type number
		@default 1
		@public
		**/
		public a: number = 1;

		/**
		Position 0,1 of the matrix; affects scaling and rotation

		@property b
		@type number
		@default 0
		@public
		**/
		public b: number = 0;

		/**
		Position 1,0 of the matrix; affects scaling and rotation

		@property c
		@type number
		@default 0
		@public
		**/
		public c: number = 0;

		/**
		Position 1,1 of the matrix; affects scaling and rotation

		@property d
		@type number
		@default 1
		@public
		**/
		public d: number = 1;

		/**
		Position 2,0 of the matrix; affects translation on x axis

		@property tx
		@type number
		@default 0
		@public
		**/
		public tx: number = 0;

		/**
		Position 2,1 of the matrix; affects translation on y axis

		@property ty
		@type number
		@default 0
		@public
		**/
		public ty: number = 0;

		public setTo( a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0 ): Matrix {

			/**
			Set all matrix values.

			@method setTo
			@param [a=1] {number} Position 0,0 of the matrix;
				affects scaling and rotation
			@param [b=0] {number} Position 0,1 of the matrix;
				affects scaling and rotation
			@param [c=0] {number} Position 1,0 of the matrix;
				affects scaling and rotation
			@param [d=1] {number} Position 1,1 of the matrix;
				affects scaling and rotation
			@param [tx=0] {number} Position 2,0 of the matrix;
				affects translation on x axis
			@param [ty=0] {number} Position 2,1 of the matrix;
				affects translation on y axis
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.tx = tx;
			this.ty = ty;

			return this;

		}

		public setFromTransform( tx: number, ty: number, scaleX: number, scaleY: number, rotation: number ) {

			/**
			Set matrix values from transform values.

			@method setFromTransform
			@param tx {number} Horizontal translation
			@param ty {number} Vertical translation
			@param scaleX {number} Horizontal scale
			@param scaleY {number} Vertical scale
			@param rotation {number} Rotation
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			var cos = Math.cos( rotation ),
				sin = Math.sin( rotation );

			// Set to
			this.a = cos * scaleX;
			this.b = sin * scaleX;
			this.c = -sin * scaleY;
			this.d = cos * scaleY;
			this.tx = tx;
			this.ty = ty;

			return this;
		}

		public setFromOffsetTransform( tx: number, ty: number, scaleX: number, scaleY: number, rotation: number, rotPointX: number, rotPointY: number ) {

			/**
			Set matrix values from transform values,
			with rotation point data included.

			@method setFromOffsetTransform
			@param tx {number} Horizontal translation
			@param ty {number} Vertical translation
			@param scaleX {number} Horizontal scale
			@param scaleY {number} Vertical scale
			@param rotation {number} Rotation
			@param rotPointX {number} Horizontal anchor point
			@param rotPointY {number} Vertical anchor point
			@return {Kiwi.Geom.Matrix} This object
			@public
			@since 1.0.1
			**/

			var cos = Math.cos( rotation ),
				sin = Math.sin( rotation );

			// Set to
			this.a = cos * scaleX;
			this.b = sin * scaleX;
			this.c = -sin * scaleY;
			this.d = cos * scaleY;
			this.tx = tx + rotPointX;
			this.ty = ty + rotPointY;

			return this;
		}

		public prepend( a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0 ): Matrix {

			/**
			Prepend values to this matrix, paramters supplied individually.

			@method prepend
			@param [a=1] {number} Position 0,0 of the matrix;
				affects scaling and rotation
			@param [b=0] {number} Position 0,1 of the matrix;
				affects scaling and rotation
			@param [c=0] {number} Position 1,0 of the matrix;
				affects scaling and rotation
			@param [d=0] {number} Position 1,1 of the matrix;
				affects scaling and rotation
			@param [tx=0] {number} Position 2,0 of the matrix;
				affects translation on x axis
			@param [ty=0] {number} Position 2,1 of the matrix;
				affects translation on y axis
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

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

		public prependMatrix( m: Matrix ): Matrix {

			/**
			Prepend a matrix to this matrix.

			@method prependMatrix
			@param m {Kiwi.Geom.Matrix} Matrix to prepend
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

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

		public append( a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0 ): Matrix {

			/**
			Append values to this matrix, parameters supplied individually.

			@method append
			@param [a=1]{number} Position 0,0 of the matrix;
				affects scaling and rotation
			@param [b=0]{number} Position 0,1 of the matrix;
				affects scaling and rotation
			@param [c=0]{number} Position 1,0 of the matrix;
				affects scaling and rotation
			@param [d=1]{number} Position 1,1 of the matrix;
				affects scaling and rotation
			@param [tx=0]{number} Position 2,0 of the matrix;
				affects translation on x axis
			@param [ty=0]{number} Position 2,1 of the matrix;
				affects translation on y axis
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

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

		public appendMatrix( m: Matrix ): Matrix {

			/**
			Append a matrix to this matrix.

			@method appendMatrix
			@param m {Kiwi.Geom.Matrix} Matrix to append
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

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

		public setPosition( x: number, y: number ): Matrix {

			/**
			Set the tx and ty elements of the matrix.

			@method setPosition
			@param x {number} Horizontal translation
			@param y {number} Vertical translation
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.tx = x;
			this.ty = y;
			return this;
		}

		public setPositionPoint( p: any ): Matrix {

			/**
			Set the `tx` and `ty` elements of the matrix
			from an object with `x` and `y` properties.

			This should probably be of type `Kiwi.Geom.Point`,
			but that is not strictly necessary.

			@method setPositionPoint
			@param p {object} Object from which to copy `x` and `y` properties
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.tx = p.x;
			this.ty = p.y;
			return this;
		}

		public getPosition( output: Kiwi.Geom.Point = new Kiwi.Geom.Point ): Kiwi.Geom.Point {

			/**
			Get the x and y position of the matrix as a `Point`.

			@method getPosition
			@param [output] {Kiwi.Geom.Point} Point to set to x and y
			@return {Kiwi.Geom.Point} Point set to x and y
			@public
			**/

			return output.setTo( this.tx, this.ty );
		}

		public identity(): Matrix {

			/**
			Set the matrix to the identity matrix.
			When appending or prepending this matrix to another,
			there will be no change in the resulting matrix.

			@method identity
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.a = 1;
			this.b = 0;
			this.c = 0;
			this.d = 1;
			this.tx = 0;
			this.ty = 0;
			return this;
		}

		public rotate( radians: number ): Matrix {

			/**
			Rotate the matrix by the specified number of radians.

			@method rotate
			@param radians {number} Angle (in radians) to rotate this matrix
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			var cos = Math.cos( radians );
			var sin = Math.sin( radians );

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

		public translate( tx: number, ty: number ): Matrix {

			/**
			Translate the matrix by the amount passed.

			@method translate
			@param tx {number} Amount to translate horizontally
			@param ty {number} Amount to translate vertically
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.tx += tx;
			this.ty += ty;
			return this;
		}

		public scale( scaleX: number, scaleY: number ): Matrix {

			/**
			Scale the matrix by the amount passed.

			@method scale
			@param scaleX {number} Amount to scale on the horizontal axis
			@param scaleY {number} Amount to scale on the vertical axis
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.a *= scaleX;
			this.d *= scaleY;
			return this;
		}

		public transformPoint( pt: any ) {

			/**
			Apply this matrix to an object with x and y properties
			representing a point and return the transformed point.

			@method transformPoint
			@param pt {Object} Point to be translated
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			var x = pt.x;
			var y = pt.y
			pt.x = this.a * x + this.c * y + this.tx;
			pt.y = this.b * x + this.d * y + this.ty;
			return pt;
		}

		public invert(): Matrix {

			/**
			Invert this matrix so that it represents
			the opposite of its orginal tranformaation.

			@method invert
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

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
			this.tx = ( c1 * this.ty - d1 * tx1 ) / n;
			this.ty = -( a1 * this.ty - b1 * tx1 ) / n;
			return this;
		}

		public copyFrom( m: Matrix ): Matrix {

			/**
			Copy another matrix to this matrix.

			@method copyFrom
			@param m {Kiwi.Geom.Matrix} Matrix to be copied from
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			this.a = m.a;
			this.b = m.b;
			this.c = m.c;
			this.d = m.d;
			this.tx = m.tx;
			this.ty = m.ty;

			return this;
		}

		public copyTo( m: Matrix ): Matrix {

			/**
			Copy this matrix to another matrix.

			@method copyTo
			@param m {Kiwi.Geom.Matrix} Matrix to copy to
			@return {Kiwi.Geom.Matrix} This object
			@public
			**/

			m.a = this.a;
			m.b = this.b;
			m.c = this.c;
			m.d = this.d;
			m.tx = this.tx;
			m.ty = this.ty;
			return this;
		}

		public clone(): Matrix {

			/**
			Clone this matrix and returns a new Matrix object.

			@method clone
			@return {Kiwi.Geom.Matrix} New matrix
			@public
			**/

			return new Kiwi.Geom.Matrix( this.a, this.b, this.c, this.d, this.tx, this.ty );
		}

		public get toString(): string {

			/**
			Return a string representation of this object.

			@method toString
			@return {String} String representation of the instance
			@public
			**/

			return "[{Matrix (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")}]";

		}

		public equals( matrix: Matrix ): boolean {

			/**
			Check whether this matrix equals another matrix.

			@method equals
			@param matrix {Kiwi.Geom.Matrix}
			@return boolean
			@public
			**/

			return (
					this.a === matrix.a &&
					this.b === matrix.b &&
					this.c === matrix.c &&
					this.d === matrix.d &&
					this.tx === matrix.tx &&
					this.ty === matrix.ty );
		}

	}

}
