/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {

    /**
    * Encapsulates a WebGL Element Array Buffer
    * @class GLElementArrayBuffer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContent}
    * @param [_itemSize] {number}
    * @param [_indices] {number[]}
    * @param [init=true] {boolean}
    * @return {GLElementArrayBuffer}
    */
    export class GLElementArrayBuffer {

        constructor(gl: WebGLRenderingContext, _itemSize?: number, _indices?: number[], init: boolean = true) {

            this.indices = _indices || GLElementArrayBuffer.square;
            this.itemSize = _itemSize || 1;
            this.numItems = this.indices.length / this.itemSize;
            if (init) {
                this.buffer = this.init(gl);
            }
        }
        
        /**
        * An array of indices
        * @property indices
        * @type number[]
        * @public
        */
        public indices: number[];
        
        /**
        * The Element Array Buffer object
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        public buffer: WebGLBuffer;
        
        /**
        * The size of each buffer item
        * @property itemSize
        * @type number
        * @public
        */
        public itemSize: number;
        
        /**
        * The numbe of items in the buffer
        * @property numItems
        * @type number
        * @public
        */
        public numItems: number;
        
        /**
        * Clears the indices array.
        * @method clear
        * @public
        */
        public clear() {
            this.indices = new Array();
        }

        /**
        * Initialises the Element Array Buffer
        * @method init
        * @param gl {WebGLRenderingContext}
        * @return {WebGLBuffer}
        * @public
        */
        public init(gl: WebGLRenderingContext): WebGLBuffer {
            var buffer: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

            return buffer;
        }
        
        /**
        * Refreshes the Element Array Buffer
        * @method refresh
        * @param gl {WebGLRenderingContext}
        * @param indices {number[]} 
        * @return {WebGLBuffer}
        * @public
        */
        public refresh(gl: WebGLRenderingContext,indices:number[]): WebGLBuffer {
            this.numItems = this.indices.length / this.itemSize;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

            return this.buffer;
        }
        
        /**
        * The required indices for a single quad.
        * @property square 
        * @static
        * @type number[]
        * @default [0,1,2,0,2,3]
        * @public
        */
        public static square: number[] = [
            0, 1, 2,
            0, 2, 3
        ];

    }

}
