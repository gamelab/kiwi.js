


/**
 *  Kiwi - Core - File
 *
 *  @desc       This class handles the loading of external data files via a tag loader or xhr + arraybuffer, and optionally saves to the file store
 *

 *
 */

module Kiwi.Files {
     
    export class File {

        /*
        * 
        * @constructor
        * @param {String} dataType
        * @param {String} path
        * @param {Boolean} saveToFileStore
        * @return {Kiwi.Files}
        */
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
        */
        public objType() {
            return "File";
        }


        // the state that added the entity - or null if it was added as global
        public ownerState: Kiwi.State;

        private _tags: string[];

        public addTag(tag: string) {
            if (this._tags.indexOf(tag) == -1) {
                this._tags.push(tag);
            }
        }

        public removeTag(tag: string) {
            var index: number = this._tags.indexOf(tag);
            if (index != -1) {
                this._tags.splice(index, 1);
            }
        }

        public hasTag(tag: string) {
            if (this._tags.indexOf(tag) == -1) {
                return false;
            }
            return true;

        }

        /**
        * @property IMAGE
        * @type number
    	*/
        public static IMAGE: number = 0;

        /**
        * @property SPRITE_SHEET
        * @type number
    	*/
        public static SPRITE_SHEET: number = 1;

        /**
        * @property TEXTUREATLAS
        * @type number
    	*/
        public static TEXTURE_ATLAS: number = 2;

        /**
        * @property AUDIO
        * @type number
	    */
        public static AUDIO: number = 3;

        /**
        * @property JSON
        * @type number
	    */
        public static JSON: number = 4;

        /**
        * @property XML
        * @type number
	    */
        public static XML: number = 5;

        /**
        * @property BINARY_DATA
        * @type number
	    */
        public static BINARY_DATA: number = 6;

        /**
        * @property TEXT_DATA
        * @type number
    	*/
        public static TEXT_DATA: number = 7;

        /**
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * @property _xhr
        * @type XMLHttpRequest
        * @private
	    */
        private _xhr: XMLHttpRequest;

        /**
        * @property _fileStore
        * @type FileStore
        * @private
        */
        private _fileStore: Kiwi.Files.FileStore;

        /**
        * @property _saveToFileStore
        * @type Boolean
        * @private
	    */
        private _saveToFileStore: bool = true;

        /**
        * @property _useTagLoader
        * @type Boolean
        * @private
	    */
        private _useTagLoader: bool = true;

        /**
        * @property dataType
        * @type String
    	*/
        public dataType: number;

        /**
        * @property key
        * @type String
    	*/
        public key: string;

        /**
        * @property fileName
        * @type String
    	*/
        public fileName: string;

        /**
        * @property filePath
        * @type String
    	*/
        public filePath: string;

        /**
        * @property fileType
        * @type String
    	*/
        public fileType: string;

        /**
        * @property fileExtension
        * @type String
    	*/
        public fileExtension: string;

        /**
        * @property fileURL
        * @type String
    	*/
        public fileURL: string;

        /**
        * @property fileSize
        * @type Number
    	*/
        public fileSize: number = 0;

        /**
        * @property status
        * @type Number
    	*/
        public status: number = 0;

        /**
        * @property statusText
        * @type String
    	*/
        public statusText: string = '';

        /**
        * @property ETag
        * @type String
    	*/
        public ETag: string = '';

        /**
        * @property lastModified
        * @type String
    	*/
        public lastModified: string = '';

        /**
        * @property totalSize
        * @type Number
    	*/
        public totalSize: number = 0;

        /**
        * @property bytesLoaded
        * @type Number
    	*/
        public bytesLoaded: number = 0;

        /**
        * @property bytesTotal
        * @type Number
    	*/
        public bytesTotal: number = 0;

        /**
        * @property readyState
        * @type Number
    	*/
        public readyState: number = 0;

        /**
        * @property timeOutDelay
        * @type Number
    	*/
        public timeOutDelay: number = 2000;

        /**
        * @property hasTimedOut
        * @type Boolean
    	*/
        public hasTimedOut: bool = false;

        /**
        * @property timedOut
        * @type Number
    	*/
        public timedOut: number = 0;

        //  Time the load started
        /**
        * @property timeStarted
        * @type Number
    	*/
        public timeStarted: number = 0;

        //  Time the load finished (if successful)
        /**
        * @property timeFinished
        * @type Number
    	*/
        public timeFinished: number = 0;

        //  How long the load took (in ms)
        /**
        * @property duration
        * @type Number
    	*/
        public duration: number = 0;

        /**
        * @property hasError
        * @type Boolean
    	*/
        public hasError: bool = false;
        /**
        * @property success
        * @type Boolean
    	*/
        public success: bool = false;

        /**
        * @property attemptCounter
        * @type Number
    	*/
        public attemptCounter: number = 0;

        /**
        * @property maxLoadAttempts
        * @type Number
    	*/
        public maxLoadAttempts: number = 2;

        /**
        * @property error
        * @type Any
    	*/
        public error: any;

        /**
        * @property onCompleteCallback
        * @type Any
    	*/
        public onCompleteCallback: any = null;

        /**
        * @property onProgressCallback
        * @type Any
    	*/
        public onProgressCallback: any = null;

        /**
        * @property lastProgress
        * @type Number
    	*/
        public lastProgress: number = 0;

        /**
        * @property percentLoaded
        * @type Number
    	*/
        public percentLoaded: number = 0;

        /**
        * @property buffer
        * @type Any
    	*/
        public buffer: any;

        /**
        * @property data
        * @type Any
    	*/
        public data: any;

        /**
        * A dictionary, stores info needed for interpreting specific file types eg SPRITE_SHEET,
        * @property data
        * @type Any
    	*/
        public metadata: any;

        public get isTexture(): boolean {
            if (this.dataType === File.IMAGE || this.dataType === File.SPRITE_SHEET || this.dataType === File.TEXTURE_ATLAS) {
                return true;
            }
            return false;
        }
        
        public get isAudio(): boolean {
            if (this.dataType === File.AUDIO) {
                return true;
            }
            return false;
        }

        public get isData(): boolean {
            if (this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA) {
                return true;
            }
            return false;
        }

        /**
        * @method load
        * @param {Any} [onCompleteCallback]
        * @param {Any} [onProgressCallback]
        * @param {Number} maxLoadAttempts
        * @param {Number} timeout
        */
        load(onCompleteCallback: any = null, onProgressCallback: any = null, customFileStore: Kiwi.Files.FileStore = null, maxLoadAttempts: number = 1, timeout: number = 2000) {

            this.onCompleteCallback = onCompleteCallback;
            this.onProgressCallback = onProgressCallback;
            this.maxLoadAttempts = maxLoadAttempts;
            this.timeOutDelay = timeout;

            if (customFileStore !== null)
            {
                this._fileStore = customFileStore;
                this._saveToFileStore = true;
            }

            this.start();

            if (this._useTagLoader === true)
            {
                this.tagLoader();
            }
            else
            {
                this.xhrLoader();
            }

        }

        /**
        * @method start
		*/
        private start() {

            this.timeStarted = Date.now();
            this.lastProgress = Date.now();
            this.percentLoaded = 0;

        }

        /**
        * @method stop
		*/
        private stop() {

            this.percentLoaded = 100;
            this.timeFinished = Date.now();
            this.duration = this.timeFinished - this.timeStarted;

        }

        /**
        * @method tagLoader
		*/
        private tagLoader() {

            if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS)
            {
                this.data = new Image();
                this.data.src = this.fileURL;
                this.data.onload = (event) => this.tagLoaderOnLoad(event);
                this.data.onerror = (event) => this.tagLoaderOnError(event);        //To be remade
                this.data.onreadystatechange = (event) => this.tagLoaderOnReadyStateChange(event);
            

            } else if (this.dataType === Kiwi.Files.File.AUDIO) {

                    //if device == iOS.... do awesome stuff....

                this.data = new Audio();
                this.data.src = this.fileURL;
                this.data.preload = 'auto';
                this.data.onerror = (event) => this.tagLoaderOnError(event);
                this.data.addEventListener('canplaythrough', () => this.tagLoaderOnLoad(null), false); //never firing.?.?.?
                this.data.onload = (event) => this.tagLoaderOnLoad(event);
                this.data.load();
                this.data.volume = 0;
                this.data.play(); //force the browser to load by playing the audio........ 
            }
            
        }

        /**
        * @method tagLoaderOnReadyStateChange
        * @param {Any} event
		*/
        private tagLoaderOnReadyStateChange(event) {

        }

        /**
        * @method tagLoaderOnError
        * @param {Any}
		*/
        private tagLoaderOnError(event) {

            this.hasError = true;
            this.error = event;

            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }

        private tagLoaderProgressThrough(event) {
            
            this.stop(); //hasn't really stopped but oh well.

            if (this.onCompleteCallback) {
                this.onCompleteCallback(this);
            }
        }

        /**
        * @method tagLoaderOnLoad
        * @param {Any}
        */
        private tagLoaderOnLoad(event) {

            if (this.percentLoaded !== 100) { // a hacky fix for the audio
                 
                this.stop();

                if (this.dataType === Kiwi.Files.File.AUDIO) { //makes me sad
                    this.data.removeEventListener('canplaythrough', () => this.tagLoaderOnLoad(null)); // the remove event that won't work :(
                    this.data.pause();
                    this.data.currentTime = 0;
                    this.data.volume = 1;
                }

                if (this._saveToFileStore === true)
                {
                    this._fileStore.addFile(this.key, this);
                }
                
                if (this.onCompleteCallback)
                {
                    this.onCompleteCallback(this);
                }

            }
        }

        /**
        * @method xhrLoader
		*/
        private xhrLoader() {

            this._xhr = new XMLHttpRequest();
            this._xhr.open('GET', this.fileURL, true);
            this._xhr.timeout = this.timeOutDelay;
            this._xhr.responseType = 'arraybuffer';

            this._xhr.onloadstart = (event) => this.xhrOnLoadStart(event);
            this._xhr.onload = (event) => this.xhrOnLoad(event);
            this._xhr.onprogress = (event) => this.xhrOnProgress(event);
            this._xhr.ontimeout = (event) => this.xhrOnTimeout(event);
            this._xhr.onabort = (event) => this.xhrOnAbort(event);
            this._xhr.onreadystatechange = (event) => this.xhrOnReadyStateChange(event);

            this._xhr.send();

        }

        /**
        * @method xhrOnReadyStateChange
        * @param {Any}
		*/
        private xhrOnReadyStateChange(event) {

            this.readyState = event.target.readyState;

            if (this.readyState === 4)
            {
                this.xhrOnLoad(event);
            }

        }

        /**
        * @method xhrOnLoadStart
        * @param {Any}
		*/
        private xhrOnLoadStart(event) {

            this.timeStarted = event.timeStamp;
            this.lastProgress = event.timeStamp;

        }

        /**
        * @method xhrOnAbort
        * @param {Any}
		*/
        private xhrOnAbort(event) {

        }

        /**
        * @method xhrOnError
        * @param {Any}
		*/
        private xhrOnError(event) {

        }

        /**
        * @method xhrOnTimeout
        * @param {Any}
		*/
        private xhrOnTimeout(event) {

        }

        /**
        * @method xhrOnProgress
        * @param {Any}
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
         **/
        private xhrOnLoad(event) {

            //  Probably hitting from the readyState as well
            if (this.timeFinished > 0)
            {
                return;
            }

            this.stop();

            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            if (this._xhr.status === 200)
            {
                this.success = true;
                this.hasError = false;
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');
                this.buffer = this._xhr.response;

                if (this.dataType === Kiwi.Files.File.IMAGE || this.dataType === Kiwi.Files.File.SPRITE_SHEET || this.dataType === Kiwi.Files.File.TEXTURE_ATLAS)
                {
                    this.createBlob();
                }
                else
                {
                    if (this.dataType === Kiwi.Files.File.JSON) {
                        this.data = String.fromCharCode.apply(null, new Uint8Array(this._xhr.response));
                        this.parseComplete();
                    }
                    
                    if (this.dataType === Kiwi.Files.File.AUDIO) {

                        if (this._game.audio.usingWebAudio) {
                            this.data = {
                                raw: this._xhr.response,
                                decoded: false,
                                buffer: null
                            }

                            //decode that audio
                            var that = this;
                            this._game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                                if (buffer) {
                                    that.data.buffer = buffer;
                                    that.data.decoded = true;
                                    that.parseComplete();
                                }
                            });

                        }
                    }
                    
                   
                }
            }
            else
            {
                this.success = false;
                this.hasError = true;
                this.parseComplete();
            }

        }

        /**
        * @method createBlob
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

//var appendABViewSupported;

//	    private isAppendABViewSupported() {
//		if (typeof appendABViewSupported == "undefined") {
//			var blobBuilder;
//			blobBuilder = new BlobBuilder();
//			blobBuilder.append(getDataHelper(0).view);
//			appendABViewSupported = blobBuilder.getBlob().size == 0;
//		}
//		return appendABViewSupported;
//	}

        /**
        * @method revoke
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
        * @method parseComplete
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

        /**
         * Get information about the given file
         * @method getFileDetails
         * @param {function} The callback to send this FileInfo object to
         **/
        getFileDetails(callback: any = null, maxLoadAttempts:number = 1, timeout: number = 2000) {

            this.onCompleteCallback = callback;
            this.maxLoadAttempts = maxLoadAttempts;
            this.timeOutDelay = timeout;

            this.sendXHRHeadRequest();

        }

        /**
        * 
        * @method sendXHRHeadRequest
        */
        private sendXHRHeadRequest() {

            this.attemptCounter++;

            this._xhr = new XMLHttpRequest();
            this._xhr.open('HEAD', this.fileURL, false);
            this._xhr.onload = (event) => this.getXHRResponseHeaders(event);
            this._xhr.ontimeout = (event) => this.xhrHeadOnTimeout(event);
            this._xhr.onerror = (event) => this.xhrHeadOnError(event);
            this._xhr.timeout = this.timeOutDelay;
            this._xhr.send();

        }

        /**
        * 
        * @method xhrHeadOnTimeout
        */
        private xhrHeadOnTimeout(event) {

            this.hasTimedOut = true;
            this.timedOut = Date.now();

            if (this.attemptCounter >= this.maxLoadAttempts)
            {
                this.hasError = true;
                this.error = event;

                if (this.onCompleteCallback)
                {
                    this.onCompleteCallback.call(this);
                }
            }
            else
            {
                this.sendXHRHeadRequest();
            }

        }

        /**
        * 
        * @method xhrHeadOnError
        * @parm {Any} event
        */
        private xhrHeadOnError(event) {

            this.hasError = true;
            this.error = event;
            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }

        /**
         * Process the response headers received
         * @method getResponseHeaders
         * @param {event} The XHR event
         * @param {function} The callback to send this FileInfo object to
         * @return {Kiwi.Loaders.FileInfo} This FileInfo object containing the results of the response
         **/
        private getXHRResponseHeaders(event:any) {

            this.status = this._xhr.status;
            this.statusText = this._xhr.statusText;

            if (this._xhr.status === 200)
            {
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.fileSize = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');
            }
                
            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }

      

      
	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} a string representation of the instance.
	     **/
        toString(): string {

            return "[{File (fileURL=" + this.fileURL + " fileName=" + this.fileName + " dataType=" + this.dataType + " fileSize=" + this.fileSize + " success=" + this.success + " status=" + this.status + ")}]";

        }

    }

}
