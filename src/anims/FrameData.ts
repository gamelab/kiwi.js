/// <reference path="../core/Game.ts" />
/// <reference path="Animation.ts" />
/// <reference path="Frame.ts" />

/**
 *	Kiwi - Animations - FrameData
 *
 *	@desc 		
 *
 *	@version 	1.0 - 22nd March 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Anims {

    export class FrameData {

        constructor(cacheID:string, cache:Kiwi.FileCache) {

            this.cacheID = cacheID;
            this.cache = cache;
            this._frames = [];

        }

        public cacheID: string;
        public cache: Kiwi.FileCache;

        private _frames: Frame[];

        public objType() {
            return "FrameData";
        }

        public addFrame(frame: Frame) {

            this._frames.push(frame);

        }

        public getFrame(frame: number) {

            return this._frames[frame];

        }

        public getFrameRange(start: number, end: number) {

            var output: Kiwi.Anims.Frame[] = [];

            for (var i = start; i <= end; i++)
            {
                output.push(this._frames[i]);
            }

            return output;

        }

        public getAllFrames() {
            return this._frames;
        }

        public getFrames(range: number[]) {

            var output: Kiwi.Anims.Frame[] = [];

            //ORIGINAL

            /**
            for (var i = 0; i < range.length; i++)
            {
                output.push(this._frames[i]);
            }*/

            //ADDED BY LOCKY - BUG FIX
            
            for (var i = 0; i < range.length; i++)
            {
                var f = range[i];
                output.push(this._frames[f]);
            }



            return output;

        }

    }
}