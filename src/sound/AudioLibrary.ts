

module Kiwi.Sound {


    // Class
    export class AudioLibrary {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {Kiwi.AudioLibrary}
        */
        constructor(game: Kiwi.Game) {

            this._game = game;
            this.audio = {};
        }

        public objType(): string {
            return "AudioLibrary";
        }

        /*
        * 
        * @property _game
        * @type Kiwi.Game
        */
        private _game: Kiwi.Game;

        /*
        * Contains all of the audios that are available.
        * @property textures
        */
        public audio;

        /*
        * Resets the audio library.
        * @method clear
        */
        public clear() {
            for (var prop in this.audio) {
                delete this.audio[prop];
            }
        }

        /*
        * Adds a new audio file to the audio library.
        * @method add
        * @param {Kiwi.File} imageFile
        */
        public add(audioFile: Kiwi.Files.File) {

            switch (audioFile.dataType) {
                case Kiwi.Files.File.AUDIO:
                    this.audio[audioFile.key] = audioFile;
                    break;
               
                default:
                    klog.error("Audio file is of unknown type and was not added to audio library");
                    break;
            }

        }

       
    }

}

