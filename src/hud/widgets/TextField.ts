

module Kiwi.HUD {

    // Class
    export class TextField extends Kiwi.HUD.HUDWidget {
        // Constructor
        constructor(text:string,x:number,y:number) {
            super("textField",x,y);
            
            this._text = text;

            this._textField = this.container;
            this._textField.innerText = text;

        }

        /**
        * The text current being displayed
        * @private
        **/
        private _text: string;

        /**
        * @private
        **/
        private _textField: HTMLElement;
        
        /**
        * Set Template allows you 
        *
        * @method setTemplate
        * @param {string} main - ID of the DOM element you would like to use.
        * @param {string} field - ID of an element inside of the main param. Location that the text will be.
        * @return {boolean}
        **/
        public setTemplate(main: string, field?: string) {

            this._textField.innerText = '';
            super.setTemplate(main, field);

            if (this.tempElement !== undefined) {
                this._textField = this.tempElement;
            }
            this._textField.innerText = this._text;

        }

        public removeTemplate() {
            
            super.removeTemplate();

            //reset the text field
            this._textField = this.container;
            this._textField.innerText = this._text;
        }

        public text(val?: string):string {
            if (val !== undefined) {
                this._text = val;
            }
            return this._text;
        }

        public update() {
            this._textField.innerText = this._text;
            super.update();
        }

      
    }

}
