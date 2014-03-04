/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
     
    /**
    * Handles the loading of an external data file via a tag loader OR xhr + arraybuffer, and optionally saves to the file store.
    * Also can contain information about the file (like file size, last modified, e.t.c.) either after it has been loaded 
    * OR if you use the 'getFileDetails' method and the properties will then be set.
    *
    * @class File
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this file belongs to.
    * @param dataType {Number} The type of file that is being loaded. For this you can use the STATIC properties that are located on this class for quick code completion.
    * @param path {String} The location of the file that is to be loaded.
    * @param [name=''] {String} A name for the file. If no name is specified then the files name will be used.
    * @param [saveToFileStore=true] {Boolean} If the file should be saved on the file store or not.
    * @param [storeAsGlobal=true] {Boolean} If this file should be stored as a global file, or if it should be destroyed when this state gets switched out.
    * @return {File} 
    *
    */
    export class File {
         
        constructor(game: Kiwi.Game, dataType: number, path: string, name: string = '', saveToFileStore: boolean = true, storeAsGlobal:boolean = true) {

            this._game = game;

            this.dataType = dataType;

            this.fileURL = path;

            if (path.lastIndexOf('/') > -1)
            {
                this.fileName = path.substr(path.lastIndexOf('/') + 1);
                this.filePath = path.substr(0, path.lastIndexOf('/') + 1);
            }
            else
            {
                this.filePath = '';
                this.fileName = path;
            }

            //  Not safe if there is a query string after the file extension
            this.fileExtension = path.substr(path.lastIndexOf('.') + 1).toLowerCase();

            if (Kiwi.DEVICE.blob) {
                this._useTagLoader = true;
            } else {                
                this._useTagLoader = true;
            }

            if (this.dataType === Kiwi.Files.File.AUDIO) {
                
                if (this._game.audio.usingAudioTag === true) {
                    this._useTagLoader = true;

                } else { //just dont use the tag loader...just dont....
                    this._useTagLoader = false;

                }
            }

            if (this.dataType === Kiwi.Files.File.JSON) {
                this._useTagLoader = false; 
            }

            this._saveToFileStore = saveToFileStore;
            this._fileStore = this._game.fileStore;

            // null state owner indicates global storage
            if (this._game.states.current && !storeAsGlobal) {
                this.ownerState = this._game.states.current;
            } else {
                this.ownerState = null;
            }

            if (this.key === '')
            {
                this.key = this.fileName;
            }
            else
            {
                this.key = name;
            }


        }


        /**
        * Returns the type of this object
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "File";
        }


        /**
        * The state that added the entity - or null if it was added as global
        * @property ownerState
        * @type Kiwi.State
        * @public
        */
        public ownerState: Kiwi.State;


        /**
        * Any tags that are on this file. This can be used to grab files/objects on the whole game that have these particular tag.
        * @property _tags
        * @type String[]
        * @default []
        * @private
        */
        private _tags: string[];


        /**
        * Adds a new tag to this file. 
        * @method addTag
        * @param tag {String} The tag that you would like to add
        * @public
        */
        public addTag(tag: string) {
            if (this._tags.indexOf(tag) == -1) {
                this._tags.push(tag);
            }
        }


        /**
        * Removes a tag from this file.
        * @method removeTag
        * @param tag {String} The tag that is to be removed.
        * @public
        */
        public removeTag(tag: string) {
            var index: number = this._tags.indexOf(tag);
            if (index != -1) {
                this._tags.splice(index, 1);
            }
        }


        /**
        * Checks to see if a tag that is passed exists on this file and returns a boolean that is used as a indication of the results. True means that the tag exists on this file.
        * @method hasTag
        * @param tag {String} The tag you are checking to see exists.
        * @return {Boolean} If the tag does exist on this file or not.
        * @public
        */
        public hasTag(tag: string) {
            if (this._tags.indexOf(tag) == -1) {
                return false;
            }
            return true;

        }


        /**
        * A STATIC property that has the number associated with the IMAGE Datatype.
        * @property IMAGE
        * @type number
    	* @static
        * @final
        * @default 0
        * @public
        */
        public static IMAGE: number = 0;


        /**
        * A STATIC property that has the number associated with the SPRITE_SHEET Datatype.
        * @property SPRITE_SHEET
        * @type number
    	* @static
        * @final
        * @default 1
        * @public
    	*/
        public static SPRITE_SHEET: number = 1;


        /**
        * A STATIC property that has the number associated with the TEXTURE_ATLAS Datatype.
        * @property TEXTUREATLAS
        * @type number
    	* @static
        * @final
        * @default 2
        * @public
    	*/
        public static TEXTURE_ATLAS: number = 2;


        /**
        * A STATIC property that has the number associated with the AUDIO Datatype.
        * @property AUDIO
        * @type number
    	* @static
        * @final
        * @default 3
        * @public
	    */
        public static AUDIO: number = 3;


        /**
        * A STATIC property that has the number associated with the JSON Datatype.
        * @property JSON
        * @type number
    	* @static
        * @final
        * @default 4
        * @public
	    */
        public static JSON: number = 4;


        /**
        * A STATIC property that has the number associated with the XML Datatype.
        * @property XML
        * @type number
    	* @static
        * @final
        * @default 5
        * @public
	    */
        public static XML: number = 5;


        /**
        * A STATIC property that has the number associated with the BINARY_DATA Datatype.
        * @property BINARY_DATA
        * @type number
    	* @static
        * @final
        * @default 6
        * @public
	    */
        public static BINARY_DATA: number = 6;


        /**
        * A STATIC property that has the number associated with the TEXT_DATA Datatype.
        * @property TEXT_DATA
        * @type number
    	* @static
        * @final
        * @default 7
        * @public
    	*/
        public static TEXT_DATA: number = 7;


        /**
        * The game that this file belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;


        /**
        * The XMLHttpRequest object. This only has a value if the xhr method of load is being used, otherwise this is null.
        * @property _xhr
        * @type XMLHttpRequest
        * @private
	    */
        private _xhr: XMLHttpRequest = null;


        /**
        * The file store that this file is a part of.
        * @property _fileStore
        * @type FileStore
        * @private
        */
        private _fileStore: Kiwi.Files.FileStore;


        /**
        * Used to determine if this file should be saved to the file store or not. 
        * @property _saveToFileStore
        * @type boolean
        * @default true
        * @private
	    */
        private _saveToFileStore: boolean = true;


        /**
        * If when loading the file in we have loaded the file in using a tag loader (older browsers) or we are using the an XHR loader + array buffer.
        * By default we use the tag loader and only used the second method if the browser supports it.
        * @property _useTagLoader
        * @type boolean
        * @default true
        * @private
	    */
        private _useTagLoader: boolean = true;


        /**
        * Holds the type of data that is being loaded. This should be used with the STATIC properties that hold the various datatypes that can be loaded.
        * @property dataType
        * @type String
        * @public
    	*/
        public dataType: number;


        /**
        * The 'key' is the user defined name and the users way of accessing this file once loaded.
        * @property key
        * @type String
        * @public
    	*/
        public key: string;


        /**
        * The name of the file being loaded.
        * @property fileName
        * @type String
    	* @public
        */
        public fileName: string;


        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
    	* @public
        */
        public filePath: string;


        /**
        * The type of file that is being loaded.
        * Is only ever given a value when used with the XHR method of loading OR if you use 'getFileDetails' before hand.
        * The value is based off of the 'Content-Type' of the XHR's response header returns.
        * @property fileType
        * @type String
        * @public
    	*/
        public fileType: string;


        /**
        * The extension of the file that is being loaded.
        * This is based upon what the file path that the developer (you) specify.
        * @property fileExtension
        * @type String
        * @public
    	*/
        public fileExtension: string;


        /**
        * The full filepath including the file itself.
        * @property fileURL
        * @type String
        * @public
    	*/
        public fileURL: string;


        /**
        * The size of the file that was/is being loaded. 
        * Only has a value when the file was loaded by the XHR method OR you request the file information before hand using 'getFileDetails'.
        * @property fileSize
        * @type Number
        * @default 0
        * @public
    	*/
        public fileSize: number = 0;


        /**
        * The Entity Tag that is assigned to the file. O
        * Only has a value when either using the XHR loader OR when requesting the file details.
        * @property ETag
        * @type String
        * @public
        */
        public ETag: string = '';


        /**
        * The last date/time that this file was last modified. 
        * Only has a value when using the XHR method of loading OR when requesting the file details.
        * @property lastModified
        * @type String
        * @default ''
        * @public
        */
        public lastModified: string = '';


        /**
        * The time at which the loading started. Only has a value when the XHR method of loading is in use.
        * @property timeStarted
        * @type Number
        * @default 0
        * @public
    	*/
        public timeStarted: number = 0;


        /**
        * The time at which the load finished. Only has a value if loading the file was successful and when the XHR method of loading is in use.
        * @property timeFinished
        * @type Number
        * @default 0
        * @public
    	*/
        public timeFinished: number = 0;


        /**
        * The duration or how long it took to load the file. In milliseconds. 
        * @property duration
        * @type Number
    	* @default 0
        * @public
        */
        public duration: number = 0;


        /**
        * If the loading of the file failed or encountered an error.
        * @property hasError
        * @type boolean
        * @default false
        * @public
    	*/
        public hasError: boolean = false;


        /**
        * If the loading was a success or not. 
        * @property success
        * @type boolean
        * @public
    	*/
        public success: boolean = false;


        /**
        * Holds the error (if there was one) when loading the file.
        * @property error
        * @type Any
        * @public
    	*/
        public error: any;


        /**
        * A method that is to be executed when this file has finished loading. 
        * @property onCompleteCallback
        * @type Any
        * @default null
        * @public
    	*/
        public onCompleteCallback: any = null;


        /**
        * A method that is to be executed while this file is loading.
        * @property onProgressCallback
        * @type Any
        * @default null
        * @public
    	*/
        public onProgressCallback: any = null;


        /**
        * The time at which progress in loading the file was last occurred.
        * @property lastProgress
        * @type Number
        * @public
    	*/
        public lastProgress: number = 0;
    

        /**
        * The amount of percent loaded the file is. This is out of 100.
        * @property percentLoaded
        * @type Number
        * @public
    	*/
        public percentLoaded: number = 0;


        /**
        * The particular piece of data that the developer wanted loaded. This is in a format that is based upon the datatype passed.
        * @property data
        * @type Any
    	*/
        public data: any;


        /**
        * A dictionary, stores any information relating to this file.
        * Is useful when loading images that are to be used as a spritesheet or texture atlas.
        * @property data
        * @type Any
        * @public
    	*/
        public metadata: any;


        /*
        *----------------
        * Type Identification
        *----------------
        */


        /**
        * An indication of if this file is texture. This is READ ONLY.
        * @property isTexture
        * @type boolean
        * @public
        */
        public get isTexture(): boolean {
            if (this.dataType === File.IMAGE || this.dataType === File.SPRITE_SHEET || this.dataType === File.TEXTURE_ATLAS) {
                return true;
            }
            return false;
        }

        
        /**
        * An indication of if this file is a piece of audio. This is READ ONLY.
        * @property isAudio
        * @type boolean
        * @public
        */
        public get isAudio(): boolean {
            if (this.dataType === File.AUDIO) {
                return true;
            }
            return false;
        }
            

        /**
        * An indication of if this file is data. This is READ ONLY.
        * @property isData
        * @type boolean
        * @public
        */
        public get isData(): boolean {
            if (this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA) {
                return true;
            }
            return false;
        }


        /*
        *-----------------
        * General Loading
        *-----------------
        */


        /**
        * Starts the loading process for this file.
        * @method load
        * @param [onCompleteCallback=null] {Any} The callback method to execute when this file has loaded.
        * @param [onProgressCallback=null] {Any} The callback method to execute while this file is loading.
        * @param [customFileStore=null] {Any} A custom filestore that is file should be added to. 
        * @param [maxLoadAttempts] {Number} The maximum amount of times to try and load this file.  
        * @param [timeout] {Number} The timeout to use when loading the file. Overrides the default timeout if passed otherwise uses the default 2000 milliseconds.
        * @public
        */
        public load(onCompleteCallback: any = null, onProgressCallback: any = null, customFileStore: Kiwi.Files.FileStore = null, maxLoadAttempts?: number, timeout?: number) {
            if (this._game.debug) {
                console.log("Attempting to load: " + this.fileName);
            }

            this.onCompleteCallback = onCompleteCallback;
            this.onProgressCallback = onProgressCallback;

            if (maxLoadAttempts != undefined) this.maxLoadAttempts = maxLoadAttempts;
            if (timeout != undefined) this.timeOutDelay = timeout;

            //Should the file be saved in a custom file store?
            if (customFileStore !== null) {
                this._fileStore = customFileStore;
                this._saveToFileStore = true;
            }

            //Start the load.
            this.start();

            //Load using the appropriate 
            if (this._useTagLoader === true) {
                this.tagLoader();
            }
            else
            {
                this.xhrLoader();
            }

        }


        /**
        * Is executed when this file starts loading. 
        * Gets the time and initalised properties that are used across both loading methods.
        * @method start
		* @private
        */
        private start() {

            this.timeStarted = Date.now();
            this.lastProgress = Date.now();
            this.percentLoaded = 0;
            this.attemptCounter = 0;

        }


        /**
        * Is executed when this file stops loading. Used across all loading methods. 
        * @method stop
        * @private
		*/
        private stop() {

            this.percentLoaded = 100;
            this.timeFinished = Date.now();
            this.duration = this.timeFinished - this.timeStarted;

        }

        /*
        *-----------------
        * Tag Loader Methods 
        *-----------------
        */

        /**
        * Handles the loading of the file when using the tag loader method. 
        * Only supports the IMAGES and AUDIO files.
        * @method tagLoader
		* @private
        */
        private tagLoader() {

            //Is the file a image?
            if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS)
            {
                this.data = new Image();
                this.data.src = this.fileURL;
                this.data.onload = (event) => this.tagLoaderOnLoad(event);
                this.data.onerror = (event) => this.tagLoaderOnError(event);        //To be remade
                this.data.onreadystatechange = (event) => this.tagLoaderOnReadyStateChange(event);

            //Is the file a piece of audio?
            } else if (this.dataType === Kiwi.Files.File.AUDIO) {

                //Create the audio Element
                this.data = document.createElement('audio');
                this.data.src = this.fileURL;
                this.data.preload = 'auto';

                
                //Is the audio currently locked? 
                //This would mainly be due to iOS waiting for a touch/mouse event to fire.
                if (this._game.audio.locked) {
                    this.tagLoaderAudioLocked();

                } else {
                    this.data.addEventListener('canplaythrough', () => this.tagLoaderProgressThrough(null), false);
                     
                    //If targetting Cocoon we can use the load method to force the audio loading.
                    if (this._game.deviceTargetOption == Kiwi.TARGET_COCOON) {
                        this.data.load();

                    //Otherwise we tell the browser to play the audio in 'mute' to force loading. 
                    } else {
                        this.data.volume = 0;
                        this.data.play(); 
                    
                    }
                }
            }
            
        }

        /**
        * Is executed when the tag loader changes its ready state. 
        * @method tagLoaderOnReadyStateChange
        * @param {Any} event
        * @private
		*/
        private tagLoaderOnReadyStateChange(event) {

        }

        /**
        * Is executed when the tag loader encounters a error that stops it from loading.
        * @method tagLoaderOnError
        * @param {Any} event
        * @private
		*/
        private tagLoaderOnError(event) {

            this.hasError = true;
            this.error = event;

            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }
        
        /**
        * Is executed when an audio file can play the whole way through with stopping to load.
        * @method tagLoaderProgressThrough
        * @param {Any} event
        * @private
        */
        private tagLoaderProgressThrough(event) {
            
            //Has it not fully loaded yet? 
            //Work arround as the tag will constantly fire.
            if (this.percentLoaded !== 100) { 

                if (this.dataType === Kiwi.Files.File.AUDIO) {
                    this.data.removeEventListener('canplaythrough', () => this.tagLoaderProgressThrough(null)); //Remove will not work due to the nameless function.

                    //Stop the audio and reset it to the default settings.
                    this.data.pause();          
                    this.data.currentTime = 0;
                    this.data.volume = 1;
                }
                
                this.tagLoaderOnLoad(null);
                
            }
        }


        /**
        * Is executed when iOS (or another device) is being used and the audio is 'locked'.
        * 'Fakes' the loading and tells the rest of the game to carry on.
        * @method tagLoaderIOSLoad
        * @private
        */
        private tagLoaderAudioLocked() {
            this.percentLoaded = 100;
            this.tagLoaderOnLoad(null);
        }


        /**
        * Is executed when the file has successfully loaded.
        * @method tagLoaderOnLoad
        * @param {Any} event
        * @private
        */
        private tagLoaderOnLoad(event) {
            
            this.stop();
            
            //Image loaded successfully...bit of a assumtion but hey...its a tag loader.
            if (this._game.debug)
                console.log('Successfully Loaded: ' + this.fileName);

            if (this._saveToFileStore === true)
            {
                this._fileStore.addFile(this.key, this);
            }
                
            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }


        /*
        *-----------------------
        * XHR Loading 
        *-----------------------
        */


        /**
        * The status of this file that is being loaded. 
        * Only used/has a value when the file was/is being loaded by the XHR method.
        * @property status
        * @type Number
        * @default 0
        * @public
        */
        public status: number = 0;


        /**
        * The status piece of text that the XHR returns.
        * @property statusText
        * @type String
        * @default ''
        * @public
        */
        public statusText: string = '';


        /**
        * The number of bytes that have currently been loaded. 
        * This can used to create progress bars but only has a value when using the XHR method of loading.
        * @property bytesLoaded
        * @type Number
        * @default 0
        * @public
        */
        public bytesLoaded: number = 0;


        /**
        * The total number of bytes that the file consists off.
        * Only has a value when using the XHR method of loading.
        * @property bytesTotal
        * @type Number
        * @default 0
        * @public
        */
        public bytesTotal: number = 0;


        /**
        * The ready state of the XHR loader whilst loading.
        * @property readyState
        * @type Number
        * @default 0
        * @public
        */
        public readyState: number = 0;

            
        /**
        * The default number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        * @property timeOutDelay
        * @type Number
        * @default 2000
        * @public
        */
        public timeOutDelay: number = 4000;


        /**
        * If this file has timeout when it was loading. 
        * @property hasTimedOut
        * @type boolean
        * @default false
        * @public
        */
        public hasTimedOut: boolean = false;


        /**
        * If the file timed out or not.
        * @property timedOut
        * @type Number
        * @default 0
        * @public
        */
        public timedOut: number = 0;


        /**
        * The number of attempts at loading there have currently been at loading the file.
        * This is only used with XHR methods of loading.
        * @property attemptCounter
        * @type Number
        * @public
        */
        public attemptCounter: number = 0;


        /**
        * The maximum attempts at loading the file that there is allowed.
        * Only used with XHR methods of loading.
        * @property maxLoadAttempts
        * @type Number
        * @default 2
        * @public
        */
        public maxLoadAttempts: number = 2;


        /**
        * The response that is given by the XHR loader when loading is complete.
        * @property buffer
        * @type Any
        * @public
        */
        public buffer: any;


        /**
        * Sets up a XHR loader based on the properties of this file.
        * @method xhrLoader
        * @private
		*/
        private xhrLoader() {

            this.attemptCounter++;

            //Open a request
            this._xhr = new XMLHttpRequest();
            this._xhr.open('GET', this.fileURL, true);
            if(this.timeOutDelay !== null) this._xhr.timeout = this.timeOutDelay;
            this._xhr.responseType = 'arraybuffer';

            //Assignment of callbacks
            this._xhr.onloadstart = (event) => this.xhrOnLoadStart(event);
            this._xhr.onprogress = (event) => this.xhrOnProgress(event);
            this._xhr.ontimeout = (event) => this.xhrOnTimeout(event);
            this._xhr.onabort = (event) => this.xhrOnAbort(event);
            this._xhr.onload = (event) => this.xhrOnLoad(event);
            this._xhr.onreadystatechange = (event) => this.xhrOnReadyStateChange(event);

            //Go!
            this._xhr.send();

        }


        /**
        * Is executed when the XHR loader has changed its ready state.
        * @method xhrOnReadyStateChange
        * @param {Any} event
        * @private
		*/
        private xhrOnReadyStateChange(event) {

            this.readyState = event.target.readyState;

            if (this.readyState === 4) {
                this.xhrOnLoad(event);
            }

        }


        /**
        * Is executed when the XHR loader starts to load the file.
        * @method xhrOnLoadStart
        * @param {Any} event
        * @private
		*/
        private xhrOnLoadStart(event) {

            this.timeStarted = event.timeStamp;
            this.lastProgress = event.timeStamp;

        }


        /**
        * Runs when the XHR loader aborts the load for some reason. 
        * @method xhrOnAbort
        * @param {Any} event
        * @private
		*/
        private xhrOnAbort(event) {
            if (this._game.debug)
                console.log(this.fileName + ' loading was aborted.');    

            this.error = event;
        }


        /**
        * Runs when the XHR loader encounters a error. 
        * @method xhrOnError
        * @param {Any} event
        * @private
		*/
        private xhrOnError(event) {
            if (this._game.debug)
                console.log('Error during load: ' + this.fileName);

            this.error = event;
        }


        /**
        * Is executed when the xhr 
        * @method xhrOnTimeout
        * @param {Any} event
        * @private
		*/
        private xhrOnTimeout(event) {
            if (this._game.debug)
                console.log('Timed out: '+ this.fileName);

            this.hasTimedOut = true;
            this.timedOut = Date.now();
            this.error = event;
        }


        /**
        * Is execute whilst loading of the file is occuring. Updates the number of bytes that have been loaded and percentage loaded.
        * @method xhrOnProgress
        * @param {Any} event
        * @private
		*/
        private xhrOnProgress(event) {

            this.bytesLoaded = parseInt(event.loaded);
            this.bytesTotal = parseInt(event.totalSize);
            this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

            if (this.onProgressCallback)
            {
                this.onProgressCallback(this);
            }

        }


        /**
        * Once the file has finished downloading (or pulled from the browser cache) this onload event fires.
        * @method xhrOnLoad
        * @param {event} The XHR event
        * @private
        */
        private xhrOnLoad(event) {

            //Stop re-processing of the file if it was already processed. 
            //Received from the ready state.
            if (this.timeFinished > 0) return;
            
            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            //Was the loading a success?
            if (this._xhr.status === 200) {

                this.stop();
                this.success = true;
                this.hasError = false;

                if (this._game.debug)
                    console.log('Successfully Loaded: ' + this.fileName);

                //Get the head information of the file.
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');
                this.buffer = this._xhr.response;

                //Start processing of the file.
                this.processFile();

            //Failed to load.
            } else {

                //Should we try to load the file again?
                if (this.attemptCounter >= this.maxLoadAttempts) {
                    this.success = false;
                    this.hasError = true;

                    if (this._game.debug)
                        console.error(this.fileName+' wasn\'t loaded.');

                    this.parseComplete();
                } else {
                    if(this._game.debug)
                        console.log('Retrying to load: ' + this.fileName);

                    this.xhrLoader();
                }

            }

        }
        

        /*
        *-----------------
        * Processing of the File (via XHR Loading Method)
        *-----------------
        */

        /**
        * Handles the processing of the files information when it was loaded via the xhr + arraybuffer method. 
        * Is only executed when the loading was a success
            this._xhr.onload = (event) => this.xhrOnLoad(event);.
        * @method processFile
        * @private
        */
        private processFile() {

            //What data type did we load again?
            switch (this.dataType) {

                //Image File was Loaded...
                case Kiwi.Files.File.IMAGE:
                case Kiwi.Files.File.SPRITE_SHEET:
                case Kiwi.Files.File.TEXTURE_ATLAS:
                    this.createBlob();
                    break;


                //JSON was loaded...
                case Kiwi.Files.File.JSON:
                    
                    //Loop through each character of the dataview, which is slower than a whole array but avoids the size issue.
                    this.data = '';
                    var uintArray = new Uint8Array(this.buffer);
                    for (var i = 0; i < uintArray.length; i++) {
                        this.data += String.fromCharCode(uintArray[i]);
                    }
                    this.parseComplete();

                    break;


                //Audio was loaded...
                case Kiwi.Files.File.AUDIO:
                    //Are we using web audio? (Not needed really as audio tags use Tag Loader.
                    if (this._game.audio.usingWebAudio) {
                        this.data = {
                            raw: this._xhr.response,
                            decoded: false,
                            buffer: null
                        }

                        //Decode that Audio
                        var that = this;
                        this._game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                            if (buffer) {
                                that.data.buffer = buffer;
                                that.data.decoded = true;
                                that.parseComplete();
                            }
                        });

                    }
                    break;
                

                //Otherwise it was loaded but we don't know what to do with it...
                default: 
                    this.parseComplete();
            }

        }


        /*
        *--------------------
        * Create Blob Functionality
        *--------------------
        */


        /**
        * Creates a new Binary Large Object for the data that was loaded through the XHR.
        * @method createBlob
        * @private
		*/
        private createBlob() {

            this.data = document.createElement('img');
            this.data.onload = () => this.revoke();

            var imageType = '';

            if (this.fileExtension === 'jpg' || this.fileExtension === 'jpeg')
            {
                imageType = 'image/jpeg';
            }
            else if (this.fileExtension === 'png')
            {
                imageType = 'image/png';
            }
            else if (this.fileExtension === 'gif')
            {
                imageType = 'image/gif';
            }

            //  Until they fix the TypeScript lib.d we have to use window array access

            //  Need to find a way to tell if this suports constuctor values like below, otherwise it just errors Chrome < 20 etc
            //if (typeof window['Blob'] !== 'undefined')
            //{
                var blob = new window['Blob']([this.buffer], { type: imageType });
            //}
            //else
            //{
                //var BlobBuilder = window['BlobBuilder'] || window['WebKitBlobBuilder'] || window['MozBlobBuilder'] || window['MSBlobBuilder'];
                //var builder = new BlobBuilder;
                //builder.append([this.buffer]); // needs appendABV check
                //var blob = builder.getBlob(imageType);
            //}

            if (window['URL'])
            {
                this.data.src = window['URL'].createObjectURL(blob);
            }
            else if (window['webkitURL'])
            {
                this.data.src = window['webkitURL'].createObjectURL(blob);
            }

        }


        /**
        * Revokes the object url that was added to the window when creating the image. 
        * Also tells the File that the loading is now complete. 
        * @method revoke
        * @private
		*/
        private revoke() {

            if (window['URL'])
            {
                window['URL'].revokeObjectURL(this.data.src);
            }
            else if (window['webkitURL'])
            {
                window['webkitURL'].revokeObjectURL(this.data.src);
            }

            this.parseComplete();

        }


        /**
        * Executed when this file has completed loading (this could be due to it failing or succeeding).
        * @method parseComplete
        * @private
		*/
        private parseComplete() {

            if (this._saveToFileStore === true)
            {
                this._fileStore.addFile(this.key, this);
            }

            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }


        /*
        *--------------------
        * File Details - Head Information
        *--------------------
        */


        /**
        * The maximum number of load attempts when requesting the file details that will be preformed. 
        * @property maxHeadLoadAttempts
        * @type number
        * @default 1
        * @public
        */
        public maxHeadLoadAttempts: number = 1;


        /**
        * Attempts to make the file send a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content. 
        * @method getFileDetails
        * @param [callback=null] {function} The callback to send this FileInfo object to.
        * @param [maxLoadAttempts=1] {number} The maximum amount of load attempts. Only set this if it is different from the default.
        * @param [timeout=this.timeOutDelay] {number} The timeout delay. By default this is the same as the timeout delay property set on this file.
        * @private
        */
        public getFileDetails(callback: any = null, maxLoadAttempts?:number, timeout: number = this.timeOutDelay) {

            this.onCompleteCallback = callback;
            if(this.maxHeadLoadAttempts !== undefined) this.maxHeadLoadAttempts = maxLoadAttempts;

            //Start the XHR Request for the HEAD information. Reset the attempt counter.
            this.attemptCounter = 0;
            this.sendXHRHeadRequest(timeout);  

        }


        /**
        * Sends a XHR request for the HEAD information of this file. 
        * Useful as it can will contain the information about the file before loading the actual file.
        * @method sendXHRHeadRequest
        * @param timeout {Number} The timeout delay.
        * @private
        */
        private sendXHRHeadRequest(timeout:number) {
            this.attemptCounter++;

            this._xhr = new XMLHttpRequest();
            this._xhr.open('HEAD', this.fileURL, false);
            this._xhr.onload = (event) => this.getXHRResponseHeaders(event);
            this._xhr.ontimeout = (event) => this.xhrHeadOnTimeout(event);
            this._xhr.onerror = (event) => this.xhrHeadOnError(event);
            if (this.timeOutDelay !== null) this._xhr.timeout = timeout;
            this._xhr.send();
        }


        /**
        * Is executed when the XHR head request timed out.
        * @method xhrHeadOnTimeout
        * @param event {Any} 
        * @private
        */
        private xhrHeadOnTimeout(event) {

            this.hasTimedOut = true;
            this.timedOut = Date.now();
            this.error = event;

            //The onload will fire after, thus trying again automatically.
        }


        /**
        * Is executed when this XHR head request has a error.
        * @method xhrHeadOnError
        * @param event {Any} The event containing the reason why this event failed. 
        * @private
        */
        private xhrHeadOnError(event) {

            this.hasError = true;
            this.error = event;
            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            //The onload will fire after, thus trying again automatically.
        }

        /**
        * Process the response headers received.
        * @method getResponseHeaders
        * @param event {Any} The XHR event
        * @private
        */
        private getXHRResponseHeaders(event:any) {

            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            if (this._xhr.status === 200) {
                //Get the file information...
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.fileSize = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');

                //Complete the request
                this.completeXHRHeadRequest(true);
            } else {
                
                this.completeXHRHeadRequest(false);
            }
             
        }


        /**
        * Used to finialise the XHR Head Request (used with get File Details). 
        * When passed an outcome this method will see if it can 'try again' otherwise it will just finish the attempt.
        * @method completeXHRHeadRequest
        * @param outcome {Boolean} If the outcome was a success or not.
        * @private
        */
        private completeXHRHeadRequest(outcome:boolean) {

            //If the outcome was not good and we can try again then do it!
            if (outcome == false && this.attemptCounter < this.maxLoadAttempts) {
                this.sendXHRHeadRequest(this.timeOutDelay);
                return;
            } 

            //Execute the on complete callback.
            if (this.onCompleteCallback) {
                this.attemptCounter = 0;
                this.onCompleteCallback(this);

            }
        }


	    /**
	    * Returns a string representation of this object.
	    * @method toString
	    * @return {string} a string representation of the instance.
	    * @public
        */
        public toString(): string {

            return "[{File (fileURL=" + this.fileURL + " fileName=" + this.fileName + " dataType=" + this.dataType + " fileSize=" + this.fileSize + " success=" + this.success + " status=" + this.status + ")}]";

        }

    }

}
