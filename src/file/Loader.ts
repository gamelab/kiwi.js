module Kiwi.Files {

	/**

	@module Kiwi
	@submodule Files

	**/

	export class Loader {

		/**
		Used for the loading of files and game assets.
		This usually happens when a State is at the loading stage
		(directly after executing the `preload` method).

		@class Loader
		@namespace Kiwi.Files
		@constructor
		@param game {Kiwi.Game} Game to which this loader belongs
		**/

		constructor( game: Kiwi.Game ) {

			this.game = game;

		}

		public objType() {

			/**
			Type of object this is.

			@method objType
			@return {string} "Loader"
			@public
			**/

			return "Loader";
		}

		/**
		Number of files in the file queue that have been updated.

		@property _completeFiles
		@type number
		@default 0
		@private
		**/
		private _completedFiles: number = 0;

		/**
		List of files that are to be loaded.
		These files will be placed in the `_loadingQueue` or `_loadingParallel`
		lists when the queue is told to `start` loading.

		@property _loadingList
		@type Array
		@since 1.2.0
		@private
		**/
		private _loadingList: Kiwi.Files.File[];

		/**
		List of files that can be loaded in parallel to one another.
		This list of files are currently being loaded.

		@property _loadingParallel
		@type Array
		@since 1.2.0
		@private
		**/
		private _loadingParallel: Kiwi.Files.File[];

		/**
		List of files that cannot load in parallel to one another
		and so need to wait for previous files to load first.
		Generally files loaded via XHR.

		@property _loadingQueue
		@type Array
		@since 1.2.0
		@private
		**/
		private _loadingQueue: Kiwi.Files.File[];

		/**
		Whether files inside the file queue are loading or not

		@property _queueLoading
		@type boolean
		@default false
		@since 1.2.0
		@private
		**/
		private _queueLoading: boolean = false;

		/**
		When enabled, files which can be loaded in parallel
		(those which are loaded via tags) will be loaded at the same time.

		The default behaviour is to have the files loading
		in a queued fashion, one after another.

		@property enableParallelLoading
		@type boolean
		@default false
		@since 1.2.0
		@public
		**/
		public enableParallelLoading: boolean = false;

		/**
		Game to which this loader is attached

		@property game
		@type Kiwi.Game
		@public
		**/
		public game: Kiwi.Game;

		/**
		Dispatches callbacks when all files in `loadingList` have been loaded.
		Make sure to `remove` callbacks (or use the `addOnce` method),
		otherwise will fire again when other sections use the loader.

		@property onQueueComplete
		@type Kiwi.Signal
		@since 1.2.0
		@public
		**/
		public onQueueComplete: Kiwi.Signal;

		/**
		Dispatches callbacks each time a file in `loadingList` has been loaded.
		Callbacks dispatched are passed the following arguments in order.

		1. `percent` - Percentage of files loaded. A number from 0 - 100
		2. `bytesLoaded` - Number of bytes loaded
		3. `file` - Latest file that was loaded. First call will be null.

		Make sure to `remove` callbacks (or use the `addOnce` method),
		otherwise will fire again when other sections use the loader.

		@property onQueueProgress
		@type Kiwi.Signal
		@since 1.2.0
		@public
		**/
		public onQueueProgress: Kiwi.Signal;

		/**
		When `calculateBytes` is true, this equals `bytesLoaded / bytesTotal`.
		Otherwise it equals `filesLoaded / numberOfFilesToLoad`.

		@property percentLoaded
		@type number
		@default 0
		@since 1.2.0
		@readOnly
		@public
		**/
		public percentLoaded: number = 0;

		/**
		Whether files inside the file queue are loading or not. READ ONLY.

		@property fileQueueLoading
		@type boolean
		@default false
		@readOnly
		@since 1.2.0
		@public
		**/
		public get queueLoading(): boolean {
			return this._queueLoading;
		}


		private _fileQueueUpdate(
			file: Kiwi.Files.File,
			forceProgressCheck: boolean = false ) {

			/**
			Check to see if the files are in the file queue,
			and dispatch the appropriate events.
			Executed by files when they have successfully been loaded.

			@method _fileQueueUpdate
			@param file {Kiwi.Files.File} File which has been recently loaded
			@param [forceProgressCheck=false] {boolean} Whether progress of
				file loading should be checked, regardless of the file
				being in the queue or not
			@since 1.2.0
			@private
			**/

			// If the file loaded is in the loadingList
			if (
				!forceProgressCheck &&
				this._loadingList.indexOf( file ) === -1 ) {

				return;
			}

			// Update the file information.
			this._updateFileListInformation();

			// Dispatch progress event.
			this.onQueueProgress.dispatch(
				this.percentLoaded, this.bytesLoaded, file );

			// Clear the file queue and dispatch the loaded event
			if ( this._completedFiles >= this._loadingList.length ) {
				this._queueLoading = false;
				this.clearQueue();
				this.onQueueComplete.dispatch();
			}

		}


		private _parallelFileComplete( file: Kiwi.Files.File ) {

			/**
			Remove file from the list and get the `fileQueue` to
			check its progress.
			Executed when a file in the `loadingParallel` list
			has been successfully loaded.

			@method _parallelFileComplete
			@param file {Kiwi.Files.File}
			@since 1.2.0
			@private
			**/

			var index = this._loadingParallel.indexOf( file );
			if ( index === -1 ) {
				Kiwi.Log.warn(
					"Something has gone wrong? " +
					"The file which executed this method " +
					"doesn't exist in the loadingParallel.",
					"#loading",
					"#error" );
				return;
			}

			this._loadingParallel.splice( index, 1 );
		}


		private _queueFileComplete( file: Kiwi.Files.File ) {

			/**
			Remove file from `loadingQueue` and execute `_startLoadingQueue`
			to start loading the next file.
			Executed when a file in `loadingQueue` has successfully loaded.

			@method _queueFileComplete
			@param file {Kiwi.Files.File}
			@since 1.2.0
			@private
			**/

			// Remove from the loadingQueue
			var index = this._loadingQueue.indexOf( file );
			if ( index === -1 ) {
				Kiwi.Log.warn(
					"Something has gone wrong? " +
					"The file which executed this method " +
					"doesn't exist in the loadingQueue.",
					"#loading",
					"#error" );
				return;
			}

			this._loadingQueue.splice( index, 1 );

			//Start loading the next file
			this._startLoadingQueue();
		}


		private _sortFile(
			file: Kiwi.Files.File,
			startLoading: boolean = false ) {

			/**
			Sort a file and place it into either `loadingParallel` or
			`loadingQueue` depending on the loading method it is using.

			@method _sortFile
			@param file {Kiwi.Files.File}
			@since 1.2.0
			@private
			**/

			if ( this.enableParallelLoading && file.loadInParallel ) {

				// Push into the tag loader queue
				this._loadingParallel.push( file );

				if ( startLoading ) {
					this._startLoadingParallel( file );
				}

			} else {

				// Push into the xhr queue
				this._loadingQueue.push( file );

				if ( startLoading ) {
					this._startLoadingQueue();
				}
			}

		}


		private _startLoading() {

			/**
			Loop through the file queue and start the loading process.

			@method _startLoading
			@private
			**/

			// Any files to load?
			if ( this._loadingList.length <= 0 ) {
				Kiwi.Log.log(
					"Kiwi.Files.Loader: " +
					"No files to load have been found.",
					"#loading" );
				this.onQueueProgress.dispatch( 100, 0, null );
				this.onQueueComplete.dispatch();
				return;
			}

			// There are files to load
			var i = 0,
				file: Kiwi.Files.File;

			while ( i < this._loadingList.length ) {

				if ( this._calculateBytes ) {
					this._loadingList[ i ].onProgress.add(
						this._updateFileListInformation, this );
				}

				this._sortFile( this._loadingList[ i ] );

				this._loadingList[ i ].onComplete.addOnce(
					this._fileQueueUpdate, this );

				i++;
			}

			this._queueLoading = true;
			this._bytesLoaded = 0;

			this._startLoadingQueue();
			this._startLoadingAllParallel();

			this._fileQueueUpdate( null, true );

		}


		private _startLoadingAllParallel() {

			/**
			Start loading all files which can be loaded in parallel.

			@method _startLoadingAllParallel
			@since 1.2.0
			@private
			**/

			var i = this._loadingParallel.length;

			while ( i-- ) {
				this._startLoadingParallel( this._loadingParallel[ i ] );
			}
		}


		private _startLoadingParallel( file: Kiwi.Files.File ) {

			/**
			Start loading a file which can be loaded in parallel.

			@method _startLoadingParallel
			@param params file {Kiwi.Files.File}
			@since 1.2.0
			@private
			**/

			if ( !file.loading ) {
				file.onComplete.add( this._parallelFileComplete, this, 1 );
				file.load();
			}

		}


		private _startLoadingQueue(): boolean {

			/**
			Start the loading process in `loadingQueue`.

			@method _startLoadingQueue
			@private
			@since 1.2.0
			@return {boolean} Whether the first file is loading
			**/

			// Any files to load?
			if ( this._loadingQueue.length <= 0 ) {
				Kiwi.Log.log(
					"Kiwi.Files.Loader: No queued files to load.",
					"#loading" );
				return false;
			}

			// Is the first file currently loading?
			if ( this._loadingQueue[ 0 ].loading ) {
				return false;
			}

			// Attempt to load the file!
			this._loadingQueue[ 0 ].onComplete.addOnce(
				this._queueFileComplete, this, 1 );
			this._loadingQueue[ 0 ].load();
			return true;
		}


		private _updateFileListInformation() {

			/**
			Calculates the new number of bytes loaded and
			the percentage of loading done by looping through all of the files.

			Called each time a file has processed while loading,
			or has just completed loading.

			@method _updateFileListInformation
			@private
			**/

			var i = 0;

			this._completedFiles = 0;
			this._bytesLoaded = 0;

			while ( i < this._loadingList.length ) {

				// Was the file loaded, but we have no bytes
				// (must have used the tag loader) and we have their details?
				if (
					this._loadingList[ i ].bytesLoaded === 0 &&
					this._loadingList[ i ].success &&
					this._loadingList[ i ].detailsReceived ) {

					this._bytesLoaded += this._loadingList[ i ].size;

				} else {
					// Add the bytes loaded to the list
					this._bytesLoaded += this._loadingList[ i ].bytesLoaded;
				}

				// Calculate percentage
				if ( this._loadingList[ i ].complete ) {
					this._completedFiles++;
				}

				i++;
			}

			// Calculate the percentage depending on how accurate we can be.
			if ( this._calculateBytes ) {
				this.percentLoaded =
					( this._bytesLoaded / this._bytesTotal ) * 100;
			} else {
				this.percentLoaded =
					( this._completedFiles / this._loadingList.length ) * 100;
			}

		}


		public addFileToQueue( file: Kiwi.Files.File ) {

			/**
			Add a file to the queue of files to be loaded.
			Files cannot be added while the queue is currently loading,
			the file to add is currently loading, or has been loaded before.

			@method addFileToQueue
			@param file {Kiwi.Files.File} File to add
			@return {boolean} Whether the file was added to the queue
			@since 1.2.0
			@public
			**/

			if ( this._queueLoading ) {
				Kiwi.Log.warn(
					"Kiwi.Files.Loader: " +
					"File cannot be added to the queue " +
					"while the queue is currently loading.",
					"#loading",
					"#filequeue" );
				return false;
			}

			if ( file.loading || file.complete ) {
				Kiwi.Log.warn(
					"Kiwi.Files.Loader: " +
					"File could not be added as it is " +
					"currently loading or has already loaded.",
					"#loading",
					"#filequeue" );
				return false;
			}

			this._loadingList.push( file );
			return true;
		}


		public boot() {

			/**
			Set up loader systems. Executed when the DOM has
			successfully loaded and we can now start the game.

			@method boot
			@public
			**/

			this._loadingList = [];

			this._loadingParallel = [];

			this._loadingQueue = [];

			this.onQueueComplete = new Kiwi.Signal();

			this.onQueueProgress = new Kiwi.Signal();

		}


		public clearQueue() {

			/**
			Clear the file queue of all files.

			@method clearQueue
			@since 1.2.0
			@public
			**/

			if ( !this._queueLoading ) {
				this._loadingList.length = 0;
			} else {
				Kiwi.Log.error(
					"Kiwi.Files.Loader: " +
					"Cannot clear the file queue " +
					"while the files are being loaded.",
					"#loading",
					"#filequeue" );
			}
		}


		public loadFile( file: Kiwi.Files.File ) {

			/**
			Start the process of loading a file outside of the
			regular queue loading process.
			Callbacks for load completion need to be added onto the file
			via `onComplete` Signal.

			@method loadFile
			@public
			**/

			if ( file.loading || file.complete ) {
				Kiwi.Log.error(
					"Kiwi.Files.Loader: " +
					"Could not add file. " +
					"File is already loading or has completed loading." );
				return;
			}

			this._sortFile( file, true );

		}


		public removeFileFromQueue( file: Kiwi.Files.File ): boolean {

			/**
			Remove a file from the file queue.
			Files cannot be removed while the queue is loading.

			@method removeFileFromQueue
			@param file {Kiwi.Files.File} File to remove
			@return {boolean} Whether the file was added to the queue
			@since 1.2.0
			@public
			**/

			if ( this._queueLoading ) {
				Kiwi.Log.warn(
					"Kiwi.Files.Loader: File cannot be removed " +
					"from the queue whilst the queue is currently loading.",
					"#loading",
					"#filequeue" );
				return false;
			}

			var index = this._loadingList.indexOf( file );

			if ( index === -1 ) {
				return false;
			}

			if ( file.loading ) {
				Kiwi.Log.warn( "Kiwi.Files.Loader: " +
					"Cannot remove the file from the list " +
					"as it is currently loading.",
					"#loading",
					"#filequeue" );
				return false;
			}

			this._loadingList.splice( index, 1 );
			return true;
		}


		public start( calculateBytes: boolean = null ) {

			/**
			Start loading all the files which are in the file queue.

			To accurately use the `bytesLoaded` or `bytesTotal` properties,
			you will need to set the `calculateBytes` boolean to true.
			This may increase load times, as each file in the queue will
			first make XHR HEAD requests for information.

			When `calculateBytes` is true, `percentLoaded` equals
			`bytesLoaded / bytesTotal`.
			Otherwise it equals `filesLoaded / numberOfFilesToLoad`.

			@method start
			@param [calculateBytes] {boolean} Set `calculateBytes` property
				on loader
			@since 1.2.0
			@public
			**/

			if ( calculateBytes !== null ) {
				this._calculateBytes = calculateBytes;
			}

			if ( this._queueLoading ) {
				Kiwi.Log.warn(
					"Kiwi.Files.Loader: " +
					"Files in the queue are already being loaded" );
				return;
			}

			// Reset the number of bytes laoded
			this._bytesLoaded = 0;
			this._bytesTotal = 0;
			this.percentLoaded = 0;

			if ( this._calculateBytes ) {
				this.calculateQueuedSize( this._startLoading, this );
			} else {
				this._startLoading();
			}

		}


		// -----------------------------
		// Bytes Loaded Methods
		// -----------------------------


		/**
		Number of bytes loaded of files in the file queue.

		@property _bytesLoaded
		@type number
		@default 0
		@private
		**/
		private _bytesLoaded: number = 0;

		/**
		Total file size (in bytes) of all files in the queue to be loaded

		@property _bytesTotal
		@type number
		@private
		**/
		private _bytesTotal: number = 0;

		/**
		Whether the number of bytes for each file should be calculated
		before the queue starts loading.
		If true, each file in the queue makes a XHR HEAD request first
		to get the total values.

		@property _calculateBytes
		@type boolean
		@private
		**/
		private _calculateBytes: boolean = false;

		/**
		Index of the file in the filelist which is currently
		having its size retrieved

		@property _currentFileIndex
		@type number
		@private
		**/
		private _currentFileIndex: number = 0;

		/**
		Total number of bytes for the files in the file queue.

		Files loaded via tags will only be accurately measured
		if `calculateBytes` is true, or `calculateQueuedSize()` is called.

		Read only.

		@property bytesLoaded
		@readOnly
		@default 0
		@since 1.2.0
		@type number
		@public
		**/
		public get bytesLoaded(): number {
			return this._bytesLoaded;
		}

		/**
		Total number of bytes for the files in the file queue.
		Only contains a value if `calculateBytes` is true
		and files are loading, or if you use `calculateQueuedSize()`.

		Read only.

		@property bytesTotal
		@readOnly
		@default 0
		@since 1.2.0
		@type number
		@public
		**/
		public get bytesTotal(): number {
			return this._bytesTotal;
		}

		/**
		Callback for when the total number of bytes of the files
		in the file list has been calculated

		@property onQueueSizeCalculate
		@type any
		@private
		**/
		private onSizeCallback: any;

		/**
		Context in which the onSizeCallback should be executed

		@property onSizeContext
		@type any
		@private
		**/
		private onSizeContext: any;


		private _calculateNextFileSize() {

			/**
			Check to see whether all the file sizes have been retrieved.
			If so, complete the "calculateQueuedSize" call.
			Otherwise request the next file's details.

			@method _calculateNextFileSize
			@private
			**/

			if ( this._currentFileIndex >= this._loadingList.length ) {
				this._queueLoading = false;
				this.onSizeCallback.call(
					this.onSizeContext, this._bytesTotal );;
				return;
			}

			var file = this._loadingList[ this._currentFileIndex ];

			// Have we already got the details for this file?
			if ( file.detailsReceived ) {
				this._detailsReceived();
			} else {
				var details = file.loadDetails( this._detailsReceived, this );

				// Skip to the next file if the request could not be made.
				// Shouldn't happen.
				if ( !details ) {
					this._detailsReceived();
				}
			}

		}


		private _detailsReceived() {

			/**
			Executed when by `_calculateNextFileSize` when the files information has been retrieved.
			Adds its calculated size to the `_bytesTotal` and executes the `nextFileSize` method.

			@method _detailsReceived
			@private
			**/

			var file = this._loadingList[ this._currentFileIndex ];

			if ( file.detailsReceived ) {
				this._bytesTotal += file.size;
			}

			this._currentFileIndex++;
			this._calculateNextFileSize();

		}


		public calculateQueuedSize( callback: any, context: any = null ) {

			/**
			Loop through the file queue and get file information
			(filesize, ETag, filetype) for each.

			To get accurate information about `bytesLoaded`, `bytesTotal`,
			and `percentLoaded`, set the `calculateBytes` property to true,
			as the loader will automatically execute this method before hand.

			Can only be executed when the file queue is not currently loading.

			@method calculateQueuedSize
			@param callback {any}
			@param [context=null] {any}
			@public
			**/

			// Is the queue currently loading files?
			if ( this._queueLoading ) {
				Kiwi.Log.warn(
					"Kiwi.Files.Loader: " +
					"Cannot calculate the size of the files " +
					"in the filequeue whilst they are loading." );
				return;
			}

			//Set the callbacks
			this.onSizeCallback = callback;
			this.onSizeContext = context;

			// Start the process
			this._currentFileIndex = 0;
			this._bytesTotal = 0;
			this._queueLoading = true;

			this._calculateNextFileSize();
		}


		// -----------------------------
		// File Addition Methods
		// -----------------------------


		private _attemptToAddAudio(
			params:any,
			onlyIfSupported: boolean ): Kiwi.Files.File {

			/**
			Check to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
			Return a boolean specifying whether the audio file
			was successfully added to the filestore.

			@method _attemptToAddAudio
			@param params {object}
				@param params.key {string} Key for the audio file
				@param params.url {string} URL of the audio to load
				@param [params.state=true] {Kiwi.State} State this file is for
				@param [params.fileStore] {Kiwi.Files.FileStore}
			@param [onlyIfSupported=true] {boolean} Whether the audio file
				should only be loaded if Kiwi detects that the audio file
				could be played.
			@return {Kiwi.Files.File} File which was created
			@private
			**/

			var file = new Kiwi.Files.AudioFile( this.game, params );
			var support = false;

			switch ( file.extension ) {
				case "mp3":
					support = Kiwi.DEVICE.mp3;
					break;

				case "ogg":
				case "oga":
					support = Kiwi.DEVICE.ogg;
					break;

				case "m4a":
					support = Kiwi.DEVICE.m4a;
					break;

				case "wav":
				case "wave":
					support = Kiwi.DEVICE.wav;
					break;
			}

			if ( support == true || onlyIfSupported == false ) {
				this.addFileToQueue( file );
				return file;
			} else {
				Kiwi.Log.error(
					"Kiwi.Loader: " +
					"Audio Format not supported on this Device/Browser.",
					"#audio",
					"#unsupported" );
				return null;
			}

		}


		public addAudio(
			key: string,
			url: any,
			storeAsGlobal: boolean = true,
			onlyIfSupported: boolean = true ) {

			/**
			Create a new File to store an audio piece.
			
			First check to see if the AUDIO file being loaded is supported
			by the browser/device before adding it to the loading queue.
			You can override this behaviour and tell the audio data to load
			even if not supported by setting the `onlyIfSupported` parameter
			to `false`.

			If you pass an array of filepaths as `url`, the first audio
			filetype that is supported will be loaded.

			@method addAudio
			@param key {string} Key for the audio file
			@param url {string} URL of the audio to load.
				You can pass an array of URLs, in which case
				the first supported audio filetype in the array will be loaded.
			@param [storeAsGlobal=true] {boolean} Whether the file
				should be stored globally
			@param [onlyIfSupported=true] {boolean} Whether the audio file
				should only be loaded if Kiwi detects that
				the audio file is supported
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params = {
					type: Kiwi.Files.File.AUDIO,
					key: null,
					url: null,
					state: null,
					fileStore: this.game.fileStore
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				params = ( <any>key );
				params.type = Kiwi.Files.File.AUDIO;
				params.fileStore = this.game.fileStore;
			} else {
				params.key = key;
				params.url = url;

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}
			}

			var i = 0,
				urls, file;

			// If it is a string then try to load that file
			if ( Kiwi.Utils.Common.isString( params.url ) ) {
				urls = [ params.url ];
			} else {
				urls = params.url;
			}

			while ( i < urls.length ) {

				params.url = urls[ i ]
				file = this._attemptToAddAudio( params, onlyIfSupported );
				if ( file ) {
					return file;
				}

				i++;
			}

			return null;
		}


		public addBinaryFile(
			key: string,
			url: string,
			storeAsGlobal: boolean = true ) {

			/**
			Create a new File for a Binary file
			and add it to the loading queue.

			@method addBinaryFile
			@param key {string} Key for the file
			@param url {string} URL to the Binary file
			@param [storeAsGlobal=true] {boolean} Whether the file
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params: any = {
					type: Kiwi.Files.File.BINARY_DATA,
					key: key,
					url: url,
					fileStore: this.game.fileStore
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if ( p.parse ) {
					params.parse = p.parse;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile( this.game, params );
			this.addFileToQueue( file );
			return file;

		}


		public addImage(
			key: string,
			url: string,
			width?: number,
			height?: number,
			offsetX?: number,
			offsetY?: number,
			storeAsGlobal: boolean = true ): Kiwi.Files.File {

			/**
			Create a new file for an image and adds it to the loading queue.

			@method addImage
			@param key {string} Key for the file
			@param url {string} URL of the image to load
			@param [width] {number} Width of the cell on the image to use
				once the image is loaded
			@param [height] {number} Height of the cell on the image to use
				once the image is loaded
			@param [offsetX] {number} Horizontal offset of the cell
			@param [offsetY] {number} Vertical offset of the cell
			@param [storeAsGlobal=true] {boolean} Whether the image
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params:any = {
					type: Kiwi.Files.File.IMAGE,
					key: null,
					url: null,
					fileStore: this.game.fileStore,
					metadata: {}
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;
				params.metadata = {
					width: p.width,
					height: p.height,
					offsetX: p.offsetX,
					offsetY: p.offsetY
				};

				if ( p.xhrLoading ) {

					// Forces BLOB loading
					params.xhrLoading = p.xhrLoading;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

				params.key = key;
				params.url = url;
				params.metadata = {
					width: width,
					height: height,
					offsetX: offsetX,
					offsetY: offsetY
				};

			}

			var file: Kiwi.Files.File =
				new Kiwi.Files.TextureFile( this.game, params );
			this.addFileToQueue( file );

			return file;
		}


		public addJSON(
			key: string,
			url: string,
			storeAsGlobal: boolean = true ) {

			/**
			Create a new File to store JSON and add it to the loading queue.

			@method addJSON
			@param key {string} Key for the file
			@param url {string} URL to the json file
			@param [storeAsGlobal=true] {boolean} Whether the file
				should be stored globally.
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params: any = {
					type: Kiwi.Files.File.JSON,
					key: key,
					url: url,
					fileStore: this.game.fileStore
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if ( p.parse ) {
					params.parse = p.parse;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile( this.game, params );
			this.addFileToQueue( file );
			return file;

		}


		public addSpriteSheet(
			key: string,
			url: string,
			frameWidth: number,
			frameHeight: number,
			numCells?: number,
			rows?: number,
			cols?: number,
			sheetOffsetX?: number,
			sheetOffsetY?: number,
			cellOffsetX?: number,
			cellOffsetY?: number,
			storeAsGlobal: boolean = true ) {

			/**
			Create a new file for a spritesheet
			and add it to the loading queue.

			@method addSpriteSheet
			@param key {string} Key for the file
			@param url {string} URL of the image to load
			@param frameWidth {number} Width of a single cell
				in the spritesheet
			@param frameHeight {number} Height of a single cell
				in the spritesheet
			@param [numCells] {number} Number of cells in this spritesheet
			@param [rows] {number} Number of cells in a row
			@param [cols] {number} Number of cells in a column
			@param [sheetOffsetX] {number} Horizontal offset of the whole
				spritesheet
			@param [sheetOffsetY] {number} Vertical offset of the whole
				spritesheet
			@param [cellOffsetX] {number} Horizontal spacing between each cell
			@param [cellOffsetY] {number} Vertical spacing between each cell
			@param [storeAsGlobal=true] {boolean} Whether the image
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params: any = {
					type: Kiwi.Files.File.SPRITE_SHEET,
					key: null,
					url: null,
					fileStore: this.game.fileStore,
					metadata: {}
				};


			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;
				params.metadata = {
					frameWidth: p.frameWidth,
					frameHeight: p.frameHeight,
					numCells: p.numCells,
					rows: p.rows,
					cols: p.cols,
					sheetOffsetX: p.sheetOffsetX,
					sheetOffsetY: p.sheetOffsetY,
					cellOffsetX: p.cellOffsetX,
					cellOffsetY: p.cellOffsetY
				};

				// Force BLOB loading
				if ( p.xhrLoading ) {
					params.xhrLoading = p.xhrLoading;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

				params.key = key;
				params.url = url;
				params.metadata = {
					frameWidth: frameWidth,
					frameHeight: frameHeight,
					numCells: numCells,
					rows: rows,
					cols: cols,
					sheetOffsetX: sheetOffsetX,
					sheetOffsetY: sheetOffsetY,
					cellOffsetX: cellOffsetX,
					cellOffsetY: cellOffsetY
				};

			}

			var file = new Kiwi.Files.TextureFile( this.game, params );
			this.addFileToQueue( file );

			return file;
		}


		public addTextureAtlas(
			key: string,
			imageURL: string,
			jsonID: string,
			jsonURL: string,
			storeAsGlobal: boolean = true ) {

			/**
			Create new files for loading a texture atlas
			and add those files to the loading queue.

			@method addTextureAtlas
			@param key {string} Key for the image file
			@param imageUrl {string} URL of the image to load
			@param jsonID {string} Key for the JSON file
			@param jsonURL {string} URL of the JSON file to load
			@param [storeAsGlobal=true] {boolean} Whether the files
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var textureParams: any = {
					type: Kiwi.Files.File.TEXTURE_ATLAS,
					key: key,
					url: imageURL,
					fileStore: this.game.fileStore,
					metadata: {
						jsonID: jsonID
					}
				},
				jsonParams: any = {
					type: Kiwi.Files.File.JSON,
					key: jsonID,
					url: jsonURL,
					fileStore: this.game.fileStore,
					metadata: {
						imageID: key
					}
				};

			if ( !storeAsGlobal && this.game.states.current ) {
				textureParams.state = this.game.states.current;
				jsonParams.state = this.game.states.current;
			}

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				textureParams.key = p.textureAtlasKey;
				textureParams.url = p.textureAtlasURL;
				jsonParams.key = p.jsonKey;
				jsonParams.url = p.jsonURL;

				textureParams.metadata.jsonID = jsonParams.key;
				jsonParams.metadata.imageID = textureParams.key;

				if ( p.crossOrigin ) {
					textureParams.crossOrigin = p.crossOrigin;
					jsonParams.crossOrigin = p.crossOrigin;
				}

				if ( p.state ) {
					textureParams.state = p.state;
					jsonParams.state = p.state;
				}

				// Forces BLOB loading
				if ( p.xhrLoading ) {
					textureParams.xhrLoading = p.xhrLoading;
				}
				if ( p.tags ) {
					jsonParams.tags = p.tags;
					textureParams.tags = p.tags;
				}

			}

			var imageFile = new Kiwi.Files.TextureFile(
				this.game, textureParams );
			var jsonFile = new Kiwi.Files.DataFile(
				this.game, jsonParams );

			this.addFileToQueue( imageFile );
			this.addFileToQueue( jsonFile );

			return imageFile;
		}


		public addTextFile(
			key: string,
			url: string,
			storeAsGlobal: boolean = true ) {

			/**
			Create a new File to store a text file
			and add it to the loading queue.

			@method addTextFile
			@param key {string} Key for the file
			@param url {string} URL to the text file
			@param [storeAsGlobal=true] {boolean} Whether the file
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params: any = {
					type: Kiwi.Files.File.TEXT_DATA,
					key: key,
					url: url,
					fileStore: this.game.fileStore
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if ( p.parse ) {
					params.parse = p.parse;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile( this.game, params );
			this.addFileToQueue( file );
			return file;

		}


		public addXML(
			key: string,
			url: string,
			storeAsGlobal: boolean = true ) {

			/**
			Create a new File to store XML and add it to the loading queue.

			@method addXML
			@param key {string} Key for the file
			@param url {string} URL to the xml file
			@param [storeAsGlobal=true] {boolean} Whether the file
				should be stored globally
			@return {Kiwi.Files.File} File which was created
			@public
			**/

			var params:any = {
					type: Kiwi.Files.File.XML,
					key: key,
					url: url,
					fileStore: this.game.fileStore
				};

			if ( Kiwi.Utils.Common.isObject( key ) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if ( p.parse ) {
					params.parse = p.parse;
				}
				if ( p.state ) {
					params.state = p.state;
				}
				if ( p.tags ) {
					params.tags = p.tags;
				}
				if ( p.crossOrigin ) {
					params.crossOrigin = p.crossOrigin;
				}

			} else {

				if ( !storeAsGlobal && this.game.states.current ) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile( this.game, params );
			this.addFileToQueue( file );
			return file;

		}


		public destroy() {

			/**
			Flag this loader for garbage collection.
			Only use this method if you are SURE you will no longer need it.
			Otherwise it is best to leave it alone.

			@method destroy
			@public
			**/

			this.onQueueComplete.dispose();
			this.onQueueProgress.dispose();

			delete this.game;

			delete this.onQueueComplete;
			delete this.onQueueProgress;

			var i = 0;
			while ( i < this._loadingList.length ) {
				this._loadingList[ i ].destroy();
				i++;
			}
			this._loadingList = [];

			var i = 0;
			while ( i < this._loadingQueue.length ) {
				this._loadingQueue[ i ].destroy();
				i++;
			}
			this._loadingQueue = [];

			var i = 0;
			while ( i < this._loadingParallel.length ) {
				this._loadingParallel[ i ].destroy();
				i++;
			}
			this._loadingParallel = [];
		}


		// -----------------------
		// Deprecated - Functionality exists. Maps to its equivalent.
		// -----------------------


		public init(
			progress: any = null,
			complete: any = null,
			calculateBytes: boolean=null ) {

			/**
			Initialise the properties that are needed on this loader.
			Recommended you use the `onQueueProgress` and
			`onQueueComplete` signals instead.

			@method init
			@param [progress] {Any} Progress callback method
			@param [complete] {Any} Complete callback method
			@param [calculateBytes] {boolean} Value to which
				to set `calculateBytes`
			@deprecated Deprecated as of 1.2.0
			@public
			**/

			if ( calculateBytes !== null ) {
				this._calculateBytes = calculateBytes;
			}

			if ( progress !== null ) {
				this.onQueueProgress.addOnce( progress );
			}

			if ( complete !== null ) {
				this.onQueueComplete.addOnce( complete );
			}

		}


		public calculateBytes( value?: boolean ): boolean {

			/**
			Get/set whether the number of bytes for each file
			should be calculated before the queue starts loading.
			If true, each file in the queue makes a XHR HEAD request first
			to get the total values.

			In the next major version, this should become a property.

			@method calculateBytes
			@param [value] {boolean} Value to set
			@return {boolean} Current value of byte calculation
			@public
			**/

			if ( typeof value !== "undefined" ) {
				this._calculateBytes = value;
			}

			return this._calculateBytes;
		}


		public complete(): boolean {

			/**
			Return a boolean indicating whether
			everything in the loading queue has been loaded.

			@method complete
			@return {boolean}
			@deprecated Use `percentLoaded` instead. Deprecated as of 1.2.0
			@public
			**/

			return ( this.percentLoaded === 100 );
		}


		public getBytesLoaded(): number {

			/**
			Return the total number of bytes that have been loaded so far
			from files in the file queue.

			@method getBytesLoaded
			@return {number}
			@readOnly
			@deprecated Use `bytesLoaded` instead. Deprecated as of 1.2.0
			@public
			**/

			return this.bytesLoaded;
		}


		public getPercentLoaded(): number {

			/**
			Return a percentage of the amount that has been loaded so far.

			@method getPercentLoaded
			@return {number}
			@deprecated Use `percentLoaded` instead. Deprecated as of 1.2.0
			@public
			**/

			return this.percentLoaded;
		}


		public startLoad() {

			/**
			Loop through all of the files that need to be loaded
			and start the load event on them.

			@method startLoad
			@deprecated Use `start` instead. Deprecated as of 1.2.0.
			@public
			**/

			this.start();
		}

	}

}
