

module Kiwi.Plugins.Gamefroot {


    export class TileMapConverter {

        constructor(jsonData: any, imageData: any) {
            this._gfData = JSON.parse(jsonData);
            this._gfImg = <HTMLImageElement>imageData;
            this.kiwiData = {
                "version": 1,
                "height": 0,
                "width": 0,
                "tileheight":TileMapConverter.GF_TILE_WIDTH,
                "tilewidth": TileMapConverter.GF_TILE_HEIGHT,
                "orientation": "orthogonal",
                "layers": [],
                "tilesets": [],
                "properties": {}
             }
        }

        private static GF_TILE_WIDTH:number = 48;
        private static GF_TILE_HEIGHT:number = 48;

        private _gfData: any;
        private _gfImg: HTMLImageElement;
        public  kiwiData: any;

        



        public convert() {

            this._convertWidthHeight();
            this._convertTilesets();
            this._convertLayers();
        }

        private _convertWidthHeight() {
            var terrain = this._gfData.map.terrain;
            
            for (var i = 0; i < terrain.length; i++) {
                if (parseInt(terrain[i].xpos) > this.kiwiData.width) this.kiwiData.width = parseInt(terrain[i].xpos) + 1;
                if (parseInt(terrain[i].ypos) > this.kiwiData.height) this.kiwiData.height = parseInt(terrain[i].ypos) + 1;
            }
        }

        private _convertTilesets() {

            var tileset = {
                "firstgid": 1,
                "image": "",
                "imageheight": 0,
                "imagewidth": 0,
                "margin": 0,
                "name": "",
                "properties":
                {

                } ,
                "spacing": 0,
                "tileheight": 48,
                "tilewidth": 48
            }
            tileset.image = this._gfImg.src;
            tileset.imagewidth = this._gfImg.width;
            tileset.imageheight = this._gfImg.height;
            tileset.name = "gf_tileset";
            this.kiwiData.tilesets.push(tileset);


        }

        private _convertLayers() {
            //var terrain = this._gfData.map.terrain;
            
            //get background
            //this.kiwiData.layers.push(this._convertLayer(0));

            //get terrain
            this.kiwiData.layers.push(this._convertLayer(1));
            //get foreground
            //this.kiwiData.layers.push(this._convertLayer(2));

            

        }
        private _convertLayer(layerNumber: number): any {
     
            var layer = {
                "name": "gf_layer_" + layerNumber,
                "data": [],
                "height": this.kiwiData.height,
                "width": this.kiwiData.width,
                "opacity": 1,
                "type": "tilelayer",
                "visible": true,
                "x": 0,
                "y": 0
            };

            //fill empty
            var totalTiles = layer.width * layer.height;
            for (var i = 0; i < totalTiles; i++) {
                layer.data.push(0);
            }
            var tilesPerRow:number = this.kiwiData.tilesets[0].imagewidth/TileMapConverter.GF_TILE_WIDTH;
            var tilesPerColumn:number = this.kiwiData.tilesets[0].imageheight/TileMapConverter.GF_TILE_HEIGHT;

            var terrain = this._gfData.map.terrain;
           
            var count = 0;
            for (var i = 0; i < terrain.length; i++) {
                //check if tile is on layer
                if (terrain[i].zpos === String(layerNumber)) {
                    count++;
                    //get gf xy coords of tile;
                    var x = terrain[i].xpos;
                    var y = terrain[i].ypos;
                    //calculate kiwi data index
                    var dataIndex = y * this.kiwiData.width + x;

                    //get gf sprite id position
                    var gfpos = this._getSpritePosition(terrain[i].animation_id);
                  
                    layer.data[dataIndex] = gfpos + 1;//this will change with bigger map
                    //if (layer.data[dataIndex] == null)
                    
                }
            }
            return layer;
        }

        private _getSpritePosition(id): number {
            var sprites = this._gfData.sprites.animations;
            var result: number = -1;
            for (var i = 0; i < sprites.length; i++) {
                if (sprites[i].id === String(id)) {
                    return sprites[i].sprite_id;
                }
            }

            return result;
        }






        }





    }

