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

        //List of files to be loaded via tag systems
        private _tagList: Kiwi.Files.File[];
        
        //List of files that are waiting to be loaded via xhr methods
        private _xhrList: Kiwi.Files.File[];

        //List of files that are to be loaded...
        private _fileQueue: Kiwi.Files.File[];

        public onQueueComplete: Kiwi.Signal;

        public onQueueProgress: Kiwi.Signal;

        public boot() {

            this._fileQueue = [];

            this._tagList = [];

            this._xhrList = [];

            this.onQueueComplete = new Kiwi.Signal();

            this.onQueueProgress = new Kiwi.Signal();

        }

        //Starts loading all the files which are on the file queue
        public start() {

            //Any files to load?
            if (this._fileQueue.length <= 0) {
                console.log('No files to load in the file queue.');
                this.onQueueComplete.dispatch();
                return;
            }

            //There are files to load
            var i = 0,
                file: Kiwi.Files.File;

            while (i < this._fileQueue.length) {

                this.addFileToList(this._fileQueue[i]);
                i++;
            }

            this.xhrStartLoading();
            this.tagStartLoading();

        }

        private addFileToList(file) {

            if (file.useTagLoader) {
                //Push into the tag loader queue
                console.log('Using Tag Loader');
                this._tagList.push(file);

            } else {
                //Push into the xhr queue
                console.log('Using XHR Loader');
                this._xhrList.push(file);

            }

        }

        private fileQueueUpdate(file) {

            var index = this._fileQueue.indexOf(file);

            if (index == -1) {
                console.log('Did not find the file in the file queue');
                return;
            }

            //File is in the file queue

            //Remove the file
            this._fileQueue.splice(index, 1);

            //Any files left in the queue to load?
            if (this._fileQueue.length <= 0) {
                this.onQueueComplete.dispatch();
            } else {
                this.onQueueProgress.dispatch();
            }

        }

        //XHR Loader

        private xhrStartLoading():boolean {

            //Any files to load?
            if ( this._xhrList.length <= 0 ) {
                console.log('No files in XHR list to load');
                return false; 
            }

            //Is the current one loading?
            if ( this._xhrList[0].loading ) {
                console.log('File is currently loading');
                return false;
            }

            //Attempt to load the file!
            this._xhrList[0].onComplete.addOnce(this.xhrFileComplete, this);
            this._xhrList[0].load();
            return true;
        }

        private xhrFileComplete(file) {

            //Remove from the XHR queue
            var index = this._xhrList.indexOf(file);
            if (index === -1) {
                console.log('Something has gone wrong? No file has been found');
                return;
            }

            this._xhrList.splice(index, 1);

            //Start loading 
            if (this.xhrStartLoading() ) {
                //File is now loading
            } else {
                //Loading has been completed
                console.log('XHR Loading Complete');
            }

            this.fileQueueUpdate(file);
        }

        //Tag Loading

        private tagStartLoading() {

            //Loop through all of the files
            var i = 0,
                file: Kiwi.Files.File;

            while (i < this._tagList.length) {

                file = this._tagList[i];
                file.onComplete.add(this.tagFileComplete, this);
                file.load();

                i++;
            }
            
        }

        private tagFileComplete(file) {

            var index = this._tagList.indexOf(file);
            if (index === -1) {
                console.log('Something has gone wrong? No file has been found');
                return;
            }

            this._tagList.splice(index, 1);
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
                type: Kiwi.Files.File.IMAGE
            };
            
            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file: Kiwi.Files.File = new Kiwi.Files.TextureFile(this.game, key, url, params);
            file.metadata = { width: width, height: height, offsetX: offsetX, offsetY: offsetY };

            this._fileQueue.push(file);

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
                type: Kiwi.Files.File.SPRITE_SHEET
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file = new Kiwi.Files.TextureFile(this.game, key, url, params);
            file.metadata = { frameWidth: frameWidth, frameHeight: frameHeight, numCells: numCells, rows: rows, cols: cols, sheetOffsetX: sheetOffsetX, sheetOffsetY: sheetOffsetY, cellOffsetX: cellOffsetX, cellOffsetY: cellOffsetY };

            this._fileQueue.push(file);

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
                type: Kiwi.Files.File.TEXTURE_ATLAS
            };
            var jsonParams: any = {
                type: Kiwi.Files.File.JSON
            };

            textureParams.fileStore = this.game.fileStore;
            jsonParams.fileStore = this.game.fileStore;

            if (!storeAsGlobal && this.game.states.current) {
                textureParams.state = this.game.states.current;
                jsonParams.state = this.game.states.current;
            }

            var imageFile = new Kiwi.Files.TextureFile(this.game, key, imageURL, textureParams);
            var jsonFile = new Kiwi.Files.DataFile(this.game, jsonID, jsonURL, jsonParams);


            imageFile.metadata = { jsonID: jsonID };
            jsonFile.metadata = { imageID: key };


            this._fileQueue.push(imageFile, jsonFile);

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
                type: Kiwi.Files.File.AUDIO
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file = new Kiwi.Files.AudioFile(this.game, key, url, params);
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
                this._fileQueue.push(file);
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
                type: Kiwi.Files.File.JSON
            };

            params.fileStore = this.game.fileStore;
            if (!storeAsGlobal && this.game.states.current) {
                params.state = this.game.states.current;
            }

            var file = new Kiwi.Files.DataFile(this.game, key, url, params);
            this._fileQueue.push(file);
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

    }

}
