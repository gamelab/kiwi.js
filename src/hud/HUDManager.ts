/**
* Kiwi - HUD
* @module Kiwi
* @submodule HUD
*/



module Kiwi.HUD {

    /**
    * @class HUDManager
    **/

    export class HUDManager {
        
        /**
        * 
        * @constructor
        * @param game {Game} game
        */
        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        /**
        * 
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        *
        * @property _hudContainer
        * @type HTMLDivElement
        * @private
        */
        private _hudContainer: HTMLDivElement;

        /**
        * The DOM is ready, so if the current state is pending we can boot up the HUD now.
        * @method boot
        * @public
        */
        public boot() {

            this._hudContainer = <HTMLDivElement>document.createElement("div");
            this._hudContainer.id = "HUDContainer";
            this._hudContainer.style.position = "absolute";
            this._hudContainer.style.width = "100%";
            this._hudContainer.style.height = "100%";

            this._game.stage.container.appendChild(this._hudContainer);

            this._huds = new Array<HUDDisplay>();

            this._defaultHUD = this.createHUD("defaultHUD");
            
            this._currentHUD = this._defaultHUD;
            
            this.setHUD(this._defaultHUD);
            
        }

        /**
        * Returns the type of object this is.
        * @method objType
        */
        public objType():string {
            return "HUDManager";
        }

        /**
        * @property _huds
        * @type Kiwi.Structs.Dictionary
        * @private
        */
        private _huds: Array<Kiwi.HUD.HUDDisplay>;

        /**
        * The defaultHUD to be displayed onscreen.
        * @property _defaultHUD
        * @type Kiwi.HUD.HUDDisplay
        * @private
        */
        private _defaultHUD: Kiwi.HUD.HUDDisplay;

        /**
        * The currentHUD that is in use.
        * @property _currentHUD
        * @type Kiwi.HUD.HUDDisplay
        * @private
        */
        private _currentHUD: Kiwi.HUD.HUDDisplay;

        /**
        * Allows you get the defaultHUD that is being used, or set the defaultHUD.
        *
        * @method defaultHUD
        * @param {Kiwi.HUD.HUDDisplay} val - The new defaultHUD.
        * @return {Kiwi.HUD.HUDDisplay}
        */
        public set defaultHUD(value: Kiwi.HUD.HUDDisplay) {
            if (this._currentHUD === this._defaultHUD) {
                this._currentHUD = value;
                this.setHUD(this._currentHUD);
            }
            this._defaultHUD = value;
        }

        public get defaultHUD(): Kiwi.HUD.HUDDisplay {
            return this._defaultHUD;
        }

        /**
        * Swaps to the current displayed HUD.
        * 
        * @method setHUD
        * @param hud {HUDDisplay} hud - Reference to the HUD you want to display. 
        * @public
        */
        public setHUD(hud: Kiwi.HUD.HUDDisplay) {
            this.hideHUD();
            this._currentHUD = hud;
            this.showHUD();
        }

        /*
        * Displays the currently active HUD.
        * @method showHUD
        * @public
        */
        public showHUD() {
            this._currentHUD.container.style.display = 'block';
        }

        /**
        * Hides the active HUDDisplay
        * @method hideHUD
        * @public
        */
        public hideHUD() {
            this._currentHUD.container.style.display = 'none';
        }

       
        /**
        * Creates a new HUDDisplay.
        * 
        * @method createHUD
        * @param name {string} Name of the new HUD.
        * @return {HUDDisplay}
        * @public
        */
        public createHUD(name: string): Kiwi.HUD.HUDDisplay{
            
            var hud: Kiwi.HUD.HUDDisplay = new Kiwi.HUD.HUDDisplay(this._game, name);
            hud.container.style.display = 'none';
            this._huds.push(hud);
            this._hudContainer.appendChild(hud.container);
            return hud;
        }

        /**
        * Removes a HUD from the game.
        *
        * @method removeHUD
        * @param hud {HUDDisplay} The hud you want to remove.
        * @returns {boolean} 
        * @public
        */
        public removeHUD(hud: Kiwi.HUD.HUDDisplay) {
            
            if (hud === this._defaultHUD) {
                return false;
            }

            if (this._currentHUD === hud) {
                this.setHUD(this._defaultHUD); 
            }

            this.destroyHUD(hud);

            var i = this._huds.indexOf(hud);

            if (i !== -1) {
                this._huds.splice(i, 1);
            }

            return true;
        }

        /**
        * Removes the HUD from the screen
        *
        * @method destroyHUD
        * @param hud {HUDDisplay} The hud to be removed
        * @public
        */
        private destroyHUD(hud: Kiwi.HUD.HUDDisplay) {

            if (this._hudContainer.contains(hud.container)) {
                this._hudContainer.removeChild(hud.container);
            }

            hud = null;
        }

        /**
        * Game loop
        * @method update
        * @public
        */
        public update() {
            for (var i = 0; i < this._huds.length; i++) {
                this._huds[i].update();
            }
        }

        /*
        * Render
        * @method render
        * @public
        */
        public render() {
            this._currentHUD.render();
        }




    }
}

