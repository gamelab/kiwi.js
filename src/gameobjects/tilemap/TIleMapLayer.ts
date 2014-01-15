/**
* 
* @module GameObjects
* @submodule Tilemap
* 
*/

module Kiwi.GameObjects.Tilemap {

    export class TileMapLayer extends Kiwi.Entity {

        constructor(tilemap: Kiwi.GameObjects.Tilemap.TileMap, name: string, data: number[], x: number= 0, y: number= 0) {
            super(tilemap.state, x, y);

            this.name = name;
            this.tilemap = tilemap;
            this._data = data;

        }

        public tilemap: Kiwi.GameObjects.Tilemap.TileMap;

        public properties: any = {};

        private _data: number[];
    }
}
