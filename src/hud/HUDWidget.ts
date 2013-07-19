


module Kiwi.HUD {

    export interface IHUDWidget {
        setTemplate(): boolean;
    }

    export class HUDWidget {
        // Constructor
        constructor(name: string,x:number,y:number) {
            //this._game = game;
            this.name = name;
            this.dictionary = new Kiwi.Structs.Dictionary();
            this.container = <HTMLDivElement>document.createElement("div");
            this.container.id = "HUD-widget-" + name; //tis should be changed to an id
            this.container.innerText = this.container.id;
            this.container.style.position = "absolute";
            this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);
            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.position.updated.add(this._updatePosition, this);
            this._updateCSS();
        }

        public dictionary: Kiwi.Structs.Dictionary;

        public position: Kiwi.Components.Position;

        public components: Kiwi.ComponentManager;

        public container: HTMLDivElement;

        public name: string;

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
            console.log("update widget super")
            this.components.update();
        }

        public render() {

        }


    }
}

