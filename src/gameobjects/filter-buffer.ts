/**
@module Kiwi
@submodule GameObjects
**/

module Kiwi.GameObjects {
    export class FilterBuffer extends Kiwi.Buffers.Buffer {
        constructor ( params: any ) {
            /**
            Buffer that draws a texture.
            The `FilterBuffer` takes a single input texture,
            applies a number of filter effects, and outputs it into the buffer.

            The `FilterBuffer` functions as a `StaticImage`.
            It does not have children.

            All standard Buffer options are available.

            You should create `FilterBuffer` objects
            using the `createFilterBuffer` method of a `Bufferer` object.

            Note: the FilterBuffer is generated to process one specific image.
            While you may change that image, the dimensions of the buffer
            will not change.

            @class FilterBuffer
            @constructor
            @extends Kiwi.Buffers.Buffer
            @param params {object} Composite parameter object
                @param params.atlasInput {Kiwi.Textures.TextureAtlas} Texture
                    to filter
                @param params.bufferer {Kiwi.Buffers.Bufferer} Buffer
                    manager object.
                    You should not create `FilterBuffer` objects on their own;
                    use a manager to ensure they are properly registered.
                    The manager will auto-complete this parameter.
                @param params.state {Kiwi.State} Current game state
            **/

            super( Kiwi.GameObjects.FilterBuffer.processParams( params ) );

            var x, y;

            this.atlasInput = params.atlasInput;

            this._setupSecondBuffer( params );

            if ( this.gl ) {
                x = 1;
                y = 1;
                if ( this.atlasInput.image ) {
                    if ( this.atlasInput.image.width !== this.width ) {
                        x = this.width / this.atlasInput.image.width;
                    }
                    if ( this.atlasInput.image.height !== this.height ) {
                        y = this.height / this.atlasInput.image.height;
                    }
                }
                this.corners = [
                    0, 0, 0, 0,
                    1, 0, x, 0,
                    1, 1, x, y,
                    0, 1, 0, y
                ];
            }

            this.filters = [];
        }

        static processParams ( params: any ): any {
            /**
            Process params for `super` invocation.
            @method processParams
            @param params {object} Composite parameter object
            @return {object} Modified parameters
            @static
            **/

            var atlas = params.atlasInput;

            // Determine width and height
            if ( isNaN( params.width ) ) {
                if ( atlas.width ) {
                    params.width = atlas.width;
                } else if ( atlas.cellWidth && atlas.cols ) {
                    params.width = atlas.cellWidth * atlas.cols;
                }
            }
            if ( isNaN( params.height ) ) {
                if ( atlas.height ) {
                    params.height = atlas.height;
                } else if ( atlas.cellHeight && atlas.rows ) {
                    params.height = atlas.cellHeight * atlas.rows;
                }
            }

            return params;
        }

        /**
        Texture atlas from which the filtered texture is derived.

        You should only update this to a texture with the same dimensions.
        The filterBuffer properties are set to use this texture upon creation.

        @property atlasInput
        @type Kiwi.Textures.TextureAtlas
        **/
        atlasInput: Kiwi.Textures.TextureAtlas;

        /**
        Atlas used to refer to the input buffer
        @property atlasSource
        @type Kiwi.Textures.TextureAtlas
        **/
        atlasSource: Kiwi.Textures.TextureAtlas;

        /**
        Buffer into which the filter is output. Note that this may change
        to reflect different internal frame buffers as the FilterBuffer
        processes images. This access is read-only.

        @property bufferOut
        @type WebGLFramebuffer
        **/
        get bufferOut (): WebGLFramebuffer {
            return this._framebuffer2;
        }

        /**
        Second canvas, used for redrawing the input image in canvas mode.

        This is swapped with `_canvas` every time a filter pingpongs.
        It is not a constant address.

        @property _canvas2
        @type HTMLCanvasElement
        @private
        **/
        private _canvas2: HTMLCanvasElement;

        /**
        Input canvas used for the base image.
        This is a READ-ONLY property.

        Note that the FilterBuffer exchanges internal canvas references
        as it works. This is not a constant address.

        @property canvasInput
        @type HTMLCanvasElement
        **/
        get canvasInput (): HTMLCanvasElement {
            return this._canvas;
        }

        /**
        Second canvas, used for redrawing the input image in canvas mode.
        This is a READ-ONLY property.

        Note that the FilterBuffer exchanges internal canvas references
        as it works. This is not a constant address.

        @property canvasOutput
        @type HTMLCanvasElement
        **/
        get canvasOutput (): HTMLCanvasElement {
            return this._canvas2;
        }

        /**
        Corners of the input texture, in normalized coordinates.

        These must be computed per-filterBuffer,
        because the 0-1 normalized UV range doesn't work for textures
        which were resized from NPOT to POT.

        @property corners
        @type array
        **/
        corners: Array<number>;

        /**
        Second rendering context in canvas mode.

        This is swapped with `_ctx` every time a filter pingpongs.
        It is not a constant address.

        @property _ctx2
        @type CanvasRenderingContext2D
        @private
        **/
        private _ctx2: CanvasRenderingContext2D;

        /**
        Input rendering context in canvas mode. READ-ONLY access.

        This is swapped with `_ctx2` every time a filter pingpongs.
        It is not a constant address.

        @property ctxInput
        @type CanvasRenderingContext2D
        **/
        get ctxInput (): CanvasRenderingContext2D {
            return this._ctx;
        }

        /**
        Output rendering context in canvas mode. READ-ONLY access.

        This is swapped with `_ctx` every time a filter pingpongs.
        It is not a constant address.

        @property ctxOutput
        @type CanvasRenderingContext2D
        **/
        get ctxOutput (): CanvasRenderingContext2D {
            return this._ctx2;
        }

        /**
        List of all filters to be applied
        @property filters
        @type array
        @default []
        **/
        filters: Array<any>;

        /**
        Second framebuffer, used for redrawing the input image in WebGL mode.

        This is swapped with `_framebuffer` every time a filter pingpongs.
        It is not a constant address.

        @property _framebuffer2
        @type WebGLFramebuffer
        @private
        **/
        private _framebuffer2: WebGLFramebuffer;

        /**
        WebGL texture. READ-ONLY.
        @property texture
        @type WebGLTexture
        **/
        get texture (): WebGLTexture {
            return this._texture;
        }

        /**
        Second texture, used for redrawing the input image in WebGL mode.

        This is swapped with `_texture` every time a filter pingpongs.
        It is not a constant address.

        The output texture atlas of a `FilterBuffer` uses
        the texture in this property.

        @property _texture2
        @type WebGLTexture
        @private
        **/
        private _texture2: WebGLTexture;

        addFilter ( key: string, params: any ): any {
            /**
            Add a new filter to the `FilterBuffer`.
            The new filter will be positioned at
            the end of the `filters` queue.

            Filters are identified by key in
            `Kiwi.Shaders.Filters.FiltersGl` and
            `Kiwi.Shaders.Filters.FilterShaders`,
            in order. The key is the `name` property of the filter or shader.
            If no key can be found,
            this function issues a warning and returns null.

            If a filter requires params, they may be specified.
            Most filters do not.
            This function will automatically add
            `gl` and `shaderManager` params.

            Some filters are defined only as shaders.
            These will automatically be assigned to a `FilterGl` object,
            which will be named by the shader.
            A shader-only filter is assumed to be `FilterGl` compatible,
            with a single input texture.

            @method addFilter
            @param key {string} Name of filter to add
            @param [params] {object} Composite parameter object for filter
            @return {Kiwi.Shaders.ShaderPair} Filter created
            **/

            var filter = null;

            if ( !params ) {
                params = {};
            }

            params.filterBuffer = this;

            /*
            if ( this.gl ) {
                params.gl = this.gl;
                params.shaderManager =
                    ( <Kiwi.Renderers.GLRenderManager>this.game.renderer )
                    .shaderManager;
                if ( Kiwi.Shaders.Filters.FiltersGl[ key ] ) {
                    filter =
                        new Kiwi.Shaders.Filters.FiltersGl[ key ]( params );
                    this.filters.push( filter );
                } else if ( Kiwi.Shaders.Filters.FilterShaders[ key ] ) {
                    params.shaderName =
                        Kiwi.Shaders.Filters.FilterShaders[ key ];
                    params.name =
                        Kiwi.Shaders[ params.shaderName ].prototype.name;
                    filter = new Kiwi.Renderers.FilterGl( params );
                    this.filters.push( filter );
                }
            } else {
                if ( Kiwi.Shaders.Filters.FiltersCanvas[ key ] ) {
                    filter = new Kiwi.Renderers.FiltersCanvas[ key ]( params );
                    this.filters.push( filter );
                }
            }
            */

            if ( this.gl ) {
                params.gl = this.gl;
                params.shaderManager =
                    ( <Kiwi.Renderers.GLRenderManager> this.game.renderer )
                    .shaderManager;
                if ( Kiwi.Renderers[ key ] ) {
                    // This is a renderer/shader pair.
                    filter = new Kiwi.Renderers[ key ]( params );
                    this.filters.push( filter );
                } else if ( Kiwi.Shaders[ key ] ) {
                    // This is a solo shader. Assign a default renderer.
                    params.shaderName = key;
                    params.name = Kiwi.Shaders[ key ].prototype.name;
                    filter = new Kiwi.Renderers.FilterGl( params );
                    this.filters.push( filter );
                }
            } else {
                if ( Kiwi.Shaders[ key ] ) {
                    filter = new Kiwi.Shaders[ key ]( params );
                    this.filters.push( filter );
                }
            }

            if ( !filter ) {
                Kiwi.Log.warn( "#buffers", "Could not find filter", key );
            }

            return filter;
        }

        private _clearCanvas2 = function() {
            /**
            Clear the contents of this buffer using Canvas methods.

            This modified version targets `_canvas2`, the visible buffer.

            @method _clearCanvas
            @private
            **/

            this._ctx2.clearRect( 0, 0, this.width, this.height );

            if ( this.clearColor.a > 0 ) {
                this._ctx2.save();
                this._ctx2.fillStyle = "rgba(" +
                    this.clearColor.r255 + "," +
                    this.clearColor.g255 + "," +
                    this.clearColor.b255 + "," +
                    this.clearColor.a + ")";
                this._ctx2.fillRect( 0, 0, this.width, this.height );
                this._ctx2.restore();
            }
        }

        destroy () {
            /**
            Extend destroy behavior to deal with back buffer.
            @method destroy
            **/

            // Put second buffer in first place, whence export begins.
            this.pingpong();

            super.destroy();

            // Delete second buffer as well
            if ( this.gl ) {
                this.gl.deleteTexture( this._texture2 );
                this.gl.deleteFramebuffer( this._framebuffer2 );
            }
        }

        protected _drawCanvas () {
            /**
            Custom canvas draw behavior.
            @method _drawCanvas
            @protected
            **/

            var i;

            this.clear();

            // Render base image
            this._ctx2.drawImage(
                this.atlasInput.image,
                0, 0,
                this.atlasInput.image.width, this.atlasInput.image.height,
                0, 0,
                this.width, this.height );

            // Render filters
            // Do not pingpong, because canvases can self-modify.
            // If pingpong is necessary, implement it in the filter.
            for ( i = 0; i < this.filters.length; i++ ) {
                if ( this.filters[ i ].active ) {
                    this.filters[ i ].render( this );
                }
            }
        }

        protected _drawGl () {
            /**
            Custom WebGL draw behavior.
            @method _drawGl
            @protected
            **/

            this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this.bufferOut );
            this.gl.viewport( 0, 0, this.width, this.height );
            this.bufferer.filterBufferGlRenderManager.renderBuffer( this );
        }

        exportImage ( key: string ) {
            /**
            Export the current state of the buffer to a global texture file
            as a `SingleImage` with the supplied key parameter.
            An associated atlas will be added to the state texture library.

            The texture file will be stored as a canvas element.

            WebGL note: This will unbind any currently-bound framebuffer.

            This method is extended for `FilterBuffer`.
            It will pingpong before export.

            @method exportImage
            @param key {string} Key for new texture file
            **/

            this.pingpong();

            super.exportImage( key );
        }

        exportSpritesheet ( key: string, model: Kiwi.Textures.SpriteSheet ) {
            /**
            Export the current state of the buffer to a global texture file
            as a `SpriteSheet` with the supplied key parameter
            and the model's sprite properties.
            An associated atlas will be added to the state texture library.

            The texture file will be stored as a canvas element.

            WebGL note: This will unbind any currently-bound framebuffer.

            This method is extended for `FilterBuffer`.
            It will pingpong before export.

            @method exportSpritesheet
            @param key {string} Key for new texture file
            @param model {Kiwi.Textures.SpriteSheet} Sprite sheet
                from which to copy properties
            **/

            this.pingpong();

            super.exportSpritesheet( key, model );
        }

        getFilter ( name: string ): any {
            /**
            Return the specified filter, if it exists on this `FilterBuffer`.

            @method getFilter
            @param name {string} Name of the filter to seek
            @return {object} Filter with the specified name, or `null`.
            **/

            var i;

            for ( i = 0; i < this.filters.length; i++ ) {
                if ( this.filters[ i ].name === name ) {
                    return this.filters[ i ];
                }
            }

            return null;
        }

        pingpong () {
            /**
            Swap buffers. Note that this will not swap the buffer
            on the texture atlas. Used during filter rendering.
            It should not be necessary to call this.

            If you are writing your own `FilterCanvas` extensions, you may wish
            to use `pingpong()`. Canvas filters do not automatically pingpong,
            but it may sometimes be useful to have the second buffer available
            to draw or process.

            @method pingpong
            **/

            var swap;

            if ( this.gl ) {
                swap = this._framebuffer2;
                this._framebuffer2 = this._framebuffer;
                this._framebuffer = swap;

                swap = this._texture2;
                this._texture2 = this._texture;
                this._texture = swap;
            } else {
                swap = this._canvas2;
                this._canvas2 = this._canvas;
                this._canvas = swap;

                swap = this._ctx2;
                this._ctx2 = this._ctx;
                this._ctx = swap;
            }

            this.updateTextureAtlas();
        }

        private _setupSecondBuffer ( params: any ) {
            /**
            Setup a second framebuffer, so the renderer can pingpong.

            This puts the initial buffer into the second position,
            which is thereafter used as the output texture source.
            The first-position buffer is drawn into the second position,
            so should be more fundamentally accessible to filters and shaders.

            @method _setupSecondBuffer
            @param params {object} Composite parameter object from constructor
            @private
            **/

            if ( this.gl ) {
                this._framebuffer2 = this._framebuffer;
                this._texture2 = this._texture;

                this._setupGlBuffer( params );

                this.atlasSource = new Kiwi.Buffers.BufferAtlas( {
                    name: this.name + "SourceAtlas",
                    cells: [ { x: 0, y: 0, w: this.width, h: this.height } ],
                    type: Kiwi.Textures.TextureAtlas.SINGLE_IMAGE,
                    texture: this._texture,
                    width: this.width,
                    height: this.height
                } );
                this.state.textureLibrary.textures[ this.atlasSource.name ] =
                    this.atlasSource;
                ( <Kiwi.Renderers.GLRenderManager>this.game.renderer )
                .addTexture( this.gl, this.atlasSource );
            } else {
                this._canvas2 = this._canvas;
                this._ctx2 = this._ctx;

                this._setupCanvasBuffer( params );

                this.atlasSource = new Kiwi.Textures.SingleImage(
                    this.name + "AtlasSource",
                    this._canvas2,
                    this.width,
                    this.height );
                this.state.textureLibrary.textures[ this.atlasSource.name ] =
                    this.atlasSource;
            }
        }

        updateTextureAtlas () {
            /**
            Ensure that the output texture atlas is pointing at
            the correct sub-buffer.

            @method updateTextureAtlas
            **/

            if ( this.gl ) {
                this.atlas.glTextureWrapper.texture = this._texture2;
                this.atlasSource.glTextureWrapper.texture = this._texture;
            } else {
                this.atlas.image = this._canvas2;
            }
        }
    }
}
