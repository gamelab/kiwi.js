
module Kiwi {


    export class Sequence {

        constructor(name:string,cells:number[]) {
            this.name = name;
            this.cells = cells;
            
        }

        public name: string;
        public cells: number[];
    }
}