


module Kiwi.HUD {


    export class HUDDisplay {
        // Constructor
        constructor(game: Kiwi.Game,name:string) {
            this._game = game;
            this.name = name;
            this.container = <HTMLDivElement>document.createElement("div");
            this.container.id = "HUD-layer-" + name; //tis should be changed to an id
            this.container.style.width = "100%";
            this.container.style.height = "100%";
            this.container.style.position = "absolute";
            //this.container.innerText = this.container.id;
            this._widgets = new Array();
        }

        public container: HTMLDivElement;

        public name: string;

        private _game: Kiwi.Game;

        private _widgets: Kiwi.HUD.HUDWidget[];

        public addWidget(widget: Kiwi.HUD.HUDWidget) {
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

        private destroyWidget(widget:Kiwi.HUD.HUDWidget):boolean {
            if (this.container.contains(widget.container)) {
                this.container.removeChild(widget.container);
                return true;
            }
            return false;
        }

        public update() {
            for (var i = 0; i < this._widgets.length; i++) {
                this._widgets[i].update();
            }
        }

        public render() {

        }




    }
}

