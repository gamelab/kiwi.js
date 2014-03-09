
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {

    export class TextureAtlasRenderer extends Renderer {

        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any = null) {
            super(gl, shaderManager,true);
            
            this._vertexBuffer = new GLArrayBuffer(gl, 5);

            //6 verts per quad
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));

            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "TextureAtlasShader");
        }

        public static RENDERER_ID: string = "TextureAtlasRenderer";

        public shaderPair: Kiwi.Shaders.TextureAtlasShader;

        private _maxItems: number = 1000;

        private _vertexBuffer: GLArrayBuffer;

        private _indexBuffer: GLElementArrayBuffer;

        public enable(gl: WebGLRenderingContext, params: any = null) {
        
            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "TextureAtlasShader");
            
            //Texture
            gl.uniform1i(this.shaderPair.uniforms.uSampler.location, 0);

            //Other uniforms
            gl.uniform2fv(this.shaderPair.uniforms.uResolution.location, params.stageResolution);
            gl.uniformMatrix3fv(this.shaderPair.uniforms.uCamMatrix.location, false, params.camMatrix);

            this.updateTextureSize(gl, new Float32Array([params.textureAtlas.glTextureWrapper.image.width, params.textureAtlas.glTextureWrapper.image.height]));
        }

        public disable(gl: WebGLRenderingContext) {
            gl.disableVertexAttribArray(this.shaderPair.attributes.aXYUV);
            gl.disableVertexAttribArray(this.shaderPair.attributes.aAlpha);
        }

        public clear(gl: WebGLRenderingContext, params: any) {
            this._vertexBuffer.clear();
            gl.uniformMatrix3fv(this.shaderPair.uniforms.uCamMatrix.location, false, params.camMatrix);
        }

        public draw(gl: WebGLRenderingContext) {
            this._vertexBuffer.uploadBuffer(gl, this._vertexBuffer.items);

            gl.enableVertexAttribArray(this.shaderPair.attributes.aXYUV);
            gl.vertexAttribPointer(this.shaderPair.attributes.aXYUV, 4, gl.FLOAT, false, 20, 0);
    
            gl.enableVertexAttribArray(this.shaderPair.attributes.aAlpha);
            gl.vertexAttribPointer(this.shaderPair.attributes.aAlpha, 1, gl.FLOAT, false, 20, 16);
           
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer.buffer);
            gl.drawElements(gl.TRIANGLES, (this._vertexBuffer.items.length / 20) * 6, gl.UNSIGNED_SHORT, 0);
        
        }

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
            gl.uniform2fv(this.shaderPair.uniforms.uResolution.location, res);
        }

        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
            gl.uniform2fv(this.shaderPair.uniforms.uTextureSize.location, size);
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

            this._vertexBuffer.items.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY, cell.x, cell.y, entity.alpha,
                pt2.x + t.rotPointX, pt2.y + t.rotPointY, cell.x + cell.w, cell.y, entity.alpha,
                pt3.x + t.rotPointX, pt3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h, entity.alpha,
                pt4.x + t.rotPointX, pt4.y + t.rotPointY, cell.x, cell.y + cell.h, entity.alpha
                );
        }

        public concatBatch(vertexItems: Array<number>) {
            this._vertexBuffer.items = this._vertexBuffer.items.concat(vertexItems);
        }
    }
}
