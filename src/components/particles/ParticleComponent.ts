/// <reference path="../core/Component.ts" />

module Kiwi.Particles {

    export class ParticleComponent extends Kiwi.Component {

        /**
        *
        * @constructor
        * @param {Kiwi.Geom.Transform} transform
        * @param {String} [systemType]
        * @return {Kiwi.Particles.ParticleComponent} This Object.
        */
        constructor(transform: Kiwi.Geom.Transform,systemType?:string) {

            super("ParticleComponent");

            this._transform = transform;
            
            if (systemType != undefined) {
                this.createSystem(systemType);
            }
            
        }

        /**
        *
        * @method
        * @param {String} systemType
        */
        private createSystem(systemType:string) {
            switch (systemType) {
                    case ParticleSystem.CANVAS_GEOM_SYSTEM: this.system = new CanvasGeomParticleSystem(50);
                        break;
                    case ParticleSystem.CANVAS_BITMAP_SYSTEM: this.system = new CanvasBitmapParticleSystem(50);
                        break;
                }
        }

        /**
        *
        * @method startSystem
        */
        private startSystem() {
            this.system.start();
        }

         

        //  Entity transform

        /**
        *
        * @property _transform
        * @type Kiwi.Geom.Transform
        * @private
        */
        private _transform: Kiwi.Geom.Transform;

        /**
        *
        * @property _system
        * @type ParticleSystem
        * @private
        */
        private _system: ParticleSystem;

        /**
        *
        * @method system
        * @return {ParticleSystem}
        */
        public get system(): ParticleSystem {
            return this._system;
        }

        /**
        *
        * @method system
        * @param {ParticleSystem} value
        */
        public set system(value:ParticleSystem) {
            this._system = value;
            this._system.position = new Kiwi.Geom.Vector2(this._transform.x,this._transform.y);
        }


        //  Image data (as loaded by game.loader)
        
        /**
        *
        * @method recieve
        * @param {Array} messages
        */
        public receive(messages: any[]) {
            console.log(messages);
        }

        /**
        *
        * @method update
        */
        public update() {
            this.system.position.x = this._transform.x;
            this.system.position.y = this._transform.y;

            this.system.update(Date.now());
        }

        /**
        *
        * @method render
        */
        public render(cam: Kiwi.Cameras.Camera, context: CanvasRenderingContext2D) {
            
            this.system.render({ "cam": cam, "context": context });
       
        }

    }

}
