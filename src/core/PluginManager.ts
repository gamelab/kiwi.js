/**
@module Kiwi
**/

module Kiwi {


	export class PluginManager {

		/**
		The plugin manager registers plugins, checks plugin dependencies,
		and calls designated functions on each registered plugin at boot time,
		and during the update loop if required.

		Plugins are registered on the global Kiwi instance.
		This will apply to any game created on the webpage.
		Once a plugin in registered it is allocated a place on the
		`Kiwi.Plugins` name space, e.g. `FooPlugin` will be accessible at
		`Kiwi.Plugins.FooPlugin`.

		When a game instance is created, it can contain a list of
		required plugins in the configuration object.
		At this point the plugin manager will validate that the plugins exist,
		and that dependencies are met
		(both Kiwi version and versions of other required plugins).
		If the plugin has a `create` function, the plugin manager instance will
		call that function as part of the boot process.
		The `create` function may do anything, but usually it would create an
		instance of an object.

		The plugin manager `update` function is called
		every update loop. If an object was created by the `create` function
		and it has an `update` function, that function will be called in turn.

		@class PluginManager
		@namespace Kiwi
		@constructor
		@param game {Kiwi.Game} State that this entity belongs to.
			Used to generate the Unique ID and for garbage collection.
		@param plugins {string[]} List of plugins to validate and load
		@return {Kiwi.PluginManager}
		**/

		constructor( game: Kiwi.Game, plugins: string[] ) {
			this._game = game;
			this._plugins = plugins || new Array();
			this._bootObjects = new Array();
			this.validatePlugins();
			this._createPlugins();
		}

		/**
		Array of plugins which have been included in the webpage
		and registered successfully.

		@property _availablePlugins
		@type array
		@static
		@private
		**/
		private static _availablePlugins = new Array();

		/**
		Array of objects representing all available plugins,
		each containing the name and version number of an available plugin

		@property getAvailablePlugins
		@type array
		@static
		@public
		**/
		public static get availablePlugins(): any {
			var plugins = [];
			for (
					var i = 0;
					i < PluginManager._availablePlugins.length;
					i++ ) {
				plugins.push( {
					name: PluginManager._availablePlugins[ i ].name,
					version: PluginManager._availablePlugins[ i ].version
				} );
			}
			return plugins;
		}

		public static register( plugin: any ) {

			/**
			Register a plugin object as available.

			Any game instance can choose to use the plugin.
			Plugins need only be registered once per webpage.
			If registered a second time it will be ignored.
			Two plugins with the same names cannot be reigstered simultaneously,
			even if different versions.

			@method register
			@param {object} plugin
			@public
			@static
			**/

			Kiwi.Log.log(
				"Kiwi.PluginManager: Attempting to register plugin : " +
				plugin.name,
				"#plugin" );
			if ( this._availablePlugins.indexOf( plugin ) == -1 ) {

				// check if plugin with same name is registered
				var uniqueName: boolean = true;
				for ( var i = 0; i < this._availablePlugins.length; i++ ) {
					if ( plugin.name === this._availablePlugins[ i ].name ) {
						uniqueName = false;
					}
				}

				if ( uniqueName ) {
					this._availablePlugins.push( plugin );
					Kiwi.Log.log(
						"  Kiwi.PluginManager: Registered plugin " +
						plugin.name +
						": version " +
						plugin.version,
						"#plugin" );
				} else {
					Kiwi.Log.warn(
						"  Kiwi.PluginManager: A plugin with the same name " +
						"has already been registered. Ignoring this plugin.",
						"#plugin" );
				
				}
			} else {
				Kiwi.Log.warn(
					"  Kiwi.PluginManager: This plugin has already been " +
					"registered. Ignoring second registration.",
					"#plugin" );
			}
		}

		/**
		Identifies the object as a PluginManager.

		@property objType
		@type string
		@default "PluginManager"
		@public
		**/
		public get objType(): string {
			return "PluginManager";
		}

		/**
		Game instance that owns the PluginManager

		@property _game
		@type Kiwi.Game
		@private
		**/
		private _game: Kiwi.Game;

		/**
		Array of plugin names which the game instance has been configured
		to use. Each name must match the constructor function for the plugin.

		@property _plugins
		@type array
		@private
		**/
		private _plugins: string[];

		/**
		Array of objects that contain a boot function,
		each of which will be called when `PluginManager.boot` is invoked.

		@property _bootObjects
		@type array
		@private
		**/
		private _bootObjects: any[];

		public validatePlugins() {

			/**
			Build a list of valid plugins used by the game instance.
			Each plugin name that is supplied in the `Kiwi.Game` constructor
			configuration object is checked against the `Kiwi.Plugins`
			namespace to ensure that a property of the same name exists.
			This will ignore plugins that are registered but not used
			by the game instance.

			@method validatePlugins
			@public
			**/

			var validPlugins: string[] = new Array();
			Kiwi.Log.log(
				"Kiwi.PluginManager: Validating Plugins",
				"#plugins" );

			for ( var i = 0; i < this._plugins.length; i++ ) {

				var plugin: any = this._plugins[ i ];

				if ( typeof plugin == "string" || plugin instanceof String ) {
					if ( Kiwi.Plugins.hasOwnProperty( plugin ) &&
							this.pluginIsRegistered( plugin ) ) {

						validPlugins.push( plugin );
						Kiwi.Log.log(
							"  Kiwi.PluginManager: Plugin \"" +
							plugin +
							"\" appears to be valid.",
							"#plugin" );
						Kiwi.Log.log(
							"  Kiwi.PluginManager: Name:" +
							Kiwi.Plugins[ plugin ].name,
							"#plugin" );
						Kiwi.Log.log(
							"  Kiwi.PluginManager: Version:" +
							Kiwi.Plugins[ plugin ].version,
							"#plugin" );

						// test for kiwi version compatiblity
						if ( typeof Kiwi.Plugins[ plugin ].
								minimumKiwiVersion !== "undefined" ) {

							Kiwi.Log.log(
								"  Kiwi.PluginManager: \"" +
								plugin +
								"\" requires minimum Kiwi version " +
								Kiwi.Plugins[ plugin ].minimumKiwiVersion,
								"#plugin" );
							var parsedKiwiVersion = Utils.Version.parseVersion(
									Kiwi.VERSION );
							var parsedPluginMinVersion =
									Utils.Version.parseVersion(
										Kiwi.Plugins[ plugin ].
											minimumKiwiVersion );

							if ( parsedKiwiVersion.majorVersion > parsedPluginMinVersion.majorVersion ) {
								Kiwi.Log.warn(
									"  Kiwi.PluginManager: " +
									"This major version of Kiwi is greater " +
									"than that required by \"" +
									plugin +
									"\". It is unknown whether this plugin " +
									"will work with this version of Kiwi",
									"#plugin" );
							} else {
								if ( Utils.Version.greaterOrEqual(
										Kiwi.VERSION, Kiwi.Plugins[ plugin ].
											minimumKiwiVersion ) ) {
									Kiwi.Log.log(
										"  Kiwi.PluginManager: " +
										"Kiwi version meets minimum version " +
										"requirements for \"" +
										plugin +
										"\".",
										"#plugin" );
								} else {
									Kiwi.Log.warn(
										"  Kiwi.PluginManager: " +
										"Kiwi version " +
										Kiwi.VERSION +
										" does not meet minimum version " +
										"requirements for the plugin ( " +
										Kiwi.Plugins[ plugin ].
											minimumKiwiVersion +
										" ).",
										"#plugin" );
								}
							}
						} else {
							Kiwi.Log.warn(
								"  Kiwi.PluginManager: \"" +
								plugin +
								"\" is missing the minimumKiwiVersion " +
								"property. It is unknown whether \"" +
								plugin +
								"\" will work with this version of Kiwi",
								"#plugin" );
						}


					} else {
						Kiwi.Log.log(
							"  Kiwi.PluginManager: Plugin \"" +
							plugin +
							"\" appears to be invalid. " +
							"No property with that name exists on the " +
							"Kiwi.Plugins object or the Plugin is not " +
							"registered. Check that the js file containing " +
							"the plugin has been included. " +
							"This plugin will be ignored",
							"#plugin" );
					}
				} else {
					Kiwi.Log.log(
						"  Kiwi.PluginManager: " +
						"The supplied plugin name at index " + i +
						"is not a string and will be ignored",
						"#plugin" );
				}
			}
			this._plugins = validPlugins;

			for ( var i = 0; i < this._plugins.length; i++ ) {

				// test for plugin dependencies on other plugins
				var pluginName: string = this._plugins[ i ];
				var plugin = Kiwi.Plugins[ pluginName ];

				if ( typeof plugin.pluginDependencies !== "undefined" ) {
					if ( plugin.pluginDependencies.length === 0 ) {
						Kiwi.Log.log( "  Kiwi.PluginManager: \"" +
							pluginName +
							"\" does not depend on any other plugins.",
							"#plugin" );
					} else {
						Kiwi.Log.log(
							"  Kiwi.PluginManager: \"" +
							pluginName +
							"\" depends on the following plugins:",
							"#plugin",
							"#dependencies" );
						for (
								var j = 0;
								j < plugin.pluginDependencies.length;
								j++ ) {
							Kiwi.Log.log(
								plugin.pluginDependencies[ j ].name,
								plugin.pluginDependencies[ j ].minimumVersion,
								"#plugin",
								"#dependencies" );
							if ( !this.validMinimumPluginVersionExists(
									plugin.pluginDependencies[ j ].name,
									plugin.pluginDependencies[ j ].
										minimumVersion ) ) {
								Kiwi.Log.warn(
									"  Kiwi.PluginManager: \"" +
									plugin.pluginDependencies[ j ].name +
									"\" hasn't been added to this game via " +
									"the config, doesn't exist, or does not " +
									"meet minimum version requirement (" +
									plugin.pluginDependencies[ j ].
										minimumVersion +
									" ).",
									"#plugin",
									"#dependencies" );
							}
						}

					}
				} else {
					Kiwi.Log.log(
						"  Kiwi.PluginManager: \"" +
						pluginName +
						"\" does not depend on any other plugins.",
						"#plugin",
						"#dependencies" );
				}
			}
		}

		public validMinimumPluginVersionExists(
			name: string, version: string ): boolean {

			/**
			Return whether a valid minimum version of a plugin exists.

			@method validMinimumPluginVersionExists
			@param name {string} Name of plugin
			@param version {string} Minimum version
			@return boolean
			@public
			**/

			if ( this._plugins.indexOf( name ) !== -1 ) {
				if ( Utils.Version.greaterOrEqual(
						Kiwi.Plugins[ name ].version, version ) ) {
					return true;
				}
			}
			return false;
		}

		public pluginIsRegistered( pluginName: string ): boolean {

			/**
			Return `true` if a plugin identified by the supplied `pluginName`
			is registered.

			@method pluginIsRegistered
			@param {string} pluginName
			@return boolean
			@public
			**/

			for (
					var i = 0;
					i < Kiwi.PluginManager._availablePlugins.length;
					i++ ) {
				if ( Kiwi.PluginManager._availablePlugins[ i ].name ===
						pluginName ) {
					return true;
				}
			}
			return false;
		}

		private _createPlugins() {

			/**
			Attempt to find a `create` function on each plugin, and call it
			if it exists. Called after all other core objects and services
			created by the `Kiwi.Game` constructor are created.

			The `create` function may return an object on which a
			`boot` function exists - to be called during boot process.

			@method _createPlugins
			@private
			**/

			for ( var i = 0; i < this._plugins.length; i++ ) {
				var plugin: string = this._plugins[ i ];
				if ( Kiwi.Plugins[ plugin ].hasOwnProperty( "create" ) ) {
					var bootObject = Kiwi.Plugins[ plugin ].create(
						this._game );
					if ( bootObject ) {
						this._bootObjects.push( bootObject );
					}
				}
			}
		}

		public boot() {

			/**
			Call the `boot` functions on any objects that plugins
			used by the game instance have designated during creation.

			@method boot
			@public
			**/

			for ( var i = 0; i < this._bootObjects.length; i++ ) {
				if ( "boot" in this._bootObjects[ i ] ) {
					this._bootObjects[ i ].boot.call( this._bootObjects[ i ] );
				} else {
					Kiwi.Log.warn(
						"Kiwi.PluginManager: Warning! No boot function " +
						"found on boot object.",
						"#plugin" );
				}
			}

		}

		public update() {

			/**
			Call the `update` functions on any objects that plugins
			used by the game instance have designated during creation.

			@method update
			@public
			**/

			for ( var i = 0; i < this._bootObjects.length; i++ ) {
				if ( "update" in this._bootObjects[ i ] ) {
					this._bootObjects[ i ].update.call(
						this._bootObjects[ i ] );
				}
			}
		}
	}
}
