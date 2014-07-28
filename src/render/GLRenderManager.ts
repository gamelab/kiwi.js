
//used for ts recognition of matrix-gl
declare var mat2d, mat3, vec2, vec3, mat4;



/**
* 
* 
* @module Kiwi
* @submodule Renderers 
* @main Renderers
* @namespace Kiwi.Renderers
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
    * @param game {Kiwi.Game} The game that this renderer belongs to.
    * @return {Kiwi.Renderers.GLRenderManager}
    */
    export class GLRenderManager implements IRenderManager {

       
        constructor(game: Kiwi.Game) {
            this._game = game;
            if (typeof mat4 === "undefined") {
                throw "ERROR: gl-matrix.js is missing";
            }
            this._currentBlendMode = new Kiwi.Renderers.GLBlendMode(this._game.stage.gl, {mode:"DEFAULT"} );
        }

        /**
        * Initialises all WebGL rendering services
        * @method boot
        * @public
        */
        public boot() {
            this._textureManager = new GLTextureManager();
            this._shaderManager = new Kiwi.Shaders.ShaderManager();
            //this.filters = new Kiwi.Filters.GLFilterManager(this._game, this._shaderManager);
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
        * @type Kiwi.Renderes.GLTextureManager
        * @private
        */
        private _textureManager: GLTextureManager;
       
        /**
        * The shader manager object used to allocate GL Shaders.
        * @property _shaderManager
        * @type Kiwi.Renderes.GLShaderManager
        * @private
        */
       
        private _shaderManager: Kiwi.Shaders.ShaderManager;

        //public filters: Kiwi.Filters.GLFilterManager;

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
        private _currentRenderer: Renderer = null;

        /**
        * The current blend mode.
        * @property _currentBlendMode
        * @type Kiwi.Renderers.GLBlendMode
        * @private
        * @since 1.1.0
        */
        private _currentBlendMode: GLBlendMode;
        
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
         
        
        public camMatrix: Float32Array;
        
        
        /**
        * The most recently bound texture atlas.
        * @property _currentTextureAtlas
        * @type TextureAtlas
        * @private
        */
        private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;
        
        /**
        * Adds a texture to the Texture Manager. 
        * @method addTexture
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Textures.TextureAtlas} atlas
        * @public
        */
        public addTexture(gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas) {
            this._textureManager.uploadTexture(gl, atlas);
        }

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
        * Adds a cloned renderer to the sharedRenderer array. The rendererID is a string that must match a renderer property of the Kiwi.Renderers object. The cloneID is the name for the cloned renderer.
        *
        * If a match is found and an instance does not already exist, then a renderer is instantiated and added to the array.
        *
        * Cloned shared renderers are useful if some items in your scene will use a special shader or blend mode, but others will not. You can subsequently access the clones with a normal requestSharedRenderer() call. You should use this instead of requestRendererInstance() whenever possible, because shared renderers are more efficient than instances.
        *
        * @method addSharedRendererClone
        * @param {String} rendererID
        * @param {String} cloneID
        * @param {Object} params
        * @return {Boolean} success
        * @public
        * @since 1.1.0
        */
        public addSharedRendererClone(rendererID: string, cloneID: string, params: any = null): boolean {
            if (typeof params === "undefined") { params = null; }
            //does renderer exist?
            if (Kiwi.Renderers[rendererID]) {
                //already added?
                if (!(cloneID in this._sharedRenderers)) {
                    this._sharedRenderers[cloneID] = new Kiwi.Renderers[rendererID](this._game.stage.gl, this._shaderManager, params);
                    return true;
                }
            }
            return false;
        }


        /**
	    * Requests a shared renderer. A game object that wants to use a shared renderer uses this method to obtain a reference to the shared renderer instance.
	    * @method requestSharedRenderer
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

        /*
        public get filtersEnabled(): boolean {
            return this._filtersEnabled;
        }

        public set filtersEnabled(val: boolean) {
            this._filtersEnabled = val;
        }

        private _filtersEnabled: boolean = false;
        
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
                        
            //set default gl state
            gl.enable(gl.BLEND);
            this._switchBlendMode(gl, this._currentBlendMode);

            //shader manager
            this._shaderManager.init(gl, "TextureAtlasShader");
            
            //camera matrix
            this.camMatrix = mat3.create();
            
            //stage res needs update on stage resize
            this._game.stage.onResize.add(function (width, height) {
                this._stageResolution = new Float32Array([width, height]);
                if (this.currentRenderer) this._currentRenderer.updateStageResolution(gl, this._stageResolution);
                //this.filters.updateFilterResolution(gl,width, height);
                gl.viewport(0, 0, width,height);
            },this);

           /* if (this.filtersEnabled && !this.filters.isEmpty) {
                this.filters.enableFrameBuffers(gl);
            }*/

       }

        
        /**
        * Performs initialisation required when switching to a different state. Called when a state has been switched to.
        * The textureManager is told to clear its contents from video memory, then rebuild its cache of textures from the state's texture library.
        * @method initState
        * @public
        */

        public initState(state: Kiwi.State) {
            this._textureManager.clearTextures(this._game.stage.gl);
            this._textureManager.uploadTextureLibrary(this._game.stage.gl, state.textureLibrary);
        }

        /**
        * Performs cleanup required before switching to a different state. Called whwn a state is about to be switched from. The textureManager is told to empty its cache.
        * @method endState
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
               
            //clear stage every frame
            var col = this._game.stage.normalizedColor;
            // Colour must be multiplied by alpha to create consistent results.
            // This is probably due to browsers implementing an inferior blendfunc:
            // ONE, ONE_MINUS_SRC_ALPHA is most common, and gives bad results with alphas.
            // When this is used on a partially transparent game canvas, it does not blend correctly.
            // Without being able to override the browser's own object renderer, this is a necessary kludge.
            // The "clean" solution is as follows:
            // gl.clearColor(col.r, col.g, col.b, col.a);
            gl.clearColor(col.r * col.a, col.g * col.a, col.b * col.a, col.a);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            // Stop drawing if there is nothing to draw
            if (this._game.states.current.members.length == 0) {
                console.log("nothing to render");
                return;
            }
                                       
            //reset stats
            this.numDrawCalls = 0;
            this._textureManager.numTextureWrites = 0;
            this._entityCount = 0;
            
            //set cam matrix uniform
            var cm: Kiwi.Geom.Matrix = camera.transform.getConcatenatedMatrix();
            var ct: Kiwi.Geom.Transform = camera.transform;

            var rotOffset = vec2.create();
            var scale = vec2.create();
            var translate = vec2.create();

			vec2.set(scale, ct.scaleX, ct.scaleY);
			vec2.set(rotOffset, -ct.rotPointX, -ct.rotPointY);
			vec2.set(translate, cm.tx, cm.ty);
			mat3.identity(this.camMatrix);
			mat3.translate(this.camMatrix, this.camMatrix, translate);
			mat3.rotate(this.camMatrix, this.camMatrix, ct.rotation);
			mat3.scale(this.camMatrix, this.camMatrix, scale);
			mat3.translate(this.camMatrix, this.camMatrix, rotOffset);
            
            this.collateRenderSequence();
            this.collateBatches();
            this.renderBatches(gl, camera);
          
            /*if (this._filtersEnabled && !this.filters.isEmpty) {
                this.filters.applyFilters(gl);
                gl.useProgram(this._shaderManager.currentShader.shaderProgram);
                gl.bindTexture(gl.TEXTURE_2D, this._currentTextureAtlas.glTextureWrapper.texture);
            }*/
        }

        private _sequence: any[];
        private _batches: any[];


        /**
        * Creates a new render sequence
        * @method collateRenderSequence
        * @public
        */
        public collateRenderSequence() {
            this._sequence = [];
            var root: IChild = this._game.states.current;
            this.collateChild(root);
        }

        /**
        * Adds a child to the render sequence (may be a group with children of it's own)
        * @method collateChild
        * @public
        */
        public collateChild(child:IChild) {
        	// Do not render non-visible objects or their children
        	if( !child.visible) return;
        	
            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this.collateChild( (<Kiwi.Group>child).members[i]);
                }
            } else {
                var entity: Entity = <Entity>child;
                this._sequence.push({
                    entity: entity,
                    renderer: entity.glRenderer,
                    shader: entity.glRenderer.shaderPair,
                    isBatchRenderer: entity.glRenderer.isBatchRenderer,
                    texture: entity.atlas
                });
            }
        }

        /**
        * Sorts the render sequence into batches. Each batch requires the same renderer/shader/texture combination. 
        * @method collateBatches
        * @public
        */
        public collateBatches() {
            var currentRenderer: Renderer = null;
            var currentShader: Shaders.ShaderPair = null;
            var currentTexture: Textures.TextureAtlas = null;

            this._batches = [];
            var batchIndex:number;

            for (var i = 0; i < this._sequence.length; i++) {
                if (!this._sequence[i].isBatchRenderer ||
                    this._sequence[i].renderer !== currentRenderer ||
                    this._sequence[i].shader !== currentShader ||
                    this._sequence[i].texture !== currentTexture) {
                    //create a new batch
                    var batchIndex = this._batches.push(new Array()) - 1;
                    currentRenderer = this._sequence[i].renderer; 
                    currentShader = this._sequence[i].shader;
                    currentTexture = this._sequence[i].texture;

                } 
                this._batches[batchIndex].push(this._sequence[i]);
            }
        }

        /**
        * Renders all the batches 
        * @method renderBatches
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Camera} camera
        * @public
        */
        public renderBatches(gl: WebGLRenderingContext, camera) {
            for (var i = 0; i < this._batches.length; i++)
                this.renderBatch( gl, this._batches[i], camera );
        }

        /**
        * Renders a single batch 
        * @method renderBatch
        * @param {WebGLRenderingContext} gl
        * @param {Object} batch
        * @param {Kiwi.Camera} camera
        * @public
        */
        public renderBatch(gl, batch, camera) {
            // Acquire renderer
            var rendererSwitched = false;
            if (batch[0].entity.glRenderer !== this._currentRenderer) {
                rendererSwitched = true;
                this._switchRenderer(gl, batch[0].entity);
            }

            // Clear renderer for fresh data
            this._currentRenderer.clear(gl, { camMatrix: this.camMatrix });

            // Call render functions
            for( var i = 0;  i < batch.length;  i++ )
                batch[i].entity.renderGL(gl, camera);

            // Upload textures
            if( batch[0].entity.atlas !== this._currentTextureAtlas  ||  batch[0].entity.atlas.dirty ||  (rendererSwitched  &&  batch[0].entity.atlas == this._currentTextureAtlas) )
                this._switchTexture(gl, batch[0].entity);

            // Manage blend mode
            if(!this._currentBlendMode.isIdentical( batch[0].entity.glRenderer.blendMode )  ||  this._currentBlendMode.dirty )
                this._switchBlendMode(gl, batch[0].entity.glRenderer.blendMode);

            // Render
            this._currentRenderer.draw(gl);
        }

        /**
        * Calls the render function on a single entity
        * @method renderEntity
        * @param {WebGLRenderingContext} gl
        * @param {Kiwi.Entity} entity
        * @param {Kiwi.Camera} camera
        * @public
        * @deprecated Used internally; should not be called from external functions
        */
        public renderEntity(gl: WebGLRenderingContext, entity: any, camera) {
            this.renderBatch( gl, [entity], camera );
        }

        /**
        * Ensures the atlas and renderer needed for a batch is setup
        * @method setupGLState
        * @param {WebGLRenderingContext} gl
        * @public
        * @deprecated Used internally; should not be called from external functions.
        */
        public setupGLState(gl:WebGLRenderingContext,entity) {
            if (entity.atlas !== this._currentTextureAtlas) this._switchTexture(gl, entity);
            if (entity.glRenderer !== this._currentRenderer) this._switchRenderer(gl, entity);
        }
              
        /**
        * Switch renderer to the one needed by the entity that needs rendering
        * @method _switchRenderer
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @private
        */
        private _switchRenderer(gl: WebGLRenderingContext, entity: Entity) {
            if (this._currentRenderer) this._currentRenderer.disable(gl);
            this._currentRenderer = entity.glRenderer;
            this._currentRenderer.enable(gl, { camMatrix: this.camMatrix, stageResolution: this._stageResolution });
        }
        
        /**
        * Switch texture to the one needed by the entity that needs rendering
        * @method _switchTexture
        * @param gl {WebGLRenderingContext}
        * @param entity {Kiwi.Entity}
        * @private
        */
        private _switchTexture(gl: WebGLRenderingContext, entity: Entity) {
            this._currentTextureAtlas = entity.atlas;
            if (this._currentRenderer) this._currentRenderer.updateTextureSize(gl, new Float32Array([this._currentTextureAtlas.glTextureWrapper.image.width, this._currentTextureAtlas.glTextureWrapper.image.height]));
            this._textureManager.useTexture(gl, entity.atlas.glTextureWrapper);
            this._currentTextureAtlas.refreshTextureGL( gl );
        }

        /**
        * Switch blend mode to a new set of constants
        * @method _switchBlendMode
        * @param gl {WebGLRenderingContext}
        * @param blendMode {Kiwi.Renderers.GLBlendMode}
        * @private
        * @since 1.1.0
        */
        private _switchBlendMode(gl: WebGLRenderingContext, blendMode: GLBlendMode) {
            this._currentBlendMode = blendMode;
            this._currentBlendMode.apply(gl);
        }
        
    }

}

