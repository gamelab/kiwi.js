
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {


    export class StatelessParticleRenderer extends Renderer {


        constructor(gl: WebGLRenderingContext, shaderManager: Kiwi.Shaders.ShaderManager, params: any = null) {
            super(gl, shaderManager);
            console.log("init renderer");
            this.gl = gl;

            this._config = params.config;
            if (!this._config) {
                console.log("no particle configuration supplied");
            }
            //create buffers
            //dynamic
        
            this.aXYVxVyBuffer = new GLArrayBuffer(gl, 4);
            this.aBirthLifespanBuffer = new GLArrayBuffer(gl, 2);

          

            //6 verts per quad **************************fix
            this.indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(500));

            //use shaders
            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "StatelessParticlesShader");
            //            this.shaderPair = new Kiwi.Shaders.StatelessParticlesShader();

            //          this.shaderPair.init(gl);
            this.startTime = Date.now();
        }

        public gl: WebGLRenderingContext;


        private _config: any;

        public static RENDERER_ID: string = "StatelessParticleRenderer";

        
        public startTime: number;

       
        public enable(gl: WebGLRenderingContext, params: any = null) {
            this.shaderPair = <Kiwi.Shaders.TextureAtlasShader>this.shaderManager.requestShader(gl, "StatelessParticlesShader");
            var cfg = this._config;

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

            gl.uniform1f(this.shaderPair.uniforms.uT, 0.0);
            gl.uniform1f(this.shaderPair.uniforms.uGravity, cfg.gravity);
            gl.uniform2fv(this.shaderPair.uniforms.uPointSizeRange, new Float32Array([cfg.startSize,cfg.endSize]));
            gl.uniform4fv(this.shaderPair.uniforms.uAttackColor, new Float32Array(cfg.attackCol));
            gl.uniform4fv(this.shaderPair.uniforms.uDecayColor, new Float32Array(cfg.decayCol));
            gl.uniform4fv(this.shaderPair.uniforms.uSustainColor, new Float32Array(cfg.sustainCol));
            gl.uniform4fv(this.shaderPair.uniforms.uReleaseColor, new Float32Array(cfg.releaseCol));
            gl.uniform3fv(this.shaderPair.uniforms.uADSRKeyframes, new Float32Array(cfg.DSR));
            gl.uniform1f(this.shaderPair.uniforms.uAlpha, cfg.alpha);
            gl.uniform1f(this.shaderPair.uniforms.uLoop, (cfg.loop) ? 1:0);
           

         
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
            gl.drawElements(gl.POINTS,this._config.numParts, gl.UNSIGNED_SHORT, 0);
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
