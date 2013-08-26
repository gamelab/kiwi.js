/// <reference path="File.ts" />


/**
 *  Kiwi - Core - Loader
 *
 *  @desc       Creates a batch file loader and puts them all into the local game caches
 *
 *	@version 	1.0 - 4th March 2013
 *
 *	@author 	Richard Davey
 *
 *  @url        http://www.kiwijs.org
 *
 *  @todo       Test mixed case (xhr loaded data + tag loaded images)
 *
 */

module Kiwi.Files {

    export class Loader {

        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Loader} This Object
        */
        constructor(game: Kiwi.Game) {

            this._game = game;

        }

        public objType() {
            return "Loader";
        }

        /**
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * 
        * @property _fileList
        * @type Kiwi.Structs.Queue
        * @private
        */
        private _fileList: Kiwi.Files.File [];

        /**
        * 
        * @property _loadList
        * @type Kiwi.Structs.Queue
        * @private
        */
        private _loadList: Kiwi.Files.File [];

        /**
        * 
        * @property _onProgressCallback
        * @private
        */
        private _onProgressCallback;

        /**
        * 
        * @property _onCompleteCallback
        * @private
        */
        private _onCompleteCallback;

        /**
        * If a real byte value calculation will be made prior to the load (much smoother progress bar but costs HEAD calls x total file count)
        * @property _calculateBytes
        * @type Boolean
        * @private
        */
        private _calculateBytes: bool = true;

        /**
        * Total number of files to be loaded
        * @property _fileTotal
        * @type Number
        * @private
        */
        private _fileTotal: number = 0;

        /**
        * The most recently loaded file (out of the total)
        * @property _currentFile
        * @type Number
        * @private
        */
        private _currentFile: number = 0;

        /**
        * Total file size (in bytes) of all files to be loaded - only set if calculateBytes is true
        * @property _bytesTotal
        * @type Number
        * @private
        */
        private _bytesTotal: number = 0;

        /**
        * Total number of bytes loaded so far (out of _bytesTotal)
        * @property _bytesLoaded
        * @type Number
        * @private
        */
        private _bytesLoaded: number = 0;

        /**
        * Total number of bytes loaded from last completed file
        * @property _bytesCurrent
        * @type Number
        * @private
        */
        private _bytesCurrent: number = 0;
  
        /**
        * When using the tag loader we don't have a byte total, just a X of files total - this holds the percentage each file from that total is worth
        * @property _fileChunk
        * @type Number
        * @private
        */
        private _fileChunk: number = 0;

        /**
        * The total % of the current queue that has been loaded
        * @property _percentLoaded
        * @type Number
        * @private
        */
        private _percentLoaded: number = 0;

        /**
        * Everything in the queue loaded?
        * @property _complete
        * @type Boolean
        * @private
        */
        private _complete: bool = false;

        //  DOM is ready

        /**
        * 
        * @method boot
        */
        public boot() {

            klog.info('Loader Boot');

            this._fileList = [];
            this._loadList = [];

        }

        /**
        * 
        * @method init
        * @param {Any} [progress]
        * @param {Any} [complete]
        * @param {Boolean} calculateBytes
        */
        public init(progress: any = null, complete: any = null, calculateBytes: bool = false) {

            klog.info('Loader init - calculate bytes: ' + calculateBytes);

            this._fileList.length = 0;
            this._loadList.length = 0;

            this._calculateBytes = calculateBytes;
            this._complete = false;

            if (progress !== null)
            {
                this._onProgressCallback = progress;
            }

            if (complete !== null)
            {
                this._onCompleteCallback = complete;
            }

        }

        /**
        * 
        * @method addImage
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addImage(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null, width?: number, height?: number, offsetX?: number, offsetY?: number) {

            if (cache === null)
            {
                cache = this._game.cache.images;
            }
            var file: Kiwi.Files.File = new Kiwi.Files.File(this._game, Kiwi.Files.File.IMAGE, url, cacheID, true, cache);
            file.metadata = { width: width, height: height ,offsetX:offsetX,offsetY:offsetY};

            this._fileList.push(file);

        }

        /**
        * 
        * @method addSpriteSheet
        * @param {String} cacheID
        * @param {String} url
        * @param {number} frameWidth
        * @param {number} frameHeight
        * @param {Kiwi.FileCache} [cache]
        */
        public addSpriteSheet(cacheID: string, url: string, frameWidth: number, frameHeight: number, cache: Kiwi.Files.FileStore = null, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number) {

            if (cache === null)
            {
                cache = this._game.cache.images;
            }
            
            var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.SPRITE_SHEET, url, cacheID, true, cache);
          
            file.metadata = { frameWidth: frameWidth, frameHeight: frameHeight, numCells: numCells, rows: rows, cols: cols, sheetOffsetX: sheetOffsetX, sheetOffsetY: sheetOffsetY, cellOffsetX: cellOffsetX, cellOffsetY: cellOffsetY };
         
            this._fileList.push(file);

        }
        /// ***
        public addTextureAtlas(cache: Kiwi.Files.Cache,imageID: string, imageURL: string, jsonID?: string, jsonURL?: string) {

            console.log(imageID, imageURL, jsonID, jsonURL);

            if (cache === null)
            {
                cache = this._game.cache;
            }
            
            var imageFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXTURE_ATLAS, imageURL, imageID, true, cache.images);
            var jsonFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, jsonURL, jsonID, true, cache.data);
            
            
            imageFile.metadata = { jsonCache: cache.data, jsonID: jsonID };
            jsonFile.metadata = { imageCache:cache.images,imageID:imageID };
            

            this._fileList.push(imageFile,jsonFile);

        }

        /**
        * 
        * @method addAudio
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addAudio(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null) {

            if (cache === null)
            {
                cache = this._game.cache.audio;
            }

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.AUDIO, url, cacheID, true, cache));
           
        }

        /**
        * 
        * @method addJSON
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addJSON(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null) {

            if (cache === null)
            {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, url, cacheID, true, cache));

        }

        /**
        * 
        * @method addXML
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addXML(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null) {

            if (cache === null)
            {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.XML, url, cacheID, true, cache));

        }

        /**
        * 
        * @method addBinaryFile
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addBinaryFile(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null) {

            if (cache === null)
            {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.BINARY_DATA, url, cacheID, true, cache));

        }

        /**
        * 
        * @method addTextFile
        * @param {String} cacheID
        * @param {String} url
        * @param {Kiwi.FileCache} [cache]
        */
        public addTextFile(cacheID: string, url: string, cache: Kiwi.Files.FileStore = null) {

            if (cache === null)
            {
                cache = this._game.cache.data;
            }

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXT_DATA, url, cacheID, true, cache));

        }

        /**
        * 
        * @method addCustomFile
        * @param {Kiwi.Files} file
        * @param {Kiwi.FileCache} [cache]
        */
        public addCustomFile(file: Kiwi.Files.File, cache: Kiwi.Files.FileStore = null) {

            if (cache !== null)
            {
                file.saveToCache(true);
                file.cache(cache);
            }

            this._fileList.push(file);

        }

        /**
        * 
        * @method startLoad
        */
        public startLoad() {

            klog.info('Loader startLoad');

            if (this._fileList.length === 0)
            {
                this._onCompleteCallback();
            }
            else
            {
                this._onProgressCallback(0, 0, null);

                this._fileTotal = this._fileList.length;
                this._bytesLoaded = 0;
                this._bytesTotal = 0;
                this._bytesCurrent = 0;
                this._currentFile = 0;
                this._fileChunk = 0;
                this._percentLoaded = 0;

                if (this._calculateBytes === true)
                {
                    klog.info('Loader - startLoad - getting total file sizes');
                    this.getNextFileSize();
                }
                else
                {
                    klog.info('Loader - startLoad - skipping xhr file size check');
                    this._fileChunk = Math.floor(100 / this._fileTotal);
                    this._loadList = this._fileList;

                    this.nextFile();
                }

            }

        }

        /**
        * 
        * @method getNextFileSize
        */
        private getNextFileSize() {

            if (this._fileList.length === 0)
            {
                var tempFile: Kiwi.Files.File = this._fileList.shift();

                tempFile.getFileDetails((file) => this.addToBytesTotal(file));
            }
            else
            {
                this.nextFile();
            }

        }

        /**
        * 
        * @method addToBytesTotal
        * @param {Kiwi.Files} file
        */
        private addToBytesTotal(file: Kiwi.Files.File) {

            klog.info('Loader - addToBytesTotal - ' + file.fileName + ' = ' + file.fileSize);

            this._bytesTotal += file.fileSize;

            this._loadList.push(file);

            this.getNextFileSize();

        }

        /**
        * 
        * @method nextFile
        */
        private nextFile() {

            this._currentFile++;

            var tempFile: Kiwi.Files.File = this._loadList.shift();

            tempFile.load((f) => this.fileLoadComplete(f), (f) => this.fileLoadProgress(f));

        }

        /**
        * 
        * @method fileLoadProgress
        * @param {Kiwi.Files} file
        */
        private fileLoadProgress(file: Kiwi.Files.File) {

            if (this._calculateBytes === true)
            {
                this._bytesCurrent = file.bytesLoaded;

                //klog.info('Loader P: current: ' + this._bytesCurrent + ' Overall loaded: ' + this.bytesLoaded + ' total: ' + this._bytesTotal + ' = ' + this.percentLoaded);

                if (this._onProgressCallback)
                {
                    //  Send: the percentage complete (overall), the bytes total (overall) and the file currently being loaded
                    this._onProgressCallback(this.getPercentLoaded(), this.getBytesLoaded(), file);
                }
            }

        }

        /**
        * 
        * @method fileLoadComplete
        * @param {Kiwi.Files} file
        */
        private fileLoadComplete(file: Kiwi.Files.File) {

            if (this._calculateBytes === true)
            {
                this._bytesLoaded += file.bytesTotal;
                this._bytesCurrent = 0;

                //console.log('Loader C: current: ' + this._bytesCurrent + ' Overall loaded: ' + this.bytesLoaded + ' total: ' + this._bytesTotal + ' = ' + this.percentLoaded);

                if (this._onProgressCallback)
                {
                    //  Send: the percentage complete (overall), the bytes total (overall) and the file currently being loaded
                    this._onProgressCallback(this.getPercentLoaded(), this._bytesLoaded, file);
                }
            }
            else
            {
                if (this._onProgressCallback)
                {
                    //  Send: the percentage complete (overall)
                    this._onProgressCallback(this.getPercentLoaded(), 0, file);
                }

            }

        

            if (this._loadList.length === 0)
            {
                //  All files loaded
                this._complete = true;

                
                if (this._onCompleteCallback)
                {
                    klog.info('onCompleteCallback');
                    this._onCompleteCallback();
                }
            }
            else
            {
                this.nextFile();
            }

        }

        /**
        * 
        * @method getBytesLoaded
        * @return {Number}
        */
        public getBytesLoaded(): number {

            return this._bytesLoaded + this._bytesCurrent;

        }

        /**
        * 
        * @method getPercentLoaded
        * @return {Number}
        */
        public getPercentLoaded(): number {

            if (this._calculateBytes === true)
            {
                return Math.round((this.getBytesLoaded() / this._bytesTotal) * 100);
            }
            else
            {
                return Math.round((this._currentFile / this._fileTotal) * 100);
            }

        }

        /**
        * If true (and xhr/blob is available) the loader will get the bytes total of each file in the queue to give a much more accurate progress report during load
          If false the loader will use the file number as the progress value, i.e. if there are 4 files in the queue progress will get called 4 times (25, 50, 75, 100)
        * @method calculateBytes
        * @param {Boolean} value
        * @return {Boolean}
        */
        public calculateBytes(value?: bool): bool {

            if (value)
            {
                this._calculateBytes = value;
            }
            
            return this._calculateBytes;

        }

        /**
        * 
        * @method complete
        * @return {Boolean}
        */
        public complete():bool {

            return this._complete;

        }

    }

}
