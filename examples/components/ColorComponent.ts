/// <reference path="../../src/Kiwi.ts" />

  class ColorComponent extends Kiwi.State {

        constructor() {

            super('ColorComponent');

        }

        pix1: Kiwi.GameObjects.Pixel;
        pix2: Kiwi.GameObjects.Pixel;
        pix3: Kiwi.GameObjects.Pixel;

        create() {

            this.pix1 = new Kiwi.GameObjects.Pixel(20, 20, 0xfff000000, 40);
            this.pix2 = new Kiwi.GameObjects.Pixel(80, 20, 0xfff000000, 40);
            this.pix3 = new Kiwi.GameObjects.Pixel(140, 20, 0xfff000000, 40);

            this.pix1.color.setRGBA(0, 255, 0);
            this.pix2.color.setRGBA(255, 0, 0);
            this.pix3.color.setRandomColor();
            
            this.addChild(this.pix1);
            this.addChild(this.pix2);
            this.addChild(this.pix3);
        }

        update() {

            super.update();


        }


    }

