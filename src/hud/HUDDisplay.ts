/**
* 
* @module Kiwi
* @submodule HUD
*
*/

module Kiwi.HUD {

    /**
    * A HUDDisplay is a container for which you can add/removes widget on, and is more used to manage the widgets that are being displayed on it.
    * A HUDDisplay is created through a games HUDManager and is NOT directly instantiated.
    * Each game can contain multiple HUDDisplay's and each HUDDisplay can contain multiple HUDWidgets.
    *
    * @class HUDDisplay
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game} The game that this HUD Display belongs to. 
    * @param name {string} The name of this display.
    * @return HUDDisplay
    */
    export class HUDDisplay {
        
        constructor(game: Kiwi.Game,name:string) {
            this._game = game;
            this.name = name;
            this._manager = this._game.huds;
            this._device = this._game.deviceTargetOption;

            if (this._manager.supported) {

                switch (this._device) {
                    case Kiwi.TARGET_BROWSER:
                        this.container = <HTMLDivElement>document.createElement("div");
                        this.container.id = "HUD-layer-" + game.rnd.uuid();
                        this.container.style.width = "100%";
                        this.container.style.height = "100%";
                        this.container.style.position = "absolute";
                        this._widgets = new Array();

                        break;
                }

                this.class = 'kiwi-display';
            }
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType():string {
            return 'HUDDisplay';
        }

        /**
        * The type of device that is being targeted for the game. This is the same as games deviceTargetOption 
        * Needed as the type of device will detiremine how the items will be added to game or whether it will even work.
        * 
        * @property _device
        * @type number
        * @private
        */
        private _device: number;

        /**
        * The HUD Manager that this Display belongs to. 
        * @property _manager
        * @type HUDManager
        * @private
        */
        private _manager: Kiwi.HUD.HUDManager;

        /**
        * Holds the container HTMLDivElement.
        * @property container
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;

        /**
        * The name of this HUD Display. 
        * @property name
        * @type String
        * @public
        */
        public name: string;
        
        /**
        * The game that this HUD Display is on.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Contains all of the widgets that are contained in this HUDDisplay.
        * @property _widgets
        * @type HUDWidget
        * @private
        */
        private _widgets: Kiwi.HUD.HUDWidget[];

        /**
        * Adds a widget to the HUDDisplay. Returns a boolean as an indication of whether or not it was successful.
        *
        * @method addWidget
        * @param widget {HUDWidget}  The widget to be added to the Display
        * @return {Boolean} If it was successful or not.
        * @public
        */
        public addWidget(widget: Kiwi.HUD.HUDWidget):boolean {
            if (this._manager.supported) {
                this._widgets.push(widget);
                
                if (this._device == Kiwi.TARGET_BROWSER) {
                    this.container.appendChild(widget.container);
                    return true;
                }
            }
            return false;
        }

        /**
        * Removes a singular widget from the display. Returns a boolean as an indication of if anything happened or not.
        * 
        * @method removeWidget
        * @param widget {HUDWidget} The widget to be removed.
        * @return {boolean} If it was successful or not.
        * @public
        */
        public removeWidget(widget: Kiwi.HUD.HUDWidget):boolean {
            if (this._manager.supported) {
                
                if (this.removeFromContainer(widget)) {

                    var i = this._widgets.indexOf(widget);

                    if (i !== -1) {
                        this._widgets.splice(i, 1);
                        return true;
                    }
                }

            }
            return false;
        }

        /**
        * Removes all of the widgets on this display.
        * @method removeAllWidgets
        * @public
        */
        public removeAllWidgets() {
            for (var i = 0; i < this._widgets.length; i++) {
                this.removeFromContainer(this._widgets[i]);
            }

            this._widgets = [];
        }

        /**
        * Removes a widget from on the HUDDisplay. 
        * @method removeFromContainer
        * @param widget {HUDWidget} The Widget to be removed.
        * @returns {boolean}
        */
        private removeFromContainer(widget:Kiwi.HUD.HUDWidget):boolean {
            if (this._manager.supported) {
                if(this._device == Kiwi.TARGET_BROWSER) {

                    if (this.container.contains(widget.container)) {
                        this.container.removeChild(widget.container);
                        return true;
                    }

                }
            }
            return false;
        }

        /**
        * Update loop
        * @method update
        * @public
        */
        public update() {
            for (var i = 0; i < this._widgets.length; i++) {
                this._widgets[i].update();
            }
        }

        /**
        * Shows displays the HUD Display on screen.
        * @method show
        * @public
        */
        public show() {
            this.container.style.display = 'block';
        }

        /**
        * Hides the current HUD Display from the screen.
        * @method hide
        * @public
        */
        public hide() {
            this.container.style.display = 'none';
        }

        /**
        * The class name that the container element that this HUDWidget current has.
        * @property class
        * @type {String} 
        * @public
        */
        public set class(cssClass: string) {
            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.className = cssClass;
            }
        }
        public get class(): string {
            if (this._device == Kiwi.TARGET_BROWSER) {
                return this.container.className;
            }
        }

    }
}

