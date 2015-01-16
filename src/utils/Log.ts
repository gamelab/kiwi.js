
/**
* 
* @module Kiwi
*
*/
module Kiwi.Utils {

    /**
    * 
    * @class Log
    * @static
    */
    export class Log {

        /**
        * If the log, warn, or error messages should function at all.
        * When set to false messages won't display or be recorded.
        *
        * @property enabled
        * @type Boolean
        * @default true 
        * @static
        * @public
        */
        public static enabled: boolean = true;
        
        /**
        * If messages should be recorded or not.
        *
        * @property record
        * @type Boolean
        * @default true 
        * @static
        * @public
        */
        public static recording: boolean = true;
        
        /**
        * If the log, warn, and error methods should display when executed or not.
        * You may want to set this to 'false' when releasing a game.
        *
        * @property display
        * @type Boolean
        * @default true 
        * @static
        * @public
        */
        public static display: boolean = true;
        
        /**
        * The maximum number of recordings to be kept at once.
        *
        * @property maxRecordings
        * @type Number
        * @default Infinity 
        * @static
        * @public
        */
        public static maxRecordings: number = Infinity;
        
        /**
        * A list containing all messages recorded.
        *
        * @property recordings
        * @type Array
        * @static
        * @private 
        */
        private static recordings: any[] = [];
        
        /**
        * The time (in milliseconds) of the last recording.
        *
        * @property lastMessageTime
        * @type Number
        * @readOnly
        * @static
        * @public
        */
        public static get lastMessageTime():number {
            if (this.recordings.length > 0) {
                return this.recordings[this.recordings.length - 1].time;
            }
            return 0;
        }
        
        /**
        * The number of recordings that have been saved.
        * Same as the recordings length, and won't go above the 'maxRecordings'.
        *
        * @property numRecordings
        * @type Number
        * @readOnly
        * @static
        * @public
        */
        public static get numRecordings():number {
            return this.recordings.length;
        }


        /**
        * Saves a message to the 'recordings' array.
        * That message can then be retrieved later using the 'show' methods.
        *
        * @method recordMessage
        * @param message {String}
        * @param [tags=[]] {String}
        * @param [logMethod=console.log] {String} 
        * @static
        * @public
        */
        public static record(messages: string[], tags:string[]=[], logMethod:any=console.log) {

            if (this.recording) {

                var recording = {
                    messages: messages,
                    time: Date.now(),
                    tags: tags,
                    logMethod: logMethod
                };

                if (this.recordings.push(recording) > this.maxRecordings) {
                    this.recordings.shift();
                } 

            }

        }
        
        /**
        * Removes recordings from the list. Goes from the oldest to newest. 
        * By not passing any parameters, the entire log will be cleared.
        *
        * @method clearRecordings
        * @param [start=0] {Number} 
        * @param [end] {Number} 
        * @static
        * @private
        */
        public static clearRecordings(start: number=0, end: number=this.recordings.length) {

            this.recordings.splice(start, end);

        }
        
        /**
        * Executes a particular array of messages using a method passed.
        * Takes into account the 'display' property before executing. 
        * 
        * @method _execute
        * @param method {Any} The method that should be used to log the messages. Generally a console method.
        * @param context {Any} The context that the method should be executed in. Generally set to the console. 
        * @param messages {Array} 
        * @param [force=false] {Array}  
        * @static
        * @private
        */
        private static _execute(method:any, context: any, messages:string[], force:boolean=false) {

            if (this.display || force) {
                method.apply(context, messages);
            }

        }

        /**
        * Accepts an array of strings and returns a new array consisting of all elements considered as a tag.
        * 
        * @method getTagsFromArray
        * @param strings {Array} 
        * @return {Array} Elements of the array considered as tags
        * @static
        * @public
        */
        public static getTagsFromArray(array: string[]) {

            var i = 0,
                tags = [];

            while (i < array.length) {
                if (array[i].charAt(0) === '#') {
                    tags.push(array[i]);
                }
                i++;
            }

            return tags;

        }
        
        /**
        * Logs a message using the 'console.log' method.
        * 
        * @method log
        * @param [..args] {Any}
        * @static
        * @public
        */
        public static log(...args:any[]) {

            if (!this.enabled) {
                return;
            }

            this.record(args, this.getTagsFromArray(args), console.log);
            this._execute(console.log, console, args);

        }
        

        /**
        * Logs a message using the 'console.warn' method.
        * 
        * @method warn
        * @param [..args] {Any}
        * @static
        * @public
        */
        public static warn(...args: any[]) {

            if (!this.enabled) {
                return;
            }

            this.record(args, this.getTagsFromArray(args), console.warn);
            this._execute(console.warn, console, args);

        }
        
        /**
        * Logs a message using the 'console.error' method.
        *
        * @method error
        * @param [..args] {Any}
        * @static
        * @public
        */
        public static error(...args: any[]) {

            if (!this.enabled) {
                return;
            }

            this.record(args, this.getTagsFromArray(args), console.error);
            this._execute(console.error, console, args);

        }


        /**
        * Method that displays a particular recording passed.
        *
        * @method _show
        * @param recording {Object}
        * @param tags {Any}
        * @return {Boolean} If the recording was displayed or not.
        * @static
        * @private
        */
        private static _show( recording, tags:string[] ) {

            if (!recording.logMethod) {
                return false;
            }

            //Check that the tags match
            var n = tags.length;
            while( n-- ) {

                if ( recording.tags.indexOf( tags[ n ] ) == -1 ) {
                    return false;
                }

            }

            this._execute(recording.logMethod, console, recording.messages, true );
            return true;

        }


        /**
        * Displays the last recording matching the tags passed.
        * 
        * @method showLast
        * @static
        * @public
        */
        public static showLast(...args:any[]) {
            var i = this.recordings.length;
            
            while(i--) {
                if (this._show(this.recordings[i], args)) {
                    return;
                }
            }
        }


        /**
        * Displays all recording.
        * 
        * @method showAll
        * @static
        * @public
        */
        public static showAll(...args: any[]) {
            for (var i = 0; i < this.recordings.length; i++) {
                this._show(this.recordings[i], args );
            }
        }


        /**
        * Displays all logs recorded.
        * 
        * @method showLogs
        * @static
        * @public
        */
        public static showLogs(...args: any[]) {
            for (var i = 0; i < this.recordings.length; i++) {
                if (this.recordings[i].logMethod === console.log) {
                    this._show(this.recordings[i], args);
                }
            }
        }


        /**
        * Displays all errors recorded.
        * 
        * @method showErrors
        * @static
        * @public
        */
        public static showErrors(...args: any[]) {
            for (var i = 0; i < this.recordings.length; i++) {
                if (this.recordings[i].logMethod === console.error) {
                    this._show(this.recordings[i], args);
                }
            }
        }


        /**
        * Displays all warnings recorded.
        *
        * @method showWarnings
        * @static
        * @public
        */
        public static showWarnings(...args: any[]) {
            for (var i = 0; i < this.recordings.length; i++) {
                if (this.recordings[i].logMethod === console.warn) {
                    this._show(this.recordings[i], args);
                }
            }
        }

        /**
        * Displays a series of recordings within a time period passed. 
        * Time recorded is in milliseconds
        * 
        * @method showTimePeriod
        * @param [start=0] {Number}
        * @param [end=Infinity] {Number}
        * @param [tags] {Array} An tags that the recordings must have
        * @static
        * @public
        */
        public static showTimePeriod(start: number=0, end: number=Infinity, tags:string[]=[]) {

            var recording;

            for (var i = 0; i < this.recordings.length; i++) {

                recording = this.recordings[i];
                if (start < recording.time && end > recording.time) {

                    this._show(recording, tags);

                }
            }

        }


    }
     
}