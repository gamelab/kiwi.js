/**
 *  Kiwi - DOM - Bootstrap
 *
 *  @desc       DOM Boot and Ready functions (based on those used by jQuery)
 *
 *	@version 	1.1 - 27th February 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 *
 *  @update     Added readyState interactive check
 */

module Kiwi.DOM {

    export class Bootstrap {

        /**
        *
        * @property _callback
        * @type Any
        * @private
        */
        private _callback;

        /**
        *
        * @property _domParent
        * @type String
        * @private
        */
        private _domParent: string;

        /**
        *
        * @property _createContainer
        * @type Boolean
        * @private
        */
        private _createContainer: bool;

        /**
        *
        * @property isReady
        * @type Boolean
        */
        public isReady: bool = false;
        
        /**
        * The parent div in which the layers and input live
        * @property container
        * @type HTMLDivElement
        */
        public container:HTMLDivElement = null;

        /**
        * The div inside which all game Layers live
        * @property container
        * @type HTMLDivElement
        */
       // public layers:HTMLDivElement = null;

        
        public domLayersMask:HTMLDivElement = null;

        public domLayers: HTMLDivElement = null;

        /**
        * This div sits on-top of all layers and captures user input
        * @property input
        * @type HTMLDivElement
        */

        public canvasLayers: HTMLDivElement = null;

        /**
        * This div sits on-top of all layers and captures user input
        * @property input
        * @type HTMLDivElement
        */

        public input: HTMLDivElement = null;

        public objType() {
            return "Bootstrap";
        }

        /**
        * Called at the start of the game to check to see if the DOM is ready before we do anything requiring it
        * @method boot
        * @param {String} domParent 
        * @param {Any} [callback]
        * @param {Boolean} [createContainer]
        */
        public boot(domParent: string, callback: any = null, createContainer: bool = true) {

            klog.info('DOM Boot: ' + document.readyState);

            this._callback = callback;
            this._domParent = domParent;
            this._createContainer = createContainer;

            if (document.readyState === 'complete' || document.readyState === 'interactive')
            {
                this.ready();
            }
            else
            {
                document.addEventListener('DOMContentLoaded', () => this.ready(), false);
                window.addEventListener('load', () => this.ready(), false);
            }

        }

        /**
        *  If the DOM is ready it fires our callback, otherwise sets a short timeout to try again
        * @method ready
        */
        public ready() {

            klog.info('DOM Ready Check');

            if (this.isReady === true)
            {
                return;
            }

            if (!document.body)
            {
                window.setTimeout(() => this.ready(), 13);
            }
            else
            {
                //document.removeEventListener('DOMContentLoaded', () => this.ready(), false);

                this.isReady = true;

                if (this._createContainer === true)
                {
                    //  No domParent was given so we create our own container for the game with a unique ID
                    if (this._domParent === '')
                    {
                        this.container = <HTMLDivElement> document.createElement('div');
                        this._setupContainer('KiwiGame' + Date.now().toString());
                        document.body.appendChild(this.container);
                    }
                    else
                    {
                        //  Does the container exist?
                        if (document.getElementById(this._domParent))
                        {
                            this.container = <HTMLDivElement> document.getElementById(this._domParent);
                            this._setupContainer();
                        }
                        else
                        {
                            this.container = <HTMLDivElement> document.createElement('div');
                            this._setupContainer(this._domParent);
                            document.body.appendChild(this.container);
                        }

                        klog.info('DOM Alive');
                    }
                }


                this.domLayersMask = <HTMLDivElement> document.createElement('div');
                this.domLayersMask.id = this.container.id + 'LayersMask';
                this.domLayersMask.style.position = 'absolute';
                this.domLayersMask.style.overflow = 'hidden';
                this.domLayersMask.style.top = '0px';
                this.domLayersMask.style.left = '0px';
                this.domLayersMask.style.width = '100%';
                this.domLayersMask.style.height = '100%';
               /* this.layers = <HTMLDivElement> document.createElement('div');
                this.layers.id = this.container.id + 'Layers';
                this.layers.style.position = 'absolute';
                this.layers.style.top = '0px';
                this.layers.style.left = '0px';
                this.layers.style.width = '100%';
                this.layers.style.height = '100%';*/
                
                
                //create DOM layers container

                this.domLayers = <HTMLDivElement> document.createElement('div');
                this.domLayers.id = this.container.id + 'domLayers';
                this.domLayers.style.position = 'absolute';
                this.domLayers.style.overflow = 'hidden';

                this.domLayers.style.top = '0px';
                this.domLayers.style.left = '0px';
                this.domLayers.style.width = '100%';
                this.domLayers.style.height = '100%';
                
                //create Canvas layers container

                this.canvasLayers = <HTMLDivElement> document.createElement('div');
                this.canvasLayers.id = this.container.id + 'canvasLayers';
                this.canvasLayers.style.position = 'absolute';
                this.canvasLayers.style.top = '0px';
                this.canvasLayers.style.left = '0px';
                this.canvasLayers.style.width = '100%';
                this.canvasLayers.style.height = '100%';

                this.container.appendChild(this.domLayersMask);
                this.domLayersMask.appendChild(this.domLayers);
                this.container.appendChild(this.canvasLayers);
                

                if (this._callback !== null)
                {
                    this._callback();
                }
            }

        }

        /**
        * 
        * @method _setupContainer
        * @param {String} id
        * @private
        **/
        private _setupContainer(id: string = '') {

            if (id)
            {
                this.container.id = id;
            }

            this.container.style.width = '800px';
            this.container.style.height = '600px';
            this.container.style.position = 'relative';
            this.container.style.overflow = 'hidden';

        }

    }

}