
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

            //clear 
            gl.clearColor(1, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //iterate
            for (var i = 0; i < root.length; i++) {
                this._recurse(gl,root[i]);
            }

        }

        private _recurse(gl:WebGLRenderingContext, child: IChild) {

            if (!child.willRender) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse(gl,(<Kiwi.Group>child).members[i]);
                }
            } else {

              
               this._draw(gl, <Entity>child);
            }


        }




        private once: boolean = false;

        private _draw(gl:WebGLRenderingContext, entity: Entity) {
            
          
            var t: Kiwi.Geom.Transform = entity.transform;
            this._vertBuffer.refresh(gl, [t.x, t.y,
                                        t.x + entity.width, t.y,
                                        t.x + entity.width, t.y + entity.height,
                                        t.x, t.y + entity.height
                                    ]);
            
            var c = entity.atlas.cells[0];
            this._uvBuffer.refresh(gl, [c.x, c.y,
                                        c.x + c.w, c.y,
                                        c.x + c.w, c.y + c.h,
                                        c.x, c.y+c.h
                                    ]);

            //texture

            if (!this.once) {
                this._texture = new GLTexture(gl, entity.atlas.image);
                //this._texture.refresh(gl, entity.atlas.image);
                this.once = true;
            }
     

           

            //Attributes
            var prog = this._shaders.texture2DProg;

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
            
            //Uniforms

            gl.uniform1i(prog.samplerUniform, 0);
            
            gl.uniform2fv(prog.resolutionUniform, this._stageResolution);

            gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));

            gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);

            //Draw

            gl.drawElements(gl.TRIANGLES, this._indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
            
        }
    

    }

}

