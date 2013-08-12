


module Kiwi {


    export class SpriteSheet extends Atlas{

        constructor(name: string, texture:HTMLImageElement,cellWidth: number, cellHeight: number, numCells?:number,rows?:number,cols?:number,sheetOffsetX?: number, sheetOffsetY?:number,cellOffsetX?:number,cellOffsetY?:number) {
            
                        
            
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.cols = cols || texture.width / cellWidth;
            this.rows = rows || texture.height / cellHeight;
            this.numCells = numCells || cols * rows;
            this.sheetOffsetX = sheetOffsetX || 0;
            this.sheetOffsetY = sheetOffsetY || 0;
            this.cellOffsetX = cellOffsetX || 0;
            this.cellOffsetY = cellOffsetY || 0;
          
            super(name, this.generateAtlasCells(),texture);
        }

        public name: string;
        private cellWidth: number;
        private cellHeight: number;
        private numCells: number;
        private rows: number;
        private cols: number;
        private sheetOffsetX: number;
        private sheetOffsetY: number;
        private cellOffsetX: number;
        private cellOffsetY: number;
        
        

        public generateAtlasCells(): Array {
            // cell generation goes here
            return new Array();
        }

    }

}

