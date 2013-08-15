
declare var mat4;

module Kiwi.Renderers {

    // Class
    export class GLRenderer implements IRenderer {

        constructor(game: Kiwi.Game) {
            this._game = game;
            
        }

        public boot() {
            this._stageResolution = new Float32Array([this._game.stage.size.width(), this._game.stage.size.height()]);
            this._shaders = new GLShaders(this._game.stage.gl);
            var gl: WebGLRenderingContext = this._game.stage.gl;

            
            this.mvMatrix = mat4.create();
            mat4.identity(this.mvMatrix);

            //create buffers
            this._vertBuffer = new GLArrayBuffer(gl,2);
            this._indexBuffer = new GLElementArrayBuffer(gl,1);
            this._uvBuffer = new GLArrayBuffer(gl, 2, GLArrayBuffer.squareUVs);
            this._colorBuffer = new GLArrayBuffer(gl, 1, GLArrayBuffer.squareCols);
            
            //use shaders
            this._shaders.use(gl, this._shaders.shaderProgram);  
            
            //this._texture = new GLTexture(gl);
            
        }


        private _game: Kiwi.Game;
        private _currentCamera: Kiwi.Camera;
        private _stageResolution: Float32Array;

        private _shaders: GLShaders;
        private _vertBuffer: GLArrayBuffer;
        private _indexBuffer: GLElementArrayBuffer;
        private _uvBuffer: GLArrayBuffer;
        private _colorBuffer: GLArrayBuffer;
        
        private _texture: GLTexture;

        public mvMatrix;
        public mvMatrixStack: Array;

        public mvPush() {
            var copy = mat4.create();
            mat4.set(this.mvMatrix, copy);
            this.mvMatrixStack.push(copy);
        }

        public mvPop() {
            if (this.mvMatrixStack.length == 0) {
                throw "Invalid popMatrix!";
            }
            this.mvMatrix = this.mvMatrixStack.pop();
        }    

        public render(camera: Kiwi.Camera) {

            this._currentCamera = camera;
            var root: IChild[] = this._game.states.current.members;
            var gl: WebGLRenderingContext = this._game.stage.gl;

            this._vertBuffer.flush();
            this._uvBuffer.flush();
            this._colorBuffer.flush();
            this._indexBuffer.flush();

            //clear 
            gl.clearColor(0, 0, 0.95, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //iterate
            for (var i = 0; i < root.length; i++) {
                this._recurse(gl,root[i]);
            }

        }

        public static one: bool = false;

        private _recurse(gl:WebGLRenderingContext, child: IChild) {

            if (!child.willRender) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse(gl,(<Kiwi.Group>child).members[i]);
                }
            } else {
                this._compileAttributes(gl, <Entity>child);
           
            }


            if(!this.once) this._texture = new GLTexture(gl, (<Entity>child).atlas.image);
            this._draw(gl);

        }




        private once: boolean = false;

        private _compileAttributes(gl: WebGLRenderingContext, entity: Entity) {
            var t: Kiwi.Geom.Transform = entity.transform;
            var c = entity.atlas.cells[entity.cellIndex];
            
           
            this._vertBuffer.items.push(t.x, t.y,
                t.x + c.w, t.y,
                t.x + c.w, t.y + c.h,
                t.x, t.y + c.h);


            this._vertBuffer.refresh(gl, this._vertBuffer.items);

           
            this._uvBuffer.items.push(c.x, c.y,
                c.x + c.w, c.y,
                c.x + c.w, c.y + c.h,
                c.x, c.y + c.h);

            this._uvBuffer.refresh(gl, this._uvBuffer.items);

            if (!GLRenderer.one) {
                for (var i = 0; i < this._vertBuffer.numItems / 4; i++) {
                    this._indexBuffer.indices.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
                }

                for (var i = 0; i < this._vertBuffer.numItems; i++) {
                    
                    this._colorBuffer.items.push(1);
                }
                this._indexBuffer.refresh(gl, this._indexBuffer.indices);
                this._colorBuffer.refresh(gl, this._colorBuffer.items);
                GLRenderer.one = true;
            }
        }



        private _draw(gl: WebGLRenderingContext) {
  

            //texture
            /*
            if (!this.once) {
                this._texture = new GLTexture(gl);
               
            } else {
               // this._texture.refresh(gl, entity.atlas.image);
            }
     */
            //Attributes
            var prog = this._shaders.texture2DProg;

            if (!this.once)gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
            if (!this.once)gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

            if (!this.once)gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
            if (!this.once)gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

            if (!this.once)gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
            if (!this.once) gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
            
            if (!this.once) gl.activeTexture(gl.TEXTURE0);
            if (!this.once) gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
            
            //Uniforms

            if (!this.once) gl.uniform1i(prog.samplerUniform, 0);
            
            if (!this.once) gl.uniform2fv(prog.resolutionUniform, this._stageResolution);

            if (!this.once) gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));

            if (!this.once) gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);

            //Draw

            gl.drawElements(gl.TRIANGLES, this._indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            this.once = true;
        }
    

    }

}

