
//used for ts recognition of matrix-gl
declare var mat2d, mat3, vec2, vec3, mat4;



/**
* 
* 
* @module Kiwi
* @submodule Renderers 
* @main Renderers
*/ 

module Kiwi.Renderers {
    
    /**
    * Manages all rendering using WebGL. Requires the inclusion of gl-matrix.js / g-matrix.min.js -  https://github.com/toji/gl-matrix
    * Directly manages renderer objects, including factory methods for their creation. 
    * Creates manager objects for shaders and textures.
    * Manages gl state at game initialisation, at state start and end, and per frame.
    * Runs the recursive scene graph rendering sequence every frame. 
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
            this._textureManager = new GLTextureManager();
            this._shaderManager = new Kiwi.Shaders.ShaderManager();
            this._init();
            
        }
        
        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "GLRenderManager";
        }

        /**
        * The game that this renderer is used with.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The texture manager object used to allocate GL Textures.
        * @property _textureManager
        * @type GLTextureManager
        * @private
        */
        private _textureManager: GLTextureManager;
       
        /**
        * The shader manager object used to allocate GL Shaders.
        * @property _shaderManager
        * @type GLShaderManager
        * @private
        */
       
        private _shaderManager: Kiwi.Shaders.ShaderManager;
    
        /**
        * The stage resolution in pixels
        * @property _stageResolution
        * @type Float32Array
        * @private
        */
        private _stageResolution: Float32Array;

        /**
        * The renderer object that is in use during a rendering batch.
        * @property _currentRenderer
        * @type Kiwi.Renderers.Renderer
        * @private
        */
        private _currentRenderer: Renderer;
        
        /**
        * Camera offset in pixels from top left.
        * @property _cameraOffset
        * @type Float32Array
        * @private
        */
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
        * Tally of number of draw calls per frame
        * @property numDrawCalls
        * @type number
        * @default 0
        * @public
        */
        public numDrawCalls: number = 0;
        
        /**
        * Maximum allowable sprites to render per frame
        * Note:Not currently used  - candidate for deletion
        * @property _maxItems
        * @type number
        * @default 1000
        * @private
        */
        private _maxItems: number = 1000;
         
        
        /**
        * GL-Matrix.js provided 4x4 matrix used for matrix uniform
        * @property mvMatrix
        * @type Float32Array
        * @public
        */
        public mvMatrix: Float32Array;
        
        
        /**
        * The most recently bound texture atlas.
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;
        

        /**
        * An array of renderers. Shared renderers are used for batch rendering. Multiple gameobjects can use the same renderer
        * instance and add rendering info to a batch rather than rendering individually. 
        * This means only one draw call is necessary to render a number of objects. The most common use of this is standard 2d sprite rendering,
        * and the TextureAtlasRenderer is added by default as a shared renderer. Sprites, StaticImages and Tilemaps (core gameobjects) can all use the
        * same renderer/shader combination and be drawn as part of the same batch.
        * Custom gameobjects can also choose to use a shared renderer, fo example in the case that a custom gameobject's rendering requirements matched the TextureAtlasRenderer
        * capabilities.
        *  
        * @property _sharedRenderers
        * @type Array
        * @private
        */
        private _sharedRenderers: any = {};

        /**
	    * Adds a renderer to the sharedRenderer array. The rendererID is a string that must match a renderer property of the Kiwi.Renderers object. 
        * If a match is found and an instance does not already exist, then a renderer is instantiated and added to the array.
	    * @method addSharedRenderer
        * @param {String} rendererID
        * @param {Object} params
        * @return {Boolean} success
        * @public
	    */
        
        public addSharedRenderer(rendererID:string,params:any = null):boolean {
            //does renderer exist?
            if (Kiwi.Renderers[rendererID]) {
              
                //already added?
                if (!(rendererID in this._sharedRenderers)) {
                    this._sharedRenderers[rendererID] = new Kiwi.Renderers[rendererID](this._game.stage.gl,this._shaderManager,params);
                    return true;
                }
            }
            return false;
        }


        /**
	    * Requests a shared renderer. A game object that wants to use a shared renderer uses this method to obtain a reference to the shared renderer instance.
	    * @method addSharedRenderer
        * @param {String} rendererID
        * @param {Object} params
        * @return {Kiwi.Renderers.Renderer} A shared renderer or null if none found.
        * @public
	    */

        public requestSharedRenderer(rendererID: string,params:any = null): Kiwi.Renderers.Renderer {
            var renderer: Kiwi.Renderers.Renderer = this._sharedRenderers[rendererID];
            if (renderer) {
                return renderer;
            } else {
                if (this.addSharedRenderer(rendererID,params)) {
                    return this._sharedRenderers[rendererID];
                } else {
                    console.log("no renderer called " + rendererID);
                }
            }
            //failed request
            return null;

        }


        /**
	    * Requests a new renderer instance. This factory method is the only way gameobjects should instantiate their own renderer. 
        * The rendererID is a string that must match a renderer property of the Kiwi.Renderers object. 
        * If a match is found then a renderer is instantiated and returned. Gameobjects which have rendering requirements that do not suit
        * batch rendering use this technique.
	    * @method requestRendererInstance
        * @param {String} rendererID The name of the requested renderer
        * @param {Object} params
        * @return {Kiwi.Renderers.Renderer} A renderer or null if none found.
        * @public
	    */

        public requestRendererInstance(rendererID: string, params: any = null): Kiwi.Renderers.Renderer {
            if (rendererID in Kiwi.Renderers) {
                var renderer = new Kiwi.Renderers[rendererID](this._game.stage.gl, this._shaderManager, params); 
                return renderer
            } else {
                console.log("No renderer with id " + rendererID + " exists");
            }
            return null; //fail
        } 
      
        /**
        * Performs initialisation required for single game instance - happens once, at bootup
        * Sets global GL state.
        * Initialises managers for shaders and textures.
        * Instantiates the default shared renderer (TextureAtlasRenderer)
        * @method _init
        * @private
        */
        private _init() {
            console.log("Intialising WebGL");
            var gl: WebGLRenderingContext = this._game.stage.gl;
           
            //init stage and viewport
            this._stageResolution = new Float32Array([this._game.stage.width, this._game.stage.height]);
            gl.viewport(0, 0, this._game.stage.width, this._game.stage.height);

            this._cameraOffset = new Float32Array([0,0]);

            //set default gl state
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            //create Model View Matrix
            this.mvMatrix = mat4.create();
            mat2d.identity(this.mvMatrix);

            //shader manager
            this._shaderManager.init(gl, "TextureAtlasShader");

            //initialise default renderer
            this.requestSharedRenderer("TextureAtlasRenderer");
            this._sharedRenderers.TextureAtlasRenderer.enable(gl, { mvMatrix: this.mvMatrix, stageResolution: this._stageResolution, cameraOffset: this._cameraOffset });
            this._currentRenderer = this._sharedRenderers.TextureAtlasRenderer;
             
            //stage res needs update on stage resize
            this._game.stage.onResize.add(function (width, height) {
                this._stageResolution = new Float32Array([width, height]);
                this._currentRenderer.updateStageResolution(gl, this._stageResolution);
                gl.viewport(0, 0, width,height);
            },this);

       }

        
        /**
        * Performs initialisation required when switching to a different state. Called when a state has been switched to.
        * The textureManager is told to rebuild its cache of textures from the states textuer library.
        * @method initState
        * @public
        */

        public initState(state: Kiwi.State) {
            console.log("initialising WebGL on State");
            this._textureManager.uploadTextureLibrary(this._game.stage.gl, state.textureLibrary);
        }

        /**
        * Performs cleanup required before switching to a different state. Called whwn a state is about to be switched from. The textureManager is told to empty its cache.
        * @method initState
        * @param state {Kiwi.State}
        * @public
        */

        public endState(state: Kiwi.State) {
            this._textureManager.clearTextures(this._game.stage.gl);
            console.log("ending WebGL on State");
        }
        
        /**
        * Manages rendering of the scene graph - called once per frame.
        * Sets up per frame gl uniforms such as the view matrix and camera offset.
        * Clears the current renderer ready for a new batch. 
        * Initiates recursive render of scene graph starting at the root. 
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
            this._currentRenderer.draw(gl);
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
                this._processEntity(gl, <Entity>child, camera);
            }
        
        }

         /**
        * Processes a single entity for rendering. Ensures that GL state is set up for the entity rendering requirements
        * @method _processEntity
        * is the entity's required renderer active and using the correct shader? If not then flush and re-enable renderer
        * this is to allow the same renderer to use different shaders on different objects - renderer can be configured on a per object basis
        * this needs thorough testing - also the text property lookups may need refactoring
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @param camera {Camera}
        * @private
        */

        private _processEntity(gl: WebGLRenderingContext, entity: Entity, camera: Kiwi.Camera) {

           
            if (entity.glRenderer !== this._currentRenderer || entity.glRenderer["shaderPair"] !== this._shaderManager.currentShader) {
                this._flushBatch(gl);
                this._switchRenderer(gl, entity);
                //force texture switch
                this._switchTexture(gl, entity);
               
            }

            //assert: required renderer is now active

            //are the entity's texture requirements met?
            if (entity.atlas !== this._currentTextureAtlas) {
                this._flushBatch(gl);
                this._switchTexture(gl, entity);
            }

            //assert: texture requirements are met

            entity.renderGL(gl, camera);
            this._entityCount++;
        
        }


        /**
        * Draws the current batch and clears the renderer ready for another batch.
        * @method _flushBatch
        * @param gl {WebGLRenderingContext}
        * @private
        */
        private _flushBatch(gl: WebGLRenderingContext) {
            this._currentRenderer.draw(gl);
            this.numDrawCalls++;
            this._entityCount = 0;
            this._currentRenderer.clear(gl, { mvMatrix: this.mvMatrix, uCameraOffset: this._cameraOffset });
        }

        /**
        * Switch renderer to the one needed by the entity that needs rendering
        * @method _switchRenderer
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @private
        */
        private _switchRenderer(gl: WebGLRenderingContext, entity: Entity) {
            this._currentRenderer.disable(gl);
            this._currentRenderer = entity.glRenderer;
            this._currentRenderer.enable(gl, { mvMatrix: this.mvMatrix, stageResolution: this._stageResolution, cameraOffset: this._cameraOffset });
        }
        
        /**
        * Switch texture to the one needed by the entity that needs rendering
        * @method _switchTexture
        * @param gl {WebGLRenderingContext}
        * @param entity {Entity}
        * @private
        */
        private _switchTexture(gl: WebGLRenderingContext, entity: Entity) {
            this._currentTextureAtlas = entity.atlas;
            this._currentRenderer.updateTextureSize(gl, new Float32Array([this._currentTextureAtlas.glTextureWrapper.image.width, this._currentTextureAtlas.glTextureWrapper.image.height]));
            this._textureManager.useTexture(gl,  entity.atlas.glTextureWrapper);
               
        }
        
    }

}

