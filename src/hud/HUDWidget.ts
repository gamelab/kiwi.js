/**
*	Kiwi - HUD - HUDWidget
* The HUDWidget is an abstract class containing all of the fundamentals that every HUDWidget will need to have.
*
* @module Kiwi
* @submodule HUD
*/

module Kiwi.HUD {

    /**
    * @class HUDWidget
    * @constructor
    * @param name {string} name - Name of the type of HUDWidget.
    * @param x {number} x 
    * @param y {number} y
    * @return {HUDWidget}
    */

    export class HUDWidget {
        
        constructor(name: string,x:number,y:number) {
            this.name = name;
            this.container = <HTMLDivElement>document.createElement("div");
            this.container.style.position = "absolute";
            this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, null);
            this.onCoordsUpdate = new Kiwi.Signal();
            this.x = x;
            this.y = y;
        }
        
        /*
        * Called when the cooridnates of the HUD Widget updates.
        * @property onCoordsUpdate
        * @type Signal
        * @public
        */
        public onCoordsUpdate: Kiwi.Signal;

        /*
        * The x coordinate of the widget
        * @property _x
        * @type number
        * @private
        */
        private _x: number;
        
        /*
        * Get the x coordinate of the widget
        * @property x
        * @type number
        * @public
        */
        public get x():number {
            return this._x;
        }
        public set x(value: number) {
            this._x = value;
            this.container.style.left = this.x + "px";
            this.onCoordsUpdate.dispatch(this.x, this.y);
        }
        
        /*
        * The y coordinate of the widget
        * @property _y
        * @type number
        * @private
        */
        private _y: number;
        
        /*
        * Get the y coordinate of the widget
        * @property y
        * @type number
        * @public
        */
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            this._y = value;
            this.container.style.top = this.y + "px";
            this.onCoordsUpdate.dispatch(this.x, this.y);
        }
        
        /*
        * The list of components that the HUDWidget use's.
        * @property components
        * @type ComponentManager
        * @public
        */
        public components: Kiwi.ComponentManager;
        
        /*
        * The HTMLElement of the widget.
        * @property
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;

        /*
        * The name of the widget. Also used to identify the type of widget.
        * @property
        * @type string
        * @public
        */
        public name: string;

        /*
        * When a template has been set, this property will have a reference to the HTMLElement we can place the HUDWidget information into.
        * @property tempElement
        * @type HTMLElement
        * @public
        */
        public tempElement: HTMLElement;

        /*
        * The parent of the template container. So that when removing a template we can place it in the right spot
        * @property _tempParent
        * @type HTMLElement
        * @private
        */
        private _tempParent: HTMLElement;

        /*
        * The container element for the template
        * @property _tempContainer
        * @type HTMLElement
        * @private
        */
        private _tempContainer: HTMLElement; 

        /*
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        *
        * Can be used by itself but maybe more useful if you customise it to suit your own needs. 
        *
        * @method setTemplate
        * @param main {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param [element] {string} element - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, element?: string, ...paramsArr: any[]) {

            var containerElement: HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                return;
            }

            if (element === undefined) {
                var fieldElement = containerElement;
            } else {
                var fieldElement: HTMLElement = document.getElementById(element);
                if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                    return;
                }
            }
            
            this.tempElement = fieldElement;
            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);
        }

        /*
        * Used to remove any the template HTML from this HUDWidget.
        * 
        * @method removeTemplate
        * @public
        */
        public removeTemplate() {
            if (this.tempElement !== undefined) {
                this.container.removeChild(this._tempContainer);
                this._tempParent.appendChild(this._tempContainer);
                this.tempElement = null;
                this._tempParent = null;
                this._tempContainer = null;
            }
        }

        /*
        * Give the container element a class so that you can make it look beautiful using CSS.
        *
        * @method setStyle
        * @param cssClass {String} cssClass
        * @public
        */
        public setStyle(cssClass: string) {
            this.container.className = cssClass;
        }

        /*
        *
        * @method update
        * @public
        */
        public update() {
            this.components.update();
        }

    }
}

