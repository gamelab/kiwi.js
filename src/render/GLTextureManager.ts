/**
@module Kiwi
@submodule Renderers
@main Renderers
@namespace Kiwi.Renderers
**/

module Kiwi.Renderers {

	/**
	Manages GL Texture objects, including creation, uploading, destruction
	and memory management

	@class GLTextureManager
	@constructor
	@return {GLTextureManager}
	**/
	export class GLTextureManager {

		constructor() {
			this._numTexturesUsed = 0;
			this._usedTextureMem = 0;
			this.maxTextureMem =
				GLTextureManager.DEFAULT_MAX_TEX_MEM_MB * 1024 * 1024;
			this._textureWrapperCache = new Array();
		}

		/**
		Default maximum amount of texture memory to use
		before swapping textures

		@property DEFAULT_MAX_TEX_MEM_MB
		@type number
		@default 1024
		@public
		@static
		**/
		public static DEFAULT_MAX_TEX_MEM_MB: number = 1024;

		/**
		Maximum amount of texture memory to use before swapping textures,
		initialised from `DEFAULT_MAX_TEX_MEM_MB`

		@property maxTextureMem
		@type number
		@public
		**/
		public maxTextureMem: number;

		/**
		Amount of texture memory currently uploaded

		@property usedTextureMem
		@type number
		@public
		**/
		private _usedTextureMem: number;
		public get usedTextureMem(): number {
			return this._usedTextureMem;
		}

		/**
		Number of textures currently uploaded

		@property usedTextureMem
		@type number
		@public
		**/
		private _numTexturesUsed: number;
		public get numTexturesUsed(): number {
			return this._numTexturesUsed;
		}

		/**
		Number of texture uploads in the last frame

		@property numTextureWrites
		@type number
		@public
		**/
		public numTextureWrites: number = 0;


		/**
		Array of references to all texture wrappers

		@property _textureWrapperCache
		@type GLTextureWrapper[]
		@private
		**/
		private _textureWrapperCache: GLTextureWrapper[];

		private _addTextureToCache( glTexture: GLTextureWrapper ) {

			/**
			Add a texture wrapper to the cache.

			@method _addTextureToCache
			@param glTexture {GLTextureWrapper}
			@private
			**/

			this._textureWrapperCache.push( glTexture );
		}

		private _removeTextureFromCache( gl: WebGLRenderingContext, glTexture: GLTextureWrapper ) {

			/**
			Remove a texture wrapper from the cache.

			@method _removeTextureFromCache
			@param glTexture {GLTextureWrapper}
			@private
			@since 1.4.1
			**/

			var index = this._textureWrapperCache.indexOf( glTexture );
			if ( index > -1 ) {

				if ( glTexture.uploaded ) {
					this._deleteTexture( gl, index );
				}

				this._textureWrapperCache.splice( index, 1 );
			}
		}

		private _deleteTexture( gl:WebGLRenderingContext,idx:number ) {

			/**
			Delete a texture from memory and remove the wrapper from the cache.

			@method _deleteTexture
			@param gl {WebGLRenderingContext}
			@param idx {number}
			@private
			**/

			this._textureWrapperCache[ idx ].deleteTexture( gl );
			this._usedTextureMem -= this._textureWrapperCache[ idx ].numBytes;
			this._numTexturesUsed--;
		}

		private _uploadTexture( gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper ):boolean {

			/**
			Upload a texture to video memory.

			@method _uploadTexture
			@param gl {WebGLRenderingContext}
			@param glTextureWrapper {GLTextureWrapper}
			@return boolean
			@private
			**/

			// Only upload it if it fits
			if ( glTextureWrapper.numBytes + this._usedTextureMem <=
					this.maxTextureMem ) {

				glTextureWrapper.uploadTexture( gl );
				this._usedTextureMem += glTextureWrapper.numBytes;
				this._numTexturesUsed++;

				return true;
			}
			return false;

		}

		public uploadTextureLibrary( gl: WebGLRenderingContext, textureLibrary: Kiwi.Textures.TextureLibrary ) {

			/**
			Upload a texture library to video memory.

			@method uploadTextureLibrary
			@param gl {WebGLRenderingContext}
			@param textureLibrary {Kiwi.Textures.TextureLibrary}
			@public
			**/

			this._textureWrapperCache = new Array();
			for ( var tex in textureLibrary.textures ) {

				// Tell the atlas to prepare its wrappers
				textureLibrary.textures[ tex ].createGLTextureWrapper(
					gl, this );
			}
		}

		public uploadTexture( gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas ) {

			/**
			Upload a single texture to video memory.

			@method uploadTexture
			@param gl {WebGLRenderingContext}
			@param textureAtlas {Kiwi.Textures.TextureAtlas}
			@public
			**/

			textureAtlas.createGLTextureWrapper( gl, this );
		}

		public registerTextureWrapper( gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper ) {

			/**
			Add a texture wrapper to the manager.
			This both adds the wrapper to the manager cache,
			and attempts to upload the attached texture to video memory.

			@method registerTextureWrapper
			@param gl {WebGLRenderingContext}
			@param glTextureWrapper {GLTextureWrapper}
			@public
			@since 1.1.0
			**/

			this._addTextureToCache( glTextureWrapper );

			// Only upload it if it fits
			if ( !this._uploadTexture( gl, glTextureWrapper ) ) {
				Kiwi.Log.log(
					"...skipped uploading texture due to " +
					"allocated texture memory exceeded.",
					"#renderer",
					"#webgl" );
			}
		}

		public clearTextures( gl: WebGLRenderingContext ) {

			/**
			Remove all textures from video memory and clears the wrapper cache.

			@method clearTextures
			@param gl {WebGLRenderingContext}
			@public
			**/

			for ( var i = 0; i < this._textureWrapperCache.length; i++ ) {

				// Delete from graphics memory
				this._deleteTexture( gl, i );

				// Kill the reference on the atlas
				this._textureWrapperCache[ i ].textureAtlas.glTextureWrapper =
					null;
			}
			this._textureWrapperCache = new Array();
		}

		public removeTexture( gl: WebGLRenderingContext, textureAtlas: Kiwi.Textures.TextureAtlas ) {

			/**
			Remove a texture atlas from the texture manager.

			@method removeTexture
			@param gl {WebGLRenderingContext}
			@param textureAtlas {Kiwi.Textures.TextureAtlas}
			@public
			@since 1.4.1
			**/

			textureAtlas.removeGLTextureWrapper( gl, this );
		}

		public deregisterTextureWrapper( gl: WebGLRenderingContext, glTextureWrapper: GLTextureWrapper ) {

			/**
			Remove a texture wrapper from the manager.

			@method deregisterTextureWrapper
			@param gl {WebGLRenderingContext}
			@param glTextureWrapper {GLTextureWrapper}
			@public
			@since 1.4.1
			**/

			this._removeTextureFromCache( gl, glTextureWrapper );
		}

		public useTexture( gl:WebGLRenderingContext,glTextureWrapper: GLTextureWrapper, textureUnit: number = 0 ):boolean {

			/**
			Bind the texture ready for use. Upload it if it isn't already.

			@method useTexture
			@param gl {WebGLRenderingContext}
			@param glTextureWrapper {GLTextureWrappery}
			@param [textureUnit=0] {number} Optional parameter for
				multitexturing. You can have up to 32 textures available
				to a shader at one time, in the range 0-31.
				If you don't need multiple textures,
				this is perfectly safe to ignore.
			@return boolean
			@public
			**/

			// Convert to integer in range 0-31.
			textureUnit = Kiwi.Utils.GameMath.clamp(
				Kiwi.Utils.GameMath.truncate( textureUnit ), 31 );

			if ( !glTextureWrapper.created || !glTextureWrapper.uploaded ) {
				if ( !this._uploadTexture( gl, glTextureWrapper ) ) {
					this._freeSpace( gl, glTextureWrapper.numBytes );
					this._uploadTexture( gl, glTextureWrapper );
				}
				this.numTextureWrites++;
			}

			// Use texture
			if ( glTextureWrapper.created && glTextureWrapper.uploaded ) {

				// Determine target texture unit
				// This could be determined as:
				//   var targetTextureUnit = "TEXTURE" + textureUnit;
				//   gl.activeTexture(gl[targetTextureUnit]);
				// But because the Khronos WebGL spec defines
				// the glenums of TEXTURE0-31 to be consecutive,
				// this should be safe and fast:
				var targetTextureUnit = gl.TEXTURE0 + textureUnit;
				gl.activeTexture( targetTextureUnit );

				// Bind texture to unit
				gl.bindTexture( gl.TEXTURE_2D, glTextureWrapper.texture );

				return true;
			}

			return false;
		}

		private _freeSpace( gl: WebGLRenderingContext, numBytesToRemove: number ): boolean {

			/**
			Attempt to free space in video memory.

			This removes textures sequentially, starting from the first
			cached texture. This may remove textures that are in use.
			These should automatically re-upload into the last position.
			After a few frames, this will push in-use textures to the
			safe end of the queue.

			If there are too many textures in use to fit in memory,
			they will all be cycled every frame,
			even if it would be more efficient to swap out one or two
			very large textures and preserve several smaller ones.
			This is an issue with this implementation and should be fixed.

			This behaviour was changed in v1.1.0.
			Previous versions used a different memory freeing algorithm.

			@method _freeSpace
			@param gl {WebGLRenderingContext}
			@param numBytesToRemove {number}
			@return boolean
			@private
			**/

			// Sequential remover
			var bytesRemoved = 0;
			for ( var i = 0; i < this._textureWrapperCache.length; i++ ) {

				// Scrub uploaded textures
				if ( this._textureWrapperCache[ i ].uploaded ) {
					bytesRemoved += this._textureWrapperCache[ i ].numBytes;
					this._deleteTexture( gl, i );
				}

				// Break on reaching or exceeding free target
				if ( numBytesToRemove <= bytesRemoved )
					return true;
			}
			return false;
		}

	}

}
