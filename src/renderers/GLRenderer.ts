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
        private _shaders: Texture2D;
        
        /**
        *
        * @property _vertBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _xyuvBuffer: GLArrayBuffer;
        
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
        private _alphaBuffer: GLArrayBuffer;
        
     
               
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
           
                console.log("Intialising WebGL");

                var gl: WebGLRenderingContext = this._game.stage.gl;

                //init stage and viewport
                this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
                gl.viewport(0, 0, this._game.stage.width, this._game.stage.height);
            

                this._shaders = new Texture2D();
                this._shaders.init(gl);

                
                //set default state
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


                this.mvMatrix = mat4.create();
                mat2d.identity(this.mvMatrix);


                //create buffers
                //dynamic
                this._xyuvBuffer = new GLArrayBuffer(gl, 4);
                this._alphaBuffer = new GLArrayBuffer(gl, 1, GLArrayBuffer.squareUVs);

                //static
                this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));
             
                //use shaders
                this._shaders.use(gl, this._shaders.shaderProgram);

                var prog = this._shaders.descriptor;

                gl.bindBuffer(gl.ARRAY_BUFFER, this._xyuvBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexXYUVAttribute, this._xyuvBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, this._alphaBuffer.buffer);
                gl.vertexAttribPointer(prog.vertexAlphaAttribute, this._alphaBuffer.itemSize, gl.FLOAT, false, 0, 0);

           
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


         
        }

        public numDrawCalls: number = 0;

        public initState(state: Kiwi.State) {
           
                console.log("initialising WebGL on State");
                
                this._textureManager.uploadTextureLibrary(this._game.stage.gl, state.textureLibrary);
           
        }

        public endState(state: Kiwi.State) {
            this._textureManager.clearTextures(this._game.stage.gl);
            console.log("ending WebGL on State");
            
            
        }

     

        /**
        *
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {
          

                this.numDrawCalls = 0;
                this._currentCamera = camera;
                var root: IChild[] = this._game.states.current.members;
                var gl: WebGLRenderingContext = this._game.stage.gl;

                this._textureManager.numTextureWrites = 0;

                this._entityCount = 0;
                this._xyuvBuffer.clear();
                this._alphaBuffer.clear();
                
                //clear 
                var col = this._game.stage.normalizedColor;
                gl.clearColor(col.r, col.g, col.b, col.a);
                gl.clear(gl.COLOR_BUFFER_BIT);

                
                var prog = this._shaders.descriptor;
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
                    this._xyuvBuffer.clear();
                    this._alphaBuffer.clear();
                    if (!this._textureManager.useTexture(gl, (<Entity>child).atlas.glTextureWrapper, this._shaders.descriptor.textureSizeUniform))
                        return;
                    this._currentTextureAtlas = (<Entity>child).atlas;
                } 
                this._collateVertexAttributeArrays(gl, <Entity>child,camera);
              //  this._compileUVs(gl, <Entity>child);
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
            this._xyuvBuffer.uploadBuffer(gl, this._xyuvBuffer.items);
            this._alphaBuffer.uploadBuffer(gl, this._alphaBuffer.items);
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
        private _collateVertexAttributeArrays(gl: WebGLRenderingContext, entity: Entity,camera:Kiwi.Camera) {
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
            this._xyuvBuffer.items.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY, cell.x, cell.y,
                pt2.x + t.rotPointX, pt2.y + t.rotPointY, cell.x + cell.w, cell.y,
                pt3.x + t.rotPointX, pt3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h,
                pt4.x + t.rotPointX, pt4.y + t.rotPointY, cell.x, cell.y + cell.h
                );
            this._alphaBuffer.items.push(entity.alpha, entity.alpha, entity.alpha, entity.alpha);

            
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

