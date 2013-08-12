
module Kiwi {


    export class Animation {

        constructor(name: string,atlas:Atlas,sequence:Sequence,speed:number,loop:boolean,clock:Kiwi.Time.Clock) {
            
            this.name = name;
            this._atlas = atlas;
            this._sequence = sequence;
            this._speed = speed;
            this._loop = loop;
            this._clock = clock;
            
            this._currentFrame = this._sequence.cells[0];

            this.onUpdate = new Kiwi.Signal();
            this.onPlay = new Kiwi.Signal();
            this.onStop = new Kiwi.Signal();
            this.onComplete = new Kiwi.Signal();
        
        
        }


        public name: string;
        
        private _atlas: Atlas;
        private _sequence: Sequence;
        private _loop: boolean;
        
        private _uniqueFrameIndex: number = null;

        private _currentFrame: number;
        public get currentFrame():number {
            return this._currentFrame;
        }
        
        //time
        private _clock: Kiwi.Time.Clock = null;
        private _speed: number;
        private _startTime: number = null;
        private _tick;

        //state
        private _isPlaying: bool;
        //private _playPendingState: bool = false;
        
        
        //signals
        public onUpdate: Kiwi.Signal;
        public onComplete: Kiwi.Signal;
        public onStop: Kiwi.Signal;
        public onPlay: Kiwi.Signal;




        private _start(index: number = 0) {
            this._startTime = this._clock.elapsed();
            this._tick = this._startTime + this._speed;
            this.currentFrame = index;
           
           // this.onUpdate.dispatch(this._frameIndex, -this.currentFrame.x, -this.currentFrame.y);
           // this.onPlay.dispatch(this._frameIndex, -this.currentFrame.x, -this.currentFrame.y);
        }

        public play() {
            this._isPlaying = true;

         
                this._start();
         
        }

        public playAt(index: number) {
            this._isPlaying = true;

            this._uniqueFrameIndex = index;
          
            this._start(index);
        
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
            //this.onStop.dispatch(this._currentFrame, -this.currentFrame.x, -this.currentFrame.y);
        }


    }
}