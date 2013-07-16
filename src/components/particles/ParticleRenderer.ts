

/// <reference path="Particle.ts" />
/// <reference path="ParticleSystemShapes.ts" />
/// <reference path="ParticleSystem.ts" />


// TODO -are particlesystem and particle both needed

/**
 *	Kiwi - Particles - ParticleRenderer
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

    export interface IParticleRenderer {
        particleSystem(): ParticleSystem;
        particles: IParticle[];
        render(contextInfo:any): void;
        
    }

    export class ParticleRenderer implements IParticleRenderer {

        /**
        *
        * @constructor
        * @param {Kiwi.Particles.ParticleSystem} particleSystem
        * @return {Kiwi.Particles.ParticleRenderer} This Object.
        */
        constructor (particleSystem:ParticleSystem) { 
           
        }
        
        /**
        *
        * @property _particleSystem
        * @type ParticleSystem
        * @private
        */
        private _particleSystem: ParticleSystem;

        /**
        *
        * @property particles
        * @type Array
        */
        public particles: IParticle[];

        public objType() {
            return "ParticleRenderer";
        }

        

        /**
        *
        * @method particleSystem
        * @return {particleSystem}
        */
        public particleSystem(value?: ParticleSystem): ParticleSystem {
            if (value !== undefined) {
                this._particleSystem = value;
                this.particles = this._particleSystem.particles();
            }
            return this._particleSystem;
        }

        /**
        *
        * @method render
        */
        public render(contextInfo:any):void {
            
        }
        
    }


}

