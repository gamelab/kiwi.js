
module Kiwi.Files {

    export class FileStore {

        /**
        * 
        * @constructor
        * @return {Kiwi.FilesStore}
        */
        constructor () {

            this._files = {};

        }

        public objType() {
            return "FileStore";
        }

        /**
        * 
        * @property _files
        * @private
        */
        private _files;

        /**
        * 
        * @property _size
        * @type Number
        * @private
        */
        private _size:number = 0;

        /** 
        * 
        * @method getFile
        * @param {Sting} key
        * @return {Kiwi.Files} 
        */
        public getFile(key: string): Kiwi.Files.File {

            return this._files[key];

        }

        public get keys(): string[]{
            var keys: string[] = new Array();
            for (var key in this._files) {
                keys.push(key);
            }

            return keys;
        }

        /** 
        * Gets 
        * @method size
        * @return {Number} 
        */
        public size(): number {

            return this._size;

        }



        /**
        * @method add
        * @param {String} key
        * @param {File} value
		*/
        public addFile(key: string, value: Kiwi.Files.File):bool {

            if (!this._files[key])
            {
                this._files[key] = value;
                this._size++;
                return true;
            }

            return false;

        }

        /**
        * @method exists
        * @param {Sting} key
        * @return Boolean
		*/
        public exists(key: string): bool {

            if (this._files[key])
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
        * @method remove
        * @param {String} key
		*/
        public removeFile(key: string): bool {

            if (this._files[key])
            {
                this._files[key] = null;
                delete this._files[key];
                return true;
            }

            return false;

        }

    }

}