


module Kiwi.HUD {

    
    export class HUDManager {
        // Constructor
        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        private _game: Kiwi.Game;

        private _hudContainer: HTMLDivElement;

        public boot() {

            //create hudcontainer

            this._hudContainer = <HTMLDivElement>document.createElement("div");
            this._hudContainer.id = "HUDContainer";
            this._hudContainer.style.position = "absolute";
            this._hudContainer.style.width = "100%";
            this._hudContainer.style.height = "100%";
            //this._hudContainer.style.backgroundColor = "green";
            //this._hudContainer.style.opacity = ".4";
            
           

            //layer on top of the stage container
            this._game.stage.container.appendChild(this._hudContainer);

            this._huds = new Array<HUDDisplay>();

            this._defaultHUD = this.createHUD("defaultHUD");
            this._currentHUD = this._defaultHUD;
           // console.log(this._currentHUD);
            this.setHUD(this._defaultHUD);
            

        }

        public objType():string {
            return "HUDManager";
        }

        private _huds: Array<Kiwi.HUD.HUDDisplay>;

        private _defaultHUD: Kiwi.HUD.HUDDisplay;

        private _currentHUD: Kiwi.HUD.HUDDisplay;

        /*
            Sets or returns the default hud
        */
        public defaultHUD(val?: Kiwi.HUD.HUDDisplay): Kiwi.HUD.HUDDisplay {
            if (val) {

                if (this._currentHUD === this._defaultHUD) {
                    this._currentHUD = val;
                    this.setHUD(this._currentHUD);
                }
                this._defaultHUD = val;
                
            }

            return this._defaultHUD;
        }

        //swaps to hud
        public setHUD(hud: Kiwi.HUD.HUDDisplay) {
            console.log(hud);
            this.removeHUD(this._currentHUD);
            this._hudContainer.appendChild(hud.container);
            this._currentHUD = hud;

        }

        /*
            Shows the current HUD
        */
        public showHUD() {
            console.log('visible');
            this._currentHUD.container.style.display = 'block';
        }

        /*
            Hides the current HUD.
        */
        public hideHUD() {
            console.log('hidden');
            this._currentHUD.container.style.display = 'none';
        }

       
        /*
            Creates a new HUD
        */
        public createHUD(name: string): Kiwi.HUD.HUDDisplay{
            
            var hud: Kiwi.HUD.HUDDisplay = new Kiwi.HUD.HUDDisplay(this._game, name);
            this._huds.push(hud);
            console.log(hud);
            return hud;
        }

        /*
            Removes a hud off the screen.
        */
        public removeHUD(hud: Kiwi.HUD.HUDDisplay) {
             
            if (this._hudContainer.contains(hud.container)) {       
                this._hudContainer.removeChild(hud.container); 
            }

        }

        /*
            Deletes the hud from the manager
        */
        public destroyHUD(hud: Kiwi.HUD.HUDDisplay) {
            console.log(this._huds);

            //is it the default hud?
            if (hud === this._defaultHUD) {
                //go away. you no remove this hud! >:(
                klog.error("Cannot remove the default HUD.");
                return false;
            }

            //is it the current hud?
            if (this._currentHUD === hud) {
                this.setHUD(this._defaultHUD);  //switch to the default?
            }

            //remove of the stage if it is there
            this.removeHUD(hud);

            //remove from the array
            var i = this._huds.indexOf(hud);

            if (i !== -1) {
                //  kill the hud
                this._huds.splice(i, 1);
            }

            hud = null;
        }

        public update() {
            for (var i = 0; i < this._huds.length; i++) {
                this._huds[i].update();
            }
        }

        public render() {
            this._currentHUD.render();
        }




    }
}

