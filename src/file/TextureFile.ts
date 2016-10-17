module Kiwi.Files {

	/**
	@module Kiwi
	@submodule Files
	**/

	export class TextureFile extends Kiwi.Files.File {

		/**
		TextureFile which contains settings, loading,
		and processing information for textures/images in Kiwi.

		Contains two methods of loading. XHR + arraybuffer, and tag loading.

		@class TextureFile
		@namespace Kiwi.Files
		@extends Kiwi.Files.File
		@since 1.2.0
		@constructor
		@param game {Kiwi.Game} Game that this file is for
		@param params {object} Composite parameter object
			@param params.key {string} User defined name for this file.
				This would be how the user would access it in the file store.
			@param params.url {string} Location of the file to be loaded.
			@param {object} [params.metadata={}] Any metadata
				to be associated with the file.
			@param [params.state=null] {Kiwi.State} State that this file
				belongs to. Used for defining global assets vs local assets.
			@param [params.fileStore=null] {Kiwi.Files.FileStore} Filestore
				that this file should be saved in automatically when loaded.
			@param [params.type=UNKNOWN] {number} Type of file this is
			@param [params.tags] {array} Tags to be associated with this file
			@param [params.xhrLoading=false] {boolean} If xhr + arraybuffer
				loading should be used instead of tag loading
		**/

		constructor( game: Kiwi.Game, params: any = {} ) {
			super( game, params );

			if ( params.xhrLoading ) {
				this.useTagLoader = false;
				this._loadInParallel = false;
			} else {
				this.useTagLoader = true;
				this._loadInParallel = true;
			}

			if ( !Kiwi.Utils.Common.isUndefined( params.crossOrigin ) ) {
				this.crossOrigin = params.crossOrigin;
			}

		}


		public objType() {

			/**
			Return the type of this object.

			@method objType
			@return {string} "TextureFile"
			@public
			**/

			return "TextureFile";
		}


		/**
		For tag loading only. The crossOrigin value applies to loaded images.
		Very often this needs to be set to "anonymous".

		@property crossOrigin
		@type String
		@default ""
		@public
		**/
		public crossOrigin: string = "";


		protected _load() {

			/**
			Initialise the loading method.

			Tagloading is the default, but also supports XHR + arraybuffer.

			@method _load
			@protected
			**/

			this.attemptCounter++;

			if ( this.useTagLoader ) {
				this.tagLoader();
			} else {
				this.xhrLoader( "GET", "arraybuffer" );
			}

		}


		private tagLoader() {

			/**
			Perform tag loading.

			@method tagLoader
			@private
			**/

			this.data = new Image();
			this.data.src = this.URL;

			if ( this.crossOrigin ) {
				this.data.crossOrigin = this.crossOrigin;
			}

			this.data.onload = () => this.loadSuccess();
			this.data.onerror = ( event ) => this.loadError( event );

		}


		protected processXhr( response:any ) {

			/**
			Get the response data (which is an arraybuffer ),
			create a Blob from it, and create an objectURL from it.

			@method processXhr
			@param response {Any} The data stored in the "xhr.response" tag
			@protected
			**/

			// Careful, Blobs are not supported on CocoonJS Canvas+
			this.data = document.createElement( "img" );
			var blob = new Blob( [ response ], { type: this.type } );

			var that = this;
			this.data.addEventListener( "load", function ( event ) {
				that.loadSuccess();
			} );

			if ( window[ "URL" ] ) {
				this.data.src = window[ "URL" ].createObjectURL( blob );
			} else if ( window[ "webkitURL" ] ) {
				this.data.src = window[ "webkitURL" ].createObjectURL( blob );
			}

		}


		private revoke() {

			/**
			Revoke the object url that was added to the window when creating
			the image. Also tells the `File` that loading is now complete.

			@method revoke
			@private
			**/

			if ( window[ "URL" ] ) {
				window[ "URL" ].revokeObjectURL( this.data.src );
			} else if ( window[ "webkitURL" ] ) {
				window[ "webkitURL" ].revokeObjectURL( this.data.src );
			}

		}


		public destroy() {

			/**
			Destroy all external object references on this object.

			@method destroy
			@since 1.2.0
			@public
			**/

			if ( !this.useTagLoader ) {
				this.revoke();
			}

			super.destroy();

		}

	}

}
