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
        * @param {Kiwi.Game} game.
        * @return {Kiwi.Time.Manager} This Object.
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

            this.currentFrame = this.getFrame(this._frameIndex);

        }

        public name: string;
        public file: Kiwi.File;

        private _frameIndex: number;
        public currentFrame: Kiwi.Anims.Frame;

        private _clock: Kiwi.Time.Clock = null;
        private _speed: number;
        private _startTime: number;
        private _tick;
        private _frames: Kiwi.Anims.Frame[];
        private _length: number;
        private _repeat: number;
        private _isPlaying: bool;

        public objType() {
            return "Animation";
        }

        public clock(value: Kiwi.Time.Clock = null): Kiwi.Time.Clock {

            if (value !== null)
            {
                this._clock = value;

                if (this._playPendingState === true)
                {
                    this._playPendingState = false;
                    this._startTime = this._clock.elapsed();
                    this._tick = this._startTime + this._speed;
                    this._frameIndex = 0;
                    this.currentFrame = this.getFrame(this._frameIndex);
                }
            }

            return this._clock;

        }

        public setFrame(value: number) {

            this._frameIndex = value;
            this.currentFrame = this.getFrame(this._frameIndex);

        }

        public speed(value: number = null): number {

            if (value !== null)
            {
                this._speed = value;
            }

            return this._speed;

        }

        public frameIndex(): number {
            return this._frameIndex;

        }

        public length(): number {
            return this._length;
        }

        private _playPendingState: bool = false;

        public play() {
            
            this._isPlaying = true;

            if (this._clock === null) {
                this._playPendingState = true;
                
            }
            else {
                this._startTime = this._clock.elapsed();
                this._tick = this._startTime + this._speed;
                this._frameIndex = 0;
                this.currentFrame = this.getFrame(this._frameIndex);
            }


            }

        public pause() { }

        public resume() {
            this._isPlaying = true;
        }

        public stop() {
            this._isPlaying = false;
        }

        public update() {


            if (this._playPendingState) {

                //this.clock(game.time.clock);
            }

            else if (this._clock.elapsed() >= this._tick) {
                this._tick = this._clock.elapsed() + this._speed;
                if (this._isPlaying) {
                    this._frameIndex++;

                    if (this._frameIndex === this._length && this._repeat != Kiwi.Anims.PLAY_ONCE) {
                        this._frameIndex = 0;
                    }
                    else if (this._frameIndex === this._length && this._repeat == Kiwi.Anims.PLAY_ONCE) {
                        this._frameIndex = this._length - 1;
                        this.stop();
                    }
                }
                this.currentFrame = this.getFrame(this._frameIndex);
            }
        }

        public renderToCanvas(layer: Kiwi.Layer, x: number, y: number) {

            layer.canvas.context.drawImage(this.file.data, this.currentFrame.x, this.currentFrame.y, this.currentFrame.width, this.currentFrame.height, x, y, this.currentFrame.width, this.currentFrame.height);

        }

        drawFrameToCanvasLayer(layer: Kiwi.Layer, frameNumber: number, x: number, y: number) {

            var frame: Frame = this.getFrame(frameNumber);

            /*
                        //	https://developer.mozilla.org/en/Canvas_tutorial/Using_images#Slicing
                        this.context.drawImage(
                            this.texture,	//	Source Image
                            sx, 			//	Source X (location within the source image)
                            sy, 			//	Source Y
                            sw, 			//	Source Width
                            sh, 			//	Source Height
                            dx, 			//	Destination X (where on the canvas it'll be drawn)
                            dy, 			//	Destination Y
                            dw, 			//	Destination Width (always same as Source Width unless scaled)
                            dh 				//	Destination Height (always same as Source Height unless scaled)
                        );
            
            */

            if (frame !== null)
            {
                layer.canvas.context.drawImage(this.file.data, frame.x, frame.y, frame.width, frame.height, x, y, frame.width, frame.height);
            }

        }

        frameExists(value): bool {

            if (value <= this._length)
            {
                return true;
            }

            return false;

        }

        getFrame(value): Kiwi.Anims.Frame {

            if (this.frameExists(value))
            {
                return this._frames[value];
            }

            return null;

        }

        isPlaying(): bool {
            return this._isPlaying;
        }


    }

}