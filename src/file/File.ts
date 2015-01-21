/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
     
    /**
    * Handles the loading of an external data file via a tag loader OR xhr + arraybuffer, and optionally saves to the file store.
    * Also can contain information about the file (like file size, last modified, e.t.c.)
    *
    * @class File
    * @namespace Kiwi.Files
    * @constructor

    * @return {Kiwi.Files.File} 
    *
    */
    export class File {
         
        constructor(game: Kiwi.Game, params:any) {

            this.game = game;

            this.onComplete = new Kiwi.Signal;

            this.onProgress = new Kiwi.Signal;

            if (Kiwi.Utils.Common.isNumeric(params)) {
                //Deprecate
                this.parseParamsOld(params, arguments[2], arguments[3], arguments[4], arguments[5]);

            } else {

                this.key = params.key;

                this.assignFileDetails(params.url);

                this.parseParams(params);

            }


        }

        private parseParamsOld(dataType: number, url: string, name: string = '', saveToFileStore: boolean = true, storeAsGlobal: boolean = true) {
            
            this.dataType = dataType;

            this.assignFileDetails(url);

            if (saveToFileStore) {
                this.fileStore = this.game.fileStore;
            }

            if (this.game.states.current && !storeAsGlobal) {
                this.ownerState = this.game.states.current;
            }

        }

        private parseParams(params: any) {

            this.fileStore = params.fileStore || null;
            this.ownerState = params.state || null;
            this.metadata = params.metadata || {};

            if (Kiwi.Utils.Common.isUndefined(params.type)) {
                this.dataType = File.UNKNOWN;
            } else {
                this.dataType = params.type;
            }

            if (params.tags && Kiwi.Utils.Common.isArray(params.tags)) {

                for (var i = 0; i < params.tags.length; i++) {
                    this.addTag(params.tags[i]);
                }

            }

        }

        /**
        *
        * @method assignFileDetails
        * @param url {String}
        * @private
        */
        private assignFileDetails( url:string ) {

            this.URL = url;

            if ( url.lastIndexOf('/') > -1) {
                this.name = url.substr( url.lastIndexOf('/') + 1 );
                this.path = url.substr(0, url.lastIndexOf('/') + 1);

            } else {
                this.path = '';
                this.name = url;

            }
            
            //  Not safe if there is a query string after the file extension
            this.extension = url.substr( url.lastIndexOf('.') + 1).toLowerCase();

        }


        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "File"
        * @public
        */
        public objType() {
            return "File";
        }

        /**
        * The game that this file belongs to.
        * @property game
        * @type Kiwi.Game
        * @public
        */
        public game: Kiwi.Game;


        /**
        * ---------------
        * Generic Properties 
        * ---------------
        **/

        public loadInParallel: boolean = false;

        public fileStore: Kiwi.Files.FileStore;

        public useTagLoader: boolean = false;
        
        public key: string;

        public metadata: any;

        public dataType: number;
        

        /**
        * ---------------
        * File Information
        * ---------------
        */

        public name: string;

        public path: string;

        public extension: string;

        public URL: string;



        /**
        * ---------------
        * Callbacks
        * ---------------
        */

        public onComplete: Kiwi.Signal;

        public onProgress: Kiwi.Signal;

        public onHeadLoad: Kiwi.Signal;


        /**
        * ---------------
        * Loading
        * ---------------
        **/

        public data: any;

        public timeOutDelay: number = Kiwi.Files.File.TIMEOUT_DELAY;
        
        public static TIMEOUT_DELAY: number = 4000;

        public attemptCounter: number = 0;

        public maxLoadAttempts: number = Kiwi.Files.File.MAX_LOAD_ATTEMPTS;
        
        public static MAX_LOAD_ATTEMPTS: number = 2;

        /**
        *
        * @method load
        * @public
        */
        public load(onCompleteCallback?: any, onProgressCallback?: any, customFileStore?: Kiwi.Files.FileStore, maxLoadAttempts?: number, timeout?: number) {

            //Set the variables based on the parameters passed
            //To be deprecated
            if (onCompleteCallback) this.onCompleteCallback = onCompleteCallback;
            if (onProgressCallback) this.onProgressCallback = onProgressCallback;
            if (customFileStore) this.fileStore = customFileStore;
            if (typeof maxLoadAttempts !== "undefined") this.maxLoadAttempts = maxLoadAttempts;
            if (typeof timeout !== "undefined") this.timeOutDelay = timeout;

            //Start Loading!!!
            this.start();
            this._load();
        }

        private _load() {

            this.attemptCounter++;
            this.xhrLoader();
            
        }


        /**
        *
        * @method loadProgress
        * @private
        */
        private loadProgress() {
            this.onProgress.dispatch(this);
            if (this.onProgressCallback) this.onProgressCallback(this);
        }

        /**
        *
        * @method loadSuccess
        * @private 
        */ 
        private loadSuccess() {

            //If already completed skip
            if (this.complete) {
                return;
            }

            this.success = true;
            this.hasError = false;
            this.stop();

            if ( this.fileStore ) {
                this.fileStore.addFile(this.key, this);
            }

            this.onComplete.dispatch(this);
            if (this.onCompleteCallback) this.onCompleteCallback(this);

        }
        
        /**
        *
        * @method loadError
        * @public 
        */ 
        private loadError( reason:string ) {

            //Try again?
            if (this.attemptCounter >= this.maxLoadAttempts) {
                //Failed
                this.hasError = true;
                this.success = false;
                this.error = reason;
                this.stop();
                this.onComplete.dispatch(this);
                if (this.onCompleteCallback) this.onCompleteCallback(this);

            } else {
                //Try Again
                this._load();
            }

        }


        /**
        * ---------------
        * Tag Loading 
        * ---------------
        **/

        public tagLoader() {
            //Up to extended files for support
            console.log("File does not contain a tag loader method. Skipping"); 
            this.loadError(null);
        }

        public tagOnError(event) {
            console.log("Tag Error");
            this.loadError(null);
        }

        public tagOnLoad(event) {
            console.log("Tag Success");
            this.loadSuccess();
        }


        /**
        * ---------------
        * XHR Loading 
        * ---------------
        **/

        private xhrLoader() {

            this._xhr = new XMLHttpRequest();
            this._xhr.open('GET', this.URL, true);

            if (this.timeOutDelay !== null) {
                this._xhr.timeout = this.timeOutDelay;
            }

            this._xhr.responseType = this.responseType;

            var _this = this;

            this._xhr.onload = function (event) {
                _this.xhrOnLoad(event);
            };
            this._xhr.onerror = function (event) {
                _this.xhrOnError(event);
            };
            this._xhr.onprogress = function (event) {
                _this.xhrOnProgress(event);
            };

            //Events to deprecate
            this._xhr.onreadystatechange = function (event) {
                _this.readyState = _this._xhr.readyState;
            };
            this._xhr.onloadstart = function (event) {
                _this.timeStarted = event.timeStamp;
                _this.lastProgress = event.timeStamp;
            };
            this._xhr.ontimeout = function (event) {
                _this.hasTimedOut = true;
            };

            this._xhr.send();

        }

        private xhrOnError(event) {
            console.log('on error');
            this.loadError(event);
        }

        private xhrOnProgress(event) {

            this.bytesLoaded = parseInt(event.loaded);
            this.bytesTotal = parseInt(event.total);
            this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

            this.onProgress.dispatch(this);
            if (this.onProgressCallback) {
                this.onProgressCallback(this);
            }
        }

        private xhrOnLoad(event) {

            //Deprecate
            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            // Easiest to just see if the response isn't null, and thus has data or not.
            if (this._xhr.response) {
                this.getXHRHeaderInfo();
                this.buffer = this._xhr.response; //Deprecate
                this.processXHR(this._xhr.response);

            } else {
                this.loadError(event);

            }
        }

        public processXHR(response) {
            this.data = response;
            this.loadSuccess();
        }

        /**
        * The XMLHttpRequest object. This only has a value if the xhr method of load is being used, otherwise this is null.
        * @property _xhr
        * @type XMLHttpRequest
        * @private
        */
        private _xhr: XMLHttpRequest = null;
        

        /**
        * 
        * @property responseType 
        * @type String
        * @default 'text'
        * @public
        */
        public responseType: string = 'text';


        /**
        * -----------------
        * Loading Status
        * -----------------
        **/

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
        * Is executed when this file starts loading. 
        * Gets the time and initalised properties that are used across both loading methods.
        * @method start
        * @private
        */
        private start() {

            this.attemptCounter = 0;
            this.loading = true;
            this.timeStarted = Date.now();
            this.percentLoaded = 0;

        }


        /**
        * Is executed when this file stops loading. Used across all loading methods. 
        * @method stop
        * @private
        */
        private stop() {

            this.loading = false;
            this.complete = true;
            this.percentLoaded = 100;
            this.timeFinished = Date.now();
            this.duration = this.timeFinished - this.timeStarted;

        }

        /**
        * If the loading of the file failed or encountered an error.
        * @property hasError
        * @type boolean
        * @default false
        * @public
        */
        public hasError: boolean = false;

        /**
        * Holds the error (if there was one) when loading the file.
        * @property error
        * @type Any
        * @public
        */
        public error: any;

        /**
        * If the loading was a success or not. 
        * @property success
        * @type boolean
        * @public
        */
        public success: boolean = false;

        /**
        * Indication if the file is currently being loaded or not.
        * @property loading
        * @type boolean
        * @public 
        */
        public loading: boolean = false;

        /**
        * Indicates if the file attempted to load before or not.
        * @property complete
        * @type boolean
        * @default false
        * @public
        */
        public complete: boolean = false;

        /**
        * The amount of percent loaded the file is. This is out of 100.
        * @property percentLoaded
        * @type Number
        * @public
        */
        public percentLoaded: number = 0;

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
        * --------------------
        * XHR Header Information
        * --------------------
        **/

        /**
        * The maximum number of load attempts when requesting the file details that will be preformed. 
        * @property maxHeadLoadAttempts
        * @type number
        * @default 1
        * @public
        */
        public maxHeadLoadAttempts: number = 1;

        public headCompleteCallback: any;

        public headCompleteContext: any;

        public detailsReceived:boolean = false;

        private getXHRHeaderInfo() {

            if ( !this._xhr ) {
                return;
            }

            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            //Get the file information...
            this.fileType = this._xhr.getResponseHeader('Content-Type');
            this.fileSize = parseInt(this._xhr.getResponseHeader('Content-Length'));
            this.lastModified = this._xhr.getResponseHeader('Last-Modified');
            this.ETag = this._xhr.getResponseHeader('ETag');
            this.detailsReceived = true;

        }

        public loadDetails(callback:any=null, context:any=null) {

            //Can't continue if regular loading is progressing.
            if (this.loading) {
                Kiwi.Log.error('Kiwi.Files.File: Cannot get the file details whilst the file is already loading');
                return;
            }

            if (callback) this.headCompleteCallback = callback;
            if (context) this.headCompleteContext = context;

            this.attemptCounter = 0;
            this._xhrHeadRequest();
        }

        private _xhrHeadRequest() {

            this.attemptCounter++;

            this._xhr = new XMLHttpRequest();
            this._xhr.open('HEAD', this.fileURL, false);
            if (this.timeOutDelay !== null) this._xhr.timeout = this.timeOutDelay;

            var _this = this;
            this._xhr.onload = function () {
                _this.xhrHeadOnLoad(event);
            };

            this._xhr.onerror = function () {
                _this.xhrHeadOnError(event);
            };

            this._xhr.send();

        }

        private xhrHeadOnError(event) {

            if (this.attemptCounter < this.maxHeadLoadAttempts) {
                this._xhrHeadRequest();

            } else {

                if (this.headCompleteCallback) {
                    this.headCompleteCallback.call(this.headCompleteContext, false);
                }

            }

        }

        private xhrHeadOnLoad(event) {

            if (this._xhr.status === 200) {
                this.getXHRHeaderInfo();

                if (this.headCompleteCallback) {
                    this.headCompleteCallback.call(this.headCompleteContext, false);
                }
            } else {
                this.xhrHeadOnError(null);
            }

        }

        /**
        * --------------------
        * Tagging + State
        * --------------------
        */

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
        * -------------------
        * File Type
        * -------------------
        **/

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
        * 
        * @property UNKNOWN
        * @type number
        * @static
        * @final 
        * @default 8
        * @public
        */
        public static UNKNOWN: number = 8;

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


        /**
        * ------------------
        * Deprecated
        * ------------------
        **/

        /**
        * The name of the file being loaded.
        * @property fileName
        * @type String
    	* @public
        */
        public get fileName(): string {
            return this.name;
        }
        public set fileName(val:string) {
            this.name = val;
        }

        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
        * @public
        */
        public get filePath(): string {
            return this.path;
        }
        public set filePath(val: string) {
            this.path = val;
        }

        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        * @property filePath
        * @type String
        * @public
        */
        public get fileExtension(): string {
            return this.extension;
        }
        public set fileExtension(val: string) {
            this.extension = val;
        }

        /**
        * The full filepath including the file itself.
        * @property fileURL
        * @type String
        * @public
    	*/
        public get fileURL(): string {
            return this.URL;
        }
        public set fileURL(val: string) {
            this.URL = val;
        }

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
        * The ready state of the XHR loader whilst loading.
        * @property readyState
        * @type Number
        * @default 0
        * @public
        */
        public readyState: number = 0;

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
        * The response that is given by the XHR loader when loading is complete.
        * @property buffer
        * @type Any
        * @public
        */
        public buffer: any;


        /**
        * Attempts to make the file send a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content. 
        * @method getFileDetails
        * @param [callback=null] {Any} The callback to send this FileInfo object to.
        * @param [maxLoadAttempts=1] {number} The maximum amount of load attempts. Only set this if it is different from the default.
        * @param [timeout=this.timeOutDelay] {number} The timeout delay. By default this is the same as the timeout delay property set on this file.
        * @private
        */
        public getFileDetails(callback: any = null, maxLoadAttempts?: number, timeout: number = null) {

            if (maxLoadAttempts) this.maxHeadLoadAttempts = maxLoadAttempts;
            if (timeout) this.timeOutDelay = timeout;

            this.loadDetails(callback, null);
        }

    }

}
