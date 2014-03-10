module Kiwi.Filters {

    export class GLFilterRenderer {

        constructor(stage:Kiwi.Stage, shaderManager: Kiwi.Shaders.ShaderManager) {
            this._stage = stage;
            this._createVertexBuffer(stage.gl);
            this._createFrameBuffersAndTextures(stage.gl,stage.width,stage.height);
          
        }

        private _stage:Kiwi.Stage;
        private _vertBuffer: Kiwi.Renderers.GLArrayBuffer;

        private _framebuffer1: WebGLFramebuffer;
        private _framebufferTexture1: WebGLTexture;
        private _framebuffer2: WebGLFramebuffer;
        private _framebufferTexture2: WebGLTexture;


        private _createVertexBuffer(gl: WebGLRenderingContext) {
            this._vertBuffer = new Kiwi.Renderers.GLArrayBuffer(gl, 4,
                [
                    -1, 1, 0, 1,
                    1, 1, 1, 1,
                    -1, -1, 0, 0,
                    -1, -1, 0, 0,
                    1, 1, 1, 1,
                    1, -1, 1, 0
                ]);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            
        }

        private _createFrameBuffersAndTextures(gl: WebGLRenderingContext,width:number,height:number) {
            this._framebuffer1 = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer1);
            this._framebufferTexture1 = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._framebufferTexture1);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._framebufferTexture1, 0);
            
            this._framebuffer2 = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer2);
            this._framebufferTexture2 = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._framebufferTexture2);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._framebufferTexture2, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            
        }

        private _deleteFrameBuffersAndTextures(gl: WebGLRenderingContext) {
            gl.deleteFramebuffer(this._framebuffer1);
            gl.deleteFramebuffer(this._framebuffer2);
            gl.deleteTexture(this._framebufferTexture1);
            gl.deleteTexture(this._framebufferTexture2);
        }

        public enableFrameBuffers(gl: WebGLRenderingContext) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer1);
        }

        public updateFramebuffers(gl:WebGLRenderingContext, width: number, height: number) {
            this._deleteFrameBuffersAndTextures(gl);
            this._createFrameBuffersAndTextures(gl, width, height);
        }

        
        public TARGET_DRAW_BUFFER: number = 0;
        public TARGET_FRAME_BUFFER_1: number = 1;
        public TARGET_FRAME_BUFFER_2: number = 2;
        public TARGET_TEXTURE_1: number = 1;
        public TARGET_TEXTURE_2: number = 2;


        private _renderSequence(gl:WebGLRenderingContext,sequence:any) {
            for (var i = 0; i < sequence.length; i++) {
                var item = sequence[i];
              
                switch (item.frameBufferTarget) {
                    case this.TARGET_FRAME_BUFFER_1: 
                        gl.bindFramebuffer(gl.FRAMEBUFFER,this._framebuffer1);
                        break;
                    case this.TARGET_FRAME_BUFFER_2: 
                        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer2);
                        break;
                    case this.TARGET_DRAW_BUFFER: 
                        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                        break;

                }

                if (item.textureTarget === this.TARGET_TEXTURE_1) {
                    gl.bindTexture(gl.TEXTURE_2D, this._framebufferTexture2)
                } else {
                    gl.bindTexture(gl.TEXTURE_2D, this._framebufferTexture1)
                }

                gl.useProgram(item.shaderPair.shaderProgram);

                //set uniforms

                item.shaderPair.applyUniforms(gl);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
                gl.vertexAttribPointer(item.shaderPair.attributes.aXYUV, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);
                
                gl.drawArrays(gl.TRIANGLES, 0, 6);
           

            }

            this.enableFrameBuffers(gl);
        }

        public applyFilters(gl: WebGLRenderingContext, filters: Array<Kiwi.Filters.Filter>) {
            var sequence = [];

            var frameBufferTarget: number = this.TARGET_FRAME_BUFFER_2;
            var textureTarget: number = this.TARGET_TEXTURE_2;

            for (var i = 0; i < filters.length; i++) {
                if (filters[i].enabled) {
                    if (filters[i].dirty) {
                        filters[i].setParams(gl);
                    }
                    for (var j = 0; j < filters[i].passes.length; j++) {
                        sequence.push(
                        {
                            shaderPair: filters[i].passes[j],
                            frameBufferTarget: frameBufferTarget,
                            textureTarget: textureTarget,

                        });
                        frameBufferTarget++;
                        textureTarget++;
                        if (textureTarget === 3) textureTarget = 1;
                        if (frameBufferTarget === 3) frameBufferTarget = 1;
                    }
                }
            }

            
            if (sequence.length > 0) {
                //set last
                sequence[sequence.length - 1].frameBufferTarget = this.TARGET_DRAW_BUFFER;
                this._renderSequence(gl, sequence);
            }
        } 
        
    }
}