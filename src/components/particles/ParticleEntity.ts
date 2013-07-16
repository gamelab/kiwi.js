/// <reference path="../core/Entity.ts" />

module Kiwi.Particles {

    export class ParticleEntity extends Kiwi.Entity {
        
        /**
        *
        * @constructor
        * @param {Any} state
        * @return {Kiwi.Particles.ParticleEntity} This Object.
        */
        constructor (state) {

            super(state);

            this.systems = new Array();
            this.addComponent("transform", new Kiwi.Geom.Transform());
            
        }

        /**
        *
        * @property systems
        * @type Array
        */
        public systems: any[];
        
        /**
        *
        * @method addSystem
        * @param {String} name
        * @param {ParticleSytem} system
        * @return {ParticleSystem}
        */
        public addSystem(name: string, system: ParticleSystem): ParticleSystem {
            this.addComponent(name, new Kiwi.Particles.ParticleComponent(this.transform));
            this.systems.push(this[name]);
            this[name].system = system;
            return this[name].system;
            
            
        }

        /**
        *
        * @method createCanvasGeomSystem
        * @param {String} name
        * @return {CanvasGeomParticleSystem}
        */
        public createCanvasGeomSystem(name:string): CanvasGeomParticleSystem {
            this.addComponent(name, new Kiwi.Particles.ParticleComponent(this.transform,Kiwi.Particles.ParticleSystem.CANVAS_GEOM_SYSTEM));
            this.systems.push(this[name]);
            return this[name].system;
        }

        /**
        *
        * @method createCanvasBitmapSystem
        * @param {String} name
        * @param {ParticleSpriteSheet} spriteSheet
        * @return {CanvasBitmapParticleSystem}
        */
        public createCanvasBitmapSystem(name:string,spriteSheet:ParticleSpriteSheet): CanvasBitmapParticleSystem {
            this.addComponent(name, new Kiwi.Particles.ParticleComponent(this.transform,Kiwi.Particles.ParticleSystem.CANVAS_BITMAP_SYSTEM ));
            this[name].system.spriteSheet = spriteSheet;
            this.systems.push(this[name]);
            return this[name].system;
        }

        /**
        *
        * @method removeSystem
        * @param {String} name
        */
        public removeSystem(name: string) {
            this.removeComponent(name);
        }

        /**
        *
        * @method startAll
        */
        public startAll() {
            for (var i: number = 0; i < this.systems.length; i++) {
                this.systems[i].startSystem();
            }
        }

        /**
        *
        * @method update
        */
        public update() {
            for (var i: number = 0; i < this.systems.length; i++) {
                this.systems[i].update();
            }
        }

        /**
        *
        * @method render
        * @param {Kiwi.Cameras.Camera} cam
        * @param {CanvasRenderingContext2D} context
        */
        public render(cam: Kiwi.Cameras.Camera, context: CanvasRenderingContext2D) {
            for (var i: number = 0; i < this.systems.length; i++) {
                this.systems[i].render(cam, context);
            }
            
            

        }
    
    }

}
