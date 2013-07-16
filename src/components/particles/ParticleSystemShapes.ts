/// <reference path="../../geom/Vector2.ts" />
/// <reference path="Particle.ts" />

/// <reference path="ParticleRenderer.ts" />
/// <reference path="ParticleSpriteSheet.ts" />

/**
 *	Kiwi - Particles - ParticleSystemShapes
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

    export interface IParticleSystemShape {
            getPositionArea(offset?: Geom.Vector2): Geom.Vector2;
            getPositionEdge(offset?: Geom.Vector2): Geom.Vector2;

    }    
    
    export class Circle implements IParticleSystemShape {

        /**
        * 
        * @constructor
        * @param {Number} radius
        * @return {Kiwi.Particles.Circle} This Object.
        */
        constructor (radius:number) {
            console.log("ParticleShape => Circle:construct");
            
            this.radius = radius
            
        }

        public objType() {
            return "ParticleSystemShapes";
        }
        
        /**
        * 
        * @property radius
        * @type Number
        */
        public radius: number;

        /**
        * 
        * @method getPositionArea
        * @param {Geom.Vector2} [offset]
        * @return {Geom.Vector2}
        */
        public getPositionArea(offset?: Geom.Vector2): Geom.Vector2
        {
           // console.log("ParticleShape => getPositionArea");
            
            var off: Geom.Vector2 = offset || new Geom.Vector2();
            var ang: number = Math.random() * Math.PI * 2;
            var x: number = Math.random() * this.radius * Math.cos(ang);
            var y: number = Math.random() * this.radius * Math.sin(ang);
            
            var pos: Geom.Vector2 = new Geom.Vector2(x,y);
            pos = pos.add(off);
            return pos;
        }

        /**
        * 
        * @method getPositionEdge
        * @param {Geom.Vector2} [offset]
        * @return {Geom.Vector2}
        */
        public getPositionEdge(offset?:Geom.Vector2):Geom.Vector2 {
           var off: Geom.Vector2 = offset || new Geom.Vector2();
            var ang: number = Math.random() * Math.PI * 2;
            var x: number = this.radius * Math.cos(ang);
            var y: number = this.radius * Math.sin(ang);
            
            var pos: Geom.Vector2 = new Geom.Vector2(x,y);
            pos = pos.add(off);
            return pos;
        }


    }

    export class Rect implements IParticleSystemShape {

        /**
        * 
        * @constructor
        * @param {Number} width
        * @param {Number} height
        * @return {Kiwi.Particles.Rect} This Object.
        */
        constructor (width:number,height:number) {
            this.width = width;
            this.height = height;
            
        }

        /**
        * 
        * @property width
        * @type Any
        */
        public width;

        /**
        * 
        * @property height
        * @type Any
        */
        public height;

        /**
        * 
        * @method getPositionArea
        * @param {Geom.Vector2} [offset]
        * @return {Geom.Vector2}
        */
        public getPositionArea(offset?: Geom.Vector2): Geom.Vector2
        {
           var pos: Geom.Vector2 = offset || new Geom.Vector2();
           pos.x += Math.random() * this.width - this.width / 2;
           pos.y += Math.random() * this.height - this.height / 2;
           
           return pos;
            
        }

        /**
        * 
        * @method getPositionEdge
        * @param {Geom.Vector2} [offset]
        * @return {Geom.Vector2}
        */
        public getPositionEdge(offset?:Geom.Vector2):Geom.Vector2 {
           var pos:Geom.Vector2 = offset || new Geom.Vector2();
           var perim: number = this.height * 2 + this.width * 2;
           var rand:number = Math.random() * perim;

           if (rand > 0 && rand < this.width) {
               pos.y -= this.height / 2;
               pos.x += rand - this.width / 2;
               return pos;
           } else if (rand >= this.width && rand < this.width + this.height) {
               pos.x += this.width / 2;
               pos.y +=  rand - this.width - this.height / 2 ;
               return pos;
           } else if (rand >= (this.width + this.height) && rand < (this.width * 2 + this.height)) {
               pos.y += this.height / 2;
               pos.x += rand - this.width- this.height - this.width / 2 ;
               return pos;
           } else {
               pos.x -= this.width / 2;
               pos.y += rand -this.width - this.width - this.height - this.height / 2;
               return pos;
           } 
          
        }

    }

}



