/**
* Kiwi - Files
* @module Kiwi
* @submodule Files 
* @main Files
*/
 
module Kiwi.Files {

    /**
    *
    *
    * @class DataLibrary
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

    
    }

}

