/**
* 
* @module Kiwi
* 
*/

module Kiwi {

	/**
	* A lightweight object that contains values relating to the configuration of a State in a Kiwi Game.
	*
	* @class StateConfig
	* @namespace Kiwi
	* @constructor
	* @param parent {Kiwi.State} The State that this configuration object belongs to.
	* @param name {String} The name of the state which was created.
	* @return {Kiwi.StateConfig} 
	* 
	*/
	export class StateConfig {

		constructor(parent: Kiwi.State, name: string) {

			this._state = parent;
			this.name = name;

			//If it has a preload method.
			//*cough* of course it does.
			if (typeof this._state['preload'] === 'function') {
				this.hasPreloader = true;
			}
		}

		/**
		* The type of object that this is.
		* @method objType
		* @return {String} "StateConfig"
		* @public
		*/
		public objType() {
			return "StateConfig";
		}

		/**
		* The state this StateConfig belongs to.
		* @property _state
		* @type Kiwi.State
		* @private
		*/
		private _state: Kiwi.State;

		/**
		* The name of the State, must be unique within your game.
		* @property name
		* @type String
		* @public
		*/
		public name: string = '';

		/**
		* Currently unused.
		*/
		public isPersistent: boolean = false;

		/**
		* If this State has been created (the create method has been executed). 
		* Essentually has the same meaning as 'isReady'.
		* @property isCreated
		* @type boolean
		* @default false
		* @public
		*/
		public isCreated: boolean = false;

		/**
		* If the State has been initialised already (so the Boot and Init methods have been executed already). 
		* A State only get Initialised once which is when it switched to for this first time.
		* @property isInitialised
		* @type boolean
		* @default false
		* @public
		*/
		public isInitialised: boolean = false;

		/**
		* If the State that this config is on is 'ready' to be used (e.g. all the assets have been loaded and libraries complied)
		* or if it isn't and so it is still at the 'loading' stage.
		* @property isReady
		* @type boolean
		* @default false
		* @public
		*/
		public isReady: boolean = false;

		/**
		* If the State that this config is on contains a Preloader Method.
		* @property hasPreloader
		* @type boolean
		* @default false
		* @public
		*/
		public hasPreloader: boolean = false;

		/**
		* The number of times the State that this config belongs to has been active/used.
		* @property runCount
		* @type Number
		* @default 0
		* @public
		*/
		public runCount: number = 0;

		/*
		* The type of State this is. Currently Unused.
		*/
		public type: number = 0;

		/**
		* Stores any parameters that are to be passed to the init method when the State that this config is on is switched to.
		* @property initParams
		* @type Array
		* @public
		*/
		public initParams;

		/**
		* Stores any parameters that are to be passed to the create method when the State that this config is on is switched to.
		* @property createParams
		* @type Array
		* @public
		*/
		public createParams;

		/**
		* Resets the properties contained on this StateConfig object. 
		* This is executed when a State is about to be destroyed as so reset's it to be switched to again.
		* @method reset
		* @public
		*/
		public reset() {

			this.isReady = false;
			this.isCreated = false;
			this.createParams = [];
			this.initParams = [];

		}

	}
}
