/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
    
    /**
    * TextureFile which contains settings, loading, and processing information for textures/images in Kiwi.
    *
    * Contains two methods of loading. XHR + arraybuffer and also tag loading.
    *
    * @class TextureFile
    * @namespace Kiwi.Files
    * @extends Kiwi.Files.File
    * @since 1.2.0
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store. 
    *   @param params.url {String} Location of the file to be loaded.
    *   @param [params.metadata={}] {Object} Any metadata to be associated with the file. 
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is. 
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    * @return {Kiwi.Files.TextureFile} 
    *
    */
    export class TextureFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, params: {}= {}) {
            super(game, params);

            if (Kiwi.DEVICE.blob) {
                this.useTagLoader = true;
                this._loadInParallel = true;
            } else {
                this.useTagLoader = true;
                this._loadInParallel = true;
            }

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "TextureFile"
        * @public
        */
        public objType() {
            return "TextureFile";
        }

        //this.dataType === File.IMAGE || this.dataType === File.SPRITE_SHEET || this.dataType === File.TEXTURE_ATLAS

        /**
        * Initialises the loading method.
        * Tagloading is the default but also supports XHR + arraybuffer.
        * @method _load
        * @protected
        */
        protected _load() {

            this.attemptCounter++;

            if (this.useTagLoader) {
                this.tagLoader();
            } else {
                this.xhrLoader( 'GET', 'arraybuffer' );
            }

        }

        /**
        * Contains the functionality for tag loading
        * @method tagLoader
        * @private
        */
        private tagLoader() {

            this.data = new Image();
            this.data.src = this.URL;

            this.data.onload = () => this.loadSuccess();
            this.data.onerror = () => this.loadError(event);

        }

        /**
        * Gets the response data (which is an arraybuffer), creates a Blob from it 
        * and creates an objectURL from it.
        *
        * @method processXHR
        * @param response {Any} The data stored in the 'xhr.response' tag
        * @protected
        */
        protected processXHR( response:any ) {
            
            this.data = document.createElement('img');
            var blob = new Blob([response], { type: this.type });
            
            if (window['URL']) {
                this.data.src = window['URL'].createObjectURL(blob);
            } else if (window['webkitURL']) {
                this.data.src = window['webkitURL'].createObjectURL(blob);
            }

            this.loadSuccess();

        }

        /**
        * Revokes the object url that was added to the window when creating the image. 
        * Also tells the File that the loading is now complete. 
        * 
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