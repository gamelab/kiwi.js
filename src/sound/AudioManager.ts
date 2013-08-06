
module Kiwi.Sound {

    export class AudioManager {

        constructor(game: Kiwi.Game) {
            
            this._game = game;

        }

        private _game: Kiwi.Game;
        
        /*
        * The volume of all of the games audio.
        * 
        */
        private _volume: number;

        /*
        * A boolean that controls weither the whole games audio should be muted or not.
        *
        */
        private _muted: bool;

        /*
        * An array containing all of the sounds on the game.
        * 
        * @property _sounds
        */
        private _sounds: any;
        
        /*
        * The number of channels that are supported.
        */
        public channels: number;

        /*
        * If audio should be used or not.
        */
        public noAudio: bool = false;

        /*
        * Weither webAudio is to be used or not.
        */
        public usingWebAudio: bool = false;

        /*
        * Should I use the audio tag or not.
        */
        public usingAudioTag: bool = false;

        /*
        * The context when it comes to playing sound.
        */
        public context: any = null;

        /*
        * The master gain node through which all sounds play.
        */
        public masterGain: any = null;

        /*
        * The volumn before the device was muted.
        */
        private _muteVolume: number;
        
        /*
        * A boolean that says if the sound should be decoded automatically.
        */
        public predecode: bool = true;

        /*
        *
        * The boot manager.
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

            this.usingWebAudio = true;
            this.usingAudioTag = false;

            //return;

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
                this.noAudio = true;
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
        public mute(value?: bool):bool {
            if (value !== undefined) {
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

                    } else if(this.usingAudioTag) {
                        for (var i = 0; i < this._sounds.length; i++) {
                            this._sounds[i].mute(false);
                        }
                    }
                }
            }

            return this._muted;
        }

        /*
        * Global setting and getting of the volumn. A number between 0 (silence) and 1 (full volume)
        *
        * @method volume
        * @param {number} value
        * @return {number}
        */
        public volume(value?: number) {

            if (value !== undefined) {
                
                value = Kiwi.Utils.GameMath.clamp(value, 1, 0);
                this._volume = value;
                
                if (this.usingWebAudio) {
                    this.masterGain.gain.value = value;

                } else if(this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        //for each sound tag to update.
                        this._sounds[i].volume(this._sounds[i].volume());
                    }
                }

            }

            if (this.usingWebAudio) {
                return this.masterGain.gain.value;
            } else {
                return this._volume;
            }
        }

        public add( cacheID:string, cache: Kiwi.Cache, volume: number = 1, loop: bool = false): Kiwi.Sound.Audio {

            var sound: Kiwi.Sound.Audio = new Kiwi.Sound.Audio(this._game, cacheID, cache, volume, loop);
            this._sounds.push(sound);
            return sound;

        }

        public remove(sound: Kiwi.Sound.Audio) {
            //needs testing
            for (var i = 0; i < this._sounds.length; i++) {

                if (sound == this._sounds[i]) {
                    this._sounds[i].remove();
                    this._sounds.splice(i, 1, 0);
                    i--;
                }

            }

        }
        
        //management methods
        public playAll() {
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].play();
                }

            }
        }

        public stopAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].stop();
                }

            }

        }

        public pauseAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].pause();
                }

            }

        }

        public resumeAll() {

            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].resume();
                }

            }

        }


        /*
        * 
        * Update Loop
        */
        update() {

            for (var i = 0; i < this._sounds.length; i++) {
                this._sounds[i].update();
            }

        }

    }

}