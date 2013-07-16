/// <reference path="ParticleSystem.ts" />

/**
 *	Kiwi - Particles - CanvasBitmapRenderer
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
    export class CanvasBitmapRenderer extends ParticleRenderer implements IParticleRenderer {

        /**
        * 
        * @constructor
        * @param {CanvasBitmapParticleSystem} particleSystem
        * @param {ParticleSpriteSheet} spriteSheet
        * @return {CanvasBitmapRenderer} This Object
        */
        constructor (particleSystem: CanvasBitmapParticleSystem,spriteSheet:ParticleSpriteSheet) {
            super(particleSystem);
            this.spriteSheet = spriteSheet;
        }

        /**
        * 
        * @property spriteSheet
        * @type ParticleSpriteSheet
        */
        public spriteSheet: ParticleSpriteSheet;
        
        /**
        * 
        * @method render
        * @param {Any} contextInfo
        */
        public render(contextInfo:any) {
             if (!contextInfo.context) {
                console.error("no contect passed");
            }

            var particle: CanvasBitmapParticle;
            for (var i = 0; i < this.particles.length; i++) {
                particle = <CanvasBitmapParticle>this.particles[i];
                var offset = this.spriteSheet.getFramePos(this.spriteSheet.currentFrameIndex);
               
                
               contextInfo.context.drawImage(this.spriteSheet.image,offset.x,offset.y,this.spriteSheet.frameWidth,this.spriteSheet.frameHeight,particle.position.x,particle.position.y,this.spriteSheet.frameWidth,this.spriteSheet.frameHeight);
                // this.context.drawImage(this.spriteSheet.image,0,0,this.spriteSheet.frameWidth,this.spriteSheet.frameHeight,particle.position.x,particle.position.y,this.spriteSheet.frameWidth,this.spriteSheet.frameHeight);
                
            }

        }

    }
}