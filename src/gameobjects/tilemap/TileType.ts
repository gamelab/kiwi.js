

module Kiwi.GameObjects {

    export class TileType {

        constructor(game: Game, tilemap: Kiwi.GameObjects.TileMap, index: number, width: number, height: number) {

            this._game = game;
            this.tilemap = tilemap;
            this.index = index;

            this.width = width;
            this.height = height;

            this.tx = 0;
            this.ty = 0;

            this.allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
            this.seperate = false;
            this.immovable = true;
        }

        private _game: Game;

        //  You can give this Tile a friendly name to help with debugging. Never used internally.
        public name: string;

        public mass: number = 1.0;
        public width: number;
        public height: number;

        public tx:number;
        public ty: number;
        public immovable: boolean;
        /*
        * Which side or if the user can collide on anyside.
        */
        public allowCollisions: number;
        public seperate: bool;

        /**
         * A reference to the tilemap this tile object belongs to.
         */
        public tilemap: TileMap;

        /**
         * The index of this tile type in the core map data.
         * For example, if your map only has 16 tiles in it,
         * this number is usually between 0 and 15.
         */
        public index: number;

        /**
         * Clean up memory.
         */
        public destroy() {

            this.tilemap = null;

        }
        /**
        * Returns a string representation of this object.
        * @method toString
        * @return {string} a string representation of the object.
        **/
        public toString(): string {

            return "[{TileType (index=" + this.index + " collisions=" + this.allowCollisions + " width=" + this.width + " height=" + this.height + ")}]";

        }

    }

}