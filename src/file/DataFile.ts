/**
* 
* @module Kiwi
* @submodule Files 
* 
*/
 
module Kiwi.Files {
    
    /**
    * DataFile which contains settings, loading, and processing details for Data files to be used. 
    * There is no tag loader support for this method of loading.
    * 
    * @class DataFile
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
    * @return {Kiwi.Files.DataFile} 
    *
    */
    export class DataFile extends Kiwi.Files.File {

        constructor(game: Kiwi.Game, params: {}= {}) {
            super(game, params);

            this.useTagLoader = false;
            this._loadInParallel = false;

        }

        //this.dataType === File.XML || this.dataType === File.JSON || this.dataType === File.TEXT_DATA || this.dataType === File.BINARY_DATA

        /**
        * Returns the type of this object
        * @method objType
        * @return {String} "DataFile"
        * @public
        */
        public objType() {
            return "DataFile";
        }



    }

}  