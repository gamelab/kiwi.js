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


        constructor(entity: Kiwi.Entity) {

            super('Animation', true, true, true);

            //  Signals
            this.updated = new Kiwi.Signal();

            //  Properties
            this._entity = entity;

            this._animations = {};

            var texture: Kiwi.Components.Texture = this._entity.components.getComponent('Texture');

            if (texture.file !== null && (texture.file.dataType === Kiwi.File.SPRITE_SHEET || texture.file.dataType === Kiwi.File.TEXTURE_ATLAS))
            {
                this._animations['default'] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), 0, 0);

                this.currentAnimation = this._animations['default'];

                //console.log(this.currentAnimation);
            }
            else
            {
                return;
            }

        }

        private _entity: Kiwi.Entity;

        private _animations;

        public currentAnimation: Kiwi.Anims.Animation = null;

        public isPlaying: bool = false;

        public objType() {
            return "Animation";
        }

        public setFrame(value: number) {

            if (this.currentAnimation)
            {
                this.currentAnimation.setFrame(value);
            }

        }

        //  Add in: data?: Kiwi.Anims.FrameData = null
        public add(name: string, speed: number, frames: number[] = null, repeat: number = Kiwi.Anims.PLAY_LOOP) {

            //console.log('Add new animation', name, speed, frames, repeat);

            var texture: Kiwi.Components.Texture = this._entity.components.getComponent('Texture');
            
            if (frames === null)
            {
                this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getAllFrames(), speed, repeat);
            }
            else
            {
                this._animations[name] = new Kiwi.Anims.Animation(name, texture.file, texture.file.frames.getFrames(frames), speed, repeat);
            }

            this.currentAnimation = this._animations[name];

        }

        public play(name: string) {

            //console.log('Play animation', name);
            
            this.isPlaying = true;

            this.currentAnimation = this._animations[name];

            this._animations[name].play();

        }

        public switchTo(name: string) {

            if (!(this.currentAnimation.name == name)) {

                //console.log('Switching animation from ', this.currentAnimation.name, ' to ', name);

                this.currentAnimation.stop();

                this.play(name);
            }

        }

        public update() {

            if (this.currentAnimation)
            {
                this.currentAnimation.update();
            }

        }

        //  This string contains the CSS needed for this component (if any) to avoid constant string re-generation
        public cssExampleProperty: string;

        //  Subscribe to this Signal to receive position updates
        public updated: Kiwi.Signal;

        //  If the component deals with setting the style value of a DOM object then use this method to add a style to the update queue
        public addStyleUpdates(entity: Kiwi.Entity) {

            if (entity === null)
            {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D)
            {
                //  Apply the advanced CSS here, if any
                entity.addStyleUpdate('-webkit-super-thingy', this.cssExampleProperty);
            }
            else
            {
                //  Otherwise a normal style update is fine :)
                entity.addStyleUpdate('less-super', this.cssExampleProperty);
            }

        }

        //  Sometimes you need to set the style immediately rather than defering it to the next update loop, if so use this method
        public addStyleImmediately(entity: Kiwi.Entity) {

            if (entity.domElement === null || entity.domElement.element === null)
            {
                return;
            }

            //  Optional device check for advanced CSS3 stuff
            if (Kiwi.DEVICE.css3D)
            {
                //  Apply the advanced CSS here, if any
                entity.domElement.element.style.transform = this.cssExampleProperty;
            }
            else
            {
                //  Otherwise a normal style update is fine :)
                entity.domElement.element.style.left = this.cssExampleProperty;
            }

        }

        private _processUpdate() {

            //  Process the properties first

            //  Then store the updated css string, if any
            //this.cssExampleProperty = 'translate3d(' + this._x + 'px)';

            //  Set the component to be dirty
            this.dirty = true;

            //  And finally dispatch the update signal, passing in as many (or as few) parameters as you wish
            //this.updated.dispatch(this._x, this.cssExampleProperty);

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


