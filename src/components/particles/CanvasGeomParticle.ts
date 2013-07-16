/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - CanvasGeomParticle
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

    export class CanvasGeomParticle extends Particle implements IParticle {

        /**
        * 
        * @constructor
        * @param {Geom.Vector2} position
        * @param {Geom.Vector2} velocity
        * @param {Number} lifespan
        * @return {Kiwi.Particles.CanvasGeomParticle} This Object
        */
        constructor (position: Geom.Vector2, velocity: Geom.Vector2, lifespan: number) {
            super(position, velocity, lifespan);
            return this;
        }

        /**
        * 
        * @property startSize
        * @type Number
        */
        public startSize: number;

        /**
        * 
        * @property targetSize
        * @type Number
        */
        public targetSize: number;

        /**
        * 
        * @property currentSize
        * @type Number
        */
        public currentSize: number;

        /**
        * 
        * @property sizeEase
        * @type Function
        */
        public sizeEase: Function;

        /**
        * 
        * @property startColor
        * @type Number
        */
        public startColor: number;

        /**
        * 
        * @property targetColor
        * @type Number
        */
        public targetColor: number;

        /**
        * 
        * @property currentColor
        * @type String
        */
        public currentColor: string;

        /**
        * 
        * @property colorEase
        * @type Function
        */
        public colorEase: Function;
       
        /**
        * 
        * @property startAlpha
        * @type Number
        */
        public startAlpha: number;

        /**
        * 
        * @property targetAlpha
        * @type Number
        */
        public targetAlpha: number;

        /**
        * 
        * @property currentAlpha
        * @type Number
        */
        public currentAlpha: number;

        /**
        * 
        * @property alphaEase
        * @type Function
        */
        public alphaEase: Function;
        
        /**
        * 
        * @method generate
        * @param {Geom.Vector2} position
        * @param {Geom.Vector2} velocity
        * @param {Number} lifespan
        * @return {Kiwi.Particles.CanvasGeomParticle}
        * @static
        */
        public static generate(position: Geom.Vector2, velocity: Geom.Vector2, lifespan: number) {
            var p = new CanvasGeomParticle(position, velocity, lifespan);
            return p;
        }

        /**
        * 
        * @method update
        * @param {Number} time
        * @param {Geom.Vector2} [force]
        * @return {Boolean}
        */
        public update(time: number, force?: Geom.Vector2): bool {
            var alive: bool = super.update(time, force);
            if (!alive) return false;
            var r1: number = this.startColor >> 16 & 0xFF;
            var g1: number = this.startColor >> 8 & 0xFF;
            var b1: number = this.startColor & 0xFF;
            
            var r2: number = this.targetColor >> 16 & 0xFF;
            var g2: number = this.targetColor >> 8 & 0xFF;
            var b2: number = this.targetColor & 0xFF;
            var easedAge = this.colorEase(this.normalAge);

            var r: number = Math.floor(((r2 - r1) * easedAge) + r1);
            var g: number = Math.floor(((g2 - g1) * easedAge) + g1);
            var b: number = Math.floor(((b2 - b1) * easedAge) + b1);
            var a: number = this.alphaEase(((this.targetAlpha - this.startAlpha) * this.normalAge) + this.startAlpha);
            
            this.currentColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";
            
            this.currentSize = (this.targetSize - this.startSize) * this.sizeEase((this.normalAge)) + this.startSize;
            return true;
        }
    }
}

