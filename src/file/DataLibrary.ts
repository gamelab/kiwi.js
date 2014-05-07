/**
* 
* @module Kiwi
* @submodule Files 
* @main Files
*/
 
module Kiwi.Files {

    /**
    * Holds a reference to all of the data Files (json, xml, e.t.c) that are accessible on the State that this DataLibrary is on.
    *
    * @class DataLibrary
    * @namespace Kiwi.Files
    * @constructor
    * @param game {Game} The game that this DataLibrary belongs to.
    * @return {DataLibrary}
    *
    */
    export class DataLibrary {
 
        constructor(game: Kiwi.Game) {

            this._game = game;
            this.data = {};
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return "DataLibrary";
        }

        /**
        * The game that this DataLibrary belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Contains all of the data that this available.
        * @property textures
        * @type Object
        * @public
        */
        public data;

        /**
        * Resets the Data Library and makes it ready for the next state.
        * @method clear
        * @public
        */
        public clear() {
            for (var prop in this.data) {
                delete this.data[prop];
            }
        }

        /**
        * Adds a new data file to the DataLibrary.
        * @method add
        * @param dataFile {File} 
        * @public
        */
        public add(dataFile: Kiwi.Files.File) {

            switch (dataFile.dataType) {
                case Kiwi.Files.File.JSON:
                case Kiwi.Files.File.XML :
                case Kiwi.Files.File.BINARY_DATA:
                case Kiwi.Files.File.TEXT_DATA:
                    
                    this.data[dataFile.key] = dataFile;
                    break;
                
                default:
                   //Image file is of unknown type and was not added to data library
                    break;
            }

        }

        /**
       * Rebuild the library from a fileStore. Clears the library and repopulates it.
       * @method rebuild
       * @param {Kiwi.Files.FileStore} fileStore
       * @param {Kiwi.State} state
       * @public
       */
        public rebuild(fileStore: Kiwi.Files.FileStore, state: Kiwi.State) {
            this.clear();
            if (this._game.debug) {
                console.log("Kiwi.DataLibrary: Rebuilding Data Library");
            }

            var fileStoreKeys = fileStore.keys;
            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file: Kiwi.Files.File = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isData) {
                    if (this._game.debug) { console.log("  Kiwi.DataLibrary: Adding Data: " + file.fileName) };
                    state.dataLibrary.add(file);
                }
            }
        }

    
    }

}

