/// <reference path="../core/Game.ts" />
/// <reference path="../time/Clock.ts" />
/// <reference path="Frame.ts" />

/**
 *	Kiwi - Animations - Animation
 *
 *	@desc 		
 *
 *	@version 	1.0 - 22nd March 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Anims {

    export class Animation {

        /**
        * 
        * @constructor
        * @param {string} name
        * @param {Kiwi.File} file
        * @param {Kiwi.Anims.Frame} frames
        * @param {number} playSpeed
        * @param {number} repeat
        */
        constructor(name: string, file: Kiwi.File, frames: Kiwi.Anims.Frame[], playSpeed: number, repeat: number) {

            this.name = name;
            this.file = file;

            this._frames = frames;
            this._frameIndex = 0;
            this._speed = playSpeed;
            this._length = frames.length;
            this._repeat = repeat;
            this._isPlaying = true;
            this.updated = new Kiwi.Signal();

            this.currentFrame = this.getFrame(this._frameIndex);
        }

        /*
        * The name of this animation
        * @public
        */
        public name: string;

        /*
        * The file that the animation is happening on.
        * @public
        */
        public file: Kiwi.File;

        /*
        * A private property that keeps track of which point in the animation we are. 
        * Example. If you had a animation consisting of [3, 2, 1] and we were at frame '2', the _frameIndex would be '1'. 
        * @private
        */
        private _frameIndex: number;

        /*
        * The current frame that we are at.
        * @public
        */
        public currentFrame: Kiwi.Anims.Frame;

        /*
        * The clock is used to calculate when to switch between frames in the animation.
        * @private
        */
        private _clock: Kiwi.Time.Clock = null;

        /*
        * The delay between the change of each frame.
        */
        private _speed: number;

        /*
        * When the animation started playing. 
        * This could be used to calculate how many times the animation has played.
        * @private
        */
        private _startTime: number = null;
        
        /*
        * The time at which the next frame needs to appear.
        * @private
        */
        private _tick;

        /*
        * The frames that are in this animation.
        * @private
        */
        private _frames: Kiwi.Anims.Frame[];
        
        /*
        * The number of frames in this animation. 
        * @private
        */
        private _length: number;
        
        /*
        * Weither the animation (once completed) should replay or not
        * @private 
        */
        private _repeat: number;

        /*
        * A boolean to know ifthe game is playing or not.
        * @private
        */
        private _isPlaying: bool;
        
        /*
        * A Kiwi.Signal to dispatch events when the animation has/needs to change
        * @public
        */
        public updated: Kiwi.Signal;

        /*
        * A boolean to signal if the clock has been set or not. 
        * If the clock has not been set then the animation cannot play/start.
        * @private
        */
        private _playPendingState: bool = false;

        /*
        * To represent a specific frame index that the animation may need to either stop at or start at.
        *
        * @private
        */
        private _uniqueFrameIndex: number = null;

        /*
        * The type of object this is.
        */
        public objType() {
            return "Animation";
        }

        /*
        * A private method that sets up all of the variables for playing an animation.
        *
        * @method _start
        * @param {number} index
        */
        private _start(index:number = 0) {
            this._startTime = this._clock.elapsed();
            this._tick = this._startTime + this._speed;
            this._frameIndex = index;
            this.currentFrame = this.getFrame(this._frameIndex);
            this.updated.dispatch(-this.currentFrame.x, -this.currentFrame.y);
        }

        /*
        * Sets the current clock that this animation is using. 
        * 
        * @method clock
        * @param {Kiwi.Time.Clock} clock
        * @return {Kiwi.Time.Clock
        */
        public clock(value: Kiwi.Time.Clock = null): Kiwi.Time.Clock {

            if (value !== null) {
                this._clock = value;

                if (this._playPendingState === true) {
                    this._playPendingState = false;
                    
                    if (this._uniqueFrameIndex !== null) {
                        this._start(this._uniqueFrameIndex);
                        this._uniqueFrameIndex = null;
                    } else {
                        this._start();
                    }
                }
            }

            return this._clock;
        }
    
        /*
        * Starts the animation from the beginning. 
        *
        * @method play
        */
        public play() {
            this._isPlaying = true;

            if (this._clock === null) { 
                this._playPendingState = true;
            } else {
                this._start();
            }
        }

        public playAt(index: number) {
            this._isPlaying = true;

            if (this._clock === null) {
                this._playPendingState = true;
                this._uniqueFrameIndex = index;
            } else {
                this._start(index);
            }
        }
        
        /*
        * Pause's the animation. This is just another name for stop.
        *
        * @method pause
        */
        public pause() {
            this.stop();
        }

        /*
        * Resumes the animation from where it left off. 
        * This function assumes that you have already played this animation before. //fix
        *
        * @method resume
        */
        public resume() {
            if (this._startTime === null) {
                klog.warn('Animation\'s can only resume if they have been played before!');
            } else {
                this._isPlaying = true;
            }    
        }

        /*
        * Stops the animation.
        *
        * @method stop
        */
        public stop() {
            this._isPlaying = false;
        }

        /*
        * Update loop.
        *
        * @method update
        */
        public update() {

            if (this._playPendingState === false && this._clock.elapsed() >= this._tick) {

                this._tick = this._clock.elapsed() + this._speed;

                if (this._isPlaying) {

                    this._frameIndex++;
                    if (this._frameIndex === this._length && this._repeat != Kiwi.Anims.PLAY_ONCE) {
                        this._frameIndex = 0;

                    } else if (this._frameIndex === this._length && this._repeat == Kiwi.Anims.PLAY_ONCE) {
                        this._frameIndex = this._length - 1;
                        this.stop();
                    }

                }

                this.currentFrame = this.getFrame(this._frameIndex);
                this.updated.dispatch(-this.currentFrame.x, -this.currentFrame.y);
            }
            
        }

        /*
        * Used to render the animation to a canvas.
        *
        * @method renderToCanvas
        * @param {Kiwi.Layer} layer
        * @param {number} x
        * @param {number} y
        */
        public renderToCanvas(layer: Kiwi.Layer, x: number, y: number) {

            layer.canvas.context.drawImage(this.file.data, this.currentFrame.x, this.currentFrame.y, this.currentFrame.width, this.currentFrame.height, x, y, this.currentFrame.width, this.currentFrame.height);

        }

        /*
        * Draws a particular frame to the canvas.
        *
        * @method drawFrameToCanvasLayer
        * @param {Kiwi.Layer} layer
        * @param {number} frameNumber
        * @param {number} x
        * @param {number} y
        */
        public drawFrameToCanvasLayer(layer: Kiwi.Layer, frameNumber: number, x: number, y: number) {

            var frame: Frame = this.getFrame(frameNumber);

            if (frame !== null)
            {
                layer.canvas.context.drawImage(this.file.data, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);
            }

        }

        /*
        * Checks to see if a frame at the index past index exists.
        * 
        * @method frameExists
        * @param {number} frameIndex
        * @return {boolean}
        */
        public frameExists(frameIndex:number): bool {

            if (frameIndex <= this._length) {
                return true;
            }

            return false;
        }

        /*
        * Returns the frame information for the index you pass. If no index was passed it returns the currentFrames information.
        *
        * @method getFrame
        * @param {number} index
        * @return {Kiwi.Anims.Frame}
        */
        public getFrame(index:number=null): Kiwi.Anims.Frame {

            if (index === null) {
                return this._frames[this._frameIndex];
            } else if (this.frameExists(index)) {
                return this._frames[index];
            }
            
            return;
        }
        
        /*
        * Sets the current frame to be what you pass it.
        *
        * @method setFrame
        * @param {number} value
        */
        public setFrame(value: number) {

            this._frameIndex = value;
            this.currentFrame = this.getFrame(this._frameIndex);
            this.updated.dispatch(-this.currentFrame.x, -this.currentFrame.y);
        }

        /*
        * Returns a boolean indicating weither the animation is playing or not.
        *
        * @method isPlaying
        * @returns {boolean}
        */
        public isPlaying(): bool {
            return this._isPlaying;
        }
        
        /*
        * Set the speed/delay between frames
        *
        * @method speed
        * @param {number} value
        * @return {number}
        */
        public speed(value: number = null): number {

            if (value !== null)
            {
                this._speed = value;
            }

            return this._speed;
        }

        /*
        * Returns the point in the animation that we are at.
        *
        * @method frameIndex
        * @return {number}
        */
        public frameIndex(): number {
            return this._frameIndex;
        }

        /*
        * Returns the number of sprites in the animation.
        *
        * @method length
        * @return {number}
        */
        public length(): number {
            return this._length;
        }
    }

}