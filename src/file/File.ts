/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
     
    /**
    * Base class which handles the loading of an external data file an xhr. 
    * TextureFile, AudioFile contain fallback loading via tags and all extended Files contain methods for processing the files.
    *
    * Also can contain information about the file (like file size, last modified, e.t.c.)
    * Uses a object literal in its constructor since 1.2 (which is preferred), but also contains previous construction support.
    * 
    * @class File
    * @namespace Kiwi.Files
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

        /**
        * Assigns properties and variables for the constructor as in pre 1.2 Kiwi versions. 
        * 
        * @method parseParamsOld
        * @since 1.2.0
        * @param dataType {Number} The type of file that is being loaded. For this you can use the STATIC properties that are located on this class for quick code completion.
        * @param path {String} The location of the file that is to be loaded.
        * @param [name=''] {String} A name for the file. If no name is specified then the files name will be used.
        * @param [saveToFileStore=true] {Boolean} If the file should be saved on the file store or not.
        * @param [storeAsGlobal=true] {Boolean} If this file should be stored as a global file, or if it should be destroyed when this state gets switched out.
        * @private
        */
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


        /**
        * Sets properties for this instance based on an object literal passed. Used when the class is being created.
        *
        * @method parseParams
        * @since 1.2.0
        * @param [params] {Object}
        *   @param [params.metadata={}] {Object} Any metadata to be associated with the file. 
        *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
        *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
        *   @param [params.type=UNKNOWN] {Number} The type of file this is. 
        *   @param [params.tags] {Array} Any tags to be associated with this file.
        * @protected 
        */
        protected parseParams(params: any) {

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
        * Gets the file details from the URL passed. Name, extension, and path are extracted.
        *
        * @method assignFileDetails
        * @since 1.2.0
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
        * @since 1.2.0
        * @public
        */
        public game: Kiwi.Game;


        /**
        * ---------------
        * Generic Properties 
        * ---------------
        **/

        /**
        * Indicates if this file can be loaded in parallel to other files. 
        * This is usually only used files are using the tag loaders and not XHR.
        * 
        * @property _loadInParallel
        * @type Boolean
        * @default false
        * @since 1.2.0
        * @private
        */
        protected _loadInParallel: boolean = false;
        
        /**
        * READ ONLY: Indicates if this file can be loaded in parallel to other files. 
        * This is usually only used files are using the tag loaders and not XHR.
        * 
        * @property loadInParallel
        * @type Boolean
        * @default false
        * @readOnly
        * @since 1.2.0
        * @private
        */
        public get loadInParallel(): boolean {
            return this._loadInParallel;
        }

        /**
        * The filestore this file should be added to when it has loaded. 
        * This can be replaced with a custom one if wanted.
        * 
        * @property fileStore
        * @type Kiwi.Files.FileStore
        * @since 1.2.0
        * @public
        */
        public fileStore: Kiwi.Files.FileStore;

        /**
        * If this file is using tag loading instead of the XHR method. 
        * Only used by extended classes
        * 
        * @property useTagLoader
        * @type Boolean
        * @since 1.2.0
        * @protected
        */
        protected useTagLoader: boolean = false;
        
        /**
        * The 'key' is the user defined name and the users way of accessing this file once loaded.
        * @property key
        * @type String
        * @public
    	*/
        public key: string;
        
        /**
        * A dictionary, stores any information relating to this file.
        * Used when loading images that are to be used as a spritesheet or texture atlas.
        * @property data
        * @type Any
        * @public
    	*/
        public metadata: any;
        
        /**
        * Holds the type of data that is being loaded. 
        * This should be used with the STATIC properties that hold the various datatypes that can be loaded.
        *
        * @property dataType
        * @type String
        * @public
    	*/
        public dataType: number;
        

        /**
        * ---------------
        * File Information
        * ---------------
        */
        
        /**
        * The name of the file being loaded.
        *
        * @property name
        * @type String
        * @since 1.2.0
    	* @public
        */
        public name: string;
        
        /**
        * The location of where the file is placed without the file itself (So without the files name).
        * Example: If the file you are load is located at 'images/awesomeImage.png' then the filepath will be 'images/'
        *
        * @property path
        * @type String
        * @since 1.2.0
    	* @public
        */
        public path: string;
        
        /**
        * The extension of the file that is being loaded.
        * This is based upon what the file path that the developer specifies.
        *
        * @property extension
        * @type String
        * @since 1.2.0
        * @public
    	*/
        public extension: string;
        
        /**
        * The full filepath including the file itself.
        *
        * @property URL
        * @type String
        * @since 1.2.0
        * @public
    	*/
        public URL: string;
        
        /**
        * The type of file that is being loaded.
        * Is only ever given a value when used with the XHR method of loading OR if you use 'loadDetails' before hand.
        * The value is based off of the 'Content-Type' of the XHR's response header returns.
        *
        * @property type
        * @type String
        * @public
    	*/
        public type: string;
        
        /**
        * The size of the file that was/is being loaded. 
        * Only has a value when the file was loaded by the XHR method OR you request the file information beforehand using 'loadDetails'.
        *
        * @property size
        * @type Number
        * @default 0
        * @since 1.2.0
        * @public
    	*/
        public size: number = 0;

        /**
        * ---------------
        * Callbacks
        * ---------------
        */

        /**
        * Signal which dispatches events when the file has successfully loaded. 
        * 
        * @property onComplete
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        public onComplete: Kiwi.Signal;
        
        /**
        * Signal which dispatches events when the file is loading. 
        * Not guarenteed to dispatch events as it depends on the method of loading being performed
        * 
        * @property onProgress
        * @type Kiwi.Signal
        * @since 1.2.0
        * @public
        */
        public onProgress: Kiwi.Signal;


        /**
        * ---------------
        * Loading
        * ---------------
        **/
        
        /**
        * The particular piece of data that the developer wanted loaded. This is in a format that is based upon the datatype passed.
        * @property data
        * @type Any
        * @public
    	*/
        public data: any;
          
        /**
        * The number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        *
        * @property timeOutDelay
        * @type Number
        * @default 4000
        * @public
        */
        public timeOutDelay: number = Kiwi.Files.File.TIMEOUT_DELAY;
        
        /**
        * The default number of milliseconds that the XHR should wait before timing out.
        * Set this to NULL if you want it to not timeout.
        *
        * @property TIMEOUT_DELAY
        * @type Number
        * @static
        * @since 1.2.0
        * @public
        */
        public static TIMEOUT_DELAY: number = 4000;
        
        /**
        * The number of attempts at loading there have currently been at loading the file.
        * This is only used with XHR methods of loading.
        * @property attemptCounter
        * @type Number
        * @protected
        */
        protected attemptCounter: number = 0;
        
        /**
        * The maximum attempts at loading the file that there is allowed.
        * @property maxLoadAttempts
        * @type Number
        * @default 2
        * @public
        */
        public maxLoadAttempts: number = Kiwi.Files.File.MAX_LOAD_ATTEMPTS;
        
        /**
        * The default maximum attempts at loading the file that there is allowed.
        * @property MAX_LOAD_ATTEMPTS
        * @type Number
        * @default 2
        * @static
        * @since 1.2.0
        * @public
        */
        public static MAX_LOAD_ATTEMPTS: number = 2;
        
        /**
        * Starts the loading process for this file. 
        * Passing parameters to this method has been deprecated and only exists for backwards compatibility.
        * 
        * @method load
        * @public
        */
        public load(onCompleteCallback?: any, onProgressCallback?: any, customFileStore?: Kiwi.Files.FileStore, maxLoadAttempts?: number, timeout?: number) {

            //Not currently loading?
            if (this.loading) {
                Kiwi.Log.error('Kiwi.Files.File: File loading is in progress. Cannot be told to load again.', '#loading');
                return;
            }

            Kiwi.Log.log("Kiwi.Files.File: Starting to load '" + this.name + "'", '#file', '#loading');

            //Set the variables based on the parameters passed
            //To be deprecated
            if (onCompleteCallback) this.onComplete.add( onCompleteCallback );
            if (onProgressCallback) this.onProgress.add( onProgressCallback );
            if (customFileStore) this.fileStore = customFileStore;
            if (typeof maxLoadAttempts !== "undefined") this.maxLoadAttempts = maxLoadAttempts;
            if (typeof timeout !== "undefined") this.timeOutDelay = timeout;

            //Start Loading!!!
            this.start();
            this._load();
        }


        /**
        * Increments the counter, and calls the approprate loading method.
        * @method _load
        * @since 1.2.0
        * @protected
        */
        protected _load() {
            this.attemptCounter++;
            this.xhrLoader( 'GET', 'text' );
        }


        /**
        * Should be called by the loading method. Dispatches the 'onProgress' callback.
        * @method loadProgress
        * @since 1.2.0
        * @protected
        */
        protected loadProgress() {
            this.onProgress.dispatch(this);
        }


        /**
        * Called by the loading methods when the file has been loaded and successfully processed.
        * Dispatches the 'onComplete' callback and sets the appropriate properties.
        * @method loadSuccess
        * @since 1.2.0
        * @protected 
        */ 
        protected loadSuccess() {

            //If already completed skip
            if (this.complete) {
                return;
            }

            this.success = true;
            this.hasError = false;
            this.stop();

            if (this.fileStore) {
                this.fileStore.addFile(this.key, this);
            }

            this.onComplete.dispatch(this);

        }
        
        /**
        * Executed when the loading process fails. 
        * This could be for any reason
        * 
        * @method loadError
        * @param error {Any} The event / reason for the file to not be loaded.
        * @since 1.2.0
        * @protected 
        */ 
        protected loadError(error: any) {

            //Try again?
            if (this.attemptCounter >= this.maxLoadAttempts) {
                //Failed
                Kiwi.Log.log("Kiwi.Files.File: Failed to load file '" + this.name + "'. Trying Again", '#loading');
                this.hasError = true;
                this.success = false;
                this.error = error;
                this.stop();
                this.onComplete.dispatch(this);

            } else {
                Kiwi.Log.log("Kiwi.Files.File: Failed to load file '" + this.name + "'", '#loading');
                //Try Again
                this._load();
            }

        }

        /**
        * ---------------
        * XHR Loading 
        * ---------------
        **/

        /**
        * Sets up a XHR loader based on the properties of this file and parameters passed.
        * 
        * @method xhrLoader
        * @param [method="GET"] {String} The method this request should be made in.
        * @param [responseType="text"] {String} The type of response we are expecting.
        * @param [timeoutDelay] {Number} 
        * @protected
        */
        protected xhrLoader(method: string = 'GET', responseType: string = 'text', timeoutDelay: number = this.timeOutDelay) {

            this._xhr = new XMLHttpRequest();
            this._xhr.open('GET', this.URL, true);

            if (timeoutDelay !== null) {
                this._xhr.timeout = timeoutDelay;
            }

            this._xhr.responseType = responseType;

            this._xhr.onload = (event) => this.xhrOnLoad(event);
            this._xhr.onerror = (event) => this.loadError(event);
            this._xhr.onprogress = (event) => this.xhrOnProgress(event);

            //Events to deprecate
            this._xhr.onreadystatechange = (event) => function () {
                this.readyState = this._xhr.readyState;
            };

            this._xhr.onloadstart = (event) => function (event) {
                this.timeStarted = event.timeStamp;
                this.lastProgress = event.timeStamp;
            };

            this._xhr.ontimeout = (event) => function (event) {
                this.hasTimedOut = true;
            };

            this._xhr.send();

        }

        /**
        * Progress event fired whilst the file is loading via XHR.
        * @method xhrOnProgress
        * @param event {Any}
        * @protected
        */
        protected xhrOnProgress(event) {

            this.bytesLoaded = parseInt(event.loaded);
            this.bytesTotal = parseInt(event.total);
            this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

            this.onProgress.dispatch(this);
        }

        /**
        * Fired when the file has been loaded. 
        * Checks that the response contains information before marking it as a success.
        * 
        * @method xhrOnLoad
        * @param event {Any}
        * @protected
        */
        protected xhrOnLoad(event) {

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

        /**
        * Contains the logic for processing the information retrieved via XHR.
        * Assigns the data property. 
        * This method is also in charge of calling 'loadSuccess' (or 'loadError') when processing is complete. 
        * 
        * @method processXHR
        * @param response 
        * @protected
        */
        protected processXHR( response:any ) {
            this.data = response;
            this.loadSuccess();
        }

        /**
        * The XMLHttpRequest object. This only has a value if the xhr method of load is being used, otherwise this is null.
        * @property _xhr
        * @type XMLHttpRequest
        * @protected
        */
        protected _xhr: XMLHttpRequest;
        
        /**
        * -----------------
        * Loading Status
        * -----------------
        **/

        /**
        * The time at which the loading started. 
        * @property timeStarted
        * @type Number
        * @default 0
        * @public
        */
        public timeStarted: number = 0;

        /**
        * The time at which progress in loading the file was last occurred.
        * Only contains a value when using XHR methods of loading.
        * @property lastProgress
        * @type Number
        * @public
    	*/
        public lastProgress: number = 0;

        /**
        * The time at which the load finished.
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
        * Gets the time and resets properties used in file loading.
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
        * Is executed when this file stops loading. 
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
        * If file loading failed or encountered an error and so was not laoded
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
        * If loading was successful or not. 
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
        * Indicates if the file has attempted to load.
        * This is regardless of whether it was a success or not.
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
        * Useful when wanting to know exactly how much data has been transferred.
        * Only has a value when using the XHR method of loading.
        * 
        * @property bytesLoaded
        * @type Number
        * @default 0
        * @public
        */
        public bytesLoaded: number = 0;


        /**
        * The total number of bytes that the file consists off.
        * Only has a value when using the XHR method of loading 
        * or you are getting the file details before hand.
        *
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
        * The callback method to be executed when the file details have been retrieved.
        * @property headCompleteCallback
        * @type Any
        * @since 1.2.0
        * @private
        */
        private headCompleteCallback: any;
        
        /**
        * The context the 'headCompleteCallback' should be executed in..
        * The callback is the following arguments. 
        * 1. If the details were recieved
        * 
        * @property headCompleteContext
        * @type Any
        * @since 1.2.0
        * @private
        */
        private headCompleteContext: any;

        /**
        * An indication of whether this files information has been retrieved or not.
        * @property detailsReceived
        * @type boolean
        * @default false
        * @since 1.2.0
        * @public
        */
        public detailsReceived:boolean = false;

        /**
        * Makes a XHR HEAD request to get information about the file that is going to be downloaded.
        * This is particularly useful when you are wanting to check how large a file is before loading all of the content. 
        * 
        * @method loadDetails
        * @param [callback] {Any}
        * @param [context] {Any}
        * @return {Boolean} If the request was made
        * @since 1.2.0
        * @public
        */
        public loadDetails(callback:any=null, context:any=null) {

            //Can't continue if regular loading is progressing.
            if ( this.loading ) {
                Kiwi.Log.error('Kiwi.Files.File: Cannot get the file details whilst the file is already loading');
                return false;
            }

            if (callback) this.headCompleteCallback = callback;
            if (context) this.headCompleteContext = context;

            this.xhrHeadRequest();
            return true;
        }

        /**
        * Retrieves the HEAD information from the XHR. 
        * This method is used for both 'load' and 'loadDetails' methods.
        * 
        * @method getXHRHeaderInfo
        * @since 1.2.0
        * @private
        */
        private getXHRHeaderInfo() {

            if (!this._xhr) {
                return;
            }

            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            //Get the file information...
            this.type = this._xhr.getResponseHeader('Content-Type');
            this.size = parseInt( this._xhr.getResponseHeader('Content-Length') );
            this.lastModified = this._xhr.getResponseHeader('Last-Modified');
            this.ETag = this._xhr.getResponseHeader('ETag');
            this.detailsReceived = true;
        }

        /**
        * Sets up a XMLHttpRequest object and sends a HEAD request.
        * @method xhrHeadRequest
        * @since 1.2.0
        * @private
        */
        private xhrHeadRequest() {

            this._xhr = new XMLHttpRequest();
            this._xhr.open('HEAD', this.fileURL, true);
            if (this.timeOutDelay !== null) this._xhr.timeout = this.timeOutDelay;

            this._xhr.onload = (event) => this.xhrHeadOnLoad(event);
            this._xhr.onerror = (event) => this.xhrHeadOnError(event);

            this._xhr.send();
        }

        /**
        * Executed when a xhr head request fails
        * @method xhrHeadOnError
        * @param event {Any}
        * @private
        */ 
        private xhrHeadOnError(event) {

            if (this.headCompleteCallback) {
                this.headCompleteCallback.call(this.headCompleteContext, false);
            }

        }

        /**
        * Executed when a xhr head request has loaded.
        * Checks that the status of the request is 200 before classifying it as a success.
        * @method xhrHeadOnLoad
        * @param event {Any}
        * @private
        */
        private xhrHeadOnLoad(event) {

            if (this._xhr.status === 200) {
                this.getXHRHeaderInfo();

                if (this.headCompleteCallback) {
                    this.headCompleteCallback.call(this.headCompleteContext, true);
                }
            } else {
                this.xhrHeadOnError(null);
            }

        }

        /**
        * --------------------
        * MISC
        * --------------------
        **/

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
        * --------------------
        * Tagging + State
        * --------------------
        **/

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
        * Checks to see if a tag that is passed exists on this file.
        * Returns a boolean that is used as a indication of the results. 
        * True means that the tag exists on this file.
        *
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
        * @readOnly
        * @public
        */
        public get isTexture(): boolean {
            return (Kiwi.Files.TextureFile.prototype.objType.call(this) === this.objType());
        }


        /**
        * An indication of if this file is a piece of audio. This is READ ONLY.
        * @property isAudio
        * @type boolean
        * @readOnly
        * @public
        */
        public get isAudio(): boolean {
            return (Kiwi.Files.AudioFile.prototype.objType.call(this) === this.objType());
        }


        /**
        * An indication of if this file is data. This is READ ONLY.
        * @property isData
        * @type boolean
        * @readOnly
        * @public
        */
        public get isData(): boolean {
            return (Kiwi.Files.DataFile.prototype.objType.call(this) === this.objType());
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
        * @deprecated Use `name`. Deprecated as of 1.2.0
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
        * @deprecated Use `path`. Deprecated as of 1.2.0
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
        * @deprecated Use `extension`. Deprecated as of 1.2.0
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
        * @deprecated Use `URL`. Deprecated as of 1.2.0
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
        * @deprecated Use `type`. Deprecated as of 1.2.0
        * @public
        */
        public get fileType():string {
            return this.type;
        }
        public set fileType(val: string) {
            this.type = val;
        }

        /**
        * The size of the file that was/is being loaded. 
        * Only has a value when the file was loaded by the XHR method OR you request the file information before hand using 'getFileDetails'.
        * @property fileSize
        * @type Number
        * @deprecated Use `size`. Deprecated as of 1.2.0
        * @public
        */
        public get fileSize(): number {
            return this.size;
        }
        public set fileSize(val: number) {
            this.size = val;
        }
        

        /**
        * A method that is to be executed when this file has finished loading. 
        * @property onCompleteCallback
        * @type Any
        * @default null
        * @deprecated Use `onComplete`. Deprecated as of 1.2.0
        * @public
        */
        //public onCompleteCallback: any = null;


        /**
        * A method that is to be executed while this file is loading.
        * @property onProgressCallback
        * @type Any
        * @default null
        * @deprecated Use `onProgress`. Deprecated as of 1.2.0
        * @public
        */
        //public onProgressCallback: any = null;


        /**
        * The status of this file that is being loaded. 
        * Only used/has a value when the file was/is being loaded by the XHR method.
        * @property status
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        public status: number = 0;


        /**
        * The status piece of text that the XHR returns.
        * @property statusText
        * @type String
        * @default ''
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        public statusText: string = '';

        /**
        * The ready state of the XHR loader whilst loading.
        * @property readyState
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        public readyState: number = 0;

        /**
        * If this file has timeout when it was loading. 
        * @property hasTimedOut
        * @type boolean
        * @default false
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        public hasTimedOut: boolean = false;

        /**
        * If the file timed out or not.
        * @property timedOut
        * @type Number
        * @default 0
        * @deprecated Deprecated as of 1.2.0
        * @public
        */
        public timedOut: number = 0;

        /**
        * The response that is given by the XHR loader when loading is complete.
        * @property buffer
        * @type Any
        * @deprecated Use 'data' instead. Deprecated as of 1.2.0
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
        * @deprecated Use 'loadDetails' instead. Deprecated as of 1.2.0
        * @private
        */
        public getFileDetails(callback: any = null, maxLoadAttempts?: number, timeout: number = null) {
            
            if (timeout) this.timeOutDelay = timeout;

            this.loadDetails(callback, null);
        }

    }

}
