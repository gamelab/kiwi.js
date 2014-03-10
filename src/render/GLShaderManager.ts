
/**
* GLSL ES Shaders are used for WebGL rendering.
* ShaderPair objects encapsulate GLSL ES vertex and fragment shader programs. 
*   ShaderPairs contain the GLSL code, provide an interface to uniforms and attributes, and have the ability to link and compile the shaders.
* The ShaderManager keeps track of each ShaderPair, and controls which one is bound for use at any particular time.
*   Only the ShaderManager can create ShaderPairs. When a renderer (see note on renderes below) requests a ShaderPair the ShaderManager will either
*       1) Return a reference to an already instantiated ShaderPair, and set the GL state to use the shader program or
*       2) Return a reference to a new ShaderPair, which will be linked and compiled and bound for use.
*   All ShaderPairs must be housed as properties of the Kiwi.Shaders object. 
* 
* Kiwi.Renderer objects use a ShaderPair to draw.
*   They must request a ShaderPair from the ShaderManager.
*   Many renderers may use the same ShaderPair.
*   Some renderers may at different times use multiple ShaderPairs (only one is possible at any given time)
* 
* @module Kiwi
* @submodule Shaders 
* @main Shaders
*/ 

module Kiwi.Shaders {

    /**
    * Manages all WebGL Shaders. Maintains a list of ShaderPairs 
    *  
    * Provides an interface for using a specific ShaderPair, adding new ShaderPairs, and requesting a reference to a ShaderPair instance.
    * Renderes use shaderPairs to draw. Multiple renderers may use the same compiled shader program.
    * This Manager ensures only one compiled instance of each program is created
    * @class ShaderManager
    * @extends IRenderer
    * @constructor
    * @return {GLRenderer}
    */
    export class ShaderManager {

        constructor() {
            
        }
        

         /**
        * An object containing a set of properties each of which references a ShaderPair. 
        * @property _shaderPairs
        * @type Object
        * @private
        */
        private _shaderPairs: any = {};

        /**
        * The shader program that is currently set to be used useing gl.useProgram.
        * @property currentShader
        * @type Array
        * @private
        */

        public get currentShader(): ShaderPair {
            return this._currentShader;
        }
        private _currentShader: ShaderPair;


        /**
	    * Sets up a default shaderPair.
	    * @method init
        * @param {WebGLRenderingContext} gl
        * @param {String} defaultShaderID
        * @public
	    */
        public init(gl: WebGLRenderingContext, defaultShaderID: string) {
            this._currentShader = this.requestShader(gl, defaultShaderID);
        }


        /**
	    * Provides a reference to a ShaderPair. If the requested ShaderPair exists as a property on the _shaderPairs object it will be returned if already loaded,
        * otherwise it will be loaded, then returned.
        * If the request is not on the list, the Kiwi.Shaders object will  be checked for a property name that matches shaderID and a new ShaderPair
        * will be instantiated, loaded, and set for use.

	    * @method init
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {ShaderPair} a ShaderPair instance - null on fail
        * @public
	    */
        public requestShader(gl: WebGLRenderingContext,shaderID: string,use:boolean = true):ShaderPair {

            var shader: ShaderPair;
            //in list already?
            if (shaderID in this._shaderPairs) {
                shader = this._shaderPairs[shaderID];
                if (!shader.loaded) {
                    this._loadShader(gl, shader);
                }
                if(use)
                    this._useShader(gl, shader);
                return shader;
            } else {
                //not in list, does it exist?
                if (this.shaderExists) {
                    shader = this._addShader(gl, shaderID);
                    this._loadShader(gl, shader);
                    if(use)
                        this._useShader(gl, shader);
                    return shader;
                } else {
                    console.log("Shader " + shaderID + " does not exist");
                }
            }
            //unsuccessful request
            return null;
        }

        /**
	    * Tests to see if a ShaderPair property named ShaderID exists on Kiwi.Shaders. Can be used to test for the availability of specific shaders (for fallback)
	    * @method shaderExists
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {Boolean} success
        * @public
	    */
        public shaderExists(gl: WebGLRenderingContext, shaderID: string):boolean {
            return shaderID in Kiwi.Shaders;
        }

        /**
	    * Creates a new instance of a ShaderPair and adds a reference to the _shaderPairs object
	    * @method _addShader
        * @param {WebGLRenderingContext} gl
        * @param {String} shaderID
        * @return {ShaderPair} 
        * @private
	    */
        private _addShader(gl: WebGLRenderingContext, shaderID: string):ShaderPair {
            this._shaderPairs[shaderID] = new Kiwi.Shaders[shaderID]();
            return this._shaderPairs[shaderID];
        }

        /**
	    * Tells a ShaderPair to load (compile and link)
	    * @method _loadShader
        * @param {WebGLRenderingContext} gl
        * @param {ShaderPair} shader
        * @private
	    */
        private _loadShader(gl: WebGLRenderingContext,shader:ShaderPair) {
            shader.init(gl);
        }

        /**
	    * Changes gl state so that the shaderProgram contined in a ShaderPir is bound for use
	    * @method _useShader
        * @param {WebGLRenderingContext} gl
        * @param {ShaderPair} shader
        * @private
	    */
        private _useShader(gl: WebGLRenderingContext, shader: ShaderPair) {
            if (shader !== this._currentShader) {
                this._currentShader = shader;
            }
            gl.useProgram(shader.shaderProgram);
        }


    }

}