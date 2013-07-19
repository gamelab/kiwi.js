


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

        public removeWidget(widget: Kiwi.HUD.HUDWidget) {
            //remove off screen
            if (this.container.contains(widget.container)) {
                this.container.removeChild(widget.container);
            }
            //remove from array
            var i = this._widgets.indexOf(widget);

            if (i !== -1) {
                this._widgets.splice(i, 1);
            }
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

