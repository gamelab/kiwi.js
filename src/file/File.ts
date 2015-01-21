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
         
        constructor(game: Kiwi.Game, key: string, url: string, params:any= {}) {

            this.game = game;

            this.key = key;

            this.assignFileDetails(url);

            this.onComplete = new Kiwi.Signal;

            this.onProgress = new Kiwi.Signal;

            this.fileStore = params.fileStore || null;
            this.ownerState = params.state || null;

            if (Kiwi.Utils.Common.isUndefined(params.type)) {
                this.dataType = File.UNKNOWN;
            } else {
                this.dataType = params.type;
            }

            if (params.tags && Kiwi.Utils.Common.isArray(params.tags)) {

                for (var i = 0; i < params.tags.length; i++) {
                    this.addTag( params.tags[i] );
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
        public load() {

            //Start Loading!!!
            this.start();

            this.attemptCounter++;

            if (this.useTagLoader) {
                this.tagLoader();
            } else {
                this.xhrLoader();
            }

        }

        /**
        *
        * @method loadSuccess
        * @public 
        */ 
        public loadSuccess() {

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

            } else {
                //Try Again
                this.load();
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

            //if (this.timeOutDelay !== null) {
            //    this._xhr.timeout = this.timeOutDelay;
            //}

            this._xhr.responseType = this.responseType;

            var _this = this;
            this._xhr.onload = function (event) {
                _this.xhrOnLoad(event);
            }
            this._xhr.onerror = function (event) {
                _this.xhrOnError(event);
            }

            this._xhr.send();

        }

        private xhrOnError(event) {
            console.log('on error');
            this.loadError(event);
        }

        private xhrOnLoad(event) {
            console.log('on load');
            this.processXHR( this._xhr.response );
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

        public complete: boolean = false;

        /**
        * The amount of percent loaded the file is. This is out of 100.
        * @property percentLoaded
        * @type Number
        * @public
        */
        public percentLoaded: number = 0;

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

    }

}
