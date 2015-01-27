/**
* 
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/

module Kiwi.Renderers {

	/**
	* Encapsulates a WebGL Array Buffer
	* @class GLArrayBuffer
	* @constructor
	* @namespace Kiwi.Renderers
	* @param gl {WebGLRenderingContext} 
	* @param [_itemSize] {number}
	* @param [items] {number[]}
	* @param [init=true] {boolean}
	* @return {Kiwi.RenderersGLArrayBuffer}
	*/
	export class GLArrayBuffer {

		constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], upload: boolean = true) {

			this.items = items || GLArrayBuffer.squareVertices;
			this.itemSize = _itemSize || 2;
			this.numItems = this.items.length / this.itemSize;
			this.createBuffer(gl);
			if (upload) {
				this.uploadBuffer(gl,this.items);
			}
		}

		/**
		* Returns whether the buffer has been created
		* @property created
		* @type boolean
		* @public
		* @readonly
		*/

		private _created: boolean = false;
		public get created(): boolean {
			return this._created;
		}

		/**
		* Returns whether the buffer has been uploaded to video memory 
		* @property created
		* @type boolean
		* @public
		* @readonly
		*/
		private _uploaded: boolean = false;
		public get uploaded(): boolean {
			return this._uploaded;
		}

		/**
		* The items ito upload to the buffer
		* @property items
		* @type number[]
		* @public
		*/
		public items: number[];

		/**
		* The WebGL buffer Object
		* @property buffer
		* @type WebGLBuffer
		* @public
		*/
		public buffer: WebGLBuffer;

		/**
		* The size of each item in the buffer.
		* @property itemSize
		* @type number
		* @public
		*/
		public itemSize: number;

		/**
		* The number of items in the buffer
		* @property numItems
		* @type number
		* @public
		*/
		public numItems: number;

		/**
		* Clears the item array.
		* @method clear
		* @public
		*/
		public clear() {
			this.items = new Array();
		}

		/**
		* Creates the array buffer.
		* @method createBuffer
		* @param gl {WebGLRenderingContext}
		* @return {WebGLBuffer}
		* @public
		*/
		public createBuffer(gl: WebGLRenderingContext): boolean {
			this.buffer = gl.createBuffer();
			this._created = true;
			return true;
		}

		/**
		* Uploads the array buffer.
		* @method uploadBuffer
		* @param gl {WebGLRenderingContext}
		* @param items {Array}
		* @return {boolean}
		* @public
		*/
		public uploadBuffer(gl: WebGLRenderingContext, items: number[]): boolean {
			this.items = items;
			this.numItems = this.items.length / this.itemSize;
			var f32: Float32Array = new Float32Array(this.items);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);
			this._uploaded = true;
			return true;
		}

		/**
		* Deletes the array buffer.
		* @method deleteBuffer
		* @param gl {WebGLRenderingContext}
		* @return {boolean}
		* @public
		*/
		public deleteBuffer(gl: WebGLRenderingContext): boolean {
			gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
			gl.deleteBuffer(this.buffer);   
			this.uploaded = false;
			this.created = false;
			return true;
		}

		/**
		* 
		* @property squareVertices
		* @type number[]
		* @static
		* @default [0, 0, 100, 0, 100, 100, 0, 100]
		* @public
		*/
		public static squareVertices: number[] = [
			0, 0,
			100, 0,
			100, 100,
			0, 100
		];

		/**
		* 
		* @property squareUVs
		* @type number[]
		* @static
		* @default [0, 0, .1, 0, .1, .1, 0, .1]
		* @public
		*/
		public static squareUVs: number[] = [
			0, 0,
			.1, 0,
			.1, .1,
			0, .1
		];

		/**
		* 
		* @property squareCols
		* @type number[]
		* @static
		* @default [1, 1, 1, 1]
		* @public
		*/
		public static squareCols: number[] = [
			1, 1, 1, 1
		];

	}

}
