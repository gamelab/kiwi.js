
module Kiwi {


    export class Animation {

        constructor(name: string, atlas: Kiwi.Textures.TextureAtlas, sequence: Sequence, clock: Kiwi.Time.Clock) {
            
            this.name = name;
            this._atlas = atlas;
            this._sequence = sequence;
            this._speed = sequence.speed;
            this._loop = sequence.loop;
            this._clock = clock;

            this._currentCell = this._sequence.cells[0];

            this.onUpdate = new Kiwi.Signal;
            this.onPlay = new Kiwi.Signal;
            this.onStop = new Kiwi.Signal;
            this.onLoop = new Kiwi.Signal;
        }

        public name: string;

        private _atlas: Kiwi.Textures.TextureAtlas;
        private _sequence: Sequence;

        /*
        * If the animation should loop or not.
        */
        private _loop: boolean;

        public get loop(): bool {
            return this._loop;
        }

        public set loop(value: bool) {
            this._loop = value;
        }

        private _uniqueFrameIndex: number = 0;

        private _frameIndex: number = 0;

        public get frameIndex(): number {
            return this._frameIndex;
        }

        /*
        * The current cell
        *
        */
        private _currentCell: number;

        public get currentCell(): number {
            return this._currentCell;
        }

        public set currentCell(frameIndex: number) {
            //check that is is valid.
            if (this._sequence.cells[frameIndex])
                this._currentCell = this._sequence.cells[frameIndex];
        }
           
        /*
        * How fast the transition is between cells.
        */
        private _speed: number;
        
        public get speed(): number {
            return this._speed;
        }

        public set speed(value: number) {
            this._speed = value;
        }

        //time
        private _clock: Kiwi.Time.Clock = null;
        private _startTime: number = null;
        private _tick: number;

        //state
        private _isPlaying: bool;
        private _playPending: bool = false;

        //signals
        public onStop: Kiwi.Signal;
        public onPlay: Kiwi.Signal;
        public onUpdate: Kiwi.Signal;
        public onLoop: Kiwi.Signal;

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
            this.currentCell = this._frameIndex;
            this.onPlay.dispatch();
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
            this.onStop.dispatch();
        }

        public update(): bool {
            if (this._isPlaying) {

                if (this.clock.elapsed() >= this._tick) {

                    this._tick = this.clock.elapsed() + this._speed;
                    this._frameIndex++;
                    this.onUpdate.dispatch();

                    if (!this._validateFrame(this._frameIndex)) {

                        if (this._loop) {
                            this._frameIndex = 0;
                        } else {
                            this._frameIndex--;
                            this.stop();
                        }
                        this.onLoop.dispatch();
                    }

                    this.currentCell = this._frameIndex;

                    return true;
                }
            }
            return false;
        }

        private _validateFrame(frame: number) {
            return (frame < this._sequence.cells.length && frame >= 0);

        }

    }
}