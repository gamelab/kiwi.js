/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - CanvasGeomParticleSystem
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

    export class CanvasGeomParticleSystem extends ParticleSystem {

        /**
        *
        * @constructor
        * @param {Number} numParticles
        * @param {Number} [mode]
        * @return {Kiwi.Particles.CanvasGeomParticleSystem} This Object.
        */
        constructor (numParticles: number,mode?:number) {
            super(numParticles,ParticleSystem.CANVAS_GEOM_SYSTEM,mode);

            this.particleStartSize = CanvasGeomParticleSystem.DEFAULT_START_SIZE;
            this.particleTargetSize = CanvasGeomParticleSystem.DEFAULT_TARGET_SIZE;
            this.particleSizeEasing = CanvasGeomParticleSystem.DEFAULT_SIZE_EASE;

            this.particleStartColor = CanvasGeomParticleSystem.DEFAULT_START_COLOR;
            this.particleTargetColor = CanvasGeomParticleSystem.DEFAULT_TARGET_COLOR;
            this.particleColorEasing = CanvasGeomParticleSystem.DEFAULT_COLOR_EASE;

            this.particleStartAlpha = CanvasGeomParticleSystem.DEFAULT_START_ALPHA;
            this.particleTargetAlpha = CanvasGeomParticleSystem.DEFAULT_TARGET_ALPHA;
            this.particleAlphaEasing = CanvasGeomParticleSystem.DEFAULT_ALPHA_EASE;

            this.particleRenderer = new CanvasGeomRenderer(this);
            this.particleGenerator = CanvasGeomParticle;

        }

        /**
        *
        * @property DEFAULT_START_SIZE
        * @type Number
        * @static
        */
        public static DEFAULT_START_SIZE: number = 10;
        /**
        *
        * @property DEFAULT_TARGET_SIZE
        * @type Number
        * @static
        */
        public static DEFAULT_TARGET_SIZE: number = 0;

        /**
        *
        * @property DEFAULT_SIZE_EASE
        * @type Function
        * @static
        */
        public static DEFAULT_SIZE_EASE: Function = Kiwi.Animation.Easing.Linear;

        /**
        *
        * @property DEFAULT_START_COLOR
        * @type Number
        * @static
        */
        public static DEFAULT_START_COLOR: number = 0xff00000;

        /**
        *
        * @property DEFAULT_TARGET_COLOR
        * @type Number
        * @static
        */
        public static DEFAULT_TARGET_COLOR: number = 0xffff00;

        /**
        *
        * @property DEFAULT_COLOR_EASE
        * @type Function
        * @static
        */
        public static DEFAULT_COLOR_EASE: Function = Kiwi.Animation.Easing.Linear;

        /**
        *
        * @property DEFAULT_START_ALPHA
        * @type Number
        * @static
        */
        public static DEFAULT_START_ALPHA: number = 1;

        /**
        *
        * @property DEFAULT_TARGET_ALPHA
        * @type Number
        * @static
        */
        public static DEFAULT_TARGET_ALPHA: number = 0;

        /**
        *
        * @property DEFAULT_ALPHA_EASE
        * @type Function
        * @static
        */
        public static DEFAULT_ALPHA_EASE: Function = Kiwi.Animation.Easing.Linear;
        
        /**
        *
        * @property particleStartSize
        * @type Number
        */
        public particleStartSize: number;

        /**
        *
        * @property ParticleTargetSize
        * @type Number
        */
        public particleTargetSize: number;

        /**
        *
        * @property ParticleSizeEasing
        * @type Function
        */
        public particleSizeEasing:Function;
        
        /**
        *
        * @property particleStartColor
        * @type Number
        */
        public particleStartColor: number;

        /**
        *
        * @property ParticleTargetColor
        * @type Number
        */
        public particleTargetColor: number;

        /**
        *
        * @property particleColorEasing
        * @type Function
        */
        public particleColorEasing:Function;

        /**
        *
        * @property particleStartAlpha
        * @type Number
        */
        public particleStartAlpha: number;

        /**
        *
        * @property publicTargetAlpha
        * @type Number
        */
        public particleTargetAlpha: number;

        /**
        *
        * @property particleAlphaEasing
        * @type Function
        */
        public particleAlphaEasing:Function;
        
        /**
        *
        * @method spawn
        * @return {IParticle}
        */
        public spawn() :IParticle {
            
            var particle = <CanvasGeomParticle>super.spawn();
            if (particle) {
                particle.startSize = this.particleStartSize;
                particle.currentSize = this.particleStartSize;
                particle.targetSize = this.particleTargetSize;
                particle.sizeEase = this.particleSizeEasing;

                particle.startColor = this.particleStartColor;
                particle.targetColor = this.particleTargetColor;
                particle.colorEase = this.particleColorEasing;

                particle.startAlpha = this.particleStartAlpha;
                particle.targetAlpha = this.particleTargetAlpha;
                particle.alphaEase = this.particleAlphaEasing;

            }


            return particle;
        }

        
    }



}