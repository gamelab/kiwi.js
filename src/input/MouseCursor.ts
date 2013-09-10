/**
* Kiwi - Input
* @module Kiwi
* @submodule Input
* 
*/ 

module Kiwi.Input {
    
    /**
    *
    *
    * @class MouseCursor
    *
    */
    export class MouseCursor extends Pointer {
        
        /*
        * The type of object this class is.
        * @method objType
        * @return string
        */
        public objType(): string {
            return 'MouseCursor';
        }
        
        /*
        * The offset of the mouse wheel on the X axis.
        * @property wheelDeltaX
        * @type number
        */
        public wheelDeltaX: number;
         
        /*
        * The offset of the mouse wheel on the Y axis.
        * @property wheelDeltaY
        * @type number
        */
        public wheelDeltaY: number;
         
        /*
        * If the ctrl key is down.
        * @property ctrlKey
        * @type bool
        */
        public ctrlKey: boolean;
         
        /*
        * If the shift key is down.
        * @property shiftKey
        * @type bool
        */
        public shiftKey: boolean;
         
        /*
        * If the alt key is down.
        * @property altKey
        * @type bool
        */
        public altKey: boolean;
         
        /*
        * The button that got pressed. Eg. If the LEFT mouse button was pressed this number would be 0
        * @property button
        * @type number
        */
        public button: number;
        
        /*
        * Gets executed when the mouse cursor gets initally pressed.
        * @method start
        * @param {event} event
        */
        public start(event) {
            
            this.ctrlKey = event.ctrlKey;
            this.shiftKey = event.shiftKey;
            this.altKey = event.altKey;
            this.button - event.button;

            super.start(event);
        }
        
        /*
        * Gets executed when the mouse cursor gets initally released.
        * @method stop
        * @param {event} event
        */
        public stop(event) {
            this.move(event);
            super.stop(event);
        }

        /*
        * When the mouse wheel event fires and the mouse's delta changes.
        * @method wheel
        * @param {event} event
        */
        public wheel(event) { 
            if (event['wheelDeltaX']) {
                this.wheelDeltaX = event['wheelDeltaX'];
            } else {
                this.wheelDeltaX = event.deltaX;
            }

            if (event['wheelDeltaY']) {
                this.wheelDeltaY = event['wheelDeltaY'];
            } else {
                this.wheelDeltaY = event.deltaY;
            } 
        }

    }

}
