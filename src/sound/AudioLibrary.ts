/**
* 
* @module Kiwi
* @submodule Sound
* 
*/ 

module Kiwi.Sound {

    /**
    * Holds a reference to all of the Audio Files (mp3, ogg, e.t.c) that are accessible on the State that this AudioLibrary is on.
    * 
    * @class AudioLibrary
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this audio library is a member of.
    * @return {AudioLibrary}
    */
    export class AudioLibrary {
         
        constructor(game: Kiwi.Game) {

            this._game = game;
            this.audio = {};
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return "AudioLibrary";
        }

        /**
        * The game that the AudioLibrary belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Contains all of the audio files that are available.
        * @property audio
        * @type Object
        * @public
        */
        public audio;

        /**
        * Resets the audio library.
        * @method clear
        * @public
        */
        public clear() {
            for (var prop in this.audio) {
                delete this.audio[prop];
            }
        }


        /**
        * Rebuild the library from a fileStore. Clears the library and repopulates it.
        * @method rebuild
        * @param {Kiwi.Files.FileStore} fileStore
        * @param {Kiwi.State} state
        * @public
        */
        public rebuild(fileStore:Kiwi.Files.FileStore,state:Kiwi.State) {
            this.clear();
            if (this._game.debug) {
                console.log("Rebuilding Audio Library");
            }

            var fileStoreKeys = fileStore.keys;
            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file: Kiwi.Files.File = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isAudio) {
                    if (this._game.debug) { console.log("Adding Audio: " + file.fileName) };
                    state.audioLibrary.add(file);
                } 
            }        
        }

        /**
        * Adds a new audio file to the audio library.
        * @method add
        * @param {File} audioFile
        * @public
        */
        public add(audioFile: Kiwi.Files.File) {

            switch (audioFile.dataType) {
                case Kiwi.Files.File.AUDIO:
                    this.audio[audioFile.key] = audioFile;
                    break;
               
                default:
                    //Audio file is of unknown type and was not added to audio library
                    break;
            }

        }

       
    }

}

