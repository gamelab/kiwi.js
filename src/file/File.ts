/**
@module Kiwi
@submodule Files
**/

module Kiwi.Files {

	export class File {

		/**
		Base class which handles the loading of an external data file.
		TextureFile, AudioFile contain fallback loading via tags
		and all extended Files contain methods for processing the files.

		Also can contain information about the file
		(like file size, last modified, etc).
		Uses an object literal in its constructor since 1.2
		(which is preferred), but also contains previous construction support.

		@class File
		@namespace Kiwi.Files
		@constructor
		@param game {Kiwi.Game} Game that this file is for
		@param params {object} Options for this file
			@param params.key {string} User defined name for this file.
				How the user accesses it in the file store.
			@param params.url {string} Location of the file to be loaded
			@param [params.metadata={}] {object} Any metadata to be associated
				with the file
			@param [params.state=null] {Kiwi.State} State that this file
				belongs to. Used for defining global assets vs local assets.
			@param [params.fileStore=null] {Kiwi.Files.FileStore} Filestore
				that this file should be saved in when loaded
			@param [params.type=UNKNOWN] {number} Type of file this is.
				Choose one of the following:
				* Kiwi.Files.AUDIO
				* Kiwi.Files.BINARY_DATA
				* Kiwi.Files.IMAGE
				* Kiwi.Files.JSON
				* Kiwi.Files.SPRITE_SHEET
				* Kiwi.Files.TEXT_DATA
				* Kiwi.Files.TEXTUREATLAS
				* Kiwi.Files.UNKNOWN
				* Kiwi.Files.XML
			@param [params.tags] {array} Any tags
				to be associated with this file
			@param [params.timeout=TIMEOUT_DELAY] {number} Timeout delay
				when loading via ajax
		**/

		constructor( game: Kiwi.Game, params:any ) {

			this.game = game;

			this.onComplete = new Kiwi.Signal;

			this.onProgress = new Kiwi.Signal;

			if ( Kiwi.Utils.Common.isNumeric( params ) ) {

				// Deprecate
				this._parseParamsOld( params, arguments[ 2 ], arguments[ 3 ], arguments[ 4 ], arguments[ 5 ] );

			} else {

				this.key = params.key;

				this._assignFileDetails( params.url );

				this.parseParams( params );
			}
		}

		private _parseParamsOld(
			dataType: number,
			url: string,
			name: string = "",
			saveToFileStore: boolean = true,
			storeAsGlobal: boolean = true ) {

			/**
			Assign properties and variables for the constructor
			as in pre 1.2 Kiwi versions.

			@method _parseParamsOld
			@since 1.2.0
			@param dataType {number} Type of file that is being loaded.
				For this you can use the STATIC properties that are
				located on this class for quick code completion.
			@param path {string} Location of the file that is to be loaded
			@param [name=""] {string} A name for the file.
				If no name is specified then the file's name will be used.
			@param [saveToFileStore=true] {boolean} If the file should be
				saved on the file store or not.
			@param [storeAsGlobal=true] {boolean} If this file should be
				stored as a global file, or if it should be destroyed
				when this state gets switched out.
			@private
			**/

			this.dataType = dataType;

			this._assignFileDetails( url );

			if ( saveToFileStore ) {
				this.fileStore = this.game.fileStore;
			}

			if ( this.game.states.current && !storeAsGlobal ) {
				this.ownerState = this.game.states.current;
			}

		}

		protected parseParams( params: any ) {

			/**
			Set properties for this instance based on an object literal passed.
			Used when the class is being created.

			@method parseParams
			@since 1.2.0
			@param [params] {object}
				@param [params.metadata={}] {object} Any metadata
					to be associated with the file.
				@param [params.state=null] {Kiwi.State} State this file
					belongs to.
					Used for defining global assets vs local assets.
				@param [params.fileStore=null] {Kiwi.Files.FileStore} Filestore
					that this file should be save in automatically when loaded.
				@param [params.type=UNKNOWN] {number} Type of file this is
				@param [params.tags] {array} Any tags to be associated
					with this file.
				@param [params.timeout=TIMEOUT_DELAY] {number} Sets the
					timeout delay when loading via ajax.
			@protected
			**/

			this.fileStore = params.fileStore || null;
			this.ownerState = params.state || null;
			this.metadata = params.metadata || {};

			if ( Kiwi.Utils.Common.isUndefined( params.timeout ) ) {
				this.timeOutDelay = params.timeout;
			} else {
				this.timeOutDelay = Kiwi.Files.File.TIMEOUT_DELAY;
			}

			if ( Kiwi.Utils.Common.isUndefined( params.type ) ) {
				this.dataType = File.UNKNOWN;
			} else {
				this.dataType = params.type;
			}

			if ( params.tags && Kiwi.Utils.Common.isArray( params.tags ) ) {

				for ( var i = 0; i < params.tags.length; i++ ) {
					this.addTag( params.tags[ i ] );
				}

			}

		}

		private _assignFileDetails( url:string ) {

			/**
			Gets the file details from the URL passed.
			Name, extension, and path are extracted.

			@method _assignFileDetails
			@param url {string} Path to resource
			@private
			@since 1.2.0
			**/

			this.URL = url;

			if ( url.lastIndexOf( "/" ) > -1 ) {
				this.name = url.substr( url.lastIndexOf( "/" ) + 1 );
				this.path = url.substr( 0, url.lastIndexOf( "/" ) + 1 );

			} else {
				this.path = "";
				this.name = url;

			}

			// Not safe if there is a query string after the file extension
			this.extension =
				url.substr( url.lastIndexOf( "." ) + 1 ).toLowerCase();
		}


		/**
		Returns the type of this object

		@method objType
		@return {string} "File"
		@public
		**/
		public objType() {
			return "File";
		}

		/**
		Game this file belongs to

		@property game
		@type Kiwi.Game
		@since 1.2.0
		@public
		**/
		public game: Kiwi.Game;


		/*
		---------------
		Generic Properties
		---------------
		*/

		/**
		Indicates if this file can be loaded in parallel to other files.
		This is usually only used files are using the tag loaders and not XHR.

		@property _loadInParallel
		@type boolean
		@default false
		@since 1.2.0
		@protected
		**/
		protected _loadInParallel: boolean = false;

		/**
		READ ONLY: Indicates if this file can be loaded
		in parallel to other files.
		This is usually only used files are using the tag loaders and not XHR.

		@property loadInParallel
		@type boolean
		@default false
		@readOnly
		@since 1.2.0
		@public
		**/
		public get loadInParallel(): boolean {
			return this._loadInParallel;
		}

		/**
		Filestore this file should be added to when it has loaded.
		This can be replaced with a custom one if wanted.

		@property fileStore
		@type Kiwi.Files.FileStore
		@since 1.2.0
		@public
		**/
		public fileStore: Kiwi.Files.FileStore;

		/**
		If this file is using tag loading instead of the XHR method.
		Only used by extended classes.

		@property useTagLoader
		@type boolean
		@since 1.2.0
		@protected
		**/
		protected useTagLoader: boolean = false;

		/**
		User-defined name and way of accessing this file once loaded

		@property key
		@type string
		@public
		**/
		public key: string;

		/**
		A dictionary, stores any information relating to this file.
		Used when loading images that are to be used as a spritesheet
		or texture atlas.

		@property data
		@type Any
		@public
		**/
		public metadata: any;

		/**
		Holds the type of data that is being loaded.
		This should be used with the STATIC properties that hold the various datatypes that can be loaded.

		@property dataType
		@type string
		@public
		**/
		public dataType: number;


		/*
		---------------
		File Information
		---------------
		*/

		/**
		Name of the file being loaded.

		@property name
		@type string
		@since 1.2.0
		@public
		**/
		public name: string;

		/**
		Location of where the file is placed without the file itself
		(so without the file's name).
		Example: If the file is `images/awesomeImage.png` then the filepath
		will be `images/`.

		@property path
		@type string
		@since 1.2.0
		@public
		**/
		public path: string;

		/**
		Extension of the file that is being loaded.
		This is based upon the file path that the developer specifies.

		@property extension
		@type string
		@since 1.2.0
		@public
		**/
		public extension: string;

		/**
		Full filepath including the file itself

		@property URL
		@type string
		@since 1.2.0
		@public
		**/
		public URL: string;

		/**
		Type of file that is being loaded.
		Is only ever given a value when used with the XHR method of loading
		OR if you use `loadDetails` beforehand.
		The value is based off of the `Content-Type` of the XHR's
		response header returns.

		@property type
		@type string
		@public
		**/
		public type: string;

		/**
		Size of the file that was/is being loaded.
		Only has a value when the file was loaded by the XHR method
		OR you request the file information beforehand using `loadDetails`.

		@property size
		@type number
		@default 0
		@since 1.2.0
		@public
		**/
		public size: number = 0;

		/*
		---------------
		Callbacks
		---------------
		*/

		/**
		Signal which dispatches events when the file has successfully loaded

		@property onComplete
		@type Kiwi.Signal
		@since 1.2.0
		@public
		**/
		public onComplete: Kiwi.Signal;

		/**
		Signal which dispatches events when the file is loading.
		Not guaranteed to dispatch events
		as it depends on the method of loading being performed.

		@property onProgress
		@type Kiwi.Signal
		@since 1.2.0
		@public
		**/
		public onProgress: Kiwi.Signal;


		/*
		---------------
		Loading
		---------------
		*/

		/**
		Particular piece of data that the developer wanted loaded.
		This is in a format that is based upon the datatype passed.

		@property data
		@type Any
		@public
		**/
		public data: any;

		/**
		Number of milliseconds that the XHR should wait before timing out.
		Set this to `null` if you want it to not timeout.

		Default changed in v1.3.1 to `null`.

		@property timeOutDelay
		@type number
		@default null
		@public
		**/
		public timeOutDelay: number = Kiwi.Files.File.TIMEOUT_DELAY;

		/**
		Default number of milliseconds that the XHR should wait
		before timing out.
		By default this is set to `null`, and so requests will not timeout.

		Default changed in v1.3.1 to `null`.

		@property TIMEOUT_DELAY
		@type number
		@static
		@since 1.2.0
		@default null
		@public
		**/
		public static TIMEOUT_DELAY: number = null;

		/**
		Current number of attempts at loading the file.
		This is only used with XHR methods of loading.

		@property attemptCounter
		@type number
		@protected
		**/
		protected attemptCounter: number = 0;

		/**
		Maximum attempts at loading the file allowed

		@property maxLoadAttempts
		@type number
		@default 2
		@public
		**/
		public maxLoadAttempts: number = Kiwi.Files.File.MAX_LOAD_ATTEMPTS;

		/**
		Default maximum attempts at loading the file allowed

		@property MAX_LOAD_ATTEMPTS
		@type number
		@default 2
		@static
		@since 1.2.0
		@public
		**/
		public static MAX_LOAD_ATTEMPTS: number = 2;

		public load(
			onCompleteCallback?: any,
			onProgressCallback?: any,
			customFileStore?: Kiwi.Files.FileStore,
			maxLoadAttempts?: number,
			timeout?: number ) {

			/**
			Start the loading process for this file.
			Passing parameters to this method has been deprecated
			and only exists for backwards compatibility.

			@method load
			@public
			**/

			// Not currently loading?
			if ( this.loading ) {
				Kiwi.Log.error(
					"Kiwi.Files.File: File loading is in progress. " +
					"Cannot be told to load again.",
					"#loading" );
				return;
			}

			Kiwi.Log.log(
				"Kiwi.Files.File: Starting to load \"" +
				this.name +
				"\"",
				"#file",
				"#loading" );

			// Set the variables based on the parameters passed
			// To be deprecated
			if ( onCompleteCallback ) {
				this.onComplete.add( onCompleteCallback );
			}
			if ( onProgressCallback ) {
				this.onProgress.add( onProgressCallback );
			}
			if ( customFileStore ) {
				this.fileStore = customFileStore;
			}
			if ( typeof maxLoadAttempts !== "undefined" ) {
				this.maxLoadAttempts = maxLoadAttempts;
			}
			if ( typeof timeout !== "undefined" ) {
				this.timeOutDelay = timeout;
			}

			// Start Loading!!!
			this._start();
			this._load();
		}


		protected _load() {

			/**
			Increment the counter, and call the approprate loading method.

			@method _load
			@since 1.2.0
			@protected
			**/

			this.attemptCounter++;
			this.xhrLoader( "GET", "text" );
		}

		protected loadProgress() {

			/**
			Dispatch the `onProgress` callback.
			Should be called by the loading method.

			@method loadProgress
			@since 1.2.0
			@protected
			**/

			this.onProgress.dispatch( this );
		}


		protected loadSuccess() {

			/**
			Dispatch the `onComplete` callback
			and sets the appropriate properties.
			Called by the loading methods when the file has been loaded
			and successfully processed.

			@method loadSuccess
			@since 1.2.0
			@protected
			**/

			// If already completed skip
			if ( this.complete ) {
				return;
			}

			this.success = true;
			this.hasError = false;
			this._stop();

			if ( this.fileStore ) {
				this.fileStore.addFile( this.key, this );
			}

			this.onComplete.dispatch( this );

		}

		protected loadError( error: any ) {

			/**
			Report loading failure.
			Executed when the loading process fails.
			This could be for any reason.

			@method loadError
			@param error {Any} Event or reason for the file to not be loaded
			@since 1.2.0
			@protected
			**/

			// Try again?
			if ( this.attemptCounter >= this.maxLoadAttempts ) {

				// Failed
				Kiwi.Log.log(
					"Kiwi.Files.File: Failed to load file \"" +
					this.name + "\". Trying Again",
					"#loading" );
				this.hasError = true;
				this.success = false;
				this.error = error;
				this._stop();
				this.onComplete.dispatch( this );

			} else {
				Kiwi.Log.log(
					"Kiwi.Files.File: Failed to load file \"" +
					this.name + "\"",
					"#loading" );

				// Try Again
				this._load();
			}

		}

		/*
		---------------
		XHR Loading
		---------------
		*/

		protected xhrLoader(
			method: string = "GET",
			responseType: string = "text",
			timeoutDelay: number = this.timeOutDelay ) {

			/**
			Set up a XHR loader based on the properties of this file
			and parameters passed.

			@method xhrLoader
			@param [method="GET"] {string} Method this request should be made in
			@param [responseType="text"] {string} Type of response we are expecting
			@param [timeoutDelay] {number}
			@protected
			**/

			this._xhr = new XMLHttpRequest();
			this._xhr.open( method, this.URL, true );

			if ( timeoutDelay !== null ) {
				this._xhr.timeout = timeoutDelay;
			}

			this._xhr.responseType = responseType;

			this._xhr.onload = ( event ) => this.xhrOnLoad( event );
			this._xhr.onerror = ( event ) => this.loadError( event );
			this._xhr.onprogress = ( event ) => this.xhrOnProgress( event );

			var _that = this;

			this._xhr.onreadystatechange = function () {
				_that.readyState = _that._xhr.readyState;
			};

			this._xhr.onloadstart = function ( event ) {
				_that.timeStarted = event.timeStamp;
				_that.lastProgress = event.timeStamp;
			};

			this._xhr.ontimeout = function( event ) {
				_that.hasTimedOut = true;
			};

			this._xhr.onloadend = function ( event ) {
				_that.xhrOnLoad( event );
			};

			this._xhr.send();

		}

		protected xhrOnProgress( event ) {

			/**
			Fire progress event file file is loading via XHR.

			@method xhrOnProgress
			@param event {Any}
			@protected
			**/

			this.bytesLoaded = parseInt( event.loaded );
			this.bytesTotal = parseInt( event.total );
			this.percentLoaded = Math.round( ( this.bytesLoaded / this.bytesTotal ) * 100 );

			this.onProgress.dispatch( this );
		}

		protected xhrOnLoad( event ) {

			/**
			Run when the file has been loaded.
			Checks that the response contains information
			before marking it as a success.

			@method xhrOnLoad
			@param event {Any}
			@protected
			**/

			// Deprecate
			this.status = this._xhr.status;
			this.statusText = this._xhr.statusText;

			// If there is a status, then use that for our check.
			// Otherwise we will base it on the response
			if ( this.status && this.status === 200 ||
					!this.status && this._xhr.response ) {
				this._getXhrHeaderInfo();
				this.buffer = this._xhr.response; // Deprecate
				this.processXhr( this._xhr.response );
			} else {
				this.loadError( event );
			}
		}

		protected processXhr( response:any ) {

			/**
			Assign the data property retrieved via XHR.
			This method is also in charge of calling `loadSuccess` or `loadError`
			when processing is complete.

			@method processXhr
			@param response
			@protected
			**/

			this.data = response;
			this.loadSuccess();
		}

		/**
		`XMLHttpRequest` object. This only has a value if
		the XHR method of load is being used, otherwise this is `null`.

		@property _xhr
		@type XMLHttpRequest
		@protected
		**/
		protected _xhr: XMLHttpRequest;

		/*
		-----------------
		Loading Status
		-----------------
		*/

		/**
		Time at which loading started

		@property timeStarted
		@type number
		@default 0
		@public
		**/
		public timeStarted: number = 0;

		/**
		Time at which progress in loading the file was last occurred.
		Only contains a value when using XHR methods of loading.

		@property lastProgress
		@type number
		@public
		**/
		public lastProgress: number = 0;

		/**
		Time at which the load finished

		@property timeFinished
		@type number
		@default 0
		@public
		**/
		public timeFinished: number = 0;


		/**
		Duration or how long it took to load the file in milliseconds

		@property duration
		@type number
		@default 0
		@public
		**/
		public duration: number = 0;


		private _start() {

			/**
			Get the time and reset properties used in file loading.
			Is executed when this file starts loading.

			@method _start
			@private
			**/

			this.attemptCounter = 0;
			this.loading = true;
			this.timeStarted = Date.now();
			this.percentLoaded = 0;

		}


		private _stop() {

			/**
			Set properties upon load stop.
			Is executed when this file stops loading.

			@method _stop
			@private
			**/

			this.loading = false;
			this.complete = true;
			this.percentLoaded = 100;
			this.timeFinished = Date.now();
			this.duration = this.timeFinished - this.timeStarted;

		}

		/**
		Whether file loading failed or encountered an error so was not loaded

		@property hasError
		@type boolean
		@default false
		@public
		**/
		public hasError: boolean = false;

		/**
		Holds the error (if there was one) when loading the file

		@property error
		@type Any
		@public
		**/
		public error: any;

		/**
		Whether loading was successful or not

		@property success
		@type boolean
		@public
		**/
		public success: boolean = false;

		/**
		Whether the file is currently being loaded or not

		@property loading
		@type boolean
		@public
		**/
		public loading: boolean = false;

		/**
		Whether the file has attempted to load,
		regardless of whether it was a success or not

		@property complete
		@type boolean
		@default false
		@public
		**/
		public complete: boolean = false;

		/**
		Percentage of file loaded

		@property percentLoaded
		@type number
		@public
		**/
		public percentLoaded: number = 0;

		/**
		Number of bytes that have currently been loaded.
		Useful when wanting to know exactly how much data has been transferred.
		Only has a value when using the XHR method of loading.

		@property bytesLoaded
		@type number
		@default 0
		@public
		**/
		public bytesLoaded: number = 0;


		/**
		Total number of bytes that the file consists of.
		Only has a value when using the XHR method of loading
		or you are getting the file details beforehand.

		@property bytesTotal
		@type number
		@default 0
		@public
		**/
		public bytesTotal: number = 0;

		/*
		--------------------
		XHR Header Information
		--------------------
		*/

		/**
		Callback method to be executed when file details have been retrieved

		@property headCompleteCallback
		@type Any
		@since 1.2.0
		@private
		**/
		private headCompleteCallback: any;

		/**
		Context `headCompleteCallback` should be executed in.
		The callback is the following arguments.
		1. If the details were recieved

		@property headCompleteContext
		@type Any
		@since 1.2.0
		@private
		**/
		private headCompleteContext: any;

		/**
		Whether this file's information has been retrieved or not

		@property detailsReceived
		@type boolean
		@default false
		@since 1.2.0
		@public
		**/
		public detailsReceived:boolean = false;

		public loadDetails( callback:any=null, context:any=null ) {

			/**
			Make a XHR `HEAD` request to get information about the file
			that is going to be downloaded.
			This is particularly useful when you are wanting to check
			how large a file is before loading all of the content.

			@method loadDetails
			@param [callback] {Any}
			@param [context] {Any}
			@return {boolean} If the request was made
			@since 1.2.0
			@public
			**/

			// Can't continue if regular loading is progressing.
			if ( this.loading ) {
				Kiwi.Log.error( "Kiwi.Files.File: Cannot get the file details whilst the file is already loading" );
				return false;
			}

			if ( callback ) {
				this.headCompleteCallback = callback;
			}
			if ( context ) {
				this.headCompleteContext = context;
			}

			this.xhrHeadRequest();
			return true;
		}

		private _getXhrHeaderInfo() {

			/**
			Retrieve the `HEAD` information from the XHR.
			This method is used for both `load` and `loadDetails` methods.

			@method _getXhrHeaderInfo
			@since 1.2.0
			@private
			**/

			if ( !this._xhr ) {
				return;
			}

			this.status = this._xhr.status;
			this.statusText = this._xhr.statusText;

			// Get the file information...
			this.type = this._xhr.getResponseHeader( "Content-Type" );
			this.size = parseInt(
				this._xhr.getResponseHeader( "Content-Length" ) );
			this.lastModified = this._xhr.getResponseHeader( "Last-Modified" );
			this.ETag = this._xhr.getResponseHeader( "ETag" );
			this.detailsReceived = true;
		}

		private xhrHeadRequest() {

			/**
			Set up a `XMLHttpRequest` object and sends a `HEAD` request.

			@method xhrHeadRequest
			@since 1.2.0
			@private
			**/

			this._xhr = new XMLHttpRequest();
			this._xhr.open( "HEAD", this.fileURL, true );
			if ( this.timeOutDelay !== null ) {
				this._xhr.timeout = this.timeOutDelay;
			}

			this._xhr.onload = ( event ) => this.xhrHeadOnLoad( event );
			this._xhr.onerror = ( event ) => this.xhrHeadOnError( event );

			this._xhr.send();
		}

		private xhrHeadOnError( event ) {

			/**
			Execute when a XHR `HEAD` request fails

			@method xhrHeadOnError
			@param event {Any}
			@private
			**/

			if ( this.headCompleteCallback ) {
				this.headCompleteCallback.call(
					this.headCompleteContext, false );
			}
		}

		private xhrHeadOnLoad( event ) {

			/**
			Execute when a XHR `HEAD` request has loaded.
			Checks that the status of the request is `200`
			before classifying it as a success.

			@method xhrHeadOnLoad
			@param event {Any}
			@private
			**/

			if ( this._xhr.status === 200 ) {
				this._getXhrHeaderInfo();

				if ( this.headCompleteCallback ) {
					this.headCompleteCallback.call(
						this.headCompleteContext, true );
				}
			} else {
				this.xhrHeadOnError( null );
			}
		}

		/*
		--------------------
		MISC
		--------------------
		*/

		/**
		Entity Tag that is assigned to the file.
		Only has a value when either using the XHR loader
		OR when requesting the file details.

		@property ETag
		@type string
		@public
		**/
		public ETag: string = "";

		/**
		Date/time that this file was last modified.
		Only has a value when using the XHR method of loading
		OR when requesting the file details.

		@property lastModified
		@type string
		@default ""
		@public
		**/
		public lastModified: string = "";


		/*
		--------------------
		Tagging + State
		--------------------
		*/

		/**
		State that added the entity - or `null` if it was added as global

		@property ownerState
		@type Kiwi.State
		@public
		**/
		public ownerState: Kiwi.State;


		/**
		Any tags that are on this file. This can be used to grab files/objects
		on the whole game that have these particular tag.

		@property _tags
		@type string[]
		@default []
		@private
		**/
		private _tags: string[];


		public addTag( tag: string ) {

			/**
			Add a new tag to this file.

			@method addTag
			@param tag {string} Tag to add
			@public
			**/

			if ( this._tags.indexOf( tag ) == -1 ) {
				this._tags.push( tag );
			}
		}


		public removeTag( tag: string ) {

			/**
			Remove a tag from this file.

			@method removeTag
			@param tag {string} Tag to remove
			@public
			**/

			var index: number = this._tags.indexOf( tag );
			if ( index != -1 ) {
				this._tags.splice( index, 1 );
			}
		}


		public hasTag( tag: string ) {

			/**
			Checks to see if a tag that is passed exists on this file.
			Returns whether the tag exists on this file.

			@method hasTag
			@param tag {string} Tag to check
			@return {boolean} Whether the tag exists on this file
			@public
			**/

			if ( this._tags.indexOf( tag ) === -1 ) {
				return false;
			}
			return true;

		}

		/*
		-------------------
		File Type
		-------------------
		*/

		/**
		Static property defining the IMAGE Datatype

		@property IMAGE
		@type number
		@static
		@final
		@default 0
		@public
		**/
		public static IMAGE: number = 0;


		/**
		Static property defining the SPRITE_SHEET Datatype

		@property SPRITE_SHEET
		@type number
		@static
		@final
		@default 1
		@public
		**/
		public static SPRITE_SHEET: number = 1;


		/**
		Static property defining the TEXTURE_ATLAS Datatype

		@property TEXTUREATLAS
		@type number
		@static
		@final
		@default 2
		@public
		**/
		public static TEXTURE_ATLAS: number = 2;


		/**
		Static property defining the AUDIO Datatype

		@property AUDIO
		@type number
		@static
		@final
		@default 3
		@public
		**/
		public static AUDIO: number = 3;


		/**
		Static property defining the JSON Datatype

		@property JSON
		@type number
		@static
		@final
		@default 4
		@public
		**/
		public static JSON: number = 4;


		/**
		Static property defining the XML Datatype

		@property XML
		@type number
		@static
		@final
		@default 5
		@public
		**/
		public static XML: number = 5;


		/**
		Static property defining the BINARY_DATA Datatype

		@property BINARY_DATA
		@type number
		@static
		@final
		@default 6
		@public
		**/
		public static BINARY_DATA: number = 6;


		/**
		Static property defining the TEXT_DATA Datatype

		@property TEXT_DATA
		@type number
		@static
		@final
		@default 7
		@public
		**/
		public static TEXT_DATA: number = 7;

		/**

		@property UNKNOWN
		@type number
		@static
		@final
		@default 8
		@public
		**/
		public static UNKNOWN: number = 8;

		/**
		Whether this file is texture. This is READ ONLY.

		@property isTexture
		@type boolean
		@readOnly
		@public
		**/
		public get isTexture(): boolean {
			return Kiwi.Files.TextureFile.prototype.objType.call( this ) ===
				this.objType();
		}


		/**
		Whether this file is a piece of audio. This is READ ONLY.

		@property isAudio
		@type boolean
		@readOnly
		@public
		**/
		public get isAudio(): boolean {
			return Kiwi.Files.AudioFile.prototype.objType.call( this ) ===
				this.objType();
		}


		/**
		Whether this file is data. This is READ ONLY.

		@property isData
		@type boolean
		@readOnly
		@public
		**/
		public get isData(): boolean {
			return Kiwi.Files.DataFile.prototype.objType.call( this ) ===
				this.objType();
		}

		/*
		------------------
		Clean Up
		------------------
		*/

		public destroy() {

			/**
			Destroy all external object references on this object

			@method destroy
			@since 1.2.0
			@public
			**/

			if ( this.fileStore ) {
				this.fileStore.removeFile( this.key );
			}

			this.onComplete.dispose();
			this.onProgress.dispose();

			delete this.fileStore;
			delete this._xhr;
			delete this.data;
			delete this.buffer;
			delete this.game;
			delete this.error;
			delete this.headCompleteCallback;
			delete this.headCompleteContext;
			delete this.onComplete;
			delete this.onProgress;
			delete this.ownerState;

		}

		/*
		------------------
		Deprecated
		------------------
		*/

		/**
		Name of the file being loaded

		@property fileName
		@type string
		@deprecated Use `name`. Deprecated as of 1.2.0
		@public
		**/
		public get fileName(): string {
			return this.name;
		}
		public set fileName( val:string ) {
			this.name = val;
		}

		/**
		Location of where the file is placed without the file itself
		(so without the file's name).
		Example: If the file you are load is located at
		`images/awesomeImage.png` then the filepath will be `images/`.

		@property filePath
		@type string
		@deprecated Use `path`. Deprecated as of 1.2.0
		@public
		**/
		public get filePath(): string {
			return this.path;
		}
		public set filePath( val: string ) {
			this.path = val;
		}

		/**
		Extension of the filename.
		Example: If the file you are load is located at
		`images/awesomeImage.png` then the extension will be `png`.

		@property filePath
		@type string
		@deprecated Use `extension`. Deprecated as of 1.2.0
		@public
		**/
		public get fileExtension(): string {
			return this.extension;
		}
		public set fileExtension( val: string ) {
			this.extension = val;
		}

		/**
		Full filepath including the file itself

		@property fileURL
		@type string
		@deprecated Use `URL`. Deprecated as of 1.2.0
		@public
		**/
		public get fileURL(): string {
			return this.URL;
		}
		public set fileURL( val: string ) {
			this.URL = val;
		}

		/**
		Type of file that is being loaded.
		Is only ever given a value when used with the XHR method of loading
		OR if you use `getFileDetails` beforehand.
		The value is based off of the `Content-Type` of the XHR's
		response header returns.

		@property fileType
		@type string
		@deprecated Use `type`. Deprecated as of 1.2.0
		@public
		**/
		public get fileType():string {
			return this.type;
		}
		public set fileType( val: string ) {
			this.type = val;
		}

		/**
		Size of the file that was/is being loaded.
		Only has a value when the file was loaded by the XHR method
		OR you request the file information beforehand using `getFileDetails`.

		@property fileSize
		@type number
		@deprecated Use `size`. Deprecated as of 1.2.0
		@public
		**/
		public get fileSize(): number {
			return this.size;
		}
		public set fileSize( val: number ) {
			this.size = val;
		}


		/**
		Method to be executed when this file has finished loading,
		but actually does nothing.

		@property onCompleteCallback
		@type Any
		@default null
		@deprecated Use `onComplete`. Deprecated as of 1.2.0
		@public
		**/
		public onCompleteCallback: any = null;


		/**
		Method that is to be executed while this file is loading,
		but actually does nothing.

		@property onProgressCallback
		@type Any
		@default null
		@deprecated Use `onProgress`. Deprecated as of 1.2.0
		@public
		**/
		public onProgressCallback: any = null;


		/**
		Status of this file that is being loaded.
		Only used/has a value when the file was/is being loaded
		by the XHR method.

		@property status
		@type number
		@default 0
		@deprecated Deprecated as of 1.2.0
		@public
		**/
		public status: number = 0;


		/**
		Status message that the XHR returns

		@property statusText
		@type string
		@default ""
		@deprecated Deprecated as of 1.2.0
		@public
		**/
		public statusText: string = "";

		/**
		Ready state of the XHR loader while loading

		@property readyState
		@type number
		@default 0
		@deprecated Deprecated as of 1.2.0
		@public
		**/
		public readyState: number = 0;

		/**
		Whether this file has timed out when it was loading

		@property hasTimedOut
		@type boolean
		@default false
		@deprecated Deprecated as of 1.2.0
		@public
		**/
		public hasTimedOut: boolean = false;

		/**
		Whether the file timed out or not

		@property timedOut
		@type number
		@default 0
		@deprecated Deprecated as of 1.2.0
		@public
		**/
		public timedOut: number = 0;

		/**
		Response given by the XHR loader when loading is complete

		@property buffer
		@type Any
		@deprecated Use `data` instead. Deprecated as of 1.2.0
		@public
		**/
		public buffer: any;


		public getFileDetails(
			callback: any = null,
			maxLoadAttempts?: number,
			timeout: number = null ) {

			/**
			Attempt to make the file send a XHR `HEAD` request
			to get information about the file that is going to be downloaded.
			This is particularly useful when you are wanting to check
			how large a file is before loading all of the content.

			@method getFileDetails
			@param [callback=null] {Any} Callback to send this `FileInfo`
				object to
			@param [maxLoadAttempts=1] {number} Maximum amount of load attempts
				Only set this if it is different from the default.
			@param [timeout=this.timeOutDelay] {number} Timeout delay.
				By default this is the same as the
				timeout delay property set on this file.
			@deprecated Use `loadDetails` instead. Deprecated as of 1.2.0
			@private
			**/

			if ( timeout ) {
				this.timeOutDelay = timeout;
			}

			this.loadDetails( callback, null );
		}
	}
}
