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

        public objType() {
            return "Loader";
        }

        public game: Kiwi.Game;

        //List of files that are loading at the same time
        private _loadingParallel: Kiwi.Files.File[];
        
        //List of files that are waiting to be loaded one after another
        private _loadingQueue: Kiwi.Files.File[];

        //List of files that are to be loaded...
        private _loadingList: Kiwi.Files.File[];

        public onQueueComplete: Kiwi.Signal;

        public onQueueProgress: Kiwi.Signal;

        public get percentLoaded(): number {

            if (this._loadingList.length === 0) {
                return 100;
            }

            var i = 0;
            var complete = 0;

            while (i < this._loadingList.length ) {

                if (this._loadingList[i].complete) {
                    complete++;
                }

                i++;
            }

            console.log(this._loadingList.length, complete);
            return (complete / this._loadingList.length) * 100;

        }

        public boot() {

            this._loadingList = [];

            this._loadingParallel = [];

            this._loadingQueue = [];

            this.onQueueComplete = new Kiwi.Signal();

            this.onQueueProgress = new Kiwi.Signal();

        }

        //Starts loading all the files which are on the file queue
        public start() {

            //Any files to load?
            if (this._loadingList.length <= 0) {
                Kiwi.Log.log('Kiwi.Files.Loader: No files are to load have been found.');
                this.onQueueComplete.dispatch();
                return;
            }

            //There are files to load
            var i = 0,
                file: Kiwi.Files.File;

            while (i < this._loadingList.length) {

                this.sortFile( this._loadingList[i] );
                i++;
            }

            this.startLoadingQueue();
            this.startLoadingParallel();

        }

        public addFile(file: Kiwi.Files.File) {

            if (file.loading || file.complete) {
                Kiwi.Log.warn('Kiwi.Files.Loader: File could not be added as it is currently loading or has already loaded.');
                return;
            } 

            this._loadingList.push(file);
        }

        public removeFile(file: Kiwi.Files.File): boolean {

            var index = this._loadingList.indexOf(file);

            if (index === -1) {
                return false;
            } 

            if (file.loading) {
                Kiwi.Log.warn('Kiwi.Files.Loader: Cannot remove the file from the list as it is currently loading.');
                return false;
            }

            this._loadingList.splice(index, 1);
            return true;
        }

        public clearQueue() {
            this._loadingList.length = 0;
        }

        private sortFile(file:Kiwi.Files.File) {

            if (file.loadInParallel) {
                //Push into the tag loader queue
                console.log('Using Tag Loader');
                this._loadingParallel.push(file);

            } else {
                //Push into the xhr queue
                console.log('Using XHR Loader');
                this._loadingQueue.push(file);

            }

        }

        private fileQueueUpdate(file) {

            //Get the number of files in the queue that have been loaded
            var percent = this.percentLoaded;

            //If it is 100 percent
            if (percent === 100) {
                //Clear the file queue and dispatch the loaded event
                this._loadingList.length = 0;
                this.onQueueComplete.dispatch();

            } else {
                this.onQueueProgress.dispatch(percent);

            }

        }

        //XHR Loader

        private startLoadingQueue():boolean {

            //Any files to load?
            if ( this._loadingQueue.length <= 0 ) {
                Kiwi.Log.log('Kiwi.Files.Loader: No queued files to load.', '#loading');
                return false; 
            }

            //Is the current one loading?
            if (this._loadingQueue[0].loading ) {
                console.log('Kiwi.Files.Loader: File is currently loading');
                return false;
            }

            //Attempt to load the file!
            this._loadingQueue[0].onComplete.addOnce(this.queueFileComplete, this);
            this._loadingQueue[0].load();
            return true;
        }

        private queueFileComplete(file) {

            //Remove from the XHR queue
            var index = this._loadingQueue.indexOf(file);
            if (index === -1) {
                console.log('Something has gone wrong? No file has been found');
                return;
            }

            this._loadingQueue.splice(index, 1);

            //Start loading 
            if ( !this.startLoadingQueue() ) {
                //Loading has been completed
                console.log('XHR Loading Complete');
            }

            this.fileQueueUpdate(file);
        }

        //Tag Loading

        private startLoadingParallel() {

            //Loop through all of the files
            var i = 0,
                file: Kiwi.Files.File;

            while (i < this._loadingParallel.length) {

                file = this._loadingParallel[i];
                file.onComplete.add(this.parallelFileComplete, this);
                file.load();

                i++;
            }
            
        }

        private parallelFileComplete(file) {

            var index = this._loadingParallel.indexOf(file);
            if (index === -1) {
                console.log('Something has gone wrong? No file has been found');
                return;
            }

            this._loadingParallel.splice(index, 1);
            this.fileQueueUpdate(file);
        }

        //File Queue

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
        * @return {Kiwi.Files.File}
        * @public
        */
        public addImage(key: string, url: string, width?: number, height?: number, offsetX?: number, offsetY?: number, storeAsGlobal: boolean = true): Kiwi.Files.File {

            var params: any = {
                type: Kiwi.Files.File.IMAGE,
                key: key,
                url: url,
                metadata: {
                    width: width,
                    height: height,
                    offsetX: offsetX,
                    offsetY: offsetY
                }
            };
            
            params.fileStore = this.game.fileStore;

            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file: Kiwi.Files.File = new Kiwi.Files.TextureFile(this.game, params);
            this.addFile(file);

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
        * @return {Kiwi.Files.File}
        * @public
        */
        public addSpriteSheet(key: string, url: string, frameWidth: number, frameHeight: number, numCells?: number, rows?: number, cols?: number, sheetOffsetX?: number, sheetOffsetY?: number, cellOffsetX?: number, cellOffsetY?: number, storeAsGlobal: boolean = true) {

            var params: any = {
                type: Kiwi.Files.File.SPRITE_SHEET,
                key: key,
                url: url,
                metadata: {
                    frameWidth: frameWidth,
                    frameHeight: frameHeight,
                    numCells: numCells,
                    rows: rows,
                    cols: cols,
                    sheetOffsetX: sheetOffsetX,
                    sheetOffsetY: sheetOffsetY,
                    cellOffsetX: cellOffsetX,
                    cellOffsetY: cellOffsetY
                }
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file = new Kiwi.Files.TextureFile(this.game, params);
            this.addFile(file);

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
        * @return {Kiwi.Files.File}
        * @public
        */
        public addTextureAtlas(key: string, imageURL: string, jsonID: string, jsonURL: string, storeAsGlobal: boolean = true) {

            var textureParams: any = {
                type: Kiwi.Files.File.TEXTURE_ATLAS,
                key: key,
                url: imageURL,
                metadata: {
                    jsonID: jsonID
                }
            };
            var jsonParams: any = {
                type: Kiwi.Files.File.JSON,
                key: jsonID,
                url: jsonURL,
                metadata: {
                    imageID: key
                }
            };

            textureParams.fileStore = this.game.fileStore;
            jsonParams.fileStore = this.game.fileStore;

            if (!storeAsGlobal && this.game.states.current) {
                textureParams.state = this.game.states.current;
                jsonParams.state = this.game.states.current;
            }

            var imageFile = new Kiwi.Files.TextureFile(this.game, textureParams);
            var jsonFile = new Kiwi.Files.DataFile(this.game, jsonParams);

            this.addFile(imageFile);
            this.addFile(jsonFile);

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
        * @return {Kiwi.Files.File}
        * @public
        */
        public addAudio(key: string, url: any, storeAsGlobal: boolean = true, onlyIfSupported: boolean = true) {

            //If it is a string then try to load that file
            if (Kiwi.Utils.Common.isString(url)) {
                return this.attemptToAddAudio(key, url, storeAsGlobal, onlyIfSupported);


            } else if (Kiwi.Utils.Common.isArray(url)) {

                for (var i = 0; i < url.length; i++) {
                    //Is the url passed not a string?
                    if (Kiwi.Utils.Common.isString(url[i]) == false) continue;

                    //Attempt to load it, and if successful, breakout
                    var file = this.attemptToAddAudio(key, url[i], storeAsGlobal, onlyIfSupported);
                    if (file) {
                        return file;
                    }
                }

            }

            return null;
        }

        /**
        * This method firstly checks to see if the AUDIO file being loaded is supported or not by the browser/device before adding it to the loading queue.
        * Returns a boolean if the audio file was successfully added or not to the file directory.
        * @method attemptToAddAudio
        * @param key {String} The key for the audio file.
        * @param url {String} The url of the audio to load. 
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @param [onlyIfSupported=true] {Boolean} If the audio file should only be loaded if Kiwi detects that the audio file could be played. 
        * @return {Kiwi.Files.File}
        * @private
        */
        private attemptToAddAudio(key: string, url: any, storeAsGlobal: boolean, onlyIfSupported: boolean): Kiwi.Files.File {

            var params: any = {
                type: Kiwi.Files.File.AUDIO,
                key: key,
                url: url
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

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
                this.addFile(file);
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
        * @return {Kiwi.Files.File}
        * @public
        */
        public addJSON(key: string, url: string, storeAsGlobal: boolean = true) {

            var params: any = {
                type: Kiwi.Files.File.JSON,
                key: key, 
                url: url
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file = new Kiwi.Files.DataFile(this.game, params);
            this.addFile(file);
            return file;

        }

        /**
        * Creates a new File to store XML and adds it to the loading queue.
        * @method addXML
        * @param key {String} The key for the file.
        * @param url {String} The url to the xml file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File}
        * @public
        */
        public addXML(key: string, url: string, storeAsGlobal: boolean = true) {
            //
        }

        /**
        * Creates a new File for a Binary file and adds it to the loading queue.
        * @method addBinaryFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the Binary file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File}
        * @public
        */
        public addBinaryFile(key: string, url: string, storeAsGlobal: boolean = true) {

        }

        /**
        * Creates a new File to store a text file and adds it to the loading queue.
        * @method addTextFile
        * @param key {String} The key for the file.
        * @param url {String} The url to the text file.
        * @param [storeAsGlobal=true] {Boolean} If the file should be stored globally.
        * @return {Kiwi.Files.File}
        * @public
        */
        public addTextFile(key: string, url: string, storeAsGlobal: boolean = true) {

        }

        
        /**
        * -----------------------
        * Deprecated - Functionality exists. Maps to its equalvent
        * -----------------------
        **/        
        

        /**
        * Initialise the properities that are needed on this loader.
        * @method init
        * @param [progress=null] {Any} Progress callback method.
        * @param [complete=null] {Any} Complete callback method.
        * @param [calculateBytes=false] {boolean} 
        * @public
        */
        public init(progress: any = null, complete: any = null, calculateBytes: boolean=null) {

            if (calculateBytes !== null) {
                Kiwi.Log.error('Calculating the number of bytes file have to load is currently not supported.');
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
        * @public
        */
        public startLoad() {
            this.start();
        }
             
        /**
        * Returns a percentage of the amount that has been loaded so far.
        * @method getPercentLoaded
        * @return {Number}
        * @public
        */
        public getPercentLoaded(): number {
            return this.percentLoaded;
        }


        /**
        * Returns a boolean indicating if everything in the loading que has been loaded or not.
        * @method complete
        * @return {boolean}
        * @public
        */
        public complete(): boolean {
            return ( this.percentLoaded === 100 );
        }


        /**
        * -----------------------
        * Deprecated - Functionality no longer exists
        * -----------------------
        **/

        /**
        * Returns a percentage of the amount that has been loaded so far.
        * @method getPercentLoaded
        * @return {Number}
        * @public
        */
        public getBytesLoaded(): number {
            return 0;
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
            return false;
        }

    }

}
