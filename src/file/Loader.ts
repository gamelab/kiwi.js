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
    * @param game {Game} The game that this loader belongs to.
    * @return {Loader} This Object
    *
    */
    export class Loader {
 
        constructor(game: Kiwi.Game) {

            this._game = game;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Loader";
        }

        /**
        * The game that this loader belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * A list of all of the files that need to be loaded.
        * @property _fileList
        * @type File[]
        * @private
        */
        private _fileList: Kiwi.Files.File [];

        /**
        * A list of all of the files that have been loaded.
        * @property _loadList
        * @type File[]
        * @private
        */
        private _loadList: Kiwi.Files.File [];

        /**
        * A callback that is to be called while the loader is in the process of loading files.
        * @property _onProgressCallback
        * @type Function
        * @private
        */
        private _onProgressCallback;

        /**
        * A callback that is to be called when the loader has finished loading files.
        * @property _onCompleteCallback
        * @type Function
        * @private
        */
        private _onCompleteCallback;

        /**
        * If a real byte value calculation will be made prior to the load (much smoother progress bar but costs HEAD calls x total file count)
        * @property _calculateBytes
        * @type boolean
        * @default true
        * @private
        */
        private _calculateBytes: boolean = true;

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
        * @type boolean
        * @private
        */
        private _complete: boolean = false;

        /**
        * The boot method is executed when the DOM has successfully loaded and we can now start the game.
        * @method boot
        * @public
        */
        public boot() {

            this._fileList = [];
            this._loadList = [];

        }

        /**
        * Initialise the properities that are needed on this loader.
        * @method init
        * @param [progress=null] {Any} Progress callback method.
        * @param [complete=null] {Any} Complete callback method.
        * @param [calculateBytes=false] {boolean} 
        * @public
        */
        public init(progress: any = null, complete: any = null, calculateBytes: boolean = false) {

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
        * Creates a new file for an image and adds a the file to loading queue. 
        * @method addImage
        * @param key {String} The key for the file.
        * @param url {String} The url of the image to load.
        * @param [width] {number} The width of the cell on the image to use once the image is loaded.
        * @param [height] {number} The height of the cell on the image to use once the image is loaded.
        * @param [offsetX] {number} An offset on the x axis of the cell.
        * @param [offsetY] {number} An offset of the y axis of the cell.
        * @param [storeAsGlobal=true] {boolean} If the image should be stored globally or not.
        * @public
        */
        public addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal: boolean = true) {

            var file: Kiwi.Files.File = new Kiwi.Files.File(this._game, Kiwi.Files.File.IMAGE, url, key, true, storeAsGlobal);
            file.metadata = { width: width, height: height ,offsetX:offsetX,offsetY:offsetY};

            this._fileList.push(file);

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
        * @public
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal:boolean = true) {

            
            var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.SPRITE_SHEET, url, key,true,storeAsGlobal);
          
            file.metadata = { frameWidth: frameWidth, frameHeight: frameHeight, numCells: numCells, rows: rows, cols: cols, sheetOffsetX: sheetOffsetX, sheetOffsetY: sheetOffsetY, cellOffsetX: cellOffsetX, cellOffsetY: cellOffsetY };
         
            this._fileList.push(file);

        }

        /**
        * Creates new file's for loading a texture atlas and adds those files to the loading queue.
        * @method addTextureAtlas
        * @param key {String} The key for the image file.
        * @param imageUrl {String} The url of the image to load.
        * @param jsonID {String} A key for the JSON file.
        * @param jsonURL {String} The url of the json file to load.
        * @param [storeAsGlobal=true] {Boolean} If hte files should be stored globally or not.
        * @public
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID: string, jsonURL: string, storeAsGlobal: boolean = true) {
            
            var imageFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXTURE_ATLAS, imageURL, key, true, storeAsGlobal);
            var jsonFile = new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, jsonURL, jsonID, true, storeAsGlobal);
            
            
            imageFile.metadata = { jsonID: jsonID };
            jsonFile.metadata = { imageID:key };
            

            this._fileList.push(imageFile,jsonFile);

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
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. Set this to fa
        * @public
        */
        public addAudio(key: string, url: any, storeAsGlobal: boolean = true, onlyIfSupported: boolean = true) {

            //If it is a string then try to load that file
            if ( Kiwi.Utils.Common.isString(url) ) {
                this.attemptToAddAudio(key, url, storeAsGlobal, onlyIfSupported);


            } else if ( Kiwi.Utils.Common.isArray(url) ) {

                for (var i = 0; i < url.length; i++) {
                    //Is the url passed not a string?
                    if ( Kiwi.Utils.Common.isString(url[i]) == false ) continue;

                    //Attempt to load it, and if successful, breakout
                    if (this.attemptToAddAudio(key, url[i], storeAsGlobal, onlyIfSupported) == true) break;
                    
                }

            }

        }

        /**
        * This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
        * Returns a boolean if the audio file was successfully added or not to the file directory.
        * @method attemptToAddAudio
        * @param key {String} The key for the audio file.
        * @param url {String} The url of the audio to load. 
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. Set this to fa
        * @private
        */ 
        private attemptToAddAudio(key: string, url:any, storeAsGlobal:boolean, onlyIfSupported:boolean):boolean {

            var file = new Kiwi.Files.File(this._game, Kiwi.Files.File.AUDIO, url, key, true, storeAsGlobal);
            var support = false;

            switch (file.fileExtension) {
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
                this._fileList.push(file);
                return true;
            } else {
                if(this._game.debug) console.error('Kiwi.Loader: Audio Format not supported on this Device/Browser.');
                return false;
            }

        }

        /**
        * Creates a new File to store JSON and adds it to the loading queue.
        * @method addJSON
        * @param key {String} The key for the file.
        * @param url {String} The url to the json file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addJSON(key: string, url: string, storeAsGlobal: boolean = true) {

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.JSON, url, key, true, storeAsGlobal));

        }

        /**
        * Creates a new File to store XML and adds it to the loading queue.
        * @method addXML
        * @param key {String} The key for the file.
        * @param url {String} The url to the xml file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addXML(key: string, url: string, storeAsGlobal: boolean = true) {

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.XML, url, key, true, storeAsGlobal));

        }

        /**
        * Creates a new File for a Binary file and adds it to the loading queue.
        * @method addBinaryFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the Binary file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addBinaryFile(key: string, url: string, storeAsGlobal: boolean = true) {

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.BINARY_DATA, url, key, true, storeAsGlobal));

        }

        /**
        * Creates a new File to store a text file and adds it to the loading queue.
        * @method addTextFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the text file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @public
        */
        public addTextFile(key: string, url: string, storeAsGlobal: boolean = true) {

            this._fileList.push(new Kiwi.Files.File(this._game, Kiwi.Files.File.TEXT_DATA, url, key, true, storeAsGlobal));

        }

        /**
        * Loops through all of the files that need to be loaded and start the load event on them. 
        * @method startLoad
        * @public
        */
        public startLoad() {

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
                    this.getNextFileSize();
                }
                else
                {
                    this._fileChunk = Math.floor(100 / this._fileTotal);
                    this._loadList = this._fileList;

                    this.nextFile();
                }

            }

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method getNextFileSize
        * @private
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
        * [DESCRIPTION REQUIRED]
        * @method addToBytesTotal
        * @param file {File} 
        * @private
        */
        private addToBytesTotal(file: Kiwi.Files.File) {

            this._bytesTotal += file.fileSize;

            this._loadList.push(file);

            this.getNextFileSize();

        }

        /**
        * Starts the loading of the next file in the list.
        * @method nextFile
        * @private
        */
        private nextFile() {

            this._currentFile++;

            var tempFile: Kiwi.Files.File = this._loadList.shift();

            tempFile.load((f) => this.fileLoadComplete(f), (f) => this.fileLoadProgress(f));

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fileLoadProgress
        * @param file {File}
        * @private
        */
        private fileLoadProgress(file: Kiwi.Files.File) {

            if (this._calculateBytes === true)
            {
                this._bytesCurrent = file.bytesLoaded;

                if (this._onProgressCallback)
                {
                    //  Send: the percentage complete (overall), the bytes total (overall) and the file currently being loaded
                    this._onProgressCallback(this.getPercentLoaded(), this.getBytesLoaded(), file);
                }
            }

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fileLoadComplete
        * @param file {File}
        * @private
        */
        private fileLoadComplete(file: Kiwi.Files.File) {

            if (this._calculateBytes === true)
            {
                this._bytesLoaded += file.bytesTotal;
                this._bytesCurrent = 0;

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
                if (this._game.debug) {
                    console.log("All files have loaded");
                }
                
                if (this._onCompleteCallback)
                {
                    this._onCompleteCallback();
                }
            }
            else
            {
                this.nextFile();
            }

        }

        /**
        * Returns the total number of bytes that have been loaded so far.
        * @method getBytesLoaded
        * @return {Number}
        * @public
        */
        public getBytesLoaded(): number {

            return this._bytesLoaded + this._bytesCurrent;

        }

        /**
        * Returns a percentage of the amount that has been loaded so far.
        * @method getPercentLoaded
        * @return {Number}
        * @public
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
        * @param [value] {boolean}
        * @return {boolean}
        * @public
        */
        public calculateBytes(value?: boolean): boolean {

            if (value)
            {
                this._calculateBytes = value;
            }
            
            return this._calculateBytes;

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method complete
        * @return {boolean}
        * @public
        */
        public complete(): boolean {
            return this._complete;
        }

    }

}
