/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {

    /**
    * Defines a particular type of tile that is used on a TileMap. A TileType object should never be directly instantiated by a developer, but instead referenced through the TileMap that it belongs to. A new TileType is created for each cell that exists on the SpriteSheet that is parse when creating a TileMap. Note: There is always a TileType (at index of -1) generated which you can use when no tile will be placed in that spot.
    * 
    * @class TileType
    * @constructor
    * @param gmae {Game} The game that this type of tile belongs to.
    * @param tilemap {TileMap} The TileMap that this type of tile is on.
    * @param index {number} The unique index that this tile has associated with it.
    * @param width {number} The width of this tile. Only used for collision detection.
    * @param height {number} The height of this tile. Only used for collision detection.
    * @return {TileType}
    * 
    */
    export class TileType {
 
        constructor(game: Game, tilemap: Kiwi.GameObjects.Tilemap.TileMap, cellIndex:number, index: number) {

            this._game = game;
            this.tilemap = tilemap;
            this.index = index;
            this.cellIndex = cellIndex;

            this.allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
            this.seperate = false;
            this.immovable = true;
        }

        /**
        * The game that this tiletype belongs to.
        * @property _game
        * @type Game
        * @private 
        */
        private _game: Kiwi.Game;

        /**
        *  You can give this Tile a friendly name to help with debugging. Never used internally.
        * @property name
        * @type string
        * @public
        */
        public name: string;

        /**
        * The mass of the tile. Intended to be used in future with ArcadePhysics. Currently not used.
        * @property mass
        * @type number
        * @default 1.0
        * @public
        */
        public mass: number = 1.0;
        
        /**
        * If this tile type is immovable or not.
        * @property immovable
        * @type boolean
        * @default true
        * @public
        */
        public immovable: boolean;

        /**
        * Which side/s at which objects can collide with this type of tile.
        * @property allowCollisions
        * @type number
        * @public
        */
        public allowCollisions: number;
        
        /**
        * If when a object collides with this type of tile, they should both seperate.
        * @property seperate
        * @type boolean
        * @public
        */
        public seperate: boolean;

        /**
        * A reference to the tilemap this tile object belongs to.
        * @property tilemap
        * @type TileMap
        * @public
        */
        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

        /**
        * The index of this tile type in the core map data.
        * For example, if your map only has 16 different types of tiles in it, this will be one of those tiles and thus a number between 0 and 15.
        * @property index
        * @type number
        * @public
        */
        public index: number;

        public cellIndex: number;

        /**
        * Clean up memory by destroying the references to other objects that this class maintains.
        * @method destroy
        * @public
        */
        public destroy() {
            delete this.tilemap;
            delete this._game;
        }

    }

}