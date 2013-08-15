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

            this.entity = entity;
            this._atlas = this.entity.atlas;
            this._animations = {};

            //create all of the default animations.
            for (var i = 0; i < this._atlas.sequences.length; i++) {
                this.createFromSequence(this._atlas.sequences[i], false);
            }

            //create animation
            this.currentAnimation = this.add('default', [this._atlas.cellIndex], 0, false, false); 
            
        }

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
        * Adds a new animation and creates a sequence.
        */
        public add(name: string, cells: number[], speed: number, loop: boolean= false, play: boolean= false): Kiwi.Animation {
            var newSequence = new Kiwi.Sequence(name, cells, speed, loop);
            this._atlas.sequences.push(newSequence);
            
            return this.createFromSequence(newSequence, play);
        }

        /*
        * Creates a new animation from a sequence. This is the method
        */
        public createFromSequence(sequence: Kiwi.Sequence, play: boolean= false):Kiwi.Animation {
            
            this._animations[sequence.name] = new Kiwi.Animation(sequence.name, this._atlas, sequence, this.clock);

            if (play) this.play(sequence.name);
            
            return this._animations[sequence.name];
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

        public pause() {
            this.currentAnimation.pause();
            this.isPlaying = false;
        }

        public resume() {
            this.currentAnimation.resume();
            this.isPlaying = true;
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

        public get currentCell():number {
            return this.currentAnimation.currentCell;
        }

        public get frameIndex():number {
            return this.currentAnimation.frameIndex;
        }

        public getAnimation(name: string):Kiwi.Animation {
            return this._animations[name];
        }

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


