/**
*
* @module HUD
* @submodule HUDComponents
* 
*/

module Kiwi.HUD.HUDComponents {
    
    /**
    * The WidgetInput Component handles the input events that you may want to listen to on a widget.
    * This Component is essentually another version of the normal Input Component but instead of for GameObjects this is for HUDWidgets.
    *
    * @class WidgetInput
    * @extends Component
    * @namespace Kiwi.HUD.HUDComponents
    * @constructor
    * @param owner {any} The object that this WidgetInput belongs to.
    * @param container {HTMLElement} The HTMLElement that the events will occur on/to.
    * @return {WidgetInput} 
    */
    export class WidgetInput extends Component {

        constructor(owner:any, container:HTMLElement) {
            super(owner, 'WidgetInput');
            this._container = container;

            //signals!!
            this.onUp = new Kiwi.Signal;
            this.onDown = new Kiwi.Signal;
            this.onOver = new Kiwi.Signal;
            this.onOut = new Kiwi.Signal;

            this._addEvents();
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'WidgetInputComponent';
        }

        /**
        * A Signal that dispatches events when the user releases the mouse on top of the HTMLElement.
        * @property onUp
        * @type Signal
        * @public
        */
        public onUp: Kiwi.Signal;

        /**
        * A Signal that dispatches events when the user presses the mouse on top of the HTMLElement.
        * @property onDown
        * @type Signal
        * @public
        */
        public onDown: Kiwi.Signal;

        /**
        * A Signal that dispatches events when the user's mouse initially goes over the top of the HTMLElement.
        * @property onOver
        * @type Signal
        * @public
        */
        public onOver: Kiwi.Signal;

        /**
        * A Signal that dispatches events when the user's mouse leaves the HTMLElement.
        * @property onOut
        * @type Signal
        * @public
        */
        public onOut: Kiwi.Signal;
        
        /**
        * The HTMLElement that the events are going to occur on.
        * @property _container
        * @type HTMLElement
        * @private
        */
        private _container: HTMLElement;

        /**
        * Changes the HTMLElement that the events are occuring on to one passed. 
        * Removes all of the current events from container before changing.
        * @method setElement
        * @param container {HTMLElement} The new element that the events are going to occur on.
        * @public
        */
        public setElement(container: HTMLElement) {
            this._removeEvents();
            this._container = container;
            this._addEvents();
        }

        /**
        * Creates new bindings and adds the events to the HTMLElement.
        * @method _addEvents
        * @private
        */
        private _addEvents() {
            if (!this._active) {
                this._binds = [];
                this._binds.push({ 'event': 'mouseup', 'function': this._up.bind(this) });
                this._binds.push({ 'event': 'mousedown', 'function': this._down.bind(this) });
                this._binds.push({ 'event': 'mouseover', 'function': this._over.bind(this) });
                this._binds.push({ 'event': 'mouseout', 'function': this._out.bind(this) });

                for (var i = 0; i < this._binds.length; i++) {
                    this._container.addEventListener(this._binds[i].event, this._binds[i].function, false);
                }
                this._active = true;
            }
        }

        /**
        * Removes the events off of the current container.
        * @method _removeEvents
        * @private
        */
        private _removeEvents() {
            if (this._active) {
                for (var i = 0; i < this._binds.length; i++) {
                    this._container.removeEventListener(this._binds[i].event, this._binds[i].function, false);
                }
                this._binds = [];
                this._active = false;
            }
        }

        /**
        * An array of objects, that holds the events that are happening and the methods that are bound to the container. 
        * @property _binds
        * @type any
        * @private
        */
        private _binds: any;

        /**
        * If the events are currently actively running or not.
        * @property active
        * @type boolean
        * @private
        */
        private _active: boolean = false;

        /**
        * The method that is called when a mouseup event fires. The onUp Signal is called.
        * @method _up
        * @param evt {MouseEvent}
        * @private
        */
        private _up(evt) {
            this.onUp.dispatch(evt);
        }
        
        /**
        * The method that is called when a mousedown event fires. The onDown Signal is called.
        * @method _down
        * @param evt {MouseEvent}
        * @private
        */
        private _down(evt) {
            this.onDown.dispatch(evt);
        }
        
        /**
        * The method that is called when a mouseover event fires. The onOver Signal is called.
        * @method _over
        * @param evt {MouseEvent}
        * @private
        */
        private _over(evt) {
            this.onOver.dispatch(evt);
        }
        
        /**
        * The method that is called when a mouseout event fires. The onOut Signal is called.
        * @method _out
        * @param evt {MouseEvent}
        * @private
        */
        private _out(evt) {
            this.onOut.dispatch(evt);
        }

    }

}


