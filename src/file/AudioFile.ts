
module Kiwi.Files {

    export class AudioFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, key: string, url: string, optionalParams: {}= {}) {
            super(game, key, url, optionalParams);

            if (this.game.audio.usingAudioTag) {
                this.useTagLoader = true;
            } else {
                this.useTagLoader = false;
            }

            this.responseType = 'arraybuffer';

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "File"
        * @public
        */
        public objType() {
            return "AudioFile";
        }


        public tagLoader() {

            this.data = document.createElement('audio');
            this.data.src = this.URL;
            this.data.preload = 'auto';

            if (this.game.audio.locked) {
                //Nothing else to do...
                this.tagOnLoad(null);

            } else {

                var _this = this;
                var func = function (event) {

                    _this.data.removeEventListener('canplaythrough', func, false);
                    _this.data.pause();
                    _this.data.currentTime = 0;
                    _this.data.volume = 1;
                    _this.tagOnLoad(event);

                };

                this.data.addEventListener('canplaythrough', func, false);

                //If targetting Cocoon we can use the load method to force the audio loading.
                if (this.game.deviceTargetOption == Kiwi.TARGET_COCOON) {
                    this.data.load();

                    //Otherwise we tell the browser to play the audio in 'mute' to force loading. 
                } else {
                    this.data.volume = 0;
                    this.data.play();

                }
            }

        }

        public processXHR(response) {

            this.data = {
                raw: response,
                decoded: false,
                buffer: null
            };

            var _this = this;
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