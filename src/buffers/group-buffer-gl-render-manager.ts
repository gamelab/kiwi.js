/**
@module Kiwi
@submodule Buffers
**/

module Kiwi.Buffers {
    export class GroupBufferGlRenderManager
    extends Kiwi.Renderers.GLRenderManager {

        constructor ( game: Kiwi.Game ) {
            /**
            Render manager for a `GroupBuffer`.
            This extends the normal `GLRenderManager`
            to permit enhanced framebuffer functionality.

            Render managers are instantiated automatically by a `Bufferer` manager.

            @class GroupBufferGlRenderManager
            @namespace Kiwi.Buffers
            @constructor
            @extends Kiwi.Renderers.GLRenderManager
            @param game {Kiwi.Game} Current game
            **/

            this.game = game;
            this.renderer = <Kiwi.Renderers.GLRenderManager>this.game.renderer;

            super( game );

            this._stageResolution = new Float32Array( [ 0, 0 ] );
            this._m = new Kiwi.Geom.Matrix();

            // Share resources with GLRenderManager.
            // This duplicates some stuff from `boot` and `_init`
            // which would otherwise not be called.
            this.textureManager = this.renderer.textureManager;
            this.shaderManager = this.renderer.shaderManager;
            this.sharedRenderers = this.renderer.sharedRenderers;
            this.camMatrix = this.renderer.camMatrix;
            this.gl = this.game.stage.gl;
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
        Temporary scratch matrix
        @property _m
        @type Kiwi.Geom.Matrix
        @private
        **/
        private _m: Kiwi.Geom.Matrix;

        /**
        Core game renderer
        @property renderer
        @type Kiwi.Renderers.GLRenderManager
        **/
        renderer: Kiwi.Renderers.GLRenderManager;

        private _applyRenderTasks (
            groupBuffer: Kiwi.GameObjects.GroupBuffer ) {
            /**
            Modify the render sequence to use a `RenderTask`.

            This will discard any renderable objects that do not have
            the specified render task.
            It will then modify the sequence records of
            each compatible object to reflect its `RenderTask` settings.

            @method _applyRenderTasks
            @param groupBuffer {Kiwi.GameObjects.GroupBuffer} GroupBuffer which
                defines task
            @private
            **/

            var eTask, i,
                task = groupBuffer.renderTask;

            if ( task ) {
                for ( i = this._sequence.length - 1; i >= 0; i-- ) {
                    if ( this._sequence[ i ].entity.renderTasks &&
                            this._sequence[ i ].entity.renderTasks[ task ] ) {
                        eTask = this._sequence[ i ].entity.renderTasks[ task ];
                        this._sequence[ i ].renderer = eTask.renderer;
                        this._sequence[ i ].shader = eTask.renderer.shaderPair;
                        this._sequence[ i ].isBatchRenderer =
                            eTask.renderer.isBatchRenderer;
                        this._sequence[ i ].texture = eTask.atlas;

                        // Apply and cache alpha
                        this._sequence[ i ].alphaOriginal =
                            this._sequence[ i ].entity.alpha;
                        this._sequence[ i ].entity.alpha =
                            this._sequence[ i ].entity.renderTasks[ task ]
                                .alpha;
                    } else {
                        this._sequence.splice( i, 1 );
                    }
                }
            }
        }

        private _ceaseRenderTasks (
            groupBuffer: Kiwi.GameObjects.GroupBuffer ) {
            /**
            Modify members of a render sequence to remove data
            specific to a completed render pass.
            This entails removing some alpha data.

            @method _ceaseRenderTasks
            @param groupBuffer {Kiwi.GameObjects.GroupBuffer} GroupBuffer
                which defines task
            @private
            **/

            var i;

            if ( groupBuffer.renderTask ) {
                for ( i = 0; i < this._sequence.length; i++ ) {
                    this._sequence[ i ].entity.alpha =
                        this._sequence[ i ].alphaOriginal;
                }
            }
        }

        renderBuffer ( groupBuffer: Kiwi.GameObjects.GroupBuffer ) {
            /**
            Render to the specified `GroupBuffer`.
            @method renderBuffer
            @param groupBuffer {Kiwi.GameObjects.GroupBuffer} GroupBuffer
                to render
            **/

            var i, ignorance,
                ct = groupBuffer.camera.transform;

            if ( groupBuffer.clearOnRender ) {
                groupBuffer.clear( false );
            }

            // Check whether render should continue.
            // GroupBuffers are permitted to have children without members.
            if ( !groupBuffer.target ||
                    ( groupBuffer.target.members &&
                        !groupBuffer.target.members.length ) ) {
                return;
            }

            // Set stage resolution from target buffer.
            this._stageResolution[ 0 ] = groupBuffer.width;
            this._stageResolution[ 1 ] = groupBuffer.height;

            // Reset current renderer.
            // This prevents runtime created shaders from being uploaded
            // and the render manager failing to notice, causing crashes.
            this.currentRenderer = null;

            // Do camera work.

            // Compose a new scratch matrix configuration.
            // We need data from a zero-translated matrix,
            // and if we did it to the concatenated matrix of the camera,
            // we'd dirty it and never get the efficiency gains
            // of the cached concat.
            this._m.setFromOffsetTransform(
                0, 0, ct.scaleX, -ct.scaleY, -ct.rotation,
                ct.anchorPointX, ct.anchorPointY );
            this._m.append(
                1, 0, 0, 1, ct.x - ct.anchorPointX, ct.y - ct.anchorPointY );

            // GroupBuffers which render their own children
            // must apply an inverse transform
            // to the camera, otherwise children will inherit parent transforms
            // and slide around as the object transforms
            if ( groupBuffer.target === groupBuffer ) {
                ignorance = groupBuffer.transform.ignoreChild;
                groupBuffer.transform.ignoreChild = true;
            }

            // Create camera matrix.
            this.camMatrix[ 0 ] = this._m.a;
            this.camMatrix[ 1 ] = this._m.b;
            this.camMatrix[ 3 ] = this._m.c;
            this.camMatrix[ 4 ] = this._m.d;
            this.camMatrix[ 6 ] = this._m.tx;
            this.camMatrix[ 7 ] = this._m.ty;

            // Mandate blend mode in CocoonJS.
            // This must be called per-frame, because CocoonJS seems to
            // interfere with blend modes on a per-frame basis.
            if ( this.game.deviceTargetOption === Kiwi.TARGET_COCOON ) {
                this.switchBlendMode(
                    this.gl, this.renderer.currentBlendMode );
            }

            // Substitute for `collateRenderSequence`
            // to collect correct subgraph.
            this._sequence = [];
            if ( groupBuffer.target === groupBuffer ) {

                // When a `GroupBuffer` is targeting its own children,
                // it behaves as a `Group` and collates those children.
                for ( i = 0; i < groupBuffer.members.length; i++ ) {
                    this.collateChild( groupBuffer.members[ i ] );
                }
            } else {

                // `GroupBuffer` sees other `GroupBuffer` objects as
                // `StaticImage` and does not collate their children.
                this.collateChild( groupBuffer.target );
            }

            // Apply render tasks.
            this._applyRenderTasks( groupBuffer );

            // Form render batches.
            this.collateBatches();

            // Render buffer.
            this.renderBatches( this.gl, groupBuffer.camera );

            // Reset values
            if ( ignorance ) {
                groupBuffer.transform.ignoreChild = ignorance;
            }
            this._ceaseRenderTasks( groupBuffer );
        }

    }
}
