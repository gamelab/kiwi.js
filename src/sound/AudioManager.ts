/**
* The namespace that holds all of the assets and functionality when dealing with Audio.
* 
* @module Kiwi
* @submodule Sound
* @main Sound 
* 
*/ 

module Kiwi.Sound {

    /**
    * Manages the initialisation of assets necessary when dealing with audio in the game, either through Audio Tags or the Web Audio API. Also provides global sound controls that will be applyed to all Audio objects at the same time. 
    * 
    * @class AudioManager
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this audio manager belongs to.
    * @return {AudioManager}
    */
    export class AudioManager {
         
        constructor(game: Kiwi.Game) {
            
            this._game = game;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "AudioManager";
        }

        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;
        
        /**
        * The global volume of all of the games audio.
        * @property _volume
        * @type number
        * @default 1
        * @private
        */
        private _volume: number;

        /**
        * A boolean that controls whether the whole games audio should be muted or not.
        * @property _muted
        * @type boolean
        * @default false
        * @private
        */
        private _muted: boolean;

        /**
        * An array containing all of the sounds on the game.
        * @property _sounds
        * @type Audio[]
        * @private
        */
        private _sounds: any;
        
        /**
        * The number of channels that are supported.
        * Not in much use at this point in time.
        * @property channels
        * @type number
        * @public
        */
        public channels: number;

        /**
        * If the current game has audio support or not.
        * @property noAudio
        * @type boolean
        * @public
        */
        public noAudio: boolean = false;

        /**
        * If the game is currently using the Web Audio API for the sound.
        * @property usingWebAudio
        * @type boolean
        * @public
        */
        public usingWebAudio: boolean = false;

        /**
        * If the game is using audio tags for the sound. This is the fallback if the web audio api is not supported. 
        * @property usingAudioTag
        * @type boolean
        * @public
        */
        public usingAudioTag: boolean = false;

        /**
        * Web Audio API ONLY - The audio context that is used for decoding audio, e.t.c. 
        * @property context
        * @type any
        * @public
        */
        public context: any = null;

        /**
        * Web Audio API ONLY - The master gain node through which all sounds play.
        * @property masterGain
        * @type any
        * @public
        */
        public masterGain: any = null;

        /**
        * The volume of the audio before it was muted. This is used so that when the audio is unmuted the volume will resume at this point.
        * @property _muteVolume
        * @type number
        * @private
        */
        private _muteVolume: number;
        
        /**
        * Indicates if the sounds is currently 'locked' or not. 
        * If it is 'locked' then no audio can play until a user touch's the device.  
        * @property _locked
        * @type boolean
        * @private
        */
        private _locked: boolean;
        private _unlockedSource: any = null;
        
        /**
        * Returns a boolean indicating whether the device has been touched or not. READ ONLY.
        * @property locked
        * @type boolean
        * @public
        */
        public get locked():boolean {
            return this._locked;
        }

        /**
        * The boot method is executed when all of the DOM elements needed for the game are loaded and the game is ready to 'start' up.
        *
        * @method boot
        * @public
        */
        public boot() {
            
            this._volume = 1;
            this._muted = false;
            this._sounds = [];

            //check to see if it is an iOS device and if it doesn't support webAudio
            if (Kiwi.DEVICE.iOS && Kiwi.DEVICE.webaudio == false) {
                this.channels = 1;
            }

            //add mouse event here to 'unlock' the device.
            if (Kiwi.DEVICE.iOS && this._game.deviceTargetOption !== Kiwi.TARGET_COCOON) {
                this._locked = true;
                this._game.input.onUp.addOnce(this._unlocked, this);
                
                console.log('Audio is currently Locked until at touch event.');
            } else {
                this._locked = false;
            }

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

        /**
        * Is executed when a mouse event is fired on the device. This is used to enabled playback of sounds on the current device if they were awaiting for a user event.
        * @method _unlocked
        * @private
        */
        private _unlocked() {
            console.log('Audio now Unlocked');

            if (this.usingAudioTag) {
                this._locked = false;
                for (var i = 0; i < this._sounds.length; i++) {
                    this._sounds[i].playable = true;
                }
            } else {
                // Create empty buffer and play it
                var buffer = this.context.createBuffer(1, 1, 22050);
                this._unlockedSource = this.context.createBufferSource();
                this._unlockedSource.buffer = buffer;
                this._unlockedSource.connect(this.context.destination);
                this._unlockedSource.noteOn(0);
            }
        }

        /**
        * Used to mute the audio on the device, or to check to see if the device is muted.
        *
        * @property mute
        * @type boolean
        * @default false
        * @public
        */
        public set mute(value: boolean) {
            
            if (value === true) {
                if (this._muted) return;
                this._muted = true;

                //mute the sounds 
                if (this.usingWebAudio) {
                    this._muteVolume = this.masterGain.gain.value;
                    this.masterGain.gain.value = 0;

                } else if (this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].mute = true;
                    }
                }

            } else {
                if (this._muted == false) return;
                this._muted = false;

                if (this.usingWebAudio) {
                    this.masterGain.gain.value = this._muteVolume;

                } else if (this.usingAudioTag) {
                    for (var i = 0; i < this._sounds.length; i++) {
                        this._sounds[i].mute = false;
                    }
                }
            }
        
        }

        public get mute(): boolean {
            return this._muted;
            
        }

        /**
        * Global setting and getting of the volume. A number between 0 (silence) and 1 (full volume)
        *
        * @property volume
        * @type number  
        * @default 1
        * @public
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
                        this._sounds[i].volume = this._sounds[i].volume;
                    }
                }

            }
        }
        public get volume(): number {

            return this._volume;

        }

        /**
        * Indicates whether or not an Audio Object is registered with this Audio Manager or not. More for Kiwi Internal use only.
        * @method isRegistered
        * @param sound {Audio} The Audio object you are checking for.
        * @return {Boolean} If the piece of audio is registered or not.
        * @public
        */
        public isRegistered(sound: Kiwi.Sound.Audio):boolean {
            if (this.noAudio) return; 

            if (this._sounds.indexOf(sound) !== -1) {
                return true;
            } else {
                return false;
            }
        }

        /**
        * Registers an Audio Object with this audio manager. Also assign's the audio piece a unique ID to identify it by. Internal Kiwi use only.
        * @method registerSound
        * @param sound {Audio} The audio piece you are wanting to register. 
        * @return {Boolean } Indication of if the sound was successfully added or not.
        * @public
        */
        public registerSound(sound:Kiwi.Sound.Audio):boolean {
            if (this.isRegistered(sound) === false) {
                sound.id = this._game.rnd.uuid();
                this._sounds.push(sound);
                return true;
            }
            return false;
        }

        /**
        * Used to create a new sound on the audio manager. Returns the newly created sound.
        * 
        * @method add
        * @param key {string} The key for the audio file that is to be loaded from the AudioLibrary.
        * @param [volume=1] {number} The volume for the piece of audio.
        * @param [loop=false] {boolean} If the audio should keep repeat when it gets to the end.
        * @return {Audio}
        * @public
        */
        public add(key: string, volume: number = 1, loop: boolean = false): Kiwi.Sound.Audio {//rename to create
            
            if (this.noAudio) return;

            var sound: Kiwi.Sound.Audio = new Kiwi.Sound.Audio(this._game, key, volume, loop);
            return sound;
        
        }

        /**
        * Removes the passed sound from the audio manager. Needs testing.
        *
        * @method remove
        * @param sound {Audio} The audio file that you want to remove.
        * @public
        */
        public remove(sound: Kiwi.Sound.Audio, destroy:boolean=true) {
            //needs testing
            for (var i = 0; i < this._sounds.length; i++) {

                if (sound.id == this._sounds[i].id) {
                    if(this.usingWebAudio) this._sounds[i].gainNode.disconnect();
                    if (destroy == true) this._sounds[i].destroy();
                    this._sounds.splice(i, 1, 0);
                    i--;
                }

            }

        }
        
        /**
        * Plays all of the sounds listed in the audio manager.
        *
        * @method playAll
        * @public
        */
        public playAll() {
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].play();
                }

            }
        }
    
        /**
        * Stops all of the sounds that are listed in the audio manager from playing.
        *
        * @method playAll
        * @public
        */
        public stopAll() {
            
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].stop();
                }

            }
        
        }
    
        /**
        * Pauses all of the sounds listed in the audio manager.
        *
        * @method pauseAll
        * @public
        */
        public pauseAll() {
            
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].pause();
                }

            }
            
        
        }
        
        /**
        * Resumes all of the sounds listed in the audio manager. 
        *
        * @method resumeAll
        * @param [destroy=true] {boolean} If the audio objects should be destroyed when they are removed.
        * @public
        */
        public resumeAll(destroy:boolean=true) {
            
            for (var i = 0; i < this._sounds.length; i++) {

                if (this._sounds[i]) {
                    this._sounds[i].resume();
                }

            }
        

        }

        /**
        * The update loop that is executed every frame.
        * @method update
        * @public
        */
        public update() {
            
            if (this._locked) {

                if (this.usingWebAudio && this._unlockedSource !== null) {
                    if ((this._unlockedSource.playbackState === this._unlockedSource.PLAYING_STATE || this._unlockedSource.playbackState === this._unlockedSource.FINISHED_STATE))
                    {
                        this._locked = false;
                        this._unlockedSource = null;
                        for (var i = 0; i < this._sounds.length; i++) {
                            this._sounds[i].playable = true;
                        }
                    }
                }

            }
            
            if (!this.noAudio) {
                for (var i = 0; i < this._sounds.length; i++) {
                    this._sounds[i].update();
                }
            }

            
        
        }

    }

}