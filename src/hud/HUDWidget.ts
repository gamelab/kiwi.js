


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

        //element in the template that gets the effects/info added to.
        public tempElement: HTMLElement;

        //template containers parent
        private _tempParent: HTMLElement;

        //template container element
        private _tempContainer: HTMLElement; 

        public setTemplate(main: string, element?: string) {

            var containerElement: HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                console.log('Container element not found');
                return;
            }

            if (element === undefined) {
                var fieldElement = containerElement;
            } else {
                var fieldElement: HTMLElement = document.getElementById(element);
                if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                    console.log('Field element not found inside container')
                    return;
                }
            }
            
            this.tempElement = fieldElement;
            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);
        }

        public removeTemplate() {
            if (this.tempElement !== undefined) {
                this.container.removeChild(this._tempContainer);
                this._tempParent.appendChild(this._tempContainer);
                this.tempElement = undefined;
            }
        }

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

