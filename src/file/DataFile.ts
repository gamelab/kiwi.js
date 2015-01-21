
module Kiwi.Files {

    export class DataFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, params: {}= {}) {
            super(game, params);

            this.useTagLoader = false;
            this.loadInParallel = false;
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