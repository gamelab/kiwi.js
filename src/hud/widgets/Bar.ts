/**
* @module HUD
* @submodule Widget
*/

module Kiwi.HUD.Widget {
    
    /**
    * Used for displaying of information in a bar like of format. Example: Amount of health remaining for a character.
    * This class creates a 'innerbar' div inside of its main container which you can apply styles to.
    * You can control the minimum/maximum and current values of the bar through the Counter widget.
    * 
    * @class Bar
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor 
    * @param game {Game} The game that this bar belongs to.
    * @param current {number} The current value of the bar.
    * @param max {number} The maximum value that there can be.
    * @param x {number} The coordinates of this widget on the x-axis.
    * @param y {number} The cooridnates of this widget on the y-axis.
    * @param [width=120] {number} The width of the widget. Defaults to 120.
    * @param [height=20] {number} The height of the widget. Defaults to 20.
    * @param [color='#000'] {string} The default color of the inner bar. Defaults to #000 (black).
    * @return {Bar}
    */
    export class Bar extends Kiwi.HUD.HUDWidget {
        
        constructor(game:Kiwi.Game, current: number, max:number, x:number,y:number, width:number=120, height:number=20, color='#000') {
            super(game,"bar", x, y);
            this._horizontal = true;
            this.class = 'kiwi-bar-widget kiwi-widget';

            if (this._manager.supported) {
                if (this._device == Kiwi.TARGET_BROWSER) {
                    this._bar = document.createElement('div');
                    this._bar.className = 'kiwi-innerbar-widget';
                    this._bar.style.backgroundColor = color;
                    this.bar = this._bar;
                    this.container.appendChild(this.bar);
                }

                this.counter = this.components.add(new Kiwi.HUD.HUDComponents.Counter(this, current, max, 0));
                this.counter.updated.add(this.updateCSS, this);

                this.width = width;
                this.height = height;

                this._bar.style.height = '100%';
                this._bar.style.width = '100%';

                this.updateCSS();
            }
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'BarWidget';
        }

        /**
        * The width of the container
        * @property _width
        * @type number
        * @private
        */
        private _width: number;
        
        /**
        * The width of the container
        * @property width
        * @type number
        * @public
        */
        public get width(): number {
            return this._width;
        }
        public set width(value: number) {
            if(this._device == Kiwi.TARGET_BROWSER) {
                this.container.style.width = value + "px";
            }

            this._width = value;
        }
        
        /**
        * The height of the container
        * @property _height
        * @type number
        * @private
        */
        private _height: number;
        
        /**
        * The height of the container
        * @property height
        * @type number
        * @public
        */
        public get height(): number {
            return this._height;
        }
        public set height(value: number) {
            if (this._device == Kiwi.TARGET_BROWSER) {
                this.container.style.height = value + "px";
            }
            this._height = value;
        }
        
        /**
        * Knows if this bar is ment to be horizontal or veritical
        * @property _horizontal
        * @type boolean
        * @private 
        */
        private _horizontal: boolean;
        
        /**
        * The HTMLElement that is currently being used as the 'bar'.
        * @property bar
        * @type HTMLElement
        * @public
        */
        public bar: HTMLElement;

        /**
        * A reference to the HTMLElement that this class always generates.
        * @property _bar
        * @type HTMLElement
        * @private
        */
        private _bar: HTMLElement;
        
        /**
        * The counter component.
        * @property counter
        * @type Counter
        * @public
        */
        public counter: Kiwi.HUD.HUDComponents.Counter;
        
        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property horizontal
        * @type boolean
        * @public
        */
        public get horizontal(): boolean {
            return this._horizontal;
        }
        public set horizontal(val: boolean) {
            this._horizontal = val;
            this.updateCSS();
        }

        /**
        * Used to set the bar to be horizontal or vertical by passing a boolean.
        * @property verticle
        * @type boolean
        * @public
        */
        public get vertical(): boolean {
            return !this._horizontal;
        }
        public set vertical(val: boolean) {
            this._horizontal = !val;
            this.updateCSS();
        }

        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * Currently not supported. 
        *
        * @method setTemplate
        * @param main {string} ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget.
        * @param innerbar {string} ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, innerbar?: string) {

            if(this._device == Kiwi.TARGET_BROWSER) {
                super.setTemplate(main, innerbar);

                if (this.tempElement !== undefined) {
                    this.bar = this.tempElement;
                }
            }
        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Current not supported. 
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate() {
            if (this._device == Kiwi.TARGET_BROWSER) {
                super.removeTemplate();

                this.bar = this._bar;
                this.container.appendChild(this.bar);
                this.updateCSS();
            }
        }

        /**
        * Will be called when the range has been updated and thus you will want to preform the render of the bar here.
        * This should be overriden by subclasses so that you have your own custom bars. 
        * @method updateCSS
        * @public
        */
        public updateCSS() {
            
            if (this.horizontal === true) {
                this.bar.style.width = String(this.counter.currentPercent()) + '%';
                this.bar.style.height = '100%';
            } else {
                this.bar.style.height = String(this.counter.currentPercent()) + '%';
                this.bar.style.width = '100%';
            }

        }

    }


}