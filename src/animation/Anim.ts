/**
* Kiwi - Animation
* @module Kiwi
* @submodule Animation 
* @main Animation
*/

module Kiwi.Animation {

    /**
    * 
    * @class Anim
    * @constructor
    * @param name {string} The name of this anim.
    * @param sequences {Sequences} The sequence that this anim will be using to animate.
    * @param clock {Clock} A game clock that this anim will be using to keep record of the time between frames.
    * @return {Anim} 
    * 
    */
    export class Anim {
         
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

        /**
        * The name of this animation.
        * @property name
        * @type string
        * @public
        */
        public name: string;
        
        /**
        * The sequence on the texture atlas that this animation is based off.
        * @property _sequence
        * @type Sequence
        * @private
        */
        private _sequence: Kiwi.Animation.Sequence;

        /**
        * If this animation should loop or not.
        * @property _loop
        * @type boolean
        * @private
        */
        private _loop: boolean;

        /**
        * If once the animation reaches the end, it should start again from the first cell in the sequence or not.
        * @property loop
        * @type boolean
        * @public
        */
        public get loop(): boolean {
            return this._loop;
        }
        public set loop(value: boolean) {
            this._loop = value;
        }

        /**
        * The current frame index that the animation is currently upto.
        * Note: A frame index is the index of a particular cell in the Sequence.
        * @property _frameIndex
        * @type number
        * @private
        */
        private _frameIndex: number = 0;

        /**
        * The current frame index that the animation is currently upto.
        * Note: A frame index is the index of a particular cell in the Sequence.
        * @property frameIndex
        * @type number
        * @public
        */
        public get frameIndex(): number {
            return this._frameIndex;
        }
        public set frameIndex(val: number) {
            if (this._validateFrame(val)) {
                this._frameIndex = val;
            }
        }

        /**
        * Returns the current cell that the animation is up to. This is READ ONLY.
        * @property currentCell
        * @type number
        * @public
        */
        public get currentCell(): number {
            return this._sequence.cells[this.frameIndex];
        }

        /**
        * How fast the transition is between cells. Perhaps change to frames per second to reflect actual game speed?
        * @property _speed
        * @type number
        * @private
        */
        private _speed: number;

        /**
        * How long the each cell should stay on screen for. In seconds.
        * @property speed
        * @type number
        * @public
        */
        public get speed(): number {
            return this._speed;
        }
        public set speed(value: number) {
            this._speed = value;
        }

        /**
        * The clock that is to be used to calculate the animations.
        * @property _clock
        * @type Clock
        * @private
        */
        private _clock: Kiwi.Time.Clock;

        /**
        * The starting time of the animation from when it was played. Internal use only.
        * @property _startTime
        * @type number
        * @private
        */
        private _startTime: number = null;
        
        /**
        * Indicates whether the animation is playing in reverse or not.
        * @property _reverse
        * @type boolean
        * @private
        */
        private _reverse: boolean = false;

        /**
        * Whether the animation is to be played in reverse.
        * @property reverse
        * @type boolean
        * @public
        */
        public set reverse(value: boolean) {
            this._reverse = value;
        }
        public get reverse(): boolean {
            return this._reverse;
        }

        /**
        * The time at which the animation should change to the next cell 
        * @property _tick
        * @type number
        * @private
        */ 
        private _tick: number;

        /**
        * If the animation is currently playing or not.
        * @property _isPlaying
        * @type boolean
        * @default false
        * @private
        */
        private _isPlaying: boolean;

        /**
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property onStop
        * @type Signal
        * @public
        */
        public onStop: Kiwi.Signal;
        
        /**
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property onPlay
        * @type Kiwi.Signal
        * @public
        */
        public onPlay: Kiwi.Signal;
        
        /**
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property onUpdate
        * @type Kiwi.Signal
        * @public
        */
        public onUpdate: Kiwi.Signal;
        
        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property onLoop
        * @type Kiwi.Signal
        * @public
        */
        public onLoop: Kiwi.Signal;
         
        /**
        * An Internal method used to start the animation.
        * @method _start
        * @param [index=null] {number} The index of the frame in the sequence that is to play. If left as null if just starts from where it left off.
        * @private
        */
        private _start(index: number = null) {
            if (index !== null) {
                this.frameIndex = index;
            } 
            this._isPlaying = true;
            this._startTime = this._clock.elapsed();
            this._tick = this._startTime + this._speed;
            this.onPlay.dispatch();
        }

        /**
        * Plays the animation.
        * @method play
        * @public
        */
        public play() {
            //if the animation is at the last frame then start it at the beginning
            if (this._frameIndex === this.length - 1) this.frameIndex = 0; 

            this.playAt(this._frameIndex);
        }

        /**
        * Plays the animation at a particular frame
        * @method playAt
        * @param index {number} The index of the cell in the sequence that the animation is to start at.
        * @public
        */
        public playAt(index: number) {  
            this._start(index);
        }

        /**
        * Pauses the current animation.
        * @method pause
        * @public
        */
        public pause() {
            this.stop();
        }

        /**
        * Resumes the current animation after stopping.
        * @method resume
        * @public
        */
        public resume() {
            if (this._startTime !== null) { 
                this._isPlaying = true;
            }
        }

        /**
        * Stops the current animation from playing.
        * @method stop
        * @public
        */
        public stop() {
            if (this._isPlaying) {
                this._isPlaying = false; 
                this.onStop.dispatch();
            }
        }

        /**
        * Makes the animation go to the next frame. If the animation is at the end it goes back to the start.
        * @method nextFrame
        * @public
        */
        public nextFrame() {
            this._frameIndex++;
            if (this._frameIndex >= this.length) this.frameIndex = 0;
        }
        
        /**
        * Makes the animation go to the previous frame. If the animation is at the first frame it goes to the end.
        * @method prevFrame
        * @public
        */
        public prevFrame() {
            this._frameIndex--;
            if (this._frameIndex < 0) this.frameIndex = this.length - 1;
        }

        /**
        * The update loop. Returns a boolean indicating whether the animation has gone to a new frame or not.
        * @method update
        * @return {boolean}
        * @public
        */
        public update(): boolean {
            if (this._isPlaying) {
                if (this._clock.elapsed() >= this._tick) {

                    this._tick = this._clock.elapsed() + this._speed;
                    
                    if (this._reverse) this._frameIndex--;
                    else this._frameIndex++;

                    this.onUpdate.dispatch();
                    if (!this._validateFrame(this._frameIndex)) {

                        if (this._loop) {
                            if (this._reverse) {
                                this._frameIndex = this.length - 1;
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

        /**
        * An internal method used to check to see if frame passed is valid or not
        * @method _validateFrame
        * @param frame {number} The index of the frame that is to be validated.
        * @private
        */
        private _validateFrame(frame: number) {
            return (frame < this.length && frame >= 0);
        }
        
        /**
        * Returns the number of frames that in the animation. Thus the animations 'length'. Note this is READ ONLY.
        * @property length
        * @type number
        * @public
        */
        public get length():number {
            return this._sequence.cells.length;
        }

        /**
        * Destroys the anim and all of the properties that exist on it.
        * @method destroy
        * @public
        */
        public destroy() {
            this._isPlaying = false;
            delete this._clock;
            delete this._sequence;
            if(this.onLoop) this.onLoop.dispose();
            if(this.onStop) this.onStop.dispose();
            if(this.onPlay) this.onPlay.dispose();
            if(this.onUpdate) this.onUpdate.dispose();
            delete this.onLoop;
            delete this.onStop ;
            delete this.onPlay ;
            delete this.onUpdate ;
            delete this.frameIndex ;
            delete this.loop;
            delete this._reverse;
            delete this._tick;
        }
        
    }
}