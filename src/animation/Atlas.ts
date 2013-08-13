


module Kiwi {

    
    export class Atlas {

        constructor(name?: string, cells?: Array, texture?, sequences?: Array) {//swap cells to after texture?

            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.texture = texture;
        
        }

        public name: string;
        public texture;
        public cells: Array;
        public sequences: Array;

        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);
            this.name = obj.name;
            this.cells = obj.cells;
            if (obj.sequences) { // leave as empty array if no animations
                this.sequences = obj.sequence; //creation of sequences go here...
            } 

        }

        


    }

}

