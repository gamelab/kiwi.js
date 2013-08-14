
module Kiwi {


    export class Sequence {

        constructor(name:string,cells:number[],speed:number,loop:boolean) {
            this.name = name;
            this.cells = cells;
            this.speed = speed || 0.1;
            this.loop = loop || false;
        }

        public name: string;
        public cells: number[];
        public speed: number;
        public loop: boolean;

    }
}