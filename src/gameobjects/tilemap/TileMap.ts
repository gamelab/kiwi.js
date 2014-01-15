/**
* 
* @module GameObjects
* @submodule Tilemap
* @main Tilemap
*/

module Kiwi.GameObjects.Tilemap { 
    
    /**
    * 
    * @class TileMap
    * @namespace Kiwi.GameObjects.Tilemap
    * @constructor 
    * @param state {State} The state that this Tilemap is on.
    * @return {TileMap}
    */
    export class TileMap {
 
        constructor(state: Kiwi.State, tileMapDataKey?: string, atlas?: Kiwi.Textures.TextureAtlas) {

            this.tileTypes = [];
            this._newTileType(-1);
            this.layers = [];
            this.atlas = [];

            this.state = state;
            this.game = state.game;

            if (tileMapDataKey !== null && atlas !== null) {
                this.createFromFileStore(tileMapDataKey, atlas);
            }

        }

        public orientation: string;

        public tileTypes: any[];

        public layers: any[];

        public state: Kiwi.State;

        public game: Kiwi.Game;

        public atlas: Kiwi.Textures.TextureAtlas[];

        private _data: any[];

        public tileWidth: number = 0;

        public tileHeight: number = 0;

        public width: number = 0;

        public height: number = 0;

        public get widthInPixels(): number {
            return this.width * this.tileWidth;
        }

        public get heightInPixels(): number {
            return this.height * this.tileHeight;
        }

        public properties: any = {};

        public createFromFileStore(tileMapDataKey: string, atlas: Kiwi.Textures.TextureAtlas) {

            //Does the JSON exist?
            if (this.game.fileStore.exists(tileMapDataKey) == false) {
                console.error('The Tilemap Data you passed does not exist in the FileStore.  ');
                return;
            }

            //Parse the JSON
            var json = JSON.parse( this.game.fileStore.getFile(tileMapDataKey).data );

            //Get the map information
            this.orientation = (json.orietation == undefined) ? "orthogonal" : json.orientation;
            this.tileWidth = (json.tilewidth == undefined) ? 32 : json.tilewidth;
            this.tileHeight = (json.tileheight == undefined) ? 32 : json.tileheight;
            this.width = json.width;
            this.height = json.height;

            //Add the properties
            for (var prop in json.properties) {
                this.properties[prop] = json.properties[prop];
            }


            //Add the atlas to the atlas of used atlases.
            this.atlas.push(atlas);

            //Generate the Tiles needed.
            if (json.tilesets !== "undefined") 
                this._generateTypesFromTileset(json.tilesets);
            

            //Generate the layers we need
            for (var i = 0; i < json.layers.length; i++) {
                var layerData = json.layers[i];

                //Check what type it is.
                switch (json.layers[i].type) {
                    case "tilelayer":
                        var layer = this.createNewLayer(layerData.name, layerData.data, layerData.x * this.tileWidth, layerData.y * this.tileHeight);
                        
                        //Add the extra data...
                        layer.visible = (layerData.visible == undefined) ? true : layerData.visible;
                        layer.alpha = (layerData.opacity == undefined) ? 1 : layerData.opacity;
                        if (layerData.width !== undefined) layer.width = layerData.width;  
                        if (layerData.height !== undefined) layer.height = layerData.height;
                        if (layerData.properties !== undefined)layer.properties = layerData.properties;

                        break;

                    case "objectgroup":
                        this.createNewObjectLayer();
                        continue;
                        break;

                    case "imagelayer":
                        this.createNewImageLayer();
                        continue;
                        break;
                }


            }

        }

        private _generateTypesFromTileset( tilesetData:any[] ) {

            //Loop through the tilesets
            for (var i = 0; i < tilesetData.length; i++) {

                var tileset = tilesetData[i];

                var m = tileset.margin;
                var s = tileset.spacing; 
                var tw = tileset.tilewidth;
                var th = tileset.tileheight;
                var iw = tileset.imagewidth - m;
                var ih = tileset.imageheight - m;

                //Calculate how many tiles there are in this tileset and thus how many different tile type there can be.
                for (var y = m; y < ih; y += th) {
                    for (var x = m; x < iw; x += tw) {
                        this._newTileType();
                    }
                }


                //Add tile properties
                for (var tp in tileset.tileproperties) {
                    this.tileTypes[(tp + tileset.firstgid)].properties = tileset.tileproperties[tp];
                }

            }


        }

        //Generates a new tile type and appends it to the tiletypes array
        private _newTileType(cell:number = -1):TileType {
            var tileType = new TileType(this, this.tileTypes.length, cell);
            this.tileTypes.push(tileType);

            return tileType;
        }

        //Creates a new general tilelayer
        public createNewLayer(name: string= '', data?: number[], x: number= 0, y: number= 0): TileMapLayer {

            //If no data has been provided then create a blank one.
            if (data == undefined) {
                var i = 0;
                while (i < this.width * this.height) {
                    data.push(0);
                }
            }

            //Create the new layer
            var layer = new Kiwi.GameObjects.Tilemap.TileMapLayer(this, name, data, x, y);
            layer.width = this.width;
            layer.height = this.height;

            //Add the new layer to the array
            this.layers.push(layer);

            return layer;
        }

        //eventually will create a new object layer
        public createNewObjectLayer() {
            console.log("OBJECT GROUP layers are currently not supported.");
        }

        //eventually will create a new image layer
        public createNewImageLayer() {
            console.log("IMAGE layers are currently not supported.");
        }

        /**
        * The type of object that it is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "TileMap";
        }

       
    }

}