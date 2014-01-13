
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {


    export class StatelessParticleRenderer extends Renderer {


        constructor(shaderManager:Kiwi.Shaders.ShaderManager) {
            super(shaderManager);
        }

        public gl: WebGLRenderingContext;

        public static RENDERER_ID: string = "StatelessParticleRenderer";

        
        public startTime: number;

        public init(gl: WebGLRenderingContext, params: any = null) {
            super.init(gl, params);
            console.log("init renderer");
            this.gl = gl;
            //create buffers
            //dynamic
            console.log("AAA");
            this.aXYVxVyBuffer = new GLArrayBuffer(gl, 4);
            this.aBirthLifespanBuffer = new GLArrayBuffer(gl, 2);

            //6 verts per quad
            this.indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));

            //use shaders
            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "StatelessParticlesShader");
//            this.shaderPair = new Kiwi.Shaders.StatelessParticlesShader();

  //          this.shaderPair.init(gl);
            this.startTime = Date.now();
        }

        public enable(gl: WebGLRenderingContext, params: any = null) {
            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "StatelessParticlesShader");

            console.log("enabled");
            
            gl.enableVertexAttribArray(this.shaderPair.attributes.aXYVxVy);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aXYVxVyBuffer.buffer);
            gl.vertexAttribPointer(this.shaderPair.attributes.aXYVxVy, this.aXYVxVyBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(this.shaderPair.attributes.aBirthLifespan);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aBirthLifespanBuffer.buffer);
            gl.vertexAttribPointer(this.shaderPair.attributes.aBirthLifespan, this.aBirthLifespanBuffer.itemSize, gl.FLOAT, false, 0, 0);

            //Texture
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(this.shaderPair.uniforms.samplerUniform, 0);

            //Standard uniforms
            gl.uniform2fv(this.shaderPair.uniforms.uResolution, params.stageResolution);
            gl.uniform2fv(this.shaderPair.uniforms.uCameraOffset, params.cameraOffset);
            gl.uniformMatrix4fv(this.shaderPair.uniforms.uMVMatrix, false, params.mvMatrix);
            
            //Particle uniforms
            gl.uniform4fv(this.shaderPair.uniforms.uStartColor, new Float32Array([1,1,1,1]));
            gl.uniform4fv(this.shaderPair.uniforms.uEndColor, new Float32Array([1, 0, 0, 1]));
            gl.uniform1f(this.shaderPair.uniforms.uT, 0.0);
            gl.uniform1f(this.shaderPair.uniforms.uGravity, 0.1);
           

        }

        public disable(gl: WebGLRenderingContext) {
            gl.disableVertexAttribArray(this.shaderPair.attributes.aXYVxVy);
            gl.disableVertexAttribArray(this.shaderPair.attributes.aBirthLifespan);
        }

        public shaderPair: Kiwi.Shaders.TextureAtlasShader;

        public clear(gl: WebGLRenderingContext, params: any) {
            this.aXYVxVyBuffer.clear();
            this.aBirthLifespanBuffer.clear();
            gl.uniformMatrix4fv(this.shaderPair.uniforms.uMVMatrix, false, params.mvMatrix);
            gl.uniform2fv(this.shaderPair.uniforms.uCameraOffset, new Float32Array(params.uCameraOffset));

        }

        public draw(gl: WebGLRenderingContext) {
            var t = Date.now() - this.startTime;

            gl.uniform1f(this.shaderPair.uniforms.uT, t/1000);
            
            gl.enableVertexAttribArray(this.shaderPair.attributes.aXYVxVy);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aXYVxVyBuffer.buffer);
            gl.vertexAttribPointer(this.shaderPair.attributes.aXYVxVy, this.aXYVxVyBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(this.shaderPair.attributes.aBirthLifespan);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.aBirthLifespanBuffer.buffer);
            gl.vertexAttribPointer(this.shaderPair.attributes.aBirthLifespan, this.aBirthLifespanBuffer.itemSize, gl.FLOAT, false, 0, 0);


            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.buffer);
            //4 components per attributes, 6 verts per quad - used to work out how many elements to draw
            gl.drawElements(gl.POINTS, 500, gl.UNSIGNED_SHORT, 0);
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
        public aXYVxVyBuffer: GLArrayBuffer;

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
        public aBirthLifespanBuffer: GLArrayBuffer;


        /**
      * Create prebaked indices for drawing quads 
      * @method _generateIndices
      * @param numQuads {number}
      * @return number[]
      * @private
      */
        private _generateIndices(numParticles: number): number[] {

            var indices: number[] = new Array();
            for (var i = 0; i < numParticles; i++) {
                indices.push(i);
            }
            return indices;

        }


        public updateStageResolution(gl: WebGLRenderingContext, res: Float32Array) {
            gl.uniform2fv(this.shaderPair.uniforms.uResolution, res);
        }

        public updateTextureSize(gl: WebGLRenderingContext, size: Float32Array) {
            gl.uniform2fv(this.shaderPair.uniforms.uTextureSize, size);
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
         /*   var t: Kiwi.Geom.Transform = entity.transform;
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
            */
        }

        public initBatch(aXYVxVyItems: Array<number>, ageItems: Array<number>) {
            console.log("init batch");
            this.aXYVxVyBuffer.items = aXYVxVyItems;
            this.aBirthLifespanBuffer.items = ageItems;
            this.aXYVxVyBuffer.uploadBuffer(this.gl, this.aXYVxVyBuffer.items);
            this.aBirthLifespanBuffer.uploadBuffer(this.gl, this.aBirthLifespanBuffer.items);
            
        }

    }
}
