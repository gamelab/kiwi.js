/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - CanvasBitmapParticleSystem
 *
 *	@desc 		
 *
 *	@version 	0.3 - 7th January 2013
 *
 *	@author 	Ross Kettle
 *	@author 	Richard Davey
 *
 *	@url 		http://www.kiwijs.org
 *
 *	@todo 		
*/

module Kiwi.Particles {

    export class CanvasBitmapParticleSystem extends ParticleSystem {

        /**
        * 
        * @constructor
        * @param {Number} numParticles
        * @param {ParticleSpriteSheet} [spriteSheet]
        * @param {Number} [mode]
        * @return {CanvasBitmapParticleSystem} This Object
        */
        constructor (numParticles: number,spriteSheet?:ParticleSpriteSheet,mode?:number) {
            super(numParticles,ParticleSystem.CANVAS_BITMAP_SYSTEM, mode);
            
            this.particleRenderer = new CanvasBitmapRenderer(this,spriteSheet);
            this.particleGenerator = CanvasBitmapParticle;
            this.frameLength = CanvasBitmapParticleSystem.DEFAULT_FRAME_LENGTH;
        }

        /**
        * 
        * @property DEFAULT_FRAME_LENGTH
        * @type Number
        * @static
        */
        public static DEFAULT_FRAME_LENGTH: number = 40;

        /**
        * 
        * @property _lastFrameTime
        * @type Number
        * @private
        */
        private _lastFrameTime: number = 0;

        /**
        * 
        * @property frameLength
        * @type Number
        */
        public frameLength: number;
        
        /**
        * 
        * @method spriteSheet
        * @param {ParticleSpriteSheet} val
        */
        public set spriteSheet(val: ParticleSpriteSheet) {
            var renderer = <CanvasBitmapRenderer>this.particleRenderer;
            renderer.spriteSheet = val;
        }

        /**
        * 
        * @method spawn
        * @return {IParticle}
        */
        public spawn() :IParticle {
            
            var particle = <CanvasBitmapParticle>super.spawn();
            if (particle) {
                
            }
            return particle;
        }

        /**
        * 
        * @method update
        * @param {Number} time
        * @param {Geom.Vector2} [force]
        */
        public update(time: number, force?: Geom.Vector2): void {
            super.update(time, force);
            if (time - this._lastFrameTime > this.frameLength) {
                var renderer = <CanvasBitmapRenderer>this.particleRenderer;
                renderer.spriteSheet.currentFrameIndex++;
            }
        }

    }



}