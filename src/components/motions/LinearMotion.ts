/// <reference path="../../core/Component.ts" />

/*
 *	Kiwi - Components - Motions - LinearMotion
 *
 *	@desc		Description
 *
 *	@version	1.0 - 18th March 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.Motions {

    export class LinearMotion {

        constructor(sx: number, sy: number, ex: number, ey: number, duration: number, delay: number, ease) {

            this.sx = sx;
            this.sy = sy;
            //this.ex = ex - sx;
            //this.ey = ey - sy;
            this.ex = ex;
            this.ey = ey;
            this.duration = duration;
            this.delay = delay;
            this.ease = ease;
            this.running = false;

            this.onStarted = new Kiwi.Signal();
            this.onCompleted = new Kiwi.Signal();

        }

        public objType() {
            return "LinerMotion";
        }

        //  Starting coordinates
        public sx: number;
        public sy: number;

        //  Mid-point coordinates
        public mx: number = 0;
        public my: number = 0;

        //  Ending coordinates
        public ex: number;
        public ey: number;

        public ease;
        public delay: number;
        public duration: number;
        public elapsed: number;
        public startTime: number;
        public running: bool;

        public onStarted: Kiwi.Signal;
        public onCompleted: Kiwi.Signal;

        public value: number;

        public refreshXY(x: number, y: number) {

            this.sx = x;
            this.sy = y;

        }

        public start(time, units) {

            this.startTime = time + (this.delay / units);
            this.duration = this.duration / units;

            klog.info('motion will start at ' + this.startTime + ' current: ' + time + ' units: ' + units);

        }

        public update(time:number): bool {

            if (time < this.startTime)
            {
                return false;
            }
            else
            {
                if (this.running === false)
                {
                    this.running = true;
                    this.onStarted.dispatch(this);
                    this.ex = this.ex - this.sx;
                    this.ey = this.ey - this.sy;
                }
            }

            this.elapsed = (time - this.startTime) / this.duration;

            if (this.elapsed >= 1)
            {
                this.elapsed = 1;
                this.mx = this.ex;
                this.my = this.ey;
                this.onCompleted.dispatch(this);
                return false;
            }
            else
            {
                this.value = this.ease(this.elapsed);
                this.mx = this.sx + (this.ex * this.value);
                this.my = this.sy + (this.ey * this.value);
                return true;
            }

        }

    }

}
