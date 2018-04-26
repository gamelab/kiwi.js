/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterInvertCanvas
	extends Kiwi.Renderers.FilterCanvas {

		constructor () {
			/**
			Filter: invert RGB channels.
			@class FilterInvertCanvas
			@constructor
			@extends Kiwi.Renderers.FilterCanvas
			**/

			super();
		}

		/**
		Shorthand name to identify the filter
		@property name
		@type string
		@default "Invert"
		@static
		**/
		static name: string = "Invert";

		render ( filterBuffer: Kiwi.GameObjects.FilterBuffer ) {
			/**
			Render the inversion effect.

			This does not require a pingpong, and can operate entirely on
			buffer 2 pixels.

			@method render
			@param filterBuffer {Kiwi.GameObjects.FilterBuffer}
			**/

			var i, j,
				pixels = filterBuffer.ctxOutput.getImageData(
					0, 0,
					filterBuffer.canvasOutput.width,
					filterBuffer.canvasOutput.height );

			for ( i = 0; i < pixels.data.length; i += 4 ) {
				for ( j = 0; j < 3; j++ ) {
					pixels.data[ i + j ] = 255 - pixels.data[ i + j ];
				}
			}

			filterBuffer.ctxOutput.putImageData( pixels, 0, 0 );
		}
	}
}
