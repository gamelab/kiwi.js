/// <reference path="../core/game.ts" />

module Kiwi.Animation {


    export class Anim {

        /*
        *
        * @constructor
        * @param {string} name
        * @param {Kiwi.Textures.TextureAtlas} atlas
        * @param {Sequences} sequences
        * @param {Kiwi.Time.Clock} clock
        */
        constructor(name: string, sequence: Kiwi.Animation.Sequence, clock: Kiwi.Time.Clock) {
            
            this.name = name;
            this._sequence = sequence;
            this._speed = sequence.speed;
            this._loop = sequence.loop;
            this._clock = clock;

            //Signals
            this.onUpdate = new Kiwi.Signal;
            this.onPlay = new Kiwi.Signal;
            this.onStop = new Kiwi.Signal;
            this.onLoop = new Kiwi.Signal;
        }

        /*
        * The name of this animation.
        * @property name
        * @type string
        */
        public name: string;
        
        /*
        * The sequence on the texture atlas that this animation is based off.
        * @property _sequence
        * @type Kiwi.Sequence
        */
        private _sequence: Kiwi.Animation.Sequence;

        /*
        * If this animation should loop or not.
        * @property _loop
        * @type boolean
        */
        private _loop: boolean;

        /*
        * Get if this animation is to loop or not.
        * @type bool
        */
        public get loop(): bool {
            return this._loop;
        }

        /*
        * Set if this animation should loop or not
        * @type bool
        */
        public set loop(value: bool) {
            this._loop = value;
        }

        /*
        * An internal property to store the a frameindex that is to be played if the animation is pending
        * @property _uniqueFrameIndex
        * @type number
        */
        private _uniqueFrameIndex: number = 0;

        /*
        * The current frame index that the animation is upto. 
        * @property _frameIndex
        * @type number
        */
        private _frameIndex: number = 0;

        /*
        * Returns the current frame index that the animation is up to.
        * @type number
        */
        public get frameIndex(): number {
            return this._frameIndex;
        }

        /*
        * Returns the current cell that the animation is up to.
        * @type number
        */
        public get currentCell(): number {
            return this._sequence.cells[this.frameIndex];
        }

        /*
        * How fast the transition is between cells. Perhaps change to frames per second to reflect actual game speed?
        * @property _speed
        * @type number
        */
        private _speed: number;

        /*
        * Get how fast the transition is between cells. 
        * @type number
        */
        public get speed(): number {
            return this._speed;
        }

        /*
        * Set how fast the transition is between cells. 
        * @type number
        */
        public set speed(value: number) {
            this._speed = value;
        }

        /*
        * The clock that is to be used to calculate the animations.
        * @property _clock
        * @type Kiwi.Time.Clock
        */
        private _clock: Kiwi.Time.Clock = null;

        /*
        * The starting time of the animation from when it was played. Internal use only.
        * @property _startTime
        * @type number
        */
        private _startTime: number = null;
        
        /*
        * Indicates weither the animation is playing in reverse or not.
        * @property _reverse
        * @type boolean
        */
        private _reverse: boolean = false;

        /*
        * Set's weither or not the animation is playing in reverse or not.
        * @type boolean
        */
        public set reverse(value: boolean) {
            this._reverse = value;
        }
        
        /*
        * Returns a boolean indicating if the animation is playing in reverse or not 
        * @type boolean
        */
        public get reverse(): boolean {
            return this._reverse;
        }

        /*
        * The time at which the animation should change to the next cell 
        * @property _tick
        * @type number
        */ 
        private _tick: number;

        /*
        * If the animation is currently playing or not.
        * @property _isPlaying
        * @type bool
        */
        private _isPlaying: bool;

        /*
        * If the animation has been played but we are waiting on the entity to be added to stage.
        * @property _playPending
        * @type bool
        */
        private _playPending: bool = false;

        /*
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property onStop
        * @type Kiwi.Signal
        */
        public onStop: Kiwi.Signal;
        
        /*
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property onPlay
        * @type Kiwi.Signal
        */
        public onPlay: Kiwi.Signal;
        
        /*
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property onUpdate
        * @type Kiwi.Signal
        */
        public onUpdate: Kiwi.Signal;
        
        /*
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property onLoop
        * @type Kiwi.Signal
        */
        public onLoop: Kiwi.Signal;

        /*
        * Set the clock for this animation.
        * @type Kiwi.Time.Clock
        */
        public set clock(clock: Kiwi.Time.Clock) {

            this._clock = clock;

            if (this._playPending) this._start(this._uniqueFrameIndex);
        }

        /*
        * Get the clock.
        * @type Kiwi.Time.Clock
        */
        public get clock(): Kiwi.Time.Clock {
            return this._clock;
        }

        /*
        * An Internal method used to start the animation.
        * @method _start
        * @param {number} index
        */
        private _start(index: number = 0) {
            if (this._validateFrame(index) == false) //if its not a valid frame
                index = 0;
            
            this._playPending = false;
            this._isPlaying = true;
            this._startTime = this._clock.elapsed();
            this._tick = this._startTime + this._speed;
            this._frameIndex = index;
            this.onPlay.dispatch();
        }

        /*
        * Plays the animation at the first frame
        * @method play
        */
        public play() {
            this.playAt(0);
        }

        /*
        * Plays the animation at a particular frame
        * @method playAt
        * @param {number} index
        */
        public playAt(index: number) {
            this._uniqueFrameIndex = index;
            if (this.clock === null) {
                this._playPending = true;
            } else {
                this._start(index);
            }
        }

        /*
        * Pauses the current animation.
        * @method pause
        */
        public pause() {
            this.stop();
        }

        /*
        * Resumes the current animation after stopping.
        * @method resume
        */
        public resume() {
            if (this._startTime !== null) { 
                this._isPlaying = true;
            }
        }

        /*
        * Stops the current animation from playing.
        * @method stop
        */
        public stop() {
            if (this._isPlaying) {
                this._isPlaying = false;
                this._playPending = false;
                this.onStop.dispatch();
            }
        }

        /*
        * The update loop. Returns a boolean indicating weither the animation has gone to a new frame or not.
        * @method update
        * @return {bool}
        */
        public update(): bool {
            if (this._isPlaying) {
                if (this.clock.elapsed() >= this._tick) {

                    this._tick = this.clock.elapsed() + this._speed;
                    
                    if (this._reverse) this._frameIndex--;
                    else this._frameIndex++;

                    this.onUpdate.dispatch();
                    if (!this._validateFrame(this._frameIndex)) {

                        if (this._loop) {
                            if (this._reverse) {
                                this._frameIndex = this._sequence.cells.length - 1;
                                this.onLoop.dispatch();
                            } else {
                                this._frameIndex = 0;
                                this.onLoop.dispatch();
                            }
                        } else {
                            this._frameIndex--;
                            this.stop();
                        }
                    }

                    return true;
                }
            }
            return false;
        }

        /*
        * An internal method used to check to see if frame passed is valid or not
        * @method _validateFrame
        * @param {number} frame
        */
        private _validateFrame(frame: number) {
            return (frame < this._sequence.cells.length && frame >= 0);
        }

    }
}