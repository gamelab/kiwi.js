/**
Buffers are a powerful off-screen drawing system.

@module Kiwi
@submodule Buffers
@main Buffers
**/

module Kiwi.Buffers {
    export class Bufferer {
        /**
        Master system for rendering frame buffers.

        You should use a `Bufferer` to create and control
        all buffers within a `State`, rather than create them singly.
        This ensures that `GroupBuffer` and `FilterBuffer` objects
        are properly registered.

        @class Bufferer
        @namespace Kiwi.Buffers
        @since 1.5.0
        **/

        constructor ( params: any ) {
            /**
            @constructor
            @param params {object} Composite parameter object
                @param params.state {Kiwi.State} Current game state
            **/

            var renderOption;

            this.buffers = [];
            this.component =
                new Kiwi.Component( params.state, "Bufferer Update" );
            this.component.postUpdate = this.render.bind( this );
            this.gl = params.state.game.stage.gl;
            this.state = params.state;

            // Detect render mode
            renderOption = this.state.game.renderOption;
            if ( renderOption === Kiwi.RENDERER_WEBGL ) {
                this._setupGl();
            } else if ( renderOption === Kiwi.RENDERER_CANVAS ) {
                this._setupCanvas();
            } else {
                Kiwi.Log.error(
                    "#Bufferer", "No Canvas or WebGL renderer detected" );
            }

            // Setup component
            params.state.components.add( this.component );
        }

        /**
        Collated buffers in the State.
        Computed each frame just before rendering.
        @property bufferCollation
        @type array
        **/
        bufferCollation: Array<Kiwi.Buffers.Buffer>;

        /**
        Master list of all buffers created in this scene
        @property buffers
        @type array
        **/
        buffers: Array<Kiwi.Buffers.Buffer>;

        /**
        Component that regulates per-frame updates
        @property component
        @type Kiwi.Component
        **/
        component: Kiwi.Component;

        /**
        Dedicated buffer render manager. Only created when WebGL is being used.
        @property filterBufferGlRenderManager
        @type Kiwi.Buffers.FilterBufferGlRenderManager
        @default undefined
        **/
        filterBufferGlRenderManager: Kiwi.Buffers.FilterBufferGlRenderManager;

        /**
        WebGL rendering context in use
        @property gl
        @type WebGLRenderingContext
        **/
        gl: WebGLRenderingContext;

        /**
        Dedicated buffer render manager. Only created when WebGL is being used.
        @property groupBufferGlRenderManager
        @type Kiwi.Buffers.GroupBufferGlRenderManager
        @default undefined
        **/
        groupBufferGlRenderManager: Kiwi.Buffers.GroupBufferGlRenderManager;

        /**
        Current game state
        @property state
        @type Kiwi.State
        **/
        state: Kiwi.State;

        collateBuffers ( target: Kiwi.Group ) {
            /**
            Collate all buffers visible in the target group.
            Buffers not added to the subgraph will not be collated.
            Buffers with `redraw===false` will not be collated.

            @method collateBuffers
            @param target {Kiwi.Group} Target subgraph to collate
            **/

            this.bufferCollation = [];

            this.collateChildren(
                target,
                this.bufferCollation,
                this.testBuffer );
        }

        collateChildren (
            entity: Kiwi.IChild, outArray: Array<any>, testFunc: Function ) {
            /**
            Recursively build a list of children, using a specified function.
            @method collateChildren
            @param entity {Kiwi.IChild} Parent of graph section to collate
            @param outArray {array} Array in which to store results
            @param [testFunc] {function} Qualification test function
            **/

            var i, members;

            if ( !entity.visible ) {
                return;
            }

            if ( testFunc ) {
                if ( testFunc( entity ) ) {
                    outArray.push( entity );
                }
            } else {
                outArray.push( entity );
            }

            members = ( <Kiwi.Group>entity ).members;
            if ( members ) {
                for ( i = 0; i < members.length; i++ ) {
                    this.collateChildren(
                        members[ i ],
                        outArray,
                        testFunc );
                }
            }
        }

        createBuffer ( params: any ): Kiwi.Buffers.Buffer {
            /**
            Create a `Buffer` using the specified params.
            The buffer is registered so it may be properly managed.

            Note: `params.bufferer` is automatically set to `this`.

            Note: This is a raw buffer. You should probably create
            a `FilterBuffer` or `GroupBuffer` instead.

            @method createBuffer
            @param params {object} Composite parameter object
            @return Kiwi.Buffers.Buffer
            **/

            var buffer;

            params.bufferer = this;
            params.state = this.state;

            buffer = new Kiwi.Buffers.Buffer( params );

            this.buffers.push( buffer );

            return buffer;
        }

        createFilterBuffer ( params: any ): Kiwi.GameObjects.FilterBuffer {
            /**
            Create a `FilterBuffer` using the specified params.
            The buffer is registered so it may be properly managed.

            Note: `params.bufferer` is automatically set to `this`.

            @method createFilterBuffer
            @param params {object} Composite parameter object
            @return Kiwi.GameObjects.FilterBuffer
            **/

            var filterBuffer;

            params.bufferer = this;
            params.state = this.state;

            filterBuffer = new Kiwi.GameObjects.FilterBuffer( params );

            this.buffers.push( filterBuffer );

            return filterBuffer;
        }

        createGroupBuffer ( params: any ): Kiwi.GameObjects.GroupBuffer {
            /**
            Create a `GroupBuffer` using the specified params.
            The buffer is registered so it may be properly managed.

            Note: `params.bufferer` is automatically set to `this`.

            @method createGroupBuffer
            @param params {object} Composite parameter object
            @return Kiwi.GameObjects.GroupBuffer
            **/

            var groupBuffer;

            params.bufferer = this;
            params.state = this.state;

            groupBuffer = new Kiwi.GameObjects.GroupBuffer( params );

            this.buffers.push( groupBuffer );

            return groupBuffer;
        }

        removeBuffer ( buffer: Kiwi.Buffers.Buffer ): boolean {
            /**
            Remove a `Buffer` from this manager.

            You should not call this method. It is invoked during deletion.
            If you remove a buffer from the manager, the buffer may lose
            functionality.

            @method removeBuffer
            @param buffer {Kiwi.Buffers.Buffer} Buffer to remove
            @return {boolean} Whether the removal succeeded
            **/

            var index = this.buffers.indexOf( buffer );

            if ( index > -1 ) {
                this.buffers.splice( index, 1 );
                return true;
            }
            return false;
        }

        renderCanvas ( target: Kiwi.Group ) {
            /**
            Render buffers in canvas mode.
            @method renderCanvas
            @param target {Kiwi.Group} Target subgraph to render
            **/

            var i;

            this.collateBuffers( target );

            if ( this.bufferCollation.length === 0 ) {
                return;
            }

            for ( i = this.bufferCollation.length - 1; i >= 0; i-- ) {
                if ( this.bufferCollation[ i ].visible ) {
                    this.bufferCollation[ i ].draw();
                }
            }
        }

        renderGl ( target: Kiwi.Group ) {
            /**
            Render buffers in WebGL mode.

            Function mirrors `renderCanvas`,
            except this unbinds the current framebuffer when complete,
            allowing the system renderer to act as expected.

            @method renderGl
            @param target {Kiwi.Group} Target subgraph to render
            **/

            this.renderCanvas( target );
            this.restoreGl();
        }

        render ( target: Kiwi.Group ) {
            /**
            Render the subgraph belonging to the target (default: the state).

            @method render
            @param [target] {Kiwi.Group} Target subgraph to render
            **/

            if ( !target ) {
                target = this.state;
            }

            if ( this.gl ) {
                this.renderGl( target );
            } else {
                this.renderCanvas( target );
            }
        }

        restoreGl () {
            /**
            Restore the WebGL state to default window.
            Used after drawing operations.

            This is called automatically by the rendering system.

            @method restoreGl
            **/

            // Unbind/nullbind framebuffer
            // That is, return to using the main screen as the render target
            this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, null );

            // Restore viewport
            this.state.game.stage.onResize.dispatch(
                this.state.game.stage.width, this.state.game.stage.height );
        }

        _setupCanvas () {
            /**
            Set up Canvas rendering systems.
            @method _setupCanvas
            @private
            **/
        }

        _setupGl () {
            /**
            Set up WebGL rendering systems.
            @method _setupGl
            @private
            **/

            var game = this.state.game;

            this.filterBufferGlRenderManager =
                new Kiwi.Buffers.FilterBufferGlRenderManager( game );

            this.groupBufferGlRenderManager =
                new Kiwi.Buffers.GroupBufferGlRenderManager( game );
        }

        testBuffer ( entity: Kiwi.Entity ): boolean {
            /**
            Test whether the entity is a Buffer and should be redrawn.
            @method testBuffer
            @param entity {Kiwi.Entity} Entity to test
            @return boolean
            **/

            return entity instanceof Kiwi.Buffers.Buffer;
        }
    }
}
