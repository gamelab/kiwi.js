/**
* 
* @module Kiwi
* 
*/

module Kiwi {


    export class PluginManager {

        constructor(game: Kiwi.Game,plugins:string[]) {
            this._game = game;
            this._plugins = plugins || new Array();
            this._bootFunctions = new Array();
            console.log("creating PluginManager");
            this.validatePlugins();
            this._createPlugins();
        }

        private static _availablePlugins: any[] = new Array();
            
        public static register(plugin: any) {
            if (this._availablePlugins.indexOf(plugin) == -1) {
                this._availablePlugins.push(plugin);
                console.log("Registered plugin " + plugin.name + ": version " + plugin.version);
            } else {
                console.log("This plugin has already been registered. Ignoring second registration.");
            }
        }

               
        
        public objType(): string {
            return "PluginManager";
        }

        private _game: Kiwi.Game;
        private _plugins: string[];
        private _bootFunctions: Function[];

        public validatePlugins() {
            var validPlugins: string[] = new Array();

            for (var i = 0; i < this._plugins.length; i++) {
                var plugin: any = this._plugins[i];
                if (typeof plugin == 'string' || plugin instanceof String) {
                    if (Kiwi.Plugins.hasOwnProperty(plugin)) {
                        validPlugins.push(plugin);
                        console.log("Plugin '" + plugin + "' appears to be valid.");
                    } else {
                        console.log("Plugin '" + plugin + "' appears to be invalid. No property with that name exists on the Kiwi.Plugins object. Check that the js file containing the plugin has been included. This plugin will be ignored");
                    }
                } else {
                    console.log("The supplied plugin name at index " + i + "is not a string and will be ignored"); 
                }
            }
            this._plugins = validPlugins;
        }

        private _createPlugins() {
            for (var i = 0; i < this._plugins.length; i++) {
                var plugin: string = this._plugins[i];
                if (Kiwi.Plugins[plugin].hasOwnProperty("create")) {
                    console.log("'Create' function found on plugin '" + plugin + "'");
                    var bootFunction = Kiwi.Plugins[plugin].create(this._game);
                    if (bootFunction) this._bootFunctions.push(bootFunction);
                    
                } else {
                    console.log("No 'Create' function found on plugin '" + plugin + "'");
                }
            }
           
           
        }

        public boot() {
            console.log("boot pluginmanager");
            for (var i = 0; i < this._bootFunctions.length; i++) {
                console.log("Booting plugin " + i);
                //this._bootFunctions[i].call(this,this._game);
                this._bootFunctions[i](this._game);
            }

        }

        
    }
}