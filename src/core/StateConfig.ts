/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/  

module Kiwi {

    /**
    *
    * @class StateConfig
    * 
    */ 
    export class StateConfig {

        /**
        * 
        * @constructor
        * @param {Kiwi.State} parent
        * @return {StateConfig} This Object
        */
        constructor(parent: Kiwi.State, name: string) {

            this._state = parent;
            this.name = name;

            this.populate();

        }

        public objType() {
            return "StateConfig";
        }

        /**
        * 
        * @property _state
        * @type Kiwi.State
        * @private
        **/
        private _state: Kiwi.State;

        /**
        * The name of the State, must be unique within your game.
        * @property name
        * @type String
        * @private
        */
        public name: string = '';

        /**
        * 
        * @property isPersistent
        * @type Boolean
        * @private
        **/
        public isPersistent: boolean = false;

        /**
        * 
        * @property isCreated
        * @type Boolean
        * @private
        **/
        public isCreated: boolean = false;

        /**
        * 
        * @property isInitialised
        * @type Boolean
        * @private
        **/
        public isInitialised: boolean = false;

        /**
        * 
        * @property isReady
        * @type Boolean
        * @private
        **/
        public isReady: boolean = false;

        /**
        * 
        * @property hasInit
        * @type Boolean
        * @private
        **/
        public hasInit: boolean = false;

        /**
        * 
        * @property hasPreloader
        * @type Boolean
        * @private
        **/
        public hasPreloader: boolean = false;

        /**
        * 
        * @property hasLoadProgress
        * @type Boolean
        * @private
        **/
        public hasLoadProgress: boolean = false;

        /**
        * 
        * @property hasLoadComplete
        * @type Boolean
        * @private
        **/
        public hasLoadComplete: boolean = false;

        /**
        * 
        * @property hasLoadUpdate
        * @type Boolean
        * @private
        **/
        public hasLoadUpdate: boolean = false;

        /**
        * 
        * @property hasCreate
        * @type Boolean
        * @private
        **/
        public hasCreate: boolean = false;

        /**
        * 
        * @property hasOnEnter
        * @type Boolean
        * @private
        **/
        public hasOnEnter: boolean = false;

        /**
        * 
        * @property hasUpdate
        * @type Boolean
        * @private
        **/
        public hasUpdate: boolean = false;

        /**
        * 
        * @property hasRender
        * @type Boolean
        * @private
        **/
        public hasRender: boolean = false;

        /**
        * 
        * @property hasOnExit
        * @type Boolean
        * @private
        **/
        public hasOnExit: boolean = false;

        /**
        * 
        * @property hasShutDown
        * @type Boolean
        * @private
        **/
        public hasShutDown: boolean = false;

        /**
        * 
        * @property hasDestroy
        * @type Boolean
        * @private
        **/
        public hasDestroy: boolean = false;

        /**
        * 
        * @property runCount
        * @type Number
        * @private
        **/
        public runCount: number = 0;

        /**
        * 
        * @property type
        * @type Number
        * @private
        **/
        public type: number = 0;

        /**
        * Stores any parameters passed to the init method
        * @property initParams
        * @type array
        **/
        public initParams;

        /**
        * Stores any parameters passed to the create method
        * @property initParams
        * @type array
        **/
        public createParams;

        /**
         *  Builds up a StateManager Object on the State itself (called KiwiSMData).
         *  This is used to save time when doing function loops.
         *  Add Persistent State support? So it's called all the time, regardless of which state is current.
         *
         * @method buildStateConfig
         * @param {String} key
         * @param {Boolean} persistent
         */
        populate() {

            if (typeof this._state['init'] === 'function')
            {
                this.hasInit = true;
            }

            if (typeof this._state['preload'] === 'function')
            {
                this.hasPreloader = true;
            }

            if (typeof this._state['loadProgress'] === 'function')
            {
                this.hasLoadProgress = true;
            }

            if (typeof this._state['loadComplete'] === 'function')
            {
                this.hasLoadComplete = true;
            }

            if (typeof this._state['loadUpdate'] === 'function')
            {
                this.hasLoadUpdate = true;
            }

            if (typeof this._state['create'] === 'function')
            {
                this.hasCreate = true;
            }

            if (typeof this._state['onEnter'] === 'function')
            {
                this.hasOnEnter = true;
            }

            if (typeof this._state['update'] === 'function')
            {
                this.hasUpdate = true;
            }

            if (typeof this._state['render'] === 'function')
            {
                this.hasRender = true;
            }

            if (typeof this._state['onExit'] === 'function')
            {
                this.hasOnExit = true;
            }

            if (typeof this._state['shutdown'] === 'function')
            {
                this.hasShutDown = true;
            }

            if (typeof this._state['destroy'] === 'function')
            {
                this.hasDestroy = true;
            }

            if (this.hasInit === false && this.hasCreate === false)
            {
                //  If there are no init or create functions, then we consider the state already initialised
                this.isInitialised = true;
                this.isCreated = true;
                this.isReady = true;
            }

        }

    }
}
