/**
* Is the namespace in which all code that is used to create/provide an animation of various sorts are stored. These could range from animations that change the cell of a SpriteSheet that is displayed every few seconds (Animation/Sequence), to animations that change a numeric value on a object over a period time (Tweens).
* 
* @module Kiwi
* @submodule Animations 
* @main Animations 
*/

module Kiwi.Animations {

    /**
    * An Animation contains information about a single animation that is held on a AnimationManager. 
    * The information that is held is unique to this individual animation and will initially be the same as a Sequence,
    * but if you do ever modify the information held in this Animation the corresponding Sequence will not be updated.
    * 
    * @class Animation
    * @namespace Kiwi.Animations
    * @constructor
    * @param name {string} The name of this anim.
    * @param sequences {Sequences} The sequence that this anim will be using to animate.
    * @param clock {Clock} A game clock that this anim will be using to keep record of the time between frames.
    * @param parent {AnimationManager} The animation manager that this animation belongs to.
    * @return {Anim} 
    * 
    */
    export class Animation {
         
        constructor(name: string, sequence: Kiwi.Animations.Sequence, clock: Kiwi.Time.Clock, parent: Kiwi.Components.AnimationManager) {
            
            this.name = name;
            this._sequence = sequence;
            this._speed = sequence.speed;
            this._loop = sequence.loop;
            this._clock = clock;
            this._parent = parent;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType(): string {
            return 'Animation';
        }

        /**
        * The AnimationManager that this animation is a child of.
        * @property _parent
        * @type AnimationManager
        * @private
        */
        private _parent: Kiwi.Components.AnimationManager;

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
        private _sequence: Kiwi.Animations.Sequence;

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
            return this._sequence.cells[ this.frameIndex ];
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
        private _isPlaying: boolean = false;

        /**
        * If the animation is currently playing or not.
        * @property isPlaying
        * @type boolean
        * @private
        */
        public get isPlaying(): boolean {
            return this._isPlaying;
        }

        /**
        * A Kiwi.Signal that dispatches an event when the animation has stopped playing.
        * @property _onStop
        * @type Signal
        * @public
        */
        private _onStop: Kiwi.Signal = null;
        
        public get onStop(): Kiwi.Signal {
            if (this._onStop == null) this._onStop = new Kiwi.Signal; 
            return this._onStop;
        }

        /**
        * A Kiwi.Signal that dispatches an event when the animation has started playing.
        * @property _onPlay
        * @type Kiwi.Signal
        * @public
        */
        private _onPlay: Kiwi.Signal = null;
        
        public get onPlay(): Kiwi.Signal {
            if (this._onPlay == null) this._onPlay = new Kiwi.Signal;
            return this._onPlay;
        }

        /**
        * A Kiwi.Signal that dispatches an event when the animation has updated/changed frameIndexs.
        * @property _onUpdate
        * @type Kiwi.Signal
        * @public
        */
        private _onUpdate: Kiwi.Signal = null;
        
        public get onUpdate(): Kiwi.Signal {
            if (this._onUpdate == null) this._onUpdate = new Kiwi.Signal;
            return this._onUpdate;
        }

        /**
        * A Kiwi.Signal that dispatches an event when the animation has come to the end of the animation and is going to play again.
        * @property _onLoop
        * @type Kiwi.Signal
        * @public
        */
        private _onLoop: Kiwi.Signal = null;
        
        public get onLoop(): Kiwi.Signal {
            if (this._onLoop == null) this._onLoop = new Kiwi.Signal;
            return this._onLoop;
        }

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
            if(this._onPlay !== null) this._onPlay.dispatch();
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
                if(this._onStop !== null) this._onStop.dispatch();
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
        * @public
        */
        public update() {
            if (this._isPlaying) {
                if (this._clock.elapsed() >= this._tick) {

                    this._tick = this._clock.elapsed() + this._speed;
                    //Would it be a valid frame?
                    if (this._validateFrame(this._frameIndex + ((this._reverse == true) ? -1 : 1))) {
                        
                        this._frameIndex += (this._reverse == true) ? -1 : 1;
                        this._parent.updateCellIndex();
                        if(this._onUpdate !== null) this._onUpdate.dispatch();
                    
                    } else {

                        //Is it looping?
                        if (this._loop) {
                            if (this._reverse) {
                                this._frameIndex = this.length - 1;
                            } else {
                                this._frameIndex = 0;
                            }
                            this._parent.updateCellIndex();
                            if(this._onLoop !== null) this._onLoop.dispatch();

                            //Not Looping, stop animation.
                        } else {
                            //Execute the stop on the parent to allow the isPlaying boolean to remain consistent
                            this._parent.stop();
                        }

                    }

                }
            }
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
            delete this._parent;
            if(this._onLoop) this._onLoop.dispose();
            if(this._onStop) this._onStop.dispose();
            if(this._onPlay) this._onPlay.dispose();
            if(this._onUpdate) this._onUpdate.dispose();
            delete this._onLoop;
            delete this._onStop ;
            delete this._onPlay ;
            delete this._onUpdate ;
            delete this.frameIndex ;
            delete this.loop;
            delete this._reverse;
            delete this._tick;
        }
        
    }
}