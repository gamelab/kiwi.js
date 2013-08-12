/// <reference path="FileCache.ts" />
/// <reference path="../Kiwi.ts" />

/**
 *  Kiwi - Core - File
 *
 *  @desc       This class handles the loading of external data files via a tag loader or xhr + arraybuffer, and optionally saves to the game cache
 *
 *	@version 	0.1 - 7th December 2012
 *
 *	@author 	Richard Davey
 *
 *  @url        http://www.kiwijs.org
 *
 *  @todo       more data types
 *
 */

module Kiwi {
     
    export class File {

        /*
        * 
        * @constructor
        * @param {String} dataType
        * @param {String} path
        * @param {String} cacheID
        * @param {Boolean} saveToCache
        * @param {Kiwi.FileCache} cache
        * @return {Kiwi.File}
        */
        constructor(game: Kiwi.Game, dataType: number, path: string, cacheID: string = '', saveToCache: bool = false, cache: Kiwi.FileCache = null) {

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

            //  TODO - Determine blob support properly, defaulting to tag loader for now :(

            if (Kiwi.DEVICE.blob) {
                //if (typeof window['Blob'] !== 'undefined')
                //{
                klog.info('blob support found - using blob loader');
                this._useTagLoader = false;
            } else {
                klog.info('blob support NOT found - using tag loader');
                this._useTagLoader = true;
            }
            //this._useTagLoader = true;
            //}

            if (this.dataType === Kiwi.File.AUDIO && this._game.audio.usingAudioTag === true) {
                this._useTagLoader = true;
            }

            this._saveToCache = saveToCache;
            this._cache = cache;

            if (this.cacheID === '')
            {
                this.cacheID = this.fileName;
            }
            else
            {
                this.cacheID = cacheID;
            }

            klog.info('New Kiwi.File: ' + this.toString());

        }

        public objType() {
            return "File";
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
        * @property _cache
        * @type FileCache
        * @private
	    */
        private _cache: Kiwi.FileCache;

        /**
        * @property _saveToCache
        * @type Boolean
        * @private
	    */
        private _saveToCache: bool = true;

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
        * @property cacheID
        * @type String
    	*/
        public cacheID: string;

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

        public frames: Kiwi.Anims.FrameData;
        public frameWidth: number;
        public frameHeight: number;

        /**
        * @method load
        * @param {Any} [onCompleteCallback]
        * @param {Any} [onProgressCallback]
        * @param {FileCache} [customCache]
        * @param {Number} maxLoadAttempts
        * @param {Number} timeout
		*/
        load(onCompleteCallback: any = null, onProgressCallback: any = null, customCache: Kiwi.FileCache = null, maxLoadAttempts: number = 1, timeout: number = 2000) {

            this.onCompleteCallback = onCompleteCallback;
            this.onProgressCallback = onProgressCallback;
            this.maxLoadAttempts = maxLoadAttempts;
            this.timeOutDelay = timeout;

            if (customCache !== null)
            {
                this._cache = customCache;
                this._saveToCache = true;
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

            if (this.dataType === Kiwi.File.IMAGE || this.dataType === Kiwi.File.SPRITE_SHEET || this.dataType === Kiwi.File.TEXTURE_ATLAS)
            {
                this.data = new Image();
                this.data.src = this.fileURL;
                this.data.onload = (event) => this.tagLoaderOnLoad(event);
                this.data.onerror = (event) => this.tagLoaderOnError(event);        //To be remade
                this.data.onreadystatechange = (event) => this.tagLoaderOnReadyStateChange(event);
               

            } else if (this.dataType === Kiwi.File.AUDIO) {
                console.log('Ewww...disgusting...your loading by the audio tags....');

                this.data = new Audio();
                this.data.src = this.fileURL;
                this.data.preload = 'auto';
                this.data.onerror = (event) => this.tagLoaderOnError(event);
                //this.data.addEventListener('canplaythrough', (event) => this.tagLoaderOnLoad(event), false); //never firing.?.?.?
                //this.data.onload = (event) => this.tagLoaderOnLoad(event);
                //this.data.load();
                

                this.tagLoaderOnLoad(null);     //need to fix....for some reason the audio does not want to load...
            }
            
        }

        /**
        * @method tagLoaderOnReadyStateChange
        * @param {Any} event
		*/
        private tagLoaderOnReadyStateChange(event) {

            klog.info('rs: ' + this.data.readyState);
            klog.info('tagLoader onReadyStateChange', event);

        }

        /**
        * @method tagLoaderOnError
        * @param {Any}
		*/
        private tagLoaderOnError(event) {

            klog.info('tagLoader onError', event);

            this.hasError = true;
            this.error = event;

            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
            }

        }

        private tagLoaderProgressThrough(event) {
            console.log('progress');
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
            console.log('loaded');
            this.stop(); 

            if (this._saveToCache === true)
            {
                this._cache.addFile(this.cacheID, this);
            }
            
            if (this.onCompleteCallback)
            {
                this.onCompleteCallback(this);
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

            klog.info('xhrOnAbort', event);

        }

        /**
        * @method xhrOnError
        * @param {Any}
		*/
        private xhrOnError(event) {

            klog.info('xhrOnError', event);

        }

        /**
        * @method xhrOnTimeout
        * @param {Any}
		*/
        private xhrOnTimeout(event) {

            klog.info('xhrOnTimeout', event);

        }

        /**
        * @method xhrOnProgress
        * @param {Any}
		*/
        private xhrOnProgress(event) {

            klog.info('xhrOnProgress', event);

            this.bytesLoaded = parseInt(event.loaded);
            this.bytesTotal = parseInt(event.totalSize);
            this.percentLoaded = Math.round((this.bytesLoaded / this.bytesTotal) * 100);

            klog.info(this.fileName + ' = ' + this.bytesLoaded + ' / ' + this.bytesTotal);

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
                console.log("XHR SUCCESS");
                this.success = true;
                this.hasError = false;
                this.fileType = this._xhr.getResponseHeader('Content-Type');
                this.bytesTotal = parseInt(this._xhr.getResponseHeader('Content-Length'));
                this.lastModified = this._xhr.getResponseHeader('Last-Modified');
                this.ETag = this._xhr.getResponseHeader('ETag');
                this.buffer = this._xhr.response;

                if (this.dataType === Kiwi.File.IMAGE || this.dataType === Kiwi.File.SPRITE_SHEET || this.dataType === Kiwi.File.TEXTURE_ATLAS)
                {
                    this.createBlob();
                }
                else
                {
                    if (this.dataType === Kiwi.File.JSON) {
                        this.data = String.fromCharCode.apply(null, new Uint8Array(this._xhr.response));
                        this.parseComplete();
                    }
                    
                    if (this.dataType === Kiwi.File.AUDIO) {
                        this.data = {
                            raw: this._xhr.response,
                            decoded: false,
                            buffer: null
                        }

                        if (this._game.audio.predecode == true) {
                            console.log('Audio is Decoding');
                            //decode that audio
                            var that = this;
                            this._game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                                if (buffer) {
                                    that.data.buffer = buffer;
                                    that.data.decoded = true;
                                    that.parseComplete();
                                    console.log('Audio Decoded');
                                }
                            });

                        } else {
                            this.parseComplete();
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

            klog.info('creating blob');

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

            klog.info('revoking');

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

            klog.info('parse complete');

            if (this._saveToCache === true)
            {
                klog.info('saving to cache', this._cache, this.cacheID);
                this._cache.addFile(this.cacheID, this);
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

            klog.info('Getting File Details of ' + this.fileURL);

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

            klog.info('xhr send');

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

            klog.info('on XHR timeout', event);

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

            klog.info('on XHR error', event);

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

            klog.info('xhr response ' + this.status, this.statusText);

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
        * 
        * @method saveToCache
        * @param {Boolean} value
        * @return {Boolean}
        */
        public saveToCache(value?: bool): bool {

            if (value)
            {
                this._saveToCache = value;
            }

            return this._saveToCache;

        }

        /**
        * 
        * @method cache
        * @param {Kiwi.FileCache} value
        * @return {Kiwi.FileCache}
        */
        public cache(value: Kiwi.FileCache = null): Kiwi.FileCache {

            if (value !== null)
            {
                this._cache = value;
            }

            return this._cache;

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
