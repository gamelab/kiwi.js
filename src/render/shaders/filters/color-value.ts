/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterColorValue
	extends Kiwi.Shaders.FilterBase {
		constructor () {
			/**
			Filter shader: convert to grayscale based on color value.

			Desaturation is achieved by RGB / 3.

			@class FilterColorValue
            @namespace Kiwi.Shaders
			@constructor
			@extends Kiwi.Shaders.FilterBase
			**/

			super();
		}

		/**
		Shorthand name to identify the shader
		@property name
		@type string
		@default "ColorValue"
		@static
		**/
		static name: string = "ColorValue";

		/**
		Source for the WebGL fragment shader.
		@property fragSource
		@type array
		**/
		fragSource: Array<string> = [
			"precision mediump float;",
			"uniform sampler2D uSampler;",
			"varying vec2 vUV;",
			"void main( void ) {",
			"	vec4 sample = texture2D( uSampler, vUV );",
			"	float bw = ( sample.r + sample.g + sample.b ) / 3.0;",
			"	gl_FragColor = vec4( bw, bw, bw, sample.a );",
			"}"
		];

		/**
		Source for the WebGL vertex shader.
		@property vertSource
		@type array
		**/
		vertSource: Array<string> = [
			"attribute vec4 aXYUV;",
			"varying vec2 vUV;",
			"void main( void ) {",
			"	gl_Position = vec4( aXYUV.xy * 2.0 - 1.0, 0.0, 1.0 );",
			"	vUV = aXYUV.zw;",
			"}"
		];
	}
}
