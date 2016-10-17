module Kiwi.Textures {

	/**
	Contains Objects that are used when dealing specifically
	with Textures/Images. Majority of these classes are for Internal Kiwi use.

	@module Kiwi
	@submodule Textures
	@main Textures
	**/

	export class TextureLibrary {

		/**
		Holds a reference to all of the image files (jpg, png, etc)
		that are accessible on the State this TextureLibrary is on.

		@class TextureLibrary
		@namespace Kiwi.Textures
		@constructor
		@param game {Kiwi.Game} Game that this texture library belongs to
		**/

		constructor( game: Kiwi.Game ) {

			this._game = game;
			this.textures = new Object();
		}

		public objType(): string {

			/**
			Type of object that this is.

			@method objType
			@return {string} "TextureLibrary"
			@public
			**/

			return "TextureLibrary";
		}

		/**
		Game that this texture library is on

		@property _game
		@type Game
		@private
		**/
		private _game: Kiwi.Game;

		/**
		Contains all of the textures that are available

		@property textures
		@public
		**/
		public textures;

		public clear() {

			/**
			Reset the texture library. Clear the `textures` object.

			@method clear
			@public
			**/

			for ( var prop in this.textures ) {
				delete this.textures[ prop ];
			}
		}

		public add( atlas: TextureAtlas ) {

			/**
			Add a texture atlas to the library.

			@method add
			@param atlas {Kiwi.Textures.TextureAtlas} Texture atlas to add
			@public
			**/

			this.textures[ atlas.name ] = atlas;

			if ( this._game.renderOption === Kiwi.RENDERER_WEBGL ) {
				if (
					Kiwi.Utils.Common.base2Sizes.indexOf( atlas.image.width )
						=== -1 ||
					Kiwi.Utils.Common.base2Sizes.indexOf( atlas.image.height )
						=== -1 ) {
					Kiwi.Log.log(
						"Kiwi.TextureLibrary: Warning: " +
						"Image is not of base2 size " +
						"and may not render correctly.",
						"#texture",
						"#base2" );
				}
				var renderManager =
					<Kiwi.Renderers.GLRenderManager>this._game.renderer;
				renderManager.addTexture( this._game.stage.gl, atlas );
			}
		}

		public remove( atlas: TextureAtlas ) {

			/**
			Remove a texture atlas from the library.

			@method remove
			@param atlas {Kiwi.Textures.TextureAtlas} Texture atlas to remove
			@public
			@since 1.4.1
			**/

			if ( this.textures[ atlas.name ] ) {
				delete this.textures[ atlas.name ];

				if ( this._game.renderOption === Kiwi.RENDERER_WEBGL ) {
					var renderManager =
						<Kiwi.Renderers.GLRenderManager>this._game.renderer;
					renderManager.removeTexture( this._game.stage.gl, atlas );
				}
			}
		}

		public addFromFile( imageFile: Kiwi.Files.TextureFile ) {

			/**
			Add a new image file to the texture library.

			@method addFromFile
			@param imageFile {Kiwi.File.TextureFile} File to base a texture on
			@public
			**/

			// Use cached textures if they exist
			if ( imageFile.texture ) {
				this.textures[ imageFile.key ] = imageFile.texture;
				return;
			}

			if (
				this._game.renderOption === Kiwi.RENDERER_WEBGL &&
				this._game.deviceTargetOption != Kiwi.TARGET_COCOON ) {

				imageFile = this._rebuildImage( imageFile );
			}

			switch ( imageFile.dataType ) {
				case Kiwi.Files.File.SPRITE_SHEET:
					this.textures[ imageFile.key ] =
						this._buildSpriteSheet( imageFile );
					break;
				case Kiwi.Files.File.IMAGE:
					this.textures[ imageFile.key ] =
						this._buildImage( imageFile );
					break;
				case Kiwi.Files.File.TEXTURE_ATLAS:
					this.textures[ imageFile.key ] =
						this._buildTextureAtlas( imageFile );
					break;
				default:

					// Image file is of unknown type
					// and was not added to texture library
					break;
			}

			// Cache texture so other states can use it
			if ( !imageFile.ownerState ) {
				imageFile.texture = this.textures[ imageFile.key ];
			}

		}

		private _rebuildImage( imageFile: Kiwi.Files.TextureFile ): Kiwi.Files.TextureFile {

			/**
			Rebuild a texture from the FileStore into a base2 size
			if it doesn't have it already.

			@method _rebuildImage
			@param imageFile {Kiwi.File.TextureFile} Image file to rebuild
			@return {Kiwi.File.TextureFile} New image file
			@private
			**/

			// Check to see if it is base 2
			var newImg = Kiwi.Utils.Common.convertToBase2( imageFile.data );


			// Was it resized?
			// We can check to see if the width/height has changed.
			if (
				imageFile.data.width !== newImg.width ||
				imageFile.data.height !== newImg.height ) {

				if ( imageFile.dataType === Kiwi.Files.File.SPRITE_SHEET ) {

					// If no rows were passed then calculate them now.
					if ( !imageFile.metadata.rows ) {
						imageFile.metadata.rows = imageFile.data.height /
							imageFile.metadata.frameHeight;
					}

					// If no columns were passed then calculate them again.
					if ( !imageFile.metadata.cols ) {
						imageFile.metadata.cols = imageFile.data.width /
							imageFile.metadata.frameWidth;
					}

				} else if ( imageFile.dataType === Kiwi.Files.File.IMAGE ) {

					if ( !imageFile.metadata.width ) {
						imageFile.metadata.width = imageFile.data.width;
					}

					if ( !imageFile.metadata.height ) {
						imageFile.metadata.height = imageFile.data.height;
					}

				}

				Kiwi.Log.log(
					"Kiwi.TextureLibrary: " +
					imageFile.name +
					" has been rebuilt to be base2.",
					"#texture",
					"#base2" );

				// Assign the new image to the data
				imageFile.data = newImg;
			}

			return imageFile;
		}

		private _buildTextureAtlas( imageFile: Kiwi.Files.File ): Kiwi.Textures.TextureAtlas {

			/**
			Build a new texture atlas based on the image file.
			Internal use only.

			@method _buildTextureAtlas
			@param imageFile {Kiwi.File} Image file to use
			@return {Kiwi.Textures.TextureAtlas} `TextureAtlas` that is created
			@private
			**/

			var atlas: Kiwi.Textures.TextureAtlas =
					new Kiwi.Textures.TextureAtlas(
						imageFile.key,
						Kiwi.Textures.TextureAtlas.TEXTURE_ATLAS,
						null,
						imageFile.data );
			var m = imageFile.metadata;

			try {
				var json = this._game.fileStore.getFile( m.jsonID ).data;
				json.trim();
				atlas.readJSON( json );

				return atlas;

			} catch ( e ) {

				Kiwi.Log.error(
					"  Kiwi.Textures.TextureLibrary: " +
					"Failed to extract information for \"" + imageFile.key +
					"\" from JSON file \"" + m.jsonID + "\"",
					"#error",
					"#texture",
					"Message: " + e.message );
			}

			return null;
		}

		private _buildSpriteSheet( imageFile:Kiwi.Files.File ): Kiwi.Textures.SpriteSheet {

			/**
			Build a spritesheet atlas from an image file.

			@method _buildSpriteSheet
			@param imageFile {Kiwi.File} Image file to use
			@return {Kiwi.Textures.SpriteSheet} `SpriteSheet` that was created
			@private
			**/

			var m = imageFile.metadata;

			// BEWARE THE SWITCH TO CELLWIDTH AND FRAMEWIDTH
			var spriteSheet: Kiwi.Textures.SpriteSheet =
				new Kiwi.Textures.SpriteSheet(
					imageFile.key,
					imageFile.data,
					m.frameWidth,
					m.frameHeight,
					m.numCells,
					m.rows,
					m.cols,
					m.sheetOffsetX,
					m.sheetOffsetY,
					m.cellOffsetX,
					m.cellOffsetY );
			return spriteSheet;
		}

		private _buildImage( imageFile: Kiwi.Files.File ): Kiwi.Textures.SingleImage {

			/**
			Build a single image atlas from an image file.

			@method _buildImage
			@param imageFile {Kiwi.File.File} Image file to use
			@return {Kiwi.Textures.SingleImage} `SingleImage` that was created
			@private
			**/

			var m = imageFile.metadata;
			return new Kiwi.Textures.SingleImage(
				imageFile.key,
				imageFile.data,
				m.width,
				m.height,
				m.offsetX,
				m.offsetY );
		}

		public rebuild( fileStore: Kiwi.Files.FileStore, state: Kiwi.State ) {

			/**
			Rebuild the library from a fileStore.
			Clears the library and repopulates it.

			@method rebuild
			@param fileStore {Kiwi.Files.FileStore} Game filestore
			@param state {Kiwi.State} State to which the library belongs
			@public
			**/

			this.clear();
			Kiwi.Log.log(
				"Kiwi.TextureLibrary: Rebuilding Texture Library",
				"#texture",
				"#rebuild" );

			var fileStoreKeys = fileStore.keys;
			for ( var i = 0; i < fileStoreKeys.length; i++ ) {
				var file = <Kiwi.Files.TextureFile>this._game.fileStore.getFile( fileStoreKeys[ i ] );
				if ( file.isTexture ) {
					Kiwi.Log.log(
						"  Kiwi.TextureLibrary: Adding Texture: " + file.name,
						"#texture",
						"#added" );
					state.textureLibrary.addFromFile( file );
				}
			}
		}
	}

}
