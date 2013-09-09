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
    *
    */
    export class DataLibrary {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.Files.DataLibrary}
        */
        constructor(game: Kiwi.Game) {

            this._game = game;
            this.data = {};
        }

        public objType(): string {
            return "DataLibrary";
        }

        /*
        *
        * @property _game
        * @type Kiwi.Game
        */
        private _game: Kiwi.Game;

        /*
        * Contains all of the textures that are available.
        * @property textures
        */
        public data;

        /*
        * Resets the Data Library 
        * @method clear
        */
        public clear() {
            for (var prop in this.data) {
                delete this.data[prop];
            }
        }

        /*
        * Adds a new audio file to the audio library.
        * @method add
        * @param {Kiwi.File} imageFile
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

