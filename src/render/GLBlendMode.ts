/**
*  
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
* 
*/

module Kiwi.Renderers {
	/**
	* The Blend Mode object for recording and applying GL blend functions on a renderer.
	* @class GLBlendMode
	* @constructor
	* @namespace Kiwi.Renderers
	* @param gl {WebGLRenderingContext}
	* @param params {Object}
	* @return {Kiwi.Renderers.GLBlendMode}
	* @ since 1.1.0
	*/
	export class GLBlendMode {

		constructor(gl: WebGLRenderingContext, params: any) {
			this.gl = gl;

			this.dirty = true;

			// Set default parameters
			this.setMode( "NORMAL" );

			// Process params
			if ( typeof params === "undefined" ) {
				params = null;
			}
			if ( params ) {
				this.readConfig( params );
			}
		}

		/**
		* Target WebGL rendering context.
		* @property gl
		* @type WebGLRenderingContext
		* @public
		*/
		public gl: WebGLRenderingContext;

		/**
		* Dirty flag indicates whether this object has been altered and needs to be processed.
		* @property dirty
		* @type boolean
		* @public
		*/
		public dirty: boolean;

		/**
		* Source RGB factor used in WebGL blendfunc.
		* @property _srcRGB
		* @type number
		* @private
		*/
		private _srcRGB: number;

		/**
		* Destination RGB factor used in WebGL blendfunc.
		* @property _dstRGB
		* @type number
		* @private
		*/
		private _dstRGB: number;

		/**
		* Source alpha factor used in WebGL blendfunc.
		* @property _srcAlpha
		* @type number
		* @private
		*/
		private _srcAlpha: number;

		/**
		* Destination alpha factor used in WebGL blendfunc.
		* @property _dstAlpha
		* @type number
		* @private
		*/
		private _dstAlpha: number;

		/**
		* RGB mode used in WebGL blendfunc.
		* @property _modeRGB
		* @type number
		* @private
		*/
		private _modeRGB: number;

		/**
		* Alpha mode used in WebGL blendfunc.
		* @property _modeAlpha
		* @type number
		* @private
		*/
		private _modeAlpha: number;

		/**
		* Set a blend mode from a param object.
		*
		* This is the main method for configuring blend modes on a renderer. It resolves to a pair of calls to blendEquationSeparate and blendFuncSeparate. The params object should specify compatible terms, namely { srcRGB: a, dstRGB: b, srcAlpha: c, dstAlpha: d, modeRGB: e, modeAlpha: f }. You should set abcdef using either direct calls to a gl context (ie. gl.SRC_ALPHA) or by using predefined strings.
		*
		* The predefined string parameters for blendEquationSeparate are:
		*
		* FUNC_ADD, FUNC_SUBTRACT, and FUNC_REVERSE_SUBTRACT.
		*
		* The predefined string parameters for blendFuncSeparate are:
		*
		* ZERO, ONE, SRC_COLOR, ONE_MINUS_SRC_COLOR, DST_COLOR, ONE_MINUS_DST_COLOR, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, DST_ALPHA, ONE_MINUS_DST_ALPHA, SRC_ALPHA_SATURATE, CONSTANT_COLOR, ONE_MINUS_CONSTANT_COLOR, CONSTANT_ALPHA, and ONE_MINUS_CONSTANT_ALPHA.
		*
		* @method readConfig
		* @param params {Object}
		* @public
		*/
		public readConfig(params: any) {
			if(params.mode !== undefined)
				this.setMode(params.mode);
			else {
				// Expecting a series of constants in "number" type from a GL object, or valid string names corresponding to same.
				// Sanitise input - do not change unspecified values
				params.srcRGB = this.makeConstant(params.srcRGB);
				if(typeof params.srcRGB !== "undefined")
					this._srcRGB = params.srcRGB;
				params.dstRGB = this.makeConstant(params.dstRGB);
				if(typeof params.dstRGB !== "undefined")
					this._dstRGB = params.dstRGB;
				params.srcAlpha = this.makeConstant(params.srcAlpha);
				if(typeof params.srcAlpha !== "undefined")
					this._srcAlpha = params.srcAlpha;
				params.dstAlpha = this.makeConstant(params.dstAlpha);
				if(typeof params.dstAlpha !== "undefined")
					this._dstAlpha = params.dstAlpha;
				params.modeRGB = this.makeConstant(params.modeRGB);
				if(typeof params.modeRGB !== "undefined")
					this._modeRGB = params.modeRGB;
				params.modeAlpha = this.makeConstant(params.modeAlpha);
				if(typeof params.modeAlpha !== "undefined")
					this._modeAlpha = params.modeAlpha;
			}
			this.dirty = true;
		}

		/**
		* Formats a parameter into a GL context-compatible number. This recognises valid constant names, such as "SRC_ALPHA" or "REVERSE_AND_SUBTRACT", with some tolerance for case. It does not check for valid numeric codes.
		* @method makeConstant
		* @param code {String}
		* @return {number}
		* @private
		*/
		private makeConstant(code: any) {
			// Numbers are assumed to be correct.
			if(typeof code == "number")
				return( code );

			if(typeof code == "string")
				code = code.toUpperCase();

			switch( code ) {
				case "ZERO":
					code = this.gl.ZERO;
					break;
				case "ONE":
					code = this.gl.ONE;
					break;
				case "SRC_COLOR":
				case "SRC_COLOUR":
					code = this.gl.SRC_COLOR;
					break;
				case "ONE_MINUS_SRC_COLOR":
				case "ONE_MINUS_SRC_COLOUR":
					code = this.gl.ONE_MINUS_SRC_COLOR;
					break;
				case "DST_COLOR":
				case "DST_COLOUR":
					code = this.gl.DST_COLOR;
					break;
				case "ONE_MINUS_DST_COLOR":
				case "ONE_MINUS_DST_COLOUR":
					code = this.gl.ONE_MINUS_DST_COLOR;
					break;
				case "SRC_ALPHA":
					code = this.gl.SRC_ALPHA;
					break;
				case "ONE_MINUS_SRC_ALPHA":
					code = this.gl.ONE_MINUS_SRC_ALPHA;
					break;
				case "DST_ALPHA":
					code = this.gl.DST_ALPHA;
					break;
				case "ONE_MINUS_DST_ALPHA":
					code = this.gl.ONE_MINUS_DST_ALPHA;
					break;
				case "SRC_ALPHA_SATURATE":
					code = this.gl.SRC_ALPHA_SATURATE;
					break;
				case "CONSTANT_COLOR":
				case "CONSTANT_COLOUR":
					code = this.gl.CONSTANT_COLOR;
					break;
				case "ONE_MINUS_CONSTANT_COLOR":
				case "ONE_MINUS_CONSTANT_COLOUR":
					code = this.gl.ONE_MINUS_CONSTANT_COLOR;
					break;
				case "CONSTANT_ALPHA":
					code = this.gl.CONSTANT_ALPHA;
					break;
				case "ONE_MINUS_CONSTANT_ALPHA":
					code = this.gl.ONE_MINUS_CONSTANT_ALPHA;
					break;
				case "FUNC_ADD":
					code = this.gl.FUNC_ADD;
					break;
				case "FUNC_SUBTRACT":
					code = this.gl.FUNC_SUBTRACT;
					break;
				case "FUNC_REVERSE_SUBTRACT":
					code = this.gl.FUNC_REVERSE_SUBTRACT;
					break;
				default:
					code = undefined;
					break;
				}
			return( code );
		}

		/**
		* Sets a blend mode by name. Name is case-tolerant.
		*
		* These are shortcuts to setting the blend function parameters manually. A listing of valid modes follows. Each is listed with the parameters modeRGB, modeAlpha, srcRGB, dstRGB, srcAlpha, and dstAlpha, constants used in the gl calls "blendEquationSeparate(modeRGB, modeAlpha)" and "blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha". This is very technical, and will probably only be useful if you are developing your own shaders for Kiwi.js.
		*
		* "NORMAL" or any non-recognised string will draw as normal, blending colour via alpha. FUNC_ADD, FUNC_ADD, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, ONE, ONE.
		*
		* "ADD" or "ADDITIVE" will add pixels to the background, creating a lightening effect. FUNC_ADD, FUNC_ADD, SRC_ALPHA, ONE, ONE, ONE.
		*
		* "SUBTRACT" or "SUBTRACTIVE" will subtract pixels from the background, creating an eerie dark effect. FUNC_REVERSE_SUBTRACT, FUNC_ADD, SRC_ALPHA, ONE, ONE, ONE.
		*
		* "ERASE" or "ERASER" will erase the game canvas itself, allowing the page background to show through. You can later draw over this erased region. FUNC_REVERSE_SUBTRACT, FUNC_REVERSE_SUBTRACT, SRC_ALPHA, ONE_MINUS_SRC_ALPHA, ONE, ONE.
		*
		* "BLACK" or "BLACKEN" will turn all colour black, but preserve alpha. FUNC_ADD, FUNC_ADD, ZERO, ONE_MINUS_SRC_ALPHA, ONE, ONE.
		*
		* Blend modes as seen in Adobe Photoshop are not reliably available via WebGL blend modes. Such blend modes require shaders to create.
		* @method setMode
		* @param mode {String}
		* @public
		*/
		public setMode(mode: string) {
			mode = mode.toUpperCase();
			switch( mode ) {
				case "ADDITIVE":
				case "ADD":
					this._srcRGB = this.gl.SRC_ALPHA;
					this._dstRGB = this.gl.ONE;
					this._srcAlpha = this.gl.ONE;
					this._dstAlpha = this.gl.ONE;
					this._modeRGB = this.gl.FUNC_ADD;
					this._modeAlpha = this.gl.FUNC_ADD;
					break;
				case "SUBTRACT":
				case "SUBTRACTIVE":
					this._srcRGB = this.gl.SRC_ALPHA;
					this._dstRGB = this.gl.ONE;
					this._srcAlpha = this.gl.ONE;
					this._dstAlpha = this.gl.ONE;
					this._modeRGB = this.gl.FUNC_REVERSE_SUBTRACT;
					this._modeAlpha = this.gl.FUNC_ADD;
					break;
				case "ERASE":
				case "ERASER":
					this._srcRGB = this.gl.SRC_ALPHA;
					this._dstRGB = this.gl.ONE_MINUS_SRC_ALPHA;
					this._srcAlpha = this.gl.ONE;
					this._dstAlpha = this.gl.ONE;
					this._modeRGB = this.gl.FUNC_REVERSE_SUBTRACT;
					this._modeAlpha = this.gl.FUNC_REVERSE_SUBTRACT;
					break;
				case "BLACK":
				case "BLACKEN":
					this._srcRGB = this.gl.ZERO;
					this._dstRGB = this.gl.ONE_MINUS_SRC_ALPHA;
					this._srcAlpha = this.gl.ONE;
					this._dstAlpha = this.gl.ONE;
					this._modeRGB = this.gl.FUNC_ADD;
					this._modeAlpha = this.gl.FUNC_ADD;
					break;
				case "NORMAL":
				default:
					this._srcRGB = this.gl.ONE;
					this._dstRGB = this.gl.ONE_MINUS_SRC_ALPHA;
					this._srcAlpha = this.gl.ONE;
					this._dstAlpha = this.gl.ONE;
					this._modeRGB = this.gl.FUNC_ADD;
					this._modeAlpha = this.gl.FUNC_ADD;
					break;
			}
			this.dirty = true;
		}

		/**
		* Compares against another GLBlendMode
		* @method isIdentical
		* @return {Boolean} Is this GLBlendMode identical to the passed GLBlendMode?
		* @param blendMode {Kiwi.Renderers.GLBlendMode}
		* @public
		*/
		public isIdentical(blendMode: GLBlendMode) {
			if(this == blendMode)
				return( true );
			if(     this._srcRGB == blendMode._srcRGB
				&&  this._dstRGB == blendMode._dstRGB
				&&  this._srcAlpha == blendMode._srcAlpha
				&&  this._dstAlpha == blendMode._dstAlpha
				&&  this._modeRGB == blendMode._modeRGB
				&&  this._modeAlpha == blendMode._modeAlpha)
				return( true );
			return( false );
		}

		/**
		* Sets the blend mode on the video card
		* @method apply
		* @param gl {WebGLRenderingContext}
		* @public
		*/
		public apply(gl: WebGLRenderingContext)
		{
			gl.blendEquationSeparate(this._modeRGB, this._modeAlpha);
			gl.blendFuncSeparate(this._srcRGB, this._dstRGB, this._srcAlpha, this._dstAlpha);
			// Remove dirty flag
			this.dirty = false;
		}
	}
}
