


module Kiwi.Textures {

    
    export class TextureAtlas {

        constructor(name: string, type:number, cells, image?: HTMLImageElement, sequences?: Sequence[]) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
            this._type = type;
        }

        public name: string;
        public image:HTMLImageElement;
        public cells: Array;
        public sequences: Sequence[];
        public cellIndex: number = 0;
        private _type: number;
        
        public static SINGLE_IMAGE: number = 0;

        public static SPRITE_SHEET: number = 1;

        public static TEXTURE_ATLAS: number = 2;

        public get type(): number {
            return this._type;
        }

        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);
            this.name = obj.name;
            
            for (var i = 0; i < obj.cells.length; i++) {
                this.cells.push(obj.cells[i]);

                if (obj.cells[i].hitboxes === undefined) {
                    this.cells[i].hitboxes = new Array();
                    this.cells[i].hitboxes.push({ x: 0, y: 0, w: this.cells[i].w, h: this.cells[i].h });
                }

            }

            if (obj.sequences) { // leave as empty array if no animations

                for(var i = 0; i < obj.sequences.length; i++) {
                    
                    var seq = new Kiwi.Sequence(obj.sequences[i].name, obj.sequences[i].cells);
                    
                    if (obj.sequences[i].speed !== undefined) seq.speed = obj.sequences[i].speed;
                    if (obj.sequences[i].loop !== undefined)  seq.loop = obj.sequences[i].loop;
                    
                    this.sequences.push(seq);
                }
            
            } 

        }

        


    }

}

