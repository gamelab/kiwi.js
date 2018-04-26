/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterInvert
	extends Kiwi.Shaders.FilterBase {
		constructor () {
			/**
			Filter shader: invert image
			@class FilterInvert
			@constructor
			@extends Kiwi.Shaders.FilterBase
			**/

			super();
		}

		/**
		Shorthand name to identify the shader
		@property name
		@type string
		@default "Invert"
		@static
		**/
		static name: string = "Invert";

		/**
		Source for the WebGL fragment shader.
		@property fragSource
		@type array
		**/
		fragSource: Array<string> = [
			"precision mediump float;",
			"uniform sampler2D uSampler;",
			"varying vec2 vTextureCoord;",
			"void main( void ) {",
			"	vec4 sample = texture2D( uSampler, vTextureCoord );",
			"	gl_FragColor = vec4( vec3( 1 ) - sample.rgb, sample.a );",
			"}"
		];

		/**
		Source for the WebGL vertex shader.
		@property vertSource
		@type array
		**/
		vertSource: Array<string> = [
			"attribute vec4 aXYUV;",
			"varying vec2 vTextureCoord;",
			"void main( void ) {",
			"	gl_Position = vec4( aXYUV.xy * 2.0 - 1.0, 0.0, 1.0 );",
			"	vTextureCoord = aXYUV.zw;",
			"}"
		];
	}
}