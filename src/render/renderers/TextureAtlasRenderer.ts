
/**
*  
* @module Kiwi
* @submodule Renderers
* @namespace Kiwi.Renderers
*/

module Kiwi.Renderers {

    export class TextureAtlasRenderer extends Renderer {

        /**
        * The Renderer object for rendering Texture Atlases
        * @class TextureAtlasRenderer
        * @constructor
        * @namespace Kiwi.Renderers
        * @param gl {WebGLRenderingContext} 
        * @param shaderManager {Kiwi.Shaders.ShaderManager}
        * @param [params=null] {object}
        * @return {Kiwi.Renderers.TextureAtlasRenderer}
        */
        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any = null) {
            super(gl, shaderManager, true);
            var bufferItemSize = 5;
            this._vertexBuffer = new GLArrayBuffer(gl, bufferItemSize);
            var vertsPerQuad = 6;
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * vertsPerQuad));

            this.shaderPair = this.shaderManager.requestShader(gl, this._shaderPairName);
        }

        /**
        * The identifier for this renderer.
        * @property RENDERER_ID
        * @type Array
        * @public
        * @static
        */
        public static RENDERER_ID: string = "TextureAtlasRenderer";

        /**
        * The shaderPair that this renderer uses.
        * @property shaderPair
        * @type Kiwi.Shaders.TextureAtlasShade
        * @public
        */
        public shaderPair: Kiwi.Shaders.TextureAtlasShader;

        /**
        * The reference to the shaderPair.
        * @property _shaderPairName
        * @type String
        * @private
        * @since 1.1.0
        */
        private _shaderPairName: string = "TextureAtlasShader";

        /**
        * The maximum number of items that can be rendered by the renderer (not enforced)
        * @property _maxItems
        * @type number
        * @private
        */
        private _maxItems: number = 1000;

        /**
        * The Vertex Buffer
        * @property _vertexBuffer
        * @type Kiwi.Renderers.GLArrayBuffer
        * @private
        */
        private _vertexBuffer: GLArrayBuffer;

        /**
        * The Index Buffer
        * @property _indexBuffer
        * @type Kiwi.Renderers.GLElementArrayBuffer
        * @private
        */
        private _indexBuffer: GLElementArrayBuffer;

        /**
        * Enables the renderer ready for drawing
        * @method enable
        * @param gl {WebGLRenderingContext}
        * @param [params=null] {object}
        * @public
        */
        public enable(gl: WebGLRenderingContext, params: any = null) {
        
            //this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "TextureAtlasShader", true);
            this.shaderPair = this.shaderManager.requestShader(gl, this._shaderPairName, true);
            
            //Texture
            gl.uniform1i(this.shaderPair.uniforms.uSampler.location, 0);

            //Other uniforms
            gl.uniform2fv(this.shaderPair.uniforms.uResolution.location, params.stageResolution);
            gl.uniformMatrix3fv(this.shaderPair.uniforms.uCamMatrix.location, false, params.camMatrix);
        }

        /**
        * Disables the renderer
        * @method disable
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public disable(gl: WebGLRenderingContext) {
            gl.disableVertexAttribArray(this.shaderPair.attributes.aXYUV);
            gl.disableVertexAttribArray(this.shaderPair.attributes.aAlpha);
        }

        /**
        * Clears the vertex buffer.
        * @method clear
        * @param gl {WebGLRenderingContext}
        * @public
        */
        public clear(gl: WebGLRenderingContext, params: any) {
            this._vertexBuffer.clear();
            gl.uniformMatrix3fv(this.shaderPair.uniforms.uCamMatrix.location, false, params.camMatrix);
        }

        /**
        * Makes a draw call, this is where things actually get rendered to the draw buffer (or a framebuffer).
        * @method draw
        * @param gl {WebGLRenderingContext}
        * @public
        */
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
        * Generates quad indices
        * @method _generateIndices
        * @param numQuads {number}
        * @private
        */
        private _generateIndices(numQuads: number): number[] {

            var quads: number[] = new Array();
            for (var i = 0; i < numQuads; i++) {
                quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
            }
            return quads;
        }

        /**
        * Updates the stage resolution uniforms
        * @method updateStageResolution
        * @param gl {WebGLRenderingContext}
        * @param res {Float32Array}
        * @public
        */
        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
            gl.uniform2fv(this.shaderPair.uniforms.uResolution.location, res);
        }

        /**
        * Updates the texture size uniforms
        * @method updateTextureSize
        * @param gl {WebGLRenderingContext}
        * @param size {Float32Array}
        * @public
        */
        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
            gl.uniform2fv(this.shaderPair.uniforms.uTextureSize.location, size);
        }

        /**
        * Sets shader pair by name
        * @method setShaderPair
        * @param shaderPair {String}
        * @public
        * @since 1.1.0
        */
        public setShaderPair(shaderPair: string) {
            if(typeof shaderPair == "string")
                this._shaderPairName = shaderPair;
        }

        /**
        * Collates all xy and uv coordinates into a buffer ready for upload to viceo memory
        * @method _collateVertexAttributeArrays
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @param camera {Camera}
        * @public
        */
        public addToBatch(gl: WebGLRenderingContext, entity: Entity, camera: Kiwi.Camera) {
            // Skip if it's invisible due to zero alpha
            if( entity.alpha <= 0 )
                return;
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
                pt1.x, pt1.y, cell.x, cell.y, entity.alpha,
                pt2.x, pt2.y, cell.x + cell.w, cell.y, entity.alpha,
                pt3.x, pt3.y, cell.x + cell.w, cell.y + cell.h, entity.alpha,
                pt4.x, pt4.y, cell.x, cell.y + cell.h, entity.alpha
                );
        }

        /**
        * Adds an array of precalculated xyuv values to the item array
        * @method concatBatch
        * @param vertexItems {array}
        * @public
        */
        public concatBatch(vertexItems: Array<number>) {
            this._vertexBuffer.items = this._vertexBuffer.items.concat(vertexItems);
        }
    }
}
