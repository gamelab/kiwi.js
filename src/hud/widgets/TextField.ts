

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
        * @private
        **/
        private _tempParent: HTMLElement;
        
        /**
        * @private
        **/
        private _tempContainer: HTMLElement;
        
        /**
        * Set Template allows you 
        *
        * @method setTemplate
        * @param {string} main - ID of the DOM element you would like to use.
        * @param {string} field - ID of an element inside of the main param. Location that the text will be.
        * @return {boolean}
        **/
        public setTemplate(main: string, field: string):boolean {

            var containerElement:HTMLElement = document.getElementById(main);
            if (containerElement === undefined) {
                console.log('Container element not found');
                return false;
            }
            
            var fieldElement:HTMLElement = document.getElementById(field);
            if (fieldElement === undefined || containerElement.contains(fieldElement) === false) {
                console.log('Field element not found inside container');
                return false;
            }



            //remove text from container, add it to the field
            this.container.innerText = '';
            this._textField = fieldElement;
            this._textField.innerText = this._text;

            //add the template to the HUD
            this._tempContainer = containerElement;
            this._tempParent = containerElement.parentElement;
            this._tempParent.removeChild(containerElement);
            this.container.appendChild(containerElement);

            return true;
        }

        public removeTemplate():boolean {
            //check if it is not the container
            if (this._textField === this.container) {
                console.log('No template is currently in affect');
                return false;
            }

            //remove the container
            this.container.removeChild(this._tempContainer);
            this._tempParent.appendChild(this._tempContainer);

            //reset the text field
            this._textField = this.container;
            this._textField.innerText = this._text;
            
            return true;
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
