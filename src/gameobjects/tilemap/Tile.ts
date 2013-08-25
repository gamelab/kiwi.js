module Kiwi.GameObjects.Tilemap {

    export class Tile extends Kiwi.Entity {

        /*
        *
        * @constructor
        * @param {Kiwi.GameObjects.TileMapLayer} tileLayer
        * @param {Kiwi.GameObjects.TileType} tileType
        * @param {number} width
        * @param {number} height
        * @param {number} x
        * @param {number} y
        */
        constructor(tileLayer: Kiwi.GameObjects.Tilemap.TileMapLayer, tileType: Kiwi.GameObjects.Tilemap.TileType, width: number, height: number, x: number, y: number) {
            super();

            this.tileLayer = tileLayer;

            this.transform.x = x;
            this.transform.y = y;
            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this)); //i think this is no longer needed....
            this.tileUpdate(tileType);
        }

        public objType() {
            return "Tile";
        }

        /*
        * This method handles the updating of the type of tile this tile is.
        * 
        * @method tileUpdate
        * @param {Kiwi.GameObjects.TileType} tileType
        */
        public tileUpdate(tileType: Kiwi.GameObjects.Tilemap.TileType) {
            this.tileType = tileType;
            this.physics.mass = this.tileType.mass;
            this.physics.allowCollisions = this.tileType.allowCollisions;
            this.physics.immovable = this.tileType.immovable;
        }

        /*
        * What tile map layer it is currently on.
        */
        public tileLayer: Kiwi.GameObjects.Tilemap.TileMapLayer;

        /*
        * Reference to the type of tile that this tile is.
        */
        public tileType: Kiwi.GameObjects.Tilemap.TileType;

        /*
        * The physics component used for arcade physics
        */
        public physics: Kiwi.Components.ArcadePhysics;
        
        /*
        * Position in the mapData that this tile is in.
        */ 
        public tx: number;
        public ty: number;

    }

}