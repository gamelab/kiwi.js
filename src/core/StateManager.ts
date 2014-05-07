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
    * @namespace Kiwi
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
        * The current State that the game is at.
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

            if (!state['game'] || !state['config']) {
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
            console.log('Kiwi.StateManager: Adding state');
            var tempState;

            //What type is the state that was passed.
            if (typeof state === 'function') {
                tempState = new state();

            } else if (typeof state === 'string') {
                tempState = window[state];  

            } else {
                tempState = state;
            }

            //Does a state with that name already exist?
            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true) {

                if (this._game.debug)
                    console.error('  Kiwi.StateManager: Could not add ' + tempState.config.name + ' as a State with that name already exists.');

                return false;
            }

            tempState.game = this._game;
            
            //Is it a valid state?
            if (this.checkValidState(tempState) === false) {

                if (this._game.debug)
                    console.error('  Kiwi.StateManager: ' + tempState.config.name + ' isn\'t a valid state. Make sure you are using the Kiwi.State class!');

                return false;

            } else {

                this._states.push(tempState);

                if (this._game.debug)
                    console.log('  Kiwi.StateManager: ' + tempState.config.name + ' was successfully added.');

                if (switchTo === true) {
                    this.setCurrentState(tempState.config.name);
                }

                return true;

            }

        }

        /**
        * Is executed once the DOM has finished loading.
        * This is an INTERNAL Kiwi method. 
        * @method boot
        * @public
        */
        boot() {                                         


        }

        /**
        * Switches to the name (key) of the state that you pass. 
        * Does not work if the state you are switching to is already the current state OR if that state does not exist yet.
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

            if (this._game.debug)
                console.log('Kiwi.StateManager: Switching to "' + key + '" State.'); 

            this._newStateKey = key;
            return true;
        }

        /**
        * Actually switches to a state that is stored in the 'newStateKey' property. This method is executed after the update loops have been executed to help prevent developer errors. 
        * @method bootNewState
        * @private
        */
        private bootNewState() {
            
            // Destroy the current if there is one.
            if (this.current !== null) {

                this.current.shutDown();

                
                this._game.input.reset();   //Reset the input component
                this.current.destroy(true); //Destroy ALL IChildren ever created on that state.
                this._game.fileStore.removeStateFiles(this.current); //Clear the fileStore of not global files.
                this.current.config.reset(); //Reset the config setting
            } 


            //Set the current state, reset the key
            this.current = this.getState(this._newStateKey);
            this._newStateKey = null;


            //Initalise the state and execute the preload method?
            this.checkInit();
            this.checkPreload();

        }

        /**
        * Swaps the current state.
        * If the state has already been loaded (via addState) then you can just pass the key.
        * Otherwise you can pass the state object as well and it will load it then swap to it.
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

                if(this._game.debug)
                    console.error('Kiwi.StateManager: Cannot change to a new state till the current state has finished loading!');

                return false;
            }

            // If state key doesn't exist then lets add it.
            if (this.checkKeyExists(key) === false && state !== null) {

                if (this.addState(state, false) === false) {
                    return false;
                }
            }

            // Store the parameters (if any)
            if (initParams !== null || createParams !== null) {

                var newState = this.getState(key);
                newState.config.initParams = [];
                newState.config.createParams = [];

                for (var initParameter in initParams) {
                    newState.config.initParams.push(initParams[initParameter]);
                }

                for (var createParameter in createParams) {
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


        /*
        *----------------
        * Check Methods 
        *----------------
        */


        /**
        * Checks to see if the state that is being switched to needs to load some files or not.
        * If it does it loads the file, if it does not it runs the create method.
        * @method checkPreload
        * @private
        */
        private checkPreload() {

            //Rebuild the Libraries before the preload is executed
            this.rebuildLibraries();

            
            if (this.current.config.hasPreloader === true) //Perhaps it will. Just maybe.
            {
                this._game.loader.init( (percent, bytes, file) => this.onLoadProgress(percent, bytes, file), () => this.onLoadComplete());
                this.current.preload();
                this._game.loader.startLoad();
            }
            else
            {

                this.current.config.isReady = true;
                this.callCreate();

            }

        }

        /**
        * Checks to see if the state being switched to contains a create method.
        * If it does then it calls the create method.
        * @method callCreate
        * @private
        */
        private callCreate() {

            if (this._game.debug)
                console.log("Kiwi.StateManager: Calling " + this.current.name + ":Create");

            //Execute the create with params if there are some there.
            if (this.current.config.createParams) {
                this.current.create.apply(this.current, this.current.config.createParams);

            //Otherwise just execute the method.
            } else {
                this.current.create.call(this.current);
            }

            this.current.config.runCount++;
            this.current.config.isCreated = true;
        }

        /**
        * Checks to see if the state has a init method and then executes that method if it is found.
        * @method checkInit
        * @private
        */
        private checkInit() {
            
            //Has the state already been initialised?
            if (this.current.config.isInitialised === false) {

                //Boot the state.
                this.current.boot();

                //Execute the Init method with params
                if (this.current.config.initParams) {
                    this.current.init.apply(this.current, this.current.config.initParams);

                //Execute the Init method with out params
                } else {
                    this.current.init.call(this.current);
                }

                
                this.current.config.isInitialised = true;
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

            this.current.loadProgress(percent, bytesLoaded, file);
            
        }

        /**
        * Executed when the preloading has completed. Then executes the loadComplete and create methods of the new state.
        * @method onLoadComplete
        * @private
        */
        private onLoadComplete() {

            this.current.loadComplete();
            
            //Rebuild the Libraries again to have access the new files that were loaded.
            this.rebuildLibraries();
            this.current.config.isReady = true;
            this.callCreate();

        }

        /**
        * Rebuilds the texture, audio and data libraries that are on the current state. Thus updating what files the user has access to.
        * @method rebuildLibraries
        * @private
        */
        public rebuildLibraries() {
            
            this.current.audioLibrary.rebuild(this._game.fileStore, this.current);
            this.current.dataLibrary.rebuild(this._game.fileStore, this.current);
            this.current.textureLibrary.rebuild(this._game.fileStore, this.current);
            if (this._game.renderOption == Kiwi.RENDERER_WEBGL) {
                this._game.renderer.initState(this.current);
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
                //Is the state ready?
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

            //Do we need to switch states?
            if (this._newStateKey !== null) {
                this.bootNewState();
            }

        }

        /**
        * PostRender - Called after all of the rendering has been executed in a frame.
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