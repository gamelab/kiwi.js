/**
@module Kiwi
@submodule Renderers
**/

module Kiwi.Renderers {
    export class RenderTask {

        constructor ( params: any ) {
            /**
            Information about a rendering pass for an entity.

            Render tasks apply new visuals to the same underlying entity.
            They can be used by a buffered rendering system to provide multiple
            information types to a deferred renderer.

            A render task may override one or more of the following:
            - Alpha
            - Texture atlas (including animation and cell information)
            - WebGL renderer (including shader and blend mode information)
            - Canvas render method

            Note that the WebGL renderer and
            the canvas render method are mutually exclusive.
            If you wish to use one as a fallback for the other,
            be aware that the available solutions may be very different.

            A render task cannot override animations.
            It must mirror the base entity in behavior.
            Accordingly, its atlas must provide
            at least as many cells as the base entity.
            These cells will be displayed using
            the same animation and anchor point data as the base entity.

            When it is created, a `RenderTask` will attempt to add itself
            to a property on the target entity called `renderTasks`.
            This is an auto-created object literal that may contain many tasks.

            @class RenderTask
            @constructor
            @param params {object} Composite parameter object
                @param params.name {string} Name or key of render pass
                @param params.entity {Kiwi.Entity} Entity to which the task will
                    attach
                @param [params.alpha] {number} Override alpha
                @param [params.atlas] {Kiwi.Textures.TextureAtlas} Override
                    texture
                @param [params.renderer] {Kiwi.Renderers.Renderer} Override
                    renderer for WebGL only
                @param [params.renderCanvas] {function} Override render
                    function for Canvas only. This should scope to `entity`.
            **/

            this.name = params.name;

            this.entity = params.entity;

            // Append to target entity
            this.entity.renderTasks[ this.name ] = this;

            this._alpha = params.alpha;

            this._atlas = params.atlas;

            this._renderer = params.renderer;

            this._renderCanvas = params.renderCanvas;
        }

        /**
        Name or key of this task. This will identify the task in the
        `renderTasks` object on an entity.

        Note that this will override any `RenderTask` of the same key.

        @property name
        @type string
        **/
        name: string;

        /**
        Entity to which this task belongs. Rendering information not specified
        in the render task will be derived from this entity.

        @property entity
        @type Kiwi.Entity
        **/
        entity: Kiwi.Entity;

        /**
        Override alpha
        @property _alpha
        @type number
        @default undefined
        @private
        **/
        private _alpha: number;

        /**
        Override texture
        @property _atlas
        @type Kiwi.Textures.TextureAtlas
        @default undefined
        @private
        **/
        private _atlas: Kiwi.Textures.TextureAtlas;

        /**
        Override WebGL renderer
        @property _renderer
        @type Kiwi.Renderers.Renderer
        @default undefined
        @private
        **/
        private _renderer: Kiwi.Renderers.Renderer;

        /**
        Override `render` method
        @property _renderCanvas
        @type function
        @default undefined
        @private
        **/
        private _renderCanvas: Function;

        /**
        Alpha override
        @property alpha
        @type number
        **/
        get alpha (): number {
            return this._alpha || this.entity.alpha;
        }
        set alpha ( value: number ) {
            this._alpha = value;
        }

        /**
        Texture override.
        Must have cells corresponding to the base entity's atlas' cells.
        (They may be the same cell.)

        @property atlas
        @type Kiwi.Textures.TextureAtlas
        **/
        get atlas (): Kiwi.Textures.TextureAtlas {
            return this._atlas || this.entity.atlas;
        }
        set atlas ( value: Kiwi.Textures.TextureAtlas ) {
            this._atlas = value;
        }

        /**
        WebGL renderer override. This object may contain
        variant shader and blend mode data.

        @property renderer
        @type Kiwi.Renderers.Renderer
        **/
        get renderer (): Kiwi.Renderers.Renderer {
            return this._renderer || this.entity.glRenderer;
        }
        set renderer ( value: Kiwi.Renderers.Renderer ) {
            this._renderer = value;
        }

        /**
        Canvas render method override.
        @method renderCanvas
        @type function
        **/
        get renderCanvas (): Function {
            return this._renderCanvas || this.entity.render;
        }
        set renderCanvas ( value: Function ) {
            this._renderCanvas = value;
        }

        static getCanvasCompositingFunction (
            entity: Kiwi.Entity, mode: string ) {
            /**
            Return a function which sets the `globalCompositeOperation` before
            rendering an entity. Executes in the scope of `entity`.

            Use this to create `RenderTask` objects for canvas compositing.

            Note that compositing occurs only within a buffer.
            These operations will not blend with objects outside the buffer.

            @method getCanvasCompositingFunction
            @static
            @param entity {Kiwi.Entity} Entity that will render
            @param mode {string} Valid
                `CanvasRenderingContext2D.globalCompositeOperation` mode
            **/

            return ( function ( camera ) {
                this.game.stage.ctx.save();
                this.game.stage.ctx.globalCompositeOperation = mode;
                this.render( camera );
                this.game.stage.ctx.restore();
            } ).bind( entity );
        }
    }
}
