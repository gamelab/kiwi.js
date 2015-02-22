/**
* Component's are a snipnets of code which are designed to provide extra functionality to various objects that contain a ComponentManager. Objects do not have to have Components in order to preform their main function, but are instead provided to make common task's that you may want to do with those Objects a bit easier. For example: Some times you would like to easily listen for when a GameObject has been 'clicked'. So you can attach a 'InputComponent' to a GameObject (Sprites have them by default) which will then do hit-detector code for you. All you have to do is Subscribe to the events on the InputComponent.
*  
* @module Kiwi
* @submodule Components 
* @main Components
*/

module Kiwi.Components {

	/**
	* The AnimationManager is used to handle the creation and use of spritesheet Animations on a GameObject based on the TextureAtlas it has. 
	* If the When the AnimationManager is instantiated it will loop through all of the Sequences on the TextureAtlas of the GameObject being used and will create a new Animation for each one.
	* Now when you create a new Animation that animation will automatically be added as a new Sequence to the corresponding Texture. 
	* This way you don't need to create new Animations for a each Sprite that use's the same Texture.
	*
	* @class AnimationManager
	* @extends Kiwi.Component
	* @namespace Kiwi.Components
	* @constructor
	* @param entity {Kiwi.Entity} The entity that this animation component belongs to.
	* @param [inheritSequences=true] {Boolean} If a new Animation should be created for each Sequence on the Entities TextureAtlas it is a part of or not. 
	* @return {Kiwi.Components.AnimationManager}
	*/
	export class AnimationManager extends Component {

		constructor(entity: Kiwi.Entity, inheritSequences: boolean = true) {
			super(entity, 'Animation');

			//Get the entity and the animation.
			this.entity = entity;
			this._atlas = this.entity.atlas; 
			this._animations = {};

			//Create all of the default animations.
			if (inheritSequences == true) {

				for (var i = 0; i < this._atlas.sequences.length; i++) {
					this.createFromSequence(this._atlas.sequences[i], false);
				}

			}

			//If a default animation already exists
			if (this._animations['default']) {
				this.currentAnimation = this._animations['default'];

			//Otherwise create one.
            } else {

                var defaultCells = [];

				for (var i = 0; i < this._atlas.cells.length; i++) {
					defaultCells.push(i);
				}
                this.currentAnimation = this.add('default', defaultCells, 0.1, true, false);

			}

			//Signals
			this.onChange = new Kiwi.Signal;
			this.onPlay = new Kiwi.Signal;
			this.onStop = new Kiwi.Signal;
			this.onUpdate = new Kiwi.Signal;
		}

		/**
		* Dispatches callbacks each time an animation is told to play through this AnimationManager.
		* Functions dispatched from this signal have ONE Parameter.
		* One - The Animation object of that is now playing.
		* @property onPlay
		* @type Kiwi.Signal
		* @public
		*/
		public onPlay: Kiwi.Signal;

		/**
		* Dispatches callbacks each time an animation stops. 
		* Functions dispatched from this signal have ONE parameter.
		* One - The current animation.
		* @property onStop
		* @type Kiwi.Signal
		* @public
		*/
		public onStop: Kiwi.Signal;

		/**
		* Dispatches callbacks each time the cell of the Sprite this AnimationManager belongs to updates/changes.
		* Note: This method will be dispatching events EVERY time the cell changes, so this will include when changing/switching animations.
		* @property onUpdate
		* @type Kiwi.Signal
		* @public
		*/
		public onUpdate: Kiwi.Signal

		/**
		* Dispatches callbacks each time the current animation is switched NOT when the cells of a animation change.
		* Function's dispatched from this event have TWO parameters, 
		* One - Name of the animation switched to.
		* Two - The Animation object that is now the current.
		* @property onChange
		* @type Kiwi.Signal
		* @public
		*/
		public onChange: Kiwi.Signal;

		/**
		* The entity that this animation belongs to and thus is effecting.
		* @property entity
		* @type Kiwi.Entity
		* @public
		*/
		public entity: Kiwi.Entity;

		/**
		* The texture atlas that this animation is taking effect on.
		* The value of this should be the same as the Entity.
		* @property _atlas
		* @type Kiwi.Textures.TextureAtlas
		* @private
		*/
		private _atlas: Kiwi.Textures.TextureAtlas;

		/**
		* A Object containing all of the animations that are avaiable to be used.
		* @property _animations
		* @type Object
		* @private
		*/
		private _animations: {};

		/**
		* A reference to the animation that is currently being played.
		* @property currentAnimation
		* @type Kiwi.Animations.Animation
		* @public
		*/
		public currentAnimation: Kiwi.Animations.Animation = null;

		/**
		* Returns a boolean indicating whether or not the current animation is playing. This is READ ONLY.
		* @property isPlaying
		* @type boolean
		* @public
		*/
		public get isPlaying(): boolean {
			return this.currentAnimation.isPlaying;
		}

		/**
		* Returns a string indicating the type of object that this is.
		* @method objType
		* @return {String} "AnimationManager"
		* @public
		*/
		public objType() {
			return "AnimationManager";
		}

		/**
		* Creates a new Animation (by creating a Sequence) that can then be played on this AnimationManager. 
		* If you pass to this the name of a Animation that already exists, then the previous Animation will be overridden by this new one. 
		* Note: If the Animation you have overridden was the currentAnimation, then the previous Animation will keep playing until a different Animation is switched to.
		* By default new Animation Sequences are also added to the TextureAtlas, which can then be inherited.
		* Returns the Animation that was created.
		*
		* @method add
		* @param name {string} The name of the animation that is to be created. 
		* @param cells {Array} An array of numbers, which are reference to each cell that is to be played in the Animation in order. 
		* @param speed {number} The amount of time that each cell in the Animation should stay on screen for. In seconds.
		* @param [loop=false] {boolean} If when the Animation reaches the last frame, it should go back to the start again.
		* @param [play=false] {boolean} If once created the animation should played right away.
		* @param [addToAtlas=true] {boolean} If the new Sequence created should be added to the TextureAtlas or not.
		* @return {Kiwi.Animations.Animation} The Animation that was created.
		* @public
		*/
		public add(name: string, cells: number[], speed: number, loop: boolean= false, play: boolean= false, addToAtlas:boolean=true): Kiwi.Animations.Animation {
			var newSequence = new Kiwi.Animations.Sequence(name, cells, speed, loop);
			if(addToAtlas == true) this._atlas.sequences.push(newSequence);
			
			return this.createFromSequence(newSequence, play);
		}

		/**
		* Creates a new Animation based on a Sequence that is passed. 
		* If you pass to this the name of a Animation that already exists, then the previous Animation will be overridden by this new one. 
		* Note: If the Animation you have overridden was the currentAnimation, then the previous Animation will keep playing until a different Animation is switched to.
		* Returns the Animation that was created.
		*
		* @method createFromSequence
		* @param sequence {Kiwi.Sequence} The sequence that the Animation is based on.
		* @param [play=false] {boolean} If the Animation should played once it has been created
		* @return {Kiwi.Animations.Animation} The Animation that was created.
		* @public
		*/
		public createFromSequence(sequence: Kiwi.Animations.Sequence, play: boolean= false): Kiwi.Animations.Animation {
			this._animations[sequence.name] = new Kiwi.Animations.Animation(sequence.name, sequence, null, this);

			if (play) this.play(sequence.name);
			
			return this._animations[sequence.name];
		}

		/**
		* Plays either the current animation or the name of the animation that you pass.
		* 
		* @method play
		* @param [name] {String} The name of the animation that you want to play. If not passed it plays the current animation.
		* @param [resetTime=true] {Boolean} When set to false, this will prevent a new Animation from playing if it is already the currentAnimation that is already playing.
		* @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
		* @public
		*/
		public play(name: string = this.currentAnimation.name, resetTime: boolean = true): Kiwi.Animations.Animation {

			//If the current animation playing 
			if (resetTime == false && this.currentAnimation.name === name && this.currentAnimation.isPlaying == true) {
				return this.currentAnimation;

			} else {
				return this._play(name);
			}

		}

		/**
		* Plays an Animation at a particular frameIndex.
		* Note: The frameIndex is a particular index of a cell in the Sequence of the Animation you would like to play. 
		* Example: If you had a Animation with a Sequence [0, 1, 2, 3] and you told it to play at index '2', then the cell that it would be at is '3'.
		* 
		* @method playAt
		* @param index {Number} The index of the frame in the Sequence that you would like to play.
		* @param [name] {String} The name of the animation that you want to play. If not passed, it attempts to play it on the current animation.
		* @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
		* @public
		*/
		public playAt(index: number, name: string = this.currentAnimation.name): Kiwi.Animations.Animation {
			
			return this._play(name, index);
		}

		/**
		* An internal method used to actually play a Animation at a Index.
		* 
		* @method _play
		* @param name {string} The name of the animation that is to be switched to.
		* @param [index=null] {number} The index of the frame in the Sequence that is to play. If null, then it restarts the animation at the cell it currently is at.
		* @return {Kiwi.Animations.Animation} Returns the current Animation that is now playing.
		* @private
		*/
		private _play(name: string, index: number=null): Kiwi.Animations.Animation {

			this._setCurrentAnimation(name); 

			if (index !== null)
				this.currentAnimation.playAt(index);
			else
				this.currentAnimation.play();

			this.onPlay.dispatch(this.currentAnimation);
			this.updateCellIndex();
			return this.currentAnimation;
		}

		/**
		* Stops the current animation from playing.
		*
		* @method stop
		* @public
		*/
		public stop() {
			if (this.isPlaying === true) {
				this.currentAnimation.stop();
				this.onStop.dispatch(this.currentAnimation);
			}
		}

		/**
		* Pauses the current animation.
		* @method pause
		* @public
		*/
		public pause() {
			this.currentAnimation.pause();
		}

		/**
		* Resumes the current animation.
		* The animation should have already been paused.
		*
		* @method resume
		* @public
		*/
		public resume() {
			this.currentAnimation.resume();
		}

		/**
		* Either switches to a particular animation OR a particular frame in the current animation depending on if you pass the name of an animation that exists on this Manager (as a string) or a number refering to a frame index on the Animation. 
		* When you switch to a particular animation then 
		* You can also force the animation to play or to stop by passing a boolean in. But if left as null, the state of the Animation will based off what is currently happening.
		* So if the animation is currently 'playing' then once switched to the animation will play. If not currently playing it will switch to and stop.
		* If the previous animation played is non-looping and has reached its final frame, it is no longer considered playing, and as such, switching to another animation will not play unless the argument to the play parameter is true.
		*
		* @method switchTo
		* @param val {string|number}
		* @param [play=null] {boolean} Force the animation to play or stop. If null the animation base's it off what is currently happening.
		* @public
		*/
		public switchTo(val: any, play:boolean=null) { 
			var switched = false;
			switch (typeof val) {
				case "string":
					if (this.currentAnimation.name !== val) {
						this._setCurrentAnimation(val);
						switched = true;
					}
					break;
				case "number":
					this.currentAnimation.frameIndex = val;
					switched = true;
					break;
			}
			
			//Play if the dev forced it to OR if the animation was already playing
			if (play || play === null && this.isPlaying && switched) this.play();
			if (play == false && this.isPlaying) this.stop();

			this.updateCellIndex();
		}

		/**
		* Makes the current animation go to the next frame. If the animation is at the end of the sequence it then goes back to the start.
		* @method nextFrame
		* @public
		*/
		public nextFrame() {
			this.currentAnimation.nextFrame();
			this.updateCellIndex();
		}

		/**
		* Makes the current animation go to the prev frame. If the animation is at the start, the animation will go the end of the sequence.
		* @method prevFrame
		* @public
		*/
        public prevFrame() {
            this.currentAnimation.prevFrame();
            this.updateCellIndex();
        }

		/**
		* Internal method that sets the current animation to a Animation passed.
		*
		* @method _setCurrentAnimation
		* @param name {string} Name of the Animation that is to be switched to.
        * @param [inheritFromTexture=true] {booelan} If the animation component should look on the texture atlas for a sequence with that name.
		* @private
		*/
        private _setCurrentAnimation(name: string, inheritFromTexture: boolean=true) {

            if (this.currentAnimation.name !== name) {

				if ( this.currentAnimation !== null ) this.currentAnimation.stop();

                if (this._animations[name]) {
                    //Switch to the animation if it exists
                    
                    this.currentAnimation = this._animations[name];
                    this.onChange.dispatch(name, this.currentAnimation);

                } else if (inheritFromTexture) {
                    //Check to see if that animation exists on the atlas.
                    //If so create a new version of it.

                    for (var i = 0; i < this._atlas.sequences.length; i++) {

                        if (this._atlas.sequences[i].name === name) {
                            this.currentAnimation = this.createFromSequence(this._atlas.sequences[i], false);
                            this.onChange.dispatch(name, this.currentAnimation);
                        }

                    }

                }

			}
		}

		/**
		* The update loop for this component. 
		* Only updates the currentAnimation and only if it is playing.
		*
		* @method update 
		* @public
		*/
		public update() { 
			if (this.currentAnimation) {
				this.currentAnimation.update();
			}
		}

		/**
		* Gets the cell that the current Animation is current at. This is READ ONLY.
		* @property currentCell
		* @type number
		* @public
		*/
		public get currentCell():number {
			return this.currentAnimation.currentCell;
		}

		/**
		* Gets the current frame index of the cell in the Sequence that is currently playing. This is READ ONLY.
		* @property frameIndex 
		* @type number
		* @public
		*/
		public get frameIndex():number {
			return this.currentAnimation.frameIndex;
		}

		/**
		* Returns the length (Number of cells) of the current Animation that is playing. This is READ ONLY.
		* @property length
		* @type number
		* @public
		*/
		public get length(): number {
			return this.currentAnimation.length;
		}

		/**
		* Returns a Animation that is on this AnimationComponent
		* Does not check to see if that Animation exists or not.
		* 
		* @method getAnimation
		* @param name {string} The name of the Animation you would like to get.
		* @return {Kiwi.Animations.Animation} The Animation that is found. Will be 'undefined' if a Animation with that name did not exist.
		* @public
		*/
		public getAnimation(name: string): Kiwi.Animations.Animation {
			return this._animations[name];
		}

		/**
		* An internal method that is used to update the cell index of an entity when an animation says it needs to update.
		* @method updateCellIndex
		* @protected
		*/
		public updateCellIndex() {
			if (typeof this.currentAnimation !== "undefined") {
				this.entity.cellIndex = this.currentAnimation.currentCell;
				this.onUpdate.dispatch(this.currentAnimation);
			}
		}

		/**
		* Destroys the animation component and runs the destroy method on all of the anims that it has.
		* @method destroy
		* @public
		*/
		public destroy() {
			super.destroy();

			for (var key in this._animations) {
				this._animations[key].destroy();
				delete this._animations[key];
			}
			delete this._animations;
			delete this.currentAnimation;
			delete this._atlas;
		}

	}

}
