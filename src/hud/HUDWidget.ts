


module Kiwi.HUD {

    export class HUDWidget {
        // Constructor
        constructor(name: string,x:number,y:number) {
            //this._game = game;
            this.name = name;
            this.container = <HTMLDivElement>document.createElement("div");
            //this.container.id = "HUD-widget-" + name; //gets set when added to display
            this.container.style.position = "absolute";
            this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);
            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.position.updated.add(this._updatePosition, this);
            this._updateCSS();
        }

        public position: Kiwi.Components.Position;

        public components: Kiwi.ComponentManager;

        public container: HTMLDivElement;

        public name: string;

        public game: Kiwi.Game;

        public setStyle(cssClass: string) {
            this.container.className = cssClass;
        }

        //private _game: Kiwi.Game;

        private _updatePosition() {
            this._updateCSS();
        }

        private _updateCSS() {
            this.container.style.left = this.position.x() + "px";
            this.container.style.top = this.position.y() + "px";
        }

        public update() {
            this.components.update();
        }

        public render() {

        }


    }
}

