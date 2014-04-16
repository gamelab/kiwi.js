/**
* A IRenderer is an Interface (defined as a class as the documentation does not support Interfaces just yet),
* which outlines the methods/properties that are required any Renderer. 
* @class IRenderer
*/
interface IRenderManager {
    render(camera: Kiwi.Camera);
    boot();
    initState(state: Kiwi.State);
    endState(state: Kiwi.State);
    numDrawCalls: number;
    requestRendererInstance(rendererID: string,params?: any);
    requestSharedRenderer(rendererID: string, params?: any);
}

/**
* Contains the classes which are related to the rendering of GameObjects.
* 
* @module Kiwi
* @submodule Renderers
* @main
*/ 
module Kiwi.Renderers {

    /**
    *
    * @class CanvasRenderer
    * @extends IRenderer
    * @constructor 
    * @namespace Kiwi.Renderers
    * @param game {Game} The game that this canvas renderer belongs to.
    * @return {CanvasRenderer}
    *
    */
    export class CanvasRenderer implements IRenderManager {
         
        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        /**
        * The boot method is executed when all of the DOM elements that are needed to play the game are ready.
        * @method boot
        * @public
        */
        public boot() {

        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "CanvasRenderer";
        }

        /**
        * The game that this object belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The camera that is currently being used to render upon.
        * @property _currentCamera
        * @type Camera
        * @private
        */
        private _currentCamera: Kiwi.Camera;

        /**
        * This method recursively goes through a State's members and runs the render method of each member that is a Entity. 
        * If it is a Group then this method recursively goes through that Groups members the process that happened to the State's members happens to the Group's members.
        * 
        * @method _recurse
        * @param child {IChild} The child that is being checked.
        * @private
        */
        public _recurse(child: IChild) {

            if (!child.willRender) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse((<Kiwi.Group>child).members[i]);
                }
            } else {
                this.numDrawCalls++;
                child.render(this._currentCamera);

            }

        }

        //for gl compatibility - refactor me
        public requestRendererInstance(rendererID: string, params: any = null): Kiwi.Renderers.Renderer {
            return null;
        }

        public requestSharedRenderer(rendererID: string, params: any = null): Kiwi.Renderers.Renderer {
            return null;
        }

        public initState(state:Kiwi.State) {

        }

        public endState(state: Kiwi.State) {

        }

        public numDrawCalls: number = 0;

        /**
        * Renders all of the Elements that are on a particular camera.
        * @method render
        * @param camera {Camera}
        * @public
        */
        public render(camera: Kiwi.Camera) {
            this.numDrawCalls = 0;    
            this._currentCamera = camera;
            var root: IChild[] = this._game.states.current.members;
            
            //clear 
            this._game.stage.ctx.fillStyle = '#' + this._game.stage.color;
            
            this._game.stage.ctx.fillRect(0, 0, this._game.stage.canvas.width, this._game.stage.canvas.height);

            //apply camera transform
            var cm: Kiwi.Geom.Matrix = camera.transform.getConcatenatedMatrix();
            var ct: Kiwi.Geom.Transform = camera.transform;

            this._game.stage.ctx.save();
            this._game.stage.ctx.setTransform(cm.a, cm.b, cm.c, cm.d, cm.tx + ct.rotPointX, cm.ty + ct.rotPointY);


            for (var i = 0; i < root.length; i++) {
                this._recurse(root[i]);
            }
            this._game.stage.ctx.restore();

        }
        

    }

}

