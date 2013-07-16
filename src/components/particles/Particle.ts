
/// <reference path="../../geom/Vector2.ts" />

/**
 *	Kiwi - Particles - Particle
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

    export interface IParticle {

       
        position():Geom.Vector2;
       
        lifespan: number;
        birthTime: number;
        age: number;
      
        update(time:number,force?:Geom.Vector2): bool;
        
    }

    export class Particle implements IParticle {

        /**
	    * Creates a new particle. Use generate if you want to get a new particle.
	    * @method constructor
	    * @param {Vector2} position.
        * @param {Vector2} velocity.
        **/
        constructor (position:Geom.Vector2,velocity:Geom.Vector2,lifespan:number) {
            this._position = position;
            this._velocity = velocity;
            this.lifespan = lifespan;
            this.age = Date.now();
            this._dampen = Particle.DEFAULT_DAMPEN;
            this.birthTime = Date.now();
            
        }

        public objType() {
            return "Particle";
        }
    
        /**
        * Default dampen value. The particle velocity is multiplied by this number each update.
        * @property DEFAULT_DAMPEN
        * @type number
        **/
        public static DEFAULT_DAMPEN: number = 1;
        
        /**
        * The particle position
        * @property _position
        * @type number
        **/
        private _position:Geom.Vector2;

        /** 
        * Returns the particle position.
        * @method position
        * @return {Geom.Vector2} The particle position.
        */
        public position(): Geom.Vector2 {
            return this._position;
        }

        /**
        * The particle velocity
        * @property _velocity
        * @type number
        **/
        public _velocity: Geom.Vector2;

        /**
        * The particle lifespan in milliseconds
        * @property lifespan
        * @type number
        **/
        public lifespan: number;

        /**
        * The time at which the particle was spawned
        * @property birthTime
        * @type number
        **/
        public birthTime: number;

        /**
        * The age of the particle in milliseconds
        * @property age
        * @type number
        **/
        public age: number;

               
        /**
        * The normalised age of the particle (between 0 and 1) useful for tweening
        * @property _normalAge
        * @type number
        **/
        private _normalAge: number;

        /** 
        * Returns the normalised age of the particle (between 0 and 1) useful for tweening.
        * @method normalAge
        * @return {Number} The normalised age of the particle (between 0 and 1) useful for tweening.
        */
        public normalAge():number {
            return this._normalAge;
        }

        /**
        * The particle velocity is multiplied by this number each update. Less than one will decrease velocity. Values should usually be very close to 1 to avoid rapid deceleration/acceleration.
        * @property _dampen
        * @type number
        **/
        private _dampen: number;
            
        /**
	    * A function that will return a new particle of this particle type, use this instead of constructor.
	    * @method generate
	    * @param {Vector2} position.
        * @param {Vector2} velocity.
        * @static
        * @return {Particle} particle.
	    **/
        public static generate(position: Geom.Vector2, velocity: Geom.Vector2,lifespan:number) {
            var p = new Particle(position, velocity,lifespan);

            return p;
        }

        /**
	    * Performs integration on the particle to find new position, manages the age of the particle. Returns false if lifepsan is expired.
	    * @method constructor
	    * @param {number} time.
        * @param {Vector2} force. Any additional force to apply to the particle, sych as wind, gravity etc.
        * @return {boo} expired.
        **/
        public update(time:number, force?: Geom.Vector2): bool {
            this.age = time - this.birthTime;
            if (this.age > this.lifespan) return false;
            this._normalAge = 1 / this.lifespan * this.age;  
            
            //integrate
            if (force) this._velocity = this._velocity.add(force);   // needs fix
            //dampen
            this._velocity = this._velocity.multiplyScalar(this._dampen);

            this._position.x += this._velocity.x;
            this._position.y += this._velocity.y;
            return true;
        }
   }

   

}

