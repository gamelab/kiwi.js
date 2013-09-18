/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/  

module Kiwi {

    /**
    * [WHOLE THING REQUIRES DESCRIPTION]
    * @class StateConfig
    * @constructor
    * @param {State} parent
    * @param {String} name
    * @return {StateConfig} This Object
    * 
    */ 
    export class StateConfig {
 
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
        * @type State
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
        * 
        * @property isPersistent
        * @type boolean
        * @default false
        * @public
        */
        public isPersistent: boolean = false;

        /**
        * 
        * @property isCreated
        * @type boolean
        * @default false
        * @public
        */
        public isCreated: boolean = false;

        /**
        * 
        * @property isInitialised
        * @type boolean
        * @default false
        * @public
        */
        public isInitialised: boolean = false;

        /**
        * 
        * @property isReady
        * @type boolean
        * @default false
        * @public
        */
        public isReady: boolean = false;

        /**
        * 
        * @property hasInit
        * @type boolean
        * @default false
        * @public
        */
        public hasInit: boolean = false;

        /**
        * 
        * @property hasPreloader
        * @type boolean
        * @default false
        * @public
        */
        public hasPreloader: boolean = false;

        /**
        * 
        * @property hasLoadProgress
        * @type boolean
        * @default false
        * @public
        */
        public hasLoadProgress: boolean = false;

        /**
        * 
        * @property hasLoadComplete
        * @type boolean
        * @default false
        * @public
        */
        public hasLoadComplete: boolean = false;

        /**
        * 
        * @property hasLoadUpdate
        * @type boolean
        * @default false
        * @public
        */
        public hasLoadUpdate: boolean = false;

        /**
        * 
        * @property hasCreate
        * @type boolean
        * @default false
        * @public
        */
        public hasCreate: boolean = false;

        /**
        * 
        * @property hasOnEnter
        * @type boolean
        * @default false
        * @public
        */
        public hasOnEnter: boolean = false;

        /**
        * 
        * @property hasUpdate
        * @type boolean
        * @default false
        * @public
        */
        public hasUpdate: boolean = false;

        /**
        * 
        * @property hasRender
        * @type boolean
        * @default false
        * @public
        */
        public hasRender: boolean = false;

        /**
        * 
        * @property hasOnExit
        * @type boolean
        * @default false
        * @public
        */
        public hasOnExit: boolean = false;

        /**
        * 
        * @property hasShutDown
        * @type boolean
        * @default false
        * @public
        */
        public hasShutDown: boolean = false;

        /**
        * 
        * @property hasDestroy
        * @type boolean
        * @default false
        * @public
        */
        public hasDestroy: boolean = false;

        /**
        * 
        * @property runCount
        * @type Number
        * @default 0
        * @public
        */
        public runCount: number = 0;

        /**
        * 
        * @property type
        * @type Number
        * @default 0
        * @public
        */
        public type: number = 0;

        /**
        * Stores any parameters passed to the init method
        * @property initParams
        * @type array
        * @public
        */
        public initParams;

        /**
        * Stores any parameters passed to the create method
        * @property initParams
        * @type array
        * @public
        */
        public createParams;

        /**
        *
        * @method populate
        * @public
        */
        public populate() {

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
