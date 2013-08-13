


module Kiwi {

    
    export class Atlas {

        constructor(name:string,cells,image?:HTMLImageElement,sequences?) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
        }

        public name: string;
        public image:HTMLImageElement;
        public cells: Array;
        public sequences: Array;

        public cellIndex: number = 0;

        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);
            this.name = obj.name;
            this.cells = obj.cells;
            if (obj.sequences) { // leave as empty array if no animations
                this.sequences = obj.sequences;
            } 

        }

        


    }

}

