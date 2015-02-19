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
	*   @param {Object} [params.metadata={}] Any metadata to be associated with the file. 
	*   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
	*   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
	*   @param [params.type=UNKNOWN] {Number} The type of file this is. 
	*   @param [params.tags] {Array} Any tags to be associated with this file.
	*   @param [params.xhrLoading=false] {Boolean} If xhr + arraybuffer loading should be used instead of tag loading. 
	* @return {Kiwi.Files.TextureFile} 
	*
	*/
	export class TextureFile extends Kiwi.Files.File {

		constructor(game: Kiwi.Game, params: any = {}) {
			super(game, params);

			if (params.xhrLoading) { 
				this.useTagLoader = false;
				this._loadInParallel = false;
			} else {
				this.useTagLoader = true;
				this._loadInParallel = true;
			}

			if (!Kiwi.Utils.Common.isUndefined(params.crossOrigin) ) {
				this.crossOrigin = params.crossOrigin;
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

		/**
		* For tag loading only. The crossOrigin value applied to loaded images. Very often this needs to be set to 'anonymous'
		* @property crossOrigin
		* @type String
		* @default ''
		* @public
		*/
		public crossOrigin: string = '';

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

			if (this.crossOrigin) {
				this.data.crossOrigin = this.crossOrigin;
			}

			this.data.onload = () => this.loadSuccess();
			this.data.onerror = (event) => this.loadError(event);

		}

		/**
		* Gets the response data (which is an arraybuffer), creates a Blob from it 
		* and creates an objectURL from it.
		*
		* @method processXhr
		* @param response {Any} The data stored in the 'xhr.response' tag
		* @protected
		*/
		protected processXhr( response:any ) {
			
			this.data = document.createElement('img');
            var blob = new Blob([response], { type: this.type });

            this.data.addEventListener('load',(event) => function (event) {
                this.loadSuccess();
            });

			if (window['URL']) {
				this.data.src = window['URL'].createObjectURL(blob);
			} else if (window['webkitURL']) {
				this.data.src = window['webkitURL'].createObjectURL(blob);
			}

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

		/**
		* Destroys all external object references on this object.
		* @method destroy
		* @since 1.2.0
		* @public
		*/
		public destroy() {

			if (!this.useTagLoader) {
				this.revoke();
			}

			super.destroy();

		}

	}

}
