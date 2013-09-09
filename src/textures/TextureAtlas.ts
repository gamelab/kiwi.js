/// <reference path="../animation/Sequence.ts" />


module Kiwi.Textures {

    
    export class TextureAtlas {

        /*
        * 
        * @constructor
        * @param {string} name
        * @param {number} type
        * @param {any} cells
        * @param {HTMLImageElement} image
        * @param {Sequence[]} sequences
        * @return {Kiwi.Textures.TextureAtlas}
        */
        constructor(name: string, type:number, cells, image?: HTMLImageElement, sequences?: Kiwi.Animation.Sequence[]) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
            this._type = type;
        }

        public objType(): string {
            return "TextureAtlas";
        }

        /*
        * The name of this texture atlas
        * @property name
        * @type string
        */
        public name: string;
        
        /*
        * The image that this texture atlas is holding.
        * @property image
        * @type HTMLImageElement
        */
        public image: HTMLImageElement;
        
        /*
        * The cells for this image.
        * @property cells
        * @type Array
        */
        public cells: Array;
        
        /*
        * Sequences that are for this texture.
        * @property sequences
        * @type Kiwi.Sequence
        */
        public sequences: Kiwi.Animation.Sequence[];
        
        /*
        * The cell that is to be render at the start.
        * @property cellIndex
        * @type number
        */
        public cellIndex: number = 0;
        
        /*
        * The type of texture atlas that this is.
        * @property _type
        * @type number
        */
        private _type: number;
        
        /*
        * The difference types of texture atlases.
        */
        public static SINGLE_IMAGE: number = 0;

        public static SPRITE_SHEET: number = 1;

        public static TEXTURE_ATLAS: number = 2;

        /*
        * Will return to you the type of texture atlas that this one is.
        * @type number
        */
        public get type(): number {
            return this._type;
        }
        
        /*
        * Will populate this texture atlas with information based of the JSON file that was passed.
        * 
        * @method readJSON
        * @param {any} atlasJSON
        */
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
                    
                    var seq = new Kiwi.Animation.Sequence(obj.sequences[i].name, obj.sequences[i].cells);
                    
                    if (obj.sequences[i].speed !== undefined) seq.speed = obj.sequences[i].speed;
                    if (obj.sequences[i].loop !== undefined)  seq.loop = obj.sequences[i].loop;
                    
                    this.sequences.push(seq);
                }
            
            } 

        }

        


    }

}

