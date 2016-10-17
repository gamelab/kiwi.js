/**
@module Kiwi
@submodule Renderers
@main Renderers
@namespace Kiwi.Renderers
**/

module Kiwi.Renderers {

	/**
	Manages all rendering using WebGL.

	- Directly manages renderer objects, including factory methods
		for their creation.
	- Creates manager objects for shaders and textures.
	- Manages gl state at game initialisation, at state start and end,
		and per frame.
	- Runs the recursive scene graph rendering sequence every frame.

	@class GLRenderManager
	@extends IRenderer
	@constructor
	@param game {Kiwi.Game} Game that this renderer belongs to.
	**/

	export class GLRenderManager implements IRenderManager {

		constructor( game: Kiwi.Game ) {
			this._game = game;
			this._currentBlendMode = new Kiwi.Renderers.GLBlendMode(
				this._game.stage.gl, {mode:"DEFAULT"} );
		}

		public boot() {

			/**
			Initialise all WebGL rendering services.

			@method boot
			@public
			**/

			this._textureManager = new GLTextureManager();
			this._shaderManager = new Kiwi.Shaders.ShaderManager();
			this._init();
		}

		public objType() {

			/**
			Return the type of object that this is.

			@method objType
			@return {string} "GLRenderManager"
			@public
			**/

			return "GLRenderManager";
		}

		/**
		Game that this renderer is used with

		@property _game
		@type Game
		@private
		**/
		private _game: Kiwi.Game;

		/**
		Texture manager object used to allocate GL Textures

		@property _textureManager
		@type Kiwi.Renderes.GLTextureManager
		@private
		**/
		private _textureManager: GLTextureManager;

		/**
		Shader manager object used to allocate GL Shaders

		@property _shaderManager
		@type Kiwi.Renderes.GLShaderManager
		@private
		**/

		private _shaderManager: Kiwi.Shaders.ShaderManager;

		/**
		Stage resolution in pixels

		@property _stageResolution
		@type Float32Array
		@private
		**/
		private _stageResolution: Float32Array;

		/**
		Renderer object currently in use during a rendering batch

		@property _currentRenderer
		@type Kiwi.Renderers.Renderer
		@private
		**/
		private _currentRenderer: Renderer = null;

		/**
		Current blend mode

		@property _currentBlendMode
		@type Kiwi.Renderers.GLBlendMode
		@private
		@since 1.1.0
		**/
		private _currentBlendMode: GLBlendMode;

		/**
		Tally of number of entities rendered per frame

		@property _entityCount
		@type number
		@default 0
		@private
		**/
		private _entityCount: number = 0;

		/**
		Tally of number of draw calls per frame

		@property numDrawCalls
		@type number
		@default 0
		@public
		**/
		public numDrawCalls: number = 0;

		/**
		Maximum allowable sprites to render per frame.
		Note: Not currently used - candidate for deletion

		@property _maxItems
		@type number
		@default 1000
		@private
		**/
		private _maxItems: number = 1000;

		/**
		Camera matrix used on graphics card

		@property camMatrix
		@type Float32Array
		@public
		**/
		public camMatrix: Float32Array;

		/**
		Geometry data used to create `camMatrix`

		@property _camMatrix
		@type Kiwi.Geom.Matrix
		@private
		**/
		private _camMatrix: Kiwi.Geom.Matrix;

		/**
		Most recently bound texture atlas

		@property _currentTextureAtlas
		@type TextureAtlas
		@private
		**/
		private _currentTextureAtlas: Kiwi.Textures.TextureAtlas = null;

		/**
		Add a texture to the Texture Manager.

		@method addTexture
		@param gl {WebGLRenderingContext} Canvas rendering context
		@param atlas {Kiwi.Textures.TextureAtlas} Texture reference
		@public
		**/
		public addTexture( gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas ) {
			this._textureManager.uploadTexture( gl, atlas );
		}

		/**
		Remove a texture from the Texture Manager.

		@method removeTexture
		@param {WebGLRenderingContext} gl
		@param {Kiwi.Textures.TextureAtlas} atlas
		@since 1.4.1
		@Public
		**/
		public removeTexture( gl: WebGLRenderingContext, atlas: Kiwi.Textures.TextureAtlas ) {
			this._textureManager.removeTexture( gl, atlas );
		}

		/**
		Array of renderers.

		Shared renderers are used for batch rendering.
		Multiple gameobjects can use the same renderer instance and add
		rendering info to a batch rather than rendering individually.
		This means only one draw call is necessary to render a number of
		objects. The most common use of this is standard 2d sprite rendering,
		and the TextureAtlasRenderer is added by default as a shared
		renderer. Sprites, StaticImages and Tilemaps (core gameobjects)
		can all use the same renderer/shader combination and be drawn as
		part of the same batch.

		Custom gameobjects can also choose to use a shared renderer,
		for example in the case that a custom gameobject's
		rendering requirements matched the `TextureAtlasRenderer`
		capabilities.

		@property _sharedRenderers
		@type Array
		@private
		**/
		private _sharedRenderers: any = {};

		public addSharedRenderer( rendererID:string, params:any = null ):boolean {

			/**
			Add a renderer to the sharedRenderer array.

			The rendererID is a string that must match a renderer property
			of the Kiwi.Renderers object. If a match is found and an instance
			does not already exist, then a renderer is instantiated and added
			to the array.

			@method addSharedRenderer
			@param {string} rendererID
			@param {object} params
			@return {boolean} success
			@public
			**/

			// Does renderer exist?
			if ( Kiwi.Renderers[ rendererID ] ) {

				// Already added?
				if ( !( rendererID in this._sharedRenderers ) ) {
					this._sharedRenderers[ rendererID ] =
						new Kiwi.Renderers[ rendererID ](
							this._game.stage.gl, this._shaderManager, params );
					return true;
				}
			}
			return false;
		}

		public addSharedRendererClone( rendererID: string, cloneID: string, params: any = null ): boolean {

			/**
			Add a cloned renderer to the sharedRenderer array.
			The rendererID is a string that must match a renderer property of
			the Kiwi.Renderers object. The cloneID is the name for the
			cloned renderer.

			If a match is found and an instance does not already exist,
			then a renderer is instantiated and added to the array.

			Cloned shared renderers are useful if some items in your scene
			will use a special shader or blend mode, but others will not.
			You can subsequently access the clones with a normal
			`requestSharedRenderer()` call. You should use this instead of
			`requestRendererInstance()` whenever possible, because shared
			renderers are more efficient than instances.

			@method addSharedRendererClone
			@param {string} rendererID
			@param {string} cloneID
			@param {object} params
			@return {boolean} success
			@public
			@since 1.1.0
			**/

			if ( typeof params === "undefined" ) {
				params = null;
			}

			// Does renderer exist?
			if ( Kiwi.Renderers[ rendererID ] ) {

				// Already added?
				if ( !( cloneID in this._sharedRenderers ) ) {
					this._sharedRenderers[ cloneID ] =
						new Kiwi.Renderers[ rendererID ](
							this._game.stage.gl, this._shaderManager, params );
					return true;
				}
			}
			return false;
		}


		public requestSharedRenderer( rendererID: string, params:any = null ): Kiwi.Renderers.Renderer {

			/**
			Request a shared renderer. A game object that wants to use a shared
			renderer uses this method to obtain a reference to the shared
			renderer instance.

			@method requestSharedRenderer
			@param {string} rendererID
			@param {object} params
			@return {Kiwi.Renderers.Renderer} A shared renderer
				or null if none found.
			@public
			**/

			var renderer: Kiwi.Renderers.Renderer =
					this._sharedRenderers[ rendererID ];

			if ( renderer ) {
				return renderer;
			} else {
				if ( this.addSharedRenderer( rendererID, params ) ) {
					return this._sharedRenderers[ rendererID ];
				} else {
					Kiwi.Log.log(
						"No renderer called " + rendererID,
						"#renderer",
						"#webgl" );
				}
			}

			// Failed request
			return null;
		}

		public requestRendererInstance( rendererID: string, params: any = null ): Kiwi.Renderers.Renderer {

			/**
			Request a new renderer instance. This factory method is the only
			way gameobjects should instantiate their own renderer.

			The rendererID is a string that must match a renderer property
			of the Kiwi.Renderers object. If a match is found then a renderer
			is instantiated and returned. Gameobjects which have rendering
			requirements that do not suit batch rendering use this technique.

			@method requestRendererInstance
			@param {string} rendererID The name of the requested renderer
			@param {object} params
			@return {Kiwi.Renderers.Renderer} A renderer or null if none found.
			@public
			**/

			if ( rendererID in Kiwi.Renderers ) {
				var renderer = new Kiwi.Renderers[ rendererID ](
					this._game.stage.gl, this._shaderManager, params );
				return renderer
			} else {
				Kiwi.Log.log(
					"No renderer with id " +
					rendererID +
					" exists",
					"#renderer",
					"#webgl" );
			}

			// Fail
			return null;
		}

		private _init() {

			/**
			Perform initialisation required for single game instance.
			Happens once, at bootup. Sets global GL state.
			Initialises managers for shaders and textures.
			Instantiates the default shared renderer (`TextureAtlasRenderer`).

			@method _init
			@private
			**/

			Kiwi.Log.log( "Initialising WebGL", "#renderer", "#webgl" );

			var gl: WebGLRenderingContext = this._game.stage.gl;

			// Init stage and viewport
			this._stageResolution = new Float32Array(
				[ this._game.stage.width, this._game.stage.height ] );

			// Manually override scaling under CocoonJS
			if ( this._game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
				this.scaleViewport(
					gl, this._game.stage.scaleType,
					window.innerWidth, window.innerHeight );
			}
			else {
				this.scaleViewport(
					gl, Kiwi.Stage.SCALE_NONE,
					this._game.stage.width, this._game.stage.height );
			}

			// Set default gl state
			gl.enable( gl.BLEND );
			this._switchBlendMode( gl, this._currentBlendMode );

			this._shaderManager.init( gl, "TextureAtlasShader" );

			// Camera matrix
			this.camMatrix = new Float32Array( [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ] );
			this._camMatrix = new Kiwi.Geom.Matrix();

			// Stage res needs update on stage resize
			this._game.stage.onResize.add( function ( width, height ) {
				this._stageResolution = new Float32Array( [ width, height ] );
				if ( this.currentRenderer ) {
					this._currentRenderer.updateStageResolution(
						gl, this._stageResolution );
				}

				// Manually override scaling under CocoonJS
				if ( this._game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
					this.scaleViewport(
						gl,
						this._game.stage.scaleType,
						window.innerWidth,
						window.innerHeight );
				} else {
					this.scaleViewport(
						gl, Kiwi.Stage.SCALE_NONE, width, height );
				}
			}, this );

		}

		public scaleViewport( gl:WebGLRenderingContext, mode:number, width:number, height:number ) {

			/**
			Scales the viewport according to a scale mode and space dimensions.

			This is used internally for compatibility with CocoonJS
			and should not be called.

			@method scaleViewport
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param mode {number} Scale mode; should be either
				Kiwi.Stage.SCALE_FIT, Kiwi.Stage.SCALE_STRETCH, or
				Kiwi.Stage.SCALE_NONE. Defaults to Kiwi.Stage.SCALE_NONE
			@param width {number} Width of the target space
			@param height {number} Height of the target space
			@public
			@since 1.1.1
			**/

			var offset = new Kiwi.Geom.Point( 0, 0 );
			switch( mode ) {
				case Kiwi.Stage.SCALE_FIT:

					// Compute aspect ratios
					var arStage =
						this._game.stage.width / this._game.stage.height;
					var arSpace = width / height;
					if ( arStage < arSpace ) {

						// Width is too wide
						var newWidth = height * arStage;
						offset.x = ( width - newWidth ) / 2;

						// Compress target space
						width = newWidth;
					}
					else {

						// Height is too wide
						var newHeight = width / arStage;
						offset.y = ( height - newHeight ) / 2;

						// Compress target space
						height = newHeight;
					}
					break;
				case Kiwi.Stage.SCALE_STRETCH:
					break;
				case Kiwi.Stage.SCALE_NONE:
					width = this._game.stage.width;
					height = this._game.stage.height;
					break;
				default:
					break;
			}

			gl.viewport( offset.x, offset.y, width, height );
		}

		public initState( state: Kiwi.State ) {

			/**
			Perform initialisation required when switching state.
			Called when a state has been switched to.
			The textureManager clears its contents from video memory, then
			rebuilds its cache of textures from the state's texture library.

			@method initState
			@public
			**/

			this._textureManager.clearTextures( this._game.stage.gl );
			this._textureManager.uploadTextureLibrary(
				this._game.stage.gl, state.textureLibrary );
		}

		public endState( state: Kiwi.State ) {

			/**
			Perform cleanup required before switching to a different state.
			Called whwn a state is about to be switched from.
			The textureManager is told to empty its cache.

			@method endState
			@param state {Kiwi.State}
			@public
			**/

			this._textureManager.clearTextures( this._game.stage.gl );
			Kiwi.Log.log( "Ending WebGL on State", "#renderer", "#webgl" );
		}

		public render( camera: Kiwi.Camera ) {

			/**
			Manage rendering of the scene graph - called once per frame.
			Set up per frame gl uniforms such as the view matrix and
			camera offset. Clear the current renderer ready for a new batch.
			Initiate recursive render of scene graph starting at the root.

			@method render
			@param camera {Camera}
			@public
			**/

			var gl: WebGLRenderingContext = this._game.stage.gl;

			// Clear stage every frame
			var col = this._game.stage.normalizedColor;

			// Colour must be multiplied by alpha to create consistent results.
			// This is probably due to browsers implementing an inferior
			// blendfunc: ONE, ONE_MINUS_SRC_ALPHA is most common, and gives
			// bad results with alphas. When this is used on a partially
			// transparent game canvas, it does not blend correctly.
			// Without being able to override the browser's own renderer,
			// this is a necessary kludge. The "clean" solution is as follows:
			// `gl.clearColor( col.r, col.g, col.b, col.a );`
			gl.clearColor(
				col.r * col.a, col.g * col.a, col.b * col.a, col.a );
			gl.clear( gl.COLOR_BUFFER_BIT );

			// Reset current renderer.
			// This prevents runtime created shaders from being uploaded
			// and the render manager failing to notice, causing crashes.
			this._currentRenderer = null;

			// Stop drawing if there is nothing to draw
			if ( this._game.states.current.members.length == 0 ) {
				return;
			}

			// Reset stats
			this.numDrawCalls = 0;
			this._textureManager.numTextureWrites = 0;
			this._entityCount = 0;

			// Set cam matrix data.
			var ct: Kiwi.Geom.Transform = camera.transform;
			this._camMatrix.setFromOffsetTransform(
				0, 0, ct.scaleX, ct.scaleY, ct.rotation,
				ct.anchorPointX, ct.anchorPointY );
			this._camMatrix.append(
				1, 0, 0, 1, ct.x - ct.anchorPointX, ct.y - ct.anchorPointY );

			// Overwrite cam matrix properties rather than recreating matrix.
			// This is necessary to keep the cam matrix synchronised
			// with other renderers: if there is only one render batch,
			// then `enable` will only pass the cam matrix on the first frame,
			// so subsequent camera movements will not be passed to the shader.
			this.camMatrix[ 0 ] = this._camMatrix.a;
			this.camMatrix[ 1 ] = this._camMatrix.b;
			this.camMatrix[ 3 ] = this._camMatrix.c;
			this.camMatrix[ 4 ] = this._camMatrix.d;
			this.camMatrix[ 6 ] = this._camMatrix.tx;
			this.camMatrix[ 7 ] = this._camMatrix.ty;

			// Mandate blend mode in CocoonJS
			// This must be called per-frame, because CocoonJS seems to
			// interfere with blend modes on a per-frame basis.
			if ( this._game.deviceTargetOption == Kiwi.TARGET_COCOON ) {
				this._switchBlendMode( gl, this._currentBlendMode );
			}

			this.collateRenderSequence();
			this.collateBatches();
			this.renderBatches( gl, camera );
		}

		private _sequence: any[];
		private _batches: any[];

		public collateRenderSequence() {

			/**
			Create a new render sequence.

			@method collateRenderSequence
			@public
			**/

			this._sequence = [];
			var root: IChild = this._game.states.current;
			this.collateChild( root );
		}

		public collateChild( child:IChild ) {

			/**
			Add a child to the render sequence
			(may be a group with children of its own).

			@method collateChild
			@public
			**/

			var i;

			// Do not render non-visible objects or their children
			if ( !child.visible ) return;

			if ( child.childType() === Kiwi.GROUP ) {
				for ( i = 0; i < ( <Kiwi.Group>child ).members.length; i++ ) {
					this.collateChild( ( <Kiwi.Group>child ).members[ i ] );
				}
			} else {
				var entity: Entity = <Entity>child;
				this._sequence.push( {
					entity: entity,
					renderer: entity.glRenderer,
					shader: entity.glRenderer.shaderPair,
					isBatchRenderer: entity.glRenderer.isBatchRenderer,
					texture: entity.atlas
				} );
			}
		}

		public collateBatches() {

			/**
			Sort the render sequence into batches.
			Each batch requires the same renderer/shader/texture combination.

			@method collateBatches
			@public
			**/

			var currentRenderer: Renderer = null;
			var currentShader: Shaders.ShaderPair = null;
			var currentTexture: Textures.TextureAtlas = null;

			this._batches = [];
			var batchIndex:number;

			for ( var i = 0; i < this._sequence.length; i++ ) {
				if ( !this._sequence[ i ].isBatchRenderer ||
					this._sequence[ i ].renderer !== currentRenderer ||
					this._sequence[ i ].shader !== currentShader ||
					this._sequence[ i ].texture !== currentTexture ) {

					// Create a new batch
					var batchIndex = this._batches.push( new Array() ) - 1;
					currentRenderer = this._sequence[ i ].renderer;
					currentShader = this._sequence[ i ].shader;
					currentTexture = this._sequence[ i ].texture;

				}
				this._batches[ batchIndex ].push( this._sequence[ i ] );
			}
		}

		public renderBatches( gl: WebGLRenderingContext, camera ) {

			/**
			Render all the batches.

			@method renderBatches
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param camera {Kiwi.Camera} Currently rendering camera
			@public
			**/

			for ( var i = 0; i < this._batches.length; i++ ) {
				this.renderBatch( gl, this._batches[ i ], camera );
			}
		}

		public renderBatch( gl, batch, camera ) {

			/**
			Render a single batch.

			@method renderBatch
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param batch {object} Batch to render
			@param camera {Kiwi.Camera} Currently rendering camera
			@public
			**/

			// Acquire renderer
			var rendererSwitched = false;
			if ( batch[ 0 ].renderer !== this._currentRenderer ) {
				rendererSwitched = true;
				this._switchRenderer( gl, batch[ 0 ].entity );
			}

			// Clear renderer for fresh data
			this._currentRenderer.clear( gl, { camMatrix: this.camMatrix } );

			// Call render functions
			for ( var i = 0; i < batch.length; i++ ) {
				batch[ i ].entity.renderGL( gl, camera );
			}

			// Upload textures
			if (
				batch[ 0 ].texture !== this._currentTextureAtlas ||
				batch[ 0 ].texture.dirty ||
				( rendererSwitched && batch[ 0 ].texture ===
					this._currentTextureAtlas ) ) {

				batch[ 0 ].texture.enableGL(
					gl, this._currentRenderer, this._textureManager );
			}

			// Manage blend mode
			// We must always apply BlendMode under CocoonJS, because some
			// (but not all) operations on other canvases may
			// silently change the blend mode and not change it back.
			if ( !this._currentBlendMode.isIdentical(
						batch[ 0 ].renderer.blendMode ) ||
					this._currentBlendMode.dirty ||
					this._game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
				this._switchBlendMode(
					gl, batch[ 0 ].renderer.blendMode );
			}

			// Render
			this._currentRenderer.draw( gl );
		}

		public renderEntity( gl: WebGLRenderingContext, entity: any, camera ) {

			/**
			Call the render function on a single entity.

			@method renderEntity
			@param {WebGLRenderingContext} gl
			@param {Kiwi.Entity} entity
			@param {Kiwi.Camera} camera
			@public
			@deprecated Used internally;
				should not be called from external functions
			**/

			this.renderBatch(
				gl,
				[ {
					entity: entity,
					renderer: entity.glRenderer,
					shader: entity.glRenderer.shaderPair,
					isBatchRenderer: entity.glRenderer.isBatchRenderer,
					texture: entity.atlas
				} ],
				camera );
		}

		public setupGLState( gl:WebGLRenderingContext, entity ) {

			/**
			Ensure the atlas and renderer needed for a batch is setup.

			@method setupGLState
			@param {WebGLRenderingContext} gl
			@public
			@deprecated Used internally; should not be called from external functions.
			**/

			if ( entity.atlas !== this._currentTextureAtlas ) {
				this._switchTexture( gl, entity );
			}
			if ( entity.glRenderer !== this._currentRenderer ) {
				this._switchRenderer( gl, entity );
			}
		}

		private _switchRenderer( gl: WebGLRenderingContext, entity: Entity ) {

			/**
			Switch renderer to that needed by the entity.

			@method _switchRenderer
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param entity {Kiwi.Entity} Entity demanding the switch
			@private
			**/

			if ( this._currentRenderer ) {
				this._currentRenderer.disable( gl );
			}
			this._currentRenderer = entity.glRenderer;
			this._currentRenderer.enable(
				gl,
				{
					camMatrix: this.camMatrix,
					stageResolution: this._stageResolution
				} );
		}

		private _switchTexture( gl: WebGLRenderingContext, entity: Entity ) {

			/**
			Switch texture to that needed by the entity.

			@method _switchTexture
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param entity {Kiwi.Entity} Entity demanding the switch
			@private
			@deprecated As of 1.4.1, we use a better method.
				We probably shouldn't be passing an entity to a texture method.
			**/

			this._currentTextureAtlas = entity.atlas;
			entity.atlas.enableGL(
				gl, this._currentRenderer, this._textureManager );
		}

		private _switchBlendMode( gl: WebGLRenderingContext, blendMode: GLBlendMode ) {

			/**
			Switch blend mode to a new set of constants.

			@method _switchBlendMode
			@param gl {WebGLRenderingContext} Canvas rendering context
			@param blendMode {Kiwi.Renderers.GLBlendMode} New blend mode
			@private
			@since 1.1.0
			**/

			this._currentBlendMode = blendMode;
			this._currentBlendMode.apply( gl );
		}

	}

}
