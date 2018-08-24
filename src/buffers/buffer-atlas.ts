/**
@module Kiwi
@submodule Buffers
**/

module Kiwi.Buffers {
	export class BufferAtlas extends Kiwi.Textures.TextureAtlas {
		/**
		Specialised texture atlas that allows a Buffer to maintain
		an atlas without having an image in user memory. WebGL only.

		@class BufferAtlas
        @namespace Kiwi.Buffers
		@extends Kiwi.Textures.TextureAtlas
		**/

		constructor ( params: any ) {
			/**
			@constructor
			@param params {object} Composite parameter object
				@param params.name {string} Name of atlas
				@param params.cells {array} List of cells in this image
				@param params.type {number} Type of texture atlas:
					`Kiwi.Textures.TextureAtlas.SINGLE_IMAGE`,
					`Kiwi.Textures.TextureAtlas.SPRITE_SHEET`, or
					`Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS`.
				@param params.texture {WebGLTexture} Texture to use
				@param params.width {number} Width of the buffer
				@param params.height {number} Height of the buffer
				@param [params.sequences] {array} List of cell sequences for animation
			**/

			super( params.name, params.type, params.cells, null,
				params.sequences );

			this.texture = params.texture;
			this.width = params.width;
			this.height = params.height;
			this._dimensions = new Float32Array( [ this.width, this.height ] );
		}

		/**
		Dimensions of framebuffer texture, for use in `enableGL`
		@property _dimensions
		@type Float32Array
		@private
		**/
		private _dimensions: Float32Array;

		/**
		Texture wrapper to handle WebGL texture information.
		This isn't a true `GLTextureWrapper`, but an emulator.
		We must emulate the standard texture wrapping process
		because framebuffers don't play nice with the normal atlas paradigm.

		@property glTextureWrapper
		@type object
		@default undefined
		**/
		glTextureWrapper: any;

		/**
		Height of framebuffer texture
		@property height
		@type number
		**/
		height: number;

		/**
		Buffer texture
		@property texture
		@type WebGLTexture
		**/
		texture: WebGLTexture;

		/**
		Width of framebuffer texture
		@property width
		@type number
		**/
		width: number;

		createGLTextureWrapper (
			gl: WebGLRenderingContext,
			textureManager: Kiwi.Renderers.GLTextureManager ) {
			/**
			Create a `GLTextureWrapper` to allow the atlas to communicate
			efficiently with the video card.

			@method createGLTextureWrapper
			@param gl {WebGLRenderingContext} Rendering context
			@param textureManager {Kiwi.Renderers.GLTextureManager} Texture
				manager
			**/

			this.glTextureWrapper = {
				textureAtlas: this,
				numBytes: this.width * this.height * 4,
				created: true,
				uploaded: true,
				texture: this.texture,
				deleteTexture: Kiwi.Renderers.GLTextureWrapper.prototype
					.deleteTexture
			};
			textureManager.addTextureToCache( this.glTextureWrapper );
		}

		enableGL (
			gl: WebGLRenderingContext,
			renderer: Kiwi.Renderers.Renderer,
			textureManager: Kiwi.Renderers.GLTextureManager ) {
			/**
			Enable the texture on the video card.
			@method enableGL
			@param gl {WebGLRenderingContext} Rendering context
			@param renderer {Kiwi.Renderers.Renderer} Game renderer
			@param textureManager {Kiwi.Renderers.GLTextureManager}
			**/

			renderer.updateTextureSize( gl, this._dimensions );
			textureManager.useTexture( gl, this.glTextureWrapper );
		}
	}
}
