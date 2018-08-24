/**
@module Kiwi
@submodule GameObjects
**/

module Kiwi.GameObjects {
    export class GroupBuffer extends Kiwi.Buffers.Buffer {
        constructor ( params ) {
            /**
            Buffer that draws a subgraph.
            The GroupBuffer can either use its own children,
            or another entity with members, as the subgraph.
            The subgraph will be rendered into the buffer.

            The GroupBuffer functions as a `Group`.

            Children of the GroupBuffer will not be drawn
            as part of the regular render sequence.

            All standard Buffer options are available.

            You should create `GroupBuffer` objects
            using the `createGroupBuffer` method of a `Bufferer` object.

            @class GroupBuffer
            @namespace Kiwi.GameObjects
            @constructor
            @extends Kiwi.Buffers.Buffer
            @extends Kiwi.Group
            @param params {object} Composite parameter object
                @param params.state {Kiwi.State} Current game state
                @param params.bufferer {Kiwi.Buffers.Bufferer} Buffer
                    manager object. You should not create `GroupBuffer` objects
                    on their own; use a manager to ensure they are properly
                    registered. The manager will auto-complete this parameter.
                @param [params.camera] {Kiwi.Camera} Camera to use
                @param [params.renderTask] {string} Render task identifier
                @param [params.target=this] {Kiwi.Entity} Parent of a subgraph
            **/

            super( params );

            this._extendWithGroupMethods();

            this.camera = params.camera || new Kiwi.Camera(
                this.game, 0,
                this.name ? this.name + "-camera" : "GroupBufferCamera",
                0, 0, this.width, this.height );
            this.camera.fitToStage = false;

            this._camMatrix = new Kiwi.Geom.Matrix();

            this.members = [];

            this.renderTask = params.renderTask;

            this.target = params.target || this;

            this.addTag( "GroupBuffer" );
        }

        /**
        Camera to use. This describes the buffer's view into the scene.

        Defaults to a new camera. This is not created using
        `game.cameras.create`, because that would add it to the regular
        render pipeline.

        @property camera
        @type Kiwi.Camera
        **/
        camera: Kiwi.Camera;

        /**
        Temporary scratch matrix used to compute canvas camera transforms.
        @property _camMatrix
        @type Kiwi.Geom.Matrix
        @private
        **/
        private _camMatrix: Kiwi.Geom.Matrix;

        /**
        Collection of children belonging to this `GroupBuffer`
        @property members
        @type array
        @default []
        **/
        members: Array<any>;

        /**
        Render task identification key. If specified, the `GroupBuffer`
        will only render entities with that `RenderTask`. If not specified,
        the `GroupBuffer` will use the default render method.

        @property renderTask
        @type string
        @default undefined
        **/
        renderTask: string;

        /**
        Target parent of a subgraph.
        The `GroupBuffer` will render that subgraph.
        By default, the `GroupBuffer` has its own children.

        @property target
        @type Kiwi.Entity
        @default this
        **/
        target: any;

        protected _drawCanvas () {
            /**
            Custom canvas draw behavior.
            @method _drawCanvas
            @protected
            **/

            var ct, i, ignorance, stageCtx;

            this.clear();

            // Standard render techniques always use the stage context.
            // We're going to steal it, impersonate it, and put it back.
            stageCtx = this.game.stage.ctx;
            this.game.stage.ctx = this._ctx;

            this._ctx.save();

            // Apply camera
            ct = this.camera.transform;
            this._camMatrix.setFromOffsetTransform(
                0, 0, ct.scaleX, ct.scaleY, ct.rotation,
                ct.anchorPointX, ct.anchorPointY );
            this._ctx.setTransform(
                this._camMatrix.a, this._camMatrix.b,
                this._camMatrix.c, this._camMatrix.d,
                this._camMatrix.tx, this._camMatrix.ty );
            this._ctx.transform(
                1, 0, 0, 1, ct.x - ct.anchorPointX, ct.y - ct.anchorPointY );

            // Draw elements
            if ( this.target === this ) {

                // GroupBuffers which render their own children
                // must apply an inverse transform
                // to the camera, otherwise children will inherit\
                // parent transforms and slide around as the object transforms
                ignorance = this.transform.ignoreChild;
                this.transform.ignoreChild = true;

                if ( this.renderTask ) {
                    for ( i = 0; i < this.members.length; i++ ) {
                        this._recurseTask( this.members[ i ] );
                    }
                } else {
                    for ( i = 0; i < this.members.length; i++ ) {
                        this._recurse( this.members[ i ] );
                    }
                }
            } else {
                if ( this.renderTask ) {
                    this._recurseTask( this.target );
                } else {
                    this._recurse( this.target );
                }
            }

            this._ctx.restore();
            this.transform.ignoreChild = ignorance;
            this.game.stage.ctx = stageCtx;
        }

        protected _drawGl () {
            /**
            Custom WebGL draw behavior.
            @method _drawGl
            @protected
            **/

            this.gl.bindFramebuffer( this.gl.FRAMEBUFFER, this._framebuffer );
            this.gl.viewport( 0, 0, this.width, this.height );
            this.bufferer.groupBufferGlRenderManager.renderBuffer( this );
        }

        destroy () {
            /**
            Destroy the `GroupBuffer` and its own children.
            Hybrid of `Buffer` and `Group` destroy methods.

            Do not call this method. Use `exists = false` to ensure the entity
            is removed at the appropriate point during the game loop.

            @method destroy
            **/

            var i;

            super.destroy();

            // Duplicate of required `Group.destroy()` functionality
            // Call after Buffer so members are still available for
            // preservation export
            for ( i = this.members.length - 1; i >= 0; i-- ) {
                this.members[ i ].destroy( true );
            }
        }

        drawCopy ( target: any ) {
            /**
            Draw a copy of the target, using this `GroupBuffer`'s camera.

            This is useful for capturing snapshots.

            The operation will temporarily set `this.target` to `target`,
            then call `drawImmediate()`.
            Ensure that `clearOnRender` and `redraw` are set appropriately.

            @method drawCopy
            @param target {Kiwi.IChild} Entity to draw into the buffer.
            **/

            var _target = this.target;

            this.target = target;

            this.drawImmediate();

            this.target = _target;
        }

        drawCut ( target ) {
            /**
            Draw the target, using this `GroupBuffer`'s camera.
            The target is then deleted.

            This is useful for one-time renders, such as custom sprite sheets.

            The operation will temporarily set `this.target` to `target`,
            then call `drawImmediate()`.
            Ensure that `clearOnRender` and `redraw` are set appropriately.

            @method drawCut
            @param target {Kiwi.Entity} Entity to draw into the buffer.
            **/

            this.drawCopy( target );

            target.exists = false;
        }

        private _extendWithGroupMethods () {
            /**
            Copy properties from `Kiwi.Group` to simulate multiple inheritance.
            @method _extendWithGroupMethods
            @private
            **/

            // The `GroupBuffer` shouldn't be a `Group`, because
            // (A) it needs the `Buffer` inheritance, and
            // (B) groups don't enter the render pipeline.

            var i,
                props = [
                    "_validateChild",
                    "addChild",
                    "addChildAfter",
                    "addChildAt",
                    "addChildBefore",
                    "callAll",
                    "clear",
                    "contains",
                    "containsAncestor",
                    "containsDescendant",
                    "forEach",
                    "getAllChildren",
                    "getChildAt",
                    "getChildByID",
                    "getChildByName",
                    "getChildIndex",
                    "getChildrenByTag",
                    "getFirstChildByTag",
                    "getLastChildByTag",
                    "numChildren",
                    "removeChild",
                    "removeChildAt",
                    "removeChildren",
                    "replaceChild",
                    "setAll",
                    "setChildIndex",
                    "swapChildren",
                    "swapChildrenAt"
                ];
            for ( i = 0; i < props.length; i++ ) {
                Kiwi.GameObjects.GroupBuffer.prototype[ props[ i ] ] =
                    Kiwi.Group.prototype[ props[ i ] ];
            }
        }

        private _recurse ( child: any ) {
            /**
            Recursively render a subgraph. Used for canvas rendering.
            @method _recurse
            @param child {object} Child being checked
            @private
            **/

            var i;

            // Do not render non-visible objects or their children
            if ( !child.visible ) {
                return;
            }

            if ( child.childType() === Kiwi.GROUP ) {
                for ( i = 0; i < child.members.length; i++ ) {
                    this._recurse( child.members[ i ] );
                }
            } else {
                child.render( this.camera );
            }
        }

        private _recurseTask ( child: any ) {
            /**
            Recursively render a subgraph with Canvas.
            This variant of `_recurse` renders using `RenderTask` functions
            matching this `GroupBuffer`.

            @method _recurseTask
            @param child {object} Child being checked
            @private
            **/

            var alpha, i;

            // Do not render non-visible objects or their children
            if ( !child.visible ) {
                return;
            }

            if ( child.childType() === Kiwi.GROUP ) {
                for ( i = 0; i < child.members.length; i++ ) {
                    this._recurseTask( child.members[ i ] );
                }
            } else {
                if (
                    child.renderTasks &&
                    child.renderTasks[ this.renderTask ] ) {

                    alpha = child.alpha;
                    child.alpha = child.renderTasks[ this.renderTask ].alpha;
                    child.renderTasks[ this.renderTask ].renderCanvas.call(
                        child, this.camera );
                    child.alpha = alpha;
                }
            }
        }

        update () {
            /**
            Override default method.
            @method update
            **/

            super.update();

            this._updateMembers();
        }

        private _updateMembers () {
            /**
            Trigger update for all members. Update does not propagate into
            `GroupBuffer` objects, because they're not explicitly groups.

            @method _updateMembers
            @private
            **/

            var i;
            for ( i = 0; i < this.members.length; i++ ) {
                this.members[ i ].update();
            }
        }
    }
}
