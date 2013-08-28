/// <reference path="../core/Game.ts" />
/// <reference path="Pointer.ts" />

module Kiwi.Input {

    export class MouseCursor extends Pointer {
        
        public objType(): string {
            return 'MouseCursor';
        }

        public wheelDeltaX: number;
         
        public wheelDeltaY: number;
         
        public ctrlKey: bool;
         
        public shiftKey: bool;
         
        public altKey: bool;
         
        public button: number;
         
        public start(event) {
            
            this.ctrlKey = event.ctrlKey;
            this.shiftKey = event.shiftKey;
            this.altKey = event.altKey;
            this.button - event.button;

            super.start(event);
        }

        public stop(event) {
            this.move(event);
            super.stop(event);
        }

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
