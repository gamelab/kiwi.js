


module Kiwi.Renderers {

  
    export class GLElementArrayBuffer {

        constructor(gl: WebGLRenderingContext, _itemSize?: number, _indices?: number[], init: boolean = true) {

            this.indices = _indices || GLElementArrayBuffer.square;
            this.itemSize = _itemSize || 1;
            this.numItems = this.indices.length / this.itemSize;
            if (init) {
                this.buffer = this.init(gl);
            }
        }

        public indices: number[];
        public buffer: WebGLBuffer;
        public itemSize: number;
        public numItems: number;

        public init(gl: WebGLRenderingContext): WebGLBuffer {
            var buffer: WebGLBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

            return buffer;
        }
        
        public static square: number[] = [
            0, 1, 2,
            0, 2, 3
        ];

    }

}
