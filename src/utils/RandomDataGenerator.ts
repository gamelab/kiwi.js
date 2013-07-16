/**
 *  Kiwi - Utils - Repeatable Random Data Generator
 *
 *  @desc       Manages the creation of unique internal game IDs
 *              Based on Nonsense by Josh Faul https://github.com/jocafa/Nonsense
 *              Random number generator from http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
 *
 *	@version 	1.1 - 1st March 2013
 *	@author 	Josh Faul
 *	@author 	Richard Davey, TypeScript conversion and additional methods
 *  @url        http://www.kiwijs.org
 */

module Kiwi.Utils {

    export class RandomDataGenerator {

        /**
        * @constructor
        * @param {Array} seeds
        * @return {Kiwi.Utils.RandomDataGenerator}
        */
        constructor(seeds: string[] = []) {

            klog.info('Random Data Generator created');

            this.sow(seeds);

        }

        public objType() {
            return "RandomDataGenerator";
        }

        /**
        * @property s0
        * @type Any
        * @private
        */
        private s0;

        /**
        * @property s1
        * @type Any
        * @private
        */
        private s1;

        /**
        * @property s2
        * @type Any
        * @private
        */
        private s2;

        /**
        * @property c
        * @type Number
        * @private
        */
        private c: number = 1;

        /**
        * @property _data
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
        * @method uint32
        * @private
        */
        private uint32() {

            return this.rnd.apply(this) * 0x100000000; // 2^32

        }

        /**
        * @method fract32
        * @private
        */
        private fract32() {

            return this.rnd.apply(this) + (this.rnd.apply(this) * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53

        }

        // private random helper
        /**
        * @method rnd
        * @private
        */
        private rnd() {

            var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

            this.c = t | 0;
            this.s0 = this.s1;
            this.s1 = this.s2;
            this.s2 = t - this.c;

            return this.s2;
        }

        /**
        * @method hash
        * @param {Any} data
        * @private
        */
        private hash(data) {

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
        * @param {Array} seeds
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
        * returns a random integer between 0 and 2^32
        * @method integer
        * @return {Number}
        */
        public integer(): number {

            return this.uint32();

        }

        /**
        *  returns a random real number between 0 and 1
        * @method frac
        * @return {Number}
        */
        public frac(): number {

            return this.fract32();

        }

        /**
        *  returns a random real number between 0 and 2^32
        * @method real
        * @return {Number}
        */
        public real(): number {

            return this.uint32() + this.fract32();

        }

        /**
        * returns a random integer between min and max
        * @method integerInRange
        * @param {Number} min
        * @param {Number} max
        * @return {Number}
        */
        public integerInRange(min: number, max: number): number {

            return Math.floor(this.realInRange(min, max));

        }
 
        /**
        * returns a random real number between min and max
        * @method realInRange
        * @param {Number} min
        * @param {Number} max
        * @return {Number}
        */
        public realInRange(min: number, max: number): number {

            min = min || 0;
            max = max || 0;

            return this.frac() * (max - min) + min;

        }

        /**
        * returns a random real number between -1 and 1
        * @method normal
        * @return {Number}
        */
        public normal(): number {

            return 1 - 2 * this.frac();

        }

        /**
        * returns a valid v4 UUID hex string (from https://gist.github.com/1308368)
        * @method uuid
        * @return {String}
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
        * returns a random member of `array`
        * @method pick
        * @param {Any} array
        */
        public pick(array) {

            return array[this.integerInRange(0, array.length)];

        }

        /**
        * returns a random member of `array`, favoring the earlier entries
        * @method weightedPick
        * @param {Any} array
        */
        public weightedPick(array) {

            return array[~~(Math.pow(this.frac(), 2) * array.length)];

        }

        /**
        * returns a random word of lipsum
        * @method word
        */
        public word() {

            return this.pick(this._data.lipsum);

        }

        /**
        * returns `n` random words of lipsum, 3 if not specified
        * @method words
        * @param {Number} quantity
        */
        public words(quantity: number = 3) {

            var ret = [];

            for (var i = 0; i < quantity; i++)
            {
                ret.push(this.pick(this._data.lipsum));
            }

            return ret.join(' ');

        }

        /**
        * returns a random lipsum sentence
        * @method sentence
        */
        public sentence() {

            var ret;

            ret = this.words(this.integerInRange(2, 16)).replace(/[a-z]/, function (m) {
                return m.toUpperCase();
            });

            return ret + '.';

        }

        /**
        * returns `n` random lipsum sentences, 3 if not specified
        * @method sentences
        * @param {Number} quantity
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
        * `returns a random timestamp between min and max, or between the beginning of 2000 and the end of 2020 if min and max aren't specified
        * @method timestamp
        * @param {Number} min
        * @param {Number} max
        */
        public timestamp(min: number = 946684800000, max: number = 1577862000000) {

            return this.realInRange(min, max);

        }

        /**
        * returns a random angle between -180 and 180
        * @method angle
        */
        public angle() {

            return this.integerInRange(-180, 180);

        }

    }

}
