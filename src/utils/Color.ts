/**
* @module Kiwi
* @submodule Utils
* @namespace Kiwi.Utils
*/
module Kiwi.Utils {

	/**
	* Utility class used to make color management more transparent.
	* Color objects hold color and alpha values, and can get or set them
	* in a variety of ways.
	* <br><br>
	* Construct this object as follows.
	* <br><br>
	* Pass 3 or 4 numbers to determine RGB or RGBA. If the numbers are in
	* the range 0-1, they will be parsed as normalized numbers.
	* If they are in the range 1-255, they will be parsed as 8-bit channels.
	* <br><br>
	* Pass 3 or 4 numbers followed by the string "hsv" or "hsl"
	* (lowercase) to parse HSV or HSL color space (with optional alpha).
	* <br><br>
	* Pass a string containing a hexadecimal color with or without alpha
	* (such as "ff8040ff" or "4080ff").
	*
	* @class Color
	* @constructor
	* @since 1.2.0
	*/
	export class Color {

		constructor( ...args ) {
			return this.set.apply( this, args );
		}

		/**
		* Set colors from parameters
		* @method set
		* @param params {object} Composite parameter object
		* @return Kiwi.Utils.Color
		* @public
		*/
		public set( ...params ) {

			if ( params.length === 3 ) {
				this.r = params[ 0 ];
				this.g = params[ 1 ];
				this.b = params[ 2 ];
			} else if ( params.length === 4 ) {
				if ( !isNaN( params[ 3 ] ) ) {
					this.r = params[ 0 ];
					this.g = params[ 1 ];
					this.b = params[ 2 ];
					this.a = params[ 3 ];
				} else if ( params[ 3 ] === "hsv" ) {
					this.parseHsv( params[ 0 ], params[ 1 ], params[ 2 ] );
				} else if ( params[ 3 ] === "hsl" ) {
					this.parseHsl( params[ 0 ], params[ 1 ], params[ 2 ] );
				}
			} else if ( params.length === 5 ) {
				if ( params [ 4 ] === "hsv" ) {
					this.parseHsv( params[ 0 ], params[ 1 ], params[ 2 ], params[ 3 ] );
				} else if ( params [ 4 ] === "hsl" ) {
					this.parseHsl( params[ 0 ], params[ 1 ], params[ 2 ], params[ 3 ] );
				}
			} else if ( typeof params[ 0 ] === "string" ) {
				this.parseColorHex( params[ 0 ] );
			}

			return this;
		}


		/**
		* Red channel, stored as a normalized value between 0 and 1.
		* This is most compatible with graphics hardware.
		* @property _r
		* @type number
		* @default 0.5
		* @private
		*/
		public _r: number = 0.5;

		/**
		* Green channel, stored as a normalized value between 0 and 1.
		* This is most compatible with graphics hardware.
		* @property _g
		* @type number
		* @default 0.5
		* @private
		*/
		public _g: number = 0.5;

		/**
		* Blue channel, stored as a normalized value between 0 and 1.
		* This is most compatible with graphics hardware.
		* @property _b
		* @type number
		* @default 0.5
		* @private
		*/
		public _b: number = 0.5;

		/**
		* Alpha channel, stored as a normalized value between 0 and 1.
		* This is most compatible with graphics hardware.
		* @property _a
		* @type number
		* @default 0.5
		* @private
		*/
		public _a: number = 1;



		/**
		* Red channel, stored as a normalized value between 0 and 1.
		* @property rNorm
		* @type number
		* @public
		*/
		public get rNorm(): number {
			return this._r;
		}

		public set rNorm( value: number ) {
			if ( !isNaN( value ) ) {
				this._r = value;
			}
		}

		/**
		* Green channel, stored as a normalized value between 0 and 1.
		* @property gNorm
		* @type number
		* @public
		*/
		public get gNorm(): number {
			return this._g;
		}

		public set gNorm( value: number ) {
			if ( !isNaN( value ) ) {
				this._g = value;
			}
		}

		/**
		* Blue channel, stored as a normalized value between 0 and 1.
		* @property bNorm
		* @type number
		* @public
		*/
		public get bNorm(): number {
			return this._b;
		}

		public set bNorm( value: number ) {
			if ( !isNaN( value ) ) {
				this._b = value;
			}
		}

		/**
		* Alpha channel, stored as a normalized value between 0 and 1.
		* @property aNorm
		* @type number
		* @public
		*/
		public get aNorm(): number {
			return this._a;
		}

		public set aNorm( value: number ) {
			if ( !isNaN( value ) ) {
				this._a = value;
			}
		}

		/**
		* Red channel.
		* If set to a number in the range 0-1, is interpreted as a
		* normalized color (see rNorm).
		* If set to a number above 1, is interpreted as an 8-bit channel
		* (see r255).
		* If queried, returns a normalized number in the range 0-1.
		* @property r
		* @type number
		* @public
		*/
		public get r(): number {
			return this._r;
		}

		public set r( value: number ) {
			if ( value > 1 ) {
				this.r255 = value;
			} else {
				this.rNorm = value;
			}
		}

		/**
		* Green channel.
		* If set to a number in the range 0-1, is interpreted as a
		* normalized color (see gNorm).
		* If set to a number above 1, is interpreted as an 8-bit channel
		* (see g255).
		* If queried, returns a normalized number in the range 0-1.
		* @property g
		* @type number
		* @public
		*/
		public get g(): number {
			return this._g;
		}

		public set g( value: number ) {
			if ( value > 1 ) {
				this.g255 = value;
			} else {
				this.gNorm = value;
			}
		}

		/**
		* Blue channel.
		* If set to a number in the range 0-1, is interpreted as a
		* normalized color (see bNorm).
		* If set to a number above 1, is interpreted as an 8-bit channel
		* (see b255).
		* If queried, returns a normalized number in the range 0-1.
		* @property b
		* @type number
		* @public
		*/
		public get b(): number {
			return this._b;
		}

		public set b( value: number ) {
			if ( value > 1 ) {
				this.b255 = value;
			} else {
				this.bNorm = value;
			}
		}

		/**
		* Alpha channel.
		* If set to a number in the range 0-1, is interpreted as a
		* normalized color (see aNorm).
		* If set to a number above 1, is interpreted as an 8-bit channel
		* (see a255).
		* If queried, returns a normalized number in the range 0-1.
		* @property a
		* @type number
		* @public
		*/
		public get a(): number {
			return this._a;
		}

		public set a( value: number ) {
			if ( value > 1 ) {
				this.r255 = value;
			} else {
				this.rNorm = value;
			}
		}

		/**
		* Red channel, specified as an 8-bit channel in the range 0-255.
		* @property r255
		* @type number
		* @public
		*/
		public get r255(): number {
			return Math.round( this._r * 255 );
		}

		public set r255( value: number ) {
			if ( !isNaN( value ) ) {
				this._r = value / 255;
			}
		}

		/**
		* Green channel, specified as an 8-bit channel in the range 0-255.
		* @property g255
		* @type number
		* @public
		*/
		public get g255(): number {
			return Math.round( this._g * 255 );
		}

		public set g255( value: number ) {
			if ( !isNaN( value ) ) {
				this._g = value / 255;
			}
		}

		/**
		* Blue channel, specified as an 8-bit channel in the range 0-255.
		* @property b255
		* @type number
		* @public
		*/
		public get b255(): number {
			return Math.round( this._b * 255 );
		}

		public set b255( value: number ) {
			if ( !isNaN( value ) ) {
				this._b = value / 255;
			}
		}

		/**
		* Alpha channel, specified as an 8-bit channel in the range 0-255.
		* @property a255
		* @type number
		* @public
		*/
		public get a255(): number {
			return Math.round( this._a * 255 );
		}

		public set a255( value: number ) {
			if ( !isNaN( value ) ) {
				this._a = value / 255;
			}
		}

		/**
		* Red channel, alias of r
		* @property red
		* @type number
		* @public
		*/
		public get red(): number {
			return this.r;
		}

		public set red( value: number ) {
			this.r = value;
		}

		/**
		* Green channel, alias of g
		* @property green
		* @type number
		* @public
		*/
		public get green(): number {
			return this.g;
		}

		public set green( value: number ) {
			this.g = value;
		}

		/**
		* Blue channel, alias of b
		* @property blue
		* @type number
		* @public
		*/
		public get blue(): number {
			return this.b;
		}

		public set blue( value: number ) {
			this.b = value;
		}

		/**
		* Alpha channel, alias of a
		* @property alpha
		* @type number
		* @public
		*/
		public get alpha(): number {
			return this.a;
		}

		public set alpha( value: number ) {
			this.a = value;
		}

		/**
		* Parse hexadecimal colors from strings
		* @method parseColorHex
		* @param color {string} A hexadecimal color such as "ffffff" (no alpha)
		*	or "ffffffff" (with alpha)
		* @public
		*/
		public parseColorHex( color: string ) {
			var bigint = parseInt( color, 16 ),
				r = this.r255,
				g = this.g255,
				b = this.b255,
				a = this.a255;

			if ( color.length === 6 ) {
				r = ( bigint >> 16 ) & 255;
				g = ( bigint >> 8 ) & 255;
				b = bigint & 255;
				a = 255;
			}
			else if ( color.length === 8 ) {
				r = ( bigint >> 24 ) & 255;
				g = ( bigint >> 16 ) & 255;
				b = ( bigint >> 8 ) & 255;
				a = bigint & 255;
			}

			this.r255 = r;
			this.g255 = g;
			this.b255 = b;
			this.a255 = a;
		}

		/**
		* Returns color as a hexadecimal string
		* @method getColorHex
		* @param [alpha=true] {boolean} Whether to include the alpha
		* @return string
		* @public
		*/
		public getColorHex( alpha: boolean = true ) {
			var num,
				mult = 256;

			if ( alpha ) {
				num = this.r255 * mult * mult * mult +
					this.g255 * mult * mult +
					this.b255 * mult +
					this.a255;
			} else {
				num = this.r255 * mult * mult +
				this.g255 * mult +
				this.b255;
			}
			return num.toString( 16 );
		}

		/**
		* Parses normalized HSV values into the Color.
		* Based on algorithms at
		* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
		* @method parseHsv
		* @param h {number} Hue
		* @param s {number} Saturation
		* @param v {number} Value
		* @public
		*/
		public parseHsv( h: number, s: number, v: number, a: number = 1 ) {
			var r, g, b, i, f, p, q, t;

			i = Math.floor( h * 6 );
			f = h * 6 - i;
			p = v * ( 1 - s );
			q = v * ( 1 - f * s );
			t = v * ( 1 - (1 - f ) * s );

			switch ( i % 6 ) {
				case 0:
					r = v;
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = v;
					b = p;
					break;
				case 2:
					r = p;
					g = v;
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = v;
					break;
				case 4:
					r = t;
					g = p;
					b = v;
					break;
				case 5:
					r = v;
					g = p;
					b = q;
					break;
			}

			this._r = r;
			this._g = g;
			this._b = b;
			this._a = a;
		}

		/**
		* Returns HSV value of the Color.
		* Based on algorithms at
		* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
		* @method getHsva
		* @return {object} Object with normalized h, s, v, a properties.
		*/
		public getHsva(): any {
			var h, s, v, d,
				r = this._r,
				g = this._g,
				b = this._b,
				max = Math.max( r, g, b ),
				min = Math.min( r, g, b );

			h = max;
			s = max;
			v = max;

			d = max - min;
			s = max === 0 ? 0 : d / max;

			if ( max === min ) {

				// Achromatic
				h = 0;
			} else {
				switch( max ) {
					case r:
						h = ( g - b ) / d + ( g < b ?  6 : 0 );
						break;
					case g:
						h = ( b - r ) / d + 2;
						break;
					case b:
						h = ( r - g ) / d + 4;
						break;
				}
				h /= 6;
			}

			return { h: h, s: s, v: v, a: this._a };
		}


		/**
		* Returns HSL value of the Color.
		* Based on algorithms at
		* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
		* @method getHsla
		* @return {object} Object with normalized h, s, l, a properties.
		* @public
		*/
		public getHsla(): any {
			var d,
				r = this._r,
				g = this._g,
				b = this._b,
				max = Math.max( r, g, b ),
				min = Math.min( r, g, b ),
				h = ( max + min ) / 2,
				s = ( max + min ) / 2,
				l = ( max + min ) / 2;

			if ( max == min ) {

				// Achromatic
				h = 0;
				s = 0;
			} else {
				d = max - min;
				s = l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );
				switch( max ) {
					case r:
						h = ( g - b ) / d + ( g < b ? 6 : 0 );
						break;
					case g:
						h = ( b - r ) / d + 2;
						break;
					case b:
						h = ( r - g ) / d + 4;
						break;
				}
				h /= 6;
			}

			return { h: h, s: s, l: l, a: this._a };
		}


		/**
		* Parses HSL value onto the Color.
		* Based on algorithms at
		* http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
		* @method parseHsl
		* @param h {number} Hue
		* @param s {number} Saturation
		* @param l {number} Lightness
		* @public
		*/
		public parseHsl( h: number, s: number, l: number, a: number = 1 ) {
			var q, p,
				r = this._r,
				g = this._g,
				b = this._b;

			if ( s === 0 ) {

				// Achromatic
				r = l;
				g = l;
				b = l;
			} else {
				function hue2rgb( p, q, t ) {
					if ( t < 0 ) {
						t += 1;
					}
					if ( t > 1 ) {
						t -= 1;
					}
					if ( t < 1 / 6 ) {
						return p + ( q - p ) * 6 * t;
					}
					if ( t < 1 / 2 ) {
						return q;
					}
					if ( t < 2 / 3 ) {
						return p + ( q - p ) * ( 2 / 3 - t ) * 6;
					}
					return p;
				}

				q = l < 0.5 ? l * ( 1 + s) : l + s - l * s;
				p = 2 * l - q;
				r = hue2rgb( p, q, h + 1 / 3 );
				g = hue2rgb( p, q, h );
				b = hue2rgb( p, q, h - 1 / 3 );
			}

			this._r = r;
			this._g = g;
			this._b = b;
			this._a = a;
		}

	}
}