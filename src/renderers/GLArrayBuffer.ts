/**
* 
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {

    /**
    *
    * @class GLArrayBuffer
    * @constructor
    * @namespace Kiwi.Renderers
    * @param gl {WebGLRenderingContext} 
    * @param [_itemSize] {number}
    * @param [items] {number[]}
    * @param [init=true] {boolean}
    * @return {GLArrayBuffer}
    */
    export class GLArrayBuffer {

        constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], init: boolean = true) {

            this.items = items || GLArrayBuffer.squareVertices;
            this.itemSize = _itemSize || 2;
            this.numItems = this.items.length / this.itemSize;
            if (init) {
                this.buffer = this.init(gl);
            }
        }

        /**
        * 
        * @property items
        * @type number[]
        * @public
        */
        public items: number[];
        
        /**
        * 
        * @property buffer
        * @type WebGLBuffer
        * @public
        */
        public buffer: WebGLBuffer;
        
        /**
        * 
        * @property itemSize
        * @type number
        * @public
        */
        public itemSize: number;
        
        /**
        * 
        * @property numItems
        * @type number
        * @public
        */
        public numItems: number;

        /**
        * 
        * @method clear
        * @public
        */
        public clear() {
            this.items = new Array();
        }

        /**
        *
        * @method init
        * @param gl {WebGLRenderingCotext}
        * @return {WebGLBuffer}
        * @public
        */
        public init(gl: WebGLRenderingContext): WebGLBuffer {
            var buffer: WebGLBuffer = gl.createBuffer();
            var f32: Float32Array = new Float32Array(this.items);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);

            return buffer;
        }

        /**
        *
        * @method refresh 
        * @param gl {WebGLRenderingContext}
        * @param items {number[]}
        * @return {WebGLBuffer}
        * @public
        */
        public refresh(gl: WebGLRenderingContext, items: number[]): WebGLBuffer {

            this.items = items;
            this.numItems = this.items.length / this.itemSize;
            var f32: Float32Array = new Float32Array(this.items);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);
            return this.buffer;
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
        * @property squareUVx
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

        ]

    }

}
