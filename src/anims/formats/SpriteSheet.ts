/// <reference path="../../core/Game.ts" />
/// <reference path="../Frame.ts" />
/// <reference path="../Animation.ts" />

/**
 *	Kiwi - Animations - Formats - Sprite Sheet
 *
 *	@desc 		The sprite sheet format should be used when every frame of the animation are the exact same dimensions (width/height)
 *
 *	@version 	1.0 - 22nd March 2013
 *	@author 	Richard Davey
 *	@url 		http://www.kiwijs.org
 *
 *	@todo       
 */

module Kiwi.Anims.Formats {

    export class SpriteSheet {

        public objType() {
            return "SpriteSheet";
        }

        public getFrameData(cacheID:string, cache:Kiwi.FileCache, frameWidth: number, frameHeight: number): Kiwi.Anims.FrameData {

            //  How big is our image?
            var width = cache.getFile(cacheID).data.width;
            var height = cache.getFile(cacheID).data.height;

            var row = Math.round(width / frameWidth);
            var column = Math.round(height / frameHeight);
            var total = row * column;

            //  Zero or smaller than frame sizes?
            if (width == 0 || height == 0 || width < frameWidth || height < frameHeight || total === 0)
            {
                return null;
            }

            //  Let's create some frames then
            var data: Kiwi.Anims.FrameData = new Kiwi.Anims.FrameData(cacheID, cache);

            var x = 0;
            var y = 0;

            //if (frameStart > 0 && frameStart < row)
            //{
            //    x = frameStart * frameWidth;
            //}
            //else if (frameStart > row)
            //    {
            //    y = Math.floor(frameStart / row);
            //    x = frameStart - (y * row);
            //    x *= frameWidth;
            //}

            //console.log('SpriteSheet Data');
            //console.log('Image Size:', width, 'x', height);
            //console.log('Frame Size:', frameWidth, 'x', frameHeight);
            //console.log('Start X/Y:', x, 'x', y);
            //console.log('Frames:');
            //console.log('-------');

            for (var i = 0; i < total; i++)
            {
                data.addFrame(new Frame(x, y, frameWidth, frameHeight, i));

                //console.log('Frame', i, '=', x, y);

                x += frameWidth;

                if (x === width)
                {
                    x = 0;
                    y += frameHeight;
                }

            }

            return data;

        }

    }

}