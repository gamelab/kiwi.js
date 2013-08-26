
module Kiwi.Components {

    export class Sound extends Component {

        /*
        *
        * @constructor
        * @param {Kiwi.Game} game
        * @return Kiwi.Components.Sound
        */
        constructor(game: Kiwi.Game) {

            super('Sound');

            this._game = game;
            this._audio = [];
        }

        /*
        * The game that this sound component is on.
        * @private
        */
        private _game: Kiwi.Game;

        /*
        * An array of all of the sound components that are on this component.
        * @private
        */
        private _audio: Kiwi.Sound.Audio[];

        /*
        * Creates a new audio segment with the name given.
        *
        * @method addSound
        * @param {string} name
        * @param {string} key
        * @param {number} volume
        * @param {bool} loop
        * @return {Kiwi.Sound.Audio} 
        */
        public addSound(name: string, key: string, volume: number, loop: bool): Kiwi.Sound.Audio {

            if (this._validate(name) == true) return;

            var audio = this._game.audio.add(key, volume, loop);
            this._audio[name] = audio;

            return audio;
        }

        /*
        * Removes the audio sementment with the name you have given.
        *
        * @method removeSound
        * @param {string} name
        */
        public removeSound(name: string) {

            if (this._validate(name) == false) return;

            this._audio[name].stop();
            this._audio[name].destroy();
            delete this._audio[name];

        }

        /*
        * Returns the audio for the sound that you pass...
        *
        * @method getSound
        * @param {string} name
        * @return {Kiwi.Sound.Audio}
        */
        public getSound(name: string): Kiwi.Sound.Audio {
            if (this._validate(name) == false) return;

            return this._audio[name];
        }

        /*
        * This method is used to check to see if an audio segment with the name you specify is on this component.
        * 
        * @method _validate
        * @param {string} name
        * @return {bool}
        */
        
        private _validate(name:string) {
            if (this._audio[name] === undefined) {
                return false;
            } else {
                return true;
            }
        }

        /*
        * Plays the audio that you specify.
        * 
        * @method play
        * @param {string} name
        */
        public play(name:string) {

            if (this._validate(name) == false) return;
            
            this._audio[name].play();

        }

        /*
        * Stops the audio that you specify.
        * 
        * @method play
        * @param {string} name
        */
        public stop(name:string) {
            
            if (this._validate(name) == false) return;

            this._audio[name].stop();

        }
        
        /*
        * Pauses the audio that you specify.
        * 
        * @method play
        * @param {string} name
        */
        public pause(name: string) {
            if (this._validate(name) == false) return;

            this._audio[name].pause();
        }

        /*
        * Resumes the audio that you specify. Used after you pause.
        * 
        * @method play
        * @param {string} name
        */
        public resume(name: string) {
            
            if (this._validate(name) == false) return;

            this._audio[name].resume();
        }

    }

}