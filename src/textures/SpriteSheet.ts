/**
* Kiwi - Textures
* @module Kiwi
* @submodule Textures
*
*/ 

module Kiwi.Textures  {

    /**
    *
    *
    * @class SpriteSheet
    *
    */
    export class SpriteSheet extends TextureAtlas{

        /*
        *
        * @constructor
        * @param {string} name
        * @param {HTMLImageElement} texture
        * @param {number} cellWidth
        * @param {number} cellHeight
        * @param {number} numCells
        * @param {number} rows
        * @param {number} cols
        * @param {number} sheetOffsetX
        * @param {number} sheetOffsetY
        * @param {number} cellOffsetX
        * @param {number} cellOffsetY
        * @return {Kiwi.Textures.SpriteSheet}
        */
        constructor(name: string, texture:HTMLImageElement, cellWidth: number, cellHeight: number, numCells?:number,rows?:number,cols?:number,sheetOffsetX?: number, sheetOffsetY?:number,cellOffsetX?:number,cellOffsetY?:number) {
            
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            
            this._cols = cols || texture.width / cellWidth;
            this._rows = rows || texture.height / cellHeight;
            this.numCells = numCells || this.cols * this.rows;
            
            this.sheetOffsetX = sheetOffsetX || 0;
            this.sheetOffsetY = sheetOffsetY || 0;

            this.cellOffsetX = cellOffsetX || 0;
            this.cellOffsetY = cellOffsetY || 0;
            
            super(name, Kiwi.Textures.TextureAtlas.SPRITE_SHEET, this.generateAtlasCells(), texture, this.sequences);
        }

        public objType(): string {
            return "SpriteSheet";
        }
        
        /*
        * The width of a single cell.
        * @property cellWidth
        * @type number
        */
        private cellWidth: number;
        
        /*
        * The height of a single cell.
        * @property cellHeight
        * @type number
        */
        private cellHeight: number;
        
        /*
        * The number of cells that are on this spritesheet
        * @property numCells
        * @type number
        */
        private numCells: number;
        
        /*
        * The number of rows for the spritesheet
        * @property rows
        * @type number
        */
        private _rows: number;
        
        /*
        * Get the number of rows.
        * @type number
        */
        public get rows(): number {
            return this._rows;
        }

        /*
        * The number of columns that are on this spritesheet
        * @property cols
        * @type number
        */
        private _cols: number;
        
        /*
        * Get the number of columns.
        * @type number
        */
        public get cols(): number {
            return this._cols;
        }

        /*
        * How much the whole spritesheet should be offset by on the X axis.
        * @property sheetOffsetX
        * @type number
        */
        private sheetOffsetX: number;
        
        /*
        * How much the whole spritesheet should be offset by on the Y axis.
        * @property sheetOffsetY
        * @type number
        */
        private sheetOffsetY: number;
        
        /*
        * How much each cell should be offset by on the X axis.
        * @property cellOffsetX
        * @type number
        */
        private cellOffsetX: number;
        
        /*
        * How much each cell should be offset by on the Y axis.
        * @property cellOffsetY
        * @type number
        */
        private cellOffsetY: number;
        
        /*
        * Generates the atlas cells based on the information that was provided. 
        * 
        * @method generateAtlasCells
        * @return {Array}s
        */
        public generateAtlasCells(): Array {

            var cells = new Array();
            var cellNumeric: number[] = new Array();

            var dx = this.sheetOffsetX;
            var dy = this.sheetOffsetY;
            var i = 0;
            
            for (var y = 0; y < this.rows; y++) {
                for (var x = 0; x < this.cols; x++) {

                    cells.push({
                        x: dx,
                        y: dy,
                        w: this.cellWidth,
                        h: this.cellHeight,
                        hitboxes: [
                            {
                                x: 0,
                                y: 0,
                                w: this.cellWidth,
                                h: this.cellHeight
                            }
                        ]
                    });

                    cellNumeric.push(i++);

                    dx += this.cellOffsetX + this.cellWidth;
                }
                dx = this.sheetOffsetX;
                dy += this.cellOffsetY + this.cellHeight;
            }

            //generate default sequence
            this.sequences = new Array();
            this.sequences.push(new Kiwi.Animation.Sequence('default', cellNumeric)); 

            return cells;
        }

    }

}

