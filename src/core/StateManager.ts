/// <reference path="Game.ts" />
/// <reference path="State.ts" />

/**
 *  Kiwi - Core - StateManager
 *
 *  @desc       Handles the starting, parsing, looping and swapping of game states
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

module Kiwi {

    export class StateManager {

        /**
        * 
        * @constructor
        * @param {Kiwi.Game} game
        * @return {StateMananger} This Object
        */
        constructor(game: Kiwi.Game) {

            this._game = game;

            this._states = [];

        }

        public objType() {
            return "StateManager";
        }

        /**
        * 
        * @property _game
        * @type Kiwi.Game
        * @private
        **/
        private _game: Kiwi.Game;

        /**
        * 
        * @property _states
        * @type Kiwi.Structs.Dictionary
        * @private
        **/
        private _states: Kiwi.State[];

        /**
        * The current State
        * @property current
        * @type Kiwi.State
        **/
        public current: Kiwi.State = null;

        /**
        * 
        * @method checkKeyExists
        * @param {String} key
        * @return {Boolean}
        **/
        private checkKeyExists(key: string): bool {

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
        * 
        * @method checkValidState
        * @param {Kiwi.State} state
        * @return {Boolean}
        **/
        private checkValidState(state: Kiwi.State): bool {

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
         * @param {Any} state The Kiwi.State instance to add
         * @param {Boolean} switchTo If set to true automatically switch to the given state after adding it
         * @return {Boolean} true if the State was added successfully, otherwise false
         */
        public addState(state: any, switchTo:bool = false): bool {

            klog.info('Adding new State');

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

            if (tempState.config.name && this.checkKeyExists(tempState.config.name) === true)
            {
                klog.warn('State with this name already exists or state is malformed');
                return false;
            }

            tempState.game = this._game;
           

            if (this.checkValidState(tempState) === false)
            {
                klog.info('checkValidState failed');
                return false;
            }
            else
            {
                klog.info('State successfully added to StateManager');

                this._states.push(tempState);

                if (switchTo === true)
                {
                    this.setCurrentState(tempState.config.name);
                }

                return true;

            }

        }

        /**
        * The DOM is ready, so if we have a current state pending we can init it now
        * @method boot
        */
        boot() {

            klog.info('StateManager booting');

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
        * 
        * @method setCurrentState
        * @param {String} key
        * @return {Boolean}
        **/
        private setCurrentState(key: string): bool {

            klog.debug('-------------------------------------------------------------');
            klog.info('Start of Setting Current State ' + key);

            //  Bail out if they are trying to switch to the already current state
            if (this.current !== null && this.current.config.name === key)
            {
                klog.info('Bailing out, switching to already current state');
                return false;
            }

            //  First check if we have a current state or not
            if (this.current !== null)
            {
                //  Yes, so notify it that it's about to be shut down
                //  If there is a shutdown function then we call it, passing it a callback.
                //  The State is then responsible for hitting the callback when it is ready.
                //  TODO: Transition support - both state updates need to be called at the same time.
                klog.info('Current State: ' + this.current.config.name + ' being destroyed');
                this._game.input.reset();
                this.current.destroy();
            }

            //  Assume by this point that the current state has been destroyed (in reality we'll move this part to a callback probably)

            if (this.checkKeyExists(key) === true)
            {
                this.current = this.getState(key);

                klog.info('Key exists, so setting current state to: ', this.current.config.name);

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

                return true;

            }
            else
            {
                klog.warn('Apparently the State key doesn\'t exist');
                return false;
            }

        }

        /**
         *  Swaps the current state.
         *  If the state has already been loaded (via addState) then you can just pass the key.
         *  Otherwise you can pass the state object as well and it will load it then swap to it.
         *
         * @method switchState
         * @param {String} key
         * @param {Any} [state]
         * @param {Boolean} skipAdd if set to true it will skip the adding of the state and just set it as current
         * @return {Boolean}
         */
        public switchState(key: string, state: any = null, initParams = null, createParams = null): bool {

            klog.info('Attempting to switch to State ' + key);

            //  If we have a current state that isn't yet ready (preload hasn't finished) then abort now
            if (this.current !== null && this.current.config.isReady === false)
            {
                klog.warn('You cannot call switchState before the current state has called create()');
                return false;
            }

            //  if state key already exists let's try swapping to it, even if the state was passed
            if (this.checkKeyExists(key) === false && state !== null)
            {
                //  Does the state already exist?
                if (this.addState(state, false) === false)
                {
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
        * 
        * @method getState
        * @param {String} key
        * @return {Kiwi.State}
        **/
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
        *
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
                    klog.info('No preloaded, calling create function');
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
        *
        * @method onLoadProgress
        * @param {Number} percent
        * @param {Number} bytesLoaded
        * @param {Kiwi.Filess} file
        * @private
        */
        private onLoadProgress(percent: number, bytesLoaded: number, file: Kiwi.Files.File) {

            if (this.current.config.hasLoadProgress === true)
            {
                this.current.loadProgress(percent, bytesLoaded, file);
            }

        }

        /**
        *
        * @method onLoadComplete
        * @private
        */
        private onLoadComplete() {

            if (this.current.config.hasLoadComplete === true)
            {
                this.current.loadComplete();
            }

            
            this.rebuildTextureCache()
            
            this.current.config.isReady = true;

            if (this.current.config.hasCreate === true)
            {
                klog.info('preload finished - now calling create function');
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

        public rebuildTextureCache() {
          
            this.current.textureCache.clear();

            var gameCacheKeys: Array = this._game.cache.images.keys;
            
            //iterate through global cache
            
            for (var i = 0; i < gameCacheKeys.length; i++) {
                this.current.textureCache.add(this._game.cache.images.getFile(gameCacheKeys[i]));
                
            }            

            
        }

        /**
         * Update Loop
         * @method update
         */
        update() {

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

        }

        /**
         * postRender - called after all of the Layers have been rendered
         * @method postRender
         */
        postRender() {

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