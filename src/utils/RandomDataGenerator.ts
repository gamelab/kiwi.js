/**
* 
* @module Kiwi
* @submodule Utils
*/

module Kiwi.Utils {

    /**
    * Manages the creation of unique internal game IDs.
    * Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense
    * Random number generator from http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
    *
    * @class RandomDataGenerator
    * @constructor
    * @namespace Kiwi.Utils
    * @param [seeds=[]] {String[]}
    * @return {RandomDataGenerator}
    *
    * @author Josh Faul
    */
    export class RandomDataGenerator {
         
        constructor(seeds: string[] = []) {

            this.sow(seeds);

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "RandomDataGenerator";
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @property s0
        * @type Any
        * @private
        */
        private s0;

        /**
        * [DESCRIPTION REQUIRED]
        * @property s1
        * @type Any
        * @private
        */
        private s1;

        /**
        * [DESCRIPTION REQUIRED]
        * @property s2
        * @type Any
        * @private
        */
        private s2;

        /**
        * [DESCRIPTION REQUIRED]
        * @property c
        * @type Number
        * @default 1
        * @private
        */
        private c: number = 1;

        /**
        * Used to contain various arrays of data that can be used when randomly generating blocks of text.
        * @property _data
        * @type Object
        * @private
        */
        private _data = {

            lipsum: [
			    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
			    "adipiscing", "elit", "nunc", "sagittis", "tortor", "ac", "mi",
			    "pretium", "sed", "convallis", "massa", "pulvinar", "curabitur",
			    "non", "turpis", "velit", "vitae", "rutrum", "odio", "aliquam",
			    "sapien", "orci", "tempor", "sed", "elementum", "sit", "amet",
			    "tincidunt", "sed", "risus", "etiam", "nec", "lacus", "id", "ante",
			    "hendrerit", "malesuada", "donec", "porttitor", "magna", "eget",
			    "libero", "pharetra", "sollicitudin", "aliquam", "mattis", "mattis",
			    "massa", "et", "porta", "morbi", "vitae", "magna", "augue",
			    "vestibulum", "at", "lectus", "sed", "tellus", "facilisis",
			    "tincidunt", "suspendisse", "eros", "magna", "consequat", "at",
			    "sollicitudin", "ac", "vestibulum", "vel", "dolor", "in", "egestas",
			    "lacus", "quis", "lacus", "placerat", "et", "molestie", "ipsum",
			    "scelerisque", "nullam", "sit", "amet", "tortor", "dui", "aenean",
			    "pulvinar", "odio", "nec", "placerat", "fringilla", "neque", "dolor"
            ]
        };

        /**
        * [DESCRIPTION REQUIRED]
        * @method uint32
        * @return {Any}
        * @private
        */
        private uint32():any {

            return this.rnd.apply(this) * 0x100000000; // 2^32

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fract32
        * @return {Any}
        * @private
        */
        private fract32():any {

            return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53

        }

        // private random helper
        /**
        * [DESCRIPTION REQUIRED]
        * @method rnd
        * @return {Any}
        * @private
        */
        private rnd():any {

            var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

            this.c = t | 0;
            this.s0 = this.s1;
            this.s1 = this.s2;
            this.s2 = t - this.c;

            return this.s2;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method hash
        * @param data {Any}
        * @private
        */
        private hash(data):any {

            var h, i, n;

            n = 0xefc8249d;

            data = data.toString();

            for (i = 0; i < data.length; i++)
            {
                n += data.charCodeAt(i);
                h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }

            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32

        }

        /**
        * Reset the seed of the random data generator
        * @method sow
        * @param [seeds=[]] {String[]}
        * @public
        */
        public sow(seeds: string[] = []) {

            this.s0 = this.hash(' ');
            this.s1 = this.hash(this.s0);
            this.s2 = this.hash(this.s1);

            var seed;

            for (var i = 0; seed = seeds[i++];)
            {
                this.s0 -= this.hash(seed);
                this.s0 += ~~(this.s0 < 0);

                this.s1 -= this.hash(seed);
                this.s1 += ~~(this.s1 < 0);

                this.s2 -= this.hash(seed);
                this.s2 += ~~(this.s2 < 0);
            }

        }

        /**
        * Returns a random integer between 0 and 2^32
        * @method integer
        * @return {Number}
        * @public
        */
        public integer(): number {

            return this.uint32();

        }

        /**
        * Returns a random real number between 0 and 1
        * @method frac
        * @return {Number}
        * @public
        */
        public frac(): number {

            return this.fract32();

        }

        /**
        * Returns a random real number between 0 and 2^32
        * @method real
        * @return {Number}
        * @public
        */
        public real(): number {

            return this.uint32() + this.fract32();

        }

        /**
        * Returns a random integer between min and max
        * @method integerInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        public integerInRange(min: number, max: number): number {

            return Math.floor(this.realInRange(min, max));

        }
 
        /**
        * Returns a random real number between min and max
        * @method realInRange
        * @param min {Number}
        * @param max {Number}
        * @return {Number}
        * @public
        */
        public realInRange(min: number, max: number): number {

            min = min || 0;
            max = max || 0;

            return this.frac() * (max - min) + min;

        }

        /**
        * Returns a random real number between -1 and 1
        * @method normal
        * @return {Number}
        * @public
        */
        public normal(): number {

            return 1 - 2 * this.frac();

        }

        /**
        * Returns a valid v4 UUID hex string (from https://gist.github.com/1308368)
        * @method uuid
        * @return {String}
        * @public
        */
        public uuid(): string {

            var a, b;

            for (
                b = a = '';
                a++ < 36;
                b += ~a % 5 | a * 3 & 4 ? (a ^ 15 ? 8 ^ this.frac() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-'
            );

            return b;
        }
 
        /**
        * Returns a random member of `array`
        * @method pick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        public pick(array):any {

            return array[this.integerInRange(0, array.length)];

        }

        /**
        * Returns a random member of `array`, favoring the earlier entries
        * @method weightedPick
        * @param {Any} array
        * @return {Any}
        * @public
        */
        public weightedPick(array):any {

            return array[~~(Math.pow(this.frac(), 2) * array.length)];

        }

        /**
        * Returns a random word of lipsum
        * @method word
        * @return {String}
        * @public
        */
        public word():string {

            return this.pick(this._data.lipsum);

        }

        /**
        * Returns `n` random words of lipsum, 3 if not specified
        * @method words
        * @param {Number} [quantity=3] Amount of random words to get.
        * @return {String} 
        * @public
        */
        public words(quantity: number = 3):string {

            var ret = [];

            for (var i = 0; i < quantity; i++)
            {
                ret.push(this.pick(this._data.lipsum));
            }

            return ret.join(' ');

        }

        /**
        * Returns a random lipsum sentence
        * @method sentence
        * @return {String}
        * @public
        */
        public sentence():String {

            var ret;

            ret = this.words(this.integerInRange(2, 16)).replace(/[a-z]/, function (m) {
                return m.toUpperCase();
            });

            return ret + '.';

        }

        /**
        * Returns `n` random lipsum sentences, 3 if not specified
        * @method sentences
        * @param {Number} [quantity=3] The number of sentences to grab.
        * @return {String}
        * @public
        */
        public sentences(quantity: number = 3) {

            var ret = [];

            for (var i = 0; i < quantity; i++)
            {
                ret.push(this.sentence());
            }

            return ret.join(' ');

        }

        /**
        * Returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified
        * @method timestamp
        * @param [min=946684800000] {Number} The lowest timestamp.
        * @param [max=1577862000000] {Number} The highest timestamp.
        * @return {Number}
        * @public
        */
        public timestamp(min: number = 946684800000, max: number = 1577862000000):number {

            return this.realInRange(min, max);

        }

        /**
        * Returns a random angle between -180 and 180
        * @method angle
        * @return {Number}
        * @public
        */
        public angle():number {

            return this.integerInRange(-180, 180);

        }

    }

}
