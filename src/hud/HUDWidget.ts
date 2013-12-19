/**
*
* @module Kiwi
* @submodule HUD
*/

module Kiwi.HUD {

    /**
    * The HUDWidget is an abstract class containing the fundamental properties and methods that every HUDWidget needs to have.
    * This class is designed to be extended from and thus objects should not directly instantiate it.
    *
    * @class HUDWidget
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game}  The game that this HUDWidget belongs to.
    * @param name {string} Name of the type of HUDWidget.
    * @param x {number} The coordinates of this HUDWidget on the x-axis.
    * @param y {number} The coordinates of this HUDWidget on the y-axis.
    * @return {HUDWidget}
    */
    export class HUDWidget {
        
        constructor(game:Kiwi.Game,name: string,x:number,y:number) {
            this.name = name;
            this.game = game;
            this._manager = this.game.huds;
            this._device = this.game.deviceTargetOption;
            this.components = new Kiwi.ComponentManager(Kiwi.HUD_WIDGET, this);

            if (this._manager.supported) {

                if(this._device === Kiwi.TARGET_BROWSER) {
                    this.container = <HTMLDivElement>document.createElement("div");
                    this.container.id = 'HUD-widget-' + this.game.rnd.uuid();
                    this.container.className = 'HUD-widget';
                    this.container.style.position = "absolute";
                }
                
                this.onCoordsUpdate = new Kiwi.Signal();
                this.x = x;
                this.y = y;
            }
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'HUDWidget';
        }

        /**
        * The HUDManager that this widget 'belongs' to.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _manager
        * @type HUDManager
        * @protected
        */
        public _manager: Kiwi.HUD.HUDManager;
        
        /**
        * The type of device that this game is being targeted at. Same as the deviceTargetOption on the game class.
        * Used to detirmine how the HUD is to be managed behind the scenes.
        * This is mainly indented for INTERNAL Kiwi use only and is public so that sub classes can have a reference to it.
        * @property _device
        * @type _device
        * @protected
        */
        public _device: number;

        /**
        * The game that this HUDWidget belongs to.
        * @property game
        * @type Game
        * @public
        */
        public game: Kiwi.Game;

        /**
        * A quick way to reference the style object that exists on the container element of this widget.
        * @property style
        * @type any
        * @public
        */
        public get style():any {
            if (this._device === Kiwi.TARGET_BROWSER) {
                return this.container.style;
            }
        }
        public set style(val: any) {
            if (this._device === Kiwi.TARGET_BROWSER) {
                this.container.style = val;
            }
        }

        /**
        * Called when the coordinates of the HUD Widget updates.
        * @property onCoordsUpdate
        * @type Signal
        * @public
        */
        public onCoordsUpdate: Kiwi.Signal;

        /**
        * The x coordinate of the widget
        * @property _x
        * @type number
        * @private
        */
        private _x: number;
        
        /**
        * Get the x coordinate of the widget
        * @property x
        * @type number
        * @public
        */
        public get x():number {
            return this._x;
        }
        public set x(value: number) {
            if (this._manager.supported) {
                this._x = value;
                if(this._device == Kiwi.TARGET_BROWSER) 
                    this.container.style.left = this.x + "px";
                
                this.onCoordsUpdate.dispatch(this.x, this.y);
            }
        }
        
        /**
        * The y coordinate of the widget
        * @property _y
        * @type number
        * @private
        */
        private _y: number;
        
        /**
        * Get the y coordinate of the widget
        * @property y
        * @type number
        * @public
        */
        public get y(): number {
            return this._y;
        }
        public set y(value: number) {
            if (this._manager.supported) {
                this._y = value;
                if(this._device == Kiwi.TARGET_BROWSER)
                    this.container.style.top = this.y + "px";

                this.onCoordsUpdate.dispatch(this.x, this.y);
            }    
        }
        
        /**
        * The list of components that the HUDWidget use's.
        * @property components
        * @type ComponentManager
        * @public
        */
        public components: Kiwi.ComponentManager;
        
        /**
        * The HTMLDivElement that this widget is using.
        * @property
        * @type HTMLDivElement
        * @public
        */
        public container: HTMLDivElement;

        /**
        * The name of the widget which is used to identify the type of widget.
        * @property
        * @type string
        * @public
        */
        public name: string;

        /**
        * When a template has been set, this property will have a reference to the HTMLElement we can place the HUDWidget information into.
        * Currently doesn't have that great support.
        * @property tempElement
        * @type HTMLElement
        * @public
        */
        public tempElement: HTMLElement;

        /**
        * The parent of the template container. So that when removing a template we can place it in the right spot
        * Currently doesn't have that great support.
        * @property _tempParent
        * @type HTMLElement
        * @private
        */
        private _tempParent: HTMLElement;

        /**
        * The container element for the template
        * Currently doesn't have that great support.
        * @property _tempContainer
        * @type HTMLElement
        * @private
        */
        private _tempContainer: HTMLElement; 

        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        *
        * Can be used by itself but maybe more useful if you customise it to suit your own needs. 
        * Currently doesn't have that great support.
        *
        * @method setTemplate
        * @param main {string} main - ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param [element] {string} element - ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, element?: string, ...paramsArr: any[]) {

            if (this._device == Kiwi.TARGET_BROWSER) {
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

        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have that great support.
        * 
        * @method removeTemplate
        * @public
        */
        public removeTemplate() {
            if (this._device == Kiwi.TARGET_BROWSER) {
                if (this.tempElement !== undefined) {
                    this.container.removeChild(this._tempContainer);
                    this._tempParent.appendChild(this._tempContainer);
                    this.tempElement = null;
                    this._tempParent = null;
                    this._tempContainer = null;
                }
            }
        }

        /**
        * The class name/s that the container element that this HUDWidget current has.
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

        /**
        * The game update loop.
        * @method update
        * @public
        */
        public update() {
            this.components.update();
        }

        /**
        * 
        * @method destroy
        * @public
        */
        public destroy() {
            delete this.game;
            delete this._manager;
            delete this._device;
            if (this.onCoordsUpdate) this.onCoordsUpdate.dispose();
            delete this.onCoordsUpdate;
            //remove the elements....
        }

    }
}

