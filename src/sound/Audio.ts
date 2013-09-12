/**
* Kiwi - Sound
* @module Kiwi
* @submodule Sound
* 
*/ 

module Kiwi.Sound {

    /**
    *
    *
    * @class Audio
    *
    */
    export class Audio {

        /*
        *
        * @constructor
        * @param {Kiwi.Game}
        * @param {string} key
        * @param {number} volume - A number between 0 (silence) and 1 (loud).
        * @param {boolean} loop 
        */
        constructor(game: Kiwi.Game, key: string, volume: number, loop: boolean) {
            
            this._game = game;

            this._usingAudioTag = this._game.audio.usingAudioTag;
            this._usingWebAudio = this._game.audio.usingWebAudio; 

            if (this._game.audio.noAudio) return;

            if (!this._setAudio(key)) return;

            if (this._usingWebAudio) {
                this.context = this._game.audio.context;
                this.masterGainNode = this._game.audio.masterGain;

                //create our gain node
                if (this.context.createGain === 'undefined') {
                    this.gainNode = this.context.createGainNode();
                } else {
                    this.gainNode = this.context.createGain();
                }
                
                //make sure the audio is decoded.
                this._decode();

                this.gainNode.gain.value = volume * this._game.audio.volume;      //this may need to change.....
                this.gainNode.connect(this.masterGainNode); 
            } else if (this._usingAudioTag) {

                this.totalDuration = this._sound.duration;
                this._sound.volume = volume * this._game.audio.volume;

                if (isNaN(this.totalDuration)) this._pending = true;    //this should never need to happen once we get the loading clear.
            }

            this.duration = 0;
            this.volume = volume;
            this._muteVolume = volume;
            this._loop = loop;

            //add the default marker
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

        public objType() {
            return "Audio";
        }

        /*
        * The game that this sound belongs to.
        * @private
        */
        private _game: Kiwi.Game;

        /*
        * Web Audio API ONLY - A reference to the audio context that the game's audio manager has.
        * @public
        */
        public context: any;
        
        /*
        * Web Audio API ONLY - A reference to the master gain node on the audio manager.
        * @public
        */
        public masterGainNode: any;

        /*
        * Web Audio API ONLY - This sounds local gainNode that it uses.
        * @public
        */
        public gainNode: any;

        /*
        * A boolean indicating weither or not that audio tags are being used to generate sounds.
        * @private
        */
        private _usingAudioTag: boolean;

        /*
        * A boolean indicating weither or not the webAuduio api is being used. 
        * @private
        */
        private _usingWebAudio: boolean;

        /*
        * A private indicator of weither this audio is currently muted or not.
        * @private
        */
        private _muted: boolean = false;  
        
        /*
        * A number between 0 and 1 representing the current volume of this audio piece. 
        * @private
        */
        private _volume: number;  
        
        /*
        * A boolean indicating weither this piece of audio should loop or not.
        * @private
        */
        private _loop: boolean;

        /*
        * The key that was used to get th  audio i formation.
        * @public
        */
        public key: string;
        
        /*
        * The property containing the file information about the audio.
        * @private
        */
        private _file: Kiwi.Files.File;
        private _sound: any;

        /*
        * A boolean that controls/knows if the audio is ready to be played or not.
        * This is just an indicator of if the file has been retrieved successfully from the file store or not.
        * @public
        */
        public ready: boolean;

        /*
        * The total duration of the audio in seconds
        * @public
        */
        public totalDuration: number = 0;
        
        /*
        * The current duration of the section of audio that is being played. In milliseconds
        * @public
        */
        public duration: number;
        
        /*
        * Web Audio API ONLY - The audio buffer that is to be used when playing audio segments.
        * @private
        */
        private _buffer = null;

        /*
        * Web Audio API ONLY - A boolean to indicate if the audio has been decoded or not yet. If not you will need to run the decode() method.
        * @private
        */
        private _decoded: boolean = false;

        /*
        * A private property that holds the volume before the sound was muted. Used so that when unmuted the sound will resume at its old spot.
        * @private
        */
        private _muteVolume: number;

        /*
        * Indicates weither or not the sound is currently playing.
        * @public
        */
        public isPlaying: boolean;

        /*
        * A indicator of if the sound is currently paused.
        * @public
        */
        public paused: boolean;

        /*
        * If the sound needs to be played but is waiting on something.
        * @private 
        */
        private _pending: boolean;

        /*
        * When the audio started playing. In milliseconds
        * @private 
        */
        private _startTime: number;

        /*
        * When the audio is playing, this is the current time we are at with it playing. In milliseconds
        * @private.
        */
        private _currentTime: number;

        /*
        * The time at which the audio should stop playing. In milliseconds. This is assuming that the audio is not on loop.
        * @private
        */
        private _stopTime: number;

        /*
        * An array of all of the markers that are on this piece of audio. 
        * @private
        */
        private _markers: any = [];

        /*
        * The current marker that is being used.
        * @private
        */
        private _currentMarker: string = 'default';


        /*
        * Tonnes of signals
        */
        public onPlay: Kiwi.Signal;
        public onStop: Kiwi.Signal;
        public onPause: Kiwi.Signal;
        public onResume: Kiwi.Signal;
        public onLoop: Kiwi.Signal;
        public onMute: Kiwi.Signal;

        /*
        * Retrieves the audio data from the file store.
        * 
        * @method _setAudio
        * @param {string} key
        * @return {boolean}
        */
        private _setAudio(key: string): boolean {
            if (key == '' || this._game.fileStore.exists(key) === false)
            {
                this.ready = false;
                return;
            }

            this.key = key;
            this._file = this._game.fileStore.getFile(key);
            this._sound = this._file.data;
            this.ready = true;

            return true;
        } 

        /*
        * Decodes the audio data to make it playable. By default the audio should already have been decoded when it was loaded.
        * 
        * @method _decode
        */
        private _decode() {
            
            //you only decode when using the web audio api
            if (this._usingAudioTag || this._file.data.decode == false) return;

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
        
        /*
        * Used to set the current volume for this sound if a parameter has been passed. Otherwise returns the volume.
        *
        * @method volume
        * @param {number} val
        * @return {number}
        */
        public set volume(val: number) {

            if (this._game.audio.noAudio) return;

            if (val !== undefined) {

                val = Kiwi.Utils.GameMath.clamp(val, 1, 0);

                this._volume = val;

                if (this._muted) {
                    this._muteVolume = this._volume;
                }

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

        /*
        * Allows you to mute the sound.
        *
        * @method muted
        * @param {boolean} val
        * @return {boolean}
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

        /*
        * Adds a new marker to the audio which will then allow for that section of audio to be played.
        * 
        * @method addMarker
        * @param {string} name
        * @param {number} start - The starting point of the audio. In seconds.
        * @param {number} stop - The stopping point of the audio. In seconds.
        * @param {boolean} loop
        */
        public addMarker(name: string, start: number, stop: number, loop: boolean = false) {
            this._markers[name] = { start: start, stop: stop, duration: stop - start, loop: loop };
        }

        /*
        * Removes a currently existing marker from this audio.
        *
        * @method removeMarker
        */
        public removeMarker(name: string) {
            if (name === 'default') return; //cannot delete the default

            if (this.isPlaying && this._currentMarker == name) {
                this.stop();    
                this._currentMarker = 'default';
            }
            delete this._markers[name];
        }


        /*
        * Plays the current sound/audio from the start.
        *
        * @method play
        * @param {string} marker - the marker that is to be played.
        * @param {boolean} forceRestart - force the audio to stop and start again.
        */
        public play(marker: string= this._currentMarker, forceRestart: boolean = false) {
            
            if (this.isPlaying && forceRestart == false || this._game.audio.noAudio) return;

            if (forceRestart) this.stop();
            
            this.paused = false;

            if (this._markers[marker] == undefined) return;

            if(this._currentMarker === marker && this.isPlaying) return;

            this._currentMarker = marker;
            this.duration = this._markers[this._currentMarker].duration * 1000;
            this._loop = this._markers[this._currentMarker].loop;

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

            } else if(this._usingAudioTag) {
                
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
 
            }
        }

        /*
        * Stop the sound from playing.
        *
        * @method stop
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
                
                if(this.paused == false) this.onStop.dispatch();
            }

            this.isPlaying = false;
        }
        
        /*
        * Pauses the sound so that you can resume it from at point to paused it at.
        *
        * @method pause
        */
        public pause() {
            if (this.isPlaying) {
                this.paused = true;
                this.stop();
                this.onPause.dispatch();
            }
        }
        
        /*
        * Plays the sound from when you paused the sound.
        *
        * @method resume
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
        
        /*
        * Le Update Loop
        */
        public update() {
            //Check to see that the audio is ready
            if (!this.ready) return;


            //Is the audio ready to be played and was waiting?
            if (this._pending) {
                if (this._decoded === true || this._file.data.decoded) {
                    this._pending = false;
                    this.play();
                } else if (this._usingAudioTag && !isNaN(this._sound.duration)) {
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
        
        /*
        * This method handles the destruction of all of the properties when the audio is no longer needed.
        * 
        * @method destroy
        */
        public destroy() {
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