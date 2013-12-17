
//used for ts recognition of matrix-gl
declare var mat2d, mat3, vec2, vec3, mat4;



/**
*  
* @module Kiwi
* @submodule Renderers
* 
*/

module Kiwi.Renderers {
    
    /**
    * Manages all rendering using WebGL. Requires the inclusion of gl-matrix.js / g-matrix.min.js -  https://github.com/toji/gl-matrix
    * @class GLRenderer
    * @extends IRenderer
    * @constructor
    * @param game {Game} The game that this renderer belongs to.
    * @return {GLRenderer}
    */
    export class GLRenderer implements IRenderer {

       
        constructor(game: Kiwi.Game) {
            this._game = game;
            if (typeof mat4 === "undefined") {
                throw "ERROR: gl-matrix.js is missing - you need to include this javascript to use webgl - https://github.com/toji/gl-matrix";
            }
        }

        /**
        * Initialises all WebGL rendering services
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
        * The texture manager
        * @property _textureManager
        * @type GLTextureManager
        * @private
        */

        private _textureManager: GLTextureManager;
        

        /**
        * The current camara that is being rendered
        * @property _currentCamera
        * @type Camera
        * @private
        */
        private _currentCamera: Kiwi.Camera;
        
        /**
        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @private
        */
        private _stageResolution: Float32Array;

        /**
        * Shader pair for standard 2d sprite rendering
        * @property _texture2DShaderPair
        * @type GLShaders
        * @private
        */
        private _texture2DShaderPair: Texture2D;
        
        /**
        * Storage for the xy (position) and uv(texture) coordinates that are generated each frame
        * @property _xyuvBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _xyuvBuffer: GLArrayBuffer;
        
        /**
        * Storage for the polygon indices, pre generated to a length based on max items
        * @property _indexBuffer
        * @type GLElementArrayBuffer
        * @private 
        */
        private _indexBuffer: GLElementArrayBuffer;
        
        /**
        * Storage for alpha values for each vertex on a sprite
        * @property _alphaBuffer
        * @type GLArrayBuffer
        * @private
        */
        private _alphaBuffer: GLArrayBuffer;
        
        
        
        /**
        * Tally of number of entities rendered per frame
        * @property _entityCount
        * @type number
        * @default 0
        * @private
        */
        private _entityCount: number = 0;


         /**
        * Tally of number ofdraw calls per frame
        * @property numDrawCalls
        * @type number
        * @default 0
        * @public
        */
        public numDrawCalls: number = 0;
        
        /**
        * Maximum allowable sprites to render per frame
        * @property _maxItems
        * @type number
        * @default 1000
        * @private
        */
        private _maxItems: number = 2000;
        
             
        
        /**
        * GL-Matrix.js provided 4x4 matrix used for matrix uniform
        * @property mvMatrix
        * @type Float32Array
        * @public
        */
        public mvMatrix: Float32Array;
        
        
        /**
        * The most recently bound texture atlas used for sprite rendering
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;
        
        /**
        * Performs initialisation required for single game instance - happens once
        * @method _init
        * @private
        */
        private _init() {
           
            console.log("Intialising WebGL");

            var gl: WebGLRenderingContext = this._game.stage.gl;

            //init stage and viewport
            this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
            gl.viewport(0, 0, this._game.stage.width, this._game.stage.height);
            
                
            //set default state
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


            this.mvMatrix = mat4.create();
            mat2d.identity(this.mvMatrix);


            //create buffers
            //dynamic
            this._xyuvBuffer = new GLArrayBuffer(gl, 4);
            this._alphaBuffer = new GLArrayBuffer(gl, 1);

            //static
            this._indexBuffer = new GLElementArrayBuffer(gl, 1, this._generateIndices(this._maxItems * 6));
            
            
            //use shaders
            this._texture2DShaderPair = new Texture2D();
            this._texture2DShaderPair.init(gl); 
            this._texture2DShaderPair.use(gl);
            this._texture2DShaderPair.aXYUV(gl, this._xyuvBuffer);
            this._texture2DShaderPair.aAlpha(gl, this._alphaBuffer);
            
            //Texture
            gl.activeTexture(gl.TEXTURE0);

            this._texture2DShaderPair.uSampler(gl, 0);
            
            //stage res needs update on stage resize
        
            this._texture2DShaderPair.uResolution(gl,this._stageResolution);
            this._game.stage.onResize.add(function (width, height) {
                this._stageResolution = new Float32Array([width, height]);
                this._texture2DShaderPair.uResolution(gl, this._stageResolution);
                gl.viewport(0, 0, width,height);
            },this);


         
       }

        
        /**
        * Performs initialisation required when switching to a different state
        * @method initState
        * @public
        */

        public initState(state: Kiwi.State) {
            console.log("initialising WebGL on State");
            this._textureManager.uploadTextureLibrary(this._game.stage.gl, state.textureLibrary);
        }

        /**
        * Performs cleanup required before switching to a different state
        * @method initState
        * @param state {Kiwi.State}
        * @public
        */

        public endState(state: Kiwi.State) {
            this._textureManager.clearTextures(this._game.stage.gl);
            console.log("ending WebGL on State");
        }
        
        /**
        * Manages rendering of the scene graph
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

               
             
                //set cam matrix uniform
                var cm: Kiwi.Geom.Matrix = camera.transform.getConcatenatedMatrix();
                var ct: Kiwi.Geom.Transform = camera.transform;
          
                this.mvMatrix = new Float32Array([
                    cm.a, cm.b, 0, 0,
                    cm.c, cm.d, 0, 0,
                    0, 0, 1, 0,
                    cm.tx + ct.rotPointX, cm.ty + ct.rotPointY, 0, 1
                ]);
            
                this._texture2DShaderPair.uMVMatrix(gl,this.mvMatrix);
                this._texture2DShaderPair.uCameraOffset(gl,new Float32Array([ct.rotPointX, ct.rotPointY]));
             
                
                //iterate
                
                for (var i = 0; i < root.length; i++) {
                    this._recurse(gl, root[i], camera);
                }
                

                this._uploadBuffers(gl);

           
        }

        /**
        * Recursively renders scene graph tree
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
                    this._uploadBuffers(gl);
                    this._entityCount = 0;
                    this._xyuvBuffer.clear();
                    this._alphaBuffer.clear();
                    if (!this._textureManager.useTexture(gl, (<Entity>child).atlas.glTextureWrapper, this._texture2DShaderPair.uniforms.uTextureSize))
                        return;
                    this._currentTextureAtlas = (<Entity>child).atlas;
                } 
                this._collateVertexAttributeArrays(gl, <Entity>child,camera);
              //  this._compileUVs(gl, <Entity>child);
                this._entityCount++;
                
            }
        
        }
        
        /**
        * Move buffers from system to video memory
        * @method _uploadBuffers
        * @param gl {WebGLRenderingContext}
        * @private
        */
        private _uploadBuffers(gl: WebGLRenderingContext) {
            this._xyuvBuffer.uploadBuffer(gl, this._xyuvBuffer.items);
            this._alphaBuffer.uploadBuffer(gl, this._alphaBuffer.items);
            this._draw(gl);
        }

        /**
        * Collates all xy and uv coordinates into a buffer ready for upload to viceo memory
        * @method _collateVertexAttributeArrays
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

            this._xyuvBuffer.items.push(
                pt1.x + t.rotPointX, pt1.y + t.rotPointY, cell.x, cell.y,
                pt2.x + t.rotPointX, pt2.y + t.rotPointY, cell.x + cell.w, cell.y,
                pt3.x + t.rotPointX, pt3.y + t.rotPointY, cell.x + cell.w, cell.y + cell.h,
                pt4.x + t.rotPointX, pt4.y + t.rotPointY, cell.x, cell.y + cell.h
                );
            this._alphaBuffer.items.push(entity.alpha, entity.alpha, entity.alpha, entity.alpha);

        }

        /**
        * Draw buffers
        * @method _draw
        * @param gl {WebGLRenderingContext}
        * @private
        */
        private _draw(gl: WebGLRenderingContext) {
            this.numDrawCalls ++;   
           // gl.drawElements(gl.TRIANGLES, , gl.UNSIGNED_SHORT, 0);
            this._texture2DShaderPair.draw(gl, this._entityCount * 6);
            
        }
        
        /**
        * Create prebaked indices for drawing quads 
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

