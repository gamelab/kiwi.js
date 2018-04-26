/**
@module Kiwi
@submodule Buffers
**/

module Kiwi.Buffers {
    export class Buffer
    extends Kiwi.Entity
    implements Kiwi.GameObjects.StaticImage {
        /**
        Frame buffer entity. A GameObject that contains a render target.

        Buffers are created and rendered by a `Bufferer` object.
        Do not create them as stand-alones.

        This is the base class for other buffer types.
        It doesn't do anything by itself.

        CocoonJS is not capable of using the `baseImage` parameter.
        All other clients support it. When using CocoonJS,
        consider using `drawCut` on a temporary game object instead.

        @class Buffer
        @extends Kiwi.Entity
        **/

        constructor ( params: any ) {
            /**
            @constructor
            @param params {object} Composite parameter object
                @param [params.alpha=1] {number} Opacity, 0-1
                @param [params.anchorPointX] {number} Horizontal anchor point
                @param [params.anchorPointY] {number} Vertical anchor point
                @param [params.baseImage] {Image} Initial buffer contents
                @param params.bufferer {Bufferer} Buffer manager object
                @param [params.clearColor] {Kiwi.Utils.Color} Color to which to clear.
                    Defaults to rgba( 0, 0, 0, 0 ).
                @param [params.clearOnRender=true] {boolean} Whether the Buffer will
                    clear itself when rendered
                @param [params.gl] {WebGLRenderingContext} Context for draw operations.
                    This should generally be left as default.
                @param [params.height] {number} Vertical dimension of buffer;
                    defaults to stage
                @param [params.name] {string} Name for Buffer
                @param [params.preserve] {string} Name of texture to export on destroy
                @param [params.redraw=true] {boolean} Whether to redraw the buffer
                    every frame
                @param [params.rotation=0] {number} Initial rotation in radians
                @param [params.scale=1] {number} Initial scale. Is overridden
                    by `scaleX` and `scaleY`.
                @param [params.scaleX=1] {number} Initial horizontal scale
                @param [params.scaleY=1] {number} Initial vertical scale
                @param params.state {Kiwi.State} Current game state
                @param [params.visible=true] {boolean} Initial visibility status
                @param [params.width] {number} Horizontal dimension of buffer;
                    defaults to stage
                @param [params.x=0] {number} Horizontal position
                @param [params.y=0] {number} Vertical position
            **/

            // Parse params
            if ( isNaN( params.width ) ) {
                params.width = params.state.game.stage.width;
            }
            if ( isNaN( params.height ) ) {
                params.height = params.state.game.stage.height;
            }
            params.width = Math.round( params.width );
            params.height = Math.round( params.height );
            if ( isNaN( params.x ) ) {
                params.x = 0;
            }
            if ( isNaN( params.y ) ) {
                params.y = 0;
            }
            if ( isNaN( params.scale ) ) {
                params.scale = 1;
            }

            // Compatible elements of super, part 1
            super( params.state, params.x, params.y );

            // Buffer specific params
            this.bufferer = params.bufferer;
            this.clearColor = params.clearColor ||
                new Kiwi.Utils.Color( 0, 0, 0, 0 );
            this.clearOnRender = params.clearOnRender === false ? false : true;
            this.name = params.name || "UnnamedBuffer";
            this.preserve = params.preserve;
            this.redraw = params.redraw === false ? false : true;

            // Renderer-specific atlas and buffer creation
            if ( this.game.renderOption === Kiwi.RENDERER_WEBGL ) {
                this._setupGl( params );
            } else if ( this.game.renderOption === Kiwi.RENDERER_CANVAS ) {
                this._setupCanvas( params );
            }

            // Compatible elements of super, part 2 (require an atlas)
            this.cellIndex = 0;
            this.width = params.width;
            this.height = params.height;
            this.transform.anchorPointX = this.width / 2;
            this.transform.anchorPointY = this.height / 2;
            this.box = this.components.add(
                new Kiwi.Components.Box(
                    this, this.x, this.y, this.width, this.height ) );

            // Complete default transform properties
            this.alpha = isNaN( params.alpha ) ?
                1 :
                params.alpha;
            this.anchorPointX = isNaN( params.anchorPointX ) ?
                this.anchorPointX :
                params.anchorPointX;
            this.anchorPointY = isNaN( params.anchorPointY ) ?
                this.anchorPointY :
                params.anchorPointY;
            this.rotation = isNaN( params.rotation ) ?
                0 :
                params.rotation;
            this.scale = params.scale;
            this.scaleX = isNaN( params.scaleX ) ?
                params.scale :
                params.scaleX;
            this.scaleY = isNaN( params.scaleY ) ?
                params.scale :
                params.scaleY;
            this.visible = params.visible === false ?
                false :
                true;

            this.addTag( "Kiwi.Buffers.Buffer" );
        }

        /**
        Texture atlas that handles buffers.
        Ensure that WebGL uses `Kiwi.Buffers.BufferAtlas`.

        @property atlas
        @type Kiwi.Textures.TextureAtlas
        **/
        atlas: Kiwi.Textures.TextureAtlas;

        /** 
        Bounding box
        @property box
        @type Kiwi.Components.Box
        **/
        box: Kiwi.Components.Box;

        /**
        Buffer manager
        @property bufferer
        @type Kiwi.Buffers.Bufferer
        **/
        bufferer: Kiwi.Buffers.Bufferer;

        /**
        Buffer canvas
        @property _canvas
        @type HTMLCanvasElement
        @protected
        **/
        protected _canvas: HTMLCanvasElement;

        /**
        Buffer draw context
        @property _ctx
        @type CanvasRenderingContext2D
        @protected
        **/
        protected _ctx: CanvasRenderingContext2D;

        /**
        Color to which the buffer will clear before drawing
        @property clearColor
        @type Kiwi.Utils.Color
        **/
        clearColor: Kiwi.Utils.Color;

        /**
        Whether to clear the Buffer before rendering.
        Set this to `false` for accumulative effects.
        @property clearOnRender
        @type boolean
        @default true
        **/
        clearOnRender: boolean;

        /**
        Framebuffer object. WebGL only.
        @property _framebuffer
        @type WebGLFramebuffer
        @protected
        **/
        protected _framebuffer: WebGLFramebuffer;

        /**
        Context for draw operations. WebGL only.
        @property gl
        @type WebGLRenderingContext
        @default this.game.stage.gl
        **/
        gl: WebGLRenderingContext;

        /**
        WebGL rendering system
        @property glRenderer
        @type Kiwi.Renderers.Renderer
        **/
        glRenderer: Kiwi.Renderers.Renderer;

        /**
        Identifies this as being a buffer.
        @property isBuffer
        @type boolean
        @default true
        @static
        **/
        static isBuffer: boolean = true;

        /**
        Name of this `Buffer`
        @property name
        @type string
        @default "UnnamedBuffer"
        **/
        name: string;

        /**
        Name of texture to export on destroy.
        If `undefined`, no texture will be exported.

        This export may be triggered at any time.
        The buffer texture may be accessed without exporting, via its `atlas`.

        @property preserve
        @type string
        @default undefined
        **/
        preserve: string;

        /**
        Whether to redraw this buffer every frame
        @property redraw
        @type boolean
        @default true
        **/
        redraw: boolean;
        /**
        Texture of the buffer. WebGL only.
        @property _texture
        @type WebGLTexture
        @protected
        **/
        protected _texture: WebGLTexture;

        clear ( bind: boolean = true ) {
            /**
            Clear the contents of this buffer. This function is an automatic
            alias of either `_clearCanvas` or `_clearGl`.

            Note that this method assumes it is not being called
            during a render sequence. Most user interaction will come during
            the `update()` period instead. As such, the WebGL version
            automatically binds the buffer before clearing,
            then binds back to the main screen.
            To disable this binding and just clear the current buffer,
            whatever that may be, specify the parameter `false`.

            @method clear
            @param [bind=true] {boolean} Whether to bind the WebGL context
            **/
        }

        protected _clearCanvas () {
            /**
            Clear the contents of this buffer using Canvas methods.
            @method _clearCanvas
            @protected
            **/

            this._ctx.clearRect( 0, 0, this.width, this.height );

            if ( this.clearColor.a > 0 ) {
                this._ctx.save();
                this._ctx.fillStyle = "rgba(" +
                    this.clearColor.r255 + "," +
                    this.clearColor.g255 + "," +
                    this.clearColor.b255 + "," +
                    this.clearColor.a + ")";
                this._ctx.fillRect( 0, 0, this.width, this.height );
                this._ctx.restore();
            }
        }

        protected _clearGl ( bind: boolean = true ) {
            /**
            Clear the contents of this buffer using WebGL methods.
            @method _clearGl
            @param [bind=true] {boolean} Whether to bind the context
                during the operation. If this is `true`, the method will bind
                the framebuffer to `null` (the main screen) when complete.
                If `false`, the method will clear the current framebuffer,
                so be sure you know what you're doing.
            @protected
            **/

            if ( bind ) {
                this.gl.bindFramebuffer(
                    this.gl.FRAMEBUFFER, this._framebuffer );
            }

            this.gl.clearColor(
                this.clearColor.r,
                this.clearColor.g,
                this.clearColor.b,
                this.clearColor.a );
            this.gl.clear( this.gl.COLOR_BUFFER_BIT );

            if ( bind ) {
                this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
            }
        }

        destroy () {
            /**
            Destroy this entity and its components.
            Extends standard `Entity` behavior.
            Also erases the associated buffer.

            If the `preserve` property is set,
            exports the texture to the global filestore.

            Do not call this method if the buffer is part of the scene graph.
            Use `exists = false` to ensure the entity is removed
            at the appropriate point during the game loop.

            You should only use `destroy`
            if the buffer is not part of the scene graph,
            and so will not be destroyed by the game loop.

            @method destroy
            **/

            this.bufferer.removeBuffer( this );

            if ( this.preserve ) {
                this.exportImage( this.preserve );
            }

            if ( this.gl ) {
                this.gl.deleteTexture( this._texture );
                this.gl.deleteFramebuffer( this._framebuffer );
            }

            Kiwi.Entity.prototype.destroy.call( this, true );
        }

        draw () {
            /**
            Render the targets of this buffer.

            This method is set to be an alias of the appropriate
            `_drawCanvas` or `_drawGl` methods during construction.

            @method draw
            **/
        }

        protected _drawCanvas () {
            /**
            Render the targets of this buffer using Canvas.

            Override this method.

            @method _drawCanvas
            @protected
            **/
        }

        protected _drawCanvasImmediate () {
            /**
            Render the targets of this buffer using Canvas.

            This immediate version is for use with out-of-order rendering;
            for example, rendering a buffered texture only on rare game events,
            and not as part of the usual render sequence.

            You should use `drawImmediate` for better compatibility.

            @method _drawCanvasImmediate
            @protected
            **/

            this._drawCanvas();
        }

        protected _drawGl () {
            /**
            Render the targets of this buffer using WebGL.

            Override this method.

            @method _drawGl
            @protected
            **/
        }

        protected _drawGlImmediate () {
            /**
            Render the targets of this buffer using WebGL.

            This immediate version is for use with out-of-order rendering;
            for example, rendering a buffered texture only on rare game events,
            and not as part of the usual render sequence.
            It will change WebGL state and attempt to clean up after itself.

            You should use `drawImmediate` for better compatibility.

            @method _drawGlImmediate
            @protected
            **/

            this._drawGl();
            this.bufferer.restoreGl();
        }

        drawImmediate () {
            /**
            Render the targets of this buffer immediately.

            This immediate version is for use with out-of-order rendering;
            for example, rendering a buffered texture only on rare game events,
            and not as part of the usual render sequence.

            This method is set to be an alias of the appropriate
            `_drawCanvasImmediate` or `_drawGlImmediate` method
            during construction. This method should be used by preference.

            Note that this does not redraw member buffers.
            If your buffer contains other buffers that must redraw,
            consider using `bufferer.render( this )`.

            @method drawImmediate
            **/
        }

        exportImage ( key: string ) {
            /**
            Export the current state of the buffer to a global texture file
            as a `SingleImage` with the supplied key parameter.
            An associated atlas will be added to the state texture library.

            The texture file will be stored as a canvas element.

            WebGL note: This will unbind any currently-bound framebuffer.

            @method exportImage
            @param key {string} Key for new texture file
            **/

            var atlas, canvas, ctx, data, i, pixels,
                file = new Kiwi.Files.TextureFile( this.game, {
                    key: key,
                    url: key + " buffer data",
                    type: Kiwi.Files.File.IMAGE,
                    filestore: this.game.fileStore,
                    timeout: null
                } );

            // Create canvas
            canvas = document.createElement( "canvas" );
            canvas.width = this.width;
            canvas.height = this.height;
            ctx = canvas.getContext( "2d" );

            if ( this.gl ) {
                // Extract WebGL textures
                pixels = new Uint8Array( this.width * this.height * 4 );
                this.gl.bindFramebuffer(
                    this.gl.FRAMEBUFFER, this._framebuffer );
                this.gl.readPixels(
                    0, 0,
                    this.width, this.height,
                    this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels );
                this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

                // Generate image data
                data = ctx.createImageData( this.width, this.height );
                for ( i = 0; i < data.data.length; i++ ) {
                    data.data[ i ] = pixels[ i ];
                }

                // Draw to canvas
                ctx.putImageData( data, 0, 0 );
            } else {

                // Extract from Canvas
                ctx.drawImage(
                    this._canvas, 0, 0, canvas.width, canvas.height );
            }

            // Set manual success
            file.data = canvas;
            file.success = true;
            file.hasError = false;
            this.game.fileStore.addFile( key, file );
            atlas = new Kiwi.Textures.SingleImage( key, canvas );
            this.state.textureLibrary.add( atlas );
        }

        exportSpritesheet ( key: string, model: Kiwi.Textures.SpriteSheet ) {
            /**
            Export the current state of the buffer to a global texture file
            as a `SpriteSheet` with the supplied key parameter
            and the model's sprite properties.
            An associated atlas will be added to the state texture library.

            The texture file will be stored as a canvas element.

            WebGL note: This will unbind any currently-bound framebuffer.

            @method exportSpritesheet
            @param key {string} Key for new texture file
            @param model {Kiwi.Textures.SpriteSheet} Sprite sheet from which
                to copy properties
            **/

            var atlas, canvas, ctx, data, i, pixels,
                file = new Kiwi.Files.TextureFile( this.game, {
                    key: key,
                    url: key + " buffer data",
                    type: Kiwi.Files.File.IMAGE,
                    filestore: this.game.fileStore,
                    timeout: null
                } );

            // Create canvas
            canvas = document.createElement( "canvas" );
            canvas.width = this.width;
            canvas.height = this.height;
            ctx = canvas.getContext( "2d" );

            if ( this.gl ) {
                // Extract WebGL textures
                pixels = new Uint8Array( this.width * this.height * 4 );
                this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this._framebuffer );
                this.gl.readPixels(
                    0, 0,
                    this.width, this.height,
                    this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels );
                this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

                // Generate image data
                data = ctx.createImageData( this.width, this.height );
                for ( i = 0; i < data.data.length; i++ ) {
                    data.data[ i ] = pixels[ i ];
                }

                // Draw to canvas
                ctx.putImageData( data, 0, 0 );
            } else {
                // Extract from Canvas
                ctx.drawImage(
                    this._canvas, 0, 0, canvas.width, canvas.height );
            }

            // Set manual success
            file.data = canvas;
            file.success = true;
            file.hasError = false;
            this.game.fileStore.addFile( key, file );
            atlas = new Kiwi.Textures.SpriteSheet(
                key, canvas, model.cellWidth, model.cellHeight, model.numCells,
                model.rows, model.cols, model.sheetOffsetX, model.sheetOffsetY,
                model.cellOffsetX, model.cellOffsetY );
            this.state.textureLibrary.add( atlas );
        }

        objType (): string {
            /**
            Return the type of object that this is.

            @method objType
            @return {string} "Buffer"
            **/

            return "Buffer";
        }

        render ( camera: Kiwi.Camera ) {
            /**
            Implements `Kiwi.GameObjects.StaticImage` `render` method.
            @method render
            @param camera {Kiwi.Camera}
            **/

            Kiwi.GameObjects.StaticImage.prototype.render.call( this, camera );
        }

        renderGL (
            gl: WebGLRenderingContext,
            camera: Kiwi.Camera,
            params: any = null ) {
            /**
            Implements `Kiwi.GameObjects.StaticImage` `renderGL` method.
            @method renderGL
            @param gl {WebGLRenderingContext}
            @param camera {Kiwi.Gamera}
            @param [params] {object}
            **/

            Kiwi.GameObjects.StaticImage.prototype.renderGL.call(
                this, gl, camera, params );
        }

        protected _setupCanvas ( params: any ) {
            /**
            Run setup protocols unique to the Canvas environment.
            @method _setupCanvas
            @param params {object} Composite parameter object from constructor
            @protected
            **/

            // Set override functions
            this.clear = this._clearCanvas;
            this.draw = this._drawCanvas;
            this.drawImmediate = this._drawCanvasImmediate;

            this._setupCanvasBuffer( params );

            this.atlas = new Kiwi.Textures.SingleImage(
                this.name + "Atlas",
                this._canvas,
                params.width,
                params.height );
            this.state.textureLibrary.textures[ this.atlas.name ] = this.atlas;
        }

        protected _setupCanvasBuffer ( params: any ) {
            /**
            Create render buffer.

            @method _setupCanvasBuffer
            @param params {object} Composite parameter object from constructor
            @protected
            **/

            this._canvas = document.createElement( "canvas" );
            this._canvas.width = params.width;
            this._canvas.height = params.height;

            this._ctx = this._canvas.getContext( "2d" );

            if ( params.baseImage ) {
                this._ctx.drawImage( params.baseImage, 0, 0 );
            }
        }

        protected _setupGl ( params: any ) {
            /**
            Run setup protocols unique to the WebGL environment.
            @method _setupGl
            @param params {object} Composite parameter object from constructor
            @protected
            **/

            // Set override functions
            this.clear = this._clearGl;
            this.draw = this._drawGl;
            this.drawImmediate = this._drawGlImmediate;

            this.glRenderer = this.game.renderer.requestSharedRenderer(
                "TextureAtlasRenderer" );

            // Parse params
            if (
                !params.gl ||
                !( params.gl instanceof WebGLRenderingContext ) ) {

                params.gl = params.state.game.stage.gl;
            }

            this.gl = params.gl;

            this._setupGlBuffer( params );

            this.atlas = new Kiwi.Buffers.BufferAtlas( {
                name: this.name + "Atlas",
                cells: [ { x: 0, y: 0, w: params.width, h: params.height } ],
                type: Kiwi.Textures.TextureAtlas.SINGLE_IMAGE,
                texture: this._texture,
                width: params.width,
                height: params.height
            } );

            // Register atlas in the state library.
            // The basic method tries to resize NPOT images, which won't work.
            // So we recreate some functionality here.
            this.state.textureLibrary.textures[ this.atlas.name ] = this.atlas;
            ( <Kiwi.Renderers.GLRenderManager>this.game.renderer )
            .addTexture( this.game.stage.gl, this.atlas );
        }

        protected _setupGlBuffer ( params: any ) {
            /**
            Create framebuffer and associated texture.
            @method _setupGlBuffer
            @param params {object} Composite parameter object from constructor
            @protected
            **/

            var ctx, pixels,
                bufferWidth = params.width,
                bufferHeight = params.height;

            if ( params.baseImage && params.baseImage.getContext ) {
                ctx = params.baseImage.getContext( "2d" );
                pixels = new Uint8Array(
                    ctx.getImageData( 0, 0, bufferWidth, bufferHeight ).data );
            } else {
                pixels = new Uint8Array( bufferWidth * bufferHeight * 4 );
            }

            this._texture = this.gl.createTexture();
            this.gl.bindTexture( this.gl.TEXTURE_2D, this._texture );
            this.gl.texImage2D(
                this.gl.TEXTURE_2D, 0, this.gl.RGBA,
                bufferWidth, bufferHeight,
                0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
                pixels );

            // Configure texture
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.gl.CLAMP_TO_EDGE );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.gl.CLAMP_TO_EDGE );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MIN_FILTER,
                this.gl.LINEAR );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MAG_FILTER,
                this.gl.LINEAR );

            this._framebuffer = this.gl.createFramebuffer();
            this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this._framebuffer );
            this.gl.framebufferTexture2D(
                this.gl.FRAMEBUFFER,
                this.gl.COLOR_ATTACHMENT0,
                this.gl.TEXTURE_2D,
                this._texture, 0 );

            // Set framebuffer back to default
            this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );
        }

    }
}
