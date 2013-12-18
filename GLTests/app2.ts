/// <reference path="../build/kiwi.d.ts" />
//<reference path="WebGL.d.ts" />


class GLTest2 extends Kiwi.State {

    constructor() {
        super('GLTest');
    }

    preload() {

        this.addImage('s3232', 'assets/s3232.png');
        this.addImage('s6464', 'assets/s6464.png');
        this.addImage('s128128', 'assets/s128128.png');
        this.addImage('s256256', 'assets/s256256.png');
        this.addImage('s512512', 'assets/s512512.png');
        this.addImage('s10241024', 'assets/s10241024.png');
        this.addImage('s20482048', 'assets/s20482048.png');
        this.addImage('s20482048a', 'assets/s20482048a.png');
        this.addImage('s20482048b', 'assets/s20482048b.png');
      
    }

    s3232: Kiwi.GameObjects.Sprite;
    s6464: Kiwi.GameObjects.Sprite;
    s128128: Kiwi.GameObjects.Sprite;
    s256256: Kiwi.GameObjects.Sprite;
    s512512: Kiwi.GameObjects.Sprite;
    s10241024: Kiwi.GameObjects.Sprite;
    s20482048: Kiwi.GameObjects.Sprite;
    s20482048a: Kiwi.GameObjects.Sprite;
    s20482048b: Kiwi.GameObjects.Sprite;
   
   
    create() {

     

          this.s3232 = new Kiwi.GameObjects.Sprite(this, this.textures.s3232, 100, 100);              //create the pirate
          this.s6464 = new Kiwi.GameObjects.Sprite(this, this.textures.s6464, 100, 100);              //create the pirate
          this.s256256 = new Kiwi.GameObjects.Sprite(this, this.textures.s256256, 100, 100);              //create the pirate
          this.s128128 = new Kiwi.GameObjects.Sprite(this, this.textures.s128128, 100, 100);              //create the pirate
          this.s512512 = new Kiwi.GameObjects.Sprite(this, this.textures.s512512, 100, 100);              //create the pirate
          this.s10241024 = new Kiwi.GameObjects.Sprite(this, this.textures.s10241024, 100, 100);              //create the pirate
        this.s20482048 = new Kiwi.GameObjects.Sprite(this, this.textures.s20482048, 0, 0);              //create the pirate
        this.s20482048a = new Kiwi.GameObjects.Sprite(this, this.textures.s20482048a, 20, 20);              //create the pirate
        this.s20482048b = new Kiwi.GameObjects.Sprite(this, this.textures.s20482048b, 40, 40);
        
        this.addChild(this.s20482048); 
        this.addChild(this.s20482048a); 
       this.addChild(this.s20482048b); 
          
        this.addChild(this.s512512); 
        this.addChild(this.s256256); 
        this.addChild(this.s128128); 
        this.addChild(this.s6464); 
        this.addChild(this.s3232);                                                                   //add it to the state                    
        
    }

    

   

    test() {

        var gl = this.game.stage.gl;;
        var numTextures = 5;
        for (var i = 0; i < numTextures; i++) {
            // this.uploadTexture(gl,32);
        }
        console.log("bytes = " + this.totalUploaded);
        console.log("kilobytes = " + this.totalUploaded / 1024);
        console.log("megabytes = " + this.totalUploaded / 1024 / 1024);
    }

    totalUploaded: number = 0;
    BYTES_PER_CHANNEL: number = 1;
    CHANNELS_PER_PIXEL: number = 4;
    



    uploadTexture(gl: WebGLRenderingContext, idx) {
        var texture = gl.createTexture();
        var image: HTMLImageElement;
        switch (idx) {
            case 32: image = this.s3232.atlas.image;
                this.totalUploaded += 32 * 32 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 64: image = this.s6464.atlas.image;
                this.totalUploaded += 64 * 64 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 128: image = this.s128128.atlas.image;
                this.totalUploaded += 128 * 128 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 256: image = this.s3232.atlas.image;
                this.totalUploaded += 256 * 256 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 512: image = this.s512512.atlas.image;
                this.totalUploaded += 512 * 512 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 1024: image = this.s10241024.atlas.image;
                this.totalUploaded += 1024 * 1024 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
            case 2048: image = this.s20482048.atlas.image;
                this.totalUploaded += 2048 * 2048 * this.BYTES_PER_CHANNEL * this.CHANNELS_PER_PIXEL;
                break;
        }


        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.s3232.atlas.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);



    }


}






var game2 = new Kiwi.Game('game', 'KiwiExample', GLTest2, { renderer: Kiwi.RENDERER_WEBGL, plugins: ["Profiler"] });
//game2.frameRate = 10;