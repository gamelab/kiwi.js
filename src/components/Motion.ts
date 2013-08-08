/// <reference path="../core/Component.ts" />
/// <reference path="motions/LinearMotion.ts" />

/*
 *	Kiwi - Components - Motion
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

module Kiwi.Components {

    export class Motion extends Component {

        //constructor(clock: Kiwi.Time.Clock, position: Kiwi.Components.Position) {
        constructor(position: Kiwi.Components.Position) {

            super('Motion');

            //this._entity = entity;
            this._clock = null;
            this._position = position;
            this._motions = [];
            //this._currentMotion = null;

            //this._positionStart = new Kiwi.Geom.Point();
            //this._positionEnd = new Kiwi.Geom.Point();

        }

        public objType() {
            return "Motion";
        }

        //  Need a way for it to identify itself as a linear motion - could have rotation, scale, etc in here as well
        private _motions = [];
        //private _currentMotion;

        private _clock: Kiwi.Time.Clock;
        private _entity: Kiwi.Entity;
        private _position: Kiwi.Components.Position;

        public setClock(clock: Kiwi.Time.Clock) {

            this._clock = clock;

            for (var i = 0; i < this._motions.length; i++)
            {
                if (this._motions[i].delay > 0)
                {
                    this._motions[i].onStarted.add(this._motionStarted, this);
                }

                this._motions[i].onCompleted.add(this._motionCompleted, this);
                this._motions[i].start(this._clock.elapsed(), this._clock.units);
                klog.info('motion started from setClock');
            }

            //if (this._currentMotion !== null)
            //{
            //    this._currentMotion.start(this._clock.elapsed());
            //}

        }

        private _motionCompleted(motionObject) {

            var i = this._motions.indexOf(motionObject);

            if (i !== -1)
            {
                this._motions.splice(i, 1);
            }

        }

        private _motionStarted(motionObject) {

            motionObject.refreshXY(this._position.x(), this._position.y());

        }

        public move(x: number, y: number, duration: number = 1000, delay: number = 0, ease = Kiwi.Tweens.Easing.Linear.None) {

            klog.info('motion move');

            //this._addMotion(new Kiwi.Components.Motions.LinearMotion(this._position.x(), this._position.y(), x, y, duration, delay, ease));

            var temp = new Kiwi.Components.Motions.LinearMotion(this._position.x(), this._position.y(), x, y, duration, delay, ease);
            
            this._motions.push(temp);

            if (this._clock)
            {
                if (delay > 0)
                {
                    temp.onStarted.add(this._motionStarted, this);
                }

                temp.onCompleted.add(this._motionCompleted, this);
                temp.start(this._clock.elapsed(), this._clock.units);
                klog.info('motion started from move');
            }

        }

        public update() {

            if (this._clock)
            {
                for (var i = 0; i < this._motions.length; i++)
                {
                    if (this._motions[i].update(this._clock.elapsed()) === true)
                    {
        	            this._position.setTo(this._motions[i].mx, this._motions[i].my);
                    }
                }

                //if (this._currentMotion !== null)
                //{
                //    this._currentMotion.update(this._clock.elapsed());

    	        //    this._position.setTo(this._currentMotion.mx, this._currentMotion.my);
                //}
            }

        }

        /*
        private _positionStart: Kiwi.Geom.Point;
        private _positionEnd: Kiwi.Geom.Point;
        private _duration: number;
        private _startTime: number;
        private _elapsed: number;
	    private _easingFunction = Kiwi.Tweens.Easing.Linear.None;
	    private _interpolationFunction = Kiwi.Utils.GameMath.linearInterpolation;

        public isMoving: bool = false;

        public moveTo(x: number, y: number, duration?: number = 1000, delay?: number = 0, ease? = Kiwi.Tweens.Easing.Linear.None) {

            if (this.isMoving === true)
            {
                //  Do something?
            }

            this._elapsed = 0;
	        this._duration = duration;

	        this._positionStart.setTo(this._position.x(), this._position.y());
	        this._positionEnd.setTo(x - this._positionStart.x, y - this._positionStart.y);

	        this._startTime = Kiwi.now + delay;
	        this._easingFunction = ease;
	        this.isMoving = true;

        }

        public update() {

	        if (Kiwi.now < this._startTime || this.isMoving === false)
	        {
	            return true;
	        }

	        this._elapsed = (Kiwi.now - this._startTime) / this._duration;

	        this._elapsed = this._elapsed > 1 ? 1 : this._elapsed;

	        var value = this._easingFunction(this._elapsed);

	        this._position.setTo(this._positionStart.x + (this._positionEnd.x * value), this._positionStart.y + (this._positionEnd.y * value));

	        if (this._elapsed === 1)
	        {
	            this.isMoving = false;
	        }

        }
        */

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Motion (x=' + ')}]';

        }

    }

}


