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
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param game {Game} The game that this type of tile belongs to.
    * @param tilemap {TileMap} The TileMap that this type of tile is on.
    * @param index {number} The unique index that this tile has associated with it.
    * @param width {number} The width of this tile. Only used for collision detection.
    * @param height {number} The height of this tile. Only used for collision detection.
    * @return {TileType}
    * 
    */
    export class TileType {
 
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, index: number, cellIndex: number = -1) {

            this.tilemap = tilemap;
            this.index = index;
            this.cellIndex = cellIndex;

        }

        public properties: any = {};

        /**
        * A reference to the tilemap this tile object belongs to.
        * @property tilemap
        * @type TileMap
        * @public
        */
        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

        /**
        * The index of this tile type in the core map data.
        * For example, if your map only has 16 different types of tiles in it, this will be one of those tiles and thus a number between 1 and 16.
        * @property index
        * @type number
        * @public
        */
        public index: number;

        public cellIndex: number;

    }

}