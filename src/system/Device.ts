/**
* Kiwi - System
* @module Kiwi
* @submodule System
*/ 

module Kiwi.System {

    /**
    * Detects device support capabilities. Using some elements from System.js by MrDoob and Modernizr
    * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
    *
    * @class Device
    * @constructor
    * @namespace Kiwi.System 
    *
    * @author mrdoob
    * @author Modernizr team
    * 
    */
    export class Device {
         
        constructor() {

            this._checkAudio();
            this._checkBrowser();
            this._checkCSS3D();
            this._checkDevice();
            this._checkFeatures();
            this._checkOS();

        }

        /**
        * The type of object that this is.
        * @method objType
        * @return {String}
        * @public
        */
        public objType() {
            return "Device";
        }

        //  Operating System

        /**
        * 
        * @property iOS 
        * @type boolean
        * @public
        */
        public iOS: boolean = false;

        /**
        * 
        * @property android
        * @type boolean
        * @public
        */
        public android: boolean = false;

        /**
        * 
        * @property chromeOS
        * @type boolean
        * @public
        */
        public chromeOS: boolean = false;

        /**
        * 
        * @property linux
        * @type boolean
        * @public
        */
        public linux: boolean = false;

        /**
        * 
        * @property maxOS
        * @type boolean
        * @public
        */
        public macOS: boolean = false;

        /**
        * 
        * @property windows
        * @type boolean
        * @public
        */
        public windows: boolean = false;

        /**
        * 
        * @property windowsPhone 
        * @type boolean
        * @public
        */
        public windowsPhone: boolean = false;

        //  Features

        /**
        * 
        * @property canvas
        * @type boolean
        * @public
        */
        public canvas: boolean = false;

        /**
        * 
        * @property file
        * @type boolean
        * @public
        */
        public file: boolean = false;

        /**
        * 
        * @property fileSystem
        * @type boolean
        * @public
        */
        public fileSystem: boolean = false;

        /**
        * 
        * @property localStorage
        * @type boolean
        * @public
        */
        public localStorage: boolean = false;

        /**
        * 
        * @property webGL
        * @type boolean
        * @public
        */
        public webGL: boolean = false;

        /**
        * 
        * @property worker
        * @type boolean
        * @public
        */
        public worker: boolean = false;

        /**
        * 
        * @property blob
        * @type boolean
        * @public
        */
        public blob: boolean = false;


        /**
        * 
        * @property touch
        * @type boolean
        * @public
        */
        public touch: boolean = false;

        /**
        * If the type of touch events are pointers (event msPointers)
        * @property pointerEnabled
        * @type boolean
        * @public
        */
        public pointerEnabled: boolean = false;

        /**
        * 
        * @property css3D
        * @type boolean
        * @public
        */
        public css3D: boolean = false;

        //  Browser

        /**
        * 
        * @property arora
        * @type boolean
        * @public
        */
        public arora: boolean = false;

        /**
        * 
        * @property chrome
        * @type boolean
        * @public
        */
        public chrome: boolean = false;

        /**
        * 
        * @property epiphany
        * @type boolean
        * @public
        */
        public epiphany: boolean = false;

        /**
        * 
        * @property firefox
        * @type boolean
        * @public
        */
        public firefox: boolean = false;

        /**
        * 
        * @property ie
        * @type boolean
        * @public
        */
        public ie: boolean = false;

        /**
        * 
        * @property ieVersion
        * @type Number
        * @public
        */
        public ieVersion: number = 0;

        /**
        *
        * @property ieMobile
        * @type boolean
        * @public 
        */
        public ieMobile: boolean = false;

        /**
        * 
        * @property mobileSafari
        * @type boolean
        * @public
        */
        public mobileSafari: boolean = false;

        /**
        * 
        * @property midori
        * @type boolean
        * @public
        */
        public midori: boolean = false;

        /**
        * 
        * @property opera
        * @type boolean
        * @public
        */
        public opera: boolean = false;

        /**
        * 
        * @property safari
        * @type boolean 
        * @public
        */
        public safari: boolean = false;

        /**
        *
        * @property webApp
        * @type boolean
        * @public
        */
        public webApp: boolean = false;

        //  Audio

        /**
        * 
        * @property audioData
        * @type boolean
        * @public
        */
        public audioData: boolean = false;

        /**
        * 
        * @property webaudio
        * @type boolean
        * @public
        */
        public webaudio: boolean = false;

        /**
        * 
        * @property ogg
        * @type boolean
        * @public
        */
        public ogg: boolean = false;

        /**
        * 
        * @property mp3
        * @type boolean
        * @public
        */
        public mp3: boolean = false;

        /**
        * 
        * @property wav
        * @type boolean
        * @public
        */
        public wav: boolean = false;

        /**
        * 
        * @property m4a
        * @type boolean
        * @public
        */
        public m4a: boolean = false;

        //  Device

        /**
        * 
        * @property iPhone
        * @type boolean
        * @public
        */
        public iPhone: boolean = false;

        /**
        * 
        * @property iPhone4
        * @type boolean
        * @public
        */
        public iPhone4: boolean = false;

        /**
        * 
        * @property iPad
        * @type boolean
        * @public
        */
        public iPad: boolean = false;

        /**
        * 
        * @property pixelRatio
        * @type Number
        * @public
        */
        public pixelRatio: number = 0;

        /**
        * 
        * @method _checkOS
        * @private
        */
        private _checkOS() {

            var ua = navigator.userAgent;

            if (/Android/.test(ua))
            {
                this.android = true;
            }
            else if (/CrOS/.test(ua))
            {
                this.chromeOS = true;
            }
            else if (/iP[ao]d|iPhone/i.test(ua))
            {
                this.iOS = true;
            }
            else if (/Linux/.test(ua))
            {
                this.linux = true;
            }
            else if (/Mac OS/.test(ua))
            {
                this.macOS = true;
            }
            else if(/Windows Phone/.test(ua)) {
                this.windowsPhone = true;
            }
            else if (/Windows/.test(ua))
            {
                this.windows = true;

            }

        }

        /**
        * 
        * @method _checkFeatures
        * @private
        */
        private _checkFeatures() {

            if (typeof window['Blob'] !== 'undefined') this.blob = true;

            this.canvas = !!window['CanvasRenderingContext2D'];

            try
            {
                this.localStorage = !!localStorage.getItem;
            }
            catch (error)
            {
                this.localStorage = false; 
            }

            this.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
            this.fileSystem = !!window['requestFileSystem'];
            this.webGL = !!window['WebGLRenderingContext'];
            this.worker = !!window['Worker'];

            if ('ontouchstart' in document.documentElement ||
               (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) ||
               ((<any>window.navigator).pointerEnabled && (<any>window.navigator).maxTouchPoints > 0))
            {
                this.touch = true;

            }

            if ((<any>window.navigator).pointerEnabled || window.navigator.msPointerEnabled ) {
                this.pointerEnabled = true;
            }

        }

        /**
        * 
        * @method _checkBrowser
        * @private
        */
        private _checkBrowser() {

            var ua = navigator.userAgent;
            var an = navigator.appName;

            if (/Arora/.test(ua))
            {
                this.arora = true;
            }
            else if (/Chrome/.test(ua))
            {
                this.chrome = true;
            }
            else if (/Epiphany/.test(ua))
            {
                this.epiphany = true;
            }
            else if (/Firefox/.test(ua))
            {
                this.firefox = true;
            }
            else if (/Mobile Safari/.test(ua))
            {
                this.mobileSafari = true;
            }
            else if (/MSIE (\d+\.\d+);/.test(ua)) //Will Detect 10- versions of IE
            {
                this.ie = true;
                this.ieVersion = parseInt(RegExp.$1);

                if ( /IEMobile/.test(ua) ) {
                    this.ieMobile = true;
                }

            }
            else if (/Trident/.test(ua))        //Will Detect 11+ versions for IE
            {
                this.ie = true;
                /rv:(\d+\.\d+)\)/.test(ua);
                this.ieVersion = parseInt(RegExp.$1);
            }
            else if (/Midori/.test(ua))
            {
                this.midori = true;
            }
            else if (/Opera/.test(ua))
            {
                this.opera = true;
            }
            else if (/Safari/.test(ua))
            {
                this.safari = true;
            }

			// WebApp mode in iOS
            if (navigator['standalone'])
            {
                this.webApp = true;
            }

        }

        /**
        * 
        * @method _checkAudio
        * @private
        */
        private _checkAudio() {

            this.audioData = !!(window['Audio']);
            this.webaudio = !!(window['webkitAudioContext'] || window['AudioContext']);

            var audioElement:HTMLAudioElement = <HTMLAudioElement> document.createElement('audio');
            var result = false;

            try
            {
                if (result = !!audioElement.canPlayType)
                {
                    if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
                    {
                        this.ogg = true;
                    }

                    if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, ''))
                    {
                        this.mp3 = true;
                    }

                    // Mimetypes accepted:
                    //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                    //   bit.ly/iphoneoscodecs
                    if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
                    {
                        this.wav = true;
                    }

                    if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, ''))
                    {
                        this.m4a = true;
                    }
                }
            } catch (e) { }

        }

        /**
        * 
        * @method _checkDevice
        * @private
        */
        private _checkDevice() {

            this.pixelRatio = window['devicePixelRatio'] || 1;
            this.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') != -1;
            this.iPhone4 = (this.pixelRatio == 2 && this.iPhone);
            this.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') != -1;

        }

        /**
        * 
        * @method _checkCSS3D
        * @private
        */
        private _checkCSS3D() {

            var el = document.createElement('p');
            var has3d;
            var transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = "translate3d(1px,1px,1px)";
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            this.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

        }

        /**
        * 
        * @method getAll
        * @return {String}
        * @public
        */
        public getAll(): string {

            var output: string = '';

            output = output.concat('Device\n');
            output = output.concat('iPhone : ' + this.iPhone + '\n');
            output = output.concat('iPhone4 : ' + this.iPhone4 + '\n');
            output = output.concat('iPad : ' + this.iPad + '\n');

            output = output.concat('\n');
            output = output.concat('Operating System\n');
            output = output.concat('iOS: ' + this.iOS + '\n');
            output = output.concat('Android: ' + this.android + '\n');
            output = output.concat('ChromeOS: ' + this.chromeOS + '\n');
            output = output.concat('Linux: ' + this.linux + '\n');
            output = output.concat('MacOS: ' + this.macOS + '\n');
            output = output.concat('Windows: ' + this.windows + '\n');

            output = output.concat('\n');
            output = output.concat('Browser\n');
            output = output.concat('Arora: ' + this.arora + '\n');
            output = output.concat('Chrome: ' + this.chrome + '\n');
            output = output.concat('Epiphany: ' + this.epiphany + '\n');
            output = output.concat('Firefox: ' + this.firefox + '\n');
            output = output.concat('Internet Explorer: ' + this.ie + ' (' + this.ieVersion + ')\n');
            output = output.concat('Mobile Safari: ' + this.mobileSafari + '\n');
            output = output.concat('Midori: ' + this.midori + '\n');
            output = output.concat('Opera: ' + this.opera + '\n');
            output = output.concat('Safari: ' + this.safari + '\n');

            output = output.concat('\n');
            output = output.concat('Features\n');
            output = output.concat('Blob: ' + this.blob + '\n');
            output = output.concat('Canvas: ' + this.canvas + '\n');
            output = output.concat('File: ' + this.file + '\n');
            output = output.concat('FileSystem: ' + this.fileSystem + '\n');
            output = output.concat('LocalStorage: ' + this.localStorage + '\n');
            output = output.concat('WebGL: ' + this.webGL + '\n');
            output = output.concat('Worker: ' + this.worker + '\n');
            output = output.concat('Touch: ' + this.touch + '\n');
            output = output.concat('CSS 3D: ' + this.css3D + '\n');

            output = output.concat('\n');
            output = output.concat('Audio\n');
            output = output.concat('Audio Data: ' + this.canvas + '\n');
            output = output.concat('Web Audio: ' + this.canvas + '\n');
            output = output.concat('Can play OGG: ' + this.canvas + '\n');
            output = output.concat('Can play MP3: ' + this.canvas + '\n');
            output = output.concat('Can play M4A: ' + this.canvas + '\n');
            output = output.concat('Can play WAV: ' + this.canvas + '\n');

            return output;

        }

    }

}