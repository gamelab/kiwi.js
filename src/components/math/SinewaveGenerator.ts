/// <reference path="../../core/Component.ts" />
/// <reference path="../../utils/GameMath.ts" />

/*
 *	Kiwi - Components - Math - SinewaveGenerator
 *
 *	@desc		Generate a sine and cosine table simultaneously and extremely quickly.
 *
 *	@version	1.0, 28th February 2013
 *				
 *	@author 	Richard Davey
 *				
 *	@url		http://www.kiwijs.org
 *
*/

module Kiwi.Components.GameMath {

    export class SinewaveGenerator extends Component {

        /**
		 * Generate a sine and cosine table simultaneously and extremely quickly. Based on research by Franky of scene.at
		 * <p>The parameters allow you to specify the length, amplitude and frequency of the wave. Once you have called this function
		 * the results are stored in sinTable and cosTable. This generator is fast enough to be used in real-time.</p>
		 * @param length 		The length of the wave
		 * @param sinAmplitude 	The amplitude to apply to the sine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
		 * @param cosAmplitude 	The amplitude to apply to the cosine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
		 * @param frequency 	The frequency of the sine and cosine table data
		 * @return	Returns the sine table
		 */
        constructor(length: number = 100, sinAmplitude: number = 1.0, cosAmplitude: number = 1.0, frequency: number = 1.0) {

            super('SinewaveGenerator', true, true, true);

            this.cosTable = [];
            this.sinTable = [];

            this.create(length, sinAmplitude, cosAmplitude, frequency);

        }

        public objType() {
            return "SinewaveGenerator";
        }

        /**
        * 
        * @property cosTable
        * @type Array
        */
        public cosTable: number[];

        /**
        * 
        * @property sinTable
        * @type Array
        */
        public sinTable: number[];

        /**
		 * Generate a sine and cosine table simultaneously and extremely quickly. Based on research by Franky of scene.at
		 * <p>The parameters allow you to specify the length, amplitude and frequency of the wave. Once you have called this function
		 * the results are stored in sinTable and cosTable. This generator is fast enough to be used in real-time.</p>
		 * @param length 		The length of the wave
		 * @param sinAmplitude 	The amplitude to apply to the sine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
		 * @param cosAmplitude 	The amplitude to apply to the cosine table (default 1.0) if you need values between say -+ 125 then give 125 as the value
		 * @param frequency 	The frequency of the sine and cosine table data
		 * @return	Returns the sine table
		 */
        public create(length: number, sinAmplitude: number = 1.0, cosAmplitude: number = 1.0, frequency: number = 1.0) {

            var sin: number = sinAmplitude;
            var cos: number = cosAmplitude;
            var frq: number = frequency * Math.PI / length;

            this.cosTable.length = 0;
            this.sinTable.length = 0;

            for (var c: number = 0; c < length; c++)
            {
                cos -= sin * frq;
                sin += cos * frq;

                this.cosTable[c] = cos;
                this.sinTable[c] = sin;
            }

            return this.sinTable;

        }

    }

}
