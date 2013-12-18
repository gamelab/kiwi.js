/// <reference path="../build/kiwi.d.ts" />
//<reference path="WebGL.d.ts" />


module MyGame {

    export class GLTest3State1 extends Kiwi.State {

        constructor() {
            super('GLTest');
        }

        preload() {

            this.addTextureAtlas('atlas1', 'assets/1945_sprites.png', 'atlas1JSON', 'assets/1945atlas.json');
        
        
        }

        test1: Kiwi.GameObjects.Sprite;
        
        
        create() {

            

            this.test1 = new Kiwi.GameObjects.Sprite(this, this.textures.atlas1, 100, 100);
            
            
            this.test1.animation.createFromSequence(this.textures.atlas1.sequences[15], true);
            // this.test1.animation.play("enemyOrangeSpin");
            this.test1.inputEnabled = true;
            this.addChild(this.test1);
            
            this.test1.input.onDown.add(function () {
                console.log("click");
                this.game.states.switchState(GLTest3State2);
            }, this);

        
        }


    }

   

    

}


var GLTest3State2 = new Kiwi.State("GLTest3State2")



        GLTest3State2.preload = function () {

    this.addTextureAtlas('atlas1', 'assets/1945_sprites.png', 'atlas1JSON', 'assets/1945atlas.json');


}




        GLTest3State2.create = function () {

    console.log("CREATE");
    var test1 = null;
    test1 = new Kiwi.GameObjects.Sprite(this, this.textures.atlas1, 100, 100);              //create the pirate


    test1.animation.createFromSequence(this.textures.atlas1.sequences[21], true);
    //this.test1.animation.play("enemyOrangeSpin");

    this.addChild(test1);                                                                   //add it to the state                    

}



//var game3 = new Kiwi.Game('game', 'KiwiExample', GLTest3State1, { renderer: Kiwi.RENDERER_WEBGL, plugins: ["Profiler"] });
var game3 = new Kiwi.Game('game', 'KiwiExample', MyGame.GLTest3State1, { renderer: Kiwi.RENDERER_CANVAS });
game3.states.addState(GLTest3State2);
//game2.frameRate = 10;