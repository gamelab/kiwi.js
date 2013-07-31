module Kiwi.GameObjects {

    export class Tile extends Kiwi.Entity {

        constructor(parentLayer: Kiwi.GameObjects.TileMapLayer, type: Kiwi.GameObjects.TileType, width: number, height: number, x: number, y: number) {
            super(true, false, false);

            this.parentLayer = parentLayer;
            this.type = type;

            this.iX = x;
            this.iY = y;
            this.position = this.components.add(new Kiwi.Components.Position(x, y));
            this.size = this.components.add(new Kiwi.Components.Size(width, height));

            //physics
        }

        public objType() {
            return "Tile";
        }

        public parentLayer: Kiwi.GameObjects.TileMapLayer;

        public iX: number;

        public iY: number;

        public type: Kiwi.GameObjects.TileType;

        public position: Kiwi.Components.Position;

        public size: Kiwi.Components.Size;

        public updatePosition(pX:number, pY: number) {
            this.position.setTo(this.iX + pX, this.iY + pY);
        }

    }

}