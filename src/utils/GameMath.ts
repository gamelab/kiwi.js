/**
* 
* @module Kiwi
* @submodule Utils
*/
module Kiwi.Utils {

    /**
    * Adds a set of extra Math functions and extends a few commonly used ones.
    * Includes some methods written by Dylan Engelman.
    *
    * @class GameMath
    * @namespace Kiwi.Utils
    * @static
    *
    * @author Richard Davey
    * @author Dylan Engelman
    */
    export class GameMath {

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "GameMath";
        }

        /**
        * Holds the value for PI. Only up to 15 decimal places.
        * @property PI
        * @type number
        * @default 3.141592653589793
        * @static
        * @final
        * @public
        */
        public static PI: number = 3.141592653589793; //number pi

        /**
        * Holds the value for PI / 2 OR 90 degrees. Only up to 16 decimal places. 
        * @property PI_2
        * @type number
        * @default 1.5707963267948965
        * @static
        * @final
        * @public
        */
        public static PI_2: number = 1.5707963267948965; //PI / 2 OR 90 deg

        /**
        * Holds the value for PI / 4 OR 45 degrees. Only up to 16 decimal places.
        * @property PI_4
        * @type number
        * @default 0.7853981633974483
        * @static
        * @final
        * @public
        */
        public static PI_4: number = 0.7853981633974483; //PI / 4 OR 45 deg

        /**
        * Holds the value for PI / 8 OR 22.5 degrees. Only up to 17 decimal places
        * @property PI_8
        * @type number
        * @default 0.39269908169872413
        * @static
        * @final
        * @public
        */
        public static PI_8: number = 0.39269908169872413; //PI / 8 OR 22.5 deg

        /**
        * Holds the value for PI / 16 OR 11.25 degrees. Only up to 17 decimal places
        * @property PI_16
        * @type number
        * @default 0.19634954084936206
        * @static
        * @final
        * @public
        */
        public static PI_16: number = 0.19634954084936206; //PI / 16 OR 11.25 deg

        /**
        * Holds the value for 2 * PI OR 180 degrees. Only up to 15 decimal places
        * @property TWO_PI
        * @type number
        * @default 6.283185307179586
        * @static
        * @final
        * @public
        */
        public static TWO_PI: number = 6.283185307179586; //2 * PI OR 180 deg

        /**
        * Holds the value for 3 * PI_2 OR 270 degrees. Only up to 17 decimal places.
        * @property THREE_PI_2
        * @type number
        * @default 4.7123889803846895
        * @static
        * @final
        * @public
        */
        public static THREE_PI_2: number = 4.7123889803846895; //3 * PI_2 OR 270 deg

        /**
        * [DESCRIPTION REQUIRED]
        * @property E
        * @type number
        * @default 2.71828182845905
        * @static
        * @final
        * @public
        */
        public static E: number = 2.71828182845905; //number e

        /**
        * [DESCRIPTION REQUIRED]
        * @property LN10
        * @type number
        * @default 2.302585092994046
        * @static
        * @final
        * @public
        */
        public static LN10: number = 2.302585092994046; //ln(10)

        /**
        * [DESCRIPTION REQUIRED]
        * @property LN2
        * @type number
        * @default 0.6931471805599453
        * @static
        * @final
        * @public
        */
        public static LN2: number = 0.6931471805599453; //ln(2)

        /**
        * [DESCRIPTION REQUIRED]
        * @property LOG10E
        * @type number
        * @default 0.4342944819032518
        * @static
        * @final
        * @public
        */
        public static LOG10E: number = 0.4342944819032518; //logB10(e)

        /**
        * [DESCRIPTION REQUIRED]
        * @property LOG2E
        * @type number
        * @default 1.442695040888963387
        * @static
        * @final
        * @public
        */
        public static LOG2E: number = 1.442695040888963387; //logB2(e)

        /**
        * [DESCRIPTION REQUIRED]
        * @property SQRT1_2
        * @type number
        * @default 0.7071067811865476
        * @static
        * @final
        * @public
        */
        public static SQRT1_2: number = 0.7071067811865476; //sqrt( 1 / 2 )

        /**
        * [DESCRIPTION REQUIRED]
        * @property SQRT2
        * @type number
        * @default 1.4142135623730951
        * @static
        * @final
        * @public
        */
        public static SQRT2: number = 1.4142135623730951; //sqrt( 2 )

        /**
        * Holds the value for PI / 180 which is used to convert degrees to radians.
        * @property DEG_TO_RAD
        * @type  number
        * @default 0.017453292519943294444444444444444
        * @static
        * @final
        * @public
        */
        public static DEG_TO_RAD: number = 0.017453292519943294444444444444444; //PI / 180;

        /**
        * Holds the value for 180 / PI which is used to convert radians to degrees.
        * @property RAD_TO_DEG
        * @type number
        * @default 57.295779513082325225835265587527
        * @static
        * @final
        * @public
        */
        public static RAD_TO_DEG: number = 57.295779513082325225835265587527; // 180.0 / PI;
        

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_16
        * @type number
        * @default 65536
        * @static
        * @final
        * @public
        */
        public static B_16: number = 65536;//2^16

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_31
        * @type number
        * @default 2147483648
        * @static
        * @final
        * @public
        */
        public static B_31: number = 2147483648;//2^31

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_32
        * @type number
        * @default 4294967296
        * @static
        * @final
        * @public
        */
        public static B_32: number = 4294967296;//2^32

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_48
        * @type number
        * @default 281474976710656
        * @static
        * @final
        * @public
        */
        public static B_48: number = 281474976710656;//2^48

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_53
        * @type number
        * @default 9007199254740992
        * @static
        * @final
        * @public
        */
        public static B_53: number = 9007199254740992;//2^53 !!NOTE!! largest accurate double floating point whole value

        /**
        * [DESCRIPTION REQUIRED]
        * @property B_64
        * @type number
        * @default 18446744073709551616
        * @static
        * @final
        * @public
        */
        public static B_64: number = 18446744073709551616;//2^64 !!NOTE!! Not accurate see B_53
        

        /**
        * Holds the value for the fraction 1 / 3 as a number.
        * @property ONE_THIRD
        * @type number
        * @default 0.333333333333333333333333333333333
        * @static
        * @final
        * @public
        */
        public static ONE_THIRD: number = 0.333333333333333333333333333333333; // 1.0/3.0;

        /**
        * Holds the value for the fraction 2 / 3 as a number.
        * @property TWO_THIRDS
        * @type number
        * @default 0.666666666666666666666666666666666
        * @static
        * @final
        * @public
        */
        public static TWO_THIRDS: number = 0.666666666666666666666666666666666; // 2.0/3.0;

        /**
        * Holds the value for the fraction 1 / 6 as a number
        * @property ONE_SIXTH
        * @type number
        * @default 0.166666666666666666666666666666666
        * @static
        * @final
        * @public
        */
        public static ONE_SIXTH: number = 0.166666666666666666666666666666666; // 1.0/6.0;
        
        /**
        * [DESCRIPTION REQUIRED]
        * @property COS_PI_3
        * @type number
        * @default 0.86602540378443864676372317075294
        * @static
        * @final
        * @public
        */
        public static COS_PI_3: number = 0.86602540378443864676372317075294;//COS( PI / 3 )

        /**
        * [DESCRIPTION REQUIRED]
        * @property SIN_2PI_3
        * @type number
        * @default 0.03654595
        * @static
        * @final
        * @public
        */
        public static SIN_2PI_3: number = 0.03654595;// SIN( 2*PI/3 )
        
        /**
        * [DESCRIPTION REQUIRED]
        * @property CIRCLE_ALPHA
        * @type number
        * @default 0.5522847498307933984022516322796
        * @static
        * @final
        * @public
        */
        public static CIRCLE_ALPHA: number = 0.5522847498307933984022516322796; //4*(Math.sqrt(2)-1)/3.0;
        
        /**
        * A boolean that is true.
        * @property ON
        * @type boolean
        * @default true
        * @static
        * @final
        * @public
        */
        public static ON: boolean = true;

        /**
        * A boolean that is false.
        * @property OFF
        * @type boolean
        * @default false
        * @static
        * @final
        * @public
        */
        public static OFF: boolean = false;
        

        /**
        * [DESCRIPTION REQUIRED]
        * @property SHORT_EPSILON
        * @type number
        * @default 0.1
        * @static
        * @final
        * @public
        */
        public static SHORT_EPSILON: number = 0.1;//round integer epsilon

        /**
        * [DESCRIPTION REQUIRED]
        * @property PERC_EPSILON
        * @type number
        * @default 0.001
        * @static
        * @final
        * @public
        */
        public static PERC_EPSILON: number = 0.001;//percentage epsilon

        /**
        * [DESCRIPTION REQUIRED]
        * @property EPSILON
        * @type number
        * @default 0.0001
        * @static
        * @final
        * @public
        */
        public static EPSILON: number = 0.0001;//single float average epsilon

        /**
        * [DESCRIPTION REQUIRED]
        * @property LONG_EPSILON
        * @type number
        * @default 0.00000001
        * @static
        * @final
        * @public
        */
        public static LONG_EPSILON: number = 0.00000001;//arbitrary 8 digit epsilon

        /**
        * [DESCRIPTION REQUIRED]
        * @method computeMachineEpsilon
        * @return {Number}
        * @static
        * @public
        */
        public static computeMachineEpsilon(): number {
            // Machine epsilon ala Eispack
            var fourThirds: number = 4.0 / 3.0;
            var third: number = fourThirds - 1.0;
            var one: number = third + third + third;
            return Math.abs(1.0 - one);
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyEqual
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        public static fuzzyEqual(a: number, b: number, epsilon: number = 0.0001): boolean {
            return Math.abs(a - b) < epsilon;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyLessThan
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        public static fuzzyLessThan(a: number, b: number, epsilon: number = 0.0001): boolean {
            return a < b + epsilon;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyGreaterThan
        * @param a {number}
        * @param b {number}
        * @param [epsilon=0.0001] {number}
        * @return {boolean}
        * @static
        * @public
        */
        public static fuzzyGreaterThan(a: number, b: number, epsilon: number = 0.0001): boolean {
            return a > b - epsilon;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyCeil
        * @param val {number}
        * @param [epsilon=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        public static fuzzyCeil(val: number, epsilon: number = 0.0001): number {
            return Math.ceil(val - epsilon);
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method fuzzyFloor
        * @param val {number}
        * @param [epsilion=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        public static fuzzyFloor(val: number, epsilon: number = 0.0001): number {
            return Math.floor(val + epsilon);
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method average
        * @param [args]* {Any[]}
        * @return {Number}
        * @static
        * @public
        */
        public static average(...args: any[]): number {
            var avg: number = 0;

            for (var i = 0; i < args.length; i++)
            {
                avg += args[i];
            }

            return avg / args.length;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method slam
        * @param value {number}
        * @param target {number}
        * @param [epsilon=0.0001] {number}
        * @return {Number}
        * @static
        * @public
        */
        public static slam(value: number, target: number, epsilon: number = 0.0001): number {
            return (Math.abs(value - target) < epsilon) ? target : value;
        }

        /**
		* Ratio of value to a range.
        * @method percentageMinMax
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
		*/
        public static percentageMinMax(val: number, max: number, min: number = 0): number {
            val -= min;
            max -= min;

            if (!max) return 0;
            else return val / max;
        }

        /**
		* A value representing the sign of the value.
		* -1 for negative, +1 for positive, 0 if value is 0
		* @method sign
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        public static sign(n: number): number {
            if (n) return n / Math.abs(n);
            else return 0;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method truncate
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        public static truncate(n: number): number {
            return (n > 0) ? Math.floor(n) : Math.ceil(n);
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method shear
        * @param n {number}
        * @return {number}
        * @static
        * @public
        */
        public static shear(n: number): number {
            return n % 1;
        }

        /**
		* Wrap a value around a range, similar to modulus with a floating minimum
		* @method wrap
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        public static wrap(val: number, max: number, min: number = 0): number {
            val -= min;
            max -= min;
            if (max == 0) return min;
            val %= max;
            val += min;
            while (val < min)
                val += max;

            return val;
        }

        /**
		* Arithmetic version of wrap.
		* @method arithWrap
        * @param val {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        public static arithWrap(value: number, max: number, min: number = 0): number {
            max -= min;
            if (max == 0) return min;
            return value - max * Math.floor((value - min) / max);
        }

        /**
		* Force a value within the boundaries of two values
		* If max < min, min is returned.
		* @method clamp
        * @param input {number}
        * @param max {number}
        * @param [min=0] {number}
        * @return {number}
        * @static
        * @public
        */
        public static clamp(input: number, max: number, min: number = 0): number {
            return Math.max(min, Math.min(max, input));
        }

        /**
		* Snap a value to nearest grid slice, using rounding.
		* Example if you have an interval gap of 5 and a position of 12... you will snap to 10. Where as 14 will snap to 15
		* 
        * @method snapTo
		* @param input {number} The value to snap
		* @param gap {number} The interval gap of the grid
		* @param [start=0] {number} Optional starting offset for gap
		* @return {number}
        * @static
        * @public
        */
        public static snapTo(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.round(input / gap);
            return start + input;
        }

        /**
		* Snap a value to nearest grid slice, using floor.
		* Example if you have an interval gap of 5 and a position of 12... you will snap to 10. As will 14 snap to 10... but 16 will snap to 15
		* 
        * @method snapToFloor
		* @param input {number} The value to snap
		* @param gap {number} The interval gap of the grid
		* @param [start=0] {number} Optional starting offset for gap
		* @return {number}
        * @static
        * @public
        */
        public static snapToFloor(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.floor(input / gap);
            return start + input;
        }

        /**
		* Snap a value to nearest grid slice, using ceil.
		* Example if you have an interval gap of 5 and a position of 12... you will snap to 15. As will 14 will snap to 15... but 16 will snap to 20
		* 
        * @method snapToCeil
		* @param input {number} The value to snap
		* @param gap {number} The interval gap of the grid
		* @param [start=0] {number} optional starting offset for gap
		* @return {number}
        * @static
        * @public
		*/
        public static snapToCeil(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.ceil(input / gap);
            return start + input;
        }

        /**
		* Snaps a value to the nearest value in an array.
        * @method snapToInArray
        * @param input {number}
        * @param arr {number[]}
        * @param [sort=true] {boolean}
		* @return {number}
        * @static
        * @public
		*/
        public static snapToInArray(input: number, arr: number[], sort: boolean = true): number {

            if (sort) arr.sort();
            if (input < arr[0]) return arr[0];

            var i: number = 1;

            while (arr[i] < input)
                i++;

            var low: number = arr[i - 1];
            var high: number = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

            return ((high - input) <= (input - low)) ? high : low;
        }

        /**
		* Round to some place comparative to a 'base', default is 10 for decimal place.
		* 'place' is represented by the power applied to 'base' to get that place
		* 
        * @method roundTo
		* @param value {number} The value to round
		* @param [place=0] {number} The place to round to
		* @param [base=10] {number} The base to round in... default is 10 for decimal
		* @return {number}
        * @static
        * @public
        */
        public static roundTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.round(value * p) / p;
        }

        /*
		* E.g.
		* 
		* 2000/7 ~= 285.714285714285714285714 ~= (bin)100011101.1011011011011011
		* 
		* roundTo(2000/7,3) == 0
		* roundTo(2000/7,2) == 300
		* roundTo(2000/7,1) == 290
		* roundTo(2000/7,0) == 286
		* roundTo(2000/7,-1) == 285.7
		* roundTo(2000/7,-2) == 285.71
		* roundTo(2000/7,-3) == 285.714
		* roundTo(2000/7,-4) == 285.7143
		* roundTo(2000/7,-5) == 285.71429
		* 
		* roundTo(2000/7,3,2)  == 288       -- 100100000
		* roundTo(2000/7,2,2)  == 284       -- 100011100
		* roundTo(2000/7,1,2)  == 286       -- 100011110
		* roundTo(2000/7,0,2)  == 286       -- 100011110
		* roundTo(2000/7,-1,2) == 285.5     -- 100011101.1
		* roundTo(2000/7,-2,2) == 285.75    -- 100011101.11
		* roundTo(2000/7,-3,2) == 285.75    -- 100011101.11
		* roundTo(2000/7,-4,2) == 285.6875  -- 100011101.1011
		* roundTo(2000/7,-5,2) == 285.71875 -- 100011101.10111
		* 
		* Note what occurs when we round to the 3rd space (8ths place), 100100000, this is to be assumed 
		* because we are rounding 100011.1011011011011011 which rounds up.
		*/

        /**
        * [DESCRIPTION REQUIRED]
        * @method floorTo
        * @param value {number}
        * @param [place=0] {number}
        * @param [base=10] {number}
		* @return {number}
        * @static
        * @public
        */
        public static floorTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.floor(value * p) / p;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method ceilTo
        * @param value {number}
        * @param [place=0] {number}
        * @param [base=10] {number}
		* @return {number}
        * @static
        * @public
        */
        public static ceilTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.ceil(value * p) / p;
        }

        /**
		* A one dimensional linear interpolation of a value.
		* @method interpolateFloat
        * @param a {number}
        * @param b {number}
        * @param weight {number}
		* @return {number}
        * @static
        * @public
        */
        public static interpolateFloat(a: number, b: number, weight: number): number {
            return (b - a) * weight + a;
        }

        /**
		* Convert radians to degrees
		* @method radiansToDegrees
        * @param angle {number}
		* @return {number}
        * @static
        * @public
        */
        public static radiansToDegrees(angle: number): number {
            return angle * GameMath.RAD_TO_DEG;
        }

        /**
		* Convert degrees to radians
		* @method degreesToRadians
        * @param angle {number}
		* @return {number}
        * @static
        * @public
        */
        public static degreesToRadians(angle: number): number {
            return angle * GameMath.DEG_TO_RAD;
        }

        /**
		* Find the angle of a segment from (x1, y1) -> (x2, y2 )
        * @method angleBetween
        * @param x1 {number}
        * @param y1 {number}
        * @param x2 {number}
        * @param y2 {number}
		* @return {number}
        * @static
        * @public
		*/
        public static angleBetween(x1: number, y1: number, x2: number, y2: number): number {
            return Math.atan2(y2 - y1, x2 - x1);
        }


        /**
        * Set an angle with in the bounds of -PI to PI
        * @method normalizeAngle
        * @param angle {number}
        * @param [radians=true] {boolean}
		* @return {number}
        * @static
        * @public
        */
        public static normalizeAngle(angle: number, radians: boolean = true): number {
            var rd: number = (radians) ? GameMath.PI : 180;
            return GameMath.wrap(angle, rd, -rd);
        }

        /**
        * Closest angle between two angles from a1 to a2
        * absolute value the return for exact angle.
        * @method nearestAngleBetween 
        * @param a1 {number}
        * @param a2 {number}
        * @param [radians=true] {boolean}
		* @return {number}
        * @static
        * @public
        */
        public static nearestAngleBetween(a1: number, a2: number, radians: boolean = true): number {

            var rd: number = (radians) ? GameMath.PI : 180;

            a1 = GameMath.normalizeAngle(a1, radians);
            a2 = GameMath.normalizeAngle(a2, radians);

            if (a1 < -rd / 2 && a2 > rd / 2) a1 += rd * 2;
            if (a2 < -rd / 2 && a1 > rd / 2) a2 += rd * 2;

            return a2 - a1;
        }

        /**
        * Normalizes independent and then sets dep to the nearest value respective to independent.
        * For instance if dep=-170 and ind=170 then 190 will be returned as an alternative to -170
        * @method normalizeAngleToAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
		* @return {number}
        * @static
        * @public
        */
        public static normalizeAngleToAnother(dep: number, ind: number, radians: boolean = true): number {
            return ind + Kiwi.Utils.GameMath.nearestAngleBetween(ind, dep, radians);
        }

        /**
        * Normalize independent and dependent and then set dependent to an angle relative to 'after/clockwise' independent.
        * For instance dep=-170 and ind=170, then 190 will be reutrned as alternative to -170
        * @method normalizeAngleAfterAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
		* @return {number}
        * @static
        * @public
        */
        public static normalizeAngleAfterAnother(dep: number, ind: number, radians: boolean = true): number {

            dep = Kiwi.Utils.GameMath.normalizeAngle(dep - ind, radians);
            return ind + dep;
        }

        /**
        * Normalizes indendent and dependent and then sets dependent to an angle relative to 'before/counterclockwise' independent.
        * For instance dep = 190 and ind = 170, then -170 will be returned as an alternative to 190
        * @method normalizeAngleBeforeAnother
        * @param dep {number}
        * @param ind {number}
        * @param [radians=true] {boolean}
		* @return {number}
        * @static
        * @public
        */
        public static normalizeAngleBeforeAnother(dep: number, ind: number, radians: boolean = true): number {

            dep = Kiwi.Utils.GameMath.normalizeAngle(ind - dep, radians);
            return ind - dep;
        }

        /**
        * Interpolate across the shortest arc between two angles.
        * @method interpolateAngles
        * @param a1 {number}
        * @param a2 {number}
        * @param weight {number}
        * @param [radians=true] {boolean}
        * @param [ease=null] {any}
		* @return {number}
        * @static
        * @public
        */
        public static interpolateAngles(a1: number, a2: number, weight: number, radians: boolean = true, ease = null): number {

            a1 = Kiwi.Utils.GameMath.normalizeAngle(a1, radians);
            a2 = Kiwi.Utils.GameMath.normalizeAngleToAnother(a2, a1, radians);

            return (typeof ease === 'function') ? ease(weight, a1, a2 - a1, 1) : Kiwi.Utils.GameMath.interpolateFloat(a1, a2, weight);
        }

        /**
		* Compute the logarithm of any value of any base.
		* A logarithm is the exponent that some constant (base) would have to be raised to 
		* to be equal to value.
		* @method logBaseOf
        * @param value {number}
        * @param base {number}
		* @return {number}
        * @static
        * @public
        */
        public static logBaseOf(value: number, base: number): number {
            return Math.log(value) / Math.log(base);
        }
        /* 
		* i.e.
		* 4 ^ x = 16
		* can be rewritten as to solve for x
		* logB4(16) = x
		* which with this function would be 
		* LoDMath.logBaseOf(16,4)
		* 
		* which would return 2, because 4^2 = 16
		*/

        /**
		* Greatest Common Denominator using Euclid's algorithm.
        * @method GCD
        * @param m {number}
        * @param n {number}
		* @return {number}
        * @static
        * @public
		*/
        public static GCD(m: number, n: number): number {
            var r: number;

            //make sure positive, GCD is always positive
            m = Math.abs(m);
            n = Math.abs(n);

            //m must be >= n
            if (m < n)
            {
                r = m;
                m = n;
                n = r;
            }

            //now start loop
            while (true)
            {
                r = m % n;
                if (!r) return n;
                m = n;
                n = r;
            }

            return 1;
        }

        /**
		* Lowest Common Multiple
        * @method LCM
        * @param m {number}
        * @param n {number}
		* @return {number}
        * @static
        * @public
		*/
        public static LCM(m: number, n: number): number {
            return (m * n) / Kiwi.Utils.GameMath.GCD(m, n);
        }

        /**
		* Factorial - N! Simple product series. By definition:
		* 0! == 1
        * @method factorial
        * @param value {number}
		* @return {number}
        * @static
        * @public
		*/
        public static factorial(value: number): number {
            if (value == 0) return 1;

            var res: number = value;

            while (--value)
            {
                res *= value;
            }

            return res;
        }

        /**
		* Gamma function. Defined: gamma(N) == (N - 1)!
		* @method gammaFunction
		* @param value {number}
		* @return {number}
        * @static
        * @public
		*/
        public static gammaFunction(value: number): number {
            return Kiwi.Utils.GameMath.factorial(value - 1);
        }

        /**
		* Falling factorial. Defined: (N)! / (N - x)!
		* Written subscript: (N)x OR (base)exp
		* @method fallingFactorial
		* @param base {number}
		* @param exp {number}
		* @return {number}
        * @static
        * @public
		*/
        public static fallingFactorial(base: number, exp: number): number {
            return Kiwi.Utils.GameMath.factorial(base) / Kiwi.Utils.GameMath.factorial(base - exp);
        }

        /**
		* Rising factorial. Defined: (N + x - 1)! / (N - 1)!
		* Written superscript N^(x) OR base^(exp) 
		* @method risingFactorial
		* @param base {number}
		* @param exp {number}
		* @return {number}
        * @static
        * @public
		*/
        public static risingFactorial(base: number, exp: number): number {
            //expanded from gammaFunction for speed
            return Kiwi.Utils.GameMath.factorial(base + exp - 1) / Kiwi.Utils.GameMath.factorial(base - 1);
        }

        /**
		* Binomial coefficient.
		* @method binCoef
        * @param n {number}
        * @param k {number}
		* @return {number}
        * @static
        * @public
        */
        public static binCoef(n: number, k: number): number {
            return Kiwi.Utils.GameMath.fallingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
        }
        /*
		* defined: N! / (k!(N-k)!)
		* reduced: N! / (N-k)! == (N)k (fallingfactorial)
		* reduced: (N)k / k!
		*/

        /**
		* Rising binomial coefficient.
		* As one can notice in the analysis of binCoef(...) that 
		* binCoef is the (N)k divided by k!. Similarly rising binCoef 
		* is merely N^(k) / k! 
        * @method risingBinCoef
        * @param n {number}
        * @param k {number}
		* @return {number}
        * @static
        * @public
		*/
        public static risingBinCoef(n: number, k: number): number {
            return Kiwi.Utils.GameMath.risingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
        }

        /**
        * Generate a random boolean result based on the chance value.
        * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
        * of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
        * 
        * @method changeRoll
        * @param [chance=50] {number} The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%)
        * @return {boolean} true if the roll passed, or false
        * @static
        * @public
        */
        public static chanceRoll(chance: number = 50): boolean {

            if (chance <= 0)
            {
                return false;
            }
            else if (chance >= 100)
            {
                return true;
            }
            else
            {
                if (Math.random() * 100 >= chance)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }

        }

        /**
		* Adds the given amount to the value, but never lets the value go over the specified maximum.
		* 
        * @method maxAdd
		* @param value {number} The value to add the amount to
		* @param amount {number} The amount to add to the value
		* @param max {number} The maximum the value is allowed to be
		* @return {number}
        * @static
        * @public
		*/
        public static maxAdd(value: number, amount: number, max: number): number {

            value += amount;

            if (value > max)
            {
                value = max;
            }

            return value;

        }

        /**
		* Subtracts the given amount from the value, but never lets the value go below the specified minimum.
		* 
        * @method minSub
		* @param value {number} The base value
		* @param amount {number} The amount to subtract from the base value
		* @param min {number} The minimum the value is allowed to be
		* @return {number}
        * @static
        * @public
		*/
        public static minSub(value: number, amount: number, min: number): number {

            value -= amount;

            if (value < min)
            {
                value = min;
            }

            return value;
        }

        /**
		* Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
		* Values must be positive integers, and are passed through Math.abs
		*
        * @method wrapValue 
		* @param value {number} The value to add the amount to
		* @param amount {number} The amount to add to the value
		* @param max {number} The maximum the value is allowed to be
		* @return {number} The wrapped value
        * @static
        * @public
		*/
        public static wrapValue(value: number, amount: number, max: number): number {

            var diff: number;

            value = Math.abs(value);
            amount = Math.abs(amount);
            max = Math.abs(max);

            diff = (value + amount) % max;

            return diff;

        }

        /**
		* Randomly returns either a 1 or -1
		* @method randomSign
		* @return {number} Either 1 or -1.
        * @static
        * @public
		*/
        public static randomSign(): number {
            return (Math.random() > 0.5) ? 1 : -1;
        }

        /**
        * Returns true if the number given is odd.
        * @method isOff
        * @param n {number} The number to check
        * @return {boolean} True if the given number is odd. False if the given number is even.
        * @static
        * @public
        */
        public static isOdd(n: number): boolean {

            if (n & 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * Returns true if the number given is even.
        * @method isEvent
        * @param n {number} The number to check
        * @return {boolean} True if the given number is even. False if the given number is odd.
        * @static
        * @public
        */
        public static isEven(n: number): boolean {

            if (n & 1)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        /**
		* Keeps an angle value between -180 and +180.
		* Should be called whenever the angle is updated on the Sprite to stop it from going insane.
		* @method wrapAngle
		* @param angle {number} The angle value to check
		* @return {number} The new angle value, returns the same as the input angle if it was within bounds
		* @static
        * @public
        */
        public static wrapAngle(angle: number): number {

            var result: number = angle;

            //  Nothing needs to change
            if (angle >= -180 && angle <= 180)
            {
                return angle;
            }

            //  Else normalise it to -180, 180
            result = (angle + 180) % 360;

            if (result < 0)
            {
                result += 360;
            }

            return result - 180;

        }

        /**
		* Keeps an angle value between the given min and max values.
		* @method angleLimit
		* @param angle {number} The angle value to check. Must be between -180 and +180
		* @param min {number} The minimum angle that is allowed (must be -180 or greater)
		* @param max {number} The maximum angle that is allowed (must be 180 or less)
		* @return {number} The new angle value, returns the same as the input angle if it was within bounds
		* @static
        * @public
        */
        public static angleLimit(angle: number, min: number, max: number): number {

            var result: number = angle;

            if (angle > max)
            {
                result = max;
            }
            else if (angle < min)
            {
                result = min;
            }

            return result;
        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method linear
        * @param {Any} v
        * @param {Any} k
		* @return {number}
        * @static
        * @public
        */
        public static linearInterpolation(v, k):number {

            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);

            if (k < 0) return Kiwi.Utils.GameMath.linear(v[0], v[1], f);
            if (k > 1) return Kiwi.Utils.GameMath.linear(v[m], v[m - 1], m - f);

            return Kiwi.Utils.GameMath.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method Bezier
        * @param {Any} v
        * @param {Any} k
		* @return {number}
        * @static
        * @public
        */
        public static bezierInterpolation(v, k):number {

            var b = 0;
            var n = v.length - 1;

            for (var i = 0; i <= n; i++)
            {
                b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Kiwi.Utils.GameMath.bernstein(n, i);
            }

            return b;

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method CatmullRom
        * @param {Any} v
        * @param {Any} k
		* @return {number}
        * @static
        * @public
        */
        public static catmullRomInterpolation(v, k):number {

            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);

            if (v[0] === v[m])
            {
                if (k < 0) i = Math.floor(f = m * (1 + k));

                return Kiwi.Utils.GameMath.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

            }
            else
            {
                if (k < 0) return v[0] - (Kiwi.Utils.GameMath.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);

                if (k > 1) return v[m] - (Kiwi.Utils.GameMath.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                return Kiwi.Utils.GameMath.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method Linear
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} t
		* @return {number}
        * @static
        * @public
        */
        public static linear(p0, p1, t):number {

            return (p1 - p0) * t + p0;

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method Bernstein
        * @param {Any} n
        * @param {Any} i
		* @return {number}
        * @static
        * @public
        */
        public static bernstein(n, i) :number {

            return Kiwi.Utils.GameMath.factorial(n) / Kiwi.Utils.GameMath.factorial(i) / Kiwi.Utils.GameMath.factorial(n - i);

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method CatmullRom
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} p2
        * @param {Any} p3
        * @param {Any} t
		* @return {number}
        * @static
        * @public
        */
        public static catmullRom(p0, p1, p2, p3, t) {

            var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

        }

        /**
        * [DESCRIPTION REQUIRED]
        * @method difference
        * @param a {number}
        * @param b {number}
		* @return {number}
        * @static
        * @public
        */ 
        public static difference(a: number, b: number): number {

            return Math.abs(a - b);

        }

    }

}