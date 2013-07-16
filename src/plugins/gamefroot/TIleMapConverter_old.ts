
// Module
module Kiwi.Plugins.Gamefroot {

    // Class
    export class TileMapConverter_old {
        // Constructor
        constructor(jsonData: any, imageData: any) {
            this._gf = JSON.parse(jsonData);
            this._gfImg = <HTMLImageElement>imageData;
            
        }

        private _gf: any;
        private _gfImg: HTMLImageElement;
        private _kiwiTileMap: any;
        private _gfTerrain: any;
        private _kiwiTileset: any;

        public convert():any {
            console.log(this._gf);
            console.log(this._gfImg);

            if (!this._gfTerrain) {
                console.log("no terrain found in gf object");
            }
            this._gfTerrain = this._gf.map.terrain;

            this._initTileMap();

            this._kiwiTileset = this._createTileSet();

            this._analyseGFImage();

            this._kiwiTileMap.tilesets.push(this._kiwiTileset)

            this._analyseGFData();

            //create layers
            for (var i = 0; i < this._totalLayers; i++) {
                var layer = this._createLayer();
                layer.name = "Layer" + (i);
                this._fillBlanks(layer.data);
                this._translateTiles(layer.data, this._layerInfo["layer" +i]);
                this._kiwiTileMap.layers.push(layer);
            }
            
            console.log(this._kiwiTileMap);
            return this._kiwiTileMap;
        }

        private _translateTiles(layerData, layerInfo) {

        }

        private _fillBlanks(arr) {
            var length = (this._maxX + 1) * (this._maxY + 1);
            for (var i = 0; i < length; i++) {
                arr.push(-1);
            }

        }

        private _initTileMap() {
          this._kiwiTileMap =   {
                "height": 40,
                "layers": [],
                "orientation": "orthogonal",
                "properties": {} ,
                "tileheight": 48,
                "tilesets": [],
                "tilewidth": 48,
                "version": 1,
                "width": 40
          }


        }

        private _createTileSet() {
            return {
                "firstgid": 1,
                "image": "",
                "imageheight": 0,
                "imagewidth": 0,
                "margin": 0,
                "name": "",
                "properties":
                   {

                   },
                "spacing": 0,
                "tileheight": 48,
                "tilewidth": 48
            }

        }

        private _createLayer() {
            return {
                "data":[],
                "height": 40,
                "name": "",
                "opacity": 1,
                "type": "tilelayer",
                "visible": true,
                "width": 40,
                "x": 0,
                "y": 0
           }
            
        }

      
        private _analyseGFImage() {
            console.log("Analysing GF Image Data");
            console.log(this._gfImg.width, this._gfImg.height);
            this._kiwiTileset.imagewidth = this._gfImg.width;
            this._kiwiTileset.imageheight = this._gfImg.height;


        }

        private _totalTiles: number;
        private _totalLayers: number;
        private _layerInfo;
        private _maxX: number;
        private _maxY: number;


        private _analyseGFData() {
            console.log("Analysing GF Tilemap Data");

            //total num tiles
            this._totalTiles = this._gfTerrain.length;
            console.log("Total tiles : " + this._totalTiles );

            this._totalLayers = 0;
            this._maxX = 0;
            this._maxY = 0;
            //it's assumed that layers always start with "1", work upwards and are sequential with no gaps
            //total num layers
            this._layerInfo = {};
            for (var i = 0; i < this._totalTiles; i++) {
                //if new then create prop
                var layerName = "layer" + this._gfTerrain[i].zpos;
                if (parseInt(this._gfTerrain[i].xpos) > this._maxX) this._maxX = parseInt(this._gfTerrain[i].xpos);
                if (parseInt(this._gfTerrain[i].ypos) > this._maxY) this._maxY = parseInt(this._gfTerrain[i].ypos);

                if (!this._layerInfo.hasOwnProperty(layerName)) {
                    this. _layerInfo[layerName] = [i];
                    this._totalLayers++;
                } else {
                    this._layerInfo[layerName].push(i);
                }

            }


            //this._totalLayers = layerInfo;
            console.log(this._layerInfo);
            console.log("Total layers : " + this._totalLayers);
            console.log("MaxX : " + this._maxX);
            console.log("MaxY : " + this._maxY);



        }
        
    }

}
