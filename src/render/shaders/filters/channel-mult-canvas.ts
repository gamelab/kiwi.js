/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterChannelMultCanvas
	extends Kiwi.Renderers.FilterCanvas {

		constructor () {
			/**
			Tints or multiplies the channels of the buffer
			relative to a reference color.

			ChannelMult multiplies each channel by the corresponding channel
			of a reference color.

			Adjust the values of the `color` property to adjust the
			reference color. Default color is black.

			@class FilterChannelMultCanvas
            @namespace Kiwi.Shaders
			@constructor
			@extends Kiwi.Renderers.FilterCanvas
			@param params {object} Composite parameter object
				@param [params.color] {Kiwi.Utils.Color} Reference color
			**/

			super();

			this.color = new Kiwi.Utils.Color( 0, 0, 0, 1 );
		}

		/**
		Color of tint effect
		@property color
		@type Kiwi.Utils.Color
		@default 0, 0, 0, 1
		**/
		color: Kiwi.Utils.Color;

		/**
		Shorthand name to identify the filter
		@property name
		@type string
		@default "ChannelMult"
		@static
		**/
		static name: string = "ChannelMult";

		render ( filterBuffer: Kiwi.GameObjects.FilterBuffer ) {
			/**
			Render the inversion effect.

			This does not require a pingpong, and can operate entirely on
			buffer 2 pixels.

			@method render
			@param filterBuffer {Kiwi.GameObjects.FilterBuffer}
			**/

			var i,
				pixels = filterBuffer.ctxOutput.getImageData(
					0, 0, filterBuffer.canvasOutput.width, filterBuffer.canvasOutput.height );

			for ( i = 0; i < pixels.data.length; i += 4 ) {
				pixels.data[ i ] = pixels.data[ i ] * this.color.r;
				pixels.data[ i + 1 ] = pixels.data[ i + 1 ] * this.color.g;
				pixels.data[ i + 2 ] = pixels.data[ i + 2 ] * this.color.b;
				pixels.data[ i + 3 ] = pixels.data[ i + 3 ] * this.color.a;
			}

			filterBuffer.ctxOutput.putImageData( pixels, 0, 0 );
		}
	}
}
