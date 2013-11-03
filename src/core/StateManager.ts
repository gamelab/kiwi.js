/**
* Module - Kiwi (Core)
* @module Kiwi
* 
*/  

module Kiwi {

    /**
    * The state manager handles the starting, parsing, looping and swapping of game states. Thus there is only ever one state manager per game.
    *
    * @class StateManager
    * @constructor
    * @param game {Game} The game that this statemanager belongs to.
    * @return {StateMananger} This Object
    *
    */
    export class StateManager {
         
        constructor(game: Kiwi.Game) {

            this._game = game;

            this._states = [];

        }

        /**
        * The type of object this is.
        * @method objType
        * @return string
        * @public
        */
        public objType() {
            return "StateManager";
        }

        /**
        * The game that this manager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * An array of all of the states that are contained within this manager.
        * @property _states
        * @type State[]
        * @private
        */
        private _states: Kiwi.State[];

        /**
        * The current State
        * @property current
        * @type State
        * @default null
        * @public
        */
        public current: Kiwi.State = null;

        /**
        * The name of the new state that is to be switched to.
        * @property _newStateKey
        * @type string
        * @defualt null
        * @private
        */
        private _newStateKey: string = null;

        /**
        * Checks to see if a key exists. Internal use only.
        * @method checkKeyExists
        * @param key {String}
        * @return {boolean}
        * @private
        */
        private checkKeyExists(key: string): boolean {

            for (var i = 0; i < this._states.length; i++)
            {
                if (this._states[i].config.name === key)
                {
                    return true;
                }
            }

            return false;

        }

        /**
        * Checks to see if the state passed is valid or not.
        * @method checkValidState
        * @param {State} state
        * @return {boolean}
        * @private
        */
        private checkValidState(state: Kiwi.State): boolean {

            if (!state['game'] || !state['config'])
            {
                return false;
            }

            return true;

        }

        /**
        * Adds the given State to the StateManager.
        * The State must have a unique key set on it, or it will fail to be added to the manager.
        * Returns true if added successfully, otherwise false (can happen if State is already in the StateManager)
        * 
        * @method addState
        * @param state {Any} The Kiwi.State instance to add.
        * @param [switchTo=false] {boolean} If set to true automatically switch to the given state after adding it
        * @return {boolean} true if the State was added successfully, otherwise false
        * @public
        */
        public addState(state: any, switchTo:boolean = false): boolean {

            var tempState;

            //  Is it a Prototype?
            if (typeof state === 'function')
            {
                tempState = new state();
            }
            else if (typeof state === 'string')
            {
                tempState = window[state];  
            }
            else
            {
                tempState = state;
            }

            //Does it already exist?
            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true)
            {
                return false;
            }

            tempState.game = this._game;
           

            if (this.checkValidState(tempState) === false)
            {
                return false;
            }
            else
            {

                this._states.push(tempState);

                if (switchTo === true)
                {
                    this.setCurrentState(tempState.config.name);
                }

                return true;

            }

        }

        /**
        * Is executed once the DOM has finished loading.
        * @method boot
        * @public
        */
        boot() {

            if (this.current !== null)
            {
                this.current.boot();
            }

            if (this.current !== null && this.current.config.isInitialised === false)
            {
                if (this.current.config.hasInit === true)
                {
                    this.current.init();
                }

                this.current.config.isInitialised = true;
    
                this.checkPreload();
            }

        }

        /**
        * Switches to the name (key) of the state that you pass. Does not work if the state you are switching to is already the current state OR if that state does not exist yet.
        * @method setCurrentState
        * @param {String} key
        * @return {boolean}
        * @private
        */
        private setCurrentState(key: string): boolean {

            //  Bail out if they are trying to switch to the already current state
            if (this.current !== null && this.current.config.name === key || this.checkKeyExists(key) === false) {
                return false;
            }
            
            this._newStateKey = key;
            return true;
        }

        /**
        * Actually switches to a state that is stored in the 'newStateKey' property. This method is executed after the update loops have been executed to help prevent developer errors. 
        * @method bootNewState
        * @private
        */
        private bootNewState() {
            
            // First check if we have a current state or not. Destroy the previous state
            if (this.current !== null) {
                //  Yes, so notify it that it's about to be shut down
                //  If there is a shutdown function then we call it, passing it a callback.
                //  The State is then responsible for hitting the callback when it is ready.
                //  TODO: Transition support - both state updates need to be called at the same time.
                this._game.input.reset();
                this.current.destroy();
                
            } 

            this.current = this.getState(this._newStateKey);

            //  Do we need to init it?
            if (this._game.stage.domReady === true)
            {
                if (this.current.config.isInitialised === false)
                {
                    this.current.boot();

                    if (this.current.config.hasInit === true)
                    {
                        if (this.current.config.initParams)
                        {
                            this.current.init.apply(this.current, this.current.config.initParams);
                        }
                        else
                        {
                            this.current.init.call(this.current);
                        }
                    }

                    this.current.config.isInitialised = true;
                }

                this.checkPreload();

            }
            
            this._newStateKey = null;
        }

        /**
        *  Swaps the current state.
        *  If the state has already been loaded (via addState) then you can just pass the key.
        *  Otherwise you can pass the state object as well and it will load it then swap to it.
        *
        * @method switchState
        * @param key {String} The name/key of the state you would like to switch to.
        * @param [state=null] {Any} The state that you want to switch to. This is only used to create the state if it doesn't exist already.
        * @param [initParams=null] {Object} Any parameters that you would like to pass to the init method of that new state.
        * @param [createParams=null] {Object} Any parameters that you would like to pass to the create method of that new state.
        * @return {boolean}
        * @public
        */
        public switchState(key: string, state: any = null, initParams = null, createParams = null): boolean {

            //  If we have a current state that isn't yet ready (preload hasn't finished) then abort now
            if (this.current !== null && this.current.config.isReady === false) {
                return false;
            }

            //  if state key already exists let's try swapping to it, even if the state was passed
            if (this.checkKeyExists(key) === false && state !== null) {
                //  Does the state already exist?
                if (this.addState(state, false) === false) {
                    //  Error adding the state
                    return false;
                }
            }

            //  Store the parameters (if any)
            if (initParams !== null || createParams !== null)
            {
                var newState = this.getState(key);

                newState.config.initParams = [];

                for (var initParameter in initParams)
                {
                    newState.config.initParams.push(initParams[initParameter]);
                }

                newState.config.createParams = [];

                for (var createParameter in createParams)
                {
                    newState.config.createParams.push(createParams[createParameter]);
                }

            }
            
            return this.setCurrentState(key);

        }

        /**
        * Gets a state by the key that is passed.
        * @method getState
        * @param {String} key
        * @return {State}
        * @private
        */
        private getState(key: string): Kiwi.State {

            for (var i = 0; i < this._states.length; i++)
            {
                if (this._states[i].config.name === key)
                {
                    return this._states[i];
                }
            }

            return null;

        }

        /**
        * Checks to see if the state that is being switched to needs to load some files or not.
        * If it does it loads the file, if it does not it runs the create method.
        * @method checkPreload
        * @private
        */
        private checkPreload() {

            if (this.current.config.hasPreloader === true)
            {
                this._game.loader.init((percent, bytes, file) => this.onLoadProgress(percent, bytes, file), () => this.onLoadComplete());
                this.current.preload();
                this._game.loader.startLoad();
            }
            else
            {
                //  No preloader, but does have a create function
                if (this.current.config.hasCreate === true && this.current.config.isCreated === false)
                {
                    this.current.config.isCreated = true;

                    if (this.current.config.createParams)
                    {
                        this.current.create.apply(this.current, this.current.config.createParams);
                    }
                    else
                    {
                        this.current.create.call(this.current);
                    }
                }
                
                this.current.config.isReady = true;

            }

        }

        /**
        * Is execute whilst files are being loaded by the state.
        * @method onLoadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {File} file
        * @private
        */
        private onLoadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File) {

            if (this.current.config.hasLoadProgress === true)
            {
                this.current.loadProgress(percent, bytesLoaded, file);
            }

        }

        /**
        * Executed when the preloading has completed. Then executes the loadComplete and create methods of the new state.
        * @method onLoadComplete
        * @private
        */
        private onLoadComplete() {

            if (this.current.config.hasLoadComplete === true)
            {
                this.current.loadComplete();
            }

           
            this.rebuildLibraries();
            
            this.current.config.isReady = true;

            if (this.current.config.hasCreate === true)
            {
                this.current.config.isCreated = true;
                if (this.current.config.createParams)
                {
                    this.current.create.apply(this.current, this.current.config.createParams);
                }
                else
                {
                    this.current.create.call(this.current);
                }
            }

        }

        /**
        * Rebuilds the texture, audio and data libraries that are on the current state. Thus updating what files the user has access to.
        * @method rebuildLibraries
        * @private
        */
        public rebuildLibraries() {
            
            this.current.textureLibrary.clear();
            this.current.audioLibrary.clear();
            this.current.dataLibrary.clear();
         

            var fileStoreKeys = this._game.fileStore.keys;
            
            for (var i = 0; i < fileStoreKeys.length; i++) {
                var file: Kiwi.Files.File = this._game.fileStore.getFile(fileStoreKeys[i]);
                if (file.isTexture) {
                    this.current.textureLibrary.add(file);
                } else if (file.isAudio) {
                    this.current.audioLibrary.add(file);
                } else if (file.isData) {
                    this.current.dataLibrary.add(file);
                }
            }            
          
            
        }

        /**
        * The update loop that is accessable on the state manager.
        * @method update
        * @public
        */
        public update() {

            if (this.current !== null)
            {
                if (this.current.config.isReady === true)
                {
                    this.current.preUpdate();
                    this.current.update();
                    this.current.postUpdate();
                }
                else
                {
                    this.current.loadUpdate();
                }
            }

            if (this._newStateKey !== null) {
                this.bootNewState();
            }

        }

        /**
        * postRender - called after all of the Layers have been rendered
        * @method postRender
        * @public
        */
        public postRender() {

            if (this.current !== null)
            {
                if (this.current.config.isReady === true)
                {
                    this.current.postRender();
                }
            }

        }

    }

}