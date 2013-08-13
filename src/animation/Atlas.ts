


module Kiwi {

    
    export class Atlas {

        constructor(name?: string, cells?: Array, image?:HTMLImageElement, sequences?:Array) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
        }

        public name: string;
        public image:HTMLImageElement;
        public cells: Array;
        public sequences: Array;

        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);
            this.name = obj.name;
            this.cells = obj.cells;
            if (obj.sequences) { // leave as empty array if no animations
                this.sequences = obj.sequence;
            } 

        }

        


    }

}

