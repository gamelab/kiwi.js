module Kiwi.GameObjects {

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
        constructor(tileLayer: Kiwi.GameObjects.TileMapLayer, tileType: Kiwi.GameObjects.TileType, width: number, height: number, x: number, y: number) {
            super();

            this.tileLayer = tileLayer;

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.size = this.components.add(new Kiwi.Components.Size(width, height));
            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.position, this.size));
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
        public tileUpdate(tileType: Kiwi.GameObjects.TileType) {
            this.tileType = tileType;
            this.physics.mass = this.tileType.mass;
            this.physics.allowCollisions = this.tileType.allowCollisions;
            this.physics.immovable = this.tileType.immovable;
        }

        /*
        * What tile map layer it is currently on.
        */
        public tileLayer: Kiwi.GameObjects.TileMapLayer;

        /*
        * Reference to the type of tile that this tile is.
        */
        public tileType: Kiwi.GameObjects.TileType;

        /*
        * The position of the tile on the stage. This is only ever used as a reference and won't actually update the position of the tile when rendered.
        */
        public position: Kiwi.Components.Position;

        /*
        * The size of this tile. This is only ever used as a reference and won't actually update the size of the tile when rendered.
        */
        public size: Kiwi.Components.Size;

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