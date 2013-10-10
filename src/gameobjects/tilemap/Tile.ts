/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {

    /**
    * A single Tile that exists on the mapData property inside of a TileMapLayer. A Tile should never be directly created by a user but instead reference through its TileMapLayer which would have created it. Each Tile has an ArcadePhysics component that can be used for collision detection.
    * 
    * @class Tile
    * @extends Entity
    * @constructor
    * @param state {State} The state that this Tile is on.
    * @param tileLayer {TileMapLayer} The TileMapLayer that this Tile is a part of.
    * @param tileTypes {TileType} The type of tile that this is.
    * @param width {number} The width of this tile.
    * @param height {number} The height of this tile.
    * @param x {number} The tiles x coordinate.
    * @param y {number} The tiles y coordinate.
    * @return {Tile} 
    *
    */
    export class Tile extends Kiwi.Entity {
         
        constructor(state:Kiwi.State, tileLayer: Kiwi.GameObjects.Tilemap.TileMapLayer, tileType: Kiwi.GameObjects.Tilemap.TileType, width: number, height: number, x: number, y: number) {
            super(state,x,y);

            this.width = width;
            this.height = height;
            this.tileLayer = tileLayer;

            this.box = this.components.add(new Kiwi.Components.Box(this, this.x, this.y, this.width, this.height));
            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this));

            this.tileUpdate(tileType);
        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Tile";
        }

        /**
        * This method handles the updating of the type of tile this tile is. Internal use by Kiwi only.
        * 
        * @method tileUpdate
        * @param {TileType} tileType
        * @public
        */
        public tileUpdate(tileType: Kiwi.GameObjects.Tilemap.TileType) {
            this.tileType = tileType;
            this.physics.allowCollisions = this.tileType.allowCollisions;
            this.physics.immovable = this.tileType.immovable;
                
        }

        /**
        * What tile map layer it is currently on.
        * @property tileLayer
        * @type TileMapLayer
        * @public
        */
        public tileLayer: Kiwi.GameObjects.Tilemap.TileMapLayer;

        /**
        * Reference to the type of tile that this tile is.
        * @property tileType
        * @type TileType
        * @public
        */
        public tileType: Kiwi.GameObjects.Tilemap.TileType;

        /**
        * The physics component that is used of collision detection.
        * @property physics
        * @type ArcadePhysics
        * @public
        */
        public physics: Kiwi.Components.ArcadePhysics;
        
        /**
        * The box component containing the bounding box of this object.
        * @property box
        * @type Box
        * @public
        */
        public box: Kiwi.Components.Box;

        /**
        * The width of this tile.
        * @property width
        * @type number
        * @public
        */
        public width: number;

        /**
        * The height of this tile.
        * @property height
        * @type number
        * @public
        */
        public height: number;

        /**
        * Position in the mapData object on the x axis in the TileMap that this tile is.
        * @property tx
        * @type number
        * @public
        */ 
        public tx: number;
        
        /**
        * Position in the mapData object on the y axis in the TileMap that this tile is.
        * @property ty
        * @type number
        * @public
        */ 
        public ty: number;

    }

}