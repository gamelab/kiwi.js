
module Kiwi.Files {

    export class DataFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, key: string, url: string, optionalParams: {}= {}) {
            super(game, key, url, optionalParams);

            this.useTagLoader = false;
            this.responseType = 'text';

        }

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "File"
        * @public
        */
        public objType() {
            return "DataFile";
        }



    }

}  