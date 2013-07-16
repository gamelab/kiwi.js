/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - CanvasGeomRenderer
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

    
    export class CanvasGeomRenderer extends ParticleRenderer implements IParticleRenderer {

        /**
        *
        * @constructor
        * @param {ParticleSystem} particleSystem
        * @return {Kiwi.Particles.CanvasGeomRenderer} This Object.
        */
        constructor (particleSystem: ParticleSystem) {
            super(particleSystem);
            
        }

        /**
        *
        * @method render
        * @param {Any} contextInfo
        */
        public render(contextInfo:any):void {
            if (!contextInfo.context) {
                console.error("no contect passed");
            }
            
            var particle: CanvasGeomParticle;
            for (var i = 0; i < this.particles.length; i++) {
                particle = <CanvasGeomParticle>this.particles[i];
                contextInfo.context.beginPath();
                contextInfo.context.fillStyle = particle.currentColor;
                
                contextInfo.context.arc(particle.position.x, particle.position.y, particle.currentSize, 0, Math.PI * 2);
                contextInfo.context.fill()
            }

        }

    }
}