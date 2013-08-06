
module Kiwi.Sound {

    export class Audio {

        constructor(game: Kiwi.Game, cacheID:string, cache: Kiwi.Cache, volume:number, loop:bool) {
            
            this._game = game;

            this._usingAudioTag = this._game.audio.usingAudioTag;
            this._usingWebAudio = this._game.audio.usingWebAudio; 

            if (!this._setAudio(cacheID, cache)) return;

            if (this._usingWebAudio) {
                console.log('Web Audio');

                //do stuff
                this.context = this._game.audio.context;
                this.masterGainNode = this._game.audio.masterGain;

                //create our gain node
                if (this.context.createGain === 'undefined') {
                    this.gainNode = this.context.createGainNode();
                } else {
                    this.gainNode = this.context.createGain();
                }
                
                //decode
                this._decode();

                //set volumn
                this.gainNode.gain.value = volume * this._game.audio.volume();
                this.gainNode.connect(this.masterGainNode); 
            } else {
                console.log('Audio');

                //do stuff
                this.totalDuration = this._sound.duration;
                this._sound.volume = volume * this._game.audio.volume();
            }

            this.duration = 0;
            this.volume(volume);
            this._muteVolume = volume;
            this.loop = loop;

            //tonnes of signals to go here.
        }

        private _game: Kiwi.Game;

        /*
        * Web Audio API controls.
        */
        public context: any;
        public masterGainNode: any;
        public gainNode: any;

        /*
        * If the sound is using the audioTag or the 
        */
        private _usingAudioTag: bool;
        private _usingWebAudio: bool;

        /*
        * The sound controls. They need to be updated.
        */
        private _muted: bool = false;  
        private _volume: number;  
        public loop: bool;

        /*
        * The cacheID of the audio
        */
        public cacheID: string;
        
        /*
        * The sound/file information
        */
        private _file: Kiwi.File;
        private _sound: any;

        /*
        * A boolean that controls/knows if the audio is ready to be played or not.
        */
        public ready: bool;

        /*
        * Audio Tag Specific variables.
        */
        public totalDuration: number;
        public duration: number;
        private _buffer = null;
        private _decoded: bool = false;

        /*
        * The volumn before the sound was muted.
        */
        private _muteVolume: number;

        /*
        * Controls if the sound is playing.
        */
        public isPlaying: bool;

        /*
        * If the sound is currently paused or not
        */
        public paused: bool;

        /*
        * If the sound needs to be played but is waiting on something.
        */
        private _pending: bool;

        /*
        * All of the time time stuff...
        */
        private _startTime: number;
        private _currentTime: number;
        private _stopTime: number;

        /*
        * Retrieves the audio data from the cache.
        * 
        * @method _setAudio
        * @param {string} cacheID
        * @param {Kiwi.Cache} cache
        */
        private _setAudio(cacheID: string, cache: Kiwi.Cache): boolean {
            if (cacheID == '' || cache === null || cache.audio === null || cache.audio.exists(cacheID) === false)
            {
                klog.warn('Audio cannot be extracted from the cache. Invalid cacheID or cache given.', cacheID);
                this.ready = false;
                return;
            }

            this.cacheID = cacheID;
            this._file = cache.audio.getFile(cacheID);
            this._sound = this._file.data;
            this.ready = true;

            return true;
        } 

        /*
        * Decodes the audio data to make it playable. By default the audio should already have been decoded when it was loaded.
        *
        */
        private _decode() {
            
            //you only decode when using the web audio api
            if (this._usingAudioTag) return;

            //has the 
            if (this._file.data.decoded === true && this._file.data.buffer !== null) {
                this._buffer = this._file.data.buffer;
                this._decoded = true;
                console.log('decoded already');
            }

            //the audio hasn't been decoded yet but it is decoding?
            if (this._game.audio.predecode == true && this._file.data.decode == false) {
                console.log('decoding in progress....waiting');
            }

            var that = this;
            this.context.decodeAudioData(this._file.data.raw, function (buffer) {
                that._buffer = buffer;
                that._decoded = true;
                console.log('decoded');
            });

        }
        
        /*
        * Used to set the current volume for this sound if a parameter has been passed. Otherwise returns the volume.
        *
        * @method volume
        * @param {number} val
        * @return {number}
        */
        public volume(val?:number) {

            if (val !== undefined) {
                if (val > 1) val = 1;
                if (val < 0) val = 0;

                this._volume = val;

                if (this._usingWebAudio) {
                    this.gainNode.gain.value = this._volume * this._game.audio.volume();

                } else if (this._usingAudioTag) {
                    this._sound.volume = this._volume * this._game.audio.volume();

                }
                console.log('volume update');
            }

            return this._volume;
        }

        /*
        * Allows you to mute the sound.
        *
        * @method muted
        * @param {bool} val
        * @return {bool}
        */
        public mute(val?: bool) {

            if (val !== undefined && this._muted !== val) {
                if (val === true) {
                    this._muteVolume = this._volume;
                    this.volume(0);
                    this._muted = true;
                    console.log('muted');
                } else {
                    this.volume(this._muteVolume);
                    this._muted = false;
                    console.log('unmuted');
                }
            }
            
            return this._muted;
        }

        /*
        * Plays the current sound/audio
        */
        public play() {
            this.paused = false;

            if (this._usingWebAudio) {
                if (this._decoded === true) {

                    if (this.isPlaying) return;

                    console.log('Should be playing');

                    //if the buffer is null
                    if (this._buffer == null) this._buffer = this._file.data.buffer;

                    this._sound = this.context.createBufferSource();
                    this._sound.buffer = this._buffer;
                    this._sound.connect(this.gainNode);
                    this.totalDuration = this._sound.buffer.duration;

                    if (this.duration == 0) this.duration = this.totalDuration * 1000;

                    if (this.loop) this._sound.loop = true;

                    //start
                    if (this._sound.start === undefined) {
                        this._sound.noteGrainOn(0, 0, this.duration / 1000);
                    } else {
                        this._sound.start(0, 0, this.duration / 1000);
                    }
                    
                    this.isPlaying = true;
                    this._startTime = this._game.time.now();
                    this._currentTime = 0;
                    this._stopTime = this._startTime + this.duration;

                } else {
                    console.log('Pending');
                    this._pending = true;
                    this._decode();
                }

            } else {
                console.log('Playing Fallback');

                if (this.duration == 0) this.duration = this.totalDuration * 1000;

                if (this._muted) this._sound.volume = 0;
                else this._sound.volume = this.volume;
                
                this._sound.play();
                this.isPlaying = true;
                this._startTime = this._game.time.now();
                this._currentTime = 0;
                this._stopTime = this._startTime + this.duration;
            }
        }

        /*
        * Stop the sound from playing .
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
            }

            this.isPlaying = false;
        }
        
        /*
        * Stops a sound from playing without reseting the time. Used with resume.
        */
        public pause() {
            if (this.isPlaying) {
                this.paused = true;
                this.stop();
            }

        }
        
        /*
        * Reumes a sound from when it was paused. 
        */
        public resume() {

            if (this.paused && this.isPlaying == false) {
                if (this._usingWebAudio) {
                    
                    if (this._buffer == null) this._buffer = this._file.data.buffer;

                    this._sound = this.context.createBufferSource();
                    this._sound.buffer = this._buffer;
                    this._sound.connect(this.gainNode);
                    
                    if (this._sound.start === undefined) {
                        this._sound.noteGrainOn(0, (this._currentTime / 1000), this.duration / 1000);
                    } else {
                        this._sound.start(0, (this._currentTime / 1000), this.duration / 1000);
                    }
                } else {
                    this._sound.currentTime = this._currentTime / 1000;
                    this._sound.play();

                }

                this.paused = false;
                this.isPlaying = true;

            }

        }
        
        /*
        * Le Update Loop
        */
        public update() {
            //time management stuff
            if (!this.ready) return;

            if (this._pending === true && this._decoded === true || this._pending && this._file.data.decoded) {
                console.log('Pending Stopped, Playing Now');
                this._pending = false;
                this.play();
            }

            if (this.isPlaying) {

                this._currentTime = this._game.time.now() - this._startTime;

                //is the time greater than the duration
                if (this._currentTime >= this.duration) {
                    if (this._usingWebAudio) {

                        if (this.loop) {
                            this._currentTime = 0;
                            this._startTime = this._game.time.now();
                        } else {
                            this.stop();
                        }

                    } else {

                        if (this.loop) {
                            console.log('play again');
                            this.play();
                        } else {
                            console.log('stop playing');
                            this.stop();
                        }

                    }
                }
            }

        }

        public remove() {
            this.gainNode.disconnect();
            //more should go here...
        }

        public destroy() {
            this._sound = null;
            this._currentTime = null;
            this._startTime = null;
            this._stopTime = null;
            this._pending = null;
            this.masterGainNode = null;
            this.gainNode = null;
            this.totalDuration = null;
            this.duration = null;
            this._file = null;
            this._buffer = null;
            this._decoded = null;
        }

    }

}