
module Kiwi.Files {

    export class TextureFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, params: {}= {}) {
            super(game, params);

            if (Kiwi.DEVICE.blob) {
                this.useTagLoader = true;
                this.loadInParallel = true;
            } else {
                this.useTagLoader = true;
                this.loadInParallel = true;
            }

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "File"
        * @public
        */
        public objType() {
            return "TextureFile";
        }


        public tagLoader() {

            this.data = new Image();
            this.data.src = this.URL;

            var _this = this;
            this.data.onload = function (event) {
                _this.tagOnLoad(event);
            }
            this.data.onerror = function (event) {
                _this.tagOnError(event);
            }      

        }

        public processXHR(response) {
            
            this.data = document.createElement('img');

            var imageType = '';

            switch(this.extension ) {

                case 'jpg':
                case 'jpeg':
                    imageType = 'image/jpeg';
                    break;

                case 'png':
                    imageType = 'image/png';
                    break;

                case 'gif':
                    imageType = 'image/gif';
                    break;

            }


            //  Until they fix the TypeScript lib.d we have to use window array access
            var blob = new window['Blob']([response], { type: imageType });
            
            if (window['URL']) {
                this.data.src = window['URL'].createObjectURL(blob);
            } else if (window['webkitURL']) {
                this.data.src = window['webkitURL'].createObjectURL(blob);
            }

            (<any>this).loadSuccess();

        }

        /**
        * Revokes the object url that was added to the window when creating the image. 
        * Also tells the File that the loading is now complete. 
        * @method revoke
        * @private
        */
        private revoke() {

            if (window['URL']) {
                window['URL'].revokeObjectURL(this.data.src);
            } else if (window['webkitURL']) {
                window['webkitURL'].revokeObjectURL(this.data.src);
            }

        }



    }

}  