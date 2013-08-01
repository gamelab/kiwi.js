module Kiwi.GameObjects {

    export class Tile extends Kiwi.Entity {

        constructor(tileLayer: Kiwi.GameObjects.TileMapLayer, tileType: Kiwi.GameObjects.TileType, width: number, height: number, x: number, y: number) {
            super(true, false, false);

            this.tileLayer = tileLayer;

            this._iX = x;
            this._iY = y;

            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.size = this.components.add(new Kiwi.Components.Size(width, height));
            this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.position, this.size));
            this.tileUpdate(tileType);
        }

        public objType() {
            return "Tile";
        }

        public tileUpdate(tileType: Kiwi.GameObjects.TileType) {
            this.tileType = tileType;
            this.physics.mass = this.tileType.mass;
            this.physics.allowCollisions = this.tileType.allowCollisions;
            this.physics.immovable = this.tileType.immovable;
        }

        public tileLayer: Kiwi.GameObjects.TileMapLayer;

        public tileType: Kiwi.GameObjects.TileType;

        public position: Kiwi.Components.Position;

        public size: Kiwi.Components.Size;

        public physics: Kiwi.Components.ArcadePhysics;
        
        private _iX: number;

        private _iY: number;

        public updatePos(x: number, y: number) {

            this.position.setTo(x + this._iX, y + this._iY);

        }

    }

}