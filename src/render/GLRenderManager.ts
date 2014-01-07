
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
    * @class GLRenderManager
    * @extends IRenderer
    * @constructor
    * @param game {Game} The game that this renderer belongs to.
    * @return {GLRenderer}
    */
    export class GLRenderManager implements IRenderManager {

       
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
        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @private
        */
        private _stageResolution: Float32Array;

        private _currentRenderer: Renderer;
        
        private _cameraOffset: Float32Array;
     
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
        


        private _renderers: any = {};

    
        public addRenderer(rendererID:string):boolean {
            //does renderer exist?
            if (Kiwi.Renderers[rendererID]) {
              
                //already added?
                if (!(rendererID in this._renderers)) {
                    this._renderers[rendererID] = new Kiwi.Renderers[rendererID]();
                    return true;
                }
            }
            return false;
        }

        public getRenderer(rendererID: string): Kiwi.Renderers.Renderer {
            var renderer: Kiwi.Renderers.Renderer = this._renderers[rendererID];
            if (renderer) {
                return renderer;
            } else {
                console.log("no renderer called " + rendererID);
            }
        }

        //public removeRenderer(rendererName: string) {
        //    delete this._renderers[rendererName];
        //}

        /**
        * Performs initialisation required for single game instance - happens once
        * @method _init
        * @private
        */
        private _init() {
           
            console.log("Intialising WebGL");
            this.addRenderer("Texture2DRenderer");
            this.addRenderer("TestRenderer");
            console.log(this._renderers);
            var gl: WebGLRenderingContext = this._game.stage.gl;
           
            //init stage and viewport
            this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
            gl.viewport(0, 0, this._game.stage.width, this._game.stage.height);

            this._cameraOffset = new Float32Array([0,0]);

            //set default state
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            //create Model View Matrix
            this.mvMatrix = mat4.create();
            mat2d.identity(this.mvMatrix);

            //initialise default renderer
            this._renderers.Texture2DRenderer.init(gl);
            this._renderers.TestRenderer.init(gl);
           
            this._renderers.Texture2DRenderer.enable(gl, { mvMatrix: this.mvMatrix, stageResolution: this._stageResolution, cameraOffset: this._cameraOffset });

            this._currentRenderer = this._renderers.Texture2DRenderer;
                        
             
            //stage res needs update on stage resize
            this._game.stage.onResize.add(function (width, height) {
                this._stageResolution = new Float32Array([width, height]);
                this._currentRenderer.updateStageResolution(gl, this._stageResolution);
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
        * Manages rendering of the scene graph - performs per frame setup
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {
            
            var gl: WebGLRenderingContext = this._game.stage.gl;
                                       
            //reset stats
            this.numDrawCalls = 0;
            this._textureManager.numTextureWrites = 0;
            this._entityCount = 0;
               
            //clear stage 
            var col = this._game.stage.normalizedColor;
            gl.clearColor(col.r, col.g, col.b, col.a);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            //set cam matrix uniform
            var cm: Kiwi.Geom.Matrix = camera.transform.getConcatenatedMatrix();
            var ct: Kiwi.Geom.Transform = camera.transform;

            //**Optimise me          
            this.mvMatrix = new Float32Array([
                cm.a, cm.b, 0, 0,
                cm.c, cm.d, 0, 0,
                0, 0, 1, 0,
                ct.rotPointX - cm.tx, ct.rotPointY - cm.ty, 0, 1
            ]);
            this._cameraOffset = new Float32Array([ct.rotPointX, ct.rotPointY]);
            
            //clear current renderer ready for a batch
            this._currentRenderer.clear(gl, { mvMatrix: this.mvMatrix, uCameraOffset: this._cameraOffset });
            
            //render the scene graph starting at the root
            var root: IChild[] = this._game.states.current.members;
            for (var i = 0; i < root.length; i++) {
                this._recurse(gl, root[i], camera);
            }
            
            //draw anything left over
            this._currentRenderer.draw(gl, { entityCount: this._entityCount });
            this.numDrawCalls++;
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
                if ((<Entity>child).glRenderer !== this._currentRenderer) {
                  //  console.log("renderer switched");
                    this._flushBatch(gl);

                    this._switchProgram(gl, <Entity>child);

                    //force texture switch
                    this._switchTexture(gl, <Entity>child);
                }
                //draw and switch to different texture if need be
                if ((<Entity>child).atlas !== this._currentTextureAtlas) {
                    this._flushBatch(gl);
                    this._switchTexture(gl, <Entity>child);
                } 
                
                //"render"
                (<Kiwi.Entity>child).renderGL(gl, this._currentRenderer, camera);
                this._entityCount++;
                
            }
        
        }

        private _flushBatch(gl: WebGLRenderingContext) {
            this._currentRenderer.draw(gl, { entityCount: this._entityCount });
            this.numDrawCalls++;
            this._entityCount = 0;
            this._currentRenderer.clear(gl, { mvMatrix: this.mvMatrix, uCameraOffset: this._cameraOffset });
        }

        private _switchProgram(gl: WebGLRenderingContext, entity: Entity) {
            //console.log("switching program");
            this._currentRenderer.disable(gl);
            this._currentRenderer = entity.glRenderer;
            this._currentRenderer.enable(gl, { mvMatrix: this.mvMatrix, stageResolution: this._stageResolution, cameraOffset: this._cameraOffset });
        }

        private _switchTexture(gl: WebGLRenderingContext, entity: Entity) {
         
            this._currentTextureAtlas = entity.atlas;
            this._currentRenderer.updateTextureSize(gl, new Float32Array([this._currentTextureAtlas.glTextureWrapper.image.width, this._currentTextureAtlas.glTextureWrapper.image.height]));
            this._textureManager.useTexture(gl,  entity.atlas.glTextureWrapper);
               
        }
        
    }

}

