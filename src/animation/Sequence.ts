
module Kiwi.Animation {


    export class Sequence {

        constructor(name:string,cells:number[],speed:number=0.1,loop:boolean=true) {
            this.name = name;
            this.cells = cells;
            this.speed = speed;
            this.loop = loop;
        }

        public name: string;
        public cells: number[];
        public speed: number;
        public loop: boolean;

    }
}