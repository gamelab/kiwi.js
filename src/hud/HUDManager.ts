/**
* The HUD (Heads Up Display) is a section that handles the displayment of information that you always want visible to user. 
* This section is managed differently to normal GameObjects, where the difference being that HUD items aren't added to a Canvas but are DOM elements instead. Since they DOM elements you can style these elements using a CSS sheet if you wish. 
*
* @module Kiwi
* @submodule HUD
* @main HUD
*/

module Kiwi.HUD {

    /**
    * This class manages all of the various HUDDisplays that are currently used on this Managers game.
    * Using this class you can create/add and remove HUDDisplays from this game,
    * change the HUDDisplay that is currently being display (also known as the currentHUD) and show/hide the currentHUD.
    * Each HUDManager also has at least one HUDDisplay which is called the 'defaultHUD' you cannot remove,
    * but you can reassign the defaultHUD to be a different HUDDisplay if you want. 
    * 
    *
    * @class HUDManager
    * @namespace Kiwi.HUD
    * @constructor
    * @param game {Game} game
    * @return {HUDManager}
    */
    export class HUDManager {
        
        constructor(game: Kiwi.Game) {
            this._game = game;
            this._device = this._game.deviceTargetOption;
        }

        /**
        * The game that this HUDManager belongs to.
        * @property _game
        * @type Game
        * @private
        */
        private _game: Kiwi.Game;

        /**
        * The device that this game is being target at. The same as the deviceTargetOption property on the root Game.
        * This is needed as it detirmines if HUD is supported on the device or not and if so, how it is implemented. 
        * @property _device
        * @type number
        * @private
        */
        private _device: number;

        /**
        * If the HUD is supported on the DEVICE that is being targeted. Gets set during the BOOT sequence.
        * @property _supported
        * @type boolean
        * @private
        */
        private _supported: boolean;

        /**
        * Returns the _supported property indicating whether HUD is supported or not.
        * @property supported
        * @type boolean
        * @public
        */
        public get supported():boolean {
            return this._supported;
        }

        /**
        * The HTMLDivElement that is being used as the container for the whole manager.
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

            if (this._device === Kiwi.TARGET_BROWSER) {
                this._supported = true;

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

            } else {
                this._supported = false;
            }

        }

        /**
        * Returns the type of object this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType():string {
            return "HUDManager";
        }

        /**
        * An array containing all of the HUDDisplays that are currently active on this HUDManager.
        * @property _huds
        * @type HUDDisplay[]
        * @private
        */
        private _huds: Kiwi.HUD.HUDDisplay[];

        /**
        * The defaultHUD that is being used.
        * The defaultHUD cannot be removed, but can be swapped out for another HUDDisplay.
        * @property _defaultHUD
        * @type HUDDisplay
        * @private
        */
        private _defaultHUD: Kiwi.HUD.HUDDisplay;

        /**
        * The currentHUD that is in use. Can be the same as the defaultHUD.
        * @property _currentHUD
        * @type HUDDisplay
        * @private
        */
        private _currentHUD: Kiwi.HUD.HUDDisplay;

        /**
        * The default HUDDisplay that is to be used.
        * The defaultHUD cannot be removed, and a game (that supports HUDS) will always contain the defaultHUD.
        *
        * @property defaultHUD
        * @type {HUDDisplay}
        * @public
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
        * Changes the currentHUD that is being displayed to one that is passed.
        * @method setHUD
        * @param hud {HUDDisplay} The HUD you want to display. 
        * @public
        */
        public setHUD(hud: Kiwi.HUD.HUDDisplay) {
            if (this.supported) {
                this.hideHUD();
                this._currentHUD = hud;
                this.showHUD();
            }
        }

        /**
        * Shows the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method showHUD
        * @param [hud=currentHUD] {HUDDisplay} The HUDDisplay you want to show. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        public showHUD(hud:Kiwi.HUD.HUDDisplay=this._currentHUD) {
            hud.show();
        }

        /**
        * Hides the currentHUD (if nothing is passed) or shows a HUDDisplay that is passed.
        * @method hideHUD 
        * @param [hud=currentHUD] {HUDDisplay} The HUDDisplay you want to hude. Defaults to the currentHUD if nothing is passed.
        * @public
        */
        public hideHUD(hud:Kiwi.HUD.HUDDisplay=this._currentHUD) {
            hud.hide();
        }

        /**
        * Creates a new HUDDisplay on this HUDManager.
        * 
        * @method createHUD
        * @param name {string} Name of the new HUDDisplay that is being creates.
        * @param [switchTo=false] {boolean} Switch to the new HUD that was created. DE
        * @return {HUDDisplay} The HUDDisplay that was created.
        * @public
        */
        public createHUD(name: string, switchTo:boolean=false): Kiwi.HUD.HUDDisplay {
            
            if (this.supported) {

                var hud: Kiwi.HUD.HUDDisplay = new Kiwi.HUD.HUDDisplay(this._game, name);
                hud.hide();
                this.addToContainer(hud);
                this._huds.push(hud);
                
                if(switchTo === true) this.setHUD(hud);

                return hud;

            }
        }

        /**
        * Removes a HUDDisplay off this manager. Returns a boolean indicating whether or not this method was a success.
        *
        * @method removeHUD
        * @param hud {HUDDisplay} The hud you want to remove.
        * @returns {boolean} If this method succeeded or not.
        * @public
        */
        public removeHUD(hud: Kiwi.HUD.HUDDisplay):boolean {
            if (this.supported) {
                if (hud === this._defaultHUD) {
                    return false;
                }

                if (this._currentHUD === hud) {
                    this.setHUD(this._defaultHUD);
                }

                this.removeFromContainer(hud);

                var i = this._huds.indexOf(hud);

                if (i !== -1) {
                    this._huds.splice(i, 1);
                }

                return true;
            }
        }

        /**
        * Adds a HUDDisplays HTMLDivElement to this HUDManagers container element.
        * @method addToContainer
        * @param hud {HUDDisplay} The HUDDisplay that is to be added.
        * @private
        */
        private addToContainer(hud:Kiwi.HUD.HUDDisplay) {
            if (this._device == Kiwi.TARGET_BROWSER) {
                this._hudContainer.appendChild(hud.container);
            }
        }

        /**
        * Removes the hud that is passed from this HUD Manager. Checks to see if that hud has this container as a parent first.
        * @method removeFromContainer
        * @param hud {HUDDisplay} The hud to be removed
        * @private
        */
        private removeFromContainer(hud: Kiwi.HUD.HUDDisplay) {
            if (this._device == Kiwi.TARGET_BROWSER) {
                if (this._hudContainer.contains(hud.container)) {
                    this._hudContainer.removeChild(hud.container);
                }
            }

        }

        /**
        * Game loop
        * @method update
        * @public
        */
        public update() {
            if (this._supported) {
                for (var i = 0; i < this._huds.length; i++) {
                    this._huds[i].update();
                }
            }
        }

    }
}

