/// <reference path="../../geom/Vector2.ts" />
/// <reference path="Particle.ts" />

/// <reference path="ParticleRenderer.ts" />
/// <reference path="ParticleSpriteSheet.ts" />



//**TODO
//  change position to reference entity transform.

//  remove particlegenerator function and replace with simpler system if possible
//  check out effect of pause


/**
 *	Kiwi - Particles - ParticleSystem
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

import Geom = Kiwi.Geom;
module Kiwi.Particles {

    export class ParticleSystem {

        /**
	    * Create a new particle system.
	    * @method constructor
	    * @param {number} numParticles The number of particles to spawn
        * @param {number} emission mode.
	     **/
        constructor (numParticles:number,systemType:string, mode?:number) {
                            
            //system 
            this._systemType = systemType;
            this.position = new Geom.Vector2();
            if (mode !== undefined) {
                this.mode = mode;
            } else {
                mode = ParticleSystem.DEFAULT_MODE;
            }
            //particles
            this._numParticles = numParticles;
            this._particlesEmmitted = 0;
            this._particlesExhausted = 0;
            this._particles = new Array();
            this.particleGenerator = Kiwi.Particles.Particle; //default
            
            //spawn position
            this.shape = new Rect(100, 0);//new Circle(1);
            this.constrainToEdge(true);
            this._spawnFunction = this.shape.getPositionArea;
            
            //velocity
            this.velocityShape = new Circle(2);
            this.velocityBase = ParticleSystem.DEFAULT_PARTICLE_VELOCITY;
            this.velocityFromPosMultiplier = 1;
            this.gravity = 0;
            this.wind = new Geom.Vector2();
            

            //regeneration
            this.particleLifespan = ParticleSystem.DEFAULT_PARTICLE_LIFESPAN;
            this.spawnRate = ParticleSystem.DEFAULT_SPAWN_RATE;
            this.completedEmitting = false;
            this.exhausted = false;
            this._lastSpawnTime = Date.now();                           //clock
            this.pause = true;
            
            console.log("mode is " + this.mode);
        }

        public objType() {
            return "ParticleSystem";
        }

        //=================== consts ===================

        /**
        * @property CANVAS_GEOM_SYSTEM
        * @type String
        * @static
        */
        public static CANVAS_GEOM_SYSTEM: string = "CANVAS_GEOM_SYSTEM";

        /**
        * @property CANVAS_BITMAP_SYSTEM
        * @type String
        * @static
        */
        public static CANVAS_BITMAP_SYSTEM: string = "CANVAS_BITMAP_SYSTEM";

        /**
        * @property UNDEFINED_SYSTEM
        * @type String
        * @static
        */
        public static UNDEFINED_SYSTEM: string = "UNDEFINED_SYSTEM";

        /**
        * Emits a set number of particles and then stops.
        * @property ONCE
        * @type string
        **/
        public static ONCE: number = 0;

        /**
        * Emits a set number of particles and then repeats.
        * @property PULSE
        * @type string
        **/
        public static PULSE: number = 1;

        /**
        * Emits up to the maximum number of particles continuously.
        * @property CONTINUOUS
        * @type string
        **/
        public static CONTINUOUS: number = 2;
        
        //=================== defauilts ===================
       
        /**
        * Default emission mode
        * @property DEFAULT_MODE
        * @type string
        **/
        public static DEFAULT_MODE: number = 2;

        /**
        * Default interval between particle spawn events in milliseconds
        * @property DEFAULT_SPAWN_RATE
        * @type number
        **/
        public static DEFAULT_SPAWN_RATE: number = 300;
        
        /**
        * Default length of time after spawn that particle remains alive
        * @property DEFAULT_PARTICLE_LIFESPAN
        * @type number
        **/
        public static DEFAULT_PARTICLE_LIFESPAN: number = 1500;

        /**
        * Default particle velocity measured in pixels on x and y axes
        * @property DEFAULT_PARTICLE_VELOCITY
        * @type Vector2
        **/
        public static DEFAULT_PARTICLE_VELOCITY: Geom.Vector2 = new Geom.Vector2(0,0);
        
        //=================== system ===================
        
        /**
        * @property _systemType
        * @type String
        * @private
        */
        private _systemType: string;

        /**
        * @method systemType
        * @return {String}
        */
        public systemType(): string {
            return this._systemType;
        }
           
        /**
        * Position of particle system, particle positioned are relative to this position
        * @property position
        * @type Vector2
        **/    
        public position: Geom.Vector2;
        
        /**
        * Either ONCE, PULSE or CONTINUOUS modes are valid.
        * @property mode
        * @type number
        **/
        public mode: number;
        
        //=================== particles ===================

        /**
        * Collection of particles serviced by the particle system
        * @property _particles
        * @type Array
        **/
        private _particles: IParticle[];

        /** 
        * Returns the collection of particles serviced by the particle system.
        * @method particles
        * @return {Particle[]} The collection of particles serviced by the particle system.
        */
        
        public particles(): IParticle[] {
            return this._particles;
        }

        /**
        * The maximum number of particles the system services at any one time
        * @property _numParticles
        * @type number
        **/
        private _numParticles: number;

        /** 
        * Returns the maximum number of particles the system services at any one time.
        * @method numParticles
        * @return {} The maximum number of particles the system services at any one time.
        */
        public numParticles(value?:number): number {
            if (value !== undefined) {
                this._numParticles = value;
            } 

            return this._numParticles;
            
        }

        

        /**
        * The number of particles that have been emitted
        * @property _particlesEmmitted
        * @type number
        **/
        private _particlesEmmitted: number;

        /**
        * The number of particles that have died.
        * @property _particlesExhausted
        * @type number
        **/
        private _particlesExhausted: number;

        /**
        * The function that generates a particle that is added to the _particles collection
        * @property particleGenerator
        * @type particleGenerator
        **/
        public particleGenerator;
        

        /**
        * Optional callback function invoked when all particles are exhausted (ONCE and PULSE only)
        * @property onExhausted
        * @type Function
        **/
        public onExhausted: Function;

        //=================== spawn position ===================
        
        /**
        * Emit particles from the edge of the system shape if true, from random position if false;
        * @property _constrainToEdge
        * @type bool
        **/
        private _constrainToEdge: bool;

        /** 
        * Returns true if Emit particles from the edge of the system shape, flase if from random position.
        * @method constrainToEdge
        * @return {} True if Emit particles from the edge of the system shape, flase if from random position..
        */
        public constrainToEdge(value?: bool): bool {
            if (value !== undefined) {
                this._constrainToEdge = value;
            }
            return this._constrainToEdge;
        }
        
        

        /**
        * The function on shape that spawns a particle, is set to either edge or area depending on _constrainToEdge
        * @property _spawnFunction
        * @type Function
        **/
        private _spawnFunction: Function;
        
        /**
        * The shape of the area in which particles will be spawned. All shapes can spawn either on edge or randomly in area.
        * @property _spawnFunction
        * @type IParticleShape
        **/
        public shape: IParticleSystemShape;
        
        //=================== spawn velocity ===================

        /**
        * The shape of the distribution of spawned particle velocities. 
        * @property velocityShape
        * @type IParticleShape
        **/
        public velocityShape: IParticleSystemShape;

        /**
        * The base velocity for a spawned particle, the velocity from the velocity shape distribution is added to this.
        * @property velocityBase
        * @type Vector2
        **/
        public velocityBase: Geom.Vector2;

        /**
        * The base velocity for a spawned particle, the velocity from the velocity shape distribution is added to this.
        * @property velocityBase
        * @type Vector2
        **/
        public calcVelocityFromPos: bool;

        /**
        * Calculate the velocity by using the vector from the local origin to the spawn position. If true, velocityShape will be ignored.
        * @property velocityFromPosConstant
        * @type bool
        **/
        public velocityFromPosVector: bool;

        /**
        * If velocityFromPosVector is true, then adjust the velocity by multiplying with this number, useful if there is a large spawn shape distribution, yet slow speeds are required.
        * If velocityFromPosVector is false then this is ignored.
        * @property velocityFromPosMultiplier
        * @type number
        **/
        public velocityFromPosMultiplier: number;

        /**
        * The amount of gravity to apply the velocity of the particles each frame. 
        * @property gravity
        * @type number
        **/
        public gravity: number;

        /**
        * The amount of wind to apply the velocity of the particles each frame. Specified as a direction vector, which also specifies magnitude.
        * @property wind
        * @type Vector2
        **/
        public wind: Geom.Vector2;
        
        //=================== regeneration ===================

        /**
        * The number of milliseconds the particle remains alive
        * @property particleLifespan
        * @type number
        **/
        public particleLifespan: number;

        /**
        * The time the last particle was spawned, used in conjunction with spawnrate to regulate spawning.
        * @property _lastSpawnTime
        * @type number
        **/
        private _lastSpawnTime: number;

        /**
        * The number of milliseconds after which a new paritcle will be spawned if the maximum number of particles has not been reached.
        * @property spawnRate
        * @type number
        **/
        public spawnRate: number;
        
        /**
        * Whether to update and render particles or not.
        * @property pause
        * @type bool
        **/
        public pause: bool;
        
        /**
        * Is true when maximum number of particles have been emmitted. (ONCE and PULSE mode only)
        * @property completedEmitting
        * @type bool
        **/
        public completedEmitting: bool;

        /**
        * is true when all emitted particles have died. (ONCE and PULSE mode only) 
        * @property exhausted
        * @type bool
        **/
        public exhausted: bool;
        
        //=================== rendering ===================

        /**
        * The object responsible for renderering the particles, is matched with an appropriate type of particle
        * eg geomRenderer and geomParticle work together.
        * @property particleRenderer
        * @type IParticleRenderer
        **/
        public particleRenderer: IParticleRenderer;

        

        /**
	    * Start the particle system
	    * @method start
	    * @param {bool} precook whether the particles should already be in full action when it first appears.
        * @return {Object} This object.
	    **/
        public reset(start:bool = true) {
            //console.log("RESET");
            this._particlesEmmitted = 0;
            this._particlesExhausted = 0;
            //this._particles = new Array();
            this.completedEmitting = false;
            this.exhausted = false;
            this._lastSpawnTime = Date.now();                           //clock
            this.pause = true;
            if (start) this.start();
        }

        /**
	    * Start the particle system
	    * @method start
	    * @param {bool} precook whether the particles should already be in full action when it first appears.
        * @return {Object} This object.
	    **/
        public start(precook?:bool) {
            this.pause = false;
            if (precook) {
                for (var i = 0; i < this._numParticles; i++) {
                    var particle:IParticle = this.spawn();
                    var reverseTime = Math.random() * this.particleLifespan
                    particle.birthTime -= reverseTime;
                
                }
                
            }
            return this;
        }
        
        /**
	    * Spawn a particle. Will only spawn if the maximum number of particles has not been reached.
	    * @method spawn
	    * @return {IParticle} IParticle.
	    **/
        public spawn(): IParticle {
            

            if (!(this.mode == ParticleSystem.CONTINUOUS) && this._particlesEmmitted >= this._numParticles ) {

                this.completedEmitting = true;
               // console.log("completedEmitting");
            }

            
           if (this._particles.length < this._numParticles && !this.completedEmitting) {
               
                //position
                var pos = this._spawnFunction.call(this.shape);

                //velocity
                var vel:Geom.Vector2;
                if (this.calcVelocityFromPos) {
                    if (this.velocityFromPosVector) {
                        vel = new Geom.Vector2(pos.x, pos.y);
                        vel = vel.unit();
                        //vel = vel.multiplyScalar(this.velocityFromPosMultiplier);
                    } else {
                        vel = new Geom.Vector2(pos.x * this.velocityFromPosMultiplier, pos.y * this.velocityFromPosMultiplier);
                    }
                } else {
                    vel = this.velocityShape.getPositionArea();
                }
                vel.x += this.velocityBase.x;
                vel.y += this.velocityBase.y;

                //create particle
                pos.x += this.position.x;
                pos.y += this.position.y;
               
                var particle = this.particleGenerator.generate(pos, vel, this.particleLifespan);
               
                this._particles.push(particle);
                
                this._particlesEmmitted += 1;

                return particle;
            } else {
                return null;
            }
            
        }

        /**
	    * Update each each particle, causing it to integrate, and check for expired particles and remove them.
	    * @method update
        * @param {number} Current time.
        * @param {Vector2} Additional force to apply to particle such as gravity/wind.
	    **/
        public update(time: number,force?:Geom.Vector2): void {
            force = force || new Geom.Vector2();
            force.x += this.wind.x;
            force.y += this.wind.y + this.gravity;
            if (!this.pause) {
                if (time - this._lastSpawnTime > this.spawnRate) {
                    this._lastSpawnTime = Date.now();
                    this.spawn();
                }
                for (var i = this._particles.length - 1; i >= 0; i--) {
                    if (!this._particles[i].update(time,force)) {
                        this._particles.splice(i, 1);   // kill particle
                        this._particlesExhausted ++;
                    }
                }
            }

            if (!(this.mode == ParticleSystem.CONTINUOUS) && this._particlesExhausted >= this._numParticles ) {
                this.exhausted = true;
                //console.log("Exhausted");
                if (this.onExhausted) this.onExhausted();
            }

            if (this.exhausted && this.mode == ParticleSystem.PULSE) this.reset(true);

        }

        /**
	    * Tell the particlerenderer to render
	    * @method render
        **/
        public render(contextInfo) {
            this.particleRenderer.render(contextInfo);

        }

    }

}

