/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {

    /**
    * Define's the properties of a single Type of Tile for a TileMap. This class should not be directly instanted, 
    * but instead when wanting to create new TileType's you should use the 'createdTileType' methods on a TileMap object.
    * 
    * @class TileType
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor
    * @param tilemap {TileMap} The TileMap that this TileType is a part of.
    * @param index {Number} The index of this TileType, which Tiles use when wanting to use this TileType.
    * @param cellIndex {Number} The cell number to use when rendering this Type of Tile.
    * @return {TileType} This TileType
    * @public
    */
    export class TileType {
 
        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, index: number, cellIndex: number = -1) {

            this.tilemap = tilemap;
            this.index = index;
            this.cellIndex = cellIndex;
            this.offset = new Kiwi.Geom.Point(0, 0);
        
        }

        /**
        * The collision information for this type of tile. 
        * It's values are the same as the Static properties inside of the ArcadePhysics Component. 
        * @property allowCollisions
        * @type number
        * @default NONE
        * @public
        */
        public allowCollisions: number = Kiwi.Components.ArcadePhysics.NONE;

        /**
        * The properties associated with this type of tile. 
        * These are set when loading a JSON file that had properties associated with a TileType. 
        * @property properties
        * @type Object
        * @public
        */
        public properties: any = {};

        /**
        * The offset of this tile for rendering purposes. 
        * Does not affect regular collision detection.
        * 
        * @property offset
        * @type Point
        * @public
        */ 
        public offset: Kiwi.Geom.Point;
        
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

        /**
        * A number relating to the cell that should be when rendering a Tile that uses this TileType.
        * A cellIndex of -1 means this type of tile will not be rendered.
        * @property cellIndex
        * @type number
        * @public
        */
        public cellIndex: number;

        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TileType";
        }

    }

}