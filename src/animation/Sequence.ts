
module Kiwi {


    export class Sequence {

        constructor(name:string,cells:number[]) {
            this.name = name;
            this.cells = new Array();
            
            
        }

        public name: string;
        public cells: number[];
    }
}