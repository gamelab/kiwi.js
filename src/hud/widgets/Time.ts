/// <reference path="Textfield.ts" />

module Kiwi.HUD {

    export class Time extends Kiwi.HUD.TextField {

        constructor(format,x,y) {
            super('time', x, y);

            this.time = this.components.add(new Kiwi.Components.Time(0));

            this.format(format);
            this.updateTime();
        }
        
        private _format: string;

        public time: Kiwi.Components.Time;

        public setTime(milliseconds: number, seconds?: number, minutes?: number, hours?: number) {
            this.time.setTime(milliseconds, seconds, minutes, hours);

            this.text(this.updateTime());
        }

        //formats the time
        public format(val?: string):string {
            if (val !== undefined) {
                this._format = val;
            }
            return this._format;
        }

        public updateTime():string {
            var ms = String(this.time.milliseconds());
            var s = String(this.time.seconds());
            var m = String(this.time.minutes());
            var h = String(this.time.hours());

            if (s.length < 2) var ss = '0' + s; else var ss = s;
            if (m.length < 2) var mm = '0' + m; else var mm = m;
            if (h.length < 2) var hh = '0' + h; else var hh = h;

            var time = this._format;    //none regexp functions would be better 
            time = time.replace('ms', ms);  //milliseconds

            time = time.replace('ss', ss);  //leading zeros
            time = time.replace('mm', mm);
            time = time.replace('hh', hh);
            time = time.replace('s', s);    //without leading zeros
            time = time.replace('m', m);
            time = time.replace('h', h);

            return time;
        }

        update() {
            if (!this.time.paused) this.text(this.updateTime());

            super.update();
        }

    }

}