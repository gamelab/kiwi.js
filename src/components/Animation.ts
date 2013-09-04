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
            super(entity, 'Animation');

            //get the entity and the animation.
            this.entity = entity;
            this._atlas = this.entity.atlas; 
            this._animations = {};

            //create all of the default animations.
            for (var i = 0; i < this._atlas.sequences.length; i++) {
                this.createFromSequence(this._atlas.sequences[i], false);
            }

            //if a default animation already exists
            if (this._animations['default']) {
                this.currentAnimation = this._animations['default'];
            //otherwise create one.
            } else {
                var defaultCells = [];
                for (var i = 0; i < this._atlas.cells.length; i++) {
                    defaultCells.push(i);
                }
                this.currentAnimation = this.add('default', defaultCells, 0.1, true, false);
            }
        }

        /*
        * The entity that this animation belongs to.
        * @property entity
        * @type Kiwi.Entity
        */
        private entity: Kiwi.Entity;

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
        public currentAnimation: Kiwi.Animation.Anim = null;

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
        public add(name: string, cells: number[], speed: number, loop: boolean= false, play: boolean= false): Kiwi.Animation.Anim {
            var newSequence = new Kiwi.Animation.Sequence(name, cells, speed, loop);
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
        public createFromSequence(sequence: Kiwi.Animation.Sequence, play: boolean= false): Kiwi.Animation.Anim {
            this._animations[sequence.name] = new Kiwi.Animation.Anim(sequence.name, sequence, this.entity.clock);

            if (play) this.play(sequence.name);
            
            return this._animations[sequence.name];
        }

        /*
        * Plays either the current animation or the name of the animation that you pass.
        * 
        * @method play
        * @param {string} name - defaults to the current animation
        */
        public play(name: string = this.currentAnimation.name):Kiwi.Animation.Anim {

            return this._play(name);
        }
        
        /*
        * Play an animation at a particular frameIndex. 
        * 
        * @method playAt
        * @param {Number} index
        * @param {String} name - defaults to the current animation
        */        
        public playAt(index: number, name: string = this.currentAnimation.name):Kiwi.Animation.Anim {
            
            return this._play(name, index);
        } 

        /*
        *  An internal method used to actually play the animation.
        * 
        * @method _play
        * @param {number} index
        * @param {string} name
        */
        private _play(name: string, index: number=null): Kiwi.Animation.Anim {
            
            this._isPlaying = true;
            this._setCurrentAnimation(name); 
            
            if (index !== null)
                this.currentAnimation.playAt(index);
            else
                this.currentAnimation.play();
            
            this._setCellIndex();

            return this.currentAnimation;
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
        public switchTo(val: any, play:bool=null) { 
            switch (typeof val) {
                case "string":
                    if (this.currentAnimation.name !== val) {
                        this._setCurrentAnimation(val);
                    }
                    break;
                case "number":
                    this.currentAnimation.frameIndex = val;
                    break;
            }

            if (play || play === null && this.isPlaying) this.play();
            if (play == false && this.isPlaying) this.stop();

            this._setCellIndex();
        }

        /*
        * Makes the current animation go to the next frame. If the animation is at the end of the sequence it then goes back to the start.
        * @method nextFrame
        */
        public nextFrame() {
            this.currentAnimation.nextFrame();
            this._setCellIndex();
        }
        
        /*
        * Makes the current animation go to the prev frame. If the animation is at the start, the animation will go the end of the sequence.
        * @method prevFrame
        */
        public prevFrame() {
            this.currentAnimation.prevFrame();
            this._setCellIndex();
        }

        /*
        * Internal method that sets the current animation to the animation passed.
        *
        * @method _setCurrentAnimation
        * @param {string} name
        */
        private _setCurrentAnimation(name: string) {

            if (this.currentAnimation !== null) this.currentAnimation.stop();
            if (this._animations[name]) {
                this.currentAnimation = this._animations[name]; 
            }  
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
        * Returns the length of the current animation that is playing.
        * @type number
        */
        public get length(): number {
            return this.currentAnimation.length;
        }

        /*
        * Get a animation that is on the animation component. 
        * 
        * @method getAnimation
        * @param {string} name
        * @return {Kiwi.Animation} 
        */
        public getAnimation(name: string): Kiwi.Animation.Anim {
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


