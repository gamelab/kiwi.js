/**
* 
* @module Kiwi
* @submodule Files 
* 
*/

module Kiwi.Files {

    /**
    * Holds all of the Files (regardless of the file type) that have been loaded throughout a game/are accessable at a particular point in time. Contains methods for dealing with files. Note: Each time the state is switched the file store will remove all references to files that have not been flagged as global. 
    * 
    * @class FileStore
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this FileStore belongs to.
    * @return {FilesStore}
    *
    */
    export class FileStore {
 
        constructor(game: Kiwi.Game) {
            this._game = game;
            this._files = {};
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "FileStore";
        }

        /**
        * The game that this FileStore belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The files that are on this FileStore.
        * @property _files
        * @type Object
        * @private
        */
        private _files;

        /**
        * The number of files that are on the file store.
        * @property _size
        * @type Number
        * @default 0
        * @private
        */
        private _size:number = 0;

        /**
        * The boot method is executed when the DOM elements needed for this game are ready and thus the game can 'boot'.
        * @method boot
        * @public
        */
        public boot() {
            
        }

        /** 
        * Returns a particular file by the key that you specify.
        * @method getFile
        * @param key {String} The key of the file that you to get.
        * @return {File} 
        * @public
        */
        public getFile(key: string): Kiwi.Files.File {

            return this._files[key];

        }

        /**
        * Returns an object full of files that have a Tag that is associated with it.
        * @method getFilesByTag
        * @param tag {String} 
        * @return {Object} All of the files with that tag.
        * @public
        */
        public getFilesByTag(tag: string): Object {

            var obj = {};
            for (var file in this._files) {
                if (this._files[file].hasTag(tag)) {
                    obj[file] = this._files[file];
                }
            }
            return obj;
        }

        /**
        * Removes all of the files by a tag that is specified.
        * @method removeFilesByTag
        * @param tag {String}
        * @return {Number} The number of files that were removed.
        * @public
        */
        public removeFilesByTag(tag: string):number {

            var numberFiles: number = 0;
            for (var file in this._files) {
                if (this._files[file].hasTag(tag)) {
                    this.removeFile(file);
                    numberFiles++;
                }
            }
            return numberFiles;
        }

        /**
        * Returns all of the keys for every file that exist on this FileStore as an array.
        * @property keys
        * @type String[]
        * @public
        */
        public get keys(): string[] {
            var keys: string[] = new Array();
            for (var key in this._files) {
                keys.push(key);
            }

            return keys;
        }

        /** 
        * Returns the number of files that are on this FileStore.
        * @method size
        * @return {Number} 
        * @public
        */
        public size(): number {

            return this._size;

        }

        /**
        * Adds a File with a key to the FileStore. If the key that you specify already exists then this method will return false otherwise it should return true if it was added.
        * @method addFile
        * @param key {String} A unique key that this file should be accessed by.
        * @param value {File} The file that you would like to save on the FileStore.
        * @return {Boolean} If the file was added or not
        * @public
		*/
        public addFile(key: string, value: Kiwi.Files.File): boolean {

            if (!this._files[key])
            {
                this._files[key] = value;
                this._size++;
                return true;
            }

            return false;

        }

        /**
        * Checks to see if a key that you pass is already being used for another file. Returns true if that key is already in used, false if it isn't.
        * @method exists
        * @param key {String} The key that you are checking.
        * @return boolean
        * @public
		*/
        public exists(key: string): boolean {

            if (this._files[key])
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * Removes files on the FileStore that are associated with a particular state.
        * @method removeStateFiles
        * @param state {State} 
        * @public
        */
        public removeStateFiles(state: Kiwi.State) {
            for (var file in this._files) {
                if (this._files[file].ownerState === state) {
                    this.removeFile(file);
                }
            }
        }

        /**
        * Removes a file by the key that is passed. Returns a boolean indicating if a file was removed or not.
        * Note: Only returns false if that file did not exist in the first place.
        * @method removeFile
        * @param key {String} The key of the file you want to remove.
        * @return {Boolean}
        * @public
		*/
        public removeFile(key: string): boolean {

            if (this._files[key])
            {
                this._files[key] = null;
                delete this._files[key];
                return true;
            }

            return false;

        }



    }

}