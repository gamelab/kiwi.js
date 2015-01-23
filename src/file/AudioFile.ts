/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
    
    /**
    * AudioFile which contains settings, loading, and processing details for Audio files to be used. 
    *
    * Uses tag loading for devices not supporting the WebAudioAPI. Otherwise XHR + arraybuffer loading methods are used.
    * 
    * @class AudioFile
    * @namespace Kiwi.Files
    * @extends Kiwi.Files.File
    * @since 1.2.0
    * @constructor
    * @param game {Kiwi.Game} The game that this file is for
    * @param params {Object} Options for this file.
    *   @param params.key {String} User defined name for this file. This would be how the user would access it in the file store. 
    *   @param params.url {String} Location of the file to be loaded.
    *   @param [params.metadata={}] {Object} Any metadata to be associated with the file. 
    *   @param [params.state=null] {Kiwi.State} The state that this file belongs to. Used for defining global assets vs local assets.
    *   @param [params.fileStore=null] {Kiwi.Files.FileStore} The filestore that this file should be save in automatically when loaded.
    *   @param [params.type=UNKNOWN] {Number} The type of file this is. 
    *   @param [params.tags] {Array} Any tags to be associated with this file.
    * @return {Kiwi.Files.AudioFile} 
    *
    */
    export class AudioFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, params: {} = {}) {

            //Add support detection here...

            super(game, params);

            if ( this.game.audio.usingAudioTag ) {
                this.useTagLoader = true;
                this._loadInParallel = true;
            } else {
                this.useTagLoader = false;
            }

        }

        //this.dataType === File.AUDIO

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "AudioFile"
        * @public
        */
        public objType() {
            return "AudioFile";
        }

        /**
        * Initialises a loading method depending on detected device support.
        * @method _load
        * @protected
        */
        protected _load() {
            this.attemptCounter++;

            if (this.useTagLoader) {
                this.tagLoader();
            } else {
                this.xhrLoader('GET', 'arraybuffer');
            }

        }

        /**
        * Handles loading audio in via an audio tag.
        * @method tagLoader
        * @public
        */
        public tagLoader() {

            this.data = document.createElement('audio');
            this.data.src = this.URL;
            this.data.preload = 'auto';

            if (this.game.audio.locked) {
                //Nothing else to do...
                this.loadSuccess();

            } else {

                var _this = this;
                var func = function (event) {

                    _this.data.removeEventListener('canplaythrough', func, false);
                    _this.data.pause();
                    _this.data.currentTime = 0;
                    _this.data.volume = 1;
                    _this.loadSuccess();

                };

                this.data.addEventListener('canplaythrough', func, false);

                if (this.game.deviceTargetOption == Kiwi.TARGET_COCOON) {
                    //If targetting Cocoon we can use the load method to force the audio loading.
                    this.data.load();

                } else {
                    //Otherwise we tell the browser to play the audio in 'mute' to force loading. 
                    this.data.volume = 0;
                    this.data.play();

                }
            }

        }

        /**
        * Handles decoding the arraybuffer into audio data.
        * @method processXHR
        * @param response
        * @protected
        */
        protected processXHR(response:any) {

            this.data = {
                raw: response,
                decoded: false,
                buffer: null
            };

            var _this: any = this;

            this.game.audio.context.decodeAudioData(this.data.raw, function (buffer) {
                if (buffer) {
                    _this.data.buffer = buffer;
                    _this.data.decoded = true;
                    _this.loadSuccess();
                }
            });

        }



    }

}  