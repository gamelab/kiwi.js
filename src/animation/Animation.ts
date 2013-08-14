
module Kiwi {


    export class Animation {

        constructor(name: string, atlas: Kiwi.Textures.TextureAtlas, sequence: Sequence, speed: number, loop: boolean, clock: Kiwi.Time.Clock) {

            this.name = name;
            this._atlas = atlas;
            this._sequence = sequence;
            this._speed = speed;
            this._loop = loop;
            this._clock = clock;

            this._currentFrame = this._sequence.cells[0];

        }

        public name: string;

        private _atlas: Kiwi.Textures.TextureAtlas;
        private _sequence: Sequence;
        private _loop: boolean;

        private _uniqueFrameIndex: number = 0;

        private _frameIndex: number = 0;

        private _currentFrame: number;

        public get currentFrame(): number {
            return this._currentFrame;
        }

        public set currentFrame(frameIndex: number) {
            //check that is is valid.
            if (this._sequence.cells[frameIndex])
                this._currentFrame = this._sequence.cells[frameIndex];
        }

        //time
        private _clock: Kiwi.Time.Clock = null;
        private _speed: number;
        private _startTime: number = null;
        private _tick: number;

        //state
        private _isPlaying: bool;
        private _playPending: bool = false;

        public set clock(clock: Kiwi.Time.Clock) {
            this._clock = clock;

            if (this._playPending) this._start(this._uniqueFrameIndex);
        }

        public get clock(): Kiwi.Time.Clock {
            return this._clock;
        }

        private _start(index: number = 0) {
            this._playPending = false;
            this._isPlaying = true;
            this._startTime = this._clock.elapsed();
            this._tick = this._startTime + this._speed;
            this._frameIndex = index;
            this.currentFrame = this._frameIndex;

        }

        public play() {
            this.playAt(0);
        }

        public playAt(index: number) {
            this._uniqueFrameIndex = index;
            if (this.clock === null) {
                this._playPending = true;
            } else {
                this._start(index);
            }
        }

        public pause() {
            this.stop();
        }

        public resume() {
            if (this._startTime === null) {
                klog.warn('Animation\'s can only resume if they have been played before!');
            } else {
                this._isPlaying = true;
            }
        }

        public stop() {
            this._isPlaying = false;
        }

        public update(): bool {
            if (this._isPlaying) {

                //update the clock
                //check to see if the next frame should appear
                if (this.clock.elapsed() >= this._tick) {

                    this._tick = this.clock.elapsed() + this._speed;

                    this._frameIndex++;
                    console.log('Started');
                    if (!this._validateFrame(this._frameIndex)) {
                        //check to see if it is at the end
                        console.log('Not Valid');
                        if (this._loop) {
                            console.log('Looping');
                            this._frameIndex = 0;
                        } else {
                            console.log('Stopped');
                            this._frameIndex--;
                            this.stop();
                        }
                    }

                    this.currentFrame = this._frameIndex;

                    console.log('Updated', this._frameIndex, this.currentFrame);
                    return true;
                }
            }
            return false;
        }

        private _validateFrame(frame: number) {
            console.log(frame, this._sequence.cells.length);
            return (frame < this._sequence.cells.length && frame >= 0);

        }

    }
}