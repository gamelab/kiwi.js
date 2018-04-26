/**
@module Kiwi
@submodule Buffers
**/

module Kiwi.Buffers {
    export class FilterBufferGlRenderManager
    extends Kiwi.Renderers.GLRenderManager {

        constructor ( game: Kiwi.Game ) {
            /**
            Render manager for a `FilterBuffer`.
            This extends the normal `GLRenderManager`
            to permit enhanced framebuffer functionality.

            Render managers are instantiated automatically
            by a `Bufferer` manager.

            @class FilterBufferGlRenderManager
            @constructor
            @extends Kiwi.Renderers.GLRenderManager
            @param game {Kiwi.Game} Current game
            **/

            this.game = game;
            this.renderer = <Kiwi.Renderers.GLRenderManager>this.game.renderer;

            super( game );

            // Share resources with GLRenderManager.
            // This duplicates some stuff from `boot` and `_init`
            // which would otherwise not be called.
            this.textureManager = this.renderer.textureManager;
            this.shaderManager = this.renderer.shaderManager;
            this.sharedRenderers = this.renderer.sharedRenderers;
            this.camMatrix = this.renderer.camMatrix;

            this.gl = this.game.stage.gl;
            this._baseRenderer = new Kiwi.Renderers.FilterGl( {
                gl: this.gl,
                shaderManager: this.shaderManager
            } );
        }

        get currentBlendMode (): Kiwi.Renderers.GLBlendMode {
            return this.renderer.currentBlendMode;
        }
        set currentBlendMode ( value: Kiwi.Renderers.GLBlendMode ) {
            this.renderer.currentBlendMode = value;
        }

        get currentRenderer (): Kiwi.Renderers.Renderer {
            return this.renderer.currentRenderer;
        }
        set currentRenderer ( value: Kiwi.Renderers.Renderer ) {
            this.renderer.currentRenderer = value;
        }

        get currentTextureAtlas (): Kiwi.Textures.TextureAtlas {
            return this.renderer.currentTextureAtlas;
        }
        set currentTextureAtlas
        ( value: Kiwi.Textures.TextureAtlas ) {
            this.renderer.currentTextureAtlas = value;
        }

        /**
        Game (publicly accessible)
        @property game
        @type Kiwi.Game
        **/
        game: Kiwi.Game;

        /**
        WebGL rendering context in use
        @property gl
        @type WebGLRenderingContext
        **/
        gl: WebGLRenderingContext;

        /**
        Core game renderer
        @property renderer
        @type Kiwi.Renderers.GLRenderManager
        **/
        renderer: Kiwi.Renderers.GLRenderManager;

        /**
        Base image renderer, used to initialize every `FilterBuffer`
        render sequence

        @property _baseRenderer
        @type Kiwi.Renderers.FilterGl
        @private
        **/
        private _baseRenderer: Kiwi.Renderers.FilterGl;

        /**
        Normalized texture reference. This maps the corners of the textures
        to the corners of the buffer.

        @property corners
        @type array
        @static
        **/
        static corners: Array<number> = [
            0, 0, 0, 0,
            1, 0, 1, 0,
            1, 1, 1, 1,
            0, 1, 0, 1
        ];

        renderBuffer ( filterBuffer ) {
            /**
            Render to the specified `FilterBuffer`.
            @method renderBuffer
            @param filterBuffer {Kiwi.GameObjects.FilterBuffer}
                FilterBuffer to render
            **/

            var i;

            // Reset current renderer.
            // This prevents runtime created shaders from being uploaded
            // and the render manager failing to notice, causing crashes.
            this.currentRenderer = null;

            // Mandate blend mode in CocoonJS.
            // This must be called per-frame, because CocoonJS seems to
            // interfere with blend modes on a per-frame basis.
            if ( this.game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
                this.switchBlendMode(
                    this.gl, this.renderer.currentBlendMode );
            }

            // Render base image
            this.renderBaseImage( filterBuffer );

            // Render filters
            for ( i = 0; i < filterBuffer.filters.length; i++ ) {
                if ( filterBuffer.filters[ i ].active ) {
                    filterBuffer.pingpong();
                    this.renderFilter(
                        filterBuffer, filterBuffer.filters[ i ] );
                }
            }

            filterBuffer.updateTextureAtlas();
        }

        renderBaseImage ( filterBuffer: Kiwi.GameObjects.FilterBuffer ) {
            /**
            Render the base image of the `FilterBuffer` into buffer 2.

            This is not pingponged yet, because if there are no filters,
            the filterBuffer will just display the base image.

            @method renderBaseImage
            @param filterBuffer {Kiwi.GameObjects.FilterBuffer}
                FilterBuffer to render
            **/

            if ( filterBuffer.clearOnRender ) {
                filterBuffer.clear( false );
            }

            // Acquire renderer
            var rendererSwitched = false;
            if ( this._baseRenderer !== this.currentRenderer ) {
                rendererSwitched = true;

                // Substitution for `_switchRenderer`
                if ( this.currentRenderer ) {
                    this.currentRenderer.disable( this.gl );
                }
                this.currentRenderer = this._baseRenderer;
                this.currentRenderer.enable( this.gl );
            }

            // Upload textures
            if ( !this.currentTextureAtlas ||
                    filterBuffer.atlasInput.image !==
                        this.currentTextureAtlas.image ||
                    filterBuffer.atlasInput.dirty ||
                    ( rendererSwitched && filterBuffer.atlasInput.image ===
                        this.currentTextureAtlas.image ) ) {
                filterBuffer.atlasInput.enableGL(
                    this.gl, this.currentRenderer, this.textureManager );
            }

            // Manage blend mode
            if ( !this.currentBlendMode.isIdentical(
                this._baseRenderer.blendMode ) ||
                    this.currentBlendMode.dirty ||
                    this.game.deviceTargetOption === Kiwi.TARGET_COCOON ) {

                this.switchBlendMode( this.gl, this._baseRenderer.blendMode );
            }

            // Render
            this._baseRenderer.drawCorners( this.gl, filterBuffer.corners );
        }

        renderFilter ( filterBuffer: Kiwi.GameObjects.FilterBuffer, filter ) {
            /**
            Render a filter from buffer 1 to buffer 2.
            @method renderFilter
            @param filterBuffer {Kiwi.GameObjects.FilterBuffer}
                FilterBuffer to render
            @param filter {Kiwi.Buffers.Filter} Filter to render
            **/

            this.gl.bindFramebuffer(
                this.gl.FRAMEBUFFER,
                filterBuffer.bufferOut );
            this.gl.viewport( 0, 0, filterBuffer.width, filterBuffer.height );

            // Always clear buffer ops after the first
            filterBuffer.clear( false );

            // Acquire renderer
            var rendererSwitched = false;
            if ( filter !== this.currentRenderer ) {
                rendererSwitched = true;

                // Substitution for `_switchRenderer`
                if ( this.currentRenderer ) {
                    this.currentRenderer.disable( this.gl );
                }
                this.currentRenderer = filter;
                this.currentRenderer.enable( this.gl );
            }

            // Upload textures
            if ( !this.currentTextureAtlas ||
                    filterBuffer.atlasInput.image !==
                        this.currentTextureAtlas.image ||
                    filterBuffer.atlasInput.dirty ||
                    ( rendererSwitched && filterBuffer.atlasInput.image ===
                        this.currentTextureAtlas.image ) ) {

                filterBuffer.atlasSource.enableGL(
                    this.gl, this.currentRenderer, this.textureManager );
            }

            // Manage blend mode
            if ( !this.currentBlendMode.isIdentical( filter.blendMode ) ||
                    this.currentBlendMode.dirty ||
                    this.game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
                this.switchBlendMode( this.gl, filter.blendMode );
            }

            // Render
            filter.drawCorners(
                this.gl,
                Kiwi.Buffers.FilterBufferGlRenderManager.corners );
        }
    }
}
