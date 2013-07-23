

module Kiwi.Components {

    export class Time extends Kiwi.Component {

        constructor(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {
            super("time", true, true, true);
            
            this.paused = true;
            this._countDown = true;
            
            this._lastTime = Date.now();
            this.setTime(milliseconds, seconds, minutes, hours);
        }
        
        private _milliseconds: number;

        public paused: boolean;

        private _lastTime: number;

        private _countDown: boolean;

        public countingDown(val?:boolean) {
            if (val !== undefined) {
                if (val == true) this.paused = false;
                
                this._countDown = val;
            }
            return this._countDown;
        }

        public countingUp(val?: boolean) {
            if (val !== undefined) {
                if (val == true) this.paused = false;

                this._countDown = !val;
            } 
            return !this._countDown;
        }

        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {

            if (seconds !== undefined) milliseconds += this.convertToMilli(seconds, 's');
            if (minutes !== undefined) milliseconds += this.convertToMilli(minutes, 'm');
            if (hours !== undefined) milliseconds += this.convertToMilli(hours, 'h');

            this._milliseconds = milliseconds;

            return this._milliseconds;
        }

        public convertToMilli(val: number, unit: string) {

            var num = 0;

            if (unit === 'milli' || unit === 'milliseconds' || unit === 'ms') {
                num = val;
            } else if (unit === 'seconds' || unit === 's') {
                num = val * 1000;
            } else if (unit === 'minutes' || unit === 'm') {
                num = val * 1000 * 60;
            } else if (unit === 'hours' || unit === 'h') {
                num = val * 1000 * 60 * 60;
            }

            return num;
        }

        public milliseconds(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = val;
            }
            return this._milliseconds;
        }

        public seconds(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 's');
            }
            return Math.floor(this._milliseconds / 1000) % 60;
        }

        public minutes(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'm');
            }
            return Math.floor(this._milliseconds / 1000 / 60) % 60;
        }

        public hours(val?: number):number {
            if (val !== undefined) {
                this._milliseconds = this.convertToMilli(val, 'h');
            }
            return Math.floor(this._milliseconds / 1000 / 60 / 60);
        }

        public update() {
            
            if (!this.paused) {

                var newTime = Date.now();
                var difference = newTime - this._lastTime;
                this._lastTime = newTime;

                if (this._countDown) {
                    this.milliseconds(this._milliseconds - difference);
                } else {
                    this.milliseconds(this._milliseconds + difference);
                }
            }

            super.update();
        }

    }
}