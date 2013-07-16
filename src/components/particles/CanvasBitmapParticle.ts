/// <reference path="ParticleSystem.ts" />

module Kiwi.Particles {

    export class CanvasBitmapParticle extends Particle implements IParticle {

        /**
        * 
        * @constructor
        * @param {Geom.Vector2} position
        * @param {Geom.Vector2} velocity
        * @param {Number} lifespan
        * @return {CanvasBitmapParticle} This Object
        */
        constructor (position: Geom.Vector2, velocity: Geom.Vector2, lifespan: number) {
            super(position, velocity, lifespan);
            return this;
        }

        /**
        * 
        * @method generate
        * @param {Geom.Vector2} position
        * @param {Geom.Vector2} velocity
        * @param {Number} lifespan
        * @return {CanvasBitmapParticle}
        * @static
        */
        public static generate(position: Geom.Vector2, velocity: Geom.Vector2, lifespan: number) {
            var p = new CanvasBitmapParticle(position, velocity, lifespan);
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
                
            return true;
        }
    }
}