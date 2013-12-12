declare var mat2d, mat3, vec2, vec3, mat4;
declare var frame;
/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {
    
    /**
    *
    * @class GLRenderer
    * @extends IRenderer
    * @constructor
    * @param game {Game} The game that this renderer belongs to.
    * @return {GLRenderer}
    */
    export class GLRenderer implements IRenderer {

        constructor(game: Kiwi.Game) {
            this._game = game;
            
        }

        

        /**
        * 
        * @method boot
        * @public
        */
        public boot() {
            this._init();
            this._textureManager = new GLTextureManager();
        }
        
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "GLRenderer";
        }

        /**
        * The game that this renderer is on.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The current camara that is being rendered
        * @property _currentCamera
        * @type Camera
        * @private
        */

        private _textureManager: GLTextureManager;

        private _currentCamera: Kiwi.Camera;
        
        /**
        *
        * @property _stageResolution
        * @type Float32Array
        * @private
        */
        private _stageResolution: Float32Array;

        /**
        *
        * @property _shaders
        * @type GLShaders
        * @private
        */
        private _shaders: GLShaders;
        
        /**
        *
        * @property _vertBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _vertBuffer: GLArrayBuffer;
        
        /**
        *
        * @property _indexBuffer
        * @type GLElementArrayBuffer
        * @private 
        */
        private _indexBuffer: GLElementArrayBuffer;
        
        /**
        *
        * @property _uvBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _uvBuffer: GLArrayBuffer;
        
     
               
        /**
        *
        * @property _entityCount
        * @type number
        * @default 0
        * @private
        */
        private _entityCount: number = 0;
        
        /**
        *
        * @property _maxItems
        * @type number
        * @default 1000
        * @private
        */
        private _maxItems: number = 2000;
        
             
        
        /**
        *
        * @property mvMatrix
        * @type Float32Array
        * @public
        */
        public mvMatrix: Float32Array;
        
        
        /**
        *
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;
        
        /**
        *
        * @method _init
        * @private
        */
        private _init() {
            if (!this.TESTRENDER) {
                console.log("Intialising WebGL");
                var gl: WebGLRenderingContext = this._game.stage.gl;
                this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);

                gl.viewport(0, 0, this._game.stage.width, this._game.stage.height);
               

                this._shaders = new GLShaders(gl);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                this.mvMatrix = mat4.create();
                mat2d.identity(this.mvMatrix);


                //create buffers
                //dynamic
                this._vertBuffer = new GLArrayBuffer(gl, 2);
                this._uvBuffer = new GLArrayBuffer(gl, 2, GLArrayBuffer.squareUVs);

                //static
                this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));
             
                //use shaders
                this._shaders.use(gl, this._shaders.shaderProgram);

                var prog = this._shaders.texture2DProg;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

           
                //Texture
                gl.activeTexture(gl.TEXTURE0);

                //Static Uniforms
                //sampler
                gl.uniform1i(prog.samplerUniform, 0);
                //stage res needs update on stage resize
             
                gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
                this._game.stage.onResize.add(function (width, height) {
                    this._stageResolution = new Float32Array([width, height]);
                    gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
                    gl.viewport(0, 0, width,height);
                },this);


            } else {
                this.mvMatrix = mat4.create();
            }
        }

        public numDrawCalls: number = 0;

        public initState(state: Kiwi.State) {
            if (!this.TESTRENDER) {
                console.log("initialising WebGL on State");
                
                this._textureManager.uploadTextureLibrary(this._game.stage.gl, state.textureLibrary);
            }
        }

        public endState(state: Kiwi.State) {
            this._textureManager.clearTextures(this._game.stage.gl);
            console.log("ending WebGL on State");
            
            
        }

        public TESTRENDER: boolean = false;

        /**
        *
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {
            if (this.TESTRENDER) {

                frame(this._game.stage.gl,this.mvMatrix)
            } else {

                this.numDrawCalls = 0;
                this._currentCamera = camera;
                var root: IChild[] = this._game.states.current.members;
                var gl: WebGLRenderingContext = this._game.stage.gl;

                this._textureManager.numTextureWrites = 0;

                this._entityCount = 0;
                this._vertBuffer.clear();
                this._uvBuffer.clear();
                
                //clear 
                var col = this._game.stage.normalizedColor;
                gl.clearColor(col.r, col.g, col.b, col.a);
                gl.clear(gl.COLOR_BUFFER_BIT);

                
                var prog = this._shaders.texture2DProg;
                //set cam matrix uniform
                var cm: Kiwi.Geom.Matrix = camera.transform.getConcatenatedMatrix();
                var ct: Kiwi.Geom.Transform = camera.transform;
                this.mvMatrix = mat4.create();
                /*
                this.mvMatrix = new Float32Array([
                    cm.a, cm.b, 0, 0,
                    cm.c, cm.d, 0, 0,
                    0, 0, 1, 0,
                    cm.tx + ct.rotPointX, cm.ty + ct.rotPointY, 0, 1
                ]);
                */
                gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);
                gl.uniform2fv(prog.cameraOffsetUniform, new Float32Array([ct.rotPointX, ct.rotPointY]));
                
                //iterate
                
                for (var i = 0; i < root.length; i++) {
                    this._recurse(gl, root[i], camera);
                }
                

                this._flush(gl);

            }
        }

        /**
        * 
        * @method _recurse
        * @param gl {WebGLRenderingContext}
        * @param child {IChild}
        * @param camera {Camera}
        * @private
        */
        private _recurse(gl: WebGLRenderingContext, child: IChild, camera: Kiwi.Camera) {
            if (!child.willRender) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse(gl,(<Kiwi.Group>child).members[i],camera);
                }
            } else {
                
              
                if ((<Entity>child).atlas !== this._currentTextureAtlas) {
                    this._flush(gl);
                    this._entityCount = 0;
                    this._vertBuffer.clear();
                    this._uvBuffer.clear();
                    if (!this._textureManager.useTexture(gl, (<Entity>child).atlas.glTextureWrapper, this._shaders.texture2DProg.textureSizeUniform))
                        return;
                    this._currentTextureAtlas = (<Entity>child).atlas;
                } 
                this._compileVertices(gl, <Entity>child,camera);
                this._compileUVs(gl, <Entity>child);
                this._entityCount++;
                
            }
        
        }
        
        /**
        *
        * @method _flush
        * @param gl {WebGLRenderingContext}
        * @private
        */
        private _flush(gl: WebGLRenderingContext) {
            this._vertBuffer.uploadBuffer(gl, this._vertBuffer.items);
            this._uvBuffer.uploadBuffer(gl, this._uvBuffer.items);
            this._draw(gl);
        }

        /**
        * 
        * @method _compileVertices
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @param camera {Camera}
        * @private
        */
        private _compileVertices(gl: WebGLRenderingContext, entity: Entity,camera:Kiwi.Camera) {
            var t: Kiwi.Geom.Transform = entity.transform;
            var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();
            var ct: Kiwi.Geom.Transform = camera.transform;
            var cm: Kiwi.Geom.Matrix = ct.getConcatenatedMatrix();

            var cell = entity.atlas.cells[entity.cellIndex];
            
            var pt1: Kiwi.Geom.Point = new Kiwi.Geom.Point(0 - t.rotPointX, 0 - t.rotPointY);
            var pt2: Kiwi.Geom.Point = new Kiwi.Geom.Point(cell.w - t.rotPointX, 0 - t.rotPointY);
            var pt3: Kiwi.Geom.Point = new Kiwi.Geom.Point(cell.w - t.rotPointX, cell.h - t.rotPointY);
            var pt4: Kiwi.Geom.Point = new Kiwi.Geom.Point(0 - t.rotPointX, cell.h - t.rotPointY) ;

            

            pt1 = m.transformPoint(pt1);
            pt2 = m.transformPoint(pt2);
            pt3 = m.transformPoint(pt3);
            pt4 = m.transformPoint(pt4);

            /*this._vertBuffer.items.push(t.x, t.y,
                t.x + cell.w, t.y,
                t.x + cell.w, t.y + cell.h,
                t.x, t.y + cell.h);
            */
            this._vertBuffer.items.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY,
                pt2.x + t.rotPointX, pt2.y + t.rotPointY,
                pt3.x + t.rotPointX, pt3.y + t.rotPointY,
                pt4.x + t.rotPointX, pt4.y + t.rotPointY
                );


            
        }

        /**
        *
        * @method _compileUVs
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @private
        */
        private _compileUVs(gl: WebGLRenderingContext, entity: Entity) {
            var c = entity.atlas.cells[entity.cellIndex];
           
                this._uvBuffer.items.push(c.x, c.y,
                    c.x + c.w, c.y,
                    c.x + c.w, c.y + c.h,
                    c.x, c.y + c.h);
       
        }

        /**
        * 
        * @method _draw
        * @param gl {WebGLRenderingContext}
        * @private
        */
        private _draw(gl: WebGLRenderingContext) {
            this.numDrawCalls ++;   
            gl.drawElements(gl.TRIANGLES, this._entityCount*6, gl.UNSIGNED_SHORT, 0);
            
        }
        
        /**
        *
        * @method _generateIndices
        * @param numQuads {number}
        * @return number[]
        * @private
        */
        private _generateIndices(numQuads: number): number[]{
       
            var quads: number[] = new Array();
            for (var i = 0; i < numQuads; i++) {
                quads.push(i * 4 + 0, i * 4 + 1, i * 4 + 2, i * 4 + 0, i * 4 + 2, i * 4 + 3);
            }
            return quads;

        }

       


    }

}

