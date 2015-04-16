/**
* 
* @module Kiwi
* @submodule Files 
* 
*/

module Kiwi.Files {

	/**
	* DataFile which contains settings, loading, and processing details for Data files to be used. 
	* There is no tag loader support for this method of loading.
	* 
	* @class DataFile
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
	*   @param [params.parse] {Boolean} If the response should be parsed after the file is loaded. Only used with JSON and XML types of Data files.
	* @return {Kiwi.Files.DataFile} 
	*
	*/
	export class DataFile extends Kiwi.Files.File {

		constructor(game: Kiwi.Game, params: {} = {}) {
			super(game, params);

			this.useTagLoader = false;
			this._loadInParallel = false;

		}

		/**
		* Sets properties for this instance based on an object literal passed. Used when the class is being created.
		*
		* @method parseParams
		* @param [params] {Object}
		*   @param [params.metadata={}] {Object} Any metadata to be associated with the file. 
		*   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
		*   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
		*   @param [params.type=UNKNOWN] {Number} The type of file this is. 
		*   @param [params.tags] {Array} Any tags to be associated with this file.
		*   @param [params.parse] {Boolean} If the response should be parsed after the file is loaded. 
		* @protected 
		*/
		protected parseParams(params: any) {
			super.parseParams(params);

            if (!Kiwi.Utils.Common.isUndefined(params.parse)) {
                this.parse = params.parse;
            } else {
                this.parse = false;
            }

		}


		/**
		* If the response should be parsed (using the appropriate method) after loading.
		* Example: If set to the true and the dataType set is json, then the response will be sent through a JSON.parse call. 
		*
		* @property parse
		* @type boolean
		* @default false
		* @public
		*/
		public parse: boolean;

		//this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA

		/**
		* Returns the type of this object
		* @method objType
		* @return {String} "DataFile"
		* @public
		*/
		public objType() {
			return "DataFile";
		}


		/**
		* Increments the counter, and calls the approprate loading method.
		* @method _load
		* @protected
		*/
		protected _load() {

			this.attemptCounter++;

			//Special check for binary data. Change the loading type
			if ( this.dataType === Kiwi.Files.File.BINARY_DATA ) {
				this.xhrLoader('GET', 'arraybuffer');
			} else {
				this.xhrLoader('GET', 'text');
			}

		}

		/**
		* Handles decoding the arraybuffer into audio data.
		* @method processXhr
		* @param response
		* @protected
		*/
		protected processXhr(response: any) {

			if (!this.parse) {
				this.data = response;
				this.loadSuccess();
				return;
			}

			switch (this.dataType) {

				case Kiwi.Files.File.JSON:
					this.processJSON(response);
					break;

				case Kiwi.Files.File.XML:
					this.parseXML(response);
					break;

				case Kiwi.Files.File.TEXT_DATA:
				case Kiwi.Files.File.BINARY_DATA:
				default:
					this.data = response;
					break;
			}


		}

		/**
		* Attempts to parse a string which is assumed to be XML. Called when 'parse' is set to true. 
		* If valid 'loadSuccess' is called, otherwise 'loadError' is executed
		*  
		* @method parseXML
		* @param data {String}
		* @private 
		*/
		private parseXML(data: string) {

			Kiwi.Log.log('Kiwi.Files.DataFile: Data loaded is being parsed as XML.', '#loading', '#parsing');

			if (window['DOMParser']) {

				var parser = new DOMParser();
				this.data = parser.parseFromString(data, "text/xml");

			} else {

				this.data = new ActiveXObject("Microsoft.XMLDOM");
				this.data.async = "false";
				this.data.loadXML(data);

			}

			if (!this.data || !this.data.documentElement || this.data.getElementsByTagName("parsererror").length) {
				this.loadError('XML parse error.');
			} else {
				this.loadSuccess();
			}
		}

		/**
		* Attempts to parse a string which is assumed to be JSON. Called when 'parse' is set to true. 
		* If valid 'loadSuccess' is called, otherwise 'loadError' is executed
		*  
		* @method processJSON
		* @param data {String}
		* @private 
		*/
		private processJSON( data:string ) {

			Kiwi.Log.log('Kiwi.Files.DataFile: Data loaded is being parsed as JSON.', '#loading', '#parsing');

			try {
				this.data = JSON.parse(data);
				this.loadSuccess();

			} catch (e) {
				this.loadError(e);

			}

		}

	}

}
