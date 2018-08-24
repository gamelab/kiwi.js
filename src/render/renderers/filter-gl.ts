/**
@module Kiwi
@submodule Renderers
**/

module Kiwi.Renderers {
    export class FilterGl extends Kiwi.Renderers.Renderer {
        constructor ( params: any ) {
            /**
            Renders a filtered version of an input image.

            Filters are added to a `FilterBuffer` object,
            created by a `Bufferer`. They will not work on their own.

            This filter system is effectively a `Kiwi.Renderers.Renderer`,
            specialized to deal with texture filtering.
            It draws a square of WebGL texture coordinates 0-1
            (the entire image).
            The main variant is the shader used by the filter.
            It may also use extra information.

            @class FilterGl
            @namespace Kiwi.Renderers
            @constructor
            @extends Kiwi.Renderers.Renderer
            @param params {object} Composite parameter object
                @param params.gl {WebGLRenderingContext} Rendering context
                @param [params.name] {string} Name to identify the filter
                @param params.shaderManager {Kiwi.Shaders.GLShaderManager}
                @param [params.shaderName] {string} Name of shader pair to use
            **/

            super( params.gl, params.shaderManager, false );

            this.active = true;

            this._indexBuffer = new Kiwi.Renderers.GLElementArrayBuffer(
                params.gl, 1, [ 1, 2, 0, 3 ] );

            this.name = params.name;

            if ( !params.shaderName ) {
                params.shaderName = "FilterBase";
            }

            this._shaderPairName = params.shaderName;

            this._vertexBuffer = new Kiwi.Renderers.GLArrayBuffer(
                params.gl, 4 );
        }

        /**
        Whether to apply this filter during `FilterBuffer` processing
        @property active
        @type boolean
        @default true
        **/
        active: boolean;

        /**
        Index buffer
        @property _indexBuffer
        @type Kiwi.Renderers.GLElementArrayBuffer
        @private
        **/
        private _indexBuffer: Kiwi.Renderers.GLElementArrayBuffer;

        /**
        Name to identify this filter
        @property name
        @type string
        @default undefined
        **/
        name: string;

        /**
        Shader program to use for the filter
        @property shaderPair
        @type Kiwi.Shaders.ShaderPair
        **/
        shaderPair: Kiwi.Shaders.ShaderPair;

        /**
        Name of the shader program to use
        @property _shaderPairName
        @type string
        @default "FilterShaderBase"
        @private
        **/
        private _shaderPairName: string;

        /**
        Vertex buffer
        @property _vertexBuffer
        @type Kiwi.Renderers.GLArrayBuffer
        @private
        **/
        private _vertexBuffer: Kiwi.Renderers.GLArrayBuffer;

        enable ( gl: WebGLRenderingContext ) {
            /**
            Enable the renderer for drawing.
            @method enable
            @param gl {WebGLRenderingContext}
            **/

            this.shaderPair = this.shaderManager.requestShader(
                gl, this._shaderPairName );

            // Texture
            gl.uniform1i( this.shaderPair.uniforms.uSampler.location, 0 );
        }

        disable ( gl: WebGLRenderingContext ) {
            /**
            Disable the renderer to make room for another.
            @method disable
            @param gl {WebGLRenderingContext}
            **/

            gl.disableVertexAttribArray( this.shaderPair.attributes.aXYUV );
        }

        drawCorners ( gl: WebGLRenderingContext, corners: Array<any> ) {
            /**
            Make a draw call. Actual rendering to current framebuffer ensues.
            @method drawCorners
            @param gl {WebGLRenderingContext}
            @param corners {array} List of XYUV corner quadruplets
            **/

            this._vertexBuffer.items = corners;

            this._vertexBuffer.uploadBuffer( gl, this._vertexBuffer.items );

            gl.enableVertexAttribArray( this.shaderPair.attributes.aXYUV );
            gl.vertexAttribPointer(
                this.shaderPair.attributes.aXYUV, 4, gl.FLOAT, false, 16, 0 );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer.buffer );

            gl.drawElements( gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0 );
        }
    }
}
