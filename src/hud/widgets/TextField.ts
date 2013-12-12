/**
* HUD Widgets are objects that are generally placed on to a HUD Display for displaying and managing information that the user would always need to see.
* An example of such information would be: the Health remaining, amount of ammo left, time they have left, e.t.c.
* And each one of those examples would have its own widget.
*
* @module HUD
* @submodule Widget
* @main Widget
*/

module Kiwi.HUD.Widget {

    /**
    * A Widget that is used for the displaying of text on the HUD. 
    * Foreach TextField you can add some prefix/suffix text, which is more useful on classes extending this one.
    *
    * @class TextField
    * @extends HUDWidget
    * @namespace Kiwi.HUD.Widget
    * @constructor
    * @param game {Game} The game that this textfield belongs to.
    * @param text {string} The text on this textfield.
    * @param x {number} The x coordinates
    * @param y {number} The y coordinates
    * @return {TextField} 
    */
    export class TextField extends Kiwi.HUD.HUDWidget {
        
        constructor(game:Kiwi.Game,text:string,x:number,y:number) {
            super(game, "textField", x, y);

            this.class = 'kiwi-textfield-widget kiwi-widget';

            if (this._manager.supported) {
                if (this._device === Kiwi.TARGET_BROWSER) {
                    this._textField = this.container;
                    this._textField.innerHTML = text;
                }
            }
        }

        /**
        * Returns the type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'TextFieldWidget';
        }

        /**
        * The text current being displayed inside this textfield.
        * @property _text
        * @type string
        * @private
        */
        private _text: string;

        /**
        * The htmlelement that is being used as the textfield.
        * Initially when created this is the same as the container HTMLDivElement.
        * @property _textField
        * @type HTMLElement
        * @private
        */
        private _textField: HTMLElement;
        
        /**
        * This method is used to remove existing DOM elements and place them inside a HUDWidget's container element.
        * Useful so that when making HUD Widgets the developer can style HUDWidgets without having to create/write to much javascript.
        * 
        * Currently doesn't have great support.
        *
        * @method setTemplate
        * @param main {string} ID of an HTMLElement. This element should contain all of the elements you would like to place inside the HUDWidget. 
        * @param icon {string} ID of an HTMLElement that resides inside of the main param. This is the element that the HUDWidget can use to populate with information. E.g. Your score, health remaining, the icon, e.t.c.
        * @public
        */
        public setTemplate(main: string, field?: string) {
            if (this._device === Kiwi.TARGET_BROWSER) {
                this._textField.innerText = '';
                super.setTemplate(main, field);

                if (this.tempElement !== undefined) {
                    this._textField = this.tempElement;
                }
                this._textField.innerHTML = this._text;
            }
        }

        /**
        * Used to remove any the template HTML from this HUDWidget.
        * Currently doesn't have great support.
        *
        * @method removeTemplate
        * @public
        */
        public removeTemplate() {
            if (this._device === Kiwi.TARGET_BROWSER) {
                super.removeTemplate();

                if (this._device === Kiwi.TARGET_BROWSER) {
                    this._textField = this.container;
                    this._textField.innerHTML = this._text;
                }
            }
        }

        /**
        * The text that is currently being displayed inside the textfield.
        * @property text
        * @type string
        * @public
        */
        public set text(val: string) {
            if (this._manager.supported) {
                if (this._device === Kiwi.TARGET_BROWSER) {

                    if (this._prefix !== '') val = this._prefix + val;
                    if (this._suffix !== '') val += this._suffix;

                    this._text = val;
                    this._textField.innerHTML = this._text;
                }
            }
        }
        public get text():string {
            return this._text;
        }
        
        /**
        * A string that is to be added in-front of the score. Can contain HTMLElements.
        * @property _prefix
        * @type string
        * @default ''
        * @private
        */
        private _prefix: string = '';

        /**
        * A string that is to be added after the score. Can contain HTMLElements.
        * @property _suffix
        * @type string
        * @default ''
        * @private
        */
        private _suffix: string = '';

        /**
        * A string that is to be added after the score. Can contain HTMLElements.
        * @property _suffix
        * @type string
        * @default ''
        * @public
        */
        public set suffix(val: string) {
            this._suffix = val;
            this._updateText();
        }
        public get suffix(): string {
            return this._suffix;
        }

        /**
        * A string that is to be added in-front of the score. Can contain HTMLElements.
        * @property _prefix
        * @type string
        * @default ''
        * @public
        */
        public set prefix(val: string) {
            this._prefix = val;
            this._updateText();
        }
        public get prefix(): string {
            return this._prefix;
        }

        /**
        * This method is intended to be overriden by subclasses which functions update the text being displayed.
        * @method _updateText
        * @protected
        */
        public _updateText() {
            //..your code here
            this.text = this._text;
        }

    }

}
