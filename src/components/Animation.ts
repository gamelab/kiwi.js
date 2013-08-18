/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Animation
 *
 *	@desc		Description
 *
 *	@version	1.0 - 16 August 2013
 *				
 *	@author 	Ben Harding
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components {

    export class Animation extends Component {

        /*
        *
        * @constructor
        * @param {Kiwi.Entity} entity
        * @return {Kiwi.Components.Animation}
        */
        constructor(entity: Kiwi.Entity) {
            super('Animation');

            //get the entity and the animation.
            this.entity = entity;
            this._atlas = this.entity.atlas;
            this._animations = {};

            //create all of the default animations.
            for (var i = 0; i < this._atlas.sequences.length; i++) {
                this.createFromSequence(this._atlas.sequences[i], false);
            }

            //create a default animation.
            this.currentAnimation = this.add('first', [this._atlas.cellIndex], 0, false, false); 
            
        }

        /*
        * The texture atlas that this animation is taking affect on.
        * @property _atlas
        * @type Kiwi.Textures.TextureAtlas
        */
        private _atlas: Kiwi.Textures.TextureAtlas;
        
        /*
        * A dictionary containing all of the animations that are avaiable.
        * @property _animations
        */
        private _animations: {};
    
        /*
        * A reference to the animation that is currently being played.
        * @property _currentAnimation
        * @type Kiwi.Animation
        */
        public currentAnimation: Kiwi.Animation = null;

        /*
        * Indicates weither or not this animation is currently playing or not.
        * @property _isPlaying
        * @type bool
        */
        private _isPlaying: bool = false;
        
        /*
        * Returns a boolean indicating weither or not the current animation is playing.
        * @type bool
        */
        public get isPlaying(): bool {
            return this._isPlaying;
        }

        /*
        * The clock that this animation uses.
        * @property _clock
        * @type Kiwi.Time.Clock
        */
        private _clock: Kiwi.Time.Clock = null;
        
        /*
        * Set the clock.
        * @type Kiwi.Time.Clock
        */
        public set clock(clock: Kiwi.Time.Clock) {

            if(this.clock == null) this.currentAnimation.clock = clock;
            
            this._clock = clock;
        }

        /*
        * Returns the clock that is being used.
        * @type Kiwi.Time.Clock
        */
        public get clock():Kiwi.Time.Clock {
            return this._clock;
        }
        
        /*
        * The type of object that this is.
        * @method objType
        * @type string
        */
        public objType() {
            return "Animation";
        }

        /*
        * Creates a new sequence that can then be used to play. Returns that animation that was created.
        *
        * @method add
        * @param {string} name
        * @param {number[]} cells - An array that contains a reference to the cells that are to be played in the animation. 
        * @param {number} speed
        * @param {boolean} loop
        * @param {boolean} play - If once created the animation should play right away.
        * @return {Kiwi.Animation }
        */
        public add(name: string, cells: number[], speed: number, loop: boolean= false, play: boolean= false): Kiwi.Animation {
            var newSequence = new Kiwi.Sequence(name, cells, speed, loop);
            this._atlas.sequences.push(newSequence);
            
            return this.createFromSequence(newSequence, play);
        }

        /*
        * Creates a new animation based of a sequence. Returns that animation that was created.
        *
        * @method createFromSequence
        * @param {Kiwi.Sequence} sequence
        * @param {boolean} play - If the animation should play once it has been created
        * @return {Kiwi.Animation}
        */
        public createFromSequence(sequence: Kiwi.Sequence, play: boolean= false):Kiwi.Animation {
            
            this._animations[sequence.name] = new Kiwi.Animation(sequence.name, sequence, this.clock);

            if (play) this.play(sequence.name);
            
            return this._animations[sequence.name];
        }

        /*
        * Plays either the current animation or the name of the animation that you pass.
        * 
        * @method play
        * @param {string} name - defaults to the current animation
        */
        public play(name: string = this.currentAnimation.name) {

            this._play(0, name);
        }
        
        /*
        * Play an animation at a particular frameIndex. 
        * 
        * @method playAt
        * @param {Number} index
        * @param {String} name - defaults to the current animation
        */        
        public playAt(index: number, name: string = this.currentAnimation.name) {

            this._play(index, name);
        } 

        /*
        *  An internal method used to actually play the animation.
        * 
        * @method _play
        * @param {number} index
        * @param {string} name
        */
        private _play(index: number, name: string) {
            
            this._isPlaying = true;
            this._setCurrentAnimation(name);
            if (this._clock !== null) this.currentAnimation.clock = this._clock; 
            
            this.currentAnimation.playAt(index);
            this._setCellIndex();

        }

        /*
        * Stops the current animation from playing.
        *
        * @method stop
        */
        public stop() {
            if (this.isPlaying === true) {
                this.currentAnimation.stop();
            }
            this._isPlaying = false;
        }

        /*
        * Pauses the current animation.
        * @method pause
        */ 
        public pause() {
            this.currentAnimation.pause();
            this._isPlaying = false;
        }

        /*
        * Resumes the current animation. The animation should have already been paused.
        * @method resume
        */
        public resume() {
            this.currentAnimation.resume();
            this._isPlaying = true;
        }

        /*
        * Switches to animation that you pass. 
        * You can say weither to play the animation when it has switched otherwise it just goes off what is currently happening
        *
        * @method switchTo
        * @param {string} name
        * @param {bool} play
        */
        public switchTo(name: string, play:bool=null) { 
            if (this.currentAnimation.name !== name) {
                this._setCurrentAnimation(name);
            }

            if (play || play === null && this.isPlaying) this.play();
            if (play == false && this.isPlaying) this.isPlaying = false;
        }

        /*
        * Internal method that sets the current animation to the animation passed.
        *
        * @method _setCurrentAnimation
        * @param {string} name
        */
        private _setCurrentAnimation(name: string) {

            if(this.currentAnimation !== null) this.currentAnimation.stop();
            this.currentAnimation = this._animations[name];
    
        }

        /*
        * The update loop, it only updates the currentAnimation and only if it is playing.
        * @method update 
        */
        public update() {

            if (this.currentAnimation && this.isPlaying) {
                if (this.currentAnimation.update()) {
                    this._setCellIndex();
                }
            }
        }
        
        /*
        * Gets the current cell that the current animation is up to.
        * @type number
        */
        public get currentCell():number {
            return this.currentAnimation.currentCell;
        }

        /*
        * Gets the current frame index that the current animation is up to.
        * @type number
        */
        public get frameIndex():number {
            return this.currentAnimation.frameIndex;
        }

        /*
        * Get a animation that is on the animation component. 
        * 
        * @method getAnimation
        * @param {string} name
        * @return {Kiwi.Animation} 
        */
        public getAnimation(name: string):Kiwi.Animation {
            return this._animations[name];
        }
        
        /*
        * An internal method that is used to set the cell index of the entity. This is how the animation changes.
        * @method _setCellIndex
        */
        private _setCellIndex() {
            this.entity.cellIndex = this.currentCell;
        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public get toString(): string {

            return '[{Animation (x=' + this.active + ')}]';

        }

    }

}


