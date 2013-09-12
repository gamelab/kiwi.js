/**
* Kiwi - Animation
* @module Kiwi
* @submodule Animation 
* 
*/
 
module Kiwi.Animation {

    /**
    * 
    * 
    * @class Sequence
    * 
    */
    export class Sequence {

        /**
        * 
        * @constructor
        * @param {String} name - The name of this sequence. This is not unique.
        * @param {Number[]} cells - The cells that are in this animation.
        * @param {Number} speed - The time an animation should spend on each frame.
        * @param {boolean} loop - If the sequence should play again if it was animating and the animation reaches the last frame.
        * @return {Kiwi.Animation.Sequence} 
        */
        constructor(name:string,cells:number[],speed:number=0.1,loop:boolean=true) {
            this.name = name;
            this.cells = cells;
            this.speed = speed;
            this.loop = loop;
        }

        /**
        * The name of this sequence.
        * @property name
        * @type string
        * @public
        */
        public name: string;

        /**
        * The cells that are in this animation.
        * These are a reference to the cells that are contained in a texture atlas that this sequence should be a part of.
        * @property cells
        * @type number[]
        * @public
        */
        public cells: number[];

        /**
        * The time an animation should spend on each cell.
        * @property speed
        * @type boolean
        * @public
        */
        public speed: number;
        
        /**
        * If the sequence should play again if it was animating and the animation reaches the last frame.
        * @property loop
        * @type boolean
        * @public
        */
        public loop: boolean;

    }
}