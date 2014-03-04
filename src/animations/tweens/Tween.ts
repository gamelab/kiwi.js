/**
*  
* @module Animations
* @submodule Tweens 
* 
*/
 
module Kiwi.Animations {

    /**
    * Manages the tweening of properties/values on a single object. A Tween is the animation of a number between an initially value to and final value (that you specify). 
    * Note: When using a Tween you need to make sure that the Tween has been added to a TweenManager. You can either do this by creating the Tween via the Manager or alternatively using the 'add' method on the TweenManager. Otherwise the tween will not work.
    *
    * Based on tween.js by sole. Converted to TypeScript and integrated into Kiwi.
    * https://github.com/sole/tween.js
    *
    * @class Tween
    * @constructor
    * @namespace Kiwi.Animations
    * @param object {Any} The object that this tween is taking affect on.
    * @param game {Game} The game that this tween is for.
    * @return {Tween} This tween.
    *
    * @author     sole / http://soledadpenades.com
    * @author     mrdoob / http://mrdoob.com
    * @author     Robert Eisele / http://www.xarg.org
    * @author     Philippe / http://philippe.elsass.me
    * @author     Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
    * @author     Paul Lewis / http://www.aerotwist.com/
    * @author     lechecacharro
    * @author     Josh Faul / http://jocafa.com/
    * @author     egraether / http://egraether.com/
    *
    */
    export class Tween {
 
        constructor(object, game:Kiwi.Game = null) {

            this._object = object;

            if (game !== null)
            {
                this._game = game;
                this._manager = this._game.tweens;
            }

            this.isRunning = false;

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Tween";
        }

        /** 
        * The game that this tween belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game = null;

        /** 
        * The manager that this tween belongs to. 
        * @property _manager
        * @type Manager
        * @private
        */
        private _manager: Kiwi.Animations.Tweens.TweenManager = null;

        /** 
        * The object that this tween is affecting.
        * @property _object
        * @type Any
        * @private
        */
	    private _object = null;

        /** 
        * The starting values of the properties that the tween is animating.
        * @property _valuesStart
        * @type Object
        * @private
        */
	    private _valuesStart = {};

        /** 
        * The end values of the properties that the tween is animating.
        * @property _valuesEnd
        * @type Object
        * @private
        */
	    private _valuesEnd = {};

        /** 
        * The duration of the tween, in milliseconds.
        * @property _duration
        * @type Number
        * @private
        */
	    private _duration = 1000;

        /** 
        * The amount of time to delay the tween by. In Milliseconds.
        * @property _delayTime
        * @type Number
        * @private
        */
	    private _delayTime:number = 0;

        /** 
        * The time at which the tween started.
        * @property _startTime
        * @type Number
        * @private
        */
	    private _startTime:number = null;

        /** 
        * The easing function that is to be used while tweening.
        * @property _easingFunction
        * @type Function
        * @default Kiwi.Tweens.Easing.Linear.None
        * @private
        */
        private _easingFunction = Kiwi.Animations.Tweens.Easing.Linear.None;

        /** 
        * [NEEDS DESCRIPTION]
        * @property _interpolationFunction
        * @type Function
        * @default Kiwi.Utils.Interpolation.Linear
        * @private
        */
	    private _interpolationFunction = Kiwi.Utils.GameMath.linearInterpolation;

        /** 
        * An array containing all of the tweens that are to be played when this one finishes.
        * @property _chainedTweens
        * @type Tween[]
        * @private
        */
	    private _chainedTweens = [];

        /** 
        * The method that is to be called when the tween starts playing.
        * @property _onStartCallback
        * @type Function
        * @default null
        * @private
        */
	    private _onStartCallback = null;
        
        /**
        * The context that the _onStartCallback method is to be called in. 
        * @property _onStartContext
        * @type Any
        * @default null
        * @private
        */
        private _onStartContext:any = null;

        /** 
        * A boolean indicating if the starting callback has been called or not.
        * @property _onStartCallbackFired
        * @type boolean
        * @default false
        * @private
        */
	    private _onStartCallbackFired:boolean = false;

        /** 
        * A callback method that will be called each time the tween updates.
        * @property _onUpdateCallback
        * @type Function
        * @default null
        * @private
        */
	    private _onUpdateCallback = null;
        
        /**
        * The context that the update callback has when called.
        * @property _onUpdateContext
        * @type any
        * @default null
        * @private
        */
        private _onUpdateContext:any = null;

        /** 
        * A method to be called when the tween finish's tweening.
        * @property _onCompleteCallback
        * @type function
        * @default null
        * @private
        */
	    private _onCompleteCallback = null;

        /*
        * A boolean indicating whether or not the _onCompleteCallback has been called.
        * Is reset each time you tell the tween to start.
        * @property _onCompleteCalled
        * @type boolean
        * @default false
        * @private
        */
	    private _onCompleteCalled: boolean = false;

        /** 
        * The context that the onCompleteCallback should have when called.
        * @property _onCompleteContext
        * @type any
        * @default null
        * @private
        */
	    private _onCompleteContext: any = null;

        /**
        * An indication of whether or not this tween is currently running.
        * @property isRunning.
        * @type boolean
        * @default false
        * @public
        */
        public isRunning: boolean = false;

        /** 
        * Sets up the various properties that define this tween.
        * The ending position/properties for this tween, how long the tween should go for, easing method to use and if should start right way.
        *
        * @method to
        * @param properties {Object} The ending location of the properties that you want to tween. 
        * @param [duration=1000] {Number} The duration of the tween.
        * @param [ease=null] {Any} The easing method to be used. If not specifed then this will default to LINEAR.
        * @param [autoStart=false] {boolean} If the tween should start right away.
        * @return {Tween}
        * @public
        */
        public to(properties, duration: number = 1000, ease: any = null, autoStart: boolean = false):Tween {

	        this._duration = duration;

	        //  If properties isn't an object this will fail, sanity check it here somehow?
	        this._valuesEnd = properties;

	        if (ease !== null) {
	            this._easingFunction = ease;
	        }

	        if (autoStart === true) {
                return this.start();

	        } else {
	            return this;
	        }

	    }

        /** 
        * Gets the initial values for the properties that it is to animate and starts the tween process.
        * @method start
        * @public
        */
	    public start() {

	        if (this._game === null || this._object === null)
	        {
	            return;
	        }

	        this.isRunning = true;

	        this._manager.add(this);

            this._onStartCallbackFired = false;

            this._onCompleteCalled = false;

	        this._startTime = this._game.time.now() + this._delayTime;

	        for (var property in this._valuesEnd)
	        {
	            // This prevents the interpolation of null values or of non-existing properties
	            if (this._object[property] === null || !(property in this._object))
	            { 
	                continue;
	            }

	            // check if an Array was provided as property value
	            if (this._valuesEnd[property] instanceof Array)
	            {
	                if (this._valuesEnd[property].length === 0)
	                {
	                    continue;
	                }
                     

	                // create a local copy of the Array with the start value at the front
	                this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);
	            }

                //  Check if property is a function
	            if (typeof this._object[property] === 'function')
	            { 
	                this._valuesStart[property] = this._object[property]();
	            }
	            else
	            { 
	                this._valuesStart[property] = this._object[property];
	            }

	        }

	        return this;

	    }

        /** 
        * Stops the Tween from running and removes it from the manager.
        * @method stop
        * @public
        */
	    public stop() {

	        if (this._manager !== null)
	        {
	            this._manager.remove(this);
	        }

	        this.isRunning = false;

	        return this;

	    }

        /** 
        * Sets the game and the manager of this tween.
        * @method setParent
        * @param {Game} value
        * @public
        */
	    public setParent(value:Kiwi.Game) {

	        this._game = value;
            this._manager = this._game.tweens;

	    }

        /** 
        * Sets the amount of delay that the tween is to have before it starts playing.
        * @method delay
        * @param amount {Number} The amount of time to delay the tween by.
        * @return {Tween}
        * @public
        */
	    public delay(amount:number):Tween {

	        this._delayTime = amount;
	        return this;

	    }

        /** 
        * Sets the easing method that is to be used when animating this tween.
        * @method easing
        * @param easing {Function} The easing function to use.
        * @return {Tween} 
        * @public
        */
	    public easing(easing):Tween {

	        this._easingFunction = easing;
	        return this;

	    }

        /** 
        * [REQUIRES DESCRIPTION]
        * @method interpolation
        * @param {Any} interpolation
        * @return {Tween}
        * @public
        */
	    public interpolation(interpolation):Tween {

	        this._interpolationFunction = interpolation;

	        return this;

	    }

        /** 
        * Adds another tween that should start playing once tween has completed.
        * @method chain
        * @param tween {Tween}
        * @return {Tween}
        * @public
        */
	    public chain(tween:Kiwi.Animations.Tween):Tween {

	        this._chainedTweens.push(tween);
	        return this;

	    }

        /** 
        * Adds a function that is to be executed when the tween start playing.
        * @method onStart
        * @param callback {Function} The function that is to be executed on tween start.
        * @param context {any} The context that function is to have when called.
        * @return {Tween}
        * @public
        */
	    public onStart(callback, context):Tween {

	        this._onStartCallback = callback;
            this._onStartContext = context;
            return this;

	    }

        /** 
        * Adds a function that is to be executed when this tween updates while it is playing.
        * @method onUpdate
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
	    public onUpdate(callback, context) {

            this._onUpdateCallback = callback;
            this._onUpdateContext = context;
	        return this;

	    }

        /** 
        * Defines a method that is to be called when this tween is finished.
        * @method onComplete
        * @param callback {Function} The method that is to be executed.
        * @param context {Any} The context the method is to have when called.
        * @public
        */
	    public onComplete(callback, context) {

	        this._onCompleteCallback = callback;
	        this._onCompleteContext = context;

	        return this;

	    }

        /** 
        * The update loop is executed every frame whilst the tween is running.
        * @method update
        * @param time {Number}
        * @public
        */
	    public update(time) {

	        if (time < this._startTime)
	        {
	            return true;
	        }

	        if (this._onStartCallbackFired === false)
	        {
	            if (this._onStartCallback !== null)
	            {
	                this._onStartCallback.call(this._onStartContext, this._object);
	            }

	            this._onStartCallbackFired = true;
	        }

	        var elapsed = (time - this._startTime) / this._duration;
	        elapsed = elapsed > 1 ? 1 : elapsed;

	        var value = this._easingFunction(elapsed);

	        for (var property in this._valuesStart)
	        {
	            var start = this._valuesStart[property];
	            var end = this._valuesEnd[property];

                //  Add checks for object, array, numeric up front
	            if (end instanceof Array)
	            {
	                this._object[property] = this._interpolationFunction(end, value);
	            }
                else
	            {
	                if (typeof this._object[property] === 'function')
	                {
    	                this._object[property](start + (end - start) * value); 
	                }
	                else
	                {
    	                this._object[property] = start + (end - start) * value;
	                }
	            }
	        }

	        if (this._onUpdateCallback !== null)
	        {
	            this._onUpdateCallback.call(this._onUpdateContext, this._object, value);
	        }

	        if (elapsed == 1)
	        {
    	        this.isRunning = false;

	            if (this._onCompleteCallback !== null && this._onCompleteCalled == false)
	            {
	                this._onCompleteCalled = true;
	                this._onCompleteCallback.call(this._onCompleteContext, this._object);
	            }

	            for (var i = 0; i < this._chainedTweens.length; i++)
	            {
	                this._chainedTweens[i].start();
	            }

	            return false;

	        }

	        return true;

	    }

    }
}
