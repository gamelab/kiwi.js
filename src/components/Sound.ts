/**
* 
* @module Kiwi
* @submodule Components 
* 
*/ 

module Kiwi.Components {
    
    /**
    * The Sound Component is a class to assist with the creation and management of multiple pieces of audio that may exist on a single Entity. This class is NOT needed when dealing with audio but is instead provided to assist in dealing with audio.
    * 
    * @class Sound
    * @extends Component
    * @namespace Kiwi.Components
    * @constructor
    * @param parent {Any} Who the sound component belongs to.
    * @return {Sound}
    */
    export class Sound extends Component {
 
        constructor(parent) {

            super(parent, 'Sound');

            this._audio = [];
        }

        /**
        * Returns the type of object that this is.
        * @method objType 
        * @return {String}
        * @public
        */
        public objType():string {
            return 'Sound';
        }

        /**
        * Contains a list of all of the Audio objects that are on this component.
        * @private
        * @type Audio[]
        * @private
        */
        private _audio: Kiwi.Sound.Audio[];

        /**
        * Creates a new audio segment on this component.
        *
        * @method addSound
        * @param name {string} The name for this audio file. This is how you will access the audio from this component and so it should be unique.
        * @param key {string} The piece of audio that you want to use. 
        * @param [volume=1] {number} The volume that the audio should be set to.
        * @param [loop=false] {boolean} If the audio should keep play again when it finishes playing.
        * @return {Audio}
        * @public 
        */
        public addSound(name: string, key: string, volume: number=1, loop: boolean=false): Kiwi.Sound.Audio {

            if (this._validate(name) == true) return;

            var audio = this.game.audio.add(key, volume, loop);
            this._audio[name] = audio;

            return audio;
        }

        /**
        * Removes the audio sementment with the name you have given.
        *
        * @method removeSound
        * @param name {string} The piece of audio you would like to remove.
        * @public
        */
        public removeSound(name: string) {

            if (this._validate(name) == false) return;

            this._audio[name].stop();
            this._audio[name].destroy();
            delete this._audio[name];

        }

        /**
        * Returns the Audio object for the sound that you pass. 
        *
        * @method getSound
        * @param name {string} The piece of audio you would like to grab.
        * @return {Audio}
        * @public
        */
        public getSound(name: string): Kiwi.Sound.Audio {
            if (this._validate(name) == false) return;

            return this._audio[name];
        }

        /*
        * This method is used to check to see if an audio segment with the name that is specified is on this component.
        * 
        * @method _validate
        * @param name {string} The name of the audio segment you want to check exists.
        * @return {boolean}
        * @private
        */
        
        private _validate(name:string) {
            if (this._audio[name] === undefined) {
                return false;
            } else {
                return true;
            }
        }

        /**
        * Plays the audio that you specify.
        * 
        * @method play
        * @param name {string} The name of the audio file you would like to play.
        * @public
        */
        public play(name:string) {

            if (this._validate(name) == false) return;
            
            this._audio[name].play();

        }

        /**
        * Stops the audio that you specify from playing.
        * 
        * @method play
        * @param name {string} Name of the audio file you would like to stop.
        * @public
        */
        public stop(name:string) {
            
            if (this._validate(name) == false) return;

            this._audio[name].stop();

        }
        
        /**
        * Pauses the audio that you specify. 
        * 
        * @method play
        * @param name {string} The name of the audio you would like to pause.
        * @public
        */
        public pause(name: string) {
            if (this._validate(name) == false) return;

            this._audio[name].pause();
        }

        /**
        * Resumes the audio that you specify. Note: Audio can only resume if it was paused initially.
        * 
        * @method play
        * @param name {string} The name of the audio you would like to resume.
        * @public
        */
        public resume(name: string) {
            
            if (this._validate(name) == false) return;

            this._audio[name].resume();
        }

        /**
        * Destroys this AudioComponent and all of the Audio objects it has.
        * @method destroy
        * @public
        */
        public destroy() {
            super.destroy();
            for (var key in this._audio) {
                this._audio[key].stop();
                this._audio[key].destroy();
                delete this._audio[key];
            }
            delete this._audio;
        }

    }

}