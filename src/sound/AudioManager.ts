
module Kiwi.Sound {

    export class AudioManager {

        /*
        *
        * @constructor
        * @param {Kiwi.Game} game
        */
        constructor(game: Kiwi.Game) {
            
            this._game = game;

        }

        /*
        * The game that this manager belongs to.
        * @property _game
        */
        private _game: Kiwi.Game;
        
        /*
        * The global volume of all of the games audio.
        * @property _volume
        */
        private _volume: number;

        /*
        * A boolean that controls weither the whole games audio should be muted or not.
        * @property _muted
        */
        private _muted: bool;

        /*
        * An array containing all of the sounds on the game.
        * @property _sounds
        */
        private _sounds: any;
        
        /*
        * The number of channels that are supported.
        * Not in much use at this point in time.
        * @property channels
        */
        public channels: number;

        /*
        * If the current game has audio support or not.
        * @property noAudio
        */
        public noAudio: bool = false;

        /*
        * If the game is currently using the Web Audio API for the sound.
        * @property usingWebAudio
        */
        public usingWebAudio: bool = false;

        /*
        * If the game is using audio tags for the sound. This is the fallback if the web audio api is not supported. 
        * @property usingAudioTag
        */
        public usingAudioTag: bool = false;

        /*
        * Web Audio API ONLY - The audio context that is used for decoding audio, e.t.c. 
        * @property context
        */
        public context: any = null;

        /*
        * Web Audio API ONLY - The master gain node through which all sounds play.
        * @property masterGain
        */
        public masterGain: any = null;

        /*
        * The volume of the audio before it was muted. This is used so that when the audio is unmuted the volume will resume at this point.
        * @property _muteVolume
        */
        private _muteVolume: number;
        
        /*
        * Web Audio API ONLY - Indicators weither or not the sound (once downloaded) should be decoded right away. If true this happens during the loading stage.
        * True = longer loading times (especally for large audio files), but instant audio playback when the game has loaded.
        * False = shorter loading times (only waits for the file and doesn't decode), but may have no audio in game while while it decodes.
        */
        public predecode: bool = true;

        /*
        * The boot manager.
        *
        * @method boot
        */
        boot() {

            this._volume = 1;
            this._muted = false;
            this._sounds = [];

            //check to see if it is an iOS device and if it doesn't support webAudio
            if (Kiwi.DEVICE.iOS && Kiwi.DEVICE.webaudio == false) {
                this.channels = 1;
            }

            //check to see if the device is locked here...

            this.usingWebAudio = true;  //we hope for the best....
            this.usingAudioTag = false;

            if (!!window['AudioContext']) {//if audio context is supported
                this.context = new window['AudioContext']();
            }
            else if (!!window['webkitAudioContext']) {//if webkit audio context is supported
                this.context = new window['webkitAudioContext']();
            }
            else if (!!window['Audio']) {//no awesome audio support...so maybe the audio tags?
                this.usingWebAudio = false;
                this.usingAudioTag = true;
            }
            else {//they have no audio support........no sound for you :(
                this.usingWebAudio = false;
                this.noAudio = true; //prepared for the worst :(
            }

            if (this.context !== null) {

                if (this.context.createGain === undefined) {
                    this.masterGain = this.context.createGainNode();
                } else {
                    this.masterGain = this.context.createGain();
                }

                this.masterGain.gain.value = 1;
                this.masterGain.connect(this.context.destination);
            }

        }

        /*
        * Used to mute the audio on the device, or to check to see if the device is muted.
        *
        * @method mute
        * @param {bool} value
        * @return {bool}
        */
        public set mute(value: bool) {
            if (value === true) {
                if (this._muted) return;
                this._muted = true;

                //mute the sounds 
                if (this.usingWebAudio) {
                    this._muteVolume = this.masterGain.gain.value;
                    this.masterGain.gain.value = 0;

                } else if (this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].mute(true);
                    }
                }

            } else {
                if (this._muted == false) return;
                this._muted = false;

                if (this.usingWebAudio) {
                    this.masterGain.gain.value = this._muteVolume;

                } else if (this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].mute(false);
                    }
                }
            }
        }

        public get mute(): bool {
            return this._muted;
        }

        /*
        * Global setting and getting of the volume. A number between 0 (silence) and 1 (full volume)
        *
        * @method volume
        * @param {number} value
        * @return {number}
        */
        public set volume(value: number) {

            if (value !== undefined) {

                value = Kiwi.Utils.GameMath.clamp(value, 1, 0);
                this._volume = value;

                if (this._muted) {
                    this._muteVolume = this._volume;
                }

                if (this.usingWebAudio) {
                    this.masterGain.gain.value = value;

                } else if (this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        //for each sound tag to update.
                        this._sounds[i].volume(this._sounds[i].volume());
                    }
                }

            }
        }

        public get volume(): number {

            return this._volume;

        }

        /*
        * Used to create a new sound on the audio manager. Returns the newly created sound.
        * 
        * @method add
        * @param {string} cacheID
        * @param {Kiwi.Cache} cache
        * @param {number} volume
        * @param {bool} loop
        * @return {Kiwi.Sound.Audio}
        */
        public add( cacheID:string, cache: Kiwi.Cache, volume: number = 1, loop: bool = false): Kiwi.Sound.Audio {

            if (this.noAudio) return;

            var sound: Kiwi.Sound.Audio = new Kiwi.Sound.Audio(this._game, cacheID, cache, volume, loop);
            this._sounds.push(sound);
            return sound;

        }

        /*
        * Removes the passed sound from the audio manager. Needs testing.
        *
        * @method remove
        * @param { Kiwi.Sound.Audio} sound
        */
        public remove(sound: Kiwi.Sound.Audio) {
            //needs testing
            for (var i = 0; i < this._sounds.length; i++) {

                if (sound == this._sounds[i]) {
                    this._sounds[i].gainNode.disconnect();
                    this._sounds.splice(i, 1, 0);
                    i--;
                }

            }

        }
        
        /*
        * Plays all of the sounds listed in the audio manager.
        *
        * @method playAll
        */
        public playAll() {
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].play();
                }

            }
        }
    
        /*
        * Stops all of the sounds that are listed in the audio manager from playing.
        *
        * @method playAll
        */
        public stopAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].stop();
                }

            }

        }
    
        /*
        * Pauses all of the sounds listed in the audio manager.
        *
        * @method playAll
        */
        public pauseAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].pause();
                }

            }

        }
        
        /*
        * Resumes all of the sounds listed in the audio manager.
        *
        * @method playAll
        */
        public resumeAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].resume();
                }

            }

        }


        /*
        * Update Loop
        */
        update() {
            if (!this.noAudio) {
                for (var i = 0; i < this._sounds.length; i++) {
                    this._sounds[i].update();
                }
            }
        }

    }

}