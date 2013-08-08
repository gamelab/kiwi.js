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

            super('Animation', true, true, true);

            this.updated = new Kiwi.Signal();
            this._entity = entity;
            this._animations = {};

            var texture: Kiwi.Components.Texture = this._entity.components.getComponent('Texture');

            if (texture.file !== null && (texture.file.dataType === Kiwi.File.SPRITE_SHEET || texture.file.dataType === Kiwi.File.TEXTURE_ATLAS))
            {
                this._animations['default'] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), 0, 0);
                this.currentAnimation = this._animations['default'];

            } else {
                return;
            }
        }

        /*
        * The entity that this animation component belongs to 
        * @private
        */
        private _entity: Kiwi.Entity;
        
        /*
        * A Kiwi.Signal that dispatches an event when the texture's position should change.
        * Also dispatches the new coordinates it should change to.
        */
        public updated: Kiwi.Signal;

        /*
        * An associactive array of all of the animations that this component has.
        * @private
        */
        private _animations;

        /*
        * A reference to the current animation that is playing.
        * @public
        */
        public currentAnimation: Kiwi.Anims.Animation = null;

        /*
        * Boolean that knows weither the animation is playing or not.
        * @public
        */
        public isPlaying: bool = false;

        /*
        * Holds the clock that is used for animations.
        * @private
        */
        private _clock: Kiwi.Time.Clock = null;

        /*
        * Sets the clock that the animations will use. 
        *
        * @method clock
        * @param {Kiwi.Time.Clock}
        */
        public clock(clock: Kiwi.Time.Clock) {
            this._clock = clock;
            this.currentAnimation.clock(clock);
        }

        /*
        * The type of object this is.
        * @method objType
        */
        public objType() {
            return "Animation";
        }

        /*
        * Kiwi.Signal callback which runs when an animation has updated.
        *
        * @method _updatedAnimationFrame
        * @param {number} x
        * @param {number} y
        */
        private _updatedAnimationFrame(x:number, y:number) {
            this.updated.dispatch(x, y);
        }

        /*
        * Adds a new animation to the component
        *
        * @method add
        * @param {string} name
        * @param {number} speed
        * @param {number[]} frames
        * @param {number} repeat
        */
        public add(name: string, speed: number, frames: number[] = null, repeat: number = Kiwi.Anims.PLAY_LOOP) {

            var texture: Kiwi.Components.Texture = this._entity.components.getComponent('Texture');
            
            if (frames === null) {
                this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), speed, repeat);
            } else {
                this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getFrames(frames), speed, repeat);
            }

            this._animations[name].updated.add(this._updatedAnimationFrame, this);

            if(this.currentAnimation === this._animations['default']) 
            this.currentAnimation = this._animations[name];
        }

        /*
        * Plays the current animation or otherwise the animation you pass to it.
        *
        * @method play
        * @param {string} name
        */
        public play(name: string = null) {

            this.isPlaying = true;
            if (name !== null) {
                this._setCurrentAnimation(name);

            } else {
                if (this._clock !== null) this.currentAnimation.clock(this._clock); 
                this.currentAnimation.play();
            }
        }
        
        /*
        * Plays the current animation or a different animation at the index you pass.
        *
        * @method playAt
        * @param {number} index
        * @param {string} name
        */
        public playAt(index: number, name: string = null) {

            this.play(name);
            this.currentAnimation.playAt(index);
        } 

        /*
        * Stops the current animation from playing.
        *
        * @method stop
        */
        public stop() {
            if (this.isPlaying === true) {
                this.isPlaying = false;
                this.currentAnimation.stop();
            }
        }

        /*
        * Gets the current frame of the active animation
        *
        * @method getFrame
        * @return {number} 
        */
        public getFrame():Kiwi.Anims.Frame {
            return this.currentAnimation.getFrame();
        }
        
        /*
        * Sets the current frame of the animation by the index
        *
        * @method setFrame
        * @param {number} value
        */
        public setFrame(index: number) {
            if (this.currentAnimation)
            {
                this.currentAnimation.setFrame(index);
            }
        }

        /*
        * Switches to the name of the animation you pass
        *
        * @method switchTo
        * @param {string} name
        */
        public switchTo(name: string) { 
            if (this.currentAnimation.name !== name) {
                this._setCurrentAnimation(name);
            }
        }

        /*
        * Sets the current animation to the animation passed.
        *
        * @method _setCurrentAnimation
        * @param {string} name
        */
        private _setCurrentAnimation(name: string) {

            this.currentAnimation.stop();
            this.currentAnimation = this._animations[name];

            if (this.isPlaying) {
                if (this._clock !== null) this.currentAnimation.clock(this._clock); 
                this.currentAnimation.play();
            }    
        }

        /*
        * The update loop, it only updates the currentAnimation
        *
        * @method update
        */
        public update() {

            if (this.currentAnimation && this.isPlaying)
            {
                this.currentAnimation.update();
            }

        }

	    /**
	     * Returns a string representation of this object.
	     * @method toString
	     * @return {string} A string representation of this object.
	     **/
        public toString(): string {

            return '[{Animation (x=' + this.active + ')}]';

        }

    }

}


