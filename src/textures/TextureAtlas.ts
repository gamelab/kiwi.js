


module Kiwi.Textures {

    
    export class TextureAtlas {

        constructor(name:string,cells,image?:HTMLImageElement,sequences?) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
        }

        public name: string;
        public image:HTMLImageElement;
        public cells: Array;
        public sequences: Sequence[];

        public cellIndex: number = 0;

        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);
            this.name = obj.name;
            this.cells = obj.cells;
            if (obj.sequences) { // leave as empty array if no animations

                for(var i = 0; i < obj.sequences.length; i++) {
                    
                    var seq = new Kiwi.Sequence(obj.sequences[i].name, obj.sequences[i].cells);
                    
                    if (obj.sequences[i].speed) seq.speed = obj.sequences[i].speed;
                    if (obj.sequences[i].loop) seq.loop = obj.sequences[i].loop;

                    this.sequences.push(seq);
                }
            
            } 

        }

        


    }

}

