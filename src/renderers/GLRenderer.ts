declare var mat2d, mat3,vec2,vec3,mat4;
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
            this._initState();
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
        * @property _colorBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _colorBuffer: GLArrayBuffer;
        
        /**
        *
        * @property _texture
        * @type GLTexture
        * @private
        */
        private _texture: GLTexture;
        
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
        private _maxItems: number = 1000;
        
        /**
        *
        * @property _texApplied
        * @type boolean
        * @default false
        * @private
        */
        private _texApplied: boolean = false;
        
        /**
        *
        * @property _firstPass
        * @type boolean
        * @default true
        * @private
        */
        private _firstPass: boolean = true;
        
        /**
        *
        * @property mvMatrix
        * @type Float32Array
        * @public
        */
        public mvMatrix: Float32Array;
        
        /**
        *
        * @property mvMatrixStack
        * @type Array
        * @public
        */
        public mvMatrixStack: Array<any>;
        
        /**
        *
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;
        /*
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
        } */

      

        /**
        *
        * @method _initState
        * @private
        */
        private _initState() {

            var gl: WebGLRenderingContext = this._game.stage.gl;
            this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
            
            this._game.stage.onResize.add(function () {
                this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
                gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
              
            },this);
          
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
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems));
            this._colorBuffer = new GLArrayBuffer(gl, 1, this._generateColors(this._maxItems));

            //use shaders
            this._shaders.use(gl, this._shaders.shaderProgram);
          
            var prog = this._shaders.texture2DProg;

            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexPositionAttribute, this._vertBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexTexCoordAttribute, this._uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer.buffer);
            gl.vertexAttribPointer(prog.vertexColorAttribute, this._colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

            //Static Uniforms

            gl.uniform1i(prog.samplerUniform, 0);

            gl.uniform2fv(prog.resolutionUniform, this._stageResolution);
            
        }

        public numDrawCalls: number = 0;

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
            this.mvMatrix = new Float32Array([
                cm.a, cm.b, 0, 0,
                cm.c, cm.d, 0, 0,
                0, 0, 1, 0,
                cm.tx + ct.rotPointX, cm.ty + ct.rotPointY, 0, 1
            ]);

            gl.uniformMatrix4fv(prog.mvMatrixUniform, false, this.mvMatrix);
            gl.uniform2fv(prog.cameraOffsetUniform, new Float32Array([ct.rotPointX, ct.rotPointY]));
            
            //iterate
              
            for (var i = 0; i < root.length; i++) {
                this._recurse(gl, root[i],camera);
            }
            

            this._flush(gl);
           
            this._firstPass = false;
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
                if (!this._texApplied) {
                    this._applyTexture(gl, (<Entity>child).atlas.image);
                    this._texApplied = true;
                    this._currentTextureAtlas = (<Entity>child).atlas;
                }

                if ((<Entity>child).atlas !== this._currentTextureAtlas) {
                    this._flush(gl);
                    this._entityCount = 0;
                    this._vertBuffer.clear();
                    this._uvBuffer.clear();
                    this._changeTexture(gl, (<Entity>child).atlas.image);
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
            this._vertBuffer.refresh(gl, this._vertBuffer.items);
            this._uvBuffer.refresh(gl, this._uvBuffer.items);
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
            var t: Kiwi.Geom.Transform = entity.transform;
            var c = entity.atlas.cells[entity.cellIndex];
           
                this._uvBuffer.items.push(c.x, c.y,
                    c.x + c.w, c.y,
                    c.x + c.w, c.y + c.h,
                    c.x, c.y + c.h);
       
        }

        /**
        * 
        * @method _applyTexture
        * @param gl {WebGLRenderingContext}
        * @param image {HTMLImageElement}
        * @private
        */
        private _applyTexture(gl: WebGLRenderingContext,image:HTMLImageElement) {
            this._texture = new GLTexture(gl, image);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
            var prog = this._shaders.texture2DProg;
            gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
        }

        /**
        * 
        * @method _changeTexture
        * @param gl {WebGLRenderingContext}
        * @param image {HTMLImageElement}
        * @private
        */
        private _changeTexture(gl: WebGLRenderingContext, image: HTMLImageElement) {
          
            this._texture.refresh(gl, image);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture.texture);
            var prog = this._shaders.texture2DProg;
            gl.uniform2fv(prog.textureSizeUniform, new Float32Array([this._texture.image.width, this._texture.image.height]));
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

        /**
        *
        * @method _generateColors
        * @param numVerts {number}
        * @return number[]
        * @private
        */
        private _generateColors(numVerts: number): number[] {
            var cols: number[] = new Array();
            for (var i = 0; i < numVerts; i++) {
                cols.push(1);
            }
            return cols;
        }


    }

}

