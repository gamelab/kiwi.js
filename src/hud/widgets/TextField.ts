
module Kiwi.HUD {

    // Class
    export class TextField extends Kiwi.HUD.HUDWidget {
        // Constructor
        constructor(text:string,x:number,y:number) {
            super("textField",x,y);
            
            this._text = text;
            this.container.innerText = text;

        }

        
        
        private _text:string;

        public text(val?: string):string {
            if (val !== undefined) {
                this._text = val;
            }
            return this._text;
        }

        public update() {
            console.log("update widget textfield")
            this.container.innerText = this._text;
        }

        


      
    }

}
