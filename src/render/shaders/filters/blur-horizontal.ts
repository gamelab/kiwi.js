/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterBlurHorizontal
	extends Kiwi.Shaders.FilterBase {
		constructor () {
			/**
			Filter shader: blur image horizontally.

			This should be stacked with a vertical blur to create
			a radial blur effect. The blur will be elliptical, proportionate to
			screen aspect ratio.

			@class FilterBlurHorizontal
			@constructor
			@extends Kiwi.Shaders.ShaderPair
			**/

			super();
		}

		/**
		Shorthand name to identify the shader
		@property name
		@type string
		@default "BlurHorizontal"
		@static
		**/
		static name: string = "BlurHorizontal";

		/**
		Source for the WebGL fragment shader.
		@property fragSource
		@type array
		**/
		fragSource: Array<string> = [
			"precision mediump float;",
			"uniform sampler2D uSampler;",
			"varying vec2 vUV;",
			"const float probeSum = 4.0;",
			"void main( void ) {",
			"	vec4 sample = texture2D( uSampler, vUV );",
			"	sample += texture2D( uSampler, vec2( vUV.x - 0.01, vUV.y ) ) * 0.75;",
			"	sample += texture2D( uSampler, vec2( vUV.x + 0.01, vUV.y ) ) * 0.75;",
			"	sample += texture2D( uSampler, vec2( vUV.x - 0.02, vUV.y ) ) * 0.5;",
			"	sample += texture2D( uSampler, vec2( vUV.x + 0.02, vUV.y ) ) * 0.5;",
			"	sample += texture2D( uSampler, vec2( vUV.x - 0.03, vUV.y ) ) * 0.25;",
			"	sample += texture2D( uSampler, vec2( vUV.x + 0.03, vUV.y ) ) * 0.25;",
			"	gl_FragColor = sample / probeSum;",
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
