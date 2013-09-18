/**
* Kiwi - HUD
* @module Kiwi
* @submodule HUD
*/


module Kiwi.HUD {

    /**
    * @class HUDDisplay
    * @constructor
    * @param game {Game} game 
    * @param name {string} name 
    */
    export class HUDDisplay {
        
        /**
        * 
        */
        constructor(game: Kiwi.Game,name:string) {
            this._game = game;
            this.name = name;
            this.container = <HTMLDivElement>document.createElement("div");
            this.container.id = "HUD-layer-" + game.rnd.uuid();
            this.container.style.width = "100%";
            this.container.style.height = "100%";
            this.container.style.position = "absolute";
            //this.container.innerText = this.container.id;
            this._widgets = new Array();
        }

        /**
        * Contains the container element.
        * @property container
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;

        /**
        * [Requires Description]
        * @property name
        * @type String
        * @public
        */
        public name: string;
        
        /**
        * [Requires Description]
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
        * Adds a widget to the HUDDisplay.
        *
        * @method addWidget
        * @param widget {HUDWidget}  - The widget to be added to the Display
        * @public
        */
        public addWidget(widget: Kiwi.HUD.HUDWidget) {
            widget.container.id = 'HUD-widget-' + this._game.rnd.uuid();
            this._widgets.push(widget);
            this.container.appendChild(widget.container);
            
        }

        /**
        * Removes a singular widget from the display
        * 
        * @method removeWidget
        * @param widget {HUDWidget} The widget to be removed.
        * @return {boolean}
        */
        public removeWidget(widget: Kiwi.HUD.HUDWidget):boolean {

            if (this.destroyWidget(widget)) {

                var i = this._widgets.indexOf(widget);

                if (i !== -1) {
                    this._widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
        * Removes all of the widgets on this display.
        *
        * @method removeAllWidgets
        * @public
        */
        public removeAllWidgets() {
            for (var i = 0; i < this._widgets.length; i++) {
                this.destroyWidget(this._widgets[i]);
            }

            this._widgets = [];
        }

        /**
        * Removes a widget from being on the HUDDisplay.
        *
        * @method destroyWidget
        * @param widget {HUDWidget} The Widget to be removed.
        * @returns {boolean}
        */
        private destroyWidget(widget:Kiwi.HUD.HUDWidget):boolean {
            if (this.container.contains(widget.container)) {
                this.container.removeChild(widget.container);
                return true;
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
        * Render
        * @method render
        * @public
        */
        public render() {

        }




    }
}

