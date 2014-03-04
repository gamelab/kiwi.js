/**
* 
* @module Kiwi
* @submodule Sound
* 
*/ 

module Kiwi.Sound {

    /**
    * A Object that contains the functionality needed when wanting to play a single sound/sound file on a game.
    *
    * @class Audio
    * @constructor
    * @namespace Kiwi.Sound
    * @param game {Game} The game that this piece of audio belongs to.
    * @param key {string} The key to which which piece of audio should be loaded from the AudioLibrary.
    * @param volume {number} A number between 0 (silence) and 1 (loud).
    * @param loop {boolean} If the audio should loop when it is finished or just stop.
    * @return {Audio} This object
    *
    */
    export class Audio {
        
        constructor(game: Kiwi.Game, key: string, volume: number, loop: boolean) {

            this.ready = false;
            this._game = game;
            this._game.audio.registerSound(this);

            this._usingAudioTag = this._game.audio.usingAudioTag;
            this._usingWebAudio = this._game.audio.usingWebAudio;

            this._playable = (this._game.audio.locked == true) ? false : true;

            this.duration = 0;
            this._volume = volume;
            this._muteVolume = volume;
            this._muted = this._game.audio.mute;
            this._loop = loop;
            this.key = key;

            //If audio isn't supported OR the file does not exist
            if (this._game.audio.noAudio || this._game.fileStore.exists(this.key) === false) {
                if(this._game.debugOption) console.log('Could not play Audio. Either the browser doesn\'t support audio or the Audio file was not found on the filestore');
                return;
            }

            //Setup the Web AUDIO API Sound
            if (this._usingWebAudio) {
                this._setAudio();

                if (this.ready) {
                    this.context = this._game.audio.context;
                    this.masterGainNode = this._game.audio.masterGain;

                    //create our gain node
                    if (typeof this.context.createGain === 'undefined') {
                        this.gainNode = this.context.createGainNode();
                    } else {
                        this.gainNode = this.context.createGain();
                    }

                    //make sure the audio is decoded.
                    this._decode();

                    this.gainNode.gain.value = this.volume * this._game.audio.volume;      //this may need to change.....
                    this.gainNode.connect(this.masterGainNode);
                }

            //Set-up the Audio Tag Sound
            } else if (this._usingAudioTag) {

                if (this._playable === true) {
                    this._setAudio();

                    if (this.ready) {

                        this.totalDuration = this._sound.duration;
                        this._sound.volume = this.volume * this._game.audio.volume;

                        if (isNaN(this.totalDuration) || this.totalDuration == 0) this._pending = true;
                    }    
                }

            }

            this.addMarker('default', 0, this.totalDuration, this._loop);
            this._currentMarker = 'default';

            //tonnes of signals to go here.
            this.onPlay = new Kiwi.Signal();
            this.onStop = new Kiwi.Signal();
            this.onPause = new Kiwi.Signal();
            this.onResume = new Kiwi.Signal();
            this.onLoop = new Kiwi.Signal();
            this.onMute = new Kiwi.Signal();

        }
        
        /**
        * A unique ID that this audio gets assigned by the audio manager it belongs to when it is created.
        * @property id
        * @type number
        */
        public id: string;

        /**
        * A flag that indicates whether the sound is ready to be played or not. If not then this indicates that we are awaiting a user event.
        * @property _playable
        * @type boolean
        * @private
        */
        private _playable: boolean;

        /**
        * 
        * @property playable
        * @type boolean
        * @private
        */
        public get playable():boolean {
            return this._playable;
        }
        public set playable(val: boolean) {

            if (this._playable !== true && val == true) {

                this._playable = val;
                this._setAudio();

                if (this.ready && this._usingAudioTag) {
                    this.totalDuration = this._sound.duration;
                    this._sound.volume = this.volume * this._game.audio.volume;

                }
            }
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Audio";
        }

        /**
        * The game that this sound belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * Web Audio API ONLY - A reference to the audio context that the game's audio manager has.
        * @property context
        * @type Any
        * @public
        */
        public context: any;
        
        /**
        * Web Audio API ONLY - A reference to the master gain node on the audio manager.
        * @property masterGainNode
        * @type Any
        * @public
        */
        public masterGainNode: any;

        /**
        * Web Audio API ONLY - This sounds local gainNode that it uses.
        * @property gainNode
        * @type Any
        * @public
        */
        public gainNode: any;

        /**
        * A boolean indicating whether or not that audio tags are being used to generate sounds.
        * @property _usingAudioTag
        * @type boolean
        * @private
        */
        private _usingAudioTag: boolean;

        /**
        * A boolean indicating whether or not the webAuduio api is being used. 
        * @property _usingWebAudio
        * @type boolean
        * @private
        */
        private _usingWebAudio: boolean;

        /**
        * A private indicator of whether this audio is currently muted or not.
        * @property _muted
        * @type boolean
        * @default false
        * @private
        */
        private _muted: boolean = false;  
        
        /**
        * A number between 0 and 1 representing the current volume of this audio piece. 
        * @property _volume
        * @type number
        * @default 1
        * @private
        */
        private _volume: number;  
        
        /**
        * A boolean indicating whether this piece of audio should loop or not.
        * @property _loop
        * @type boolean
        * @private
        */
        private _loop: boolean;

        /**
        * The key that was used to get the audio from the AudioLibrary.
        * @property key
        * @type string
        * @public
        */
        public key: string;
        
        /**
        * The property containing the file information about the audio.
        * @property _file
        * @type File
        * @private
        */
        private _file: Kiwi.Files.File;
        
        /**
        * This is the piece of audio that either method will use to play audio. E.g.
        * In the case of the Web Audio API this is the sound buffer source, in which the audio plays from. 
        * In the case of Audio Tags this is the Audio Tag itself.
        * @property _sound
        * @type Any
        * @private
        */
        private _sound: any;

        /**
        * A boolean that controls/knows if the audio is ready to be played or not.
        * This is just an indicator of if the file has been retrieved successfully from the file store or not.
        * @property ready
        * @type boolean
        * @public
        */
        public ready: boolean;

        /**
        * The total duration of the audio in seconds.
        * @property totalDuration
        * @type number
        * @public
        */
        public totalDuration: number = 0;
        
        /**
        * The current duration of the section of audio that is being played. In milliseconds.
        * @property duration
        * @type number
        * @public
        */
        public duration: number;
        
        /**
        * Web Audio API ONLY - The audio buffer that is to be used when playing audio segments.
        * @property _buffer
        * @type any
        * @private
        */
        private _buffer:any = null;

        /**
        * Web Audio API ONLY - A boolean to indicate if the audio has been decoded or not yet. If not you will need to run the decode() method.
        * @property _decoded
        * @type boolean
        * @default false
        * @private
        */
        private _decoded: boolean = false;

        /**
        * A private property that holds the volume before the sound was muted. Used so that when unmuted the sound will resume at its old spot.
        * @property _muteVolume
        * @type number
        * @private
        */
        private _muteVolume: number;

        /**
        * Indicates whether or not the sound is currently playing.
        * @property isPlaying
        * @type boolean
        * @default false
        * @public
        */
        public isPlaying: boolean;

        /**
        * A indicator of if the sound is currently paused.
        * @property paused
        * @type boolean
        * @default false
        * @public
        */
        public paused: boolean;

        /**
        * If the sound needs to be played but is waiting on something.
        * @property _pending
        * @type boolean
        * @private 
        */
        private _pending: boolean;

        /**
        * When the audio started playing. In milliseconds
        * @property _startTime
        * @type number
        * @private 
        */
        private _startTime: number;

        /**
        * When the audio is playing, this is the current time we are at with it playing. In milliseconds
        * @property _currentTime
        * @type number
        * @private.
        */
        private _currentTime: number;

        /**
        * The time at which the audio should stop playing. In milliseconds. This is assuming that the audio is not on loop.
        * @property _stopTime
        * @type number
        * @private
        */
        private _stopTime: number;

        /**
        * An array of all of the markers that are on this piece of audio. 
        * @property _markers
        * @type Array
        * @private
        */
        private _markers: any = [];

        /**
        * The current marker that is being used.
        * @property _currentMarker
        * @type String
        * @default 'default'
        * @private
        */
        private _currentMarker: string = 'default';

        /**
        * A Kiwi Signal that dispatches a event when the audio starts playing.
        * @property onPlay
        * @type Signal
        * @public
        */
        public onPlay: Kiwi.Signal;

        /**
        * A Kiwi Signal that dispatches a event when the audio stops playing.
        * @property onStop
        * @type Signal
        * @public
        */
        public onStop: Kiwi.Signal;
        
        /**
        * A Kiwi Signal that dispatches a event when the audio gets paused.
        * @property onPause
        * @type Signal
        * @public
        */
        public onPause: Kiwi.Signal;
        
        /**
        * A Kiwi Signal that dispatches a event when the audio resumes.
        * @property onResume
        * @type Signal
        * @public
        */
        public onResume: Kiwi.Signal;
        
        /**
        * A Kiwi Signal that dispatches a event when the audio finishes and starts again, due to it looping.
        * @property onLoop
        * @type Signal
        * @public
        */
        public onLoop: Kiwi.Signal;
        
        /**
        * A Kiwi Signal that dispatches a event when the audio gets muted.
        * @property onMute
        * @type Signal
        * @public
        */
        public onMute: Kiwi.Signal;

        /**
        * Retrieves the audio data from the file store.
        * @method _setAudio
        * @private
        */
        private _setAudio() {
            
            this._file = this._game.fileStore.getFile(this.key);
            
            //Does the data actually exist?
            if (typeof this._file.data == "undefined") return;

            //force the browser to play it at least for a little bit
            if (this._usingAudioTag) {
                //clone the audio node
                this._sound = this._file.data.cloneNode(true);
                this._sound.play();
                this._sound.pause();

            } else {
                this._sound = this._file.data;
            }
            
            this.ready = true;

        } 

        /**
        * Decodes the audio data to make it playable. By default the audio should already have been decoded when it was loaded.
        * 
        * @method _decode
        * @private
        */
        private _decode() {
            //You only decode when using the web audio api, when the audio has loaded and if it hasn't been decoded already
            if (this.ready == false || this._usingAudioTag) return;

            //has the 
            if (this._file.data.decoded === true && this._file.data.buffer !== null) {
                this._buffer = this._file.data.buffer;
                this._decoded = true;
                return;
            }

            var that = this;
            this.context.decodeAudioData(this._file.data.raw, function (buffer) {
                that._buffer = buffer;
                that._decoded = true;
            });

        }
        
        /**
        * Used to control the current volume for this sound.
        *
        * @property volume
        * @type number
        * @public
        */
        public set volume(val: number) {

            if (this._game.audio.noAudio || this.ready === false) return;

            val = Kiwi.Utils.GameMath.clamp(val, 1, 0);

            this._volume = val;

            if (this._muted) {
                this._muteVolume = this._volume;
            }

            if (this._playable) {
                if (this._usingWebAudio) {
                    this.gainNode.gain.value = this._volume * this._game.audio.volume;            //this may need to change....

                } else if (this._usingAudioTag) {
                    this._sound.volume = this._volume * this._game.audio.volume;
                    
                }
            }
        }
        public get volume(): number {

            return this._volume;

        }

        /**
        * Allows you to mute the sound.
        *
        * @property mute
        * @type boolean
        * @public
        */
        public set mute(val: boolean) {

            if (this._game.audio.noAudio) return;

            if (val !== undefined && this._muted !== val) {
                if (val === true) {
                    this._muteVolume = this._volume;
                    this.volume = 0;
                    this._muted = true;
                } else {
                    this._muted = false;
                    this.volume = this._muteVolume;
                }
                this.onMute.dispatch(this._muted);
            }
        }
        public get mute(): boolean {

            return this._muted;

        }

        /**
        * Adds a new marker to the audio which will then allow for that section of audio to be played.
        * 
        * @method addMarker
        * @param name {string} The name of the marker that you are adding.
        * @param start {number} The starting point of the audio. In seconds.
        * @param stop {number} The stopping point of the audio. In seconds.
        * @param [loop=false] {boolean} If the marker's pieve of audio should loop or not.
        * @public 
        */
        public addMarker(name: string, start: number, stop: number, loop: boolean = false) {
            this._markers[name] = { start: start, stop: stop, duration: stop - start, loop: loop };
        }

        /**
        * Removes a currently existing marker from this audio.
        *
        * @method removeMarker
        * @param name {String} name of the audio that you want to remove.
        * @public
        */
        public removeMarker(name: string) {
            if (name === 'default') return; //cannot delete the default

            if (this.isPlaying && this._currentMarker == name) {
                this.stop();    
                this._currentMarker = 'default';
            }
            delete this._markers[name];
        }


        /**
        * Plays the current sound/audio from the start.
        *
        * @method play
        * @param [marker] {string} The marker that is to be played. If no marker is specified then it will play the current marker (which would be the whole audio piece if no marker was ever added).
        * @param [forceRestart=false] {boolean} Force the audio to stop and start again. Otherwise if the audio was already playing it would ignore the play.
        * @public
        */
        public play(marker: string= this._currentMarker, forceRestart: boolean = false) {

            if (this.isPlaying && forceRestart == false || this._game.audio.noAudio) return;

            if (forceRestart === true && this._pending === false) this.stop();

            if (typeof this._markers[marker] == "undefined") return;

            //If its the current marker that is playing and shouldn't force restart then stop
            if(this._currentMarker === marker && this.isPlaying && forceRestart == false) return;
            
            this.paused = false;
            this._currentMarker = marker; 
            this.duration = this._markers[this._currentMarker].duration * 1000;
            this._loop = this._markers[this._currentMarker].loop;
            
            if (this._playable === false) {
                this._pending = true;
                return;
            }

            if (this._usingWebAudio) {
                if (this._decoded === true) {

                    if (this._buffer == null) this._buffer = this._file.data.buffer;

                    this._sound = this.context.createBufferSource();
                    this._sound.buffer = this._buffer;
                    this._sound.connect(this.gainNode);
                    this.totalDuration = this._sound.buffer.duration;

                    if (this.duration == 0) this.duration = this.totalDuration * 1000;

                    if (this._loop) this._sound.loop = true;

                    //start
                    if (this._sound.start === undefined) {
                        this._sound.noteGrainOn(0, this._markers[this._currentMarker].start, this.duration / 1000);
                    } else {
                        this._sound.start(0, this._markers[this._currentMarker].start, this.duration / 1000);
                    }
                    
                    this.isPlaying = true;
                    this._startTime = this._game.time.now();
                    this._currentTime = 0;
                    this._stopTime = this._startTime + this.duration;
                    this.onPlay.dispatch();

                } else {
                    this._pending = true;
                    this._decode();
                }

            } else if (this._usingAudioTag) {

                if (this._sound && this._sound.readyState == 4 || this._game.deviceTargetOption == Kiwi.TARGET_COCOON) {

                    if (this.duration == 0 || isNaN(this.duration)) this.duration = this.totalDuration * 1000;

                    if (this._muted) this._sound.volume = 0;
                    else this._sound.volume = this._volume;

                    this._sound.currentTime = this._markers[this._currentMarker].start;
                    this._sound.play();
                    this.isPlaying = true;
                    this._startTime = this._game.time.now();
                    this._currentTime = 0;
                    this._stopTime = this._startTime + this.duration;

                    if (!this.paused) this.onPlay.dispatch();
                } else {
                    this._pending = true;
                }
            }
        }

        /**
        * Stop the sound from playing.
        *
        * @method stop
        * @public
        */
        public stop() {

            if (this.isPlaying && this._sound) {
                if (this._usingWebAudio) {

                    if (this._sound.stop === undefined) {
                        this._sound.noteOff(0);
                    } else {
                        this._sound.stop(0);
                    }

                } else if (this._usingAudioTag) {
                    this._sound.pause();
                    this._sound.currentTime = 0;
                }
                
                this.isPlaying = false;

                if(this.paused == false) this.onStop.dispatch();
            }

        }
        
        /**
        * Pauses the sound so that you can resume it from at point to paused it at.
        *
        * @method pause
        * @public
        */
        public pause() {
            if (this.isPlaying) {
                this.paused = true;
                this.stop();
                this.onPause.dispatch();
            }
        }
        
        /**
        * Plays the sound from when you paused the sound.
        *
        * @method resume
        * @public
        */
        public resume() {

            if (this.paused && this.isPlaying == false) {
                if (this._usingWebAudio) {
                    
                    if (this._buffer == null) this._buffer = this._file.data.buffer;

                    this._sound = this.context.createBufferSource();
                    this._sound.buffer = this._buffer;
                    this._sound.connect(this.gainNode);
                    
                    if (this._sound.start === undefined) {
                        this._sound.noteGrainOn(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                    } else {
                        this._sound.start(0, this._markers[this._currentMarker].start + (this._currentTime / 1000), this.duration / 1000);
                    }

                } else {
                    this._sound.currentTime = this._markers[this._currentMarker].start + this._currentTime / 1000;
                    this._sound.play();
                }

                this.paused = false;
                this.isPlaying = true;
                this.onResume.dispatch();

            }

        }
        
        /**
        * The update loop that gets executed every frame. 
        * @method update
        * @public
        */
        public update() {
            //Check to see that the audio is ready
            if (!this.ready) return;

            //Is the audio ready to be played and was waiting?
            if (this._playable && this._pending) {


                //Is it the using the Web Audio API (can tell otherwise the audio would not be decoding otherwise) and it is now ready to be played?
                if (this._decoded === true || this._file.data && this._file.data.decoded) { //Most likely unneeded now due to the fact that audio is decoded at load.
                    this._pending = false;
                    this.play();

                //If we are using Audio tags and the audio is pending then that must be because we are waiting for the audio to load.
                    // Also the work around for CocoonJS
                } else if (this._usingAudioTag && !isNaN(this._sound.duration) || this._game.deviceTargetOption == Kiwi.TARGET_COCOON && this._sound.duration !== 0) {
                    this.totalDuration = this._sound.duration;
                    this._markers['default'].duration = this.totalDuration;
                    this._pending = false;      //again shouldn't need once audio tag loader works.

                    if(this.isPlaying && this._currentMarker == 'default') this.duration = this.totalDuration;
                }
            } 

            //if the audio is playing
            if (this.isPlaying) {

                this._currentTime = this._game.time.now() - this._startTime;
                
                if (this._currentTime >= this.duration) {
                    if (this._usingWebAudio) {

                        if (this._loop) {

                            if (this._currentMarker == 'default') {
                                this._currentTime = 0;
                                this._startTime = this._game.time.now();
                            } else {
                                this.play(this._currentMarker, true);
                            }

                            this.onLoop.dispatch();
                        } else {
                            this.stop();
                        }

                    } else if(this._usingAudioTag) {

                        if (this._loop) {

                            this.play(this._currentMarker, true);
                            this.onLoop.dispatch();
                        } else {
                            this.stop();
                        }

                    }
                }
            }

        }
        
        /**
        * This method handles the destruction of all of the properties when this audio is not longer needed. 
        * You call this method when you want this method to be removed on the next garbage collection cycle.
        *
        * @method destroy
        * @public
        */
        public destroy() {
            if (this._game) {
                this._game.audio.remove(this);
            }
            if (this.onLoop) this.onLoop.dispose();
            if (this.onStop) this.onStop.dispose();
            if (this.onPlay) this.onPlay.dispose();
            if (this.onMute) this.onMute.dispose();
            if (this.onPause) this.onPause.dispose();
            if (this.onResume) this.onResume.dispose();
            
            delete this.onLoop;
            delete this.onStop;
            delete this.onPause;
            delete this.onMute;
            delete this.onPlay;
            delete this.onResume;
            delete this._game;
            delete this._sound;
            delete this._currentTime;
            delete this._startTime;
            delete this._stopTime;
            delete this._pending;
            delete this.masterGainNode;
            delete this.gainNode;
            delete this.totalDuration;
            delete this.duration;
            delete this._file;
            delete this._buffer;
            delete this._decoded;
        }

    }

}