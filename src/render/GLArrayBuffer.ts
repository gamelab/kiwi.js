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

        constructor(gl: WebGLRenderingContext, _itemSize?: number, items?: number[], upload: boolean = true) {

            this.items = items || GLArrayBuffer.squareVertices;
            this.itemSize = _itemSize || 2;
            this.numItems = this.items.length / this.itemSize;
            this.createBuffer(gl);
            if (upload) {
                this.uploadBuffer(gl,this.items);
            }
        }


        private _created: boolean = false;
        public get created(): boolean {
            return this._created;
        }

        private _uploaded: boolean = false;
        public get uploaded(): boolean {
            return this._uploaded;
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
        public createBuffer(gl: WebGLRenderingContext): boolean {
            this.buffer = gl.createBuffer();
            this._created = true;
            return true;
        }

        public uploadBuffer(gl: WebGLRenderingContext, items: number[]): boolean {
            this.items = items;
            this.numItems = this.items.length / this.itemSize;
            var f32: Float32Array = new Float32Array(this.items);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(gl.ARRAY_BUFFER, f32, gl.DYNAMIC_DRAW);
            this._uploaded = true;
            return true;
        }

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
