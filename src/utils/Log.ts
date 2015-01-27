
/**
* 
* @module Kiwi
* @submodule Utils.
*
*/
module Kiwi.Utils {

    /**
    * A utilty class used to add management functionality to common console methods. 
    * You can use this class by either creating a new instance, or using the instance at the namespace 'Kiwi.Log'.
    * 
    * log/error/warn methods contained on this class function just like their 'console' equivalents except that:
    * - You can assign a tag to message by adding a '#' symbol to the front of a parameter. Example: this.log('Hi', '#welcome'); 
    * - Messages can have multiple tags. Example: this.log('Hi', '#welcome', '#greeting');
    * - Messages are recorded (by default) and you can then search through any messages saved.
    *
    * You can use the 'show' commands to search through recordings and find specific messages. 
    *
    * 
    * @class Log
    * @namespace Kiwi.Utils
    * @constructor
    * @param [params] {Object}
    *   @param [options.recording=true] {Boolean} If the logs should be recorded.
    *   @param [options.display=true] {Boolean} If the logs should be displayed or not.
    *   @param [options.enabled=true] {Boolean} If the Logger is enabled at all.
    *   @param [options.maxRecordings=Infinity] {Number} The maximum number of recordings to have at a single time.
    */
    export class Log {

        constructor(params: any= {}) {
            this.setDefaultsFromParams(params);
        }

        /**
        * Sets the log properties based on a object passed. 
        * This method is used to set the properties on the Log based on 
        * gameoptions passed at game creation.
        * 
        * @method setDefaultsFromParams
        * @param [params] {Object}
        *   @param [options.recording=true] {Boolean} If the logs should be recorded.
        *   @param [options.display=true] {Boolean} If the logs should be displayed or not.
        *   @param [options.enabled=true] {Boolean} If the Logger is enabled at all.
        *   @param [options.maxRecordings=Infinity] {Number} The maximum number of recordings to have at a single time.
        * @public
        */
        public setDefaultsFromParams(params: any= {}) {

            if (!Kiwi.Utils.Common.isUndefined(params.enabled)) {
                this.enabled = params.enabled;
            }

            if (!Kiwi.Utils.Common.isUndefined(params.recording)) {
                this.recording = params.recording;
            }

            if (!Kiwi.Utils.Common.isUndefined(params.display)) {
                this.display = params.display;
            }

            if (!Kiwi.Utils.Common.isUndefined(params.maxRecordings)) {
                this.maxRecordings = params.maxRecordings;
            }

        }

        /**
        * If the log, warn, or error messages should function at all.
        * When set to false messages won't display or be recorded.
        *
        * @property enabled
        * @type Boolean
        * @default true 
        * @public
        */
        public enabled: boolean = true;
        
        /**
        * If messages should be recorded or not.
        *
        * @property record
        * @type Boolean
        * @default true 
        * @public
        */
        public recording: boolean = true;
        
        /**
        * If the log, warn, and error methods should display when executed or not.
        * You may want to set this to 'false' when releasing a game.
        *
        * @property display
        * @type Boolean
        * @default true 
        * @public
        */
        public display: boolean = true;
        
        /**
        * The maximum number of recordings to be kept at once.
        *
        * @property maxRecordings
        * @type Number
        * @default Infinity 
        * @public
        */
        public maxRecordings: number = Infinity;
        
        /**
        * A list containing all messages recorded.
        *
        * @property recordings
        * @type Array
        * @private 
        */
        private recordings: any[] = [];
        
        /**
        * The time (in milliseconds) of the last recording.
        *
        * @property lastMessageTime
        * @type Number
        * @readOnly
        * @public
        */
        public get lastMessageTime():number {
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
        * @public
        */
        public get numRecordings():number {
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
        * @public
        */
        public record(messages: string[], tags:string[]=[], logMethod:any=console.log) {

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
        * @public
        */
        public clearRecordings(start: number=0, end: number=this.recordings.length) {

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
        * @private
        */
        private _execute(method:any, context: any, messages:string[], force:boolean=false) {

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
        * @public
        */
        public getTagsFromArray(array: string[]) {

            var i = 0,
                tags = [];

            while ( i < array.length ) {
                if ( typeof array[ i ] === "string" ) {
                    if ( array[ i ].charAt( 0 ) === "#" ) {
                        tags.push( array[ i ] );
                    }
                }
                i++;
            }

            return tags;

        }
        
        /**
        * Logs a message using the 'console.log' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        * 
        * @method log
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        public log(...args:any[]) {

            if (!this.enabled) {
                return;
            }

            this.record(args, this.getTagsFromArray(args), console.log);
            this._execute(console.log, console, args);

        }
        

        /**
        * Logs a message using the 'console.warn' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        * 
        * @method warn
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        public warn(...args: any[]) {

            if (!this.enabled) {
                return;
            }

            this.record(args, this.getTagsFromArray(args), console.warn);
            this._execute(console.warn, console, args);

        }
        
        /**
        * Logs a message using the 'console.error' method.
        * Arguments starting with a '#' symbol are given that value as a tag.
        *
        * @method error
        * @param [..args] {Any} The data you would like to log.
        * @public
        */
        public error(...args: any[]) {

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
        * @param tags {Array}
        * @return {Boolean} If the recording was displayed or not.
        * @private
        */
        private _show( recording, tags:string[] ) {

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
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        public showLast(...args:any[]) {
            var i = this.recordings.length;
            
            while(i--) {
                if (this._show(this.recordings[i], args)) {
                    return;
                }
            }
        }


        /**
        * Displays all recordings.
        * 
        * @method showAll
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        public showAll(...args: any[]) {
            for (var i = 0; i < this.recordings.length; i++) {
                this._show(this.recordings[i], args );
            }
        }


        /**
        * Displays all logs recorded.
        * 
        * @method showLogs
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        public showLogs(...args: any[]) {
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
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        public showErrors(...args: any[]) {
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
        * @param [...args] {Any} Any tags that the recordings must have.
        * @public
        */
        public showWarnings(...args: any[]) {
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
        * @param [tags] {Array} An tags that the recordings must have.
        * @public
        */
        public showTimePeriod(start: number=0, end: number=Infinity, tags:string[]=[]) {

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