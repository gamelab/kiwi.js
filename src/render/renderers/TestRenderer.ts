
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {


    export class TestRenderer extends Renderer {


        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any = null) {
            super(gl, shaderManager);
            //create buffers
            //dynamic
            this.xyuvBuffer = new GLArrayBuffer(gl, 4);
            this.alphaBuffer = new GLArrayBuffer(gl, 1);

            //static
            this.indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));

            //use shaders
            this.shaderPair = <Kiwi.Shaders.TestShader>this.shaderManager.requestShader(gl, "TestShader");
        }

        public static RENDERER_ID: string = "TestRenderer";

       
        public enable(gl: WebGLRenderingContext, params: any = null) {
            this.shaderPair = <Kiwi.Shaders.TestShader>this.shaderManager.requestShader(gl, "TestShader");

            this.shaderPair.enableAttributes(gl);
            this.shaderPair.aXYUV(gl, this.xyuvBuffer);
            this.shaderPair.aAlpha(gl, this.alphaBuffer);
            
            //Texture
            gl.activeTexture(gl.TEXTURE0);
            this.shaderPair.uSampler(gl, 0);

            //Other uniforms
            this.shaderPair.uResolution(gl, params.stageResolution);
            this.shaderPair.uCameraOffset(gl, params.cameraOffset);
            this.shaderPair.uMVMatrix(gl, params.mvMatrix);
        }

        public disable(gl: WebGLRenderingContext) {
            this.shaderPair.disableAttributes(gl);
        }

        public shaderPair: Kiwi.Shaders.TestShader;
        
        public clear(gl: WebGLRenderingContext, params: any) {
            this.xyuvBuffer.clear();
            this.alphaBuffer.clear();
            this.shaderPair.uMVMatrix(gl, params.mvMatrix);
            this.shaderPair.uCameraOffset(gl, new Float32Array(params.uCameraOffset));

        }

        public draw(gl: WebGLRenderingContext) {
            this.xyuvBuffer.uploadBuffer(gl, this.xyuvBuffer.items);
            this.alphaBuffer.uploadBuffer(gl, this.alphaBuffer.items);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.buffer);
            gl.drawElements(gl.TRIANGLES, (this.alphaBuffer.items.length / 4) * 6, gl.UNSIGNED_SHORT, 0);
        }

        /**
       * Maximum allowable sprites to render per frame
       * @property _maxItems
       * @type number
       * @default 1000
       * @private
       */
        private _maxItems: number = 2000;

        

        /**
       * Storage for the xy (position) and uv(texture) coordinates that are generated each frame
       * @property _xyuvBuffer
       * @type GLArrayBuffer
       * @private
       */
        public xyuvBuffer: GLArrayBuffer;

        /**
        * Storage for the polygon indices, pre generated to a length based on max items
        * @property _indexBuffer
        * @type GLElementArrayBuffer
        * @private 
        */
        public indexBuffer: GLElementArrayBuffer;

        /**
        * Storage for alpha values for each vertex on a sprite
        * @property _alphaBuffer
        * @type GLArrayBuffer
        * @private
        */
        public alphaBuffer: GLArrayBuffer;


        /**
      * Create prebaked indices for drawing quads 
      * @method _generateIndices
      * @param numQuads {number}
      * @return number[]
      * @private
      */
        private _generateIndices(numQuads: number): number[] {

            var quads: number[] = new Array();
            for (var i = 0; i < numQuads; i++) {
                quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
            }
            return quads;

        }


        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
         
            this.shaderPair.uResolution(gl, res);
        }

        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
            this.shaderPair.uTextureSize(gl, size);
        }

        /**
        * Collates all xy and uv coordinates into a buffer ready for upload to viceo memory
        * @method _collateVertexAttributeArrays
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @param camera {Camera}
        * @public
        */
        public addToBatch(gl: WebGLRenderingContext, entity: Entity, camera: Kiwi.Camera) {
            var t: Kiwi.Geom.Transform = entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
          
            var cell = entity.atlas.cells[entity.cellIndex];

            var pt1: Kiwi.Geom.Point = new Kiwi.Geom.Point(0 - t.rotPointX, 0 - t.rotPointY);
            var pt2: Kiwi.Geom.Point = new Kiwi.Geom.Point(cell.w - t.rotPointX, 0 - t.rotPointY);
            var pt3: Kiwi.Geom.Point = new Kiwi.Geom.Point(cell.w - t.rotPointX, cell.h - t.rotPointY);
            var pt4: Kiwi.Geom.Point = new Kiwi.Geom.Point(0 - t.rotPointX, cell.h - t.rotPointY);

            pt1 = m.transformPoint(pt1);
            pt2 = m.transformPoint(pt2);
            pt3 = m.transformPoint(pt3);
            pt4 = m.transformPoint(pt4);

            

            this.xyuvBuffer.items.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY, cell.x, cell.y,
                pt2.x + t.rotPointX, pt2.y + t.rotPointY, cell.x + cell.w, cell.y,
                pt3.x + t.rotPointX, pt3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h,
                pt4.x + t.rotPointX, pt4.y + t.rotPointY, cell.x, cell.y + cell.h
                );
            this.alphaBuffer.items.push(entity.alpha, entity.alpha, entity.alpha, entity.alpha);

        }
    }
}
