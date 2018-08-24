/**
@module Kiwi
@submodule Shaders
**/

module Kiwi.Shaders {
	export class FilterBase
	extends Kiwi.Shaders.ShaderPair {

		constructor () {
			/**
			Shader for rendering base images in filters.

			Common base for shader filters.

			@class FilterBase
            @namespace Kiwi.Shaders
			@constructor
			@extends Kiwi.Shaders.ShaderPair
			**/

			super();

			this.attributes = {
				aXYUV: null
			};

			this.uniforms = {
				uSampler: {
					type: "1i"
				}
			};
		}

		/**
		Shader attribute references
		@property attributes
		@type object
		**/
		attributes: any;

		/**
		Shader uniform descriptors
		@property uniforms
		@type object
		**/
		uniforms: any;

		/**
		Shorthand name to identify the shader
		@property name
		@type string
		@default "Base"
		@static
		**/
		static name: string = "Base";

		init ( gl: WebGLRenderingContext ) {
			/**
			Initialize shader pair.
			@method init
			@param gl {WebGLRenderingContext} WebGL rendering context
			**/

			super.init( gl );

			this.attributes.aXYUV =
				gl.getAttribLocation( this.shaderProgram, "aXYUV" );

			this.initUniforms( gl );
		}

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
			"	gl_FragColor = texture2D( uSampler, vTextureCoord );",
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
