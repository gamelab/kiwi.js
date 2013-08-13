/// <reference path="../core/Component.ts" />

/*
 *	Kiwi - Components - Animation
 *
 *	@desc		Description
 *
 *	@version	1.0 - 22nd March 2013
 *				
 *	@author 	Richard Davey
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
        */
        constructor(entity: Kiwi.Entity) {

            super('Animation');

            this._entity = entity;
            this._animations = {};

            this._atlas = this._entity.atlas;

            //create animation
            this.add('default', [this._atlas.cellIndex], 0, false, true); 
        }

        private _entity: Kiwi.Entity;

        private _atlas: Kiwi.Textures.TextureAtlas;
        
        private _animations: {};

        public currentAnimation: Kiwi.Animation = null;

        public isPlaying: bool = false;

        private _clock: Kiwi.Time.Clock = null;

        public set clock(clock: Kiwi.Time.Clock) {
            if(this.clock == null) this.currentAnimation.clock = clock;
            
            this._clock = clock;
        }

        public get clock():Kiwi.Time.Clock {
            return this._clock;
        }

        public objType() {
            return "Animation";
        }

        /*
        * Adds a new animation.
        */
        public add(name: string, cells: number[], speed: number, loop: boolean=false, play:boolean=false) {
            var newSequence = new Kiwi.Sequence(name, cells);
            this._atlas.sequences.push(newSequence);
            this.createFromSequence(newSequence, speed, loop, play);

        }

        /*
        * Creates a new animation from a sequence. This is the method
        */
        public createFromSequence(sequence: Sequence, speed: number, loop: boolean, play: boolean= false) {
            
            this._animations[sequence.name] = new Kiwi.Animation(sequence.name, this._atlas, sequence, speed, loop, this.clock);
            
            if (play) this.play(sequence.name);
        }

        public play(name: string = this.currentAnimation.name) {

            this._play(0, name);
        }
        
        public playAt(index: number, name: string = this.currentAnimation.name) {

            this._play(index, name);
        } 

        private _play(index: number, name: string) {
            this.isPlaying = true;
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
            this.isPlaying = false;
        }

        /*
        * Switches to the name of the animation you pass
        *
        * @method switchTo
        * @param {string} name
        */
        public switchTo(name: string, play:bool=false) { 
            if (this.currentAnimation.name !== name) {
                this._setCurrentAnimation(name);
            }

            if (play) this.play();

            if (play == false && this.isPlaying) this.isPlaying = false;
        }

        /*
        * Sets the current animation to the animation passed.
        *
        * @method _setCurrentAnimation
        * @param {string} name
        */
        private _setCurrentAnimation(name: string) {

            if(this.currentAnimation !== null) this.currentAnimation.stop();
            this.currentAnimation = this._animations[name];
    
        }

        /*
        * The update loop, it only updates the currentAnimation
        *
        * @method update
        */
        public update() {

            if (this.currentAnimation && this.isPlaying) {
                if (this.currentAnimation.update()) {
                    this._setCellIndex();
                }
            }

        }

        private _setCellIndex() {
            //this._entity.cellAtlas = this.currentAnimation.currentFrame;
            this._atlas.cellIndex = this.currentAnimation.currentFrame;
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


