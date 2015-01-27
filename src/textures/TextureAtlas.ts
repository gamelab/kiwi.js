/**
* 
* @module Kiwi
* @submodule Textures
*
*/ 

module Kiwi.Textures {

    /**
    * A TextureAtlas is the base class that is created for each image that is loaded through Kiwi. Each TextureAtlas contains a name (the same as the key that the user chose when loading the image in),the HTMLImageElement that it is for and a number of cells.
    * 
    * @class TextureAtlas
    * @namespace Kiwi.Textures
    * @constructor
    * @param name {string} Name of the texture atlas. This is usually defined by the developer when loading the assets.
    * @param type {number} The type of texture atlas that this is. There are currently only three types.
    * @param cells {any} The cells that are within this image..
    * @param image {HTMLImageElement/HTMLCanvasElement} The image that the texture atlas is using.
    * @param [sequences] {Sequence[]} Any sequences of cells for this texture atlas. Used for animation.
    * @return {Kiwi.TextureAtlas}
    *
    */
    export class TextureAtlas {
         
        constructor(name: string, type:number, cells, image, sequences?: Kiwi.Animations.Sequence[]) {
            this.name = name;
            this.cells = cells || new Array();
            this.sequences = sequences || new Array();
            this.image = image;
            this._type = type;
        }
        
        /**
        * The type of object that this texture atlas is.
        * @method objType
        * @return {string} "TextureAtlas"
        * @public
        */
        public objType(): string {
            return "TextureAtlas";
        }

        /**
        * The name of this texture atlas
        * @property name
        * @type string
        * @public
        */
        public name: string;


        /**
        * Indicates that the image data has changed, and needs to be reuplaoded to the gpu in webGL mode.
        * @property dirty
        * @type boolean
        * @public
        */
        public dirty: boolean = false;
        
        /**
        * The image that this texture atlas is holding. Can be an HTMLImageElement or a HTMLCanvasElement
        * @property image
        * @type HTMLImageElement/HTMLCanvasElement
        * @public
        */
        public image;
        
        /**
        * The cells for this image.
        * @property cells
        * @type Array
        * @public
        */
        public cells;
        
        /**
        * An array of Sequences that are for this texture.
        * @property sequences
        * @type Array
        * @public
        */
        public sequences: Kiwi.Animations.Sequence[];

        /**
        * The cell that is to be render at the start.
        * @property cellIndex
        * @type number
        * @default 0 
        * @public
        */
        public cellIndex: number = 0;
        
        /**
        * The type of texture atlas that this is. This only ever is given a value when the object is instantated. 
        * @property _type
        * @type number
        * @private
        */
        private _type: number;
        
        /**
        * The number that defines a single image type of texture atlas
        * @property SINGLE_IMAGE
        * @static
        * @default 0
        * @type number
        * @final
        * @public
        */
        public static SINGLE_IMAGE: number = 0;
    
        /**
        * The number that defines a spritesheet type of texture atlas
        * @property SPRITE_SHEET
        * @static
        * @default 1
        * @type number
        * @final
        * @public
        */
        public static SPRITE_SHEET: number = 1;

        /**
        * The number that defines a normal texture atlas
        * @property TEXTURE_ATLAS
        * @static
        * @default 2
        * @type number
        * @final
        * @public
        */
        public static TEXTURE_ATLAS: number = 2;

        /**
        * Will return to you this type of texture atlas. This is READ ONLY.
        * @type number
        * @public
        */
        public get type(): number {
            return this._type;
        }
        

        public glTextureWrapper: Kiwi.Renderers.GLTextureWrapper;

        /**
        * Creates a GLTextureWrapper to allow the atlas to communicate efficiently with the video card. This is mostly an internal method.
        *
        * If you are extending TextureAtlas to incorporate multiple textures, you will need to override this method.
        * @method createGLTextureWrapper
        * @param gl {WebGLRenderingContext} The rendering context.
        * @param textureManager {Kiwi.Renderers.GLTextureManager} The texture manager.
        * @public
        * @since 1.1.0
        */
        public createGLTextureWrapper( gl: WebGLRenderingContext, textureManager: Kiwi.Renderers.GLTextureManager ) {
            // Create a default texture wrapper
            this.glTextureWrapper = new Kiwi.Renderers.GLTextureWrapper(gl, this);
            // If this were a multi-texture atlas, we would reassign wrapper values here

            // Register wrapper/s to texture manager
            textureManager.registerTextureWrapper( gl, this.glTextureWrapper );
        }


        /**
        * Sends the texture to the video card.
        * @method enableGL
        * @param gl {WebGLRenderingContext}
        * @param renderer {Renderer}
        * @param textureManager {GLTextureManager}
        * @public
        * @since 1.1.0
        */
        public enableGL( gl: WebGLRenderingContext, renderer: Kiwi.Renderers.Renderer, textureManager: Kiwi.Renderers.GLTextureManager ) {
            // Set resolution uniforms
            renderer.updateTextureSize(gl, new Float32Array([this.image.width, this.image.height]));
            // Upload texture
            textureManager.useTexture(gl, this.glTextureWrapper);
            // If necessary, refresh the texture
            if(this.dirty)
                this.refreshTextureGL( gl );
        }

        /**
        * Will reload the texture into video memory for WebGL rendering.
        * 
        * @method refreshTextureGL
        * @param glContext {WebGLRenderingContext}
        * @public
        * @since 1.0.1
        */
        public refreshTextureGL( glContext ) {
            if(this.glTextureWrapper)
                this.glTextureWrapper.refreshTexture( glContext );
            // Clean dirty flag, even if glTextureWrapper failed, so we don't keep calling it
            this.dirty = false;

        }

        /**
        * Will populate this texture atlas with information based on a JSON file that was passed.
        * 
        * @method readJSON
        * @param {any} atlasJSON
        * @public 
        */
        public readJSON(atlasJSON) {
            //populate from json
            var obj = JSON.parse(atlasJSON);

            if(obj.name !== undefined) this.name = obj.name;
            
            for (var i = 0; i < obj.cells.length; i++) {
                this.cells.push(obj.cells[i]);

                if (obj.cells[i].hitboxes === undefined) {
                    this.cells[i].hitboxes = new Array();
                    this.cells[i].hitboxes.push({ x: 0, y: 0, w: this.cells[i].w, h: this.cells[i].h });
                }

            }

            if (obj.sequences) { // leave as empty array if no animations

                for(var i = 0; i < obj.sequences.length; i++) {
                    
                    var seq = new Kiwi.Animations.Sequence(obj.sequences[i].name, obj.sequences[i].cells);
                    
                    if (obj.sequences[i].speed !== undefined) seq.speed = obj.sequences[i].speed;
                    if (obj.sequences[i].loop !== undefined)  seq.loop = obj.sequences[i].loop;
                    
                    this.sequences.push(seq);
                }
            
            } 

        }

        


    }

}

