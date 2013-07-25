


module Kiwi.HUD {

    export class HUDDisplay {
        
        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game 
        * @param {string} name 
        **/
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
        * @public
        **/
        public container: HTMLDivElement;

        /**
        * @public
        **/
        public name: string;

        /**
        * @private
        **/
        private _game: Kiwi.Game;

        /**
        * Contains all of the widgets that are contained in this HUDDisplay.
        * @private
        **/
        private _widgets: Kiwi.HUD.HUDWidget[];

        /**
        * Adds a widget to the HUDDisplay.
        *
        * @method addWidget
        * @param {Kiwi.HUD.HUDWidget} widget - The widget to be added to the Display
        **/
        public addWidget(widget: Kiwi.HUD.HUDWidget) {
            widget.container.id = 'HUD-widget-' + this._game.rnd.uuid();
            this._widgets.push(widget);
            this.container.appendChild(widget.container);
            
        }

        /* 
        * Removes a singular widget from the display
        * 
        * @method removeWidget
        * @param {Kiwi.HUD.HUDWidget} widget - The widget to be removed.
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

        /*
        * Removes all of the widgets on this display.
        *
        * @method removeAllWidgets
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
        * @param {Kiwi.HUD.HUDWidget} widget - The Widget to be removed.
        * @returns {boolean}
        **/
        private destroyWidget(widget:Kiwi.HUD.HUDWidget):boolean {
            if (this.container.contains(widget.container)) {
                this.container.removeChild(widget.container);
                return true;
            }
            return false;
        }

        /**
        * Update loop
        **/
        public update() {
            for (var i = 0; i < this._widgets.length; i++) {
                this._widgets[i].update();
            }
        }

        /**
        * Render
        **/
        public render() {

        }




    }
}

