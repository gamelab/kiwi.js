

module Kiwi.GameObjects.Tilemap {

    export class TileType {

        /*
        * 
        * @constructor
        * @param {Kiwi.Game}
        * @param {Kiwi.GameObjects.TileMap} tilemap
        * @param {number} index
        * @param {number} width
        * @param {number} height
        */
        constructor(game: Game, tilemap: Kiwi.GameObjects.Tilemap.TileMap, index: number, width: number, height: number) {

            this._game = game;
            this.tilemap = tilemap;
            this.index = index;

            this.width = width;
            this.height = height;

            this.allowCollisions = Kiwi.Components.ArcadePhysics.NONE;
            this.seperate = false;
            this.immovable = true;
        }

        /*
        * The game that this tiletype belongs to 
        */
        private _game: Game;

        /*
        *  You can give this Tile a friendly name to help with debugging. Never used internally.
        */
        public name: string;

        /*
        * The mass of the tile.
        */
        public mass: number = 1.0;
        
        /*
        * The width/height of the tile
        */
        public width: number;
        public height: number;

        /*
        * If the tilemap is immovable or not.
        */
        public immovable: boolean;

        /*
        * Which side or if the user can collide on anyside.
        * @public
        */
        public allowCollisions: number;
        
        /*
        * If when collided with seperate the objects it collided with.
        */
        public seperate: bool;

        /**
         * A reference to the tilemap this tile object belongs to.
         */
        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

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