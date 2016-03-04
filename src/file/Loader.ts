/**
* 
* @module Kiwi
* @submodule Files 
* 
*/

module Kiwi.Files {

	/**
	* Used for the loading of files and game assets. This usually happens when a State is at the 'loading' stage (executing the 'preload' method).
	* 
	* @class Loader
	* @namespace Kiwi.Files
	* @constructor
	* @param game {Kiwi.Game} The game that this loader belongs to.
	* @return {Kiwi.Files.Loader} This Object
	*
	*/
	export class Loader {
 
		constructor(game: Kiwi.Game) {

			this.game = game;

		}

		/**
		* The type of object this is.
		* @method objType
		* @return {String} "Loader"
		* @public
		*/
		public objType() {
			return "Loader";
		}

		/**
		* The game this loader is attached to.
		* @property game 
		* @type Kiwi.Game
		* @public
		*/
		public game: Kiwi.Game;

		/**
		* A list of files that can be loaded in parallel to one another.
		* This list of files are currently being loaded. 
		* 
		* @property _loadingParallel
		* @type Array
		* @since 1.2.0
		* @private 
		*/
		private _loadingParallel: Kiwi.Files.File[];

		/**
		* List of files that cannot load in parallel to one another
		* and so need to wait for previous files to load first. 
		* Generally files loaded via XHR.
		* 
		* @property _loadingQueue
		* @type Array
		* @since 1.2.0
		* @private 
		*/
		private _loadingQueue: Kiwi.Files.File[];

		/**
		* List of files that are to be loaded. 
		* These files will be placed in the '_loadingQueue' or '_loadingParallel' 
		* lists when the queue is told to 'start' loading.
		* 
		* @property _loadingList
		* @type Array
		* @since 1.2.0
		* @private 
		*/
		private _loadingList: Kiwi.Files.File[];

		/**
		* A Signal which dispatches callbacks when all files in the 'loadingList' have been loaded.
		* When adding callbacks make sure to 'remove' them (or to use the 'addOnce' method) 
		* otherwise will fire when other sections use the loader.
		* 
		* @method onQueueComplete
		* @type Kiwi.Signal
		* @since 1.2.0
		* @public
		*/
		public onQueueComplete: Kiwi.Signal;

		/**
		* A Signal which dispatches callbacks each time a file in the 'loadingList' have been loaded.
		* Callbacks dispatched are passed the following arguments in order.
		* 1. percent - The percentage of files loaded. A number from 0 - 100
		* 2. bytesLoaded - The number of bytes loaded 
		* 3. file - The latest file that was loaded. First call will be null.
		* 
		* When adding callbacks make sure to 'remove' them (or to use the 'addOnce' method) 
		* otherwise will fire when other sections use the loader.
		* 
		* @method onQueueProgress
		* @type Kiwi.Signal
		* @since 1.2.0
		* @public
		*/
		public onQueueProgress: Kiwi.Signal;


		/**
		* A flag indicating if the files inside the file queue are loading or not.
		* 
		* @property _fileQueueLoading
		* @type Boolean
		* @default false
		* @since 1.2.0
		* @private
		*/
		private _queueLoading: boolean = false;

		/**
		* READ ONLY: A flag indicating if the files inside the file queue are loading or not.
		* 
		* @property fileQueueLoading
		* @type Boolean
		* @default false
		* @readOnly
		* @since 1.2.0
		* @public
		*/
		public get queueLoading(): boolean {
			return this._queueLoading;
		}


		/**
		* When 'calculateBytes' is true the percentLoaded will be the `bytesLoaded / bytesTotal`. 
		* Otherwise it is based on the `filesLoaded / numberOfFilesToLoad`. 
		*
		* @property percentLoaded
		* @type Number
		* @since 1.2.0
		* @readOnly
		* @public
		*/
		public percentLoaded: number = 0;


		/**
		* When enabled, files which can be loaded in parallel (those which are loaded via tags) 
		* will be loaded at the same time. 
		* 
		* The default behaviour is to have the files loading in a queued fashion instead of one after another.
		* 
		* @property enableParallelLoading
		* @type Boolean
		* @default false
		* @since 1.2.0
		* @public
		*/
		public enableParallelLoading: boolean = false; 


		/**
		* The boot method is executed when the DOM has successfully loaded and we can now start the game.
		* @method boot
		* @public
		*/
		public boot() {

			this._loadingList = [];

			this._loadingParallel = [];

			this._loadingQueue = [];

			this.onQueueComplete = new Kiwi.Signal();

			this.onQueueProgress = new Kiwi.Signal();

		}

		/**
		* Starts loading all the files which are in the file queue. 
		*
		* To accurately use the bytesLoaded or bytesTotal properties you will need to set the 'calculateBytes' boolean to true.
		* This may increase load times, as each file in the queue will firstly make XHR HEAD requests for information.
		*
		* When 'calculateBytes' is true the percentLoaded will be the `bytesLoaded / bytesTotal`. 
		* Otherwise it is based on the `filesLoaded / numberOfFilesToLoad`. 
		*
		* @method start
		* @param [calculateBytes] {Boolean} Setter for the 'calculateBytes' property.
		* @since 1.2.0
		* @public
		*/ 
		public start(calculateBytes: boolean = null) {

			if (calculateBytes !== null) {
				this._calculateBytes = calculateBytes;
			}

			if (this._queueLoading) {
				Kiwi.Log.warn('Kiwi.Files.Loader: Files in the queue are already being loaded');
				return;
			}

			//Reset the number of bytes laoded
			this._bytesLoaded = 0;
			this._bytesTotal = 0;
			this.percentLoaded = 0;

			if (this._calculateBytes) {
				this.calculateQueuedSize(this._startLoading, this);
			} else {
				this._startLoading();
			}

		}

		/**
		* Loops through the file queue and starts the loading process. 
		* 
		* @method _startLoading
		* @private 
		*/
		private _startLoading() {

			//Any files to load?
			if (this._loadingList.length <= 0) {
				Kiwi.Log.log('Kiwi.Files.Loader: No files are to load have been found.', '#loading');
				this.onQueueProgress.dispatch(100, 0, null);
				this.onQueueComplete.dispatch();
				return;
			}

			//There are files to load
			var i = 0,
				file: Kiwi.Files.File;

			while (i < this._loadingList.length) {

				if (this._calculateBytes) {
					this._loadingList[i].onProgress.add(this._updateFileListInformation, this);
				}

                this._sortFile(this._loadingList[i]);

                this._loadingList[i].onComplete.addOnce(this._fileQueueUpdate, this);

				i++;
			}

			this._queueLoading = true;
			this._bytesLoaded = 0;

			this._startLoadingQueue();
			this._startLoadingAllParallel();

			this._fileQueueUpdate(null, true);

		}

		/**
		* Adds a file to the queue of files to be loaded.
		* Files cannot be added whilst the queue is currently loading, 
		* the file to add is currently loading, or has been loaded before.
		* 
		* @method addFileToQueue
		* @param file {Kiwi.Files.File} The file to add.
		* @return {Boolean} If the file was added to the queue or not. 
		* @since 1.2.0
		* @public
		*/
		public addFileToQueue(file: Kiwi.Files.File) {

			if (this._queueLoading) {
				Kiwi.Log.warn('Kiwi.Files.Loader: File cannot be added to the queue whilst the queue is currently loading.', '#loading', '#filequeue');
				return false;
			}

			if (file.loading || file.complete) {
				Kiwi.Log.warn('Kiwi.Files.Loader: File could not be added as it is currently loading or has already loaded.', '#loading', '#filequeue');
				return false;
			}

			this._loadingList.push(file);
			return true;
		}

		/**
		* Removes a file from the file queue. 
		* Files cannot be removed whilst the queue is loading.
		*
		* @method removeFileFromQueue
		* @param file {Kiwi.Files.File} The file to remove.
		* @return {Boolean} If the file was added to the queue or not.
		* @since 1.2.0
		* @public
		*/
		public removeFileFromQueue(file: Kiwi.Files.File): boolean {

			if (this._queueLoading) {
				Kiwi.Log.warn('Kiwi.Files.Loader: File cannot be remove from the queue whilst the queue is currently loading.', '#loading', '#filequeue');
				return false;
			}

			var index = this._loadingList.indexOf(file);

			if (index === -1) {
				return false;
			} 

			if (file.loading) {
				Kiwi.Log.warn('Kiwi.Files.Loader: Cannot remove the file from the list as it is currently loading.', '#loading', '#filequeue');
				return false;
			}

			this._loadingList.splice(index, 1);
			return true;
		}

		/**
		* Clears the file queue of all files. 
		* 
		* @method clearQueue
		* @since 1.2.0
		* @public
		*/
		public clearQueue() {

			if (!this._queueLoading) {
				this._loadingList.length = 0;
			} else {
				Kiwi.Log.error('Kiwi.Files.Loader: Cannot clear the file queue whilst the files are being loaded.', '#loading', '#filequeue');
			}
		}

		/**
		* Starts the process of loading a file outside of the regular queue loading process.
		* Callbacks for load completion need to be added onto the file via 'onComplete' Signal.
		*
		* @method loadFile
		* @public
		*/
		public loadFile(file: Kiwi.Files.File) {

			if ( file.loading || file.complete ) {
				Kiwi.Log.error('Kiwi.Files.Loader: Could not add file. File is already loading or has completed loading.');
				return;
			}

			this._sortFile(file, true);

		}

		/**
		* Sorts a file and places it into either the 'loadingParallel' or 'loadingQueue' 
		* depending on the method of loading it is using.
		* 
		* @method _sortFile
		* @param file {Kiwi.Files.File}
		* @since 1.2.0
		* @private
		*/
		private _sortFile(file: Kiwi.Files.File, startLoading: boolean = false) {

			if (this.enableParallelLoading && file.loadInParallel) {
				//Push into the tag loader queue
				this._loadingParallel.push(file);

				if (startLoading) {
					this._startLoadingParallel(file);
				}

			} else {
				//Push into the xhr queue
				this._loadingQueue.push(file);

				if (startLoading) {
					this._startLoadingQueue();
				}
			}

		}

		/**
		* The number of files in the file queue that have been updated.
		* 
		* @property _completeFiles
		* @type number
		* @default 0
		* @private
		*/
		private _completedFiles: number = 0;

		/**
		* Called each time a file has processed whilst loading, or has just completed loading.
		* 
		* Calculates the new number of bytes loaded and 
		* the percentage of loading done by looping through all of the files.
		* 
		* @method _updateFileListInformation
		* @private
		*/
		private _updateFileListInformation() {

			var i = 0;

			this._completedFiles = 0;
			this._bytesLoaded = 0;

			while (i < this._loadingList.length) {

				//Was the file loaded, but we have no bytes (must have used the tag loader) and we have their details?
				if (this._loadingList[i].bytesLoaded === 0 && this._loadingList[i].success && this._loadingList[i].detailsReceived) {
					this._bytesLoaded += this._loadingList[i].size;

				} else {
					//Add the bytes loaded to the list 
					this._bytesLoaded += this._loadingList[i].bytesLoaded;
				}

				//Calculate percentage
				if (this._loadingList[i].complete) {
					this._completedFiles++;
				}

				i++;
			}

			//Calculate the percentage depending on how accurate we can be.
			if (this._calculateBytes) {
				this.percentLoaded = (this._bytesLoaded / this._bytesTotal) * 100;
			} else {
				this.percentLoaded = (this._completedFiles / this._loadingList.length) * 100;
			}

		}

		/**
		* Executed by files when they have successfully been loaded.
		* This method checks to see if the files are in the file queue, and dispatches the appropriate events.
		* 
		* @method _fileQueueUpdate
		* @param file {Kiwi.Files.File} The file which has been recently loaded.
		* @param [forceProgressCheck=false] {Boolean} If the progress of file loading should be checked, regardless of the file being in the queue or not.
		* @since 1.2.0
		* @private
		*/
		private _fileQueueUpdate(file: Kiwi.Files.File, forceProgressCheck: boolean = false) {

			//If the file loaded is in the loadingList
			if (!forceProgressCheck && this._loadingList.indexOf(file) === -1) {
				return;
			}

			//Update the file information.
			this._updateFileListInformation();

			//Dispatch progress event.
			this.onQueueProgress.dispatch(this.percentLoaded, this.bytesLoaded, file);

			if (this._completedFiles >= this._loadingList.length) {
				//Clear the file queue and dispatch the loaded event
				this._queueLoading = false;
				this.clearQueue();
				this.onQueueComplete.dispatch();
			}

		}

		/**
		* Starts the loading process in the loadingQueue. 
		* @method _startLoadingQueue
		* @return {Boolean}
		* @private
		* @since 1.2.0
		* @return {boolean} Whether the first file is loading
		*/
		private _startLoadingQueue(): boolean {

			//Any files to load?
			if (this._loadingQueue.length <= 0) {
				Kiwi.Log.log('Kiwi.Files.Loader: No queued files to load.', '#loading');
				return false;
			}

			//Is the first file currently loading?
			if (this._loadingQueue[0].loading) {
				return false;
			}

			//Attempt to load the file!
			this._loadingQueue[0].onComplete.addOnce(this._queueFileComplete, this, 1);
			this._loadingQueue[0].load();
			return true;
		}

		/**
		* Executed when a file in the 'loadingQueue' has been successfully loaded.
		* Removes the file from the loadingQueue and executes the '_startLoadingQueue' to start loading the next file. 
		* 
		* @method _queueFileComplete
		* @param file {Kiwi.Files.File}
		* @since 1.2.0
		* @private
		*/
		private _queueFileComplete(file: Kiwi.Files.File) {

			//Remove from the loadingQueue
			var index = this._loadingQueue.indexOf(file);
			if (index === -1) {
				Kiwi.Log.warn("Something has gone wrong? The file which executed this method doesn't exist in the loadingQueue.", '#loading', '#error');
				return;
			}

			this._loadingQueue.splice(index, 1);

			//Start loading the next file
			this._startLoadingQueue();
		}

		/**
		* Starts loading a file which can be loaded in parallel.
		* @method _startLoadingParallel
		* @param params file {Kiwi.Files.File}
		* @since 1.2.0
		* @private 
		*/
		private _startLoadingParallel( file: Kiwi.Files.File) {

			if (!file.loading) {
                file.onComplete.add(this._parallelFileComplete, this, 1);
				file.load();
			}

		}
		
		/**
		* Starts loading all files which can be loaded in parallel.
		* @method _startLoadingAllParallel
		* @since 1.2.0
		* @private 
		*/
		private _startLoadingAllParallel() {

			var i = this._loadingParallel.length,
				file: Kiwi.Files.File;

			while( i-- ) {
				this._startLoadingParallel( this._loadingParallel[ i ] );
			}
		}
		
		/**
		* Executed when a file in the 'loadingParallel' lsit has been successfully loaded.
		* Removes the file from the list and get the fileQueue to check its progress.
		* 
		* @method _parallelFileComplete
		* @param file {Kiwi.Files.File}
		* @since 1.2.0
		* @private 
		*/
		private _parallelFileComplete(file: Kiwi.Files.File) {

			var index = this._loadingParallel.indexOf(file);
			if (index === -1) {
				Kiwi.Log.warn("Something has gone wrong? The file which executed this method doesn't exist in the loadingParallel.", '#loading', '#error');
				return;
            }

			this._loadingParallel.splice(index, 1);
		}


		/**
		* -----------------------------
		* Bytes Loaded Methods 
		* -----------------------------
		**/
		
		/**
		* If the number of bytes for each file should be calculated before the queue starts loading.
		* If true each file in the queue makes a XHR HEAD request first to get the total values.
		*
		* @property _calculateBytes
		* @type Boolean
		* @private 
		*/
		private _calculateBytes: boolean = false;

		/**
		* Callback for when the total number of bytes of the files in the file list has been calculated.
		* 
		* @property onQueueSizeCalculate
		* @type any
		* @private
		*/
		private onSizeCallback: any;
		
		/**
		* Context that the onSizeCallback should be executed in.
		* 
		* @property onSizeContext
		* @type any
		* @private
		*/
		private onSizeContext: any;

		/**
		* The index of the current file in the filelist thats size is being retrieved.
		* @property _currentFileIndex
		* @type number
		* @private
		*/
		private _currentFileIndex: number = 0;

		/**
		* Total file size (in bytes) of all files in the queue to be loaded. 
		* 
		* @property _bytesTotal
		* @type Number
		* @private
		*/
		private _bytesTotal: number = 0;

		/**
		* READ ONLY: Returns the total number of bytes for the files in the file queue.
		* Only contains a value if you use the 'calculateBytes' and are loading files
		* OR if you use the 'calculateQueuedSize' method.
		* 
		* @property bytesTotal
		* @readOnly
		* @default 0
		* @since 1.2.0
		* @type Number
		* @public
		*/
		public get bytesTotal(): number {
			return this._bytesTotal;
		}

		/**
		* The number of bytes loaded of files in the file queue. 
		* 
		* @property _bytesLoaded
		* @type Number
		* @private 
		*/
		private _bytesLoaded: number = 0;

		/**
		* READ ONLY: Returns the total number of bytes for the files in the file queue.
		*
		* If you are using this make sure you set the 'calculateBytes' property to true OR execute the 'calculateQueuedSize' method. 
		* Otherwise files that are loaded via tags will not be accurate!
		* 
		* @property bytesLoaded
		* @readOnly
		* @default 0
		* @since 1.2.0
		* @type Number
		* @public
		*/
		public get bytesLoaded(): number {
			return this._bytesLoaded;
		}

		/**
		* Loops through the file queue and gets file information (filesize, ETag, filetype) for each.
		* 
		* To get accurate information about the bytesLoaded, bytesTotal, and the percentLoaded 
		* set the 'calculateBytes' property to true, as the loader will automatically execute this method before hand.
		* 
		* Can only be executed when the file queue is not currently loading.
		* 
		* @method calculateQueuedSize
		* @param callback {any}
		* @param [context=null] {any}
		* @public
		*/
		public calculateQueuedSize(callback: any, context: any = null) {

			//Is the queue currently loading files?
			if (this._queueLoading) {
				Kiwi.Log.warn('Kiwi.Files.Loader: Cannot calculate the size of the files in the filequeue whilst they are loading. ');
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

		/**
		* Checks to see if all the file sizes have been retrieved. 
		* If so completes the "calculateQueuedSize" call.
		* Otherwise requests the next file's details.
		*
		* @method _calculateNextFileSize
		* @private
		*/
		private _calculateNextFileSize() {

			if (this._currentFileIndex >= this._loadingList.length) {
				this._queueLoading = false;
				this.onSizeCallback.call(this.onSizeContext, this._bytesTotal);;
				return;
			}
			
			var file = this._loadingList[this._currentFileIndex];

			//Have we already got the details for this file?
			if (file.detailsReceived) {
				this._detailsReceived();
			} else {
				var details = file.loadDetails(this._detailsReceived, this);

				//Skip to the next file if the request could not be made.
				//Shouldn't happen.
				if (!details) {
					this._detailsReceived();
				}
			}

		}

		/**
		* Executed when by '_calculateNextFileSize' when the files information has been retrieved.
		* Adds its calculated size to the _bytesTotal and executes the 'nextFileSize' method.
		* 
		* @method _detailsReceived
		* @private 
		*/
		private _detailsReceived() {

			var file = this._loadingList[this._currentFileIndex];

			if (file.detailsReceived) {
				this._bytesTotal += file.size;
			}

			this._currentFileIndex++;
			this._calculateNextFileSize();

		}


		/**
		* -----------------------------
		* File Addition Methods
		* -----------------------------
		*/


		/**
		* Creates a new file for an image and adds a the file to loading queue. 
		* @method addImage
		* @param key {String} The key for the file.
		* @param url {String} The url of the image to load.
		* @param [width] {number} The width of the cell on the image to use once the image is loaded.
		* @param [height] {number} The height of the cell on the image to use once the image is loaded.
		* @param [offsetX] {number} An offset on the x axis of the cell.
		* @param [offsetY] {number} An offset of the y axis of the cell.
		* @param [storeAsGlobal=true] {boolean} If the image should be stored globally or not.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal: boolean = true): Kiwi.Files.File {

			var params:any = {
				type: Kiwi.Files.File.IMAGE,
				key: null,
				url: null,
				fileStore: this.game.fileStore,
				metadata: {}
			};

			if ( Kiwi.Utils.Common.isObject(key) ) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;
				params.metadata = {
					width: p.width,
					height: p.height,
					offsetX: p.offsetX,
					offsetY: p.offsetY
				};

				if (p.xhrLoading) params.xhrLoading = p.xhrLoading;//forces blob loading
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
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

			var file: Kiwi.Files.File = new Kiwi.Files.TextureFile(this.game, params);
			this.addFileToQueue(file);

			return file;
		}

		/**
		* Creates a new file for a spritesheet and adds the file to the loading queue.
		* @method addSpriteSheet
		* @param key {String} The key for the file.
		* @param url {String} The url of the image to load.
		* @param frameWidth {number} The width of a single cell in the spritesheet.
		* @param frameHeight {number} The height of a single cell in the spritesheet.
		* @param [numCells] {number} The number of cells that are in this spritesheet.
		* @param [rows] {number} The number of cells that are in a row.
		* @param [cols] {number} The number of cells that are in a column.
		* @param [sheetOffsetX] {number} The offset of the whole spritesheet on the x axis.
		* @param [sheetOffsetY] {number} The offset of the whole spritesheet on the y axis.
		* @param [cellOffsetX] {number} The spacing between each cell on the x axis.
		* @param [cellOffsetY] {number} The spacing between each cell on the y axis.
		* @param [storeAsGlobal=true] {boolean} 
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal: boolean = true) {

			var params: any = {
				type: Kiwi.Files.File.SPRITE_SHEET,
				key: null,
				url: null,
				fileStore: this.game.fileStore,
				metadata: {}
			};


			if (Kiwi.Utils.Common.isObject(key)) {
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

				if (p.xhrLoading) params.xhrLoading = p.xhrLoading;//forces blob loading
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
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


			var file = new Kiwi.Files.TextureFile(this.game, params);
			this.addFileToQueue(file);

			return file;
		}

		/**
		* Creates new file's for loading a texture atlas and adds those files to the loading queue.
		* @method addTextureAtlas
		* @param key {String} The key for the image file.
		* @param imageUrl {String} The url of the image to load.
		* @param jsonID {String} A key for the JSON file.
		* @param jsonURL {String} The url of the json file to load.
		* @param [storeAsGlobal=true] {Boolean} If hte files should be stored globally or not.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addTextureAtlas(key: string, imageURL: string, jsonID: string, jsonURL: string, storeAsGlobal: boolean = true) {

			var textureParams: any = {
				type: Kiwi.Files.File.TEXTURE_ATLAS,
				key: key,
				url: imageURL,
				fileStore: this.game.fileStore,
				metadata: {
					jsonID: jsonID
				}
			};
			var jsonParams: any = {
				type: Kiwi.Files.File.JSON,
				key: jsonID,
				url: jsonURL,
				fileStore: this.game.fileStore,
				metadata: {
					imageID: key
				}
			};

			if (!storeAsGlobal && this.game.states.current) {
				textureParams.state = this.game.states.current;
				jsonParams.state = this.game.states.current;
			}

			if (Kiwi.Utils.Common.isObject(key)) {
				var p: any = key;

				textureParams.key = p.textureAtlasKey;
				textureParams.url = p.textureAtlasURL;
				jsonParams.key = p.jsonKey;
				jsonParams.url = p.jsonURL;

				textureParams.metadata.jsonID = jsonParams.key;
				jsonParams.metadata.imageID = textureParams.key;

				if( p.crossOrigin ) {
					textureParams.crossOrigin = p.crossOrigin;
					jsonParams.crossOrigin = p.crossOrigin;
				}

				if (p.state) {
					textureParams.state = p.state;
					jsonParams.state = p.state;
				}

				if (p.xhrLoading) textureParams.xhrLoading = p.xhrLoading; //forces blob loading
				if (p.tags) {
					jsonParams.tags = p.tags;
					textureParams.tags = p.tags;
				}

			}

			var imageFile = new Kiwi.Files.TextureFile(this.game, textureParams);
			var jsonFile = new Kiwi.Files.DataFile(this.game, jsonParams);

			this.addFileToQueue(imageFile);
			this.addFileToQueue(jsonFile);

			return imageFile;
		}

		/**
		* Creates a new File to store a audio piece. 
		* This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
		* You can override this behaviour and tell the audio data to load even if not supported by setting the 'onlyIfSupported' boolean to false.
		* Also you can now pass an array of filepaths, and the first audio filetype that is supported will be loaded.
		*
		* @method addAudio
		* @param key {String} The key for the audio file.
		* @param url {String} The url of the audio to load. You can pass an array of URLs, in which case the first supported audio filetype in the array will be loaded.
		* @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
		* @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. 
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addAudio(key: string, url: any, storeAsGlobal: boolean = true, onlyIfSupported: boolean = true) {

			var params = {
				type: Kiwi.Files.File.AUDIO,
				key: null,
				url: null,
				state: null,
				fileStore: this.game.fileStore
			};

			if (Kiwi.Utils.Common.isObject(key)) {
				params = (<any>key);
				params.type = Kiwi.Files.File.AUDIO;
				params.fileStore = this.game.fileStore;

			} else {
				params.key = key;
				params.url = url;

				if (!storeAsGlobal && this.game.states.current) {
					params.state = this.game.states.current;
				}

			}

			var i = 0,
				urls, file;

			//If it is a string then try to load that file
			if (Kiwi.Utils.Common.isString(params.url)) {
				urls = [params.url];
			} else {
				urls = params.url;
			}

			while (i < urls.length) {

				params.url = urls[i]
				file = this._attemptToAddAudio(params, onlyIfSupported);
				if (file) {
					return file;
				}

				i++;
			}

			return null;
		}

		/**
		* This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
		* Returns a boolean if the audio file was successfully added or not to the file directory.
		* @method _attemptToAddAudio
		* @param params {Object} 
		*   @param params.key {String} The key for the audio file.
		*   @param params.url {String} The url of the audio to load. 
		*   @param [params.state=true] {Kiwi.State} The state this file should be for.
		*   @param [params.fileStore] {Kiwi.Files.FileStore} 
		* @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. 
		* @return {Kiwi.Files.File} The file which was created.
		* @private
		*/
		private _attemptToAddAudio(params:any, onlyIfSupported: boolean): Kiwi.Files.File {

			var file = new Kiwi.Files.AudioFile(this.game, params);
			var support = false;

			switch (file.extension) {
				case 'mp3':
					support = Kiwi.DEVICE.mp3;
					break;

				case 'ogg':
				case 'oga':
					support = Kiwi.DEVICE.ogg;
					break;

				case 'm4a':
					support = Kiwi.DEVICE.m4a;
					break;

				case 'wav':
				case 'wave':
					support = Kiwi.DEVICE.wav;
					break;
			}

			if (support == true || onlyIfSupported == false) {
				this.addFileToQueue(file);
				return file;
			} else {
				Kiwi.Log.error('Kiwi.Loader: Audio Format not supported on this Device/Browser.', '#audio', '#unsupported');
				return null;
			}

		}

		/**
		* Creates a new File to store JSON and adds it to the loading queue.
		* @method addJSON
		* @param key {String} The key for the file.
		* @param url {String} The url to the json file.
		* @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addJSON(key: string, url: string, storeAsGlobal: boolean = true) {

			var params: any = {
				type: Kiwi.Files.File.JSON,
				key: key, 
				url: url,
				fileStore: this.game.fileStore
			};

			if (Kiwi.Utils.Common.isObject(key)) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if (p.parse) params.parse = p.parse;
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile(this.game, params);
			this.addFileToQueue(file);
			return file;

		}

		/**
		* Creates a new File to store XML and adds it to the loading queue.
		* @method addXML
		* @param key {String} The key for the file.
		* @param url {String} The url to the xml file.
		* @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addXML(key: string, url: string, storeAsGlobal: boolean = true) {
			
			var params:any = {
				type: Kiwi.Files.File.XML,
				key: key,
				url: url,
				fileStore: this.game.fileStore
			};

			if (Kiwi.Utils.Common.isObject(key)) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if (p.parse) params.parse = p.parse;
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile(this.game, params);
			this.addFileToQueue(file);
			return file;

		}

		/**
		* Creates a new File for a Binary file and adds it to the loading queue.
		* @method addBinaryFile
		* @param key {String} The key for the file.
		* @param url {String} The url to the Binary file.
		* @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addBinaryFile(key: string, url: string, storeAsGlobal: boolean = true) {

			var params: any = {
				type: Kiwi.Files.File.BINARY_DATA,
				key: key,
				url: url,
				fileStore: this.game.fileStore
			};

			if (Kiwi.Utils.Common.isObject(key)) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if (p.parse) params.parse = p.parse;
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile(this.game, params);
			this.addFileToQueue(file);
			return file;

		}

		/**
		* Creates a new File to store a text file and adds it to the loading queue.
		* @method addTextFile
		* @param key {String} The key for the file.
		* @param url {String} The url to the text file.
		* @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
		* @return {Kiwi.Files.File} The file which was created.
		* @public
		*/
		public addTextFile(key: string, url: string, storeAsGlobal: boolean = true) {

			var params: any = {
				type: Kiwi.Files.File.TEXT_DATA,
				key: key,
				url: url,
				fileStore: this.game.fileStore
			};

			if (Kiwi.Utils.Common.isObject(key)) {
				var p: any = key;

				params.key = p.key;
				params.url = p.url;

				if (p.parse) params.parse = p.parse;
				if (p.state) params.state = p.state;
				if (p.tags) params.tags = p.tags;
				if (p.crossOrigin) params.crossOrigin = p.crossOrigin;

			} else {

				if (!storeAsGlobal && this.game.states.current) {
					params.state = this.game.states.current;
				}

			}

			var file = new Kiwi.Files.DataFile(this.game, params);
			this.addFileToQueue(file);
			return file;

		}

		/**
		* Flags this loader for garbage collection. Only use this method if you are SURE you will no longer need it. 
		* Otherwise it is best to leave it alone.
		* 
		* @method destroy
		* @public
		*/
		public destroy() {

			this.onQueueComplete.dispose();
			this.onQueueProgress.dispose();

			delete this.game;

			delete this.onQueueComplete;
			delete this.onQueueProgress;

			var i = 0;
			while (i < this._loadingList.length) {
				this._loadingList[i].destroy();
				i++;
			}
			this._loadingList = [];

			var i = 0;
			while (i < this._loadingQueue.length) {
				this._loadingQueue[i].destroy();
				i++;
			}
			this._loadingQueue = [];

			var i = 0;
			while (i < this._loadingParallel.length) {
				this._loadingParallel[i].destroy();
				i++;
			}
			this._loadingParallel = [];


		}

		
		/**
		* -----------------------
		* Deprecated - Functionality exists. Maps to its equalvent
		* -----------------------
		**/


		/**
		* Initialise the properities that are needed on this loader.
		* Recommended you use the 'onQueueProgress' / 'onQueueComplete' signals instead.
		* 
		* @method init
		* @param [progress=null] {Any} Progress callback method.
		* @param [complete=null] {Any} Complete callback method.
		* @param [calculateBytes=false] {boolean} 
		* @deprecated Deprecated as of 1.2.0
		* @public
		*/
		public init(progress: any = null, complete: any = null, calculateBytes: boolean=null) {

			if (calculateBytes !== null) {
				this._calculateBytes = calculateBytes;
			} 

			if (progress !== null) {
				this.onQueueProgress.addOnce( progress );
			}

			if (complete !== null) {
				this.onQueueComplete.addOnce( complete );
			}

		}

		/**
		* Loops through all of the files that need to be loaded and start the load event on them. 
		* @method startLoad
		* @deprecated Use 'start' instead. Deprecated as of 1.2.0
		* @public
		*/
		public startLoad() {
			this.start();
		}

		/**
		* Returns a percentage of the amount that has been loaded so far.
		* @method getPercentLoaded
		* @return {Number}
		* @deprecated Use 'percentLoaded' instead. Deprecated as of 1.2.0
		* @public
		*/
		public getPercentLoaded(): number {
			return this.percentLoaded;
		}


		/**
		* Returns a boolean indicating if everything in the loading que has been loaded or not.
		* @method complete
		* @return {boolean}
		* @deprecated Use 'percentLoaded' instead. Deprecated as of 1.2.0
		* @public
		*/
		public complete(): boolean {
			return ( this.percentLoaded === 100 );
		}

		/**
		* Quick way of getting / setting the private variable 'calculateBytes'
		* To be made into a public variable once removed.
		* @method calculateBytes
		* @param [value] {boolean}
		* @return {boolean}
		* @public
		*/
		public calculateBytes(value?: boolean): boolean {

			if (typeof value !== "undefined") {
				this._calculateBytes = value;
			}

			return this._calculateBytes;
		}

		/**
		* Returns the total number of bytes that have been loaded so far from files in the file queue.
		* 
		* @method getBytesLoaded
		* @return {Number}
		* @readOnly
		* @deprecated Use 'bytesLoaded' instead. Deprecated as of 1.2.0
		* @public
		*/
		public getBytesLoaded(): number {

			return this.bytesLoaded;
		}

	}

}
